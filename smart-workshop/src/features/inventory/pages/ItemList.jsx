import PageTransition from '../../../components/animations/PageTransition';
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
}