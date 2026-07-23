import PageTransition from '../../components/animations/PageTransition';
import EmployeeManagement from '../../features/admin/components/EmployeeManagement';

export default function Employees() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Employee Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Manage workshop personnel, assign roles, and track workload.</p>
        </div>
        <EmployeeManagement />
      </div>
    </PageTransition>
  );
}
