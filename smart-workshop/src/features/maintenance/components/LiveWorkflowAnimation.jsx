import { motion } from 'framer-motion';
import { Truck, QrCode, ClipboardCheck, FileText, Wrench, PackageSearch, Activity, CheckCircle2, Factory } from 'lucide-react';

const stages = [
  { icon: Truck, label: 'Arrival' },
  { icon: QrCode, label: 'Asset Scan' },
  { icon: ClipboardCheck, label: 'Inspection' },
  { icon: FileText, label: 'Ticket' },
  { icon: Wrench, label: 'Repair' },
  { icon: PackageSearch, label: 'Parts' },
  { icon: Activity, label: 'Testing' },
  { icon: CheckCircle2, label: 'QA/QC' },
  { icon: Factory, label: 'Completed' }
];

export default function LiveWorkflowAnimation() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border overflow-hidden">
      <h3 className="text-lg font-bold text-olive mb-8">Live Workflow Architecture</h3>
      
      <div className="relative flex justify-between items-center px-4 max-w-5xl mx-auto min-h-[120px]">
        {/* Background Track */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-100 -translate-y-1/2"></div>
        
        {/* Animated Connector Line */}
        <motion.div 
          className="absolute top-1/2 left-8 h-1 bg-primary -translate-y-1/2 shadow-[0_0_8px_rgba(75,93,58,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div 
              key={idx}
              className="relative z-10 flex flex-col items-center bg-white p-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 border-2 border-primary flex items-center justify-center text-olive shadow-sm">
                <Icon size={20} />
              </div>
              <div className="mt-2 text-[10px] font-bold text-gray-600 uppercase tracking-wide text-center w-20">
                {stage.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}