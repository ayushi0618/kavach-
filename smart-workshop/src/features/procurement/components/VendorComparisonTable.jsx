import { motion } from 'framer-motion';
import { Trophy, Check, X, ShieldCheck, AlertCircle } from 'lucide-react';

const comparison = [
  { spec: 'Quoted Price', v1: '₹4,45,000', v2: '₹4,60,000', v3: '₹4,75,000' },
  { spec: 'Delivery Time', v1: '14 Days', v2: '10 Days', v3: '21 Days' },
  { spec: 'Warranty', v1: '1 Year', v2: '1 Year', v3: '2 Years' },
  { spec: 'ISO Certification', v1: true, v2: true, v3: false },
  { spec: 'Past Performance', v1: '4.8/5.0', v2: '4.2/5.0', v3: '3.5/5.0' },
  { spec: 'Technical Score', v1: '95/100', v2: '98/100', v3: '85/100' },
];

export default function VendorComparisonTable({ techStatus, commStatus }) {
  const isFullyApproved = techStatus === 'APPROVED' && commStatus === 'APPROVED';
  const isAnyRejected = techStatus === 'REJECTED' || commStatus === 'REJECTED';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-olive text-base">Vendor Comparison Grid (TNDR-045)</h3>
          <p className="text-xs text-gray-500">Live evaluation of L1, L2, L3 commercial bids & technical compliance.</p>
        </div>

        {isFullyApproved && (
          <span className="bg-green-100 text-success text-xs font-bold px-3 py-1 rounded-full border border-green-200 flex items-center gap-1">
            <ShieldCheck size={14} /> Evaluation Complete — L1 AutoParts India Approved
          </span>
        )}

        {isAnyRejected && (
          <span className="bg-red-100 text-danger text-xs font-bold px-3 py-1 rounded-full border border-red-200 flex items-center gap-1">
            <AlertCircle size={14} /> Evaluation Rejected / Non-Compliant
          </span>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4 border-r border-border w-1/4">Evaluation Criteria</th>
              <th className="p-4 border-r border-border text-center w-1/4">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gray-900">AutoParts India Ltd</span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded mt-1 uppercase ${
                    isFullyApproved ? 'bg-green-700 text-white' :
                    isAnyRejected ? 'bg-red-100 text-danger border border-red-200' :
                    'bg-green-100 text-success'
                  }`}>
                    <Trophy size={10} /> {isFullyApproved ? '★ L1 Approved & Awarded' : isAnyRejected ? 'Disqualified' : 'L1 Selected'}
                  </span>
                </div>
              </th>
              <th className="p-4 border-r border-border text-center w-1/4">
                <span className="font-bold text-gray-800">Defence Spares Co.</span>
                <div className="text-[10px] text-gray-500 uppercase mt-1 font-bold">L2 Bidder</div>
              </th>
              <th className="p-4 text-center w-1/4">
                <span className="font-bold text-gray-800">Global Tech Systems</span>
                <div className="text-[10px] text-gray-500 uppercase mt-1 font-bold">L3 Bidder</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comparison.map((row, idx) => (
              <motion.tr 
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="p-4 font-bold text-gray-700 border-r border-border bg-gray-50">{row.spec}</td>
                <td className="p-4 text-center border-r border-border font-bold bg-green-50/30 text-olive">
                  {typeof row.v1 === 'boolean' ? (row.v1 ? <Check size={16} className="mx-auto text-success"/> : <X size={16} className="mx-auto text-danger"/>) : row.v1}
                </td>
                <td className="p-4 text-center border-r border-border font-semibold text-gray-600">
                  {typeof row.v2 === 'boolean' ? (row.v2 ? <Check size={16} className="mx-auto text-success"/> : <X size={16} className="mx-auto text-danger"/>) : row.v2}
                </td>
                <td className="p-4 text-center font-semibold text-gray-600">
                  {typeof row.v3 === 'boolean' ? (row.v3 ? <Check size={16} className="mx-auto text-success"/> : <X size={16} className="mx-auto text-danger"/>) : row.v3}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}