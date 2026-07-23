import { motion } from 'framer-motion';
import { FilePlus, Wrench, CheckCircle, SearchCode } from 'lucide-react';

export default function SlideWorkflow() {
  const steps = [
    { title: "Asset Arrival", icon: SearchCode, desc: "QR Scanned & Ticket Created" },
    { title: "Diagnosis", icon: SearchCode, desc: "AI Failure Analysis" },
    { title: "Repair", icon: Wrench, desc: "Parts Issued & Fixed" },
    { title: "QA Passed", icon: CheckCircle, desc: "Vehicle Ready for Duty" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white p-12">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-olive mb-16">Standardized Maintenance Workflow</motion.h2>
      
      <div className="flex items-center justify-center gap-4 w-full max-w-6xl">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: i * 0.4, type: 'spring' }}
              className="w-48 h-48 bg-gray-50 border-2 border-olive rounded-full flex flex-col items-center justify-center shadow-lg relative z-10"
            >
              <step.icon size={40} className="text-khaki mb-4" />
              <h3 className="font-bold text-olive text-lg">{step.title}</h3>
              <p className="text-xs text-gray-500 mt-2 text-center px-4">{step.desc}</p>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 100, opacity: 1 }}
                transition={{ delay: (i * 0.4) + 0.2, duration: 0.4 }}
                className="h-2 bg-olive w-24 -mx-2 z-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
