import { motion } from 'framer-motion';
import { stockMovement } from '../data/mockInventoryData';
import { ArrowUpRight, ArrowDownLeft, RotateCcw } from 'lucide-react';

export default function StockMovementTimeline() {
  const getIcon = (action) => {
    if (action === 'Issued') return <ArrowUpRight size={16} />;
    if (action === 'Received') return <ArrowDownLeft size={16} />;
    return <RotateCcw size={16} />;
  };

  const getColor = (action) => {
    if (action === 'Issued') return 'bg-orange-100 text-warning border-warning';
    if (action === 'Received') return 'bg-green-100 text-success border-success';
    return 'bg-blue-100 text-info border-info';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-bold text-olive mb-6">Recent Stock Movement</h3>
      
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-3.5 before:translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {stockMovement.map((log, idx) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 pb-6"
          >
            <div className={`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm ${getColor(log.action)}`}>
              {getIcon(log.action)}
            </div>
            <div className="flex-1 bg-gray-50 border border-border rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-800 text-sm">{log.action}: <span className="text-olive">{log.qty} Units</span></span>
                <span className="text-xs text-gray-500">{log.date} • {log.time}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{log.reason}</p>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex justify-between">
                <span>By: {log.user}</span>
                <span>To/From: {log.tech}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}