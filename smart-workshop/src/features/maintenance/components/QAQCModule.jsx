import { useState } from 'react';
import { CheckSquare, Square, ThumbsUp, ThumbsDown } from 'lucide-react';

export default function QAQCModule() {
  const [checks, setChecks] = useState([
    { id: 1, label: 'Visual Inspection (No leaks, damage)', passed: true },
    { id: 2, label: 'Engine Performance Test', passed: true },
    { id: 3, label: 'Braking System Load Test', passed: false },
    { id: 4, label: 'Hydraulic Pressure Calibration', passed: false }
  ]);

  const toggleCheck = (id) => {
    setChecks(checks.map(c => c.id === id ? { ...c, passed: !c.passed } : c));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-lg font-bold text-olive mb-4">QA/QC Checklists</h3>
      
      <div className="flex-1 space-y-2 mb-6">
        {checks.map(check => (
          <div 
            key={check.id} 
            onClick={() => toggleCheck(check.id)}
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition-colors ${check.passed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-border hover:bg-gray-100'}`}
          >
            {check.passed ? <CheckSquare size={18} className="text-success" /> : <Square size={18} className="text-gray-400" />}
            <span className={`text-sm font-semibold ${check.passed ? 'text-success' : 'text-gray-600'}`}>{check.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <textarea placeholder="Supervisor Remarks..." className="w-full border border-border rounded p-2 text-sm focus:outline-none focus:border-primary" rows="2"></textarea>
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-50 hover:bg-red-50 text-danger border border-border hover:border-red-200 py-2 rounded flex items-center justify-center gap-2 font-bold text-sm transition-colors">
            <ThumbsDown size={16}/> Reject
          </button>
          <button className="flex-1 bg-primary hover:bg-olive text-white py-2 rounded flex items-center justify-center gap-2 font-bold text-sm transition-colors shadow">
            <ThumbsUp size={16}/> Approve QC
          </button>
        </div>
      </div>
    </div>
  );
}