import { motion } from 'framer-motion';
import { PackageMinus, FileText, CheckCircle, FileSpreadsheet, Send, Search, BadgeDollarSign, Scale, Trophy, ShoppingCart, Truck, SearchCheck, Warehouse } from 'lucide-react';

const stages = [
  { icon: PackageMinus, label: 'Low Stock' },
  { icon: FileText, label: 'PR Raised' },
  { icon: CheckCircle, label: 'Approval' },
  { icon: FileSpreadsheet, label: 'Tender' },
  { icon: Send, label: 'Bids' },
  { icon: Search, label: 'Tech Eval' },
  { icon: BadgeDollarSign, label: 'Comm Eval' },
  { icon: Scale, label: 'Compare' },
  { icon: Trophy, label: 'L1 Select' },
  { icon: ShoppingCart, label: 'PO Issue' },
  { icon: Truck, label: 'Delivery' },
  { icon: SearchCheck, label: 'Inspection' },
  { icon: Warehouse, label: 'Warehouse' }
];

export default function ProcurementWorkflowAnimation() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border overflow-x-auto">
      <h3 className="text-lg font-bold text-olive mb-8 sticky left-0">Procurement Lifecycle</h3>
      
      <div className="relative flex justify-between items-center px-4 min-w-[1200px] min-h-[120px]">
        {/* Background Track */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-100 -translate-y-1/2"></div>
        
        {/* Animated Connector Line */}
        <motion.div 
          className="absolute top-1/2 left-8 h-1 bg-primary -translate-y-1/2 shadow-[0_0_8px_rgba(75,93,58,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div 
              key={idx}
              className="relative z-10 flex flex-col items-center bg-white p-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 border-2 border-primary flex items-center justify-center text-olive shadow-sm">
                <Icon size={16} />
              </div>
              <div className="mt-2 text-[9px] font-bold text-gray-600 uppercase tracking-wide text-center w-16 leading-tight">
                {stage.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}