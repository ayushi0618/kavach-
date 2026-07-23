import { useState, useEffect } from 'react';
import { Sparkles, AlertTriangle, Calendar, Activity } from 'lucide-react';
import api from '../../../utils/api';

export default function PredictiveMaintenanceCard({ assetId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.post('/ai/predict', { assetData: { assetId } })
      .then(res => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [assetId]);

  if (loading) return <div className="h-32 bg-gray-100 animate-pulse rounded-lg border border-border"></div>;
  if (!data) return null;

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-khaki-light to-white p-3 border-b border-border flex items-center gap-2">
        <Sparkles size={16} className="text-olive" />
        <h3 className="font-bold text-sm text-olive">AI Predictive Analysis</h3>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><AlertTriangle size={12}/> Risk Level</p>
          <div className="font-bold text-lg text-danger">{data.riskLevel}</div>
        </div>
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase mb-1 flex items-center gap-1"><Activity size={12}/> AI Confidence</p>
          <div className="font-bold text-lg text-olive">{data.confidenceScore}%</div>
        </div>
        <div className="col-span-2 bg-gray-50 p-2 rounded border border-border flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center gap-1"><Calendar size={14}/> Recommended Inspection:</span>
          <span className="font-bold text-gray-800">{new Date(data.recommendedInspectionDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}