import PageTransition from '../../components/animations/PageTransition';

export default function Scanner() {
  return (
    <PageTransition>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-olive mb-4">Scanner</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
          <p className="text-gray-600">This is the Scanner page.</p>
        </div>
      </div>
    </PageTransition>
  );
}
