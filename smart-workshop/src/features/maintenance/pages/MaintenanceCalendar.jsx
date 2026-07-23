import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceCalendarWidget from '../components/MaintenanceCalendarWidget';

export default function MaintenanceCalendar() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <h1 className="text-2xl font-bold text-olive mb-6">Workshop Scheduling</h1>
        <MaintenanceCalendarWidget />
      </div>
    </PageTransition>
  );
}