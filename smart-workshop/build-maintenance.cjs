const fs = require('fs');
const path = require('path');

const dirs = [
  'src/features/maintenance/data',
  'src/features/maintenance/components',
  'src/features/maintenance/pages'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const files = {
  'src/features/maintenance/data/mockMaintenanceData.js': `export const maintenanceKPIs = [
  { label: "Today's Jobs", value: 24, type: 'info' },
  { label: 'Pending', value: 8, type: 'warning' },
  { label: 'In Progress', value: 12, type: 'primary' },
  { label: 'Testing / QA', value: 4, type: 'purple' },
  { label: 'Completed', value: 45, type: 'success' },
  { label: 'Delayed', value: 2, type: 'danger' },
  { label: 'Avg Repair Time', value: '4.2 Hrs', type: 'info' },
  { label: 'Vehicle Uptime', value: '92%', type: 'success' }
];

export const allJobs = [
  { id: 'JOB-902', asset: 'TATRA-ERG-102', vehicle: 'TATRA VVN 8x8', priority: 'High', status: 'In Progress', dept: 'Vehicle Repair', tech: 'Rahul Sharma', created: '20 Jul 2026', due: '21 Jul 2026' },
  { id: 'JOB-903', asset: 'JCB-45', vehicle: 'JCB Backhoe', priority: 'Medium', status: 'Pending', dept: 'Machine Shop', tech: 'Unassigned', created: '20 Jul 2026', due: '22 Jul 2026' },
  { id: 'JOB-904', asset: 'PNK-09', vehicle: 'Pinaka System', priority: 'Critical', status: 'QA', dept: 'Testing', tech: 'Amit Patel', created: '19 Jul 2026', due: '20 Jul 2026' },
  { id: 'JOB-905', asset: 'GEN-500K', vehicle: '500KVA Generator', priority: 'Low', status: 'Completed', dept: 'Electrical', tech: 'Deepak Kumar', created: '18 Jul 2026', due: '19 Jul 2026' },
  { id: 'JOB-906', asset: 'DZR-88', vehicle: 'BEML Dozer', priority: 'High', status: 'Waiting Parts', dept: 'Fabrication', tech: 'Suresh N.', created: '19 Jul 2026', due: '24 Jul 2026' },
];

export const jobTimeline = [
  { id: 1, event: 'Ticket Created', date: '20 Jul 2026', time: '08:00 AM', user: 'Admin User', remarks: 'Engine misfire reported.' },
  { id: 2, event: 'Technician Assigned', date: '20 Jul 2026', time: '08:15 AM', user: 'Admin User', remarks: 'Assigned to Rahul Sharma.' },
  { id: 3, event: 'Inspection Started', date: '20 Jul 2026', time: '08:30 AM', user: 'Rahul Sharma', remarks: 'Initial diagnostic scan.' },
  { id: 4, event: 'Parts Issued', date: '20 Jul 2026', time: '09:15 AM', user: 'Storekeeper', remarks: 'Oil Filter x2, Hydraulic Hose.' },
  { id: 5, event: 'Repair Started', date: '20 Jul 2026', time: '09:30 AM', user: 'Rahul Sharma', remarks: 'Replacing worn parts.' },
];

export const mockPartsUsed = [
  { id: 'INV-1024', name: 'TATRA Oil Filter', qty: 2, issuedBy: 'Storekeeper', date: '20 Jul 2026' },
  { id: 'INV-1088', name: 'Hydraulic Hose 5m', qty: 1, issuedBy: 'Storekeeper', date: '20 Jul 2026' },
];
`,
  'src/features/maintenance/components/MaintenanceKPIs.jsx': `import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { maintenanceKPIs } from '../data/mockMaintenanceData';

const Counter = ({ value }) => {
  const isString = typeof value === 'string';
  const numValue = isString ? parseFloat(value) : value;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => isString && value.includes('.') ? v.toFixed(1) : Math.round(v));

  useEffect(() => {
    const animation = animate(count, numValue, { duration: 1.5, ease: "easeOut" });
    return animation.stop;
  }, [numValue]);

  return <motion.span>{rounded}</motion.span>;
};

export default function MaintenanceKPIs() {
  const getColors = (type) => {
    switch(type) {
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'primary': return 'text-olive bg-khaki-light/50 border-khaki-light';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'success': return 'text-success bg-green-50 border-green-100';
      case 'danger': return 'text-danger bg-red-50 border-red-100';
      default: return 'text-gray-800 bg-gray-50 border-border';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {maintenanceKPIs.map((kpi, idx) => {
        const colors = getColors(kpi.type);
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={\`p-4 rounded-lg shadow-sm border \${colors}\`}
          >
            <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">{kpi.label}</div>
            <div className="text-2xl font-bold">
              <Counter value={kpi.value} />
              {typeof kpi.value === 'string' && kpi.value.includes('%') && '%'}
              {typeof kpi.value === 'string' && kpi.value.includes('Hrs') && ' Hrs'}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}`,
  'src/features/maintenance/components/LiveWorkflowAnimation.jsx': `import { motion } from 'framer-motion';
import { Truck, QrCode, ClipboardCheck, FileText, Wrench, PackageSearch, Activity, CheckCircle2, Factory } from 'lucide-react';

const stages = [
  { icon: Truck, label: 'Arrival' },
  { icon: QrCode, label: 'Asset Scan' },
  { icon: ClipboardCheck, label: 'Inspection' },
  { icon: FileText, label: 'Ticket' },
  { icon: Wrench, label: 'Repair' },
  { icon: PackageSearch, label: 'Parts' },
  { icon: Activity, label: 'Testing' },
  { icon: CheckCircle2, label: 'QA/QC' },
  { icon: Factory, label: 'Completed' }
];

export default function LiveWorkflowAnimation() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border overflow-hidden">
      <h3 className="text-lg font-bold text-olive mb-8">Live Workflow Architecture</h3>
      
      <div className="relative flex justify-between items-center px-4 max-w-5xl mx-auto min-h-[120px]">
        {/* Background Track */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-100 -translate-y-1/2"></div>
        
        {/* Animated Connector Line */}
        <motion.div 
          className="absolute top-1/2 left-8 h-1 bg-primary -translate-y-1/2 shadow-[0_0_8px_rgba(75,93,58,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />

        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div 
              key={idx}
              className="relative z-10 flex flex-col items-center bg-white p-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 border-2 border-primary flex items-center justify-center text-olive shadow-sm">
                <Icon size={20} />
              </div>
              <div className="mt-2 text-[10px] font-bold text-gray-600 uppercase tracking-wide text-center w-20">
                {stage.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}`,
  'src/features/maintenance/components/MaintenanceForm.jsx': `import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MaintenanceForm() {
  const navigate = useNavigate();

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => { e.preventDefault(); navigate('/admin/maintenance/board'); }}
      className="bg-white rounded-lg shadow-sm border border-border overflow-hidden max-w-4xl"
    >
      <div className="p-6 border-b border-border bg-gray-50">
        <h2 className="text-xl font-bold text-olive">Create Maintenance Ticket</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Asset Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Ticket Number</label>
              <input type="text" disabled value="JOB-907" className="w-full border border-border rounded p-2 text-sm bg-gray-100" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Priority *</label>
              <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
                <option>Normal</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Scan or Select Asset *</label>
            <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option>TATRA-ERG-102 (TATRA VVN 8x8)</option>
              <option>JCB-45 (JCB Backhoe)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Issue Description *</label>
            <textarea required rows="3" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary"></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Assignment</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Department *</label>
            <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option>Vehicle Repair Group</option>
              <option>Machine Shop</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Assign Technician (Optional)</label>
            <select className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary">
              <option value="">-- Leave Unassigned --</option>
              <option>Rahul Sharma (Available: 2 Jobs)</option>
              <option>Vikram Singh (Busy: 5 Jobs)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Estimated Completion</label>
            <input type="date" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary" />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/maintenance')} className="px-6 py-2 border border-border rounded text-gray-600 font-bold text-sm">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-primary text-white rounded font-bold text-sm shadow flex items-center gap-2"><Save size={16}/> Create Ticket</button>
      </div>
    </motion.form>
  );
}`,
  'src/features/maintenance/components/KanbanBoard.jsx': `import { motion } from 'framer-motion';
import { allJobs } from '../data/mockMaintenanceData';
import { useNavigate } from 'react-router-dom';

const columns = ['Pending', 'In Progress', 'Waiting Parts', 'QA', 'Completed'];

export default function KanbanBoard() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[600px]">
      {columns.map(col => {
        const jobs = allJobs.filter(j => j.status === col);
        return (
          <div key={col} className="w-80 shrink-0 flex flex-col bg-gray-50 rounded-lg border border-border overflow-hidden">
            <div className="p-3 border-b border-border bg-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-olive text-sm">{col}</h3>
              <span className="bg-white text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-border">{jobs.length}</span>
            </div>
            
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {jobs.map((job, idx) => (
                <motion.div
                  layoutId={job.id}
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(\`/admin/maintenance/\${job.id}\`)}
                  className="bg-white p-3 rounded shadow-sm border border-border cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-800">{job.id}</span>
                    <span className={\`text-[10px] px-2 py-0.5 rounded font-bold \${
                      job.priority === 'Critical' ? 'bg-red-100 text-danger' :
                      job.priority === 'High' ? 'bg-orange-100 text-warning' :
                      'bg-blue-100 text-info'
                    }\`}>{job.priority}</span>
                  </div>
                  <div className="text-sm font-semibold text-olive mb-1">{job.vehicle}</div>
                  <div className="text-xs text-gray-500 mb-3">{job.asset}</div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <div className="text-xs font-semibold text-gray-600 truncate w-32">{job.tech}</div>
                    <div className="text-[10px] font-bold text-gray-400">Due: {job.due}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}`,
  'src/features/maintenance/components/MaintenanceTimeline.jsx': `import { motion } from 'framer-motion';
import { jobTimeline } from '../data/mockMaintenanceData';
import { CheckCircle2, User, Wrench, Package, ClipboardList } from 'lucide-react';

export default function MaintenanceTimeline() {
  const getIcon = (event) => {
    if (event.includes('Ticket')) return <ClipboardList size={16} />;
    if (event.includes('Assigned')) return <User size={16} />;
    if (event.includes('Parts')) return <Package size={16} />;
    if (event.includes('Repair')) return <Wrench size={16} />;
    return <CheckCircle2 size={16} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-6">Execution Timeline</h3>
      
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {jobTimeline.map((history, idx) => (
          <motion.div 
            key={history.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-start gap-4 pb-6"
          >
            <div className="relative z-10 w-6 h-6 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
              {getIcon(history.event)}
            </div>
            <div className="flex-1 bg-gray-50 border border-border rounded p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-olive text-sm">{history.event}</span>
                <span className="text-xs text-gray-500">{history.date} • {history.time}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{history.remarks}</p>
              <div className="text-[10px] font-bold text-gray-400 uppercase">By: {history.user}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/maintenance/components/QAQCModule.jsx': `import { useState } from 'react';
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
            className={\`flex items-center gap-3 p-3 border rounded cursor-pointer transition-colors \${check.passed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-border hover:bg-gray-100'}\`}
          >
            {check.passed ? <CheckSquare size={18} className="text-success" /> : <Square size={18} className="text-gray-400" />}
            <span className={\`text-sm font-semibold \${check.passed ? 'text-success' : 'text-gray-600'}\`}>{check.label}</span>
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
}`,
  'src/features/maintenance/components/PartsConsumptionList.jsx': `import { mockPartsUsed } from '../data/mockMaintenanceData';
import { Package } from 'lucide-react';

export default function PartsConsumptionList() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Package size={18} /> Parts Consumed
      </h3>
      <div className="space-y-2">
        {mockPartsUsed.map(part => (
          <div key={part.id} className="flex justify-between items-center p-3 border border-border rounded bg-gray-50">
            <div>
              <div className="font-bold text-gray-800 text-sm">{part.name}</div>
              <div className="text-xs text-gray-500 font-mono">{part.id}</div>
            </div>
            <div className="bg-white px-3 py-1 rounded border border-border font-bold text-olive text-sm shadow-sm">
              {part.qty}x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/maintenance/components/CompletedJobsTable.jsx': `import { allJobs } from '../data/mockMaintenanceData';
import { Search, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CompletedJobsTable() {
  const navigate = useNavigate();
  const completed = allJobs.filter(j => j.status === 'Completed');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50">
        <div className="relative w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search history..." className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm" />
        </div>
        <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
          <Download size={16} /> Export PDF
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4">Job ID</th>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Technician</th>
              <th className="p-4">Completed Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {completed.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-4 font-bold text-olive">{job.id}</td>
                <td className="p-4 font-semibold text-gray-800">{job.vehicle}</td>
                <td className="p-4 text-gray-600">{job.tech}</td>
                <td className="p-4 text-gray-500">{job.due}</td>
                <td className="p-4 text-center">
                  <button onClick={() => navigate(\`/admin/maintenance/\${job.id}\`)} className="p-1.5 text-info hover:bg-blue-50 rounded">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  'src/features/maintenance/components/MaintenanceCalendarWidget.jsx': `export default function MaintenanceCalendarWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-[400px] flex items-center justify-center flex-col text-gray-400">
      <div className="text-4xl mb-4">📅</div>
      <h3 className="text-lg font-bold text-gray-500">Calendar Module</h3>
      <p className="text-sm">Scheduler UI will integrate with API here.</p>
    </div>
  );
}`,
  'src/features/maintenance/pages/MaintenanceDashboard.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceKPIs from '../components/MaintenanceKPIs';
import LiveWorkflowAnimation from '../components/LiveWorkflowAnimation';
import CompletedJobsTable from '../components/CompletedJobsTable';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MaintenanceDashboard() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Maintenance Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Live overview of workshop repair operations.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/admin/maintenance/board')} className="px-4 py-2 bg-white border border-border text-olive rounded font-bold shadow-sm hover:bg-gray-50 flex items-center gap-2">
              Kanban Board <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate('/admin/maintenance/new')} className="px-4 py-2 bg-primary text-white rounded font-bold shadow hover:bg-olive">
              Create Ticket
            </button>
          </div>
        </div>

        <MaintenanceKPIs />

        <div className="mb-6">
          <LiveWorkflowAnimation />
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold text-olive mb-4">Recently Completed Jobs</h2>
          <CompletedJobsTable />
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/maintenance/pages/WorkflowBoardPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import KanbanBoard from '../components/KanbanBoard';

export default function WorkflowBoardPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 mx-auto bg-[#F8F8F8] min-h-screen overflow-hidden">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-olive">Live Workflow Board</h1>
          <p className="text-sm text-gray-500 mt-1">Drag and drop tickets to update repair stages.</p>
        </div>
        <KanbanBoard />
      </div>
    </PageTransition>
  );
}`,
  'src/features/maintenance/pages/CreateTicket.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceForm from '../components/MaintenanceForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateTicket() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <button 
          onClick={() => navigate('/admin/maintenance')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <MaintenanceForm />
      </div>
    </PageTransition>
  );
}`,
  'src/features/maintenance/pages/JobDetails.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceTimeline from '../components/MaintenanceTimeline';
import QAQCModule from '../components/QAQCModule';
import PartsConsumptionList from '../components/PartsConsumptionList';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JobDetails() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <button className="flex items-center gap-2 bg-white border border-border text-olive px-4 py-2 rounded font-bold shadow-sm text-sm hover:bg-gray-50">
            <Edit size={16} /> Edit Ticket
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-olive">JOB-902</h1>
              <p className="text-sm font-bold text-gray-500">TATRA VVN 8x8 (TATRA-ERG-102)</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-red-100 text-danger px-3 py-1.5 rounded text-xs font-bold">High Priority</span>
              <span className="bg-blue-100 text-info px-3 py-1.5 rounded text-xs font-bold border border-blue-200">In Progress</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Assigned Tech</div><div className="font-bold text-gray-800">Rahul Sharma</div></div>
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Department</div><div className="font-bold text-gray-800">Vehicle Repair Group</div></div>
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Reported Date</div><div className="font-bold text-gray-800">20 Jul 2026</div></div>
            <div><div className="text-gray-400 text-xs font-bold uppercase mb-1">Est. Completion</div><div className="font-bold text-danger">21 Jul 2026</div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <MaintenanceTimeline />
            <QAQCModule />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <PartsConsumptionList />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/maintenance/pages/CompletedJobsPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import CompletedJobsTable from '../components/CompletedJobsTable';

export default function CompletedJobsPage() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <h1 className="text-2xl font-bold text-olive mb-6">Completed Maintenance Jobs</h1>
        <CompletedJobsTable />
      </div>
    </PageTransition>
  );
}`,
  'src/features/maintenance/pages/MaintenanceCalendar.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceCalendarWidget from '../components/MaintenanceCalendarWidget';

export default function MaintenanceCalendar() {
  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <h1 className="text-2xl font-bold text-olive mb-6">Workshop Scheduling</h1>
        <MaintenanceCalendarWidget />
      </div>
    </PageTransition>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}

console.log('Maintenance module components created successfully.');
