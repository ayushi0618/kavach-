import PageTransition from '../../components/animations/PageTransition';

import TechWelcome from '../../features/technician/components/TechWelcome';
import TodayTasks from '../../features/technician/components/TodayTasks';
import MyVehicles from '../../features/technician/components/MyVehicles';
import QRScannerWidget from '../../features/technician/components/QRScannerWidget';
import WorkProgress from '../../features/technician/components/WorkProgress';
import MaintenanceUpdate from '../../features/technician/components/MaintenanceUpdate';
import PartsUsedForm from '../../features/technician/components/PartsUsedForm';
import ImageUploadWidget from '../../features/technician/components/ImageUploadWidget';
import TodaySchedule from '../../features/technician/components/TodaySchedule';
import TechNotifications from '../../features/technician/components/TechNotifications';
import MaintenanceHistory from '../../features/technician/components/MaintenanceHistory';
import TechProfileWidget from '../../features/technician/components/TechProfileWidget';

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-7xl mx-auto bg-[#F8F8F8] min-h-screen">
        
        {/* Header */}
        <TechWelcome />

        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8">
            <TodayTasks />
          </div>
          <div className="lg:col-span-4">
            <QRScannerWidget />
          </div>
        </div>

        {/* My Active Vehicles */}
        <MyVehicles />

        {/* Active Job Module (Consolidated for the active task) */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-olive mb-4">Active Repair Job: ERG-102</h2>
          <WorkProgress activeStage={2} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <MaintenanceUpdate />
            </div>
            <div className="lg:col-span-1">
              <PartsUsedForm />
            </div>
            <div className="lg:col-span-1">
              <ImageUploadWidget />
            </div>
          </div>
        </div>

        {/* Schedule & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TodaySchedule />
          <TechNotifications />
        </div>

        {/* History */}
        <MaintenanceHistory />

        {/* Profile */}
        <TechProfileWidget />

      </div>
    </PageTransition>
  );
}
