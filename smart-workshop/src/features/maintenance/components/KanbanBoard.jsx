import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { kavachSync } from '../../../utils/kavachSync';
import toast from 'react-hot-toast';

const columns = ['Assigned', 'In Progress', 'Pending Spares', 'In Testing', 'Completed'];

export default function KanbanBoard() {
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState(() => kavachSync.getJobs());
  const [draggedJobId, setDraggedJobId] = useState(null);

  useEffect(() => {
    const sync = () => {
      setAllJobs(kavachSync.getJobs());
    };
    const unsubscribe = kavachSync.subscribe(sync);
    return () => unsubscribe();
  }, []);

  const handleDragStart = (e, jobId) => {
    setDraggedJobId(jobId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedJobId) return;

    const jobToMove = allJobs.find(j => j.id === draggedJobId);
    if (!jobToMove || jobToMove.status === targetStatus) {
      setDraggedJobId(null);
      return;
    }

    kavachSync.updateJobStatus(draggedJobId, targetStatus);
    toast.success(`Job #${draggedJobId} moved to ${targetStatus}`);
    setDraggedJobId(null);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[600px]">
      {columns.map(col => {
        const jobs = allJobs.filter(j => 
          j.status === col || 
          (col === 'Pending Spares' && j.status === 'Waiting Parts') ||
          (col === 'Assigned' && j.status === 'Pending')
        );

        return (
          <div 
            key={col} 
            className="w-80 shrink-0 flex flex-col bg-gray-50 rounded-xl border border-border overflow-hidden shadow-sm"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
          >
            <div className="p-3.5 border-b border-border bg-gray-100 flex justify-between items-center">
              <h3 className="font-extrabold text-olive text-xs uppercase tracking-wider">{col}</h3>
              <span className="bg-white text-olive text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs border border-border">{jobs.length}</span>
            </div>
            
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {jobs.length === 0 ? (
                <div className="p-4 text-center text-xs font-bold text-gray-400 border border-dashed border-gray-200 rounded-lg">
                  No jobs in {col}
                </div>
              ) : (
                jobs.map((job, idx) => (
                  <motion.div
                    layoutId={job.id}
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job.id)}
                    onClick={() => navigate(`/admin/maintenance/${job.id}`)}
                    className={`bg-white p-4 rounded-xl shadow-xs border border-border cursor-grab active:cursor-grabbing hover:border-primary hover:shadow-sm transition-all space-y-2.5 ${
                      draggedJobId === job.id ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono font-bold text-primary bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        {job.id}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                        job.priority === 'Critical' || job.priority === 'Emergency' ? 'bg-red-100 text-danger' :
                        job.priority === 'High' ? 'bg-orange-100 text-warning' :
                        'bg-blue-100 text-info'
                      }`}>{job.priority || 'Normal'}</span>
                    </div>

                    <div className="text-sm font-extrabold text-olive leading-tight">
                      {job.assetName || 'Equipment Asset'}
                    </div>

                    <p className="text-xs text-gray-600 font-medium line-clamp-2 bg-gray-50 p-2 rounded border border-gray-100">
                      {job.description || 'Maintenance overhaul'}
                    </p>

                    {job.spares && job.spares.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {job.spares.map((sp, i) => (
                          <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            sp.status === 'Issued' ? 'bg-green-100 text-success' : 'bg-orange-100 text-warning'
                          }`}>
                            {sp.name} ({sp.status})
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2 border-t border-border text-[11px]">
                      <div className="font-bold text-gray-600 truncate max-w-[140px]">
                        Tech: {job.technicianName || 'Sub. Maj. Rajesh'}
                      </div>
                      <div className="font-semibold text-gray-400">Bay: {job.bay || 'WSG'}</div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}