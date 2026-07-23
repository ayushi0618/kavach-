import PageTransition from '../../../components/animations/PageTransition';
import CompletedJobsTable from '../components/CompletedJobsTable';

export default function CompletedJobsPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <h1 className="text-2xl font-bold text-olive mb-6">Completed Maintenance Jobs</h1>
        <CompletedJobsTable />
      </div>
    </PageTransition>
  );
}