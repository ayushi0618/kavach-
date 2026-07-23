import { motion } from 'framer-motion';
import { techVehicles } from '../../../data/mockTechData';
import { Truck } from 'lucide-react';

export default function MyVehicles() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-olive mb-4">My Active Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {techVehicles.map((v, idx) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-border overflow-hidden"
          >
            <div className="h-32 bg-khaki-light flex items-center justify-center text-gray-400 border-b border-border">
              <Truck size={48} className="opacity-20" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-olive">{v.id}</h3>
              <p className="text-xs text-gray-500 font-medium mb-3">{v.type} • {v.category}</p>
              
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Stage: {v.stage}</span>
                <span>{v.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${v.progress}%` }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}