import { motion } from 'framer-motion';
import { PlusCircle, UserPlus, Calendar, QrCode, PackagePlus, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { label: 'Register Asset', icon: PlusCircle, path: '/admin/assets/new' },
  { label: 'Assign Tech', icon: UserPlus, path: '/admin/maintenance/new' },
  { label: 'Schedule', icon: Calendar, path: '/admin/maintenance/calendar' },
  { label: 'Generate QR', icon: QrCode, path: '/admin/assets' },
  { label: 'Add Inventory', icon: PackagePlus, path: '/admin/inventory/new' },
  { label: 'Create Report', icon: FileText, path: '/admin/reports' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
      {actions.map((action, idx) => (
        <motion.button
          key={idx}
          onClick={() => navigate(action.path)}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -4, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          className="bg-white p-4 rounded-lg shadow-sm border border-border flex flex-col items-center justify-center gap-2 group hover:border-primary transition-all"
        >
          <div className="text-gray-400 group-hover:text-primary transition-colors">
            <action.icon size={28} />
          </div>
          <span className="text-xs font-semibold text-olive text-center">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}