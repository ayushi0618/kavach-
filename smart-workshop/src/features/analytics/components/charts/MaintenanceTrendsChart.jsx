import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import api from '../../../../utils/api';
import toast from 'react-hot-toast';

export default function MaintenanceTrendsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/analytics/trends');
        if (response.data && response.data.success) {
          setData(response.data.data);
        }
      } catch (err) {
        toast.error('Failed to load trends data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border h-[350px]">
      <h3 className="text-sm font-bold text-olive mb-4">Monthly Maintenance Trends</h3>
      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-500">Loading chart...</div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
            <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Area type="monotone" dataKey="preventive" name="Preventive" stackId="1" stroke="#2E7D32" fill="#2E7D32" />
            <Area type="monotone" dataKey="corrective" name="Corrective" stackId="1" stroke="#C8B68A" fill="#C8B68A" />
            <Area type="monotone" dataKey="emergency" name="Emergency" stackId="1" stroke="#C0392B" fill="#C0392B" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}