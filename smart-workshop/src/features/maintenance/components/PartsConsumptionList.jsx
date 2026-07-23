import { mockPartsUsed } from '../data/mockMaintenanceData';
import { Package } from 'lucide-react';

export default function PartsConsumptionList() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Package size={18} /> Parts Consumed
      </h3>
      <div className="space-y-2">
        {mockPartsUsed.map(part => (
          <div key={part.id} className="flex justify-between items-center p-3 border border-border rounded bg-gray-50">
            <div>
              <div className="font-bold text-gray-800 text-sm">{part.name}</div>
              <div className="text-xs text-gray-500 font-mono">{part.id}</div>
            </div>
            <div className="bg-white px-3 py-1 rounded border border-border font-bold text-olive text-sm shadow-sm">
              {part.qty}x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}