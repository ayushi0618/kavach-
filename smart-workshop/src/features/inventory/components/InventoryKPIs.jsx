import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { inventoryKPIs } from '../data/mockInventoryData';
import { Package, AlertTriangle, AlertOctagon, TrendingUp } from 'lucide-react';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseInt(value.replace('%', '')) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  return <motion.span>{rounded}</motion.span>;
};

export default function InventoryKPIs() {
  const getIcon = (label) => {
    if (label.includes('Low')) return <AlertTriangle className="text-warning" size={24} />;
    if (label.includes('Out')) return <AlertOctagon className="text-danger" size={24} />;
    if (label.includes('Capacity')) return <TrendingUp className="text-primary" size={24} />;
    return <Package className="text-info" size={24} />;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {inventoryKPIs.map((kpi, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-border flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className="text-2xl font-bold text-olive">
              <Counter value={kpi.value} />
              {typeof kpi.value === 'string' && kpi.value.includes('%') && '%'}
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded-full">
            {getIcon(kpi.label)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}