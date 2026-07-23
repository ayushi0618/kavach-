import { motion } from 'framer-motion';
import { activities } from '../../../data/mockData';
import { Clock } from 'lucide-react';

export default function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-6 flex items-center gap-2">
        <Clock size={18} /> Activity Timeline
      </h3>
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
        {activities.map((act, idx) => (
          <motion.div 
            key={act.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-6"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-khaki text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative"></div>
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-gray-light p-3 rounded border border-border">
              <p className="text-sm font-medium text-olive">{act.text}</p>
              <span className="text-xs text-gray-500 mt-1 block">{act.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}