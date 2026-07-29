import { useState, useEffect } from 'react';
import PageTransition from '../../components/animations/PageTransition';
import { kavachSync } from '../../utils/kavachSync';
import { useAuth } from '../../context/AuthContext';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Clock, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  Play, 
  Plus, 
  ChevronRight, 
  ShieldAlert, 
  Package, 
  FileText, 
  X, 
  Send 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(() => kavachSync.getJobs());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [activeJobModal, setActiveJobModal] = useState(null);
  const [newSpareName, setNewSpareName] = useState('');

  // Real-time synchronization listener via kavachSync
  useEffect(() => {
    const syncData = () => {
      const updatedJobs = kavachSync.getJobs();
      setJobs(updatedJobs);
      setActiveJobModal((prevModal) => {
        if (!prevModal) return null;
        return updatedJobs.find(j => j.id === prevModal.id) || prevModal;
      });
    };

    syncData();
    const unsubscribe = kavachSync.subscribe(syncData);
    return () => unsubscribe();
  }, []);

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.assetId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || job.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleChecklist = (jobId, itemId) => {
    kavachSync.toggleChecklist(jobId, itemId);
  };

  const handleUpdateStatus = (jobId, newStatus) => {
    kavachSync.updateJobStatus(jobId, newStatus);
    toast.success(`Job #${jobId} status updated to ${newStatus}`);
  };

  const handleAddSpare = (e) => {
    e.preventDefault();
    if (!newSpareName.trim() || !activeJobModal) return;
    
    const spareItemName = newSpareName.trim();
    kavachSync.requestSpare(activeJobModal.id, spareItemName, user?.fullName || 'Technician');

    // Immediately update activeJobModal state for instant modal feedback
    const newSpareObj = { id: `sp-${Date.now()}`, name: spareItemName, qty: 1, status: 'Pending Requisition' };
    setActiveJobModal(prev => prev ? {
      ...prev,
      spares: [...(prev.spares || []), newSpareObj],
      status: 'Pending Spares'
    } : null);

    setNewSpareName('');
    toast.success(`Spare requisition submitted for '${spareItemName}'! Sent to Admin.`);
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg">
                <ClipboardCheck size={24} />
              </span>
              <div>
                <h1 className="text-2xl font-black text-olive">My Assigned Jobs Queue</h1>
                <p className="text-xs text-gray-500 font-medium">
                  {user?.fullName || 'Technician'} • {user?.department || user?.dept || 'Vehicle Repair Group (WSG)'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <div className="text-xs font-bold text-gray-500">In Progress</div>
              <div className="text-lg font-black text-success">
                {jobs.filter(j => j.status === 'In Progress').length}
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-center">
              <div className="text-xs font-bold text-gray-500">Pending Spares</div>
              <div className="text-lg font-black text-warning">
                {jobs.filter(j => j.status === 'Pending Spares').length}
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Ticket ID or Asset Name..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-border rounded-lg focus:border-primary focus:outline-none bg-gray-50 font-medium"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {/* Status Filter Tabs */}
            {['All', 'In Progress', 'Pending Spares', 'In Testing', 'Assigned'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === status 
                    ? 'bg-olive text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}

            {/* Priority Selector */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold border border-border rounded-lg bg-gray-50 focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Emergency">Emergency</option>
              <option value="High">High</option>
              <option value="Routine">Routine</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-xl text-center border border-border">
              <CheckCircle2 size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-bold text-gray-600">No assigned jobs match your criteria</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3">
                  {/* Job Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-primary bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {job.id}
                      </span>
                      <h3 className="text-base font-bold text-olive mt-1.5 group-hover:text-primary transition-colors">
                        {job.assetName}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono">{job.assetId}</p>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      job.priority === 'Emergency' ? 'bg-red-100 text-danger border border-red-200' :
                      job.priority === 'High' ? 'bg-orange-100 text-warning border border-orange-200' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {job.priority}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Bay & Location */}
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-border text-gray-500">
                    <span className="flex items-center gap-1 font-semibold">
                      <Wrench size={13} className="text-primary" /> {job.bay}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-gray-600">
                      <Clock size={13} /> {job.dueDate}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-gray-500">Task Completion</span>
                      <span className="text-olive">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          job.progress === 100 ? 'bg-success' : 'bg-primary'
                        }`} 
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Spares Status Badges */}
                  {job.spares && job.spares.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1">
                      {job.spares.map((sp, i) => (
                        <span 
                          key={i} 
                          className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                            sp.status === 'Issued' 
                              ? 'bg-green-100 text-success border border-green-200' 
                              : 'bg-orange-100 text-warning border border-orange-200'
                          }`}
                        >
                          <Package size={10} /> {sp.name}: {sp.status}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Job Card Footer Actions */}
                <div className="p-3 bg-gray-50 border-t border-border flex justify-between items-center">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    job.status === 'In Progress' ? 'bg-blue-100 text-info' :
                    job.status === 'Pending Spares' ? 'bg-amber-100 text-amber-800' :
                    job.status === 'In Testing' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {job.status}
                  </span>

                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="flex items-center gap-1 bg-primary hover:bg-olive text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-xs transition-colors"
                  >
                    Open Workbench <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Workbench Detail Modal */}
        {activeJobModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-5 bg-gray-50 border-b border-border flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-olive text-base">{activeJobModal.assetName}</h3>
                      <span className="text-xs font-mono font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                        #{activeJobModal.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{activeJobModal.bay} • Due: {activeJobModal.dueDate}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveJobModal(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status Quick Changer */}
                <div className="p-4 rounded-lg bg-gray-50 border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase">Current Job Status</span>
                    <div className="text-sm font-black text-olive mt-0.5">{activeJobModal.status}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['In Progress', 'Pending Spares', 'In Testing', 'Completed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(activeJobModal.id, st)}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          activeJobModal.status === st 
                            ? 'bg-primary text-white shadow-xs' 
                            : 'bg-white border border-border text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Repair Checklist */}
                <div>
                  <h4 className="text-sm font-bold text-olive mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" /> Step-by-Step Diagnostic & Repair Checklist
                  </h4>
                  <div className="space-y-2">
                    {activeJobModal.checklist.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => toggleChecklist(activeJobModal.id, item.id)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                          item.done 
                            ? 'bg-green-50/60 border-green-200 text-gray-800' 
                            : 'bg-white border-border text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-xs font-medium ${item.done ? 'line-through text-gray-500' : ''}`}>
                          {item.text}
                        </span>
                        <input 
                          type="checkbox" 
                          checked={item.done} 
                          onChange={() => {}}
                          className="w-4 h-4 text-primary rounded focus:ring-0 cursor-pointer" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Spares & Requisition Form */}
                <div className="border-t border-border pt-5">
                  <h4 className="text-sm font-bold text-olive mb-3 flex items-center gap-2">
                    <Package size={16} className="text-primary" /> Required Spare Parts & Requisition
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    {activeJobModal.spares.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">No spares requested yet.</p>
                    ) : (
                      activeJobModal.spares.map((sp, i) => (
                        <div key={i} className="flex justify-between items-center p-2.5 bg-gray-50 border border-border rounded text-xs">
                          <span className="font-bold text-olive">{sp.name} (x{sp.qty})</span>
                          <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                            sp.status === 'Issued' ? 'bg-green-100 text-success' : 'bg-orange-100 text-warning'
                          }`}>
                            {sp.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleAddSpare} className="flex gap-2">
                    <input 
                      type="text" 
                      value={newSpareName}
                      onChange={(e) => setNewSpareName(e.target.value)}
                      placeholder="Request new spare part (e.g. Gasket Seal Kit)..."
                      className="flex-1 px-3 py-1.5 text-xs border border-border rounded focus:border-primary focus:outline-none"
                    />
                    <button 
                      type="submit"
                      className="bg-khaki hover:bg-[#b5a378] text-olive px-3.5 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Plus size={14} /> Request Part
                    </button>
                  </form>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 border-t border-border flex justify-end gap-2">
                <button 
                  onClick={() => setActiveJobModal(null)}
                  className="px-4 py-2 border border-border text-gray-700 hover:bg-gray-100 text-xs font-bold rounded transition-colors"
                >
                  Close Workbench
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
