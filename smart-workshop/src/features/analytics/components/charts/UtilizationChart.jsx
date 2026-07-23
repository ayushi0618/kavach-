import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { utilizationData } from '../../data/mockAnalyticsData';

export default function UtilizationChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border h-[350px]">
      <h3 className="text-sm font-bold text-olive mb-4">Workshop Utilization vs Turnaround Time</h3>
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={utilizationData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar yAxisId="left" dataKey="utilization" name="Capacity Used (%)" fill="#C8B68A" radius={[4, 4, 0, 0]} barSize={30} />
          <Line yAxisId="right" type="monotone" dataKey="turnaround" name="Avg Turnaround (Days)" stroke="#4B5D3A" strokeWidth={3} dot={{r: 4, fill: '#4B5D3A'}} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}