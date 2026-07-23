import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceTimeline from '../components/MaintenanceTimeline';
import QAQCModule from '../components/QAQCModule';
import PartsConsumptionList from '../components/PartsConsumptionList';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/maintenance/${id}`);
        if (data && data.job) setJob(data.job);
      } catch (err) {
        toast.error('Failed to load job details');
        navigate('/admin/maintenance');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F8F8]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold">Loading Ticket Details...</p>
      </div>
    );
  }

  if (!job) return null;

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => navigate(`/admin/maintenance/edit/${id}`)} className="flex items-center gap-2 bg-white border border-border text-olive px-4 py-2 rounded font-bold shadow-sm text-sm hover:bg-gray-50">
            <Edit size={16} /> Edit Ticket
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-olive">{job.id.slice(0, 8).toUpperCase()}</h1>
              <p className="text-sm font-bold text-gray-500">{job.assetName ? `${job.assetName} (${job.assetQr})` : 'Unassigned Asset'}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1.5 rounded text-xs font-bold ${
                job.priority === 'Critical' ? 'bg-red-100 text-danger' :
                job.priority === 'High' ? 'bg-orange-100 text-warning' :
                'bg-blue-100 text-info'
              }`}>{job.priority || 'Normal'} Priority</span>
              <span className="bg-blue-100 text-info px-3 py-1.5 rounded text-xs font-bold border border-blue-200">{job.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Assigned Tech</div><div className="font-bold text-gray-800">{job.technicianName || 'Unassigned'}</div></div>
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Department</div><div className="font-bold text-gray-800">{job.department || 'N/A'}</div></div>
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Start Date</div><div className="font-bold text-gray-800">{job.startDate ? new Date(job.startDate).toLocaleDateString() : 'N/A'}</div></div>
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Due Date</div><div className="font-bold text-danger">{job.dueDate ? new Date(job.dueDate).toLocaleDateString() : 'N/A'}</div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <MaintenanceTimeline job={job} />
            <QAQCModule />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <PartsConsumptionList />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}