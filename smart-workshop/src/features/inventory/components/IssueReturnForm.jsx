import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { kavachSync } from '../../../utils/kavachSync';
import { 
  ArrowRightLeft, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Clock, 
  CheckCircle2, 
  ShoppingCart, 
  ShieldAlert, 
  User, 
  Wrench, 
  PackageCheck,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function IssueReturnForm() {
  const [activeTab, setActiveTab] = useState('requisitions'); // 'requisitions', 'issue', or 'return'
  
  const [requisitions, setRequisitions] = useState(() => kavachSync.getRequisitions());

  useEffect(() => {
    const syncRequisitions = () => {
      setRequisitions(kavachSync.getRequisitions());
    };
    syncRequisitions();
    const unsubscribe = kavachSync.subscribe(syncRequisitions);
    const interval = setInterval(syncRequisitions, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleApproveAndIssue = (reqId, partName) => {
    kavachSync.approveRequisition(reqId);
    toast.success(`Requisition #${reqId} approved & '${partName}' issued! Updated in Technician Workbench.`);
  };

  const handleForwardToProcurement = (reqId) => {
    kavachSync.forwardToProcurement(reqId);
    toast.success(`Requisition #${reqId} forwarded to Procurement Purchase Requests!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      {/* Top Navigation Tabs */}
      <div className="flex border-b border-border bg-gray-50 flex-wrap">
        <button 
          onClick={() => setActiveTab('requisitions')}
          className={`flex-1 py-3.5 px-4 font-bold text-xs flex items-center justify-center gap-2 transition-all relative ${
            activeTab === 'requisitions' 
              ? 'bg-white text-primary border-b-2 border-primary shadow-xs' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Clock size={16} className="text-warning" /> 
          Pending Technician Requisitions 
          <span className="bg-orange-100 text-warning text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-200">
            {requisitions.filter(r => r.status === 'Pending Requisition').length}
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('issue')}
          className={`flex-1 py-3.5 px-4 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeTab === 'issue' 
              ? 'bg-white text-primary border-b-2 border-primary shadow-xs' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <ArrowUpFromLine size={16} /> Direct Issue Store Item
        </button>

        <button 
          onClick={() => setActiveTab('return')}
          className={`flex-1 py-3.5 px-4 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
            activeTab === 'return' 
              ? 'bg-white text-primary border-b-2 border-primary shadow-xs' 
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <ArrowDownToLine size={16} /> Return Store Item
        </button>
      </div>

      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-4"
      >
        {/* Tab 1: Technician Spare Requisitions */}
        {activeTab === 'requisitions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-emerald-50 p-3.5 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 text-xs">
                <Wrench size={16} className="text-primary" />
                <span className="font-bold text-olive">Live Technician Spares Requisitions Queue</span>
              </div>
              <span className="text-[11px] font-bold text-gray-500">
                510 ABW Central Ordnance Depot
              </span>
            </div>

            {requisitions.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-border rounded-lg bg-gray-50 text-gray-500 text-xs">
                No pending technician requisitions at this moment.
              </div>
            ) : (
              <div className="space-y-3">
                {requisitions.map((req) => (
                  <div 
                    key={req.id}
                    className="p-4 border border-border rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-xs">
                          #{req.id}
                        </span>
                        <span className="text-xs font-mono font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                          Job: #{req.jobId}
                        </span>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                          req.priority === 'Critical' ? 'bg-red-100 text-danger border border-red-200' : 'bg-orange-100 text-warning border border-orange-200'
                        }`}>
                          {req.priority}
                        </span>
                      </div>

                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                        req.status === 'Issued' ? 'bg-green-100 text-success border border-green-200' :
                        req.status === 'Forwarded to Procurement' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                        'bg-orange-100 text-warning border border-orange-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
                      <div className="md:col-span-7 space-y-1">
                        <div className="font-extrabold text-olive text-sm flex items-center gap-1">
                          <PackageCheck size={16} className="text-primary" /> Requested Spare: <span className="text-primary">{req.partName} (x{req.qty})</span>
                        </div>
                        <div className="text-gray-600 font-medium">
                          Equipment: <strong>{req.assetName}</strong> ({req.assetId})
                        </div>
                        <div className="text-gray-500 flex items-center gap-2 text-[11px]">
                          <span>Technician: <strong>{req.technicianName}</strong></span>
                          <span>•</span>
                          <span>{req.department}</span>
                          <span>•</span>
                          <span>{req.date}</span>
                        </div>
                      </div>

                      <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap gap-2 justify-end">
                        {req.status === 'Pending Requisition' && (
                          <>
                            <button
                              onClick={() => handleApproveAndIssue(req.id, req.partName, req.jobId)}
                              className="px-3.5 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-xs transition-colors flex items-center gap-1 shadow-xs"
                            >
                              <CheckCircle2 size={14} /> Approve & Issue Part
                            </button>
                            <button
                              onClick={() => handleForwardToProcurement(req.id)}
                              className="px-3 py-2 bg-khaki hover:bg-[#b5a378] text-olive rounded font-bold text-xs transition-colors flex items-center gap-1"
                            >
                              <Send size={14} /> To Procurement
                            </button>
                          </>
                        )}
                        {req.status === 'Issued' && (
                          <span className="text-xs font-bold text-success flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded border border-green-200">
                            <CheckCircle2 size={14} /> Issued to Technician
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Direct Issue Item */}
        {activeTab === 'issue' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Technician / Recipient *</label>
                <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none font-semibold">
                  <option>Sub. Maj. Rajesh Sharma (TECH-402)</option>
                  <option>Hav. Vikram Singh (TECH-199)</option>
                  <option>Nk. Amit Patel (TECH-301)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Associated Maintenance Job</label>
                <select className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none font-semibold">
                  <option>JOB-8901 (TATRA 8x8 Heavy Truck)</option>
                  <option>JOB-8902 (BMP-2 Combat Vehicle)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Inventory Spare Item *</label>
              <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none font-semibold">
                <option>INV-1024 - Clutch Assembly Kit TATRA (12 in stock)</option>
                <option>INV-1088 - Synthetic Hydraulic Fluid 5L (45 in stock)</option>
                <option>INV-2090 - 30mm Breech Pawl Gear (4 in stock)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Quantity Issued *</label>
                <input type="number" required defaultValue="1" min="1" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Authorized By</label>
                <input type="text" disabled value="Col. R. S. Rathore (Commander)" className="w-full border border-border rounded p-2 text-sm bg-gray-100 text-gray-600 font-bold" />
              </div>
            </div>

            <button 
              onClick={() => toast.success('Spare item successfully issued to technician!')}
              className="w-full py-3 bg-primary hover:bg-olive text-white rounded font-bold transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm text-sm"
            >
              <ArrowUpFromLine size={18} /> Issue Spare Item to Technician
            </button>
          </div>
        )}

        {/* Tab 3: Return Item */}
        {activeTab === 'return' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Returning Technician *</label>
                <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none font-semibold">
                  <option>Sub. Maj. Rajesh Sharma (TECH-402)</option>
                  <option>Hav. Vikram Singh (TECH-199)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Returned Item Condition *</label>
                <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none font-semibold">
                  <option>Good / Unused Stock</option>
                  <option>Defective / Replaced Component</option>
                  <option>Scrap / Damaged</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => toast.success('Returned item received into inventory stock!')}
              className="w-full py-3 bg-olive hover:bg-primary text-white rounded font-bold transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm text-sm"
            >
              <ArrowDownToLine size={18} /> Process Item Return & Restock
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}