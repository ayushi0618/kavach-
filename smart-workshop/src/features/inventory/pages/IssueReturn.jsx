import PageTransition from '../../../components/animations/PageTransition';
import IssueReturnForm from '../components/IssueReturnForm';

export default function IssueReturn() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Issue & Return</h1>
          <p className="text-sm text-gray-500 mt-1">Assign parts to technicians or return them to inventory.</p>
        </div>
        <IssueReturnForm />
      </div>
    </PageTransition>
  );
}