import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Package, AlertTriangle, AlertOctagon, TrendingUp, CheckCircle2 } from 'lucide-react';
import { kavachSync } from '../../../utils/kavachSync';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseInt(value.replace('%', '')) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  return <motion.span>{rounded}</motion.span>;
};

export default function InventoryKPIs() {
  const [items, setItems] = useState(() => kavachSync.getInventoryItems());
  const [reqs, setReqs] = useState(() => kavachSync.getRequisitions());

  useEffect(() => {
    const syncData = () => {
      setItems(kavachSync.getInventoryItems());
      setReqs(kavachSync.getRequisitions());
    };
    syncData();
    const unsubscribe = kavachSync.subscribe(syncData);
    const interval = setInterval(syncData, 1000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const totalAvailableStock = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const issuedReqCount = reqs.filter(r => r.status === 'Issued').length;
  const lowStockCount = items.filter(i => i.quantity > 0 && i.quantity <= i.reorderLevel).length;
  const outOfStockCount = items.filter(i => i.quantity === 0).length;

  const dynamicKPIs = [
    { label: 'Available Stock Qty', value: totalAvailableStock },
    { label: 'Total Issued Spares', value: issuedReqCount },
    { label: 'Low Stock Alerts', value: lowStockCount },
    { label: 'Out of Stock Items', value: outOfStockCount },
  ];

  const getIcon = (label) => {
    if (label.includes('Low')) return <AlertTriangle className="text-warning" size={24} />;
    if (label.includes('Out')) return <AlertOctagon className="text-danger" size={24} />;
    if (label.includes('Issued')) return <CheckCircle2 className="text-success" size={24} />;
    return <Package className="text-primary" size={24} />;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {dynamicKPIs.map((kpi, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-4 rounded-xl shadow-xs border border-border flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className="text-2xl font-black text-olive">
              <Counter value={kpi.value} />
            </div>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            {getIcon(kpi.label)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}