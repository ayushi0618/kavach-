import { techHistory } from '../../../data/mockTechData';
import { Search, Filter } from 'lucide-react';

export default function MaintenanceHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden mb-6">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-olive">My Maintenance History</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search vehicle..." className="pl-9 pr-4 py-2 bg-gray-50 border border-border rounded text-sm focus:outline-none focus:border-primary w-full sm:w-48" />
          </div>
          <button className="p-2 border border-border rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-light text-gray-600 font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">Job ID</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Issue Repaired</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {techHistory.map((h) => (
              <tr key={h.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-olive">{h.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-700">{h.vehicle}</td>
                <td className="px-6 py-4 text-gray-500">{h.date}</td>
                <td className="px-6 py-4 text-gray-600">{h.issue}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-success px-2.5 py-1 rounded-full text-xs font-bold">
                    {h.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}