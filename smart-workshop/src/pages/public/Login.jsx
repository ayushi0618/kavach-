import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageTransition from '../../components/animations/PageTransition';
import { ShieldCheck, Wrench, Lock, Mail, UserCheck, Eye, EyeOff, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const { loginWithCredentials, loginDirect } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@workshop.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoUsers = [
    { fullName: 'Col. R. S. Rathore', email: 'admin@workshop.com', role: 'ADMIN', rank: 'Workshop Commander', dept: 'Command Office (510 ABW)' },
    { fullName: 'Sub. Maj. Rajesh Sharma', email: 'eme.tech.1@eme.gov.in', role: 'TECHNICIAN', rank: 'Subedar Major', dept: 'Vehicle Repair Group (WSG)' },
    { fullName: 'Hav. Vikram Singh', email: 'eme.tech.2@eme.gov.in', role: 'TECHNICIAN', rank: 'Havildar', dept: 'Equipment Repair Group (ERG)' },
    { fullName: 'Nk. Amit Patel', email: 'eme.tech.3@eme.gov.in', role: 'TECHNICIAN', rank: 'Naik', dept: 'Armament Group' },
    { fullName: 'Capt. Ayushi Singh', email: 'eme.tech.7@eme.gov.in', role: 'ADMIN', rank: 'Captain', dept: 'QA / QC Inspection Wing' },
    { fullName: 'Sep. Deepak Verma', email: 'eme.tech.5@eme.gov.in', role: 'TECHNICIAN', rank: 'Sepoy', dept: 'Electrical & AC Group' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your login email and password');
      return;
    }
    setIsSubmitting(true);
    try {
      const loggedUser = await loginWithCredentials(email, password);
      if (loggedUser.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/technician/dashboard');
      }
    } catch (err) {
      // Fallback for custom demo credentials
      const matchedDemo = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matchedDemo) {
        loginDirect(matchedDemo);
        navigate(matchedDemo.role === 'ADMIN' ? '/admin/dashboard' : '/technician/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectDemo = (person) => {
    setEmail(person.email);
    setPassword('password123');
    loginDirect(person);
    navigate(person.role === 'ADMIN' ? '/admin/dashboard' : '/technician/dashboard');
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-md mx-auto">
        <div className="text-center">
          <h3 className="text-xl font-bold text-olive">Individual Personnel Sign In</h3>
          <p className="text-xs text-gray-500 mt-1">Enter your personal service email & password to access your profile.</p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Personnel Service Email *</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. rajesh.sharma@eme.gov.in"
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Account Password *</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2 text-sm border border-border rounded focus:border-primary focus:outline-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded font-bold text-sm text-white bg-primary hover:bg-olive transition-colors shadow-sm disabled:opacity-50"
          >
            <KeyRound size={16} /> {isSubmitting ? 'Verifying Credentials...' : 'Sign In to My Profile'}
          </button>
        </form>

        {/* Quick Personnel Profile Selector */}
        <div className="pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            <span>Quick Select Personnel Profiles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            {demoUsers.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDemo(p)}
                className="p-2.5 bg-white border border-border rounded hover:border-khaki hover:shadow-xs transition-all flex items-center gap-2.5 text-left"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                  p.role === 'ADMIN' ? 'bg-olive' : 'bg-primary'
                }`}>
                  {p.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-gray-800 truncate">{p.fullName}</div>
                  <div className="text-[10px] text-gray-500 truncate">{p.rank} • {p.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
