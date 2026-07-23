const fs = require('fs');
const path = require('path');

const dirs = [
  'src/features/analytics/data',
  'src/features/analytics/components/charts',
  'src/features/analytics/pages'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const files = {
  'src/features/analytics/data/mockAnalyticsData.js': `export const executiveKPIs = [
  { label: 'Total Assets', value: 450, type: 'primary' },
  { label: 'Operational Assets', value: 380, type: 'success' },
  { label: 'Under Repair', value: 55, type: 'warning' },
  { label: 'Waiting for Parts', value: 15, type: 'danger' },
  { label: 'Inventory Value', value: '₹12.5 Cr', type: 'info' },
  { label: 'Low Stock Alerts', value: 24, type: 'danger' },
  { label: 'Open Procurements', value: 18, type: 'purple' },
  { label: 'Avg Repair Time', value: '3.2 Days', type: 'info' },
  { label: 'Active Technicians', value: 112, type: 'success' },
  { label: 'Workshop Capacity', value: '82%', type: 'warning' }
];

export const utilizationData = [
  { name: 'Jan', utilization: 65, turnaround: 4.5 },
  { name: 'Feb', utilization: 72, turnaround: 4.2 },
  { name: 'Mar', utilization: 85, turnaround: 3.8 },
  { name: 'Apr', utilization: 78, turnaround: 3.5 },
  { name: 'May', utilization: 90, turnaround: 3.1 },
  { name: 'Jun', utilization: 82, turnaround: 3.2 }
];

export const departmentEfficiency = [
  { subject: 'Vehicle Repair', A: 90, fullMark: 100 },
  { subject: 'Machine Shop', A: 85, fullMark: 100 },
  { subject: 'Fabrication', A: 75, fullMark: 100 },
  { subject: 'Electrical', A: 95, fullMark: 100 },
  { subject: 'Tool Room', A: 70, fullMark: 100 },
  { subject: 'QA / QC', A: 98, fullMark: 100 }
];

export const maintenanceTrends = [
  { name: 'W1', preventive: 20, corrective: 40, emergency: 5 },
  { name: 'W2', preventive: 25, corrective: 35, emergency: 2 },
  { name: 'W3', preventive: 30, corrective: 45, emergency: 8 },
  { name: 'W4', preventive: 40, corrective: 30, emergency: 3 }
];

export const vehicleReadinessData = [
  { name: 'Combat Ready', value: 380, fill: '#2E7D32' },
  { name: 'Under Repair', value: 55, fill: '#E69A8D' },
  { name: 'Waiting for Parts', value: 15, fill: '#C0392B' },
  { name: 'Testing & QA', value: 20, fill: '#C8B68A' }
];

export const technicianLeaderboard = [
  { id: 1, name: 'Rahul Sharma', dept: 'Vehicle Repair', jobs: 45, avgTime: '2.1 Days', eff: 98 },
  { id: 2, name: 'Amit Kumar', dept: 'Electrical', jobs: 38, avgTime: '1.5 Days', eff: 95 },
  { id: 3, name: 'Vikram Singh', dept: 'Machine Shop', jobs: 32, avgTime: '3.4 Days', eff: 88 },
  { id: 4, name: 'Deepak Verma', dept: 'Vehicle Repair', jobs: 28, avgTime: '2.8 Days', eff: 85 }
];
`,
  'src/features/analytics/components/ExecutiveKPIs.jsx': `import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { executiveKPIs } from '../data/mockAnalyticsData';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  if (isString) {
    return <motion.span>{rounded}</motion.span>;
  }
  return <motion.span>{rounded}</motion.span>;
};

export default function ExecutiveKPIs() {
  const getColors = (type) => {
    switch(type) {
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'danger': return 'text-red-600 bg-red-50 border-red-100';
      case 'primary': return 'text-olive bg-khaki-light/50 border-khaki-light';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'success': return 'text-success bg-green-50 border-green-100';
      default: return 'text-gray-800 bg-gray-50 border-border';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {executiveKPIs.map((kpi, idx) => {
        const colors = getColors(kpi.type);
        const isString = typeof kpi.value === 'string';
        const prefix = isString && kpi.value.includes('₹') ? '₹' : '';
        const suffix = isString && kpi.value.includes('Cr') ? ' Cr' : isString && kpi.value.includes('Days') ? ' Days' : isString && kpi.value.includes('%') ? '%' : '';

        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={\`p-4 rounded-lg shadow-sm border \${colors}\`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80 truncate">{kpi.label}</div>
            <div className="text-2xl font-bold flex items-center">
              {prefix}<Counter value={kpi.value} />{suffix}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}`,
  'src/features/analytics/components/charts/UtilizationChart.jsx': `import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
}`,
  'src/features/analytics/components/charts/DepartmentEfficiencyChart.jsx': `import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { departmentEfficiency } from '../../data/mockAnalyticsData';

export default function DepartmentEfficiencyChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border h-[350px]">
      <h3 className="text-sm font-bold text-olive mb-4">Department Efficiency Index</h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={departmentEfficiency}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="subject" tick={{fontSize: 11, fill: '#4B5D3A', fontWeight: 'bold'}} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip />
          <Radar name="Efficiency Score" dataKey="A" stroke="#C8B68A" fill="#C8B68A" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}`,
  'src/features/analytics/components/charts/MaintenanceTrendsChart.jsx': `import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { maintenanceTrends } from '../../data/mockAnalyticsData';

export default function MaintenanceTrendsChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-border h-[350px]">
      <h3 className="text-sm font-bold text-olive mb-4">Monthly Maintenance Trends</h3>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={maintenanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
    </div>
  );
}`,
  'src/features/analytics/components/charts/VehicleReadinessChart.jsx': `import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
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
              <Cell key={\`cell-\${index}\`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}`,
  'src/features/analytics/components/TechnicianLeaderboard.jsx': `import { technicianLeaderboard } from '../data/mockAnalyticsData';
import { Trophy } from 'lucide-react';

export default function TechnicianLeaderboard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden h-[350px] flex flex-col">
      <div className="p-4 border-b border-border bg-gray-50 flex items-center gap-2">
        <Trophy size={18} className="text-khaki font-bold" />
        <h3 className="font-bold text-olive">Technician Leaderboard</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white text-gray-500 font-semibold sticky top-0">
            <tr>
              <th className="p-3 border-b border-border text-center">Rank</th>
              <th className="p-3 border-b border-border">Name</th>
              <th className="p-3 border-b border-border">Jobs</th>
              <th className="p-3 border-b border-border text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {technicianLeaderboard.map((tech, idx) => (
              <tr key={tech.id} className="hover:bg-gray-50">
                <td className="p-3 text-center font-bold text-olive">#{idx + 1}</td>
                <td className="p-3 font-semibold text-gray-700">{tech.name}<div className="text-[10px] text-gray-500 font-normal">{tech.dept}</div></td>
                <td className="p-3 text-gray-600">{tech.jobs}</td>
                <td className="p-3 text-right">
                  <span className="bg-green-100 text-success px-2 py-0.5 rounded font-bold text-xs">{tech.eff}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  'src/features/analytics/components/ExportToolbar.jsx': `import { FileText, FileSpreadsheet, Download, Printer } from 'lucide-react';

export default function ExportToolbar() {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-danger hover:bg-red-50 flex items-center gap-2 shadow-sm transition-colors">
        <FileText size={16} /> PDF
      </button>
      <button className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-success hover:bg-green-50 flex items-center gap-2 shadow-sm transition-colors">
        <FileSpreadsheet size={16} /> Excel
      </button>
      <button className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-2 shadow-sm transition-colors">
        <Download size={16} /> CSV
      </button>
      <button className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-gray-600 hover:bg-gray-100 flex items-center gap-2 shadow-sm transition-colors">
        <Printer size={16} /> Print
      </button>
    </div>
  );
}`,
  'src/features/analytics/pages/ExecutiveDashboard.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import ExecutiveKPIs from '../components/ExecutiveKPIs';
import UtilizationChart from '../components/charts/UtilizationChart';
import DepartmentEfficiencyChart from '../components/charts/DepartmentEfficiencyChart';
import MaintenanceTrendsChart from '../components/charts/MaintenanceTrendsChart';
import VehicleReadinessChart from '../components/charts/VehicleReadinessChart';
import TechnicianLeaderboard from '../components/TechnicianLeaderboard';
import ExportToolbar from '../components/ExportToolbar';

export default function ExecutiveDashboard() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Executive Command Center</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time holistic visibility into workshop performance and readiness.</p>
          </div>
          <ExportToolbar />
        </div>

        <ExecutiveKPIs />

        {/* Top Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <UtilizationChart />
          <VehicleReadinessChart />
        </div>

        {/* Bottom Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MaintenanceTrendsChart />
          <DepartmentEfficiencyChart />
          <TechnicianLeaderboard />
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/analytics/pages/ReportsCenterPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import ExportToolbar from '../components/ExportToolbar';
import { Search, Filter } from 'lucide-react';

const reportsList = [
  { title: 'Daily Workshop Output', desc: 'Summary of jobs completed today across all bays.', date: 'Today, 08:00 AM' },
  { title: 'Weekly Maintenance Summary', desc: 'Preventive vs Corrective maintenance ratios.', date: 'Last Week' },
  { title: 'Monthly Inventory Valuation', desc: 'Current value of warehouse stock and low alerts.', date: '01 Jul 2026' },
  { title: 'Quarterly Vendor Performance', desc: 'L1 selections, delivery delays, and QA rejections.', date: 'Q2 2026' },
  { title: 'Annual Vehicle Readiness Report', desc: 'Complete breakdown of fleet operational status.', date: '2025-2026' },
];

export default function ReportsCenterPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Reports Center</h1>
            <p className="text-sm text-gray-500 mt-1">Generate, filter, and export comprehensive enterprise reports.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-border flex flex-wrap gap-4 items-center mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search reports..." className="w-full pl-9 pr-4 py-2 border border-border rounded text-sm focus:border-primary focus:outline-none" />
          </div>
          <select className="border border-border rounded px-4 py-2 text-sm bg-gray-50 font-semibold text-gray-700">
            <option>All Departments</option>
            <option>Vehicle Repair</option>
            <option>Inventory</option>
            <option>Procurement</option>
          </select>
          <select className="border border-border rounded px-4 py-2 text-sm bg-gray-50 font-semibold text-gray-700">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 border border-border rounded text-sm font-bold text-olive flex items-center gap-2 hover:bg-gray-200">
            <Filter size={16} /> More Filters
          </button>
        </div>

        {/* Reports List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportsList.map((report, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col hover:border-khaki transition-colors">
              <h3 className="font-bold text-olive mb-1 text-lg">{report.title}</h3>
              <p className="text-xs font-bold text-gray-400 mb-4">{report.date}</p>
              <p className="text-sm text-gray-600 mb-6 flex-1">{report.desc}</p>
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Preview</span>
                <ExportToolbar />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/analytics/pages/DepartmentAnalyticsPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
export default function DepartmentAnalyticsPage() { return <PageTransition><div className="p-8 text-center text-gray-500 font-bold">Department Analytics Details</div></PageTransition>; }`,
  'src/features/analytics/pages/TechnicianPerformancePage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
export default function TechnicianPerformancePage() { return <PageTransition><div className="p-8 text-center text-gray-500 font-bold">Technician Performance Details</div></PageTransition>; }`,
  'src/features/analytics/pages/VehicleReadinessPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
export default function VehicleReadinessPage() { return <PageTransition><div className="p-8 text-center text-gray-500 font-bold">Vehicle Readiness Details</div></PageTransition>; }`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}

console.log('Analytics module components created successfully.');
