import { motion } from 'framer-motion';
import { departments } from '../../../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function WorkshopStatus() {
  const navigate = useNavigate();

  const getColor = (status) => {
    if (status === 'Green') return 'bg-success';
    if (status === 'Yellow') return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4">Workshop Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments.map((dept, idx) => (
          <motion.div
            key={idx}
            onClick={() => navigate('/admin/analytics/departments')}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            className="p-4 rounded border border-border bg-gray-light flex justify-between items-center cursor-pointer hover:border-primary transition-all"
          >
            <div>
              <h4 className="font-semibold text-sm text-olive">{dept.name}</h4>
              <div className="text-xs text-gray-500 mt-1 flex gap-3">
                <span>Jobs: {dept.jobs}</span>
                <span>Staff: {dept.staff}</span>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${getColor(dept.status)} shadow`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}