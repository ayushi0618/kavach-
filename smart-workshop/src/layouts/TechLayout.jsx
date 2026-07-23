import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  QrCode, 
  Wrench, 
  UserCircle 
} from 'lucide-react';

const techNavItems = [
  { path: '/technician/dashboard', label: 'Today\'s Tasks', icon: LayoutDashboard },
  { path: '/technician/jobs', label: 'Assigned Jobs', icon: ClipboardCheck, badge: '2' },
  { path: '/technician/scanner', label: 'QR Scanner', icon: QrCode },
  { path: '/technician/maintenance', label: 'Maintenance History', icon: Wrench },
  { path: '/technician/profile', label: 'Profile', icon: UserCircle },
];

export default function TechLayout() {
  return (
    <div className="flex h-screen bg-gray-light font-sans text-gray-800 overflow-hidden">
      <Sidebar navItems={techNavItems} roleTitle="Technician Panel" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-light p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
