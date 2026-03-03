import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import SidebarSkeleton from "./skeleton/SidebarSkeleton"
import { Users, MessageCircle } from "lucide-react"

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const {onlineUsers}  = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col transition-all duration-200 shadow-2xl">
      {/* Header */}
      <div className="border-b border-slate-800/50 w-full px-5 py-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
            <Users className="size-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="font-semibold text-white block text-sm">Contacts</span>
            <span className="text-xs text-slate-400">{users.length} online</span>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="overflow-y-auto w-full py-4 px-3 lg:px-4 flex-1 space-y-2 scrollbar-hide">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-4">
            <MessageCircle className="size-8 text-slate-600 mb-2" />
            <p className="text-xs lg:text-sm text-slate-500">No contacts yet</p>
          </div>
        ) : (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full px-4 py-3 flex items-center gap-3 rounded-xl
                transition-all duration-200 group relative overflow-hidden
                ${
                  selectedUser?._id === user._id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/20"
                    : "hover:bg-slate-800/60 hover:shadow-md"
                }
              `}
            >
              {/* Background accent for selected state */}
              {selectedUser?._id === user._id && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
              )}

              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0 flex-shrink-0">
                <div className={`ring-2 rounded-full overflow-hidden ${
                  selectedUser?._id === user._id
                    ? "ring-white/50"
                    : "ring-slate-700"
                }`}>
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-12 object-cover"
                  />
                </div>
                {/* Online indicator */}
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3.5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full ring-2 ring-slate-900 shadow-lg" />
                )}
              </div>

              {/* User Info */}
              <div className="hidden lg:flex flex-col text-left min-w-0 flex-1">
                <div className={`font-medium truncate text-sm ${
                  selectedUser?._id === user._id ? "text-white" : "text-slate-200"
                }`}>
                  {user.fullName}
                </div>
                <div className={`text-xs truncate ${
                  selectedUser?._id === user._id
                    ? "text-blue-100/70"
                    : "text-slate-500"
                }`}>
                  {onlineUsers.includes(user._id) ? (
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
                      Online
                    </span>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer accent */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-transparent opacity-20" />
    </aside>
  )
}

export default Sidebar