import React, { useState } from 'react'
import { Camera, User, Mail, Phone, MapPin, Globe, Edit2, Save, X, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => { 
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  };

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-base-100 via-blue-50/30 to-base-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>

        {/* Page Header */}
        <div className='text-center mb-8 animate-fade-in'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2'>
            Complete Your Profile
          </h1>
          <p className='text-base-content/70'>Add your details to personalize your experience</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

          {/* ===== LEFT SIDE - PROFILE PICTURE ===== */}
          <div className='lg:col-span-1 animate-fade-in-up animation-delay-200'>
            <div className='card bg-base-100 shadow-xl border border-base-300 overflow-hidden sticky top-20'>
              <div className='card-body items-center text-center'>
                
                {/* Avatar Section */}
                <div className='relative mb-6'>
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className='w-32 h-32 rounded-full object-cover border-4 border-base-300'
                  />

                  <label
                    htmlFor='avatar-upload'
                    className={`
                      absolute bottom-0 right-0
                      bg-base-content hover:scale-105
                      p-2 rounded-full cursor-pointer
                      transition-all duration-200
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className='size-5 text-base-200' />
                    <input
                      type="file"
                      id="avatar-upload"
                      className='hidden'
                      accept='image/*'
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                {/* Loading Text */}
                <p className='text-sm text-base-content/70'>
                  {isUpdatingProfile ? "Uploading..." : "Click camera to update photo"}
                </p>

                {/* User Info */}
                <div className='mt-4 text-center'>
                  <h2 className='text-2xl font-bold'>{authUser?.fullName}</h2>
                  <p className='text-base-content/60 text-sm'>{authUser?.email}</p>
                </div>

                {/* Divider */}
                <div className='divider my-4'></div>

                {/* Quick Stats */}
                <div className='w-full space-y-3 text-left'>
                  <div className='flex justify-between items-center bg-base-200/50 p-3 rounded-lg'>
                    <span className='text-sm text-base-content/60'>Joined</span>
                    <span className='text-sm font-semibold'>{authUser?.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className='flex justify-between items-center bg-base-200/50 p-3 rounded-lg'>
                    <span className='text-sm text-base-content/60'>Contacts</span>
                    <span className='text-sm font-semibold'>12</span>
                  </div>
                  <div className='flex justify-between items-center bg-base-200/50 p-3 rounded-lg'>
                    <span className='text-sm text-base-content/60'>Messages</span>
                    <span className='text-sm font-semibold'>145</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE - EDIT FORM ===== */}
          <div className='lg:col-span-2 animate-fade-in-up animation-delay-400'>
            <div className='card bg-base-100 shadow-xl border border-base-300'>
              <div className='card-body'>
                <h2 className='card-title text-2xl mb-6 flex items-center gap-2'>
                  <Edit2 className='text-blue-500 size-6' />
                  Profile Information
                </h2>

                <form onSubmit={handleSubmit} className='space-y-6'>

                  {/* Full Name */}
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Full Name</span>
                    </label>
                    <div className='relative'>
                      <User className='absolute left-3 top-4 size-5 text-base-content/40' />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className='input input-bordered pl-10 w-full'
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-semibold'>Email Address</span>
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-4 size-5 text-base-content/40' />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className='input input-bordered pl-10 w-full'
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className='pt-4'>
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className='btn btn-primary w-full'
                    >
                      {isUpdatingProfile ? "Saving..." : "Save Changes"}
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== ANIMATIONS ===== */}
      <style>{`
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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}

export default ProfilePage