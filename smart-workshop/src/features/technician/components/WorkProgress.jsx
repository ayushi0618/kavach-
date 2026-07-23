import { motion } from 'framer-motion';

const stages = ["Received", "Inspection", "Repair", "Testing", "QA", "QC", "Completed"];

export default function WorkProgress({ activeStage = 2 }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6 overflow-x-auto">
      <h3 className="text-lg font-bold text-olive mb-8">Active Job Progress (ERG-102)</h3>
      
      <div className="relative min-w-[600px] mx-4 mb-4">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 -translate-y-1/2 rounded-full"></div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-0 h-1.5 bg-primary -translate-y-1/2 rounded-full"
        ></motion.div>

        <div className="flex justify-between relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= activeStage;
            const isActive = idx === activeStage;
            
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white ${isCompleted ? 'border-primary' : 'border-gray-300'}`}>
                  {isCompleted && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  {isActive && <div className="absolute -top-2 -right-2 w-3 h-3 bg-warning rounded-full animate-ping"></div>}
                </div>
                <div className={`mt-3 text-xs font-bold ${isCompleted ? 'text-olive' : 'text-gray-400'}`}>
                  {stage}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}