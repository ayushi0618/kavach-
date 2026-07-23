import { motion } from 'framer-motion';

const stages = ["Received", "Inspection", "Repair", "QA", "QC", "Testing", "Completed"];
const activeStage = 2; // Repair is active

export default function WorkflowTracking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6"
    >
      <h3 className="text-lg font-bold text-olive mb-8">Live Workflow Tracking (Avg. Vehicle)</h3>
      
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-primary"
          ></motion.div>
        </div>

        <div className="flex justify-between relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= activeStage;
            const isActive = idx === activeStage;
            
            return (
              <motion.div 
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-4 flex items-center justify-center bg-white ${isCompleted ? 'border-primary' : 'border-gray-300'}`}>
                  {isCompleted && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  {isActive && <div className="absolute -top-2 -right-2 w-3 h-3 bg-warning rounded-full animate-ping"></div>}
                </div>
                <div className={`mt-3 text-xs md:text-sm font-semibold ${isCompleted ? 'text-olive' : 'text-gray-400'}`}>
                  {stage}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}