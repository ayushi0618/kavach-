import { motion } from 'framer-motion';
import { assetHistory } from '../data/mockAssetData';
import { CheckCircle2, Wrench, ArrowRightLeft, ShieldPlus } from 'lucide-react';

export default function AssetTimeline() {
  const getIcon = (event) => {
    if (event === 'Registered') return <ShieldPlus size={16} />;
    if (event === 'Transferred') return <ArrowRightLeft size={16} />;
    if (event === 'Maintenance' || event === 'Repair') return <Wrench size={16} />;
    return <CheckCircle2 size={16} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-6">Asset Lifecycle Timeline</h3>
      
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {assetHistory.map((history, idx) => (
          <motion.div 
            key={history.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 pb-6"
          >
            <div className="relative z-10 w-6 h-6 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
              {getIcon(history.event)}
            </div>
            <div className="flex-1 bg-gray-50 border border-border rounded p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-olive text-sm">{history.event}</span>
                <span className="text-xs text-gray-500">{history.date} • {history.time}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{history.remarks}</p>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex justify-between">
                <span>By: {history.user}</span>
                <span>Dept: {history.dept}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}