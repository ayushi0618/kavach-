import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const statuses = [
  "Inspection Completed",
  "Repair Started",
  "Repair Completed",
  "Testing Started",
  "Testing Completed",
  "QA Submitted",
  "Ready for Dispatch"
];

export default function MaintenanceUpdate() {
  const [activeIdx, setActiveIdx] = useState(1); // Repair Started

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4">Update Status</h3>
      <div className="space-y-2">
        {statuses.map((status, idx) => {
          const isCompleted = idx <= activeIdx;
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveIdx(idx)}
              className={`w-full flex items-center justify-between p-3 rounded border text-left transition-colors ${isCompleted ? 'bg-khaki-light/50 border-primary text-olive' : 'bg-gray-50 border-border text-gray-500 hover:bg-gray-100'}`}
            >
              <span className="text-sm font-bold">{status}</span>
              {isCompleted ? <CheckCircle2 size={18} className="text-success" /> : <Circle size={18} />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}