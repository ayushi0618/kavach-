import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function TechWelcome() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-olive">Good Morning, Rahul</h1>
        <div className="flex gap-4 mt-2 text-sm font-medium text-gray-500">
          <span>ID: TECH-402</span>
          <span>Dept: Vehicle Repair Group</span>
        </div>
      </div>
      <div className="flex gap-4 text-sm font-bold text-olive bg-gray-light p-3 rounded border border-border">
        <span>{format(new Date(), 'dd MMM yyyy')}</span>
        <span className="text-gray-400">|</span>
        <span>Shift: General (08:00 - 17:00)</span>
      </div>
    </motion.div>
  );
}