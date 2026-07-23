import PageTransition from '../../components/animations/PageTransition';

import DashboardHeader from '../../features/admin/components/DashboardHeader';
import QuickActions from '../../features/admin/components/QuickActions';
import LiveKPIs from '../../features/admin/components/LiveKPIs';
import WorkshopStatus from '../../features/admin/components/WorkshopStatus';
import NotificationsWidget from '../../features/admin/components/NotificationsWidget';
import LiveVehicleStatus from '../../features/admin/components/LiveVehicleStatus';
import AnalyticsPreview from '../../features/admin/components/AnalyticsPreview';
import InventorySummary from '../../features/admin/components/InventorySummary';
import MaintenanceOverview from '../../features/admin/components/MaintenanceOverview';
import ProcurementSummary from '../../features/admin/components/ProcurementSummary';
import WorkflowTracking from '../../features/admin/components/WorkflowTracking';
import RecentActivities from '../../features/admin/components/RecentActivities';
import CalendarWidget from '../../features/admin/components/CalendarWidget';

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        
        {/* Row 1: Header */}
        <DashboardHeader />

        {/* Row 2: Quick Actions */}
        <QuickActions />

        {/* Row 3: KPIs */}
        <LiveKPIs />

        {/* Row 4: Workshop & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8">
            <WorkshopStatus />
          </div>
          <div className="lg:col-span-4">
            <NotificationsWidget />
          </div>
        </div>

        {/* Row 5: Live Vehicle Status Table */}
        <LiveVehicleStatus />

        {/* Row 6: Workflow Tracking Timeline */}
        <WorkflowTracking />

        {/* Row 7: Analytics & Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8">
            <AnalyticsPreview />
          </div>
          <div className="lg:col-span-4">
            <InventorySummary />
          </div>
        </div>

        {/* Row 8: Maintenance & Procurement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MaintenanceOverview />
          <ProcurementSummary />
        </div>

        {/* Row 9: Recent Activities & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <CalendarWidget />
        </div>

      </div>
    </PageTransition>
  );
}
