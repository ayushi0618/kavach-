import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Lock, Save, ShieldCheck, Mail, Building, KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function UserProfileModal({ isOpen, onClose }) {
  const { user, updateUserPassword, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'password'
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      toast.error('Password must be at least 4 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await updateUserPassword(newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setActiveTab('profile');
    } catch (err) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col border border-border"
      >
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-olive text-white flex items-center justify-center font-bold text-sm">
              {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-olive text-base">{user.fullName}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border bg-white text-xs font-bold">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === 'profile' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Personnel Profile
          </button>
          <button 
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
              activeTab === 'password' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Change Login Password
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            <div className="space-y-4 text-sm">
              <div className="p-3 bg-gray-50 rounded border border-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Service Email:</span>
                  <span className="font-bold text-gray-800">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">System Role:</span>
                  <span className="font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">{user.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Assigned Department:</span>
                  <span className="font-bold text-gray-800">{user.department || 'Vehicle Repair Group (WSG)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Specialization / Rank:</span>
                  <span className="font-bold text-gray-800">{user.specialization || 'EME Technical Officer'}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-border">
                <button 
                  onClick={() => setActiveTab('password')}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <KeyRound size={14} /> Change Password
                </button>
                <button 
                  onClick={() => { logout(); onClose(); }}
                  className="text-xs font-bold text-danger hover:underline flex items-center gap-1"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Current Password *</label>
                <input 
                  type="password" 
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">New Personal Password *</label>
                <input 
                  type="password" 
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimum 4 characters"
                  className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Confirm New Password *</label>
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-3">
                <button type="button" onClick={() => setActiveTab('profile')} className="px-4 py-2 border border-border rounded text-gray-600 font-bold text-xs">
                  Back
                </button>
                <button type="submit" disabled={loading} className="px-5 py-2 bg-primary text-white rounded font-bold text-xs shadow hover:bg-olive transition-colors flex items-center gap-2 disabled:opacity-50">
                  <Save size={14} /> {loading ? 'Updating...' : 'Save New Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
