const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'src/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const compDir = path.join(process.cwd(), 'src/features/admin/components');
if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

const files = {
  'src/data/mockData.js': `export const vehicles = [
  { id: 'ERG-102', type: 'TATRA', dept: 'VRG', tech: 'Rahul Sharma', status: 'In Progress', priority: 'High', expected: 'Today, 14:00' },
  { id: 'JCB-45', type: 'JCB', dept: 'Machine Shop', tech: 'Vikram Singh', status: 'Pending', priority: 'Medium', expected: 'Tomorrow, 10:00' },
  { id: 'PNK-09', type: 'Pinaka', dept: 'Testing', tech: 'Amit Patel', status: 'QA', priority: 'Critical', expected: 'Today, 16:30' },
  { id: 'AKS-22', type: 'Akash System', dept: 'Electrical', tech: 'Deepak Kumar', status: 'Completed', priority: 'Low', expected: '-' },
  { id: 'DZR-88', type: 'Dozer', dept: 'Fabrication', tech: 'Suresh N.', status: 'In Progress', priority: 'High', expected: '24 Jul, 09:00' }
];

export const departments = [
  { name: 'Vehicle Repair Group', jobs: 24, staff: 45, machines: 12, status: 'Green' },
  { name: 'Machine Shop', jobs: 18, staff: 30, machines: 20, status: 'Yellow' },
  { name: 'Electrical', jobs: 15, staff: 25, machines: 8, status: 'Green' },
  { name: 'Fabrication', jobs: 8, staff: 20, machines: 15, status: 'Green' },
  { name: 'QA & QC', jobs: 12, staff: 15, machines: 5, status: 'Red' },
];

export const chartData = [
  { name: 'Mon', capacity: 65, maintenance: 45 },
  { name: 'Tue', capacity: 70, maintenance: 50 },
  { name: 'Wed', capacity: 85, maintenance: 40 },
  { name: 'Thu', capacity: 90, maintenance: 60 },
  { name: 'Fri', capacity: 75, maintenance: 55 },
  { name: 'Sat', capacity: 60, maintenance: 35 },
  { name: 'Sun', capacity: 40, maintenance: 20 },
];

export const pieData = [
  { name: 'Engines', value: 400 },
  { name: 'Electrical', value: 300 },
  { name: 'Hydraulics', value: 300 },
  { name: 'Armor', value: 200 },
];

export const activities = [
  { id: 1, text: 'Technician Rahul assigned to Vehicle ERG-102', time: '10 mins ago', type: 'assignment' },
  { id: 2, text: 'Inventory updated: 50x Tatra filters received', time: '1 hour ago', type: 'inventory' },
  { id: 3, text: 'Maintenance completed for JCB-45', time: '2 hours ago', type: 'maintenance' },
  { id: 4, text: 'New Asset Registered: Skid Loader (SKD-01)', time: '3 hours ago', type: 'asset' },
];

export const notifications = [
  { id: 1, text: 'Low Inventory: Hydraulic Fluid (10L remaining)', type: 'danger' },
  { id: 2, text: 'Delayed Repair: Pinaka Launcher PNK-12', type: 'warning' },
  { id: 3, text: 'Upcoming Maintenance: 15 Vehicles tomorrow', type: 'info' },
];
`,
  'src/features/admin/components/DashboardHeader.jsx': `import { format } from 'date-fns';
import { Sun } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { motion } from 'framer-motion';

export default function DashboardHeader() {
  const { user } = useAuth();
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-border mb-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-olive">Command Center</h1>
        <p className="text-gray-500">Welcome back, {user?.name || 'Administrator'}!</p>
      </div>
      <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm font-medium text-gray-600">
        <div className="flex items-center gap-2 bg-gray-light px-4 py-2 rounded-full border border-border">
          <Sun size={18} className="text-warning" />
          <span>28°C Meerut, Clear</span>
        </div>
        <div className="hidden sm:block">
          {format(new Date(), 'EEEE, dd MMM yyyy')}
        </div>
      </div>
    </motion.div>
  );
}`,
  'src/features/admin/components/LiveKPIs.jsx': `import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { ShieldCheck, Truck, Wrench, Users, AlertCircle, TrendingUp, CheckCircle, Package } from 'lucide-react';

function Counter({ to }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

const kpis = [
  { label: 'Total Assets', value: 12450, icon: ShieldCheck, color: 'text-primary' },
  { label: 'Vehicles in Workshop', value: 342, icon: Truck, color: 'text-info' },
  { label: 'Technicians Available', value: 185, icon: Users, color: 'text-olive' },
  { label: 'Maintenance Pending', value: 45, icon: Wrench, color: 'text-warning' },
  { label: 'Completed Today', value: 28, icon: CheckCircle, color: 'text-success' },
  { label: 'Low Stock Alerts', value: 12, icon: AlertCircle, color: 'text-danger' },
  { label: 'Dept Utilization', value: 85, suffix: '%', icon: TrendingUp, color: 'text-primary' },
  { label: 'Inventory Value (Cr)', value: 45, icon: Package, color: 'text-olive' },
];

export default function LiveKPIs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-4 rounded-lg shadow-sm border border-border flex items-center gap-4"
        >
          <div className={\`w-12 h-12 rounded-full bg-gray-light flex items-center justify-center \${kpi.color}\`}>
            <kpi.icon size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-olive">
              <Counter to={kpi.value} />{kpi.suffix || ''}
            </div>
            <div className="text-xs text-gray-500 font-medium">{kpi.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}`,
  'src/features/admin/components/QuickActions.jsx': `import { motion } from 'framer-motion';
import { PlusCircle, UserPlus, Calendar, QrCode, PackagePlus, FileText } from 'lucide-react';

const actions = [
  { label: 'Register Asset', icon: PlusCircle },
  { label: 'Assign Tech', icon: UserPlus },
  { label: 'Schedule', icon: Calendar },
  { label: 'Generate QR', icon: QrCode },
  { label: 'Add Inventory', icon: PackagePlus },
  { label: 'Create Report', icon: FileText },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
      {actions.map((action, idx) => (
        <motion.button
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -4, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          className="bg-white p-4 rounded-lg shadow-sm border border-border flex flex-col items-center justify-center gap-2 group hover:border-primary transition-all"
        >
          <div className="text-gray-400 group-hover:text-primary transition-colors">
            <action.icon size={28} />
          </div>
          <span className="text-xs font-semibold text-olive text-center">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}`,
  'src/features/admin/components/WorkshopStatus.jsx': `import { motion } from 'framer-motion';
import { departments } from '../../../data/mockData';

export default function WorkshopStatus() {
  const getColor = (status) => {
    if (status === 'Green') return 'bg-success';
    if (status === 'Yellow') return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4">Workshop Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments.map((dept, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded border border-border bg-gray-light flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold text-sm text-olive">{dept.name}</h4>
              <div className="text-xs text-gray-500 mt-1 flex gap-3">
                <span>Jobs: {dept.jobs}</span>
                <span>Staff: {dept.staff}</span>
              </div>
            </div>
            <div className={\`w-3 h-3 rounded-full \${getColor(dept.status)} shadow\`}></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/admin/components/NotificationsWidget.jsx': `import { motion } from 'framer-motion';
import { notifications } from '../../../data/mockData';
import { Bell, AlertTriangle, Info } from 'lucide-react';

export default function NotificationsWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Bell size={18} /> Alerts
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={\`p-3 rounded border text-sm flex gap-3 \${
              notif.type === 'danger' ? 'bg-red-50 border-red-100 text-danger' :
              notif.type === 'warning' ? 'bg-orange-50 border-orange-100 text-warning' :
              'bg-blue-50 border-blue-100 text-info'
            }\`}
          >
            {notif.type === 'danger' ? <AlertTriangle size={18} className="shrink-0" /> : <Info size={18} className="shrink-0" />}
            <span>{notif.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/admin/components/LiveVehicleStatus.jsx': `import { motion } from 'framer-motion';
import { vehicles } from '../../../data/mockData';

export default function LiveVehicleStatus() {
  const getBadgeClass = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-success';
    if (status === 'In Progress') return 'bg-blue-100 text-info';
    if (status === 'QA') return 'bg-purple-100 text-purple-700';
    return 'bg-orange-100 text-warning';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-sm border border-border overflow-hidden mb-6"
    >
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-bold text-olive">Live Vehicle Status</h3>
        <button className="text-sm text-primary font-medium hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-light text-gray-600 font-semibold">
            <tr>
              <th className="px-6 py-3">Vehicle No</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Technician</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Expected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vehicles.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-semibold text-olive">{v.id}</td>
                <td className="px-6 py-3 text-gray-600">{v.type}</td>
                <td className="px-6 py-3 text-gray-600">{v.dept}</td>
                <td className="px-6 py-3 text-gray-600">{v.tech}</td>
                <td className="px-6 py-3">
                  <span className={\`px-2.5 py-1 rounded-full text-xs font-bold \${getBadgeClass(v.status)}\`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={\`text-xs font-bold \${v.priority === 'Critical' ? 'text-danger' : v.priority === 'High' ? 'text-warning' : 'text-gray-500'}\`}>
                    {v.priority}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">{v.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}`,
  'src/features/admin/components/AnalyticsPreview.jsx': `import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { chartData, pieData } from '../../../data/mockData';

const COLORS = ['#4B5D3A', '#C8B68A', '#36452F', '#E69A00'];

export default function AnalyticsPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-sm border border-border h-full"
    >
      <h3 className="text-lg font-bold text-olive mb-6">Analytics Preview</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-64">
          <h4 className="text-sm font-semibold text-gray-500 mb-4 text-center">Workshop Capacity Trend</h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E4E7" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="capacity" stroke="#4B5D3A" fill="#4B5D3A" fillOpacity={0.2} />
              <Area type="monotone" dataKey="maintenance" stroke="#C8B68A" fill="#C8B68A" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64">
          <h4 className="text-sm font-semibold text-gray-500 mb-4 text-center">Inventory Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}`,
  'src/features/admin/components/WorkflowTracking.jsx': `import { motion } from 'framer-motion';

const stages = ["Received", "Inspection", "Repair", "QA", "QC", "Testing", "Completed"];
const activeStage = 2; // Repair is active

export default function WorkflowTracking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6"
    >
      <h3 className="text-lg font-bold text-olive mb-8">Live Workflow Tracking (Avg. Vehicle)</h3>
      
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: \`\${(activeStage / (stages.length - 1)) * 100}%\` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-primary"
          ></motion.div>
        </div>

        <div className="flex justify-between relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= activeStage;
            const isActive = idx === activeStage;
            
            return (
              <motion.div 
                key={idx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={\`w-6 h-6 md:w-8 md:h-8 rounded-full border-4 flex items-center justify-center bg-white \${isCompleted ? 'border-primary' : 'border-gray-300'}\`}>
                  {isCompleted && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  {isActive && <div className="absolute -top-2 -right-2 w-3 h-3 bg-warning rounded-full animate-ping"></div>}
                </div>
                <div className={\`mt-3 text-xs md:text-sm font-semibold \${isCompleted ? 'text-olive' : 'text-gray-400'}\`}>
                  {stage}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}`,
  'src/features/admin/components/InventorySummary.jsx': `import { motion } from 'framer-motion';

const inventory = [
  { name: 'Tatra Engine Parts', pct: 85, color: 'bg-success' },
  { name: 'Hydraulic Fluid', pct: 15, color: 'bg-danger' },
  { name: 'Electrical Wiring', pct: 45, color: 'bg-warning' },
  { name: 'JCB Tracks', pct: 60, color: 'bg-info' },
];

export default function InventorySummary() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-olive">Inventory Summary</h3>
        <button className="text-xs text-primary font-bold">Manage</button>
      </div>
      
      <div className="space-y-4">
        {inventory.map((item, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
              <span>{item.name}</span>
              <span>{item.pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: \`\${item.pct}%\` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className={\`h-1.5 rounded-full \${item.color}\`}
              ></motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/admin/components/RecentActivities.jsx': `import { motion } from 'framer-motion';
import { activities } from '../../../data/mockData';
import { Clock } from 'lucide-react';

export default function RecentActivities() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-6 flex items-center gap-2">
        <Clock size={18} /> Activity Timeline
      </h3>
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
        {activities.map((act, idx) => (
          <motion.div 
            key={act.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-6"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white bg-khaki text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative"></div>
            <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-gray-light p-3 rounded border border-border">
              <p className="text-sm font-medium text-olive">{act.text}</p>
              <span className="text-xs text-gray-500 mt-1 block">{act.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/admin/components/MaintenanceOverview.jsx': `import { motion } from 'framer-motion';

export default function MaintenanceOverview() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col justify-center">
      <h3 className="text-lg font-bold text-olive mb-4">Maintenance Overview</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded border border-green-100 text-center">
          <div className="text-3xl font-bold text-success mb-1">12</div>
          <div className="text-xs font-semibold text-green-800 uppercase">Completed</div>
        </div>
        <div className="bg-orange-50 p-4 rounded border border-orange-100 text-center">
          <div className="text-3xl font-bold text-warning mb-1">5</div>
          <div className="text-xs font-semibold text-orange-800 uppercase">Pending</div>
        </div>
        <div className="bg-blue-50 p-4 rounded border border-blue-100 text-center">
          <div className="text-3xl font-bold text-info mb-1">8</div>
          <div className="text-xs font-semibold text-blue-800 uppercase">Scheduled</div>
        </div>
        <div className="bg-red-50 p-4 rounded border border-red-100 text-center">
          <div className="text-3xl font-bold text-danger mb-1">2</div>
          <div className="text-xs font-semibold text-red-800 uppercase">Delayed</div>
        </div>
      </div>
    </div>
  );
}`,
  'src/features/admin/components/ProcurementSummary.jsx': `import { motion } from 'framer-motion';
import { ShoppingCart, FileText, CheckCircle } from 'lucide-react';

export default function ProcurementSummary() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4">Procurement Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border border-border rounded bg-gray-light">
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} className="text-primary" />
            <span className="text-sm font-semibold text-olive">Pending Tenders</span>
          </div>
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">14</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded bg-gray-light">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-warning" />
            <span className="text-sm font-semibold text-olive">Purchase Orders</span>
          </div>
          <span className="bg-warning text-white text-xs px-2 py-1 rounded-full font-bold">8</span>
        </div>
        <div className="flex items-center justify-between p-3 border border-border rounded bg-gray-light">
          <div className="flex items-center gap-3">
            <CheckCircle size={18} className="text-success" />
            <span className="text-sm font-semibold text-olive">Material Arrived</span>
          </div>
          <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-bold">3</span>
        </div>
      </div>
    </div>
  );
}`,
  'src/features/admin/components/CalendarWidget.jsx': `import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <CalendarIcon size={18} /> Upcoming Schedule
      </h3>
      <div className="space-y-4">
        {[
          { date: '24 Jul', event: 'Mass Vehicle Inspection (VRG)' },
          { date: '25 Jul', event: 'Vendor Meeting - Spares' },
          { date: '28 Jul', event: 'Monthly Quality Audit' },
        ].map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="bg-khaki-light text-olive font-bold text-xs p-2 rounded text-center w-14 shrink-0">
              {item.date}
            </div>
            <div className="pt-1.5 text-sm font-medium text-gray-700">
              {item.event}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}
console.log('Widgets created successfully.');
