import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';
import FloatingAIAssistant from '../features/ai/components/FloatingAIAssistant';
import { 
  LayoutDashboard, 
  Package, 
  Workflow, 
  Wrench, 
  ClipboardList, 
  PieChart, 
  Users, 
  Settings,
  ShoppingCart,
  Sparkles
} from 'lucide-react';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/assets', label: 'Assets & Vehicles', icon: Package },
  { path: '/admin/workflow', label: 'Workflow', icon: Workflow },
  { path: '/admin/inventory', label: 'Inventory', icon: ClipboardList, badge: 'Low' },
  { path: '/admin/procurement', label: 'Procurement', icon: ShoppingCart },
  { path: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
  { path: '/admin/reports', label: 'Reports', icon: ClipboardList },
  { path: '/admin/analytics', label: 'Analytics', icon: PieChart },
  { path: '/admin/ai', label: 'AI Insights', icon: Sparkles, badge: 'New' },
  { path: '/admin/employees', label: 'Employees', icon: Users },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-light font-sans text-gray-800 overflow-hidden">
      <Sidebar navItems={adminNavItems} roleTitle="Admin Panel" />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-light p-6 relative">
          <Outlet />
        </main>
      </div>
      <FloatingAIAssistant />
    </div>
  );
}
