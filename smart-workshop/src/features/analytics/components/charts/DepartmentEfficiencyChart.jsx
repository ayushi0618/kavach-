import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useState, useEffect } from 'react';
import api from '../../../../utils/api';
import toast from 'react-hot-toast';

export default function DepartmentEfficiencyChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/analytics/efficiency');
        if (response.data && response.data.success) {
          setData(response.data.data.map(d => ({ subject: d.name, A: d.efficiency })));
        }
      } catch (err) {
        toast.error('Failed to load efficiency data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border h-[350px]">
      <h3 className="text-sm font-bold text-olive mb-4">Department Efficiency Index</h3>
      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis dataKey="subject" tick={{fontSize: 11, fill: '#4B5D3A', fontWeight: 'bold'}} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip />
            <Radar name="Efficiency Score" dataKey="A" stroke="#C8B68A" fill="#C8B68A" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}