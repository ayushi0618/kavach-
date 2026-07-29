import { useState } from 'react';
import { Plus, PackageCheck } from 'lucide-react';
import { kavachSync } from '../../../utils/kavachSync';
import toast from 'react-hot-toast';

export default function PartsUsedForm() {
  const [partName, setPartName] = useState('');
  const [qty, setQty] = useState(1);

  const handleRequestPart = (e) => {
    e.preventDefault();
    if (!partName.trim()) {
      toast.error('Please enter part name');
      return;
    }

    const spareName = partName.trim();
    kavachSync.requestSpare('JOB-8901', spareName, 'Sub. Maj. Rajesh Sharma');
    toast.success(`Spare requisition for '${spareName}' submitted to Admin Inventory!`);
    setPartName('');
    setQty(1);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-border h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <PackageCheck size={20} className="text-primary" />
          <h3 className="text-lg font-bold text-olive">Spare Parts Requisition</h3>
        </div>
        
        <form onSubmit={handleRequestPart} className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Required Spare Part Name *</label>
            <input 
              type="text" 
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              className="w-full border border-border rounded p-2 text-xs bg-gray-50 focus:outline-none focus:border-primary font-semibold" 
              placeholder="e.g. Clutch Seal, Oil Filter..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Quantity</label>
              <input 
                type="number" 
                min="1" 
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border border-border rounded p-2 text-xs bg-gray-50 focus:outline-none focus:border-primary font-bold" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Priority</label>
              <input 
                type="text" 
                disabled 
                value="High" 
                className="w-full border border-border rounded p-2 text-xs bg-gray-100 font-bold text-gray-600" 
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-primary hover:bg-olive text-white font-bold py-2.5 rounded text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Plus size={16} /> Request Spare Part from Admin
          </button>
        </form>
      </div>

      <div className="text-[11px] text-gray-400 pt-3 border-t border-border flex justify-between items-center">
        <span>Target Job: #JOB-8901</span>
        <span>Auto-syncs with Admin</span>
      </div>
    </div>
  );
}