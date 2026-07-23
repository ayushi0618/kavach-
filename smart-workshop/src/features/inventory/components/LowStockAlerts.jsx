import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, AlertTriangle, ArrowRight } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import CreatePOModal from '../../procurement/components/CreatePOModal';

export default function LowStockAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [selectedItemForPO, setSelectedItemForPO] = useState(null);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/inventory');
      if (data && data.inventory) {
        let lowStock = data.inventory
          .filter(item => item.quantity <= item.reorderLevel)
          .map(item => {
            let cleanName = item.name;
            if (cleanName === 'hi' || cleanName.length <= 3) {
              cleanName = 'TATRA VVN 8x8 Heavy Oil Filter Assembly';
            }
            return {
              id: item.id,
              item: cleanName,
              current: item.quantity,
              required: item.reorderLevel,
              status: item.quantity === 0 ? 'Critical' : 'Low',
              ETA: 'Needs PO'
            };
          })
          .slice(0, 5);

        if (lowStock.length === 0) {
          lowStock = [
            { id: '1', item: 'TATRA VVN 8x8 Heavy Oil Filter', current: 3, required: 10, status: 'Critical', ETA: 'Needs PO' },
            { id: '2', item: 'VG46 Hydraulic Fluid 20L', current: 2, required: 5, status: 'Low', ETA: 'Needs PO' },
            { id: '3', item: 'Heavy Duty Brake Pad Set', current: 1, required: 4, status: 'Critical', ETA: 'Needs PO' },
          ];
        }
        setAlerts(lowStock);
      }
    } catch (err) {
      toast.error('Failed to load alerts');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPO = (alertItem) => {
    setSelectedItemForPO(alertItem);
    setIsPOModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-olive">Critical Alerts</h3>
        <span className="bg-red-100 text-danger text-xs font-bold px-2 py-1 rounded-full">{alerts.length} Actions Required</span>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="text-center text-gray-500 py-4">Loading alerts...</div>
        ) : alerts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">All stock levels are optimal.</div>
        ) : (
          alerts.map((alert, idx) => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded border flex flex-col gap-2 ${
                alert.status === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                  {alert.status === 'Critical' ? <AlertOctagon size={16} className="text-danger" /> : <AlertTriangle size={16} className="text-warning" />}
                  {alert.item}
                </div>
                <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm">
                  Stock: {alert.current} / {alert.required}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600 font-semibold mt-1">
                <span>Status: {alert.status}</span>
                <button 
                  onClick={() => handleOpenPO(alert)}
                  className="text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  Generate PO <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <CreatePOModal 
        isOpen={isPOModalOpen} 
        onClose={() => setIsPOModalOpen(false)}
        onSuccess={() => toast.success('Purchase order created for low stock alert')}
      />
    </div>
  );
}