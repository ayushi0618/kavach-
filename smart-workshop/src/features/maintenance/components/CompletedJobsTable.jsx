import { useState, useEffect } from 'react';
import { Search, Download, Printer, CheckCircle } from 'lucide-react';
import api from '../../../utils/api';
import { allJobs } from '../data/mockMaintenanceData';

export default function CompletedJobsTable() {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedJobs();
  }, []);

  const fetchCompletedJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/maintenance');
      if (data && data.jobs && data.jobs.length > 0) {
        setCompleted(data.jobs.filter(j => j.status === 'Completed'));
      } else {
        setCompleted(allJobs.filter(j => j.status === 'Completed'));
      }
    } catch (err) {
      setCompleted(allJobs.filter(j => j.status === 'Completed'));
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
        <button className="flex items-center gap-2 px-3 py-2 border border-border rounded text-xs font-bold text-gray-700 hover:bg-gray-100 bg-white">
          <Download size={14} /> Export History
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-khaki-light/40 border-b border-border text-[11px] font-extrabold text-olive uppercase tracking-wider">
              <th className="py-3 px-4">Job ID</th>
              <th className="py-3 px-4">Vehicle / Equipment</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Technician</th>
              <th className="py-3 px-4">Completed On</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {loading ? (
              <tr><td colSpan="6" className="py-8 text-center text-gray-500">Loading history...</td></tr>
            ) : completed.length === 0 ? (
              <tr><td colSpan="6" className="py-8 text-center text-gray-500">No completed jobs yet.</td></tr>
            ) : (
              completed.map((j) => (
                <tr key={j.id} className="hover:bg-gray-50/80">
                  <td className="py-3 px-4 font-mono font-bold text-primary">{j.id}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{j.vehicle || j.asset}</td>
                  <td className="py-3 px-4 text-gray-600">{j.dept}</td>
                  <td className="py-3 px-4 text-gray-700">{j.tech}</td>
                  <td className="py-3 px-4 text-gray-500">{j.due}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-success">
                      <CheckCircle size={12} /> {j.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}