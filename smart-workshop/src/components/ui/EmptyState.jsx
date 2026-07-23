import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = PackageOpen, 
  title = 'No Data Found', 
  description = 'There are currently no records to display here.',
  actionLabel,
  onAction
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-300 text-center"
    >
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-2.5 bg-olive text-white rounded-lg text-sm font-bold shadow-sm hover:bg-opacity-90 hover:shadow transition-all active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
