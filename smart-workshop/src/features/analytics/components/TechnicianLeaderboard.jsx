import { technicianLeaderboard } from '../data/mockAnalyticsData';
import { Trophy } from 'lucide-react';

export default function TechnicianLeaderboard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden h-[350px] flex flex-col">
      <div className="p-4 border-b border-border bg-gray-50 flex items-center gap-2">
        <Trophy size={18} className="text-khaki font-bold" />
        <h3 className="font-bold text-olive">Technician Leaderboard</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white text-gray-500 font-semibold sticky top-0">
            <tr>
              <th className="p-3 border-b border-border text-center">Rank</th>
              <th className="p-3 border-b border-border">Name</th>
              <th className="p-3 border-b border-border">Jobs</th>
              <th className="p-3 border-b border-border text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {technicianLeaderboard.map((tech, idx) => (
              <tr key={tech.id} className="hover:bg-gray-50">
                <td className="p-3 text-center font-bold text-olive">#{idx + 1}</td>
                <td className="p-3 font-semibold text-gray-700">{tech.name}<div className="text-[10px] text-gray-500 font-normal">{tech.dept}</div></td>
                <td className="p-3 text-gray-600">{tech.jobs}</td>
                <td className="p-3 text-right">
                  <span className="bg-green-100 text-success px-2 py-0.5 rounded font-bold text-xs">{tech.eff}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}