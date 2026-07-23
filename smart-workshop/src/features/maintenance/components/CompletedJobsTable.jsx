import { useState, useEffect } from 'react';
import { Search, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function CompletedJobsTable() {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedJobs();
  }, []);

  const fetchCompletedJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/maintenance');
      if (data && data.jobs) {
        setCompleted(data.jobs.filter(j => j.status === 'Completed'));
      }
    } catch (err) {
      toast.error('Failed to load completed jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50">
        <div className="relative w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search history..." className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm" />
        </div>
        <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
          <Download size={16} /> Export PDF
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4">Job ID</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Technician</th>
              <th className="p-4">Completed Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p>Loading completed jobs...</p>
                  </div>
                </td>
              </tr>
            ) : completed.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No completed jobs found.
                </td>
              </tr>
            ) : (
              completed.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-olive">{job.id}</td>
                <td className="p-4 font-semibold text-gray-800">{job.assetName || job.description || 'Maintenance Job'}</td>
                <td className="p-4 text-gray-600">{job.technicianName || 'Unassigned'}</td>
                <td className="p-4 text-gray-500">{job.startDate ? new Date(job.startDate).toLocaleDateString() : 'N/A'}</td>
                <td className="p-4 text-center">
                  <button onClick={() => navigate(`/admin/maintenance/${job.id}`)} className="p-1.5 text-info hover:bg-blue-50 rounded">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}