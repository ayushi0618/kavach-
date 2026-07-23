import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { vehicleReadinessData } from '../../data/mockAnalyticsData';

export default function VehicleReadinessChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border h-[350px]">
      <h3 className="text-sm font-bold text-olive mb-4">Fleet Combat Readiness</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={vehicleReadinessData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {vehicleReadinessData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}