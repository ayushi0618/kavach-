import { motion } from 'framer-motion';
import { CheckCircle2, User, Wrench, Package, ClipboardList } from 'lucide-react';

export default function MaintenanceTimeline({ job }) {
  const getIcon = (event) => {
    if (event.includes('Ticket')) return <ClipboardList size={16} />;
    if (event.includes('Assigned')) return <User size={16} />;
    if (event.includes('Parts')) return <Package size={16} />;
    if (event.includes('Repair') || event.includes('Progress')) return <Wrench size={16} />;
    return <CheckCircle2 size={16} />;
  };

  const getTimeline = () => {
    if (!job) return [];
    
    const timeline = [];
    
    // Created
    if (job.createdAt) {
      timeline.push({
        id: 1,
        event: 'Ticket Created',
        date: new Date(job.createdAt).toLocaleDateString(),
        time: new Date(job.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        remarks: job.description,
        user: 'System'
      });
    }
    
    // Assignment/Start
    if (job.startDate) {
      timeline.push({
        id: 2,
        event: 'Assigned & Started',
        date: new Date(job.startDate).toLocaleDateString(),
        time: new Date(job.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        remarks: `Assigned to ${job.technicianName || 'Technician'}`,
        user: 'Admin'
      });
    }

    // Current Status
    if (job.status !== 'Pending' && job.status !== 'Completed') {
      timeline.push({
        id: 3,
        event: `Moved to ${job.status}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        remarks: `Job is currently in ${job.status} stage.`,
        user: job.technicianName || 'System'
      });
    }

    // Completed
    if (job.status === 'Completed' && job.endDate) {
      timeline.push({
        id: 4,
        event: 'Job Completed',
        date: new Date(job.endDate).toLocaleDateString(),
        time: new Date(job.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        remarks: 'All repairs finished and QA passed.',
        user: job.technicianName || 'System'
      });
    }

    return timeline;
  };

  const timelineEvents = getTimeline();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-6">Execution Timeline</h3>
      
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {timelineEvents.map((history, idx) => (
          <motion.div 
            key={history.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 pb-6"
          >
            <div className="relative z-10 w-6 h-6 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
              {getIcon(history.event)}
            </div>
            <div className="flex-1 bg-gray-50 border border-border rounded p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-olive text-sm">{history.event}</span>
                <span className="text-xs text-gray-500">{history.date} • {history.time}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{history.remarks}</p>
              <div className="text-[10px] font-bold text-gray-400 uppercase">By: {history.user}</div>
            </div>
          </motion.div>
        ))}
        {timelineEvents.length === 0 && (
           <div className="text-center text-gray-500 py-4">No timeline events recorded yet.</div>
        )}
      </div>
    </div>
  );
}