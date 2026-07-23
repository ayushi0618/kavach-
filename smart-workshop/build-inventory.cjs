const fs = require('fs');
const path = require('path');

const dirs = [
  'src/features/inventory/data',
  'src/features/inventory/components',
  'src/features/inventory/pages'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const files = {
  'src/features/inventory/data/mockInventoryData.js': `export const inventoryKPIs = [
  { label: 'Total Items', value: 8450 },
  { label: 'Available', value: 7210 },
  { label: 'Issued', value: 1140 },
  { label: 'Low Stock', value: 85 },
  { label: 'Out of Stock', value: 15 },
  { label: 'Pending POs', value: 12 },
  { label: 'Incoming', value: 340 },
  { label: 'Capacity', value: '78%' }
];

export const allInventory = [
  { id: 'INV-1024', name: 'TATRA Oil Filter', category: 'Consumables', dept: 'Vehicle Repair', location: 'Bay A, Shelf 12', available: 45, min: 20, max: 200, supplier: 'AutoParts India Ltd', status: 'Optimal' },
  { id: 'INV-1088', name: 'Hydraulic Hose 5m', category: 'Hydraulics', dept: 'Vehicle Repair', location: 'Bay C, Shelf 04', available: 5, min: 10, max: 50, supplier: 'FluidTech Solutions', status: 'Low Stock' },
  { id: 'INV-2041', name: '12V Lead Acid Battery', category: 'Electrical', dept: 'Electrical', location: 'Bay B, Shelf 02', available: 0, min: 5, max: 30, supplier: 'Exide Defense', status: 'Out of Stock' },
  { id: 'INV-3090', name: 'Welding Electrodes (Box)', category: 'Materials', dept: 'Welding', location: 'Bay D, Shelf 01', available: 120, min: 50, max: 500, supplier: 'MetalWorks Inc', status: 'Optimal' },
];

export const lowStockAlerts = [
  { id: 1, item: '12V Lead Acid Battery', current: 0, required: 5, status: 'Critical', ETA: '24 Jul (Pending)' },
  { id: 2, item: 'Hydraulic Hose 5m', current: 5, required: 10, status: 'Warning', ETA: '22 Jul' },
  { id: 3, item: 'Brake Pads (Set)', current: 8, required: 15, status: 'Warning', ETA: 'Not Ordered' },
];

export const suppliersList = [
  { id: 'SUP-01', name: 'AutoParts India Ltd', contact: '+91 98765 43210', supplied: 124, activePOs: 3, rating: 4.8 },
  { id: 'SUP-02', name: 'Exide Defense', contact: '+91 98765 11223', supplied: 45, activePOs: 1, rating: 4.9 },
  { id: 'SUP-03', name: 'FluidTech Solutions', contact: '+91 91234 56789', supplied: 88, activePOs: 0, rating: 4.2 },
];

export const stockMovement = [
  { id: 1, action: 'Issued', date: '20 Jul 2026', time: '09:15 AM', user: 'Admin', tech: 'Rahul Sharma', qty: 2, reason: 'Used for JOB-902 (TATRA ERG-102)' },
  { id: 2, action: 'Received', date: '18 Jul 2026', time: '14:30 PM', user: 'Storekeeper', tech: 'Vendor Delivery', qty: 50, reason: 'PO-2026-074 Fulfillment' },
  { id: 3, action: 'Returned', date: '15 Jul 2026', time: '16:00 PM', user: 'Admin', tech: 'Amit Patel', qty: 1, reason: 'Defective piece returned' },
];
`,
  'src/features/inventory/components/InventoryKPIs.jsx': `import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { inventoryKPIs } from '../data/mockInventoryData';
import { Package, AlertTriangle, AlertOctagon, TrendingUp } from 'lucide-react';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseInt(value.replace('%', '')) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  return <motion.span>{rounded}</motion.span>;
};

export default function InventoryKPIs() {
  const getIcon = (label) => {
    if (label.includes('Low')) return <AlertTriangle className="text-warning" size={24} />;
    if (label.includes('Out')) return <AlertOctagon className="text-danger" size={24} />;
    if (label.includes('Capacity')) return <TrendingUp className="text-primary" size={24} />;
    return <Package className="text-info" size={24} />;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {inventoryKPIs.map((kpi, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-border flex items-center justify-between"
        >
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className="text-2xl font-bold text-olive">
              <Counter value={kpi.value} />
              {typeof kpi.value === 'string' && kpi.value.includes('%') && '%'}
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded-full">
            {getIcon(kpi.label)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}`,
  'src/features/inventory/components/LowStockAlerts.jsx': `import { motion } from 'framer-motion';
import { lowStockAlerts } from '../data/mockInventoryData';
import { AlertOctagon, AlertTriangle, ArrowRight } from 'lucide-react';

export default function LowStockAlerts() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-olive">Critical Alerts</h3>
        <span className="bg-red-100 text-danger text-xs font-bold px-2 py-1 rounded-full">3 Actions Required</span>
      </div>
      
      <div className="space-y-3 flex-1">
        {lowStockAlerts.map((alert, idx) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={\`p-4 rounded border flex flex-col gap-2 \${
              alert.status === 'Critical' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'
            }\`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                {alert.status === 'Critical' ? <AlertOctagon size={16} className="text-danger" /> : <AlertTriangle size={16} className="text-warning" />}
                {alert.item}
              </div>
              <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow-sm">
                Stock: {alert.current} / {alert.required}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600 font-semibold mt-1">
              <span>ETA: {alert.ETA}</span>
              <button className="text-primary hover:underline flex items-center gap-1">
                Generate PO <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/inventory/components/PurchaseWorkflow.jsx': `import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const steps = [
  { title: 'Low Stock Detected', status: 'completed' },
  { title: 'Manager Approval', status: 'completed' },
  { title: 'Vendor PO Issued', status: 'active' },
  { title: 'Material Received', status: 'pending' },
  { title: 'QA & Storage', status: 'pending' }
];

export default function PurchaseWorkflow() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col justify-center">
      <h3 className="text-lg font-bold text-olive mb-6">Active Procurement: 12V Battery</h3>
      
      <div className="relative">
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '50%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-4 h-1 bg-primary -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(75,93,58,0.6)]"
        />

        <div className="flex justify-between relative z-10 px-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={\`w-8 h-8 rounded-full border-4 flex items-center justify-center bg-white \${
                step.status === 'completed' ? 'border-primary text-primary' : 
                step.status === 'active' ? 'border-warning text-warning' : 
                'border-gray-300 text-gray-300'
              }\`}>
                {step.status === 'completed' ? <CheckCircle2 size={16} /> : 
                 step.status === 'active' ? <div className="w-2.5 h-2.5 bg-warning rounded-full animate-ping"></div> : 
                 <Circle size={10} />}
              </div>
              <div className={\`mt-3 text-xs font-bold text-center w-20 \${
                step.status === 'completed' ? 'text-olive' : 
                step.status === 'active' ? 'text-warning' : 
                'text-gray-400'
              }\`}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button className="mt-8 mx-auto flex items-center gap-2 text-sm font-bold text-primary hover:underline">
        View All Purchase Requests <ArrowRight size={16} />
      </button>
    </div>
  );
}`,
  'src/features/inventory/components/InventoryTable.jsx': `import { motion } from 'framer-motion';
import { Search, Filter, Download, Plus, Edit, Eye } from 'lucide-react';
import { allInventory } from '../data/mockInventoryData';
import { useNavigate } from 'react-router-dom';

export default function InventoryTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between md:items-center gap-4 bg-gray-50">
        <div className="relative w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search inventory..." 
            className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button onClick={() => navigate('/admin/inventory/new')} className="px-4 py-2 bg-primary hover:bg-olive text-white rounded text-sm font-bold flex items-center gap-2 shadow transition-colors">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="p-4">Item Code</th>
              <th className="p-4">Name / Category</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allInventory.map((item, idx) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="p-4 font-bold text-gray-700">{item.id}</td>
                <td className="p-4">
                  <div className="font-bold text-olive">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </td>
                <td className="p-4 text-gray-600">{item.location}</td>
                <td className="p-4 text-center font-bold">
                  {item.available} / {item.max}
                </td>
                <td className="p-4 text-center">
                  <span className={\`px-2.5 py-1 rounded-full text-xs font-bold \${
                    item.status === 'Optimal' ? 'bg-green-100 text-success' :
                    item.status === 'Low Stock' ? 'bg-orange-100 text-warning' :
                    'bg-red-100 text-danger'
                  }\`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(\`/admin/inventory/\${item.id}\`)} className="p-1.5 text-info hover:bg-blue-50 rounded" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-warning hover:bg-orange-50 rounded" title="Edit">
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  'src/features/inventory/components/ItemForm.jsx': `import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ItemForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/inventory/items');
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
            <input required type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Item Code</label>
              <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Auto-generated" disabled />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Category *</label>
              <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
                <option>Consumables</option>
                <option>Hydraulics</option>
                <option>Electrical</option>
                <option>Hardware</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Manufacturer</label>
              <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Part Number</label>
              <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Stock & Storage</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Initial Qty</label>
              <input type="number" defaultValue={0} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Min Stock</label>
              <input type="number" defaultValue={5} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Max Stock</label>
              <input type="number" defaultValue={50} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Supplier</label>
              <select className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
                <option>AutoParts India Ltd</option>
                <option>Exide Defense</option>
                <option>FluidTech Solutions</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Warehouse Location</label>
              <input type="text" placeholder="e.g. Bay A, Shelf 12" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Description / Remarks</label>
            <textarea className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" rows="2"></textarea>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/inventory/items')} className="flex items-center gap-2 px-6 py-2 border border-border rounded text-gray-600 hover:bg-gray-200 font-bold text-sm transition-colors">
          <X size={18} /> Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow transition-colors">
          <Save size={18} /> Save Item
        </button>
      </div>
    </motion.form>
  );
}`,
  'src/features/inventory/components/IssueReturnForm.jsx': `import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';

