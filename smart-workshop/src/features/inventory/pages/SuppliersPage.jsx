import PageTransition from '../../../components/animations/PageTransition';
import SuppliersList from '../components/SuppliersList';

export default function SuppliersPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Suppliers Directory</h1>
        </div>
        <SuppliersList />
      </div>
    </PageTransition>
  );
}