import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const columns = ['Pending', 'In Progress', 'Waiting Parts', 'QA', 'Completed'];

export default function KanbanBoard() {
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedJobId, setDraggedJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/maintenance');
      if (data && data.jobs) {
        setAllJobs(data.jobs);
      }
    } catch (err) {
      toast.error('Failed to fetch maintenance jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, jobId) => {
    setDraggedJobId(jobId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    if (!draggedJobId) return;

    const jobToMove = allJobs.find(j => j.id === draggedJobId);
    if (!jobToMove || jobToMove.status === targetStatus) {
      setDraggedJobId(null);
      return;
    }

    // Optimistic UI update
    setAllJobs(prev => prev.map(job => 
      job.id === draggedJobId ? { ...job, status: targetStatus } : job
    ));

    try {
      await api.put(`/maintenance/${draggedJobId}`, { status: targetStatus });
      toast.success(`Job moved to ${targetStatus}`);
    } catch (err) {
      toast.error('Failed to update job status');
      fetchJobs(); // Revert on failure
    } finally {
      setDraggedJobId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[600px] items-center justify-center text-gray-500">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
          <p>Loading Kanban Board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[600px]">
      {columns.map(col => {
        const jobs = allJobs.filter(j => j.status === col);
        return (
          <div 
            key={col} 
            className="w-80 shrink-0 flex flex-col bg-gray-50 rounded-lg border border-border overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col)}
          >
            <div className="p-3 border-b border-border bg-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-olive text-sm">{col}</h3>
              <span className="bg-white text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-border">{jobs.length}</span>
            </div>
            
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {jobs.map((job, idx) => (
                <motion.div
                  layoutId={job.id}
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, job.id)}
                  onClick={() => navigate(`/admin/maintenance/${job.id}`)}
                  className={`bg-white p-3 rounded shadow-sm border border-border cursor-grab active:cursor-grabbing hover:border-primary transition-colors ${
                    draggedJobId === job.id ? 'opacity-50' : 'opacity-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-800 text-xs">{(job.id || '').substring(0, 8).toUpperCase()}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      job.priority === 'Critical' ? 'bg-red-100 text-danger' :
                      job.priority === 'High' ? 'bg-orange-100 text-warning' :
                      'bg-blue-100 text-info'
                    }`}>{job.priority || 'Normal'}</span>
                  </div>
                  <div className="text-sm font-semibold text-olive mb-1 line-clamp-2">{job.description || 'Maintenance Job'}</div>
                  
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-border">
                    <div className="text-xs font-semibold text-gray-600 truncate w-32">Tech ID: {(job.technicianId || 'Unassigned').substring(0, 6)}</div>
                    <div className="text-[10px] font-bold text-gray-400">{job.startDate ? new Date(job.startDate).toLocaleDateString() : 'N/A'}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}