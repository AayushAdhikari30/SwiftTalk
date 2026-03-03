import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-blue-500/20 bg-gradient-to-r from-slate-900/50 to-blue-900/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative ring-2 ring-blue-500/40">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-white">{selectedUser.fullName}</h3>
            <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? 'text-green-400' : 'text-slate-400'}`}>
              {onlineUsers.includes(selectedUser._id) ? "🟢 Online" : "⚫ Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-slate-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;