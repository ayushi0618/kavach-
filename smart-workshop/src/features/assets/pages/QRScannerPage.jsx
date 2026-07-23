import PageTransition from '../../../components/animations/PageTransition';
import QRScannerWidget from '../../technician/components/QRScannerWidget';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QRScannerPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto bg-[#F8F8F8] min-h-screen flex flex-col justify-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors self-start"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <QRScannerWidget />
      </div>
    </PageTransition>
  );
}