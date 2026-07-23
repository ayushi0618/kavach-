import PageTransition from '../../../components/animations/PageTransition';
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
}