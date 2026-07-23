import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Trophy, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function L1AwardPOModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [poDetails, setPoDetails] = useState({
    poNumber: 'PO-L1-2026-045',
    tenderId: 'TNDR-045',
    vendorName: 'AutoParts India Ltd',
    vendorRank: 'L1 Lowest Compliant Bidder',
    item: 'Engine Spare Parts & Heavy Vehicle Overhaul Kit (TNDR-045)',
    quotedAmount: 445000,
    deliveryDays: 14,
    warranty: '1 Year Warranty Included',
    paymentTerms: 'Net 30 Days Post QA Acceptance',
    approvedBy: '510 ABW Procurement Board & Workshop Commander'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        vendorName: poDetails.vendorName,
        item: poDetails.item,
        quantity: 1,
        totalCost: poDetails.quotedAmount,
        status: 'Approved'
      };

      await api.post('/procurement', payload);
      toast.success(`Official L1 Award Purchase Order (${poDetails.poNumber}) issued to ${poDetails.vendorName}!`);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error('Failed to issue L1 Award Purchase Order');
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
        className="bg-white rounded-lg shadow-xl w-full max-w-xl overflow-hidden flex flex-col border border-border"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-emerald-50 text-emerald-900">
          <div className="flex items-center gap-2">
            <Trophy className="text-emerald-700" size={22} />
            <div>
              <h3 className="font-bold text-lg text-emerald-950">Issue Official L1 Award Purchase Order</h3>
              <p className="text-xs text-emerald-700 font-semibold">Tender ID: TNDR-045 • 510 Army Base Workshop</p>
            </div>
          </div>
          <button onClick={onClose} className="text-emerald-700 hover:text-emerald-950">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          {/* L1 Winner Highlight Card */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-lg flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold bg-emerald-700 text-white px-2 py-0.5 rounded uppercase">
                ★ Winner L1 Bidder
              </span>
              <h4 className="font-bold text-gray-900 text-base mt-1">{poDetails.vendorName}</h4>
              <p className="text-xs text-gray-600">{poDetails.vendorRank}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block">Contract Value</span>
              <span className="text-xl font-bold text-emerald-700">₹{poDetails.quotedAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Generated PO Number</label>
              <input 
                type="text" 
                readOnly
                value={poDetails.poNumber}
                className="w-full border border-border rounded p-2 text-xs font-mono font-bold bg-gray-100 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Associated Tender Reference</label>
              <input 
                type="text" 
                readOnly
                value={poDetails.tenderId}
                className="w-full border border-border rounded p-2 text-xs font-bold bg-gray-100 text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Work Contract / Part Description</label>
            <input 
              type="text" 
              required
              value={poDetails.item}
              onChange={e => setPoDetails({ ...poDetails, item: e.target.value })}
              className="w-full border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs bg-gray-50 p-3 rounded border border-border">
            <div>
              <span className="text-gray-500 font-bold block">Delivery Period:</span>
              <span className="font-bold text-gray-800">{poDetails.deliveryDays} Days</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Warranty Terms:</span>
              <span className="font-bold text-gray-800">{poDetails.warranty}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Payment Terms:</span>
              <span className="font-bold text-gray-800">{poDetails.paymentTerms}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-100/60 p-2.5 rounded border border-emerald-200 font-semibold">
            <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
            <span>Approved & Verified by Technical & Commercial Evaluation Committees</span>
          </div>

          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-border rounded text-gray-600 font-bold hover:bg-gray-100 text-xs">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs shadow-md transition-colors flex items-center gap-2 disabled:opacity-50">
              <FileCheck size={16} /> {loading ? 'Issuing L1 Award PO...' : 'Issue L1 Award Contract PO'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
