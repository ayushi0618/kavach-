import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function MaintenanceOverview() {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/admin/maintenance')}
      className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col justify-center cursor-pointer hover:border-primary transition-all group"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-olive">Maintenance Overview</h3>
        <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Board &rarr;</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded border border-green-100 text-center">
          <div className="text-3xl font-bold text-success mb-1">12</div>
          <div className="text-xs font-semibold text-green-800 uppercase">Completed</div>
        </div>
        <div className="bg-orange-50 p-4 rounded border border-orange-100 text-center">
          <div className="text-3xl font-bold text-warning mb-1">5</div>
          <div className="text-xs font-semibold text-orange-800 uppercase">Pending</div>
        </div>
        <div className="bg-blue-50 p-4 rounded border border-blue-100 text-center">
          <div className="text-3xl font-bold text-info mb-1">8</div>
          <div className="text-xs font-semibold text-blue-800 uppercase">Scheduled</div>
        </div>
        <div className="bg-red-50 p-4 rounded border border-red-100 text-center">
          <div className="text-3xl font-bold text-danger mb-1">2</div>
          <div className="text-xs font-semibold text-red-800 uppercase">Delayed</div>
        </div>
      </div>
    </div>
  );
}