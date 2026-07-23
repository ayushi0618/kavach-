import { techSchedule } from '../../../data/mockTechData';
import { Clock } from 'lucide-react';

export default function TodaySchedule() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Clock size={18} /> Today's Schedule
      </h3>
      <div className="space-y-4">
        {techSchedule.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <div className="w-14 text-right shrink-0 font-bold text-sm text-olive">
              {item.time}
            </div>
            <div className="relative w-2 h-2 rounded-full bg-gray-300 shrink-0">
              {idx !== techSchedule.length - 1 && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-200"></div>
              )}
            </div>
            <div className={`text-sm font-semibold ${item.type === 'break' ? 'text-gray-400' : item.type === 'work' ? 'text-primary' : 'text-gray-600'}`}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}