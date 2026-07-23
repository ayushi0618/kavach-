const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'src/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const compDir = path.join(process.cwd(), 'src/features/technician/components');
if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

const files = {
  'src/data/mockTechData.js': `export const techJobs = [
  { id: 'JOB-902', vehicle: 'ERG-102', type: 'TATRA', dept: 'Vehicle Repair Group', priority: 'High', assignedTime: '08:00 AM', expected: 'Today, 14:00', status: 'In Progress' },
  { id: 'JOB-905', vehicle: 'DZR-88', type: 'Dozer', dept: 'Fabrication', priority: 'Medium', assignedTime: '11:30 AM', expected: '24 Jul, 09:00', status: 'Pending' }
];

export const techVehicles = [
  { id: 'ERG-102', type: 'TATRA VVN 8x8', category: 'Heavy Overhaul', stage: 'Repair', progress: 45 },
  { id: 'DZR-88', type: 'BEML Dozer', category: 'Structural', stage: 'Inspection', progress: 10 }
];

export const techNotifications = [
  { id: 1, text: 'New Assignment: JOB-905', type: 'info' },
  { id: 2, text: 'Inventory Available: Tatra Oil Filter', type: 'success' },
  { id: 3, text: 'Deadline Warning: JOB-902 due at 14:00', type: 'warning' },
];

export const techHistory = [
  { id: 'REP-741', vehicle: 'JCB-12', date: '15 Jul 2026', issue: 'Hydraulic leak repair', status: 'Completed' },
  { id: 'REP-702', vehicle: 'PNK-04', date: '10 Jul 2026', issue: 'Electrical harness replacement', status: 'Completed' },
  { id: 'REP-650', vehicle: 'TATRA-55', date: '01 Jul 2026', issue: 'Engine overhaul phase 1', status: 'Completed' },
];

export const techSchedule = [
  { time: '08:00', title: 'Shift Start / Briefing', type: 'admin' },
  { time: '08:30', title: 'TATRA ERG-102 Repair', type: 'work' },
  { time: '13:00', title: 'Lunch Break', type: 'break' },
  { time: '14:00', title: 'QA Handover (ERG-102)', type: 'work' },
  { time: '14:30', title: 'Dozer DZR-88 Inspection', type: 'work' },
  { time: '17:00', title: 'Shift End', type: 'admin' }
];

export const mockAssetDetails = {
  assetId: 'TATRA-ERG-102',
  type: 'Heavy Transport Vehicle',
  lastInspection: '12 Jan 2026',
  upcomingMaintenance: '30 Aug 2026',
  assignedTech: 'Rahul Sharma (Current)',
  partsRequired: ['Oil Filter X2', 'Hydraulic Hose 5m', 'Brake Pads (Set)'],
  history: 'Engine rebuilt on Jan 2025. Minor suspension work on Oct 2025.'
};
`,
  'src/features/technician/components/TechWelcome.jsx': `import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function TechWelcome() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-olive">Good Morning, Rahul</h1>
        <div className="flex gap-4 mt-2 text-sm font-medium text-gray-500">
          <span>ID: TECH-402</span>
          <span>Dept: Vehicle Repair Group</span>
        </div>
      </div>
      <div className="flex gap-4 text-sm font-bold text-olive bg-gray-light p-3 rounded border border-border">
        <span>{format(new Date(), 'dd MMM yyyy')}</span>
        <span className="text-gray-400">|</span>
        <span>Shift: General (08:00 - 17:00)</span>
      </div>
    </motion.div>
  );
}`,
  'src/features/technician/components/TodayTasks.jsx': `import { motion } from 'framer-motion';
import { techJobs } from '../../../data/mockTechData';
import { PlayCircle } from 'lucide-react';

export default function TodayTasks() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h2 className="text-lg font-bold text-olive mb-4">Today's Assigned Jobs</h2>
      <div className="space-y-4">
        {techJobs.map((job, idx) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded border border-border bg-gray-light flex flex-col sm:flex-row justify-between sm:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-olive text-lg">{job.vehicle}</span>
                <span className={\`text-xs px-2 py-1 rounded-full font-bold \${job.priority === 'High' ? 'bg-red-100 text-danger' : 'bg-orange-100 text-warning'}\`}>
                  {job.priority} Priority
                </span>
              </div>
              <div className="text-sm text-gray-600 font-medium">{job.type} • {job.dept}</div>
              <div className="text-xs text-gray-500 mt-2">
                Assigned: {job.assignedTime} | Expected: {job.expected}
              </div>
            </div>
            
            <button className="w-full sm:w-auto bg-primary hover:bg-olive text-white px-6 py-2.5 rounded font-bold transition-colors flex items-center justify-center gap-2">
              <PlayCircle size={18} /> {job.status === 'In Progress' ? 'Resume Job' : 'Start Job'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/technician/components/MyVehicles.jsx': `import { motion } from 'framer-motion';
import { techVehicles } from '../../../data/mockTechData';
import { Truck } from 'lucide-react';

export default function MyVehicles() {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-olive mb-4">My Active Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {techVehicles.map((v, idx) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-border overflow-hidden"
          >
            <div className="h-32 bg-khaki-light flex items-center justify-center text-gray-400 border-b border-border">
              <Truck size={48} className="opacity-20" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-olive">{v.id}</h3>
              <p className="text-xs text-gray-500 font-medium mb-3">{v.type} • {v.category}</p>
              
              <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>Stage: {v.stage}</span>
                <span>{v.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: \`\${v.progress}%\` }}></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/technician/components/QRScannerWidget.jsx': `import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Keyboard, X, CheckCircle2 } from 'lucide-react';
import { mockAssetDetails } from '../../../data/mockTechData';

export default function QRScannerWidget() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const simulateScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult(mockAssetDetails);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h2 className="text-lg font-bold text-olive mb-4">QR Asset Scanner</h2>
      
      {!result ? (
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[250px]">
          {isScanning ? (
            <div className="w-48 h-48 border-2 border-primary rounded-lg relative overflow-hidden bg-gray-50">
              <motion.div 
                animate={{ y: [0, 192, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-full h-1 bg-primary absolute top-0 shadow-[0_0_8px_2px_rgba(75,93,58,0.6)]"
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary animate-pulse">
                Scanning...
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <Camera size={48} className="mb-2 opacity-50" />
              <span className="text-xs font-semibold">Camera Ready</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 w-full mt-6">
            <button onClick={simulateScan} disabled={isScanning} className="flex flex-col items-center justify-center p-2 rounded bg-gray-light hover:bg-gray-200 border border-border text-olive font-semibold text-xs disabled:opacity-50">
              <Camera size={18} className="mb-1" /> Open
            </button>
            <button disabled={isScanning} className="flex flex-col items-center justify-center p-2 rounded bg-gray-light hover:bg-gray-200 border border-border text-olive font-semibold text-xs disabled:opacity-50">
              <Upload size={18} className="mb-1" /> Upload
            </button>
            <button disabled={isScanning} className="flex flex-col items-center justify-center p-2 rounded bg-gray-light hover:bg-gray-200 border border-border text-olive font-semibold text-xs disabled:opacity-50">
              <Keyboard size={18} className="mb-1" /> Manual
            </button>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-success font-bold">
                <CheckCircle2 size={20} /> Scan Success
              </div>
              <button onClick={() => setResult(null)} className="text-gray-400 hover:text-danger"><X size={20} /></button>
            </div>
            
            <div className="bg-khaki-light/30 p-3 rounded border border-khaki-light mb-4">
              <h3 className="font-bold text-olive text-lg">{result.assetId}</h3>
              <p className="text-sm font-semibold text-gray-600">{result.type}</p>
            </div>

            <div className="space-y-2 text-sm flex-1 overflow-y-auto">
              <p><span className="font-semibold text-gray-500">Last Inspection:</span> {result.lastInspection}</p>
              <p><span className="font-semibold text-gray-500">Next Due:</span> {result.upcomingMaintenance}</p>
              <p><span className="font-semibold text-gray-500">Tech:</span> {result.assignedTech}</p>
              <div>
                <span className="font-semibold text-gray-500 block mb-1">Parts Required:</span>
                <ul className="list-disc pl-5 text-gray-700 text-xs font-medium">
                  {result.partsRequired.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
            <button className="w-full mt-4 bg-primary text-white py-2 rounded font-bold">Assign to Me</button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}`,
  'src/features/technician/components/WorkProgress.jsx': `import { motion } from 'framer-motion';

const stages = ["Received", "Inspection", "Repair", "Testing", "QA", "QC", "Completed"];

export default function WorkProgress({ activeStage = 2 }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border mb-6 overflow-x-auto">
      <h3 className="text-lg font-bold text-olive mb-8">Active Job Progress (ERG-102)</h3>
      
      <div className="relative min-w-[600px] mx-4 mb-4">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-200 -translate-y-1/2 rounded-full"></div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: \`\${(activeStage / (stages.length - 1)) * 100}%\` }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-0 h-1.5 bg-primary -translate-y-1/2 rounded-full"
        ></motion.div>

        <div className="flex justify-between relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= activeStage;
            const isActive = idx === activeStage;
            
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className={\`w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white \${isCompleted ? 'border-primary' : 'border-gray-300'}\`}>
                  {isCompleted && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                  {isActive && <div className="absolute -top-2 -right-2 w-3 h-3 bg-warning rounded-full animate-ping"></div>}
                </div>
                <div className={\`mt-3 text-xs font-bold \${isCompleted ? 'text-olive' : 'text-gray-400'}\`}>
                  {stage}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}`,
  'src/features/technician/components/MaintenanceUpdate.jsx': `import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const statuses = [
  "Inspection Completed",
  "Repair Started",
  "Repair Completed",
  "Testing Started",
  "Testing Completed",
  "QA Submitted",
  "Ready for Dispatch"
];

export default function MaintenanceUpdate() {
  const [activeIdx, setActiveIdx] = useState(1); // Repair Started

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4">Update Status</h3>
      <div className="space-y-2">
        {statuses.map((status, idx) => {
          const isCompleted = idx <= activeIdx;
          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveIdx(idx)}
              className={\`w-full flex items-center justify-between p-3 rounded border text-left transition-colors \${isCompleted ? 'bg-khaki-light/50 border-primary text-olive' : 'bg-gray-50 border-border text-gray-500 hover:bg-gray-100'}\`}
            >
              <span className="text-sm font-bold">{status}</span>
              {isCompleted ? <CheckCircle2 size={18} className="text-success" /> : <Circle size={18} />}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}`,
  'src/features/technician/components/PartsUsedForm.jsx': `import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function PartsUsedForm() {
  const [parts, setParts] = useState([{ name: 'Oil Filter X2', qty: 1 }]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-lg font-bold text-olive mb-4">Parts Used Record</h3>
      
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1">Part Name</label>
          <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-primary" placeholder="e.g. Hydraulic Hose" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Quantity</label>
            <input type="number" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-primary" placeholder="1" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Location / Bin</label>
            <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:outline-none focus:border-primary" placeholder="A1-42" />
          </div>
        </div>
        <button className="w-full bg-gray-light hover:bg-gray-200 text-olive border border-border font-bold py-2 rounded text-sm flex items-center justify-center gap-2 transition-colors">
          <Plus size={16} /> Add Part to Record
        </button>
      </div>

      <div className="flex-1 border-t border-border pt-4">
        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Added Parts</h4>
        <ul className="space-y-2">
          {parts.map((p, i) => (
            <li key={i} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded border border-gray-100">
              <span className="font-semibold text-olive">{p.name}</span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full font-bold">{p.qty}x</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`,
  'src/features/technician/components/ImageUploadWidget.jsx': `import { useState } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';

export default function ImageUploadWidget() {
  const [images, setImages] = useState({ before: null, during: null, after: null });

  const handleFile = (e, stage) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages(prev => ({ ...prev, [stage]: url }));
    }
  };

  const clearImage = (stage) => {
    setImages(prev => ({ ...prev, [stage]: null }));
  };

  const UploadBox = ({ label, stage }) => (
    <div className="flex-1 min-w-[120px]">
      <div className="text-xs font-bold text-gray-500 mb-2 text-center uppercase">{label}</div>
      {images[stage] ? (
        <div className="relative aspect-square rounded border border-border overflow-hidden bg-gray-100 group">
          <img src={images[stage]} alt={label} className="w-full h-full object-cover" />
          <button 
            onClick={() => clearImage(stage)}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 hover:border-primary transition-colors cursor-pointer">
          <ImagePlus size={24} className="mb-2" />
          <span className="text-[10px] font-bold text-center px-2">Tap to Upload</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, stage)} />
        </label>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Camera size={18} /> Repair Documentation
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <UploadBox label="Before" stage="before" />
        <UploadBox label="During" stage="during" />
        <UploadBox label="After" stage="after" />
      </div>
      <button className="w-full mt-4 bg-primary text-white py-2.5 rounded font-bold text-sm shadow hover:shadow-md transition-shadow">
        Submit Documentation
      </button>
    </div>
  );
}`,
  'src/features/technician/components/TodaySchedule.jsx': `import { techSchedule } from '../../../data/mockTechData';
import { Clock } from 'lucide-react';

export default function TodaySchedule() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Clock size={18} /> Today's Schedule
      </h3>
      <div className="space-y-4">
        {techSchedule.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <div className="w-14 text-right shrink-0 font-bold text-sm text-olive">
              {item.time}
            </div>
            <div className="relative w-2 h-2 rounded-full bg-gray-300 shrink-0">
              {idx !== techSchedule.length - 1 && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gray-200"></div>
              )}
            </div>
            <div className={\`text-sm font-semibold \${item.type === 'break' ? 'text-gray-400' : item.type === 'work' ? 'text-primary' : 'text-gray-600'}\`}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/technician/components/TechNotifications.jsx': `import { techNotifications } from '../../../data/mockTechData';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TechNotifications() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Bell size={18} /> Notifications
      </h3>
      <div className="space-y-3">
        {techNotifications.map((notif) => (
          <div
            key={notif.id}
            className={\`p-3 rounded border text-sm flex gap-3 \${
              notif.type === 'warning' ? 'bg-orange-50 border-orange-100 text-warning' :
              notif.type === 'success' ? 'bg-green-50 border-green-100 text-success' :
              'bg-blue-50 border-blue-100 text-info'
            }\`}
          >
            {notif.type === 'warning' ? <AlertTriangle size={18} className="shrink-0" /> : 
             notif.type === 'success' ? <CheckCircle size={18} className="shrink-0" /> : 
             <Info size={18} className="shrink-0" />}
            <span className="font-medium">{notif.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/technician/components/MaintenanceHistory.jsx': `import { techHistory } from '../../../data/mockTechData';
import { Search, Filter } from 'lucide-react';

export default function MaintenanceHistory() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden mb-6">
      <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-olive">My Maintenance History</h3>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search vehicle..." className="pl-9 pr-4 py-2 bg-gray-50 border border-border rounded text-sm focus:outline-none focus:border-primary w-full sm:w-48" />
          </div>
          <button className="p-2 border border-border rounded bg-gray-50 text-gray-600 hover:bg-gray-100">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-light text-gray-600 font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">Job ID</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Issue Repaired</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {techHistory.map((h) => (
              <tr key={h.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-olive">{h.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-700">{h.vehicle}</td>
                <td className="px-6 py-4 text-gray-500">{h.date}</td>
                <td className="px-6 py-4 text-gray-600">{h.issue}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-success px-2.5 py-1 rounded-full text-xs font-bold">
                    {h.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  'src/features/technician/components/TechProfileWidget.jsx': `export default function TechProfileWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
      <div className="w-24 h-24 rounded-full bg-khaki text-white text-3xl font-bold flex items-center justify-center border-4 border-white shadow-lg shrink-0">
        RS
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-olive">Rahul Sharma</h3>
        <p className="text-sm font-semibold text-gray-500 mb-4">Senior Technician • Vehicle Repair Group</p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
          <span className="bg-gray-light border border-border text-xs px-2 py-1 rounded font-bold text-gray-600">Heavy Engine Repair</span>
          <span className="bg-gray-light border border-border text-xs px-2 py-1 rounded font-bold text-gray-600">Hydraulics</span>
          <span className="bg-gray-light border border-border text-xs px-2 py-1 rounded font-bold text-gray-600">Tatra Certified</span>
        </div>
        
        <div className="flex justify-center md:justify-start gap-6 text-sm">
          <div>
            <div className="font-bold text-olive text-lg">8 Yrs</div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Experience</div>
          </div>
          <div>
            <div className="font-bold text-success text-lg">98%</div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Attendance</div>
          </div>
          <div>
            <div className="font-bold text-primary text-lg">342</div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Jobs Done</div>
          </div>
        </div>
      </div>
    </div>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}
console.log('Technician components created successfully.');
