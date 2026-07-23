import { useState } from 'react';
import { FileText, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ActiveTendersWidget() {
  const navigate = useNavigate();

  const tenders = [
    {
      id: 'TND-2026-088',
      title: 'Supply of TATRA 8x8 Engine Assemblies',
      dept: 'Vehicle Repair Group',
      bidsCount: 4,
      l1Vendor: 'BEML Heavy Spares Ltd',
      l1Amount: '₹ 14,50,000',
      closingDate: '28 Jul 2026',
      status: 'Technical Evaluation'
    },
    {
      id: 'TND-2026-092',
      title: 'Hydraulic Cylinder Seals & Hoses',
      dept: 'Armament Group',
      bidsCount: 3,
      l1Vendor: 'MilTech Fluid Systems',
      l1Amount: '₹ 4,80,000',
      closingDate: '30 Jul 2026',
      status: 'Commercial Bidding'
    },
    {
      id: 'TND-2026-095',
      title: '500KVA Generator Rewiring Consumables',
      dept: 'Electrical Group',
      bidsCount: 5,
      l1Vendor: 'PowerGen Controls',
      l1Amount: '₹ 2,30,000',
      closingDate: '02 Aug 2026',
      status: 'L1 Finalization'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-olive text-lg flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Active Tenders & E-Bids
          </h3>
          <p className="text-xs text-gray-500">Live procurement tenders currently under evaluation.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/procurement/tenders')}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </button>
      </div>

      <div className="space-y-3 flex-1">
        {tenders.map((tender) => (
          <div 
            key={tender.id}
            onClick={() => navigate('/admin/procurement/evaluations')}
            className="p-3 border border-border rounded-lg bg-gray-50 hover:bg-white hover:border-khaki transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-xs text-primary">{tender.id}</span>
              <span className="text-[10px] bg-blue-100 text-info font-bold px-2 py-0.5 rounded-full">
                {tender.status}
              </span>
            </div>
            <h4 className="font-bold text-gray-800 text-xs mb-1 line-clamp-1">{tender.title}</h4>
            <div className="flex justify-between items-center text-[11px] text-gray-500 pt-1 border-t border-border/50">
              <span className="flex items-center gap-1"><Users size={12} /> {tender.bidsCount} Bids</span>
              <span className="font-bold text-olive">L1: {tender.l1Vendor} ({tender.l1Amount})</span>
              <span className="flex items-center gap-1 text-gray-400"><Clock size={12} /> {tender.closingDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
