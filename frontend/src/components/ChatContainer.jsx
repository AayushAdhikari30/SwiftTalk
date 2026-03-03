import React, { useEffect, useRef } from 'react'
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from './skeleton/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from "../lib/utils"
import { MessageSquare } from 'lucide-react'

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubcribefromMessages } = useChatStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return () => unsubcribefromMessages();
    }
  }, [selectedUser?._id, getMessages,subscribeToMessages,unsubcribefromMessages]);

  
 

  // Auto-scroll to latest message
  useEffect(() => {
    if (messageEndRef.current && messages?.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );

  return (
    <div className='flex-1 flex flex-col overflow-auto bg-gradient-to-b from-slate-900 to-slate-900/80'>
      <ChatHeader />

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>

        {/* ── Empty state ── */}
        {(!messages || messages.length === 0) && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 select-none">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs">Say hi to {selectedUser?.fullName}!</p>
          </div>
        )}

        {(messages || []).map((message) => {
          const isMine = authUser?._id && message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`chat ${isMine ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              {/* Avatar */}
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border-2 border-blue-500/40 overflow-hidden'>
                  <img
                    src={
                      isMine
                        ? authUser?.profilePic || "/avatar.png"
                        : selectedUser?.profilePic || "/avatar.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Timestamp */}
              <div className='chat-header mb-1'>
                <time className='text-xs text-slate-400 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Bubble */}
              <div
                className={`chat-bubble flex flex-col max-w-xs lg:max-w-md break-words shadow-md transition-all ${
                  isMine
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-slate-800 text-slate-100 border border-blue-500/20"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 object-cover"
                  />
                )}
                {message.text && (
                  <p className="text-sm leading-relaxed">{message.text}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* Scroll anchor */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;