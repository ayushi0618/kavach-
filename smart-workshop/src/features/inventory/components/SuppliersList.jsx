import { suppliersList } from '../data/mockInventoryData';
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
}