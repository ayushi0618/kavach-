import PageTransition from '../../../components/animations/PageTransition';
import MaterialReceiptForm from '../components/MaterialReceiptForm';

export default function MaterialReceiptPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <MaterialReceiptForm />
      </div>
    </PageTransition>
  );
}