import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function AssetForm({ initialData = null }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Heavy Transport',
    manufacturer: '',
    model: '',
    serial: '',
    department: 'Vehicle Repair Group',
    location: '',
    purchaseDate: '',
    maintenanceFreq: 6,
    remarks: '',
    status: 'Available'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        maintenanceFreq: initialData.maintenanceFreq || 6,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        manufacturer: formData.manufacturer,
        model: formData.model,
        serial: formData.serial,
        department: formData.department,
        location: formData.location,
        purchaseDate: formData.purchaseDate,
        maintenanceFreq: Number(formData.maintenanceFreq),
        remarks: formData.remarks,
        status: formData.status,
      };

      if (initialData && initialData.id) {
        await api.put(`/assets/${initialData.id}`, payload);
        toast.success('Asset updated successfully!');
      } else {
        const { data } = await api.post('/assets', payload);
        const generatedTag = data?.asset?.qrCode || 'QR-NEW-' + Math.floor(Math.random() * 89999 + 10000);
        toast.success(`Asset registered successfully! Generated QR Code: ${generatedTag}`, { duration: 5000 });
      }
      navigate('/admin/assets');
    } catch (error) {
      toast.error('Failed to save asset. Please check inputs.');
      console.error(error);
    } finally {
      setLoading(false);
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
        <h2 className="text-xl font-bold text-olive">{initialData ? 'Edit Asset' : 'Register New Asset'}</h2>
        <p className="text-sm text-gray-500">{initialData ? 'Update asset details and settings.' : 'Fill in the details to assign a unique identity and QR code.'}</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Core Information</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Asset Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="e.g. TATRA VVN 8x8" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Asset Category *</label>
            <select required name="type" value={formData.type} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
              <option>Heavy Transport</option>
              <option>Earthmoving</option>
              <option>Artillery</option>
              <option>Electrical</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Manufacturer & Model</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="manufacturer" value={formData.manufacturer || ''} onChange={handleChange} className="border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Manufacturer" />
              <input type="text" name="model" value={formData.model || ''} onChange={handleChange} className="border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Model No" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Serial Number / Chassis No *</label>
            <input required type="text" name="serial" value={formData.serial || ''} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Enter unique serial" />
          </div>
        </div>

        {/* Location & Tracking */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Tracking & Maintenance</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Department Assigned *</label>
            <select required name="department" value={formData.department || 'Vehicle Repair Group'} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
              <option>Vehicle Repair Group</option>
              <option>Machine Shop</option>
              <option>Electrical</option>
              <option>Testing</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Current Location</label>
            <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="e.g. Bay 4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Purchase Date</label>
              <input type="date" name="purchaseDate" value={formData.purchaseDate || ''} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Maintenance Freq (Months)</label>
              <input type="number" name="maintenanceFreq" value={formData.maintenanceFreq || 6} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Remarks</label>
            <textarea name="remarks" value={formData.remarks || ''} onChange={handleChange} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" rows="2" placeholder="Initial condition notes..."></textarea>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/assets')} className="flex items-center gap-2 px-6 py-2 border border-border rounded text-gray-600 hover:bg-gray-200 font-bold text-sm transition-colors">
          <X size={18} /> Cancel
        </button>
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow transition-colors disabled:opacity-50">
          <Save size={18} /> {loading ? 'Saving...' : 'Save & Generate QR'}
        </button>
      </div>
    </motion.form>
  );
}