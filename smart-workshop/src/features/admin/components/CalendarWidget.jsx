import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <CalendarIcon size={18} /> Upcoming Schedule
      </h3>
      <div className="space-y-4">
        {[
          { date: '24 Jul', event: 'Mass Vehicle Inspection (VRG)' },
          { date: '25 Jul', event: 'Vendor Meeting - Spares' },
          { date: '28 Jul', event: 'Monthly Quality Audit' },
        ].map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="bg-khaki-light text-olive font-bold text-xs p-2 rounded text-center w-14 shrink-0">
              {item.date}
            </div>
            <div className="pt-1.5 text-sm font-medium text-gray-700">
              {item.event}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}