import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function PurchaseWorkflow() {
  const navigate = useNavigate();
  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestOrder();
  }, []);

  const fetchLatestOrder = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/procurement');
      if (data && data.orders && data.orders.length > 0) {
        setLatestOrder(data.orders[0]); // Get the most recent one
      }
    } catch (err) {
      toast.error('Failed to load recent PO');
    } finally {
      setLoading(false);
    }
  };

  const getSteps = (status) => {
    const defaultSteps = [
      { title: 'Requested', status: 'pending' },
      { title: 'Approved', status: 'pending' },
      { title: 'Ordered', status: 'pending' },
      { title: 'Received', status: 'pending' }
    ];

    const statuses = ['Requested', 'Approved', 'Ordered', 'Received'];
    const currentIndex = statuses.indexOf(status);

    return defaultSteps.map((step, idx) => ({
      ...step,
      status: idx < currentIndex ? 'completed' : idx === currentIndex ? 'active' : 'pending'
    }));
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col justify-center items-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!latestOrder) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col justify-center items-center">
        <p className="text-gray-500">No active procurement orders.</p>
      </div>
    );
  }

  const steps = getSteps(latestOrder.status);
  const activeIndex = steps.findIndex(s => s.status === 'active' || s.status === 'completed');
  const progressWidth = activeIndex >= 0 ? `${(activeIndex / (steps.length - 1)) * 100}%` : '0%';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col justify-center">
      <h3 className="text-lg font-bold text-olive mb-2">Active Procurement Tracker</h3>
      <p className="text-sm font-semibold text-gray-600 mb-8 max-w-sm truncate" title={latestOrder.item}>
        {latestOrder.quantity}x {latestOrder.item} (PO-{latestOrder.id.slice(0, 6).toUpperCase()})
      </p>
      
      <div className="relative">
        <div className="absolute top-1/2 left-6 right-6 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: progressWidth }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-6 h-1 bg-primary -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(75,93,58,0.6)]"
        />

        <div className="flex justify-between relative z-10 px-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-white ${
                step.status === 'completed' ? 'border-primary text-primary' : 
                step.status === 'active' ? 'border-warning text-warning' : 
                'border-gray-300 text-gray-300'
              }`}>
                {step.status === 'completed' ? <CheckCircle2 size={16} /> : 
                 step.status === 'active' ? <div className="w-2.5 h-2.5 bg-warning rounded-full animate-ping"></div> : 
                 <Circle size={10} />}
              </div>
              <div className={`mt-3 text-xs font-bold text-center w-20 ${
                step.status === 'completed' ? 'text-olive' : 
                step.status === 'active' ? 'text-warning' : 
                'text-gray-400'
              }`}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button onClick={() => navigate('/admin/procurement/orders')} className="mt-8 mx-auto flex items-center gap-2 text-sm font-bold text-primary hover:underline">
        View All Purchase Orders <ArrowRight size={16} />
      </button>
    </div>
  );
}