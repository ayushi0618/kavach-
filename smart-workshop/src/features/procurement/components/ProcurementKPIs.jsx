import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { procurementKPIs } from '../data/mockProcurementData';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseFloat(value) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  return <motion.span>{rounded}</motion.span>;
};

export default function ProcurementKPIs() {
  const getColors = (type) => {
    switch(type) {
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'primary': return 'text-olive bg-khaki-light/50 border-khaki-light';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'success': return 'text-success bg-green-50 border-green-100';
      default: return 'text-gray-800 bg-gray-50 border-border';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {procurementKPIs.map((kpi, idx) => {
        const colors = getColors(kpi.type);
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 rounded-lg shadow-sm border ${colors}`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">{kpi.label}</div>
            <div className="text-2xl font-bold">
              <Counter value={kpi.value} />
              {typeof kpi.value === 'string' && kpi.value.includes('Days') && ' Days'}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}