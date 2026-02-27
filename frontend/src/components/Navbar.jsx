import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className='sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/10 backdrop-blur-xl shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>

          {/* ===== LEFT SIDE - LOGO ===== */}
          <Link to="/" className='flex items-center gap-3 hover:opacity-80 transition-opacity group'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300'></div>
              <div className='relative bg-slate-900 p-2 rounded-lg border border-white/20'>
                <MessageSquare className='text-blue-400 size-5' strokeWidth={1.5} />
              </div>
            </div>
            <span className='font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Chatty</span>
          </Link>

          {/* ===== RIGHT SIDE - ACTIONS ===== */}
          <div className='flex items-center gap-3'>
            {authUser ? (
              <>
                {/* Profile Button (if logged in) */}
                <Link
                  to="/profile"
                  className='flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all group'
                >
                  <User className="size-5" />
                  <span className='hidden sm:inline text-sm font-medium'>Profile</span>
                </Link>

                {/* Settings Button (if logged in) */}
                <Link
                  to="/settings"
                  className='flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all group'
                >
                  <Settings className="size-5" />
                  <span className='hidden sm:inline text-sm font-medium'>Settings</span>
                </Link>

                {/* Logout Button (if logged in) */}
                <button
                  onClick={logout}
                  className='flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all'
                >
                  <LogOut className='size-5' />
                  <span className='hidden sm:inline text-sm font-medium'>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Settings Button (if not logged in) */}
                <Link
                  to="/settings"
                  className='flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all'
                >
                  <Settings className="size-5" />
                  <span className='hidden sm:inline text-sm font-medium'>Settings</span>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>

      {/* ===== ANIMATIONS ===== */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </header>
  )
}

export default Navbar