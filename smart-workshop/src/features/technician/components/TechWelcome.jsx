import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

export default function TechWelcome() {
  const { user } = useAuth();
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-olive">
          Welcome, {user?.fullName || 'Technician'}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm font-medium text-gray-500">
          <span className="bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded text-xs">
            {user?.rank || 'Technician'}
          </span>
          <span>ID: <strong className="text-gray-800 font-mono">{user?.id || user?.serviceNo || 'EME-402'}</strong></span>
          <span>•</span>
          <span>Dept: <strong className="text-gray-800">{user?.department || user?.dept || 'Vehicle Repair Group'}</strong></span>
          {user?.specialization && (
            <>
              <span>•</span>
              <span className="text-xs text-olive font-bold">{user.specialization}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-4 text-sm font-bold text-olive bg-gray-light p-3 rounded border border-border shrink-0">
        <span>{format(new Date(), 'dd MMM yyyy')}</span>
        <span className="text-gray-400">|</span>
        <span>Shift: General (08:00 - 17:00)</span>
      </div>
    </motion.div>
  );
}