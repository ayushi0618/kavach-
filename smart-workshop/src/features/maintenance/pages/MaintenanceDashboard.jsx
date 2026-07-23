import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceKPIs from '../components/MaintenanceKPIs';
import LiveWorkflowAnimation from '../components/LiveWorkflowAnimation';
import CompletedJobsTable from '../components/CompletedJobsTable';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MaintenanceDashboard() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Maintenance Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Live overview of workshop repair operations.</p>
          </div>
        </div>

        <MaintenanceKPIs />

        <div className="mb-6">
          <LiveWorkflowAnimation />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-olive mb-4">Recently Completed Jobs</h2>
          <CompletedJobsTable />
        </div>
      </div>
    </PageTransition>
  );
}