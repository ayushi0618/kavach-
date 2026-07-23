import PageTransition from '../../../components/animations/PageTransition';
import ProcurementKPIs from '../components/ProcurementKPIs';
import ProcurementWorkflowAnimation from '../components/ProcurementWorkflowAnimation';
import POList from '../components/POList';
import ActiveTendersWidget from '../components/ActiveTendersWidget';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProcurementDashboard() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Procurement Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage purchase requests, tenders, vendors, and material receipt.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/admin/procurement/evaluations')} className="px-4 py-2 bg-white border border-border text-olive rounded font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
              Vendor Evaluations <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <ProcurementKPIs />

        <div className="mb-6">
          <ProcurementWorkflowAnimation />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <POList />
          <ActiveTendersWidget />
        </div>
      </div>
    </PageTransition>
  );
}