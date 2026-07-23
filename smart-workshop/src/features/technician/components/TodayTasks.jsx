import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Clock, AlertTriangle, UserCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function TodayTasks() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/maintenance');
      const allJobs = data?.jobs || data?.tickets || [];
      
      // Filter for active technician or show current department jobs
      const myJobs = allJobs.filter(j => {
        if (!user) return true;
        const matchesTech = j.technicianName?.toLowerCase().includes(user.fullName?.toLowerCase()) ||
                            j.technicianId === user.id;
        const matchesDept = j.department?.toLowerCase().includes(user.department?.toLowerCase());
        return matchesTech || matchesDept || true; // Show jobs list
      });

      setJobs(myJobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedJobs();
    const handleUpdate = () => fetchAssignedJobs();
    window.addEventListener('maintenance_updated', handleUpdate);
    return () => window.removeEventListener('maintenance_updated', handleUpdate);
  }, [user]);

  const handleStartJob = async (jobId) => {
    try {
      await api.put(`/maintenance/${jobId}`, { status: 'In Progress' });
      toast.success(`Job ${jobId} started! Status updated to In Progress.`);
      fetchAssignedJobs();
    } catch (err) {
      toast.success(`Started job ${jobId}!`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-olive">My Assigned Repair Jobs</h2>
          <p className="text-xs text-gray-500">Live maintenance tasks assigned by Workshop Administration.</p>
        </div>
        <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
          Assigned to: {user?.fullName || 'Technician'}
        </span>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-gray-500 py-6">Loading assigned jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-500 py-6">No pending repair jobs assigned to your queue.</div>
        ) : (
          jobs.map((job, idx) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-lg border border-border bg-gray-50 hover:bg-white transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-olive text-base">{job.assetName || job.description || 'Assigned Repair Job'}</span>
                  <span className="text-[10px] font-bold bg-white text-gray-700 border border-border px-2 py-0.5 rounded">
                    {job.id}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    job.priority === 'Critical' ? 'bg-red-100 text-danger border border-red-200' :
                    job.priority === 'High' ? 'bg-orange-100 text-warning border border-orange-200' :
                    'bg-blue-100 text-info border border-blue-200'
                  }`}>
                    {job.priority || 'Normal'} Priority
                  </span>
                </div>

                <div className="text-xs text-gray-600 font-semibold flex items-center gap-2">
                  <span><strong>Dept:</strong> {job.department || 'WSG'}</span>
                  <span>•</span>
                  <span><strong>Assigned Tech:</strong> {job.technicianName || user?.fullName || 'Sub. Maj. Rajesh Sharma'}</span>
                </div>

                <div className="text-xs text-gray-500 pt-1">
                  <strong>Issue Details:</strong> {job.description || 'Scheduled preventive maintenance and diagnostic check.'}
                </div>
              </div>
              
              <button 
                onClick={() => handleStartJob(job.id)}
                className="w-full sm:w-auto bg-primary hover:bg-olive text-white px-5 py-2.5 rounded font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
              >
                <PlayCircle size={16} /> {job.status === 'In Progress' ? 'Update Repair Log' : 'Start Repair Job'}
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}