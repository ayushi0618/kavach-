import { format } from 'date-fns';
import { Sun } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';

export default function DashboardHeader() {
  const { user } = useAuth();
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-border mb-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-olive">Command Center</h1>
        <p className="text-gray-500">Welcome back, {user?.name || 'Administrator'}!</p>
      </div>
      <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm font-medium text-gray-600">
        <div className="flex items-center gap-2 bg-gray-light px-4 py-2 rounded-full border border-border">
          <Sun size={18} className="text-warning" />
          <span>28°C Meerut, Clear</span>
        </div>
        <div className="hidden sm:block">
          {format(new Date(), 'EEEE, dd MMM yyyy')}
        </div>
      </div>
    </motion.div>
  );
}