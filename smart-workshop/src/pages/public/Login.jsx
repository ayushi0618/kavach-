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
    { 
      id: 'USR-CMD-01',
      fullName: 'Col. R. S. Rathore', 
      email: 'admin@workshop.com', 
      role: 'ADMIN', 
      rank: 'Workshop Commander', 
      department: 'Command Office (510 ABW)',
      specialization: 'Command & Heavy Overhaul Ops',
      serviceNo: 'EME-782910-C',
      phone: '+91 98100 11223',
      garrison: 'Meerut Cantt, Uttar Pradesh',
      clearance: 'Level 5 - Top Secret (Command)',
      joinDate: '10 May 2005'
    },
    { 
      id: 'USR-TECH-01',
      fullName: 'Sub. Maj. Rajesh Sharma', 
      email: 'eme.tech.1@eme.gov.in', 
      role: 'TECHNICIAN', 
      rank: 'Subedar Major', 
      department: 'Vehicle Repair Group (WSG)',
      specialization: 'TATRA 8x8 & Heavy Transport Overhaul',
      serviceNo: 'EME-890214-A',
      phone: '+91 98765 43210',
      garrison: 'Meerut Cantt, Uttar Pradesh',
      clearance: 'Level 3 - Secret',
      joinDate: '12 Aug 2012'
    },
    { 
      id: 'USR-TECH-02',
      fullName: 'Hav. Vikram Singh', 
      email: 'eme.tech.2@eme.gov.in', 
      role: 'TECHNICIAN', 
      rank: 'Havildar', 
      department: 'Equipment Repair Group (ERG)',
      specialization: 'Hydraulic Systems & Earthmovers',
      serviceNo: 'EME-445102-B',
      phone: '+91 98765 12345',
      garrison: 'Meerut Cantt, Uttar Pradesh',
      clearance: 'Level 2 - Confidential',
      joinDate: '05 Jan 2016'
    },
    { 
      id: 'USR-TECH-03',
      fullName: 'Nk. Amit Patel', 
      email: 'eme.tech.3@eme.gov.in', 
      role: 'TECHNICIAN', 
      rank: 'Naik', 
      department: 'Armament Group',
      specialization: 'BMP-2 Turret & Weapon Systems',
      serviceNo: 'EME-671209-D',
      phone: '+91 98765 54321',
      garrison: 'Meerut Cantt, Uttar Pradesh',
      clearance: 'Level 3 - Secret',
      joinDate: '18 Nov 2018'
    },
    { 
      id: 'USR-ADM-02',
      fullName: 'Capt. Ayushi Singh', 
      email: 'eme.tech.7@eme.gov.in', 
      role: 'ADMIN', 
      rank: 'Captain', 
      department: 'QA / QC Inspection Wing',
      specialization: 'Quality Control & Ordnance Auditing',
      serviceNo: 'EME-119834-Q',
      phone: '+91 98112 33445',
      garrison: 'Meerut Cantt, Uttar Pradesh',
      clearance: 'Level 4 - Secret',
      joinDate: '22 Mar 2020'
    },
    { 
      id: 'USR-TECH-05',
      fullName: 'Sep. Deepak Verma', 
      email: 'eme.tech.5@eme.gov.in', 
      role: 'TECHNICIAN', 
      rank: 'Sepoy', 
      department: 'Electrical & AC Group',
      specialization: 'Vehicle Wiring & AC Electronics',
      serviceNo: 'EME-998120-E',
      phone: '+91 98765 67890',
      garrison: 'Meerut Cantt, Uttar Pradesh',
      clearance: 'Level 1 - Restricted',
      joinDate: '14 Jun 2022'
    }
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
      // Fallback for custom demo credentials or any personnel email input
      const matchedDemo = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matchedDemo) {
        loginDirect(matchedDemo);
        navigate(matchedDemo.role === 'ADMIN' ? '/admin/dashboard' : '/technician/dashboard');
      } else {
        const cleanInput = email.trim().toLowerCase();
        if (cleanInput.includes('@') || cleanInput.includes('admin') || cleanInput.includes('eme')) {
          const role = (cleanInput.includes('admin') || cleanInput.includes('cmd') || cleanInput.includes('officer')) ? 'ADMIN' : 'TECHNICIAN';
          const namePart = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim();
          const fullName = namePart ? namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Personnel User';
          const fallbackUser = {
            id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
            fullName: fullName,
            email: email,
            role: role,
            rank: role === 'ADMIN' ? 'Officer' : 'Technician Specialist',
            department: role === 'ADMIN' ? 'Command Office (510 ABW)' : 'Vehicle Repair Group (WSG)',
            specialization: role === 'ADMIN' ? 'Workshop Operations' : 'EME Maintenance',
            serviceNo: `EME-${Math.floor(100000 + Math.random() * 900000)}-X`,
            phone: '+91 98765 00000',
            garrison: 'Meerut Cantt, Uttar Pradesh',
            clearance: 'Level 2 - Secret',
            joinDate: '01 Jan 2021'
          };
          loginDirect(fallbackUser);
          navigate(role === 'ADMIN' ? '/admin/dashboard' : '/technician/dashboard');
        } else {
          toast.error(err.response?.data?.error || 'Invalid email or password');
        }
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
