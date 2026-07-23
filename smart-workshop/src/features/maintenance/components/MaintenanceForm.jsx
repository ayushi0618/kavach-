import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Calendar, User, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function MaintenanceForm({ initialData = null }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    priority: 'Normal',
    department: 'Vehicle Repair Group (WSG)',
    status: 'Pending',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    assetId: '',
    technicianId: '',
    remarks: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assets, setAssets] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsRes, techRes] = await Promise.all([
          api.get('/assets'),
          api.get('/users')
        ]);
        if (assetsRes.data && assetsRes.data.assets) setAssets(assetsRes.data.assets);
        if (techRes.data) {
          setTechnicians(techRes.data);
        } else {
          setTechnicians([
            { id: 'usr-1', fullName: 'Sub. Maj. Rajesh Sharma' },
            { id: 'usr-2', fullName: 'Hav. Vikram Singh' },
            { id: 'usr-3', fullName: 'Nk. Amit Patel' },
            { id: 'usr-4', fullName: 'Sep. Deepak Verma' },
            { id: 'usr-5', fullName: 'Col. R. S. Rathore' }
          ]);
        }
      } catch (err) {
        toast.error('Failed to load assets & technicians');
      }
    };
    fetchData();

    if (initialData) {
      setFormData({
        ...initialData,
        startDate: initialData.startDate || new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const selectedTech = technicians.find(t => t.id === formData.technicianId);
      const payload = {
        description: formData.description,
        priority: formData.priority,
        department: formData.department,
        status: formData.status || 'Pending',
        startDate: formData.startDate,
        dueDate: formData.dueDate,
        assetId: formData.assetId || null,
        technicianId: formData.technicianId || null,
        remarks: formData.remarks
      };

      if (initialData && initialData.id) {
        await api.put(`/maintenance/${initialData.id}`, payload);
        toast.success('Maintenance ticket updated successfully!');
      } else {
        await api.post('/maintenance', payload);
        toast.success(`Maintenance job scheduled & assigned to ${selectedTech ? selectedTech.fullName : 'Technician'}!`);
      }
      window.dispatchEvent(new Event('maintenance_updated'));
      navigate('/admin/maintenance');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save maintenance ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-border overflow-hidden max-w-4xl"
    >
      <div className="p-6 border-b border-border bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-olive">{initialData ? 'Edit Maintenance Ticket' : 'Create Maintenance Ticket'}</h2>
          <p className="text-xs text-gray-500 mt-1">Assign job to a technician & automatically schedule in workshop calendar.</p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Asset & Issue Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Ticket Number</label>
              <input type="text" disabled value={initialData ? initialData.id : "JOB-AUTO"} className="w-full border border-border rounded p-2 text-sm bg-gray-100 font-bold text-olive" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Priority *</label>
              <select required value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Scan or Select Asset</label>
            <select value={formData.assetId || ''} onChange={e => setFormData({...formData, assetId: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option value="">-- Leave Unassigned for General Issue --</option>
              {assets.map(asset => (
                <option key={asset.id} value={asset.id}>{asset.name} ({asset.qrCode || asset.id})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Issue Description *</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the fault or required maintenance servicing..." rows="3" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary"></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Assignment & Schedule</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Department *</label>
            <select required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option>Vehicle Repair Group (WSG)</option>
              <option>Equipment Repair Group (ERG)</option>
              <option>Armament Group</option>
              <option>Machine Shop & Welding</option>
              <option>Electrical & AC Group</option>
              <option>QA / QC Inspection Wing</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Assign Technician (Optional)</label>
            <select value={formData.technicianId || ''} onChange={e => setFormData({...formData, technicianId: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option value="">-- Leave Unassigned --</option>
              {technicians.map(tech => (
                <option key={tech.id} value={tech.id}>{tech.fullName} ({tech.email || 'Tech'})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Estimated Start Date</label>
              <input type="date" value={formData.startDate || ''} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Due Date</label>
              <input type="date" value={formData.dueDate || ''} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Remarks</label>
            <textarea value={formData.remarks || ''} onChange={e => setFormData({...formData, remarks: e.target.value})} placeholder="Special tools required, bay location..." rows="2" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary"></textarea>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/maintenance')} className="px-6 py-2 border border-border rounded text-gray-600 font-bold text-sm">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow flex items-center gap-2 disabled:opacity-50"><Save size={16}/> {isSubmitting ? 'Saving...' : (initialData ? 'Update Ticket' : 'Create Ticket')}</button>
      </div>
    </motion.form>
  );
}