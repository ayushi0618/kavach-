import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function ItemForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electrician Tool',
    quantity: 0,
    reorderLevel: 5,
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post('/inventory', formData);
      toast.success('Inventory item added successfully!');
      navigate('/admin/inventory/items');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-border overflow-hidden"
    >
      <div className="p-6 border-b border-border bg-gray-50">
        <h2 className="text-xl font-bold text-olive">Add New Inventory Item</h2>
        <p className="text-sm text-gray-500">Register new spare parts, tools, or consumables into the warehouse.</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Item Details</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Item Name *</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Item Code</label>
              <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Auto-generated" disabled />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Category *</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
                <option>Electrician Tool</option>
                <option>Measuring Instrument</option>
                <option>Machining Tool</option>
                <option>Consumables</option>
                <option>Hydraulics</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Stock & Storage</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Initial Qty</label>
              <input type="number" min="0" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Min Stock</label>
              <input type="number" min="0" value={formData.reorderLevel} onChange={e => setFormData({...formData, reorderLevel: parseInt(e.target.value) || 0})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Warehouse Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Bay A, Shelf 12" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/inventory/items')} className="flex items-center gap-2 px-6 py-2 border border-border rounded text-gray-600 hover:bg-gray-200 font-bold text-sm transition-colors">
          <X size={18} /> Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow transition-colors disabled:opacity-50">
          <Save size={18} /> {isSubmitting ? 'Saving...' : 'Save Item'}
        </button>
      </div>
    </motion.form>
  );
}