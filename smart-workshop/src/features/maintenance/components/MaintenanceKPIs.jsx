import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseFloat(value) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => isString && value.includes('.') ? v.toFixed(1) : Math.round(v));

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  return <motion.span>{rounded}</motion.span>;
};

export default function MaintenanceKPIs() {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const { data } = await api.get('/maintenance');
        if (data && data.jobs) {
          const active = data.jobs.filter(j => j.status !== 'Completed').length;
          const completed = data.jobs.filter(j => j.status === 'Completed').length;
          const critical = data.jobs.filter(j => j.priority === 'Critical' && j.status !== 'Completed').length;
          
          setKpis([
            { label: 'Active Jobs', value: active, type: 'info' },
            { label: 'Critical Priority', value: critical, type: 'danger' },
            { label: 'Completed Today', value: completed, type: 'success' },
            { label: 'Avg Turnaround', value: '4.2 Hrs', type: 'primary' }
          ]);
        }
      } catch (err) {
        toast.error('Failed to load KPIs');
      } finally {
        setLoading(false);
      }
    };
    fetchKPIs();
  }, []);

  const getColors = (type) => {
    switch(type) {
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'primary': return 'text-olive bg-khaki-light/50 border-khaki-light';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'success': return 'text-success bg-green-50 border-green-100';
      case 'danger': return 'text-danger bg-red-50 border-red-100';
      default: return 'text-gray-800 bg-gray-50 border-border';
    }
  };

  if (loading) {
    return <div className="h-24 flex items-center justify-center text-gray-500">Loading KPIs...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const colors = getColors(kpi.type);
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 rounded-lg shadow-sm border ${colors}`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{kpi.label}</div>
            <div className="text-2xl font-bold">
              <Counter value={kpi.value.toString()} />
              {typeof kpi.value === 'string' && kpi.value.includes('%') && '%'}
              {typeof kpi.value === 'string' && kpi.value.includes('Hrs') && ' Hrs'}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}