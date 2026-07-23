import PageTransition from '../../../components/animations/PageTransition';
import ExecutiveKPIs from '../components/ExecutiveKPIs';
import UtilizationChart from '../components/charts/UtilizationChart';
import DepartmentEfficiencyChart from '../components/charts/DepartmentEfficiencyChart';
import MaintenanceTrendsChart from '../components/charts/MaintenanceTrendsChart';
import VehicleReadinessChart from '../components/charts/VehicleReadinessChart';
import TechnicianLeaderboard from '../components/TechnicianLeaderboard';
import ExportToolbar from '../components/ExportToolbar';

export default function ExecutiveDashboard() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Executive Command Center</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time holistic visibility into workshop performance and readiness.</p>
          </div>
          <ExportToolbar />
        </div>

        <ExecutiveKPIs />

        {/* Top Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <UtilizationChart />
          <VehicleReadinessChart />
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MaintenanceTrendsChart />
          <DepartmentEfficiencyChart />
          <TechnicianLeaderboard />
        </div>
      </div>
    </PageTransition>
  );
}