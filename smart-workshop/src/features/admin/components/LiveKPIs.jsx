import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { ShieldCheck, Truck, Wrench, Users, AlertCircle, TrendingUp, CheckCircle, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Counter({ to }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

export default function LiveKPIs() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalAssets: 12450,
    underRepair: 342,
    completed: 28,
    activeTechnicians: 185,
    pendingMaintenance: 45,
    lowStock: 12,
    utilization: 85,
    inventoryValue: 45
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await api.get('/dashboard/metrics');
        if (data) {
          setMetrics({
            totalAssets: parseInt(data.totalAssets) || 0,
            underRepair: parseInt(data.underRepair) || 0,
            completed: parseInt(data.completed) || 0,
            activeTechnicians: parseInt(data.activeTechnicians) || 185,
            pendingMaintenance: parseInt(data.pendingMaintenance) || 0,
            lowStock: parseInt(data.lowStock) || 12,
            utilization: 85,
            inventoryValue: 45
          });
        }
      } catch (err) {
        console.error('Failed to fetch metrics', err);
      }
    };
    fetchMetrics();
  }, []);

  const kpis = [
    { label: 'Total Assets', value: metrics.totalAssets, icon: ShieldCheck, color: 'text-primary', path: '/admin/assets' },
    { label: 'Vehicles in Workshop', value: metrics.underRepair, icon: Truck, color: 'text-info', path: '/admin/assets' },
    { label: 'Technicians Available', value: metrics.activeTechnicians, icon: Users, color: 'text-olive', path: '/admin/employees' },
    { label: 'Maintenance Pending', value: metrics.pendingMaintenance, icon: Wrench, color: 'text-warning', path: '/admin/maintenance/board' },
    { label: 'Completed Today', value: metrics.completed, icon: CheckCircle, color: 'text-success', path: '/admin/maintenance/completed' },
    { label: 'Low Stock Alerts', value: metrics.lowStock, icon: AlertCircle, color: 'text-danger', path: '/admin/inventory/items' },
    { label: 'Dept Utilization', value: metrics.utilization, suffix: '%', icon: TrendingUp, color: 'text-primary', path: '/admin/analytics/departments' },
    { label: 'Inventory Value (Cr)', value: metrics.inventoryValue, icon: Package, color: 'text-olive', path: '/admin/inventory' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <motion.div
          key={idx}
          onClick={() => navigate(kpi.path)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ y: -4, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          className="bg-white p-4 rounded-lg shadow-sm border border-border flex items-center gap-4 cursor-pointer hover:border-primary transition-all"
        >
          <div className={`w-12 h-12 rounded-full bg-gray-light flex items-center justify-center ${kpi.color}`}>
            <kpi.icon size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-olive">
              <Counter to={kpi.value} />{kpi.suffix || ''}
            </div>
            <div className="text-xs text-gray-500 font-medium">{kpi.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}