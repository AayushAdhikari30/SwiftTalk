import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"

const SignupPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    //fullname check
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    //email check
    if (!formData.email.trim()) {
      return toast.error('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error('Please enter a valid email')
    }
    //validate password
    if (!formData.password) {
      return toast.error('Password is required')
    } else if (formData.password.length < 8) {
      return toast.error('Password must be at least 8 characters')
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className='min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900'>
      
      {/* ===== ANIMATED BACKGROUND ===== */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        
        {/* ===== LEFT SIDE - BRANDING & FEATURES ===== */}
        <div className='hidden md:flex flex-col items-start justify-center space-y-8 text-white animate-fade-in'>
          {/* Logo */}
          <div className='group cursor-pointer'>
            <div className='flex items-center gap-3 mb-8'>
              <div className='p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 transform group-hover:scale-110 transition-transform duration-300'>
                <MessageSquare className='text-white size-8' />
              </div>
              <h1 className='text-4xl font-bold'>ChatVerse</h1>
            </div>
          </div>

          {/* Main Heading */}
          <div>
            <h2 className='text-5xl font-bold mb-4'>
              Join Our<br />
              <span className='bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                Community
              </span>
            </h2>
            <p className='text-slate-300 text-lg'>Connect with friends and chat in real-time</p>
          </div>

          {/* Features List */}
          <div className='space-y-4'>
            {[
              { icon: Zap, title: 'Instant Messaging', desc: 'Chat with friends instantly' },
              { icon: CheckCircle, title: 'Secure & Safe', desc: 'Your data is always encrypted' },
              { icon: ArrowRight, title: 'Easy Setup', desc: 'Create account in seconds' }
            ].map((feature, i) => (
              <div
                key={i}
                className='flex items-start gap-4 transform hover:translate-x-2 transition-transform duration-300'
              >
                <div className='p-3 rounded-lg bg-blue-500/20 flex-shrink-0 mt-1'>
                  <feature.icon className='text-blue-400 size-5' />
                </div>
                <div>
                  <h3 className='font-semibold text-white'>{feature.title}</h3>
                  <p className='text-slate-400 text-sm'>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 gap-4 pt-8'>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4'>
              <p className='text-2xl font-bold text-white'>10K+</p>
              <p className='text-slate-400 text-sm'>Active Users</p>
            </div>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4'>
              <p className='text-2xl font-bold text-white'>24/7</p>
              <p className='text-slate-400 text-sm'>Support</p>
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDE - SIGNUP FORM ===== */}
        <div className='flex justify-center animate-fade-in-up animation-delay-200'>
          <div className='w-full max-w-md'>
            
            {/* Form Header */}
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-white mb-2'>Create Account</h2>
              <p className='text-slate-400'>Get started with your free account</p>
            </div>

            {/* Form Card */}
            <div className='bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl'>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                
                {/* Full Name Input */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-white font-semibold flex items-center gap-2'>
                      <User className='size-4 text-blue-400' />
                      Full Name
                    </span>
                  </label>
                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur'></div>
                    <input
                      type="text"
                      className='relative input input-bordered w-full pl-4 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-xl'
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-white font-semibold flex items-center gap-2'>
                      <Mail className='size-4 text-blue-400' />
                      Email Address
                    </span>
                  </label>
                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur'></div>
                    <input
                      type="email"
                      className='relative input input-bordered w-full pl-4 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-xl'
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text text-white font-semibold flex items-center gap-2'>
                      <Lock className='size-4 text-blue-400' />
                      Password
                    </span>
                  </label>
                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur'></div>
                    <div className='relative'>
                      <input
                        type={showPassword ? "text" : "password"}
                        className='relative input input-bordered w-full pl-4 pr-12 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all rounded-xl'
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='size-5' />
                        ) : (
                          <Eye className='size-5' />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className='bg-white/5 border border-white/10 rounded-xl p-4'>
                  <p className='text-xs text-slate-300 font-semibold mb-3 flex items-center gap-2'>
                    <CheckCircle className='size-4 text-green-400' />
                    Password Requirements
                  </p>
                  <ul className='space-y-2 text-xs text-slate-400'>
                    <li className={formData.password.length >= 8 ? 'text-green-400' : ''}>
                      ✓ At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-400' : ''}>
                      ✓ One uppercase letter
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? 'text-green-400' : ''}>
                      ✓ One number
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className='btn btn-lg w-full relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group'
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <span className='relative flex items-center gap-2'>
                      Create Account
                      <ArrowRight className='size-5 group-hover:translate-x-1 transition-transform' />
                    </span>
                  )}
                </button>

              </form>

              {/* Divider */}
              <div className='flex items-center gap-4 my-6'>
                <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
                <span className='text-xs text-slate-400'>OR</span>
                <div className='flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>
              </div>

              {/* Social Signup */}
              <div className='grid grid-cols-2 gap-3'>
                <button className='btn btn-outline btn-sm border-white/20 text-white hover:bg-white/10 rounded-lg'>
                  Google
                </button>
                <button className='btn btn-outline btn-sm border-white/20 text-white hover:bg-white/10 rounded-lg'>
                  GitHub
                </button>
              </div>

              {/* Login Link */}
              <div className='text-center mt-6'>
                <p className='text-slate-400'>
                  Already have an account?{' '}
                  <Link to="/login" className='text-blue-400 hover:text-blue-300 font-semibold transition-colors'>
                    Log In
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className='text-center mt-6 text-xs text-slate-500'>
              <p>By creating an account, you agree to our Terms of Service and Privacy Policy</p>
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
  );
}

export default SignupPage