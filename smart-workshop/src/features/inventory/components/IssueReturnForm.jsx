import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

export default function IssueReturnForm() {
  const [activeTab, setActiveTab] = useState('issue'); // 'issue' or 'return'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="flex border-b border-border bg-gray-50">
        <button 
          onClick={() => setActiveTab('issue')}
          className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'issue' ? 'bg-white text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ArrowUpFromLine size={18} /> Issue Item
        </button>
        <button 
          onClick={() => setActiveTab('return')}
          className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${activeTab === 'return' ? 'bg-white text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <ArrowDownToLine size={18} /> Return Item
        </button>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Technician *</label>
            <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
              <option>Rahul Sharma (TECH-402)</option>
              <option>Vikram Singh (TECH-199)</option>
            </select>
          </div>
          {activeTab === 'issue' && (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Maintenance Job (Optional)</label>
              <select className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
                <option>None</option>
                <option>JOB-902 (TATRA VVN 8x8)</option>
              </select>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Inventory Item *</label>
          <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
            <option>INV-1024 - TATRA Oil Filter (45 in stock)</option>
            <option>INV-1088 - Hydraulic Hose 5m (5 in stock)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Quantity {activeTab === 'issue' ? 'Issued' : 'Returned'} *</label>
            <input type="number" required min="1" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
          </div>
          {activeTab === 'return' && (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Condition</label>
              <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
                <option>Good / Unused</option>
                <option>Defective</option>
                <option>Used / Scrap</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Remarks</label>
          <textarea className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" rows="2"></textarea>
        </div>

        <button className="w-full py-3 bg-primary hover:bg-olive text-white rounded font-bold transition-colors flex items-center justify-center gap-2 mt-4">
          <ArrowRightLeft size={18} /> Process {activeTab === 'issue' ? 'Issue' : 'Return'}
        </button>
      </motion.div>
    </div>
  );
}