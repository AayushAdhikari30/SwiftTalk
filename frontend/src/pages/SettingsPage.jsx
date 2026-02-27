import React, { useState } from 'react'
import { Settings, Bell, Lock, Moon, Smartphone, Trash2, LogOut, ChevronRight, Palette, Volume2, Eye, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

const SettingsPage = () => {
  const {  logout } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  // Account Settings State
  const [accountSettings, setAccountSettings] = useState({
    showEmail: true,
    showPhone: false,
    publicProfile: true,
    showLastSeen: true,
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    messageNotifications: true,
    sound: true,
    vibration: false,
    emailNotifications: 'All',
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark',
    textSize: '14',
    compactMode: false,
  });

  // ===== ACCOUNT SETTINGS HANDLERS =====
  const handleAccountToggle = async (key) => {
    try {
      setIsSaving(true);
      const newValue = !accountSettings[key];
      setAccountSettings(prev => ({
        ...prev,
        [key]: newValue
      }));
      // TODO: Call API to save settings
      // await updateSettings({ [key]: newValue });
      toast.success('Setting updated');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== NOTIFICATION SETTINGS HANDLERS =====
  const handleNotificationToggle = async (key) => {
    try {
      setIsSaving(true);
      const newValue = !notificationSettings[key];
      setNotificationSettings(prev => ({
        ...prev,
        [key]: newValue
      }));
      toast.success('Notification setting updated');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailNotificationChange = async (value) => {
    try {
      setIsSaving(true);
      setNotificationSettings(prev => ({
        ...prev,
        emailNotifications: value
      }));
      toast.success('Email notification preference updated');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== APPEARANCE SETTINGS HANDLERS =====
  const handleThemeChange = async (value) => {
    try {
      setIsSaving(true);
      setAppearanceSettings(prev => ({
        ...prev,
        theme: value
      }));
      // Apply theme to document
      if (value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      toast.success('Theme updated');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTextSizeChange = async (value) => {
    try {
      setIsSaving(true);
      setAppearanceSettings(prev => ({
        ...prev,
        textSize: value
      }));
      document.documentElement.style.fontSize = value + 'px';
      toast.success('Text size updated');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompactModeToggle = async () => {
    try {
      setIsSaving(true);
      const newValue = !appearanceSettings.compactMode;
      setAppearanceSettings(prev => ({
        ...prev,
        compactMode: newValue
      }));
      toast.success('Compact mode ' + (newValue ? 'enabled' : 'disabled'));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== SECURITY HANDLERS =====
  const handleEnable2FA = async () => {
    try {
      toast.success('2FA setup started');
      // TODO: Implement 2FA logic
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      toast.success('Password change page opened');
      // TODO: Open password change modal
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleViewSessions = async () => {
    try {
      toast.success('Active sessions page opened');
      // TODO: Open active sessions page
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // ===== DATA HANDLERS =====
  const handleClearCache = async () => {
    if (!window.confirm('Are you sure? This will free up space.')) return;

    try {
      setIsSaving(true);
      // TODO: Call API to clear cache
      // await clearCache();
      toast.success('Cache cleared successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadData = async () => {
    try {
      setIsSaving(true);
      // TODO: Call API to download data
      // const response = await downloadData();
      toast.success('Downloading your data...');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== DANGER ZONE HANDLERS =====
  const handleLogoutAllDevices = async () => {
    if (!window.confirm('You will be logged out from all devices. Continue?')) return;

    try {
      // TODO: Call API to logout from all devices
      // await logoutAllDevices();
      toast.success('Logged out from all devices');
      logout();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    if (!window.confirm('All your data will be permanently deleted. Continue?')) return;

    try {
      setIsSaving(true);
      // TODO: Call API to delete account
      // await deleteAccount();
      toast.success('Account deleted');
      logout();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-base-100 via-blue-50/30 to-base-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>

        {/* ===== PAGE HEADER ===== */}
        <div className='mb-12 animate-fade-in'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-3 rounded-lg bg-blue-500/20 border border-blue-500/30'>
              <Settings className='text-blue-500 size-8' />
            </div>
            <div>
              <h1 className='text-4xl font-bold text-base-content'>Settings</h1>
              <p className='text-base-content/70'>Manage your preferences and account</p>
            </div>
          </div>
        </div>

        <div className='space-y-6'>

          {/* ===== ACCOUNT SETTINGS ===== */}
          <div className='card bg-base-100 shadow-xl border border-base-300 animate-fade-in-up animation-delay-200'>
            <div className='card-body'>
              <h2 className='card-title text-xl mb-6 flex items-center gap-2'>
                <Settings className='text-blue-500 size-5' />
                Account Settings
              </h2>

              <div className='space-y-4'>
                {/* Show Email Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Show Email Address</h3>
                    <p className='text-sm text-base-content/60'>Let others see your email</p>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={accountSettings.showEmail}
                    onChange={() => handleAccountToggle('showEmail')}
                    disabled={isSaving}
                  />
                </div>

                {/* Show Phone Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Show Phone Number</h3>
                    <p className='text-sm text-base-content/60'>Let others contact you via phone</p>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={accountSettings.showPhone}
                    onChange={() => handleAccountToggle('showPhone')}
                    disabled={isSaving}
                  />
                </div>

                {/* Public Profile Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Public Profile</h3>
                    <p className='text-sm text-base-content/60'>Anyone can view your profile</p>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={accountSettings.publicProfile}
                    onChange={() => handleAccountToggle('publicProfile')}
                    disabled={isSaving}
                  />
                </div>

                {/* Show Last Seen Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Show Last Seen</h3>
                    <p className='text-sm text-base-content/60'>Let others see when you were last active</p>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-primary'
                    checked={accountSettings.showLastSeen}
                    onChange={() => handleAccountToggle('showLastSeen')}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== NOTIFICATIONS ===== */}
          <div className='card bg-base-100 shadow-xl border border-base-300 animate-fade-in-up animation-delay-400'>
            <div className='card-body'>
              <h2 className='card-title text-xl mb-6 flex items-center gap-2'>
                <Bell className='text-blue-500 size-5' />
                Notifications
              </h2>

              <div className='space-y-4'>
                {/* Message Notifications Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Message Notifications</h3>
                    <p className='text-sm text-base-content/60'>Get notified for new messages</p>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success'
                    checked={notificationSettings.messageNotifications}
                    onChange={() => handleNotificationToggle('messageNotifications')}
                    disabled={isSaving}
                  />
                </div>

                {/* Sound Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div className='flex items-center gap-3'>
                    <Volume2 className='size-5 text-base-content/60' />
                    <div>
                      <h3 className='font-semibold'>Sound</h3>
                      <p className='text-sm text-base-content/60'>Play sound for notifications</p>
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success'
                    checked={notificationSettings.sound}
                    onChange={() => handleNotificationToggle('sound')}
                    disabled={isSaving}
                  />
                </div>

                {/* Vibration Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div className='flex items-center gap-3'>
                    <Smartphone className='size-5 text-base-content/60' />
                    <div>
                      <h3 className='font-semibold'>Vibration</h3>
                      <p className='text-sm text-base-content/60'>Vibrate on notifications</p>
                    </div>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success'
                    checked={notificationSettings.vibration}
                    onChange={() => handleNotificationToggle('vibration')}
                    disabled={isSaving}
                  />
                </div>

                {/* Email Notifications Select */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Email Notifications</h3>
                    <p className='text-sm text-base-content/60'>Receive updates via email</p>
                  </div>
                  <select
                    className='select select-bordered select-sm'
                    value={notificationSettings.emailNotifications}
                    onChange={(e) => handleEmailNotificationChange(e.target.value)}
                    disabled={isSaving}
                  >
                    <option>All</option>
                    <option>Important Only</option>
                    <option>Never</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PRIVACY & SECURITY ===== */}
          <div className='card bg-base-100 shadow-xl border border-base-300 animate-fade-in-up animation-delay-600'>
            <div className='card-body'>
              <h2 className='card-title text-xl mb-6 flex items-center gap-2'>
                <Lock className='text-blue-500 size-5' />
                Privacy & Security
              </h2>

              <div className='space-y-4'>
                {/* Two Factor Auth Button */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Two-Factor Authentication</h3>
                    <p className='text-sm text-base-content/60'>Add extra security to your account</p>
                  </div>
                  <button
                    onClick={handleEnable2FA}
                    className='btn btn-sm btn-outline'
                    disabled={isSaving}
                  >
                    Enable
                  </button>
                </div>

                {/* Change Password Button */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors cursor-pointer'>
                  <div>
                    <h3 className='font-semibold'>Change Password</h3>
                    <p className='text-sm text-base-content/60'>Update your password regularly</p>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className='btn btn-sm btn-ghost'
                    disabled={isSaving}
                  >
                    <ChevronRight className='size-5' />
                  </button>
                </div>

                {/* Active Sessions Button */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Active Sessions</h3>
                    <p className='text-sm text-base-content/60'>Manage devices logged into your account</p>
                  </div>
                  <button
                    onClick={handleViewSessions}
                    className='btn btn-sm btn-ghost'
                    disabled={isSaving}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ===== APPEARANCE ===== */}
          <div className='card bg-base-100 shadow-xl border border-base-300 animate-fade-in-up animation-delay-800'>
            <div className='card-body'>
              <h2 className='card-title text-xl mb-6 flex items-center gap-2'>
                <Palette className='text-blue-500 size-5' />
                Appearance
              </h2>

              <div className='space-y-6'>
                {/* Theme Select */}
                <div>
                  <label className='label'>
                    <span className='label-text font-semibold flex items-center gap-2'>
                      <Moon className='size-4' />
                      Theme
                    </span>
                  </label>
                  <select
                    className='select select-bordered w-full'
                    value={appearanceSettings.theme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    disabled={isSaving}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                {/* Text Size Slider */}
                <div>
                  <label className='label'>
                    <span className='label-text font-semibold'>Text Size</span>
                  </label>
                  <div className='flex items-center gap-4 p-4'>
                    <span className='text-sm'>Aa</span>
                    <input
                      type='range'
                      min='12'
                      max='18'
                      value={appearanceSettings.textSize}
                      onChange={(e) => handleTextSizeChange(e.target.value)}
                      className='range range-sm flex-1'
                      disabled={isSaving}
                    />
                    <span className='text-lg'>Aa</span>
                  </div>
                </div>

                {/* Compact Mode Toggle */}
                <div className='flex items-center justify-between p-4 hover:bg-base-200/50 rounded-lg transition-colors'>
                  <div>
                    <h3 className='font-semibold'>Compact Mode</h3>
                    <p className='text-sm text-base-content/60'>Make interface more compact</p>
                  </div>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-info'
                    checked={appearanceSettings.compactMode}
                    onChange={handleCompactModeToggle}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== DATA & STORAGE ===== */}
          <div className='card bg-base-100 shadow-xl border border-base-300 animate-fade-in-up animation-delay-1000'>
            <div className='card-body'>
              <h2 className='card-title text-xl mb-6 flex items-center gap-2'>
                <Smartphone className='text-blue-500 size-5' />
                Data & Storage
              </h2>

              <div className='space-y-4'>
                {/* Storage Usage */}
                <div>
                  <div className='flex justify-between mb-2'>
                    <h3 className='font-semibold'>Storage Used</h3>
                    <span className='text-sm font-semibold'>2.4 GB / 15 GB</span>
                  </div>
                  <progress className='progress progress-warning w-full' value='16' max='100'></progress>
                </div>

                {/* Clear Cache Button */}
                <button
                  onClick={handleClearCache}
                  disabled={isSaving}
                  className='flex items-center justify-between w-full p-4 rounded-lg hover:bg-base-200/50 transition-colors border border-base-300'
                >
                  <div className='text-left'>
                    <h3 className='font-semibold'>Clear Cache</h3>
                    <p className='text-sm text-base-content/60'>Free up storage space (456 MB)</p>
                  </div>
                  <div className='btn btn-sm btn-warning'>Clear</div>
                </button>

                {/* Download Data Button */}
                <button
                  onClick={handleDownloadData}
                  disabled={isSaving}
                  className='flex items-center justify-between w-full p-4 rounded-lg hover:bg-base-200/50 transition-colors border border-base-300'
                >
                  <div className='text-left'>
                    <h3 className='font-semibold'>Download Your Data</h3>
                    <p className='text-sm text-base-content/60'>Get a copy of your chat history</p>
                  </div>
                  <ChevronRight className='size-5 text-base-content/40' />
                </button>
              </div>
            </div>
          </div>

          {/* ===== DANGER ZONE ===== */}
          <div className='card bg-error/5 shadow-xl border-2 border-error/30 animate-fade-in-up animation-delay-1200'>
            <div className='card-body'>
              <h2 className='card-title text-xl mb-6 flex items-center gap-2 text-error'>
                <Trash2 className='size-5' />
                Danger Zone
              </h2>

              <div className='space-y-3'>
                {/* Logout All Devices Button */}
                <button
                  onClick={handleLogoutAllDevices}
                  disabled={isSaving}
                  className='btn btn-outline btn-warning w-full gap-2 justify-start'
                >
                  <LogOut className='size-5' />
                  Logout from All Devices
                </button>

                {/* Delete Account Button */}
                <button
                  onClick={handleDeleteAccount}
                  disabled={isSaving}
                  className='btn btn-outline btn-error w-full gap-2 justify-start'
                >
                  <Trash2 className='size-5' />
                  Delete My Account
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className='mt-12 text-center text-sm text-base-content/70 animate-fade-in'>
          <p>Settings are saved automatically when you make changes</p>
          <p>Last updated: Today at 2:45 PM</p>
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

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
      `}</style>
    </div>
  )
}

export default SettingsPage