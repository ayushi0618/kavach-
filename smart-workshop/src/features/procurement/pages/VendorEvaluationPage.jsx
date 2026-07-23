import { useState } from 'react';
import PageTransition from '../../../components/animations/PageTransition';
import VendorComparisonTable from '../components/VendorComparisonTable';
import EvaluationForm from '../components/EvaluationForm';
import L1AwardPOModal from '../components/L1AwardPOModal';
import { ShieldCheck, AlertCircle, ShoppingBag, ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VendorEvaluationPage() {
  const [techStatus, setTechStatus] = useState(null); // 'APPROVED' | 'REJECTED'
  const [commStatus, setCommStatus] = useState(null); // 'APPROVED' | 'REJECTED'
  const [techRemarks, setTechRemarks] = useState('');
  const [commRemarks, setCommRemarks] = useState('');
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);

  const handleStatusChange = (type, newStatus, remarks) => {
    if (type === 'Tech') {
      setTechStatus(newStatus);
      if (remarks) setTechRemarks(remarks);
    } else {
      setCommStatus(newStatus);
      if (remarks) setCommRemarks(remarks);
    }
  };

  const isFullyApproved = techStatus === 'APPROVED' && commStatus === 'APPROVED';
  const isAnyRejected = techStatus === 'REJECTED' || commStatus === 'REJECTED';

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen space-y-6">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-lg border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-olive text-white px-2.5 py-0.5 rounded-full uppercase">
                Tender ID: TNDR-045
              </span>
              <span className="text-xs font-bold text-gray-400">510 ABW Procurement Wing</span>
            </div>
            <h1 className="text-2xl font-bold text-olive">Vendor Evaluation Command Center</h1>
            <p className="text-sm text-gray-500 mt-1">Review technical compliance, commercial terms, and finalize L1 bidder.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              isFullyApproved ? 'bg-green-100 text-success border-green-200' :
              isAnyRejected ? 'bg-red-100 text-danger border-red-200' :
              'bg-gray-100 text-gray-600 border-border'
            }`}>
              {isFullyApproved ? '✓ Evaluation Approved' : isAnyRejected ? '✕ Evaluation Rejected' : '● In Evaluation'}
            </span>
          </div>
        </div>

        {/* Master Evaluation Result Banner */}
        {isFullyApproved && (
          <div className="bg-emerald-50 border-2 border-emerald-500 p-5 rounded-lg text-emerald-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base text-emerald-900">
                  Tender Approved — L1 Bidder AutoParts India Ltd Finalized
                </h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Both Technical & Commercial compliance have been approved by the Evaluation Board. Quoted L1 Value: <strong>₹4,45,000</strong>.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsPOModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-700 text-white rounded font-bold text-xs shadow-md hover:bg-emerald-800 transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <ShoppingBag size={16} /> Generate L1 Purchase Order →
            </button>
          </div>
        )}

        {isAnyRejected && (
          <div className="bg-red-50 border-2 border-red-400 p-5 rounded-lg text-red-900 flex items-start gap-3 shadow-sm animate-fade-in">
            <AlertCircle size={24} className="text-red-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-base text-red-900">
                Tender Evaluation Rejected
              </h3>
              <p className="text-xs text-red-700 mt-1">
                One or more evaluation criteria failed. Re-tendering or revised vendor negotiations are required before purchase order release.
              </p>
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div>
          <VendorComparisonTable techStatus={techStatus} commStatus={commStatus} />
        </div>

        {/* Evaluation Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EvaluationForm 
            title="Technical Evaluation" 
            type="Tech" 
            status={techStatus} 
            remarks={techRemarks}
            onStatusChange={handleStatusChange} 
          />
          <EvaluationForm 
            title="Commercial Evaluation" 
            type="Comm" 
            status={commStatus} 
            remarks={commRemarks}
            onStatusChange={handleStatusChange} 
          />
        </div>

        <L1AwardPOModal 
          isOpen={isPOModalOpen} 
          onClose={() => setIsPOModalOpen(false)}
          onSuccess={() => toast.success('L1 Award Purchase Order generated successfully!')}
        />
      </div>
    </PageTransition>
  );
}