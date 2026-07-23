import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Truck, ShieldCheck } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function RegisterVehicleModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    registrationNo: '21B-408912X',
    makeModel: 'TATRA VVN 8x8 Heavy Truck',
    chassisNo: 'TAT-IND-880912',
    engineNo: 'ENG-V8-77123',
    year: '2023',
    department: 'Vehicle Repair Group (WSG)',
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/vehicles', formData);
      toast.success(`Vehicle ${formData.registrationNo} registered successfully!`);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to register vehicle');
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
            <Truck className="text-primary" size={20} />
            <h3 className="font-bold text-olive text-lg">Register New Army Vehicle</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Registration Number (Military Reg No) *</label>
            <input 
              type="text" 
              required
              value={formData.registrationNo}
              onChange={e => setFormData({ ...formData, registrationNo: e.target.value })}
              className="w-full border border-border rounded p-2 focus:border-primary focus:outline-none"
              placeholder="e.g. 21B-408912X"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Make & Model *</label>
            <select 
              value={formData.makeModel}
              onChange={e => setFormData({ ...formData, makeModel: e.target.value })}
              className="w-full border border-border rounded p-2 bg-white focus:border-primary focus:outline-none"
            >
              <option>TATRA VVN 8x8 Heavy Truck</option>
              <option>Pinaka MBRL Launcher Rig</option>
              <option>BEML Earthmover Dozer D88</option>
              <option>Mahindra Armored LSV 4x4</option>
              <option>Maruti Army Gypsy 4x4</option>
              <option>Tata LPTA 1623 6x6 Heavy Vehicle</option>
              <option>Ashok Leyland Stallion 4x4</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Chassis Number *</label>
              <input 
                type="text" 
                required
                value={formData.chassisNo}
                onChange={e => setFormData({ ...formData, chassisNo: e.target.value })}
                className="w-full border border-border rounded p-2 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Engine Number *</label>
              <input 
                type="text" 
                required
                value={formData.engineNo}
                onChange={e => setFormData({ ...formData, engineNo: e.target.value })}
                className="w-full border border-border rounded p-2 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Assigned Department</label>
              <select 
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full border border-border rounded p-2 bg-white focus:border-primary focus:outline-none"
              >
                <option>Vehicle Repair Group (WSG)</option>
                <option>Equipment Repair Group (ERG)</option>
                <option>Armament Group</option>
                <option>QA / QC Inspection Wing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Manufacturing Year</label>
              <input 
                type="number" 
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full border border-border rounded p-2 focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-border rounded text-gray-600 font-bold hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 bg-primary text-white rounded font-bold shadow hover:bg-olive transition-colors flex items-center gap-2 disabled:opacity-50">
              <Save size={16} /> {loading ? 'Registering...' : 'Save & Register Vehicle'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