export default function IssueReturnForm() {
  const [activeTab, setActiveTab] = useState('issue'); // 'issue' or 'return'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="flex border-b border-border bg-gray-50">
        <button 
          onClick={() => setActiveTab('issue')}
          className={\`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors \${activeTab === 'issue' ? 'bg-white text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}\`}
        >
          <ArrowUpFromLine size={18} /> Issue Item
        </button>
        <button 
          onClick={() => setActiveTab('return')}
          className={\`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors \${activeTab === 'return' ? 'bg-white text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}\`}
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
}`,
  'src/features/inventory/components/StockMovementTimeline.jsx': `import { motion } from 'framer-motion';
import { stockMovement } from '../data/mockInventoryData';
import { ArrowUpRight, ArrowDownLeft, RotateCcw } from 'lucide-react';

export default function StockMovementTimeline() {
  const getIcon = (action) => {
    if (action === 'Issued') return <ArrowUpRight size={16} />;
    if (action === 'Received') return <ArrowDownLeft size={16} />;
    return <RotateCcw size={16} />;
  };

  const getColor = (action) => {
    if (action === 'Issued') return 'bg-orange-100 text-warning border-warning';
    if (action === 'Received') return 'bg-green-100 text-success border-success';
    return 'bg-blue-100 text-info border-info';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-bold text-olive mb-6">Recent Stock Movement</h3>
      
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-3.5 before:translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {stockMovement.map((log, idx) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 pb-6"
          >
            <div className={\`relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm \${getColor(log.action)}\`}>
              {getIcon(log.action)}
            </div>
            <div className="flex-1 bg-gray-50 border border-border rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-gray-800 text-sm">{log.action}: <span className="text-olive">{log.qty} Units</span></span>
                <span className="text-xs text-gray-500">{log.date} • {log.time}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{log.reason}</p>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex justify-between">
                <span>By: {log.user}</span>
                <span>To/From: {log.tech}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/inventory/components/WarehouseMap.jsx': `import { motion } from 'framer-motion';

const zones = [
  { id: 'Zone A', name: 'Heavy Parts', capacity: 80, status: 'normal' },
  { id: 'Zone B', name: 'Electrical', capacity: 95, status: 'warning' },
  { id: 'Zone C', name: 'Hydraulics', capacity: 40, status: 'normal' },
  { id: 'Zone D', name: 'Consumables', capacity: 15, status: 'critical' },
];

export default function WarehouseMap() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-bold text-olive mb-4">Warehouse Capacity Map</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {zones.map((zone, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={\`p-4 rounded-lg border-2 flex flex-col justify-between h-32 \${
              zone.status === 'warning' ? 'bg-orange-50 border-orange-200' :
              zone.status === 'critical' ? 'bg-red-50 border-red-200' :
              'bg-gray-50 border-gray-200'
            }\`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-800">{zone.id}</div>
                <div className="text-xs text-gray-500 font-semibold">{zone.name}</div>
              </div>
              <div className={\`text-lg font-bold \${
                zone.status === 'warning' ? 'text-warning' :
                zone.status === 'critical' ? 'text-danger' :
                'text-primary'
              }\`}>
                {zone.capacity}%
              </div>
            </div>
            
            <div className="w-full bg-white rounded-full h-2 shadow-inner border border-gray-100 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: \`\${zone.capacity}%\` }}
                transition={{ duration: 1 }}
                className={\`h-2 rounded-full \${
                  zone.status === 'warning' ? 'bg-warning' :
                  zone.status === 'critical' ? 'bg-danger' :
                  'bg-primary'
                }\`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/inventory/components/SuppliersList.jsx': `import { suppliersList } from '../data/mockInventoryData';
import { Phone, Star } from 'lucide-react';

export default function SuppliersList() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-bold text-olive">Registered Suppliers</h3>
      </div>
      <div className="divide-y divide-border">
        {suppliersList.map(sup => (
          <div key={sup.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
            <div>
              <div className="font-bold text-gray-800">{sup.name}</div>
              <div className="text-sm text-gray-500 font-mono mt-1">{sup.id}</div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <div className="flex items-center gap-1 text-sm text-gray-600 font-semibold">
                <Phone size={14} /> {sup.contact}
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase">
                <span>Items: {sup.supplied}</span>
                <span>Active POs: {sup.activePOs}</span>
                <span className="flex items-center gap-1 text-warning"><Star size={12} fill="currentColor" /> {sup.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/inventory/pages/InventoryDashboard.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import InventoryKPIs from '../components/InventoryKPIs';
import LowStockAlerts from '../components/LowStockAlerts';
import PurchaseWorkflow from '../components/PurchaseWorkflow';
import WarehouseMap from '../components/WarehouseMap';

export default function InventoryDashboard() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Inventory Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of workshop parts, consumables, and warehousing.</p>
        </div>

        <InventoryKPIs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LowStockAlerts />
          <PurchaseWorkflow />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WarehouseMap />
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/inventory/pages/ItemList.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import InventoryTable from '../components/InventoryTable';

export default function ItemList() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">All Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">Complete catalog of spare parts, materials, and equipment.</p>
        </div>
        <InventoryTable />
      </div>
    </PageTransition>
  );
}`,
  'src/features/inventory/pages/AddItem.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import ItemForm from '../components/ItemForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <button 
          onClick={() => navigate('/admin/inventory/items')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Inventory
        </button>
        <ItemForm />
      </div>
    </PageTransition>
  );
}`,
  'src/features/inventory/pages/ItemDetails.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import StockMovementTimeline from '../components/StockMovementTimeline';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ItemDetails() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm">
            <Edit size={16} /> Edit Item
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-border p-6 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-square bg-gray-light rounded-lg border border-border flex items-center justify-center text-4xl overflow-hidden relative">
              <span className="opacity-50">⚙️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-olive">TATRA Oil Filter</h1>
                <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-bold">Optimal</span>
              </div>
              <p className="text-sm font-bold text-gray-500 mb-6 font-mono">INV-1024</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Category</div><div className="font-semibold text-gray-800">Consumables</div></div>
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Location</div><div className="font-semibold text-gray-800">Bay A, Shelf 12</div></div>
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Supplier</div><div className="font-semibold text-gray-800">AutoParts India Ltd</div></div>
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Stock Level</div><div className="font-semibold text-gray-800">45 (Min: 20, Max: 200)</div></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
             <div className="bg-white rounded-lg shadow-sm border border-border p-6 text-center h-full flex flex-col justify-center">
                <h2 className="text-5xl font-bold text-olive mb-2">45</h2>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Units Available</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-6 overflow-hidden"><div className="bg-success h-full w-[22%]"></div></div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockMovementTimeline />
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/inventory/pages/IssueReturn.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import IssueReturnForm from '../components/IssueReturnForm';

export default function IssueReturn() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Issue & Return</h1>
          <p className="text-sm text-gray-500 mt-1">Assign parts to technicians or return them to inventory.</p>
        </div>
        <IssueReturnForm />
      </div>
    </PageTransition>
  );
}`,
  'src/features/inventory/pages/SuppliersPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import SuppliersList from '../components/SuppliersList';

export default function SuppliersPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Suppliers Directory</h1>
        </div>
        <SuppliersList />
      </div>
    </PageTransition>
  );
}`,
  'src/features/inventory/pages/WarehousePage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import WarehouseMap from '../components/WarehouseMap';

export default function WarehousePage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Warehouse Visualizer</h1>
        </div>
        <div className="max-w-4xl">
          <WarehouseMap />
        </div>
      </div>
    </PageTransition>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}

console.log('Inventory module components created successfully.');
