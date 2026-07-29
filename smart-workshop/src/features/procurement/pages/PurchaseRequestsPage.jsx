import { useState, useEffect } from 'react';
import PageTransition from '../../../components/animations/PageTransition';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  User, 
  FileText, 
  Building2, 
  ShieldCheck, 
  Send 
} from 'lucide-react';
import toast from 'react-hot-toast';

const initialPRs = [
  {
    id: 'PR-8012',
    title: 'Clutch Assembly Kits for TATRA Fleet',
    item: 'Clutch Assembly Kit TATRA',
    qty: 5,
    requestedBy: 'Sub. Maj. Rajesh Sharma',
    department: 'Vehicle Repair Group (WSG)',
    priority: 'Critical',
    status: 'Pending Commander Approval',
    date: '22 Jul 2026',
    estimatedCost: '₹ 1,85,000'
  },
  {
    id: 'PR-8009',
    title: '30mm Breech Pawl Gears for BMP-2',
    item: '30mm Breech Pawl Gear',
    qty: 2,
    requestedBy: 'Hav. Vikram Singh',
    department: 'Armament Group',
    priority: 'High',
    status: 'Approved by Commander',
    date: '20 Jul 2026',
    estimatedCost: '₹ 92,000'
  },
  {
    id: 'PR-7988',
    title: 'Automatic Voltage Regulator 250kVA',
    item: 'AVR Module 250kVA',
    qty: 3,
    requestedBy: 'Nk. Amit Patel',
    department: 'Electrical & AC Group',
    priority: 'Routine',
    status: 'Approved by Commander',
    date: '15 Jul 2026',
    estimatedCost: '₹ 45,000'
  }
];

export default function PurchaseRequestsPage() {
  const [prs, setPrs] = useState(() => {
    const saved = localStorage.getItem('trishul_purchase_requests') || localStorage.getItem('kavach_purchase_requests');
    return saved ? JSON.parse(saved) : initialPRs;
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('trishul_purchase_requests', JSON.stringify(prs));
  }, [prs]);

  const handleApprovePR = (id) => {
    setPrs((prev) =>
      prev.map((pr) => (pr.id === id ? { ...pr, status: 'Approved by Commander' } : pr))
    );
    toast.success(`Purchase Requisition #${id} approved by Workshop Commander!`);
  };

  const handleRejectPR = (id) => {
    setPrs((prev) =>
      prev.map((pr) => (pr.id === id ? { ...pr, status: 'Rejected' } : pr))
    );
    toast.error(`Purchase Requisition #${id} rejected.`);
  };

  const filteredPRs = prs.filter((pr) =>
    pr.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pr.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pr.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pr.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg">
                <ShoppingCart size={24} />
              </span>
              <div>
                <h1 className="text-2xl font-black text-olive">Procurement Requisitions & Purchase Requests</h1>
                <p className="text-xs text-gray-500 font-medium">
                  510 ABW Procurement Wing • Spares & Material Acquisition Portal
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="px-3.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-center">
              <div className="text-[11px] font-bold text-gray-500">Pending Approval</div>
              <div className="text-lg font-black text-warning">
                {prs.filter(p => p.status.includes('Pending')).length}
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-[11px] font-bold text-gray-500">Approved PRs</div>
              <div className="text-lg font-black text-success">
                {prs.filter(p => p.status.includes('Approved')).length}
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Requisition ID, Part Name, or Technician..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-border rounded-lg focus:border-primary focus:outline-none bg-gray-50 font-medium"
            />
          </div>

          <span className="text-xs font-bold text-gray-500">
            Showing {filteredPRs.length} Purchase Requisitions
          </span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-light text-gray-600 font-bold uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-5 py-3.5">PR Ticket & Item</th>
                  <th className="px-5 py-3.5">Qty & Cost Est.</th>
                  <th className="px-5 py-3.5">Requested By & Dept</th>
                  <th className="px-5 py-3.5">Priority</th>
                  <th className="px-5 py-3.5">Approval Status</th>
                  <th className="px-5 py-3.5 text-right">Commander Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filteredPRs.map((pr) => (
                  <tr key={pr.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-black text-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-xs">
                        #{pr.id}
                      </span>
                      <div className="font-extrabold text-olive text-sm mt-1">{pr.item}</div>
                      <div className="text-[11px] text-gray-400">{pr.title}</div>
                    </td>

                    <td className="px-5 py-4 font-bold text-gray-800">
                      <div>Qty: x{pr.qty}</div>
                      <div className="text-[11px] font-mono text-primary mt-0.5">{pr.estimatedCost || 'Est. ₹ 50,000'}</div>
                    </td>

                    <td className="px-5 py-4 text-gray-700">
                      <div className="font-bold text-gray-800 flex items-center gap-1">
                        <User size={13} className="text-gray-400" /> {pr.requestedBy}
                      </div>
                      <div className="text-[11px] text-gray-500 font-semibold">{pr.department}</div>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        pr.priority === 'Critical' ? 'bg-red-100 text-danger border border-red-200' : 'bg-orange-100 text-warning border border-orange-200'
                      }`}>
                        {pr.priority}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        pr.status.includes('Approved') ? 'bg-green-100 text-success border border-green-200' :
                        pr.status === 'Rejected' ? 'bg-red-100 text-danger border border-red-200' :
                        'bg-orange-100 text-warning border border-orange-200'
                      }`}>
                        {pr.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      {pr.status.includes('Pending') ? (
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => handleApprovePR(pr.id)}
                            className="px-3 py-1.5 bg-primary hover:bg-olive text-white font-bold rounded text-xs transition-colors flex items-center gap-1 shadow-xs"
                          >
                            <CheckCircle2 size={13} /> Approve PR
                          </button>
                          <button
                            onClick={() => handleRejectPR(pr.id)}
                            className="px-2.5 py-1.5 border border-red-200 text-danger hover:bg-red-50 font-bold rounded text-xs transition-colors"
                          >
                            <XCircle size={13} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] font-bold text-gray-400 italic">
                          Action Completed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}