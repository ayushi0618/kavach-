import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  UserCheck, 
  Wrench, 
  RefreshCw, 
  ChevronRight, 
  ShieldAlert, 
  MapPin, 
  X, 
  FileText, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { kavachSync } from '../../../utils/kavachSync';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const defaultDemoTasks = [
  {
    id: 'JOB-8901',
    assetName: 'TATRA 8x8 Heavy Transport',
    assetId: 'TATRA-ERG-102',
    category: 'Heavy Vehicles',
    department: 'Vehicle Repair Group (WSG)',
    bay: 'Bay 03 - WSG Workshop',
    priority: 'Critical',
    status: 'In Progress',
    progress: 65,
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: 'Transmission fluid leak and clutch pressure loss during mountain trials.',
    dueDate: 'Today, 17:00'
  },
  {
    id: 'JOB-8902',
    assetName: 'BMP-2 Infantry Combat Vehicle',
    assetId: 'BMP-ARM-044',
    category: 'Armament & Armor',
    department: 'Armament Group',
    bay: 'Bay 01 - Heavy Overhaul',
    priority: 'High',
    status: 'Pending Spares',
    progress: 30,
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: '30mm auto-cannon feeder mechanism alignment & recoil sensor check.',
    dueDate: 'Tomorrow, 12:00'
  },
  {
    id: 'JOB-8903',
    assetName: 'Maruti Gipsy 4x4 Recon',
    assetId: 'GIPSY-LGT-19',
    category: 'Light Vehicles',
    department: 'Vehicle Repair Group (WSG)',
    bay: 'Bay 05 - Quick Repair',
    priority: 'Routine',
    status: 'Assigned',
    progress: 0,
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: 'Scheduled 10,000km overhaul: Brake pad swap and alternator test.',
    dueDate: 'Today, 16:30'
  }
];

export default function TodayTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(() => kavachSync.getJobs());
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTaskModal, setSelectedTaskModal] = useState(null);
  const [progressInput, setProgressInput] = useState(50);
  const [mechanicNote, setMechanicNote] = useState('');

  const fetchAssignedJobs = () => {
    setTasks(kavachSync.getJobs());
  };

  useEffect(() => {
    fetchAssignedJobs();
    const unsubscribe = kavachSync.subscribe(fetchAssignedJobs);
    return () => unsubscribe();
  }, [user]);

  const handleStartOrUpdate = (task) => {
    setSelectedTaskModal(task);
    setProgressInput(task.progress || 25);
    setMechanicNote('');
  };

  const handleSaveProgress = (e) => {
    e.preventDefault();
    if (!selectedTaskModal) return;

    const newStatus = progressInput >= 100 ? 'Completed' : 'In Progress';
    kavachSync.updateJobProgress(selectedTaskModal.id, progressInput, newStatus);

    toast.success(`Task #${selectedTaskModal.id} progress updated to ${progressInput}% (${newStatus})`);
    setSelectedTaskModal(null);
  };

  // Filtering tasks
  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Critical') return t.priority === 'Critical' || t.priority === 'Emergency';
    if (activeFilter === 'In Progress') return t.status === 'In Progress';
    if (activeFilter === 'Pending Spares') return t.status === 'Pending Spares';
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden h-full flex flex-col justify-between">
      <div className="p-5 md:p-6 space-y-5">
        {/* Card Header & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-olive tracking-tight">Today's Assigned Repair Tasks</h2>
              <span className="bg-primary text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                {tasks.length} Active
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Work Orders Assigned to: <strong className="text-olive">{user?.fullName || 'Sub. Maj. Rajesh Sharma'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Filter Pills */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg border border-border text-[11px] font-bold">
              {['All', 'Critical', 'In Progress'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeFilter === tab 
                      ? 'bg-white text-olive shadow-xs font-black' 
                      : 'text-gray-600 hover:text-olive'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button 
              onClick={fetchAssignedJobs}
              className="p-1.5 rounded-lg border border-border text-gray-500 hover:text-primary hover:bg-gray-50 transition-colors"
              title="Refresh Task Queue"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
          {loading ? (
            <div className="py-12 text-center text-gray-400">
              <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-primary" />
              <p className="text-xs font-bold">Loading Live Assigned Tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-border rounded-xl bg-gray-50">
              <CheckCircle2 size={32} className="mx-auto text-success mb-2" />
              <p className="text-xs font-bold text-gray-700">No active tasks in this view</p>
              <p className="text-[11px] text-gray-400 mt-1">All assigned repairs are up to date.</p>
            </div>
          ) : (
            filteredTasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl border border-border bg-gray-light hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all space-y-3 group"
              >
                {/* Top Row: Ticket ID, Priority Pill, Asset Title */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-black text-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-xs">
                      #{task.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      task.priority === 'Critical' || task.priority === 'Emergency'
                        ? 'bg-red-100 text-danger border border-red-200'
                        : task.priority === 'High'
                        ? 'bg-orange-100 text-warning border border-orange-200'
                        : 'bg-blue-100 text-info border border-blue-200'
                    }`}>
                      {task.priority || 'Normal'} Priority
                    </span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {task.category || 'Maintenance'}
                    </span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'Pending Spares' ? 'bg-amber-100 text-amber-800' :
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {task.status}
                  </span>
                </div>

                {/* Main Content Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-8 space-y-1">
                    <h3 className="text-base font-extrabold text-olive group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <Wrench size={16} className="text-primary shrink-0" />
                      {task.assetName}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium line-clamp-1 bg-white p-2 rounded border border-border/80">
                      "{task.description}"
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 pt-0.5">
                      <span className="flex items-center gap-1 font-bold text-gray-700">
                        <MapPin size={12} className="text-primary" /> {task.bay || 'Bay 03'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock size={12} /> Due: {task.dueDate || 'Today, 17:00'}
                      </span>
                    </div>
                  </div>

                  {/* Progress & Action Button */}
                  <div className="md:col-span-4 space-y-2 flex flex-col justify-center items-end">
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>Task Completion</span>
                        <span className="text-olive font-black">{task.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all duration-300"
                          style={{ width: `${task.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartOrUpdate(task)}
                      className="w-full bg-primary hover:bg-olive text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <PlayCircle size={14} />
                      {task.status === 'In Progress' ? 'Update Repair Progress' : 'Start Repair Task'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Task Update Modal */}
      {selectedTaskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-border max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-gray-50 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                  <Wrench size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-olive text-sm">{selectedTaskModal.assetName}</h3>
                  <span className="text-[10px] font-mono font-bold text-gray-500">#{selectedTaskModal.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTaskModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProgress} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-border rounded-lg space-y-1">
                <span className="font-bold text-gray-500 text-[10px] uppercase">Assigned Work Order Description</span>
                <p className="font-semibold text-gray-800">{selectedTaskModal.description}</p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-gray-700">Set Task Progress Percentage:</span>
                  <span className="text-primary text-sm font-black">{progressInput}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={progressInput}
                  onChange={(e) => setProgressInput(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Mechanic Remarks */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">Mechanic Diagnostic Log / Remarks</label>
                <textarea 
                  rows="3"
                  value={mechanicNote}
                  onChange={(e) => setMechanicNote(e.target.value)}
                  placeholder="Enter repair details (e.g. Cleared hydraulic air block, torque tightened bolts to spec)..."
                  className="w-full p-2.5 border border-border rounded focus:border-primary focus:outline-none font-medium"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setSelectedTaskModal(null)}
                  className="px-4 py-2 border border-border text-gray-700 hover:bg-gray-100 font-bold rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-olive text-white font-bold rounded shadow transition-colors"
                >
                  Save Task Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}