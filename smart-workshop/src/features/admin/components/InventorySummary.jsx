import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const inventory = [
  { name: 'Tatra Engine Parts', pct: 85, color: 'bg-success' },
  { name: 'Hydraulic Fluid', pct: 15, color: 'bg-danger' },
  { name: 'Electrical Wiring', pct: 45, color: 'bg-warning' },
  { name: 'JCB Tracks', pct: 60, color: 'bg-info' },
];

export default function InventorySummary() {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-olive">Inventory Summary</h3>
        <button onClick={() => navigate('/admin/inventory')} className="text-xs text-primary font-bold hover:underline">Manage</button>
      </div>
      
      <div className="space-y-4">
        {inventory.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>{item.name}</span>
              <span>{item.pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${item.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-1.5 rounded-full ${item.color}`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}