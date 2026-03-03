import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100 via-blue-900/5 to-base-100">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center animate-pulse"
            >
              <MessageSquare className="w-10 h-10 text-blue-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-purple-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Welcome to Swift Talk!</h2>
        <p className="text-base-content/70 text-base">
          Select a conversation from the sidebar to start chatting. Stay connected with your friends in real-time.
        </p>

        {/* Additional Info */}
        <div className="pt-4 px-6 py-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-slate-400">💬 No messages yet? Start by selecting a friend!</p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;