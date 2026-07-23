import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function PartsUsedForm() {
  const [parts, setParts] = useState([{ name: 'Oil Filter X2', qty: 1 }]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-lg font-bold text-olive mb-4">Parts Used Record</h3>
      
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Part Name</label>
          <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-primary" placeholder="e.g. Hydraulic Hose" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Quantity</label>
            <input type="number" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-primary" placeholder="1" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Location / Bin</label>
            <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-primary" placeholder="A1-42" />
          </div>
        </div>
        <button className="w-full bg-gray-light hover:bg-gray-200 text-olive border border-border font-bold py-2 rounded text-sm flex items-center justify-center gap-2 transition-colors">
          <Plus size={16} /> Add Part to Record
        </button>
      </div>

      <div className="flex-1 border-t border-border pt-4">
        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Added Parts</h4>
        <ul className="space-y-2">
          {parts.map((p, i) => (
            <li key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-100">
              <span className="font-semibold text-olive">{p.name}</span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full font-bold">{p.qty}x</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}