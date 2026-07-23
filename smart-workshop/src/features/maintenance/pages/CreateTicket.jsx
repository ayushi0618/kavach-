import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceForm from '../components/MaintenanceForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateTicket() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <button 
          onClick={() => navigate('/admin/maintenance')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <MaintenanceForm />
      </div>
    </PageTransition>
  );
}