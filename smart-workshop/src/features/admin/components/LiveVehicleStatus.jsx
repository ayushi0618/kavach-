import { motion } from 'framer-motion';
import { vehicles } from '../../../data/mockData';

export default function LiveVehicleStatus() {
  const getBadgeClass = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-success';
    if (status === 'In Progress') return 'bg-blue-100 text-info';
    if (status === 'QA') return 'bg-purple-100 text-purple-700';
    return 'bg-orange-100 text-warning';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-sm border border-border overflow-hidden mb-6"
    >
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-bold text-olive">Live Vehicle Status</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-light text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-3">Vehicle No</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Technician</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Expected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-semibold text-olive">{v.id}</td>
                <td className="px-6 py-3 text-gray-600">{v.type}</td>
                <td className="px-6 py-3 text-gray-600">{v.dept}</td>
                <td className="px-6 py-3 text-gray-600">{v.tech}</td>
                <td className="px-6 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getBadgeClass(v.status)}`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-bold ${v.priority === 'Critical' ? 'text-danger' : v.priority === 'High' ? 'text-warning' : 'text-gray-500'}`}>
                    {v.priority}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">{v.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}