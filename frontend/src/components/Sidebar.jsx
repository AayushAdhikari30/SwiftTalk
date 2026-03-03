import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-blue-500/20 flex flex-col transition-all duration-200 bg-slate-900/50 backdrop-blur-sm">
      <div className="border-b border-blue-500/20 w-full p-5 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Users className="size-6 text-blue-400" />
          </div>
          <span className="font-bold hidden lg:block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm text-slate-300">Show online only</span>
          </label>
          <span className="text-xs text-blue-400/70">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-blue-500/20 transition-all duration-200
              ${selectedUser?._id === user._id ? "bg-blue-500/30 border-l-2 border-blue-500" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full ring-2 ring-blue-500/30"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-slate-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-white truncate">{user.fullName}</div>
              <div className={`text-sm ${onlineUsers.includes(user._id) ? 'text-green-400' : 'text-slate-500'}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-500 py-4 text-sm">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;