import PageTransition from '../../../components/animations/PageTransition';
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
}