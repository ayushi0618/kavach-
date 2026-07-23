import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, ShoppingBag } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function CreatePOModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    vendorName: 'BEML Heavy Spares Ltd',
    item: 'TATRA VVN 8x8 Heavy Oil Filter Assembly',
    quantity: 10,
    unitCost: 1500,
    status: 'Requested'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        vendorName: formData.vendorName,
        item: formData.item,
        quantity: Number(formData.quantity),
        totalCost: Number(formData.quantity) * Number(formData.unitCost),
        status: formData.status
      };

      await api.post('/procurement', payload);
      toast.success('Purchase Order generated successfully!');
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to generate Purchase Order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-border bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={20} />
            <h3 className="font-bold text-olive text-lg">Generate New Purchase Order (PO)</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Target Vendor / Supplier *</label>
            <select 
              value={formData.vendorName} 
              onChange={e => setFormData({ ...formData, vendorName: e.target.value })}
              className="w-full border border-border rounded p-2 text-sm bg-white focus:border-primary focus:outline-none"
            >
              <option>BEML Heavy Spares Ltd</option>
              <option>MilTech Fluid Systems</option>
              <option>PowerGen Controls</option>
              <option>ArmourTech Components</option>
              <option>National Rubber Seals</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Item Requisition / Part Description *</label>
            <input 
              type="text" 
              required 
              value={formData.item}
              onChange={e => setFormData({ ...formData, item: e.target.value })}
              className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
              placeholder="e.g. Pinaka Hydraulic Seal Kit x10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Quantity *</label>
              <input 
                type="number" 
                required 
                min={1}
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Unit Cost (₹) *</label>
              <input 
                type="number" 
                required 
                min={1}
                value={formData.unitCost}
                onChange={e => setFormData({ ...formData, unitCost: Number(e.target.value) })}
                className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-border rounded flex justify-between items-center text-sm">
            <span className="font-bold text-gray-600">Calculated Total Value:</span>
            <span className="font-bold text-primary text-base">₹{(formData.quantity * formData.unitCost).toLocaleString()}</span>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-border rounded text-gray-600 font-bold text-sm hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 bg-primary text-white rounded font-bold text-sm shadow hover:bg-olive transition-colors flex items-center gap-2 disabled:opacity-50">
              <Save size={16} /> {loading ? 'Generating...' : 'Generate Purchase Order'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
