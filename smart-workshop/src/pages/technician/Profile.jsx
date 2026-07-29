import { useState, useEffect } from 'react';
import PageTransition from '../../components/animations/PageTransition';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Wrench, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  KeyRound, 
  Save, 
  Star, 
  Building2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, setUser, updateUserPassword } = useAuth();
  const [profile, setProfile] = useState({
    fullName: user?.fullName || 'Personnel Profile',
    serviceNo: user?.serviceNo || 'EME-890214-A',
    rank: user?.rank || 'Technician Specialist',
    unit: '510 Army Base Workshop (EME)',
    dept: user?.department || user?.dept || 'Vehicle Repair Group (WSG)',
    email: user?.email || 'technician@eme.gov.in',
    phone: user?.phone || '+91 98765 43210',
    garrison: user?.garrison || 'Meerut Cantt, Uttar Pradesh',
    clearance: user?.clearance || 'Level 3 - Secret (Armament & Heavy Transport)',
    joinDate: user?.joinDate || '12 Aug 2012'
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || 'Personnel Profile',
        serviceNo: user.serviceNo || 'EME-890214-A',
        rank: user.rank || 'Technician Specialist',
        unit: '510 Army Base Workshop (EME)',
        dept: user.department || user.dept || 'Vehicle Repair Group (WSG)',
        email: user.email || 'technician@eme.gov.in',
        phone: user.phone || '+91 98765 43210',
        garrison: user.garrison || 'Meerut Cantt, Uttar Pradesh',
        clearance: user.clearance || 'Level 3 - Secret',
        joinDate: user.joinDate || '12 Aug 2012'
      });
    }
  }, [user]);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      fullName: profile.fullName,
      email: profile.email,
      department: profile.dept,
      phone: profile.phone,
      garrison: profile.garrison
    }));
    toast.success('Personnel Profile details updated successfully!');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error('Please enter your current and new password');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await updateUserPassword(passwordForm.newPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('Failed to update password');
    }
  };

  const initials = (profile.fullName || 'EME').split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-primary via-olive to-[#2c3826] text-white p-6 md:p-8 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-khaki flex items-center justify-center font-black text-2xl text-khaki shadow-inner shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black">{profile.fullName}</h1>
                <span className="bg-khaki text-olive px-2.5 py-0.5 rounded text-xs font-black uppercase">
                  {profile.rank}
                </span>
              </div>
              <p className="text-xs text-gray-200 mt-1 flex items-center gap-2">
                <span>{profile.dept}</span> • <span>Service No: {profile.serviceNo}</span>
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-khaki">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} /> {profile.clearance}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-center border border-white/10">
              <div className="text-[10px] text-gray-300 font-bold uppercase">Fix Rate YTD</div>
              <div className="text-xl font-black text-khaki">96.8%</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg text-center border border-white/10">
              <div className="text-[10px] text-gray-300 font-bold uppercase">QA Score</div>
              <div className="text-xl font-black text-green-400">99.2%</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Overhauls Completed</span>
              <Wrench size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-black text-olive mt-2">142</div>
            <p className="text-[10px] text-success font-bold mt-1">↑ +14% vs Last Quarter</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>First-Time Pass Rate</span>
              <CheckCircle2 size={16} className="text-success" />
            </div>
            <div className="text-2xl font-black text-olive mt-2">96.8%</div>
            <p className="text-[10px] text-gray-400 font-bold mt-1">Zero rework flags</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Commendations</span>
              <Award size={16} className="text-amber-600" />
            </div>
            <div className="text-2xl font-black text-olive mt-2">3 Medals</div>
            <p className="text-[10px] text-amber-600 font-bold mt-1">Northern Command Citation</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Years of Service</span>
              <Star size={16} className="text-khaki" />
            </div>
            <div className="text-2xl font-black text-olive mt-2">14 Years</div>
            <p className="text-[10px] text-gray-400 font-bold mt-1">Active Duty EME</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Personnel Information */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-border shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-olive border-b border-border pb-3 flex items-center gap-2">
              <User size={18} className="text-primary" /> Service Personnel Information
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Service Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded font-semibold text-gray-800 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Service Rank</label>
                  <input 
                    type="text" 
                    disabled
                    value={profile.rank}
                    className="w-full px-3 py-2 border border-border rounded font-semibold bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Service Number</label>
                  <input 
                    type="text" 
                    disabled
                    value={profile.serviceNo}
                    className="w-full px-3 py-2 border border-border rounded font-mono font-bold bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Assigned Department</label>
                  <input 
                    type="text" 
                    disabled
                    value={profile.dept}
                    className="w-full px-3 py-2 border border-border rounded font-semibold bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Official Email</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded font-semibold text-gray-800 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Contact Secure Phone</label>
                  <input 
                    type="text" 
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded font-semibold text-gray-800 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Garrison Station Location</label>
                <input 
                  type="text" 
                  value={profile.garrison}
                  onChange={(e) => setProfile({ ...profile, garrison: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded font-semibold text-gray-800 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  type="submit"
                  className="bg-primary hover:bg-olive text-white px-5 py-2 rounded font-bold transition-colors flex items-center gap-1.5 shadow"
                >
                  <Save size={15} /> Save Profile Updates
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Specializations & Security */}
          <div className="lg:col-span-5 space-y-6">
            {/* Technical Specializations */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4 text-xs">
              <h3 className="text-base font-bold text-olive border-b border-border pb-3 flex items-center gap-2">
                <Award size={18} className="text-khaki" /> EME Technical Certifications
              </h3>

              <div className="space-y-2">
                <div className="p-3 bg-gray-50 border border-border rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold text-olive">TATRA 8x8 Engine Specialist</div>
                    <div className="text-[10px] text-gray-500">Certified by High Altitude Repair School</div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-success font-bold text-[10px] rounded">Active</span>
                </div>

                <div className="p-3 bg-gray-50 border border-border rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold text-olive">BMP-2 Turret & Cannon Diagnostics</div>
                    <div className="text-[10px] text-gray-500">Class 1 Ordnance QA Qualified</div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-success font-bold text-[10px] rounded">Active</span>
                </div>

                <div className="p-3 bg-gray-50 border border-border rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold text-olive">High-Pressure Hydraulic Systems</div>
                    <div className="text-[10px] text-gray-500">Heavy Overhaul Workshop Certified</div>
                  </div>
                  <span className="px-2 py-0.5 bg-green-100 text-success font-bold text-[10px] rounded">Active</span>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4 text-xs">
              <h3 className="text-base font-bold text-olive border-b border-border pb-3 flex items-center gap-2">
                <Lock size={18} className="text-primary" /> Security Password Credentials
              </h3>

              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Current Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-3 py-1.5 border border-border rounded focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">New Account Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter new strong password"
                    className="w-full px-3 py-1.5 border border-border rounded focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-1.5 border border-border rounded focus:border-primary focus:outline-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-olive hover:bg-primary text-white py-2 rounded font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <KeyRound size={14} /> Update Security Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
