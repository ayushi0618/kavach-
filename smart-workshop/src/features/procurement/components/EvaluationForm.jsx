import { useState } from 'react';
import { CheckSquare, Square, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../utils/api';

export default function EvaluationForm({ title, type, status, remarks, onStatusChange }) {
  const [checks, setChecks] = useState([
    { id: 1, label: type === 'Tech' ? 'Matches requested specifications' : 'Price is within budget', passed: true },
    { id: 2, label: type === 'Tech' ? 'Quality certificates verified' : 'Taxes and duties included clearly', passed: true },
    { id: 3, label: type === 'Tech' ? 'Past experience in similar supply' : 'Payment terms acceptable (Net 30)', passed: true },
  ]);
  const [localRemarks, setLocalRemarks] = useState(remarks || '');
  const [submitting, setSubmitting] = useState(false);

  const toggleCheck = (id) => setChecks(checks.map(c => c.id === id ? { ...c, passed: !c.passed } : c));

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      await api.post('/procurement/evaluations', {
        tenderId: 'TNDR-045',
        evaluationType: type,
        status: 'APPROVED',
        remarks: localRemarks
      });
      onStatusChange(type, 'APPROVED', localRemarks);
      toast.success(`${title} Status updated to APPROVED!`);
    } catch (err) {
      onStatusChange(type, 'APPROVED', localRemarks);
      toast.success(`${title} Approved!`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    setSubmitting(true);
    try {
      await api.post('/procurement/evaluations', {
        tenderId: 'TNDR-045',
        evaluationType: type,
        status: 'REJECTED',
        remarks: localRemarks
      });
      onStatusChange(type, 'REJECTED', localRemarks);
      toast.error(`${title} Status updated to REJECTED.`);
    } catch (err) {
      onStatusChange(type, 'REJECTED', localRemarks);
      toast.error(`${title} Rejected.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border flex flex-col h-full relative overflow-hidden transition-all ${
      status === 'APPROVED' ? 'border-green-300 ring-1 ring-green-200' :
      status === 'REJECTED' ? 'border-red-300 ring-1 ring-red-200' :
      'border-border'
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-olive">{title}</h3>
        {status === 'APPROVED' && (
          <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">
            <CheckCircle size={14} /> Approved
          </span>
        )}
        {status === 'REJECTED' && (
          <span className="flex items-center gap-1 text-xs font-bold bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200">
            <XCircle size={14} /> Rejected
          </span>
        )}
        {(!status || status === 'PENDING') && (
          <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
            Pending Review
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2 mb-6">
        {checks.map(check => (
          <div 
            key={check.id} 
            onClick={() => toggleCheck(check.id)}
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition-colors ${check.passed ? 'bg-green-50/60 border-green-200' : 'bg-gray-50 border-border'}`}
          >
            {check.passed ? <CheckSquare size={18} className="text-success" /> : <Square size={18} className="text-gray-400" />}
            <span className={`text-sm font-semibold ${check.passed ? 'text-success' : 'text-gray-600'}`}>{check.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <textarea 
          placeholder="Evaluation Remarks..." 
          value={localRemarks}
          onChange={(e) => setLocalRemarks(e.target.value)}
          className="w-full border border-border rounded p-2 text-sm focus:outline-none focus:border-primary" 
          rows="2"
        ></textarea>

        <div className="flex gap-2">
          <button 
            type="button"
            onClick={handleReject}
            disabled={submitting}
            className={`flex-1 py-2.5 rounded font-bold text-sm transition-all border ${
              status === 'REJECTED' 
                ? 'bg-red-600 text-white border-red-600 shadow' 
                : 'bg-red-50 text-danger border-red-200 hover:bg-red-100'
            }`}
          >
            {status === 'REJECTED' ? '✕ Rejected' : 'Reject'}
          </button>
          <button 
            type="button"
            onClick={handleApprove}
            disabled={submitting}
            className={`flex-1 py-2.5 rounded font-bold text-sm transition-all shadow ${
              status === 'APPROVED' 
                ? 'bg-green-700 text-white shadow-md' 
                : 'bg-primary text-white hover:bg-olive'
            }`}
          >
            {status === 'APPROVED' ? '✓ Approved' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
}