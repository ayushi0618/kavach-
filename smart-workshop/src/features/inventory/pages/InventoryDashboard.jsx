import { useState, useEffect } from 'react';
import PageTransition from '../../../components/animations/PageTransition';
import InventoryKPIs from '../components/InventoryKPIs';
import LowStockAlerts from '../components/LowStockAlerts';
import PurchaseWorkflow from '../components/PurchaseWorkflow';
import WarehouseMap from '../components/WarehouseMap';
import IssueReturnForm from '../components/IssueReturnForm';
import { kavachSync } from '../../../utils/kavachSync';
import { PackageCheck, LayoutDashboard } from 'lucide-react';

export default function InventoryDashboard() {
  const [activeView, setActiveView] = useState('requisitions'); // 'requisitions' or 'overview'
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const syncCount = () => {
      const reqs = kavachSync.getRequisitions();
      const count = reqs.filter(r => r.status === 'Pending Requisition').length;
      setPendingCount(count);
    };
    syncCount();
    return kavachSync.subscribe(syncCount);
  }, []);

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen space-y-6">
        {/* Header with View Toggle Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-border shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-olive">Inventory & Stock Control</h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              510 ABW Ordnance Stores • Approve Technician Spare Requisitions & Track Stock
            </p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-lg border border-border">
            <button
              onClick={() => setActiveView('requisitions')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-extrabold text-xs transition-all ${
                activeView === 'requisitions'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-600 hover:text-olive'
              }`}
            >
              <PackageCheck size={16} /> Approve Technician Requisitions
              {pendingCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveView('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-extrabold text-xs transition-all ${
                activeView === 'overview'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-600 hover:text-olive'
              }`}
            >
              <LayoutDashboard size={16} /> Inventory Dashboard Overview
            </button>
          </div>
        </div>

        {/* View 1: Approve Technician Requisitions & Issue/Return */}
        {activeView === 'requisitions' && (
          <div className="space-y-6">
            <IssueReturnForm />
            <InventoryKPIs />
          </div>
        )}

        {/* View 2: Full Inventory Dashboard Overview */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            <InventoryKPIs />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LowStockAlerts />
              <PurchaseWorkflow />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WarehouseMap />
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}