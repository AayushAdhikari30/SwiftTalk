import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, MessageSquare, ArrowRight, Loader, Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className='min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>

      {/* ===== ANIMATED BACKGROUND ELEMENTS ===== */}
      <div className='absolute inset-0 -z-10'>
        {/* Gradient Orbs */}
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>

        {/* ===== LEFT SIDE - BRANDING ===== */}
        <div className='hidden md:flex flex-col items-start justify-center space-y-8'>
          {/* Logo */}
          <div className='group cursor-pointer'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 transform group-hover:scale-110 transition-transform duration-300'>
                <MessageSquare className='text-white size-8' />
              </div>
              <h1 className='text-4xl font-bold text-white'>ChatVerse</h1>
            </div>
          </div>

          {/* Features List */}
          <div className='space-y-6'>
            {[
              { title: 'Real-time Chat', desc: 'Connect instantly with friends' },
              { title: 'Secure & Private', desc: 'Your conversations are encrypted' },
              { title: 'Always Connected', desc: 'Available on all your devices' }
            ].map((feature, i) => (
              <div
                key={i}
                className='flex items-start gap-4 transform hover:translate-x-2 transition-transform duration-300'
              >
                <div className='p-2 rounded-lg bg-blue-500/20 flex-shrink-0'>
                  <ArrowRight className='text-blue-400 size-5' />
                </div>
                <div>
                  <h3 className='text-white font-semibold'>{feature.title}</h3>
                  <p className='text-slate-400 text-sm'>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mt-12'>
            <p className='text-white/80 italic mb-4'>
              "ChatVerse has transformed the way we communicate. It's fast, reliable, and secure!"
            </p>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500'></div>
              <div>
                <p className='text-white font-semibold text-sm'>John Doe</p>
                <p className='text-slate-400 text-xs'>Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDE - LOGIN FORM ===== */}
        <div className='flex justify-center'>
          <div className='w-full max-w-md'>
            {/* Form Header */}
            <div className='text-center mb-8 animate-fade-in'>
              <h2 className='text-3xl font-bold text-white mb-2'>Welcome Back</h2>
              <p className='text-slate-400'>Sign in to your SwiftTalk account</p>
            </div>

            {/* Form Card */}
            <div className='bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-fade-in-up animation-delay-200'>

              <form onClick={handleSubmit} className='space-y-6'>

                {/* Email Input */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-white font-semibold'>Email Address</span>
                  </label>
                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur'></div>
                    <div className='relative flex items-center'>
                      <Mail className='absolute left-4 top-4 size-5 text-blue-400' />
                      <input
                        type='email'
                        placeholder='you@example.com'
                        className='input input-bordered w-full pl-12 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-xl'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-white font-semibold'>Password</span>
                  </label>
                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur'></div>
                    <div className='relative flex items-center'>
                      <Lock className='absolute left-4 top-4 size-5 text-blue-400' />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder='••••••••'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='input input-bordered w-full pl-12 pr-12 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-xl'
                      />
                      <button
                        type='button'
                        className='absolute right-4 top-4 text-slate-400 hover:text-white transition-colors'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='size-5 text-base-content/40' />
                        ) : (
                          <Eye className='size-5 text-base-content/40'/>
                        )}
                      </button>

                    </div>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className='flex items-center justify-between'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input type='checkbox' className='checkbox checkbox-sm checkbox-primary' />
                    <span className='text-sm text-slate-300'>Remember me</span>
                  </label>
                  <Link to='#' className='text-sm text-blue-400 hover:text-blue-300 transition-colors'>
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type='submit'
                  className='btn btn-lg w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group'
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                    <Loader2 className='size-5 animate-spin'/>
                    Loading...
                    </>):(
                  <div className='relative flex items-center gap-2'>
                    Login
                    <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform' />
                  </div>
                  )}
                </button>

              </form>

              {/* Divider */}
              <div className='flex items-center gap-4 my-6'>
                <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                <span className='text-xs text-slate-400'>OR</span>
                <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
              </div>

              {/* Social Login */}
              <div className='grid grid-cols-2 gap-3'>
                <button className='btn btn-outline btn-sm border-white/20 text-white hover:bg-white/10'>
                  Google
                </button>
                <button className='btn btn-outline btn-sm border-white/20 text-white hover:bg-white/10'>
                  GitHub
                </button>
              </div>

              {/* Signup Link */}
              <div className='text-center mt-6'>
                <p className='text-slate-400'>
                  Don't have an account?{' '}
                  <Link to='/signup' className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>
                    Create one
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className='text-center mt-6 text-xs text-slate-500'>
              <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ANIMATIONS ===== */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}

export default LoginPage