import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, FileCheck2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function MaterialReceiptForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: 'Central Logistics (GIN)',
    item: 'Spare Parts for HRV Crane Repair',
    quantity: 12,
    status: 'Received',
    totalCost: 15000,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post('/procurement', formData);
      toast.success('Material Receipt / GIN processed successfully!');
      navigate('/admin/procurement/orders');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to process receipt');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-border max-w-4xl"
    >
      <div className="p-6 border-b border-border bg-gray-50 flex items-center gap-3">
        <FileCheck2 className="text-primary" size={24} />
        <div>
          <h2 className="text-xl font-bold text-olive">Material Receipt & Inspection</h2>
          <p className="text-sm text-gray-500">Record incoming deliveries and process warehouse entry.</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Delivery Details</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Select Purchase Order / GIN *</label>
            <select required value={formData.item} onChange={e => setFormData({...formData, item: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option>Spare Parts for HRV Crane Repair</option>
              <option>TATRA VVN Tyres</option>
              <option>24V Alternators</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Received Qty *</label>
              <input type="number" required value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})} className="w-full border border-border rounded p-2 text-sm bg-gray-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Total Estimated Cost (₹) *</label>
              <input type="number" required value={formData.totalCost} onChange={e => setFormData({...formData, totalCost: parseInt(e.target.value) || 0})} className="w-full border border-border rounded p-2 text-sm bg-gray-50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Condition on Arrival *</label>
            <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option>Excellent - No Damage</option>
              <option>Minor Packaging Damage</option>
              <option>Damaged - Requires Rejection</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Inspection & Warehouse</h3>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded text-sm text-blue-800">
            <strong>Checklist:</strong>
            <ul className="list-disc ml-5 mt-1 text-xs">
              <li>Visual Inspection Passed</li>
              <li>Quantity matches PO exactly</li>
              <li>Quality certificates attached</li>
            </ul>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Inspector Name</label>
            <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Target Warehouse Location</label>
            <input type="text" placeholder="e.g. Zone A, Rack 3" className="w-full border border-border rounded p-2 text-sm bg-gray-50" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/procurement/orders')} className="px-6 py-2 border border-border rounded text-gray-600 font-bold text-sm">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary text-white rounded font-bold text-sm shadow flex items-center gap-2 hover:bg-olive disabled:opacity-50"><Save size={16}/> {isSubmitting ? 'Processing...' : 'Approve & Save GIN'}</button>
      </div>
    </motion.form>
  );
}