import { motion } from 'framer-motion';
import { ShoppingCart, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProcurementSummary() {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/admin/procurement')}
      className="bg-white p-6 rounded-lg shadow-sm border border-border h-full cursor-pointer hover:border-primary transition-all group"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-olive">Procurement Status</h3>
        <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Orders &rarr;</span>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border border-border rounded bg-gray-light">
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} className="text-primary" />
            <span className="text-sm font-semibold text-olive">Pending Tenders</span>
          </div>
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">14</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded bg-gray-light">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-warning" />
            <span className="text-sm font-semibold text-olive">Purchase Orders</span>
          </div>
          <span className="bg-warning text-white text-xs px-2 py-1 rounded-full font-bold">8</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded bg-gray-light">
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-success" />
            <span className="text-sm font-semibold text-olive">Material Arrived</span>
          </div>
          <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-bold">3</span>
        </div>
      </div>
    </div>
  );
}