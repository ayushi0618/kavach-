import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  if (isString) {
    return <motion.span>{rounded}</motion.span>;
  }
  return <motion.span>{rounded}</motion.span>;
};

export default function ExecutiveKPIs() {
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const { data } = await api.get('/analytics/kpi');
        if (data && data.success) {
          const stats = data.data;
          setKpis([
            { label: 'Total Assets', value: stats.totalAssets, type: 'primary' },
            { label: 'Fleet Readiness', value: `${stats.readiness}%`, type: 'success' },
            { label: 'Active Repairs', value: stats.activeJobs, type: 'warning' },
            { label: 'Avg Turnaround', value: '4.2 Days', type: 'info' },
            { label: 'YTD Budget Usage', value: '₹4.2 Cr', type: 'danger' }
          ]);
        }
      } catch (err) {
        toast.error('Failed to load KPIs');
        // fallback
        setKpis([
            { label: 'Total Assets', value: 150, type: 'primary' },
            { label: 'Fleet Readiness', value: '88%', type: 'success' },
            { label: 'Active Repairs', value: 34, type: 'warning' },
            { label: 'Avg Turnaround', value: '4.2 Days', type: 'info' },
            { label: 'YTD Budget Usage', value: '₹4.2 Cr', type: 'danger' }
        ]);
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
      case 'danger': return 'text-red-600 bg-red-50 border-red-100';
      case 'primary': return 'text-olive bg-khaki-light/50 border-khaki-light';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'success': return 'text-success bg-green-50 border-green-100';
      default: return 'text-gray-800 bg-gray-50 border-border';
    }
  };

  if (loading) {
    return <div className="h-24 flex items-center justify-center text-gray-500">Loading Analytics...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const colors = getColors(kpi.type);
        const isString = typeof kpi.value === 'string';
        const prefix = isString && kpi.value.includes('₹') ? '₹' : '';
        const suffix = isString && kpi.value.includes('Cr') ? ' Cr' : isString && kpi.value.includes('Days') ? ' Days' : isString && kpi.value.includes('%') ? '%' : '';

        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 rounded-lg shadow-sm border ${colors}`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80 truncate">{kpi.label}</div>
            <div className="text-2xl font-bold flex items-center">
              {prefix}<Counter value={kpi.value.toString()} />{suffix}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}