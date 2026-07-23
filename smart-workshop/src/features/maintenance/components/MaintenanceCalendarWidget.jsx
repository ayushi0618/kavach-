import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Wrench, ShieldCheck, User, X, Filter } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function MaintenanceCalendarWidget() {
  const monthsList = [
    'January 2026', 'February 2026', 'March 2026', 'April 2026', 
    'May 2026', 'June 2026', 'July 2026', 'August 2026', 
    'September 2026', 'October 2026', 'November 2026', 'December 2026'
  ];
  const [currentMonthIndex, setCurrentMonthIndex] = useState(6); // 6 = July 2026
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentMonthName = monthsList[currentMonthIndex];

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => (prev > 0 ? prev - 1 : 11));
    toast.success(`Switched schedule view to ${monthsList[currentMonthIndex > 0 ? currentMonthIndex - 1 : 11]}`);
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => (prev < 11 ? prev + 1 : 0));
    toast.success(`Switched schedule view to ${monthsList[currentMonthIndex < 11 ? currentMonthIndex + 1 : 0]}`);
  };

  const departments = [
    { id: 'ALL', label: 'All Departments' },
    { id: 'WSG', label: 'Vehicle Repair Group (WSG)' },
    { id: 'ERG', label: 'Equipment Repair Group (ERG)' },
    { id: 'ARM', label: 'Armament Group' },
    { id: 'MACHINE', label: 'Machine Shop & Welding' },
    { id: 'ELEC', label: 'Electrical & AC Group' },
    { id: 'QA', label: 'QA / QC Inspection Wing' }
  ];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/maintenance');
      const fetched = data?.jobs || data?.tickets || [];
      
      const mappedJobs = fetched.map((j, i) => {
        let dayNum = 23;
        if (j.startDate) {
          const dt = new Date(j.startDate);
          if (!isNaN(dt.getDate())) dayNum = dt.getDate();
        } else {
          dayNum = (i * 3 + 18) % 28 + 1;
        }

        return {
          id: j.id,
          day: dayNum,
          title: j.description || j.assetName || 'Vehicle Repair Job',
          vehicle: j.assetName || j.department || 'TATRA VVN 8x8',
          dept: j.department || 'Vehicle Repair Group (WSG)',
          tech: j.technicianName || 'Sub. Maj. Rajesh Sharma',
          type: j.priority === 'Critical' ? 'Corrective' : 'Preventive',
          priority: j.priority || 'Normal',
          status: j.status || 'Scheduled',
          color: j.priority === 'Critical' ? 'bg-red-100 text-danger border-red-200' :
                 j.priority === 'High' ? 'bg-blue-100 text-info border-blue-200' :
                 'bg-purple-100 text-purple-700 border-purple-200'
        };
      });

      // Default fallback jobs if DB empty
      if (mappedJobs.length === 0) {
        setJobs([
          { id: 'JOB-101', day: 20, title: 'TATRA VVN 8x8 Engine Servicing', vehicle: 'TATRA VVN 8x8 (Reg: 21B-408912X)', dept: 'Vehicle Repair Group (WSG)', tech: 'Sub. Maj. Rajesh Sharma', type: 'Preventive', status: 'Completed', color: 'bg-green-100 text-success border-green-200' },
          { id: 'JOB-102', day: 23, title: 'Pinaka Rocket Launcher Hydraulic Flush', vehicle: 'Pinaka MBRL Rig #4', dept: 'Armament Group', tech: 'Nk. Amit Patel', type: 'Corrective', status: 'In Progress', color: 'bg-blue-100 text-info border-blue-200' },
          { id: 'JOB-103', day: 24, title: '500KVA Diesel Generator Alternator Overhaul', vehicle: 'GenSet-500KVA #02', dept: 'Equipment Repair Group (ERG)', tech: 'Sep. Deepak Verma', type: 'Preventive', status: 'Scheduled', color: 'bg-purple-100 text-purple-700 border-purple-200' },
          { id: 'JOB-104', day: 26, title: 'BEML Earthmover Track Tension Check', vehicle: 'BEML Dozer D88', dept: 'Vehicle Repair Group (WSG)', tech: 'Hav. Vikram Singh', type: 'Preventive', status: 'Scheduled', color: 'bg-orange-100 text-warning border-orange-200' },
        ]);
      } else {
        setJobs(mappedJobs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const handleUpdate = () => fetchJobs();
    window.addEventListener('maintenance_updated', handleUpdate);
    return () => window.removeEventListener('maintenance_updated', handleUpdate);
  }, []);

  const filteredJobs = jobs.filter(j => {
    if (selectedDeptFilter === 'ALL') return true;
    return j.dept?.toLowerCase().includes(selectedDeptFilter.toLowerCase());
  });

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Calendar Header Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-olive text-white flex items-center justify-center font-bold shadow-sm">
            <CalendarIcon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-olive">510 ABW Departmental Schedule Calendar</h2>
            <p className="text-xs text-gray-500">Live scheduling divided across WSG, ERG, Armament, Machine Shop & QA Wing.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1 bg-gray-50 border border-border rounded p-1 shadow-2xs">
            <button 
              onClick={handlePrevMonth}
              className="p-1 hover:bg-white rounded transition-colors text-olive cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-bold text-xs px-3 text-olive min-w-[100px] text-center select-none">
              {currentMonthName}
            </span>
            <button 
              onClick={handleNextMonth}
              className="p-1 hover:bg-white rounded transition-colors text-olive cursor-pointer"
              title="Next Month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Department Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter size={14} className="text-gray-400 shrink-0 ml-1" />
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDeptFilter(dept.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              selectedDeptFilter === dept.id
                ? 'bg-olive text-white border-olive shadow-xs'
                : 'bg-white text-gray-600 border-border hover:bg-gray-100'
            }`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Day Grid (2 Columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-border">
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-gray-500 mb-2 border-b border-border pb-2">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const dayJobs = filteredJobs.filter(e => e.day === day);
              const isToday = day === 23;
              return (
                <div 
                  key={day}
                  className={`min-h-[85px] p-1.5 border rounded-lg flex flex-col justify-between transition-all ${
                    isToday ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-gray-50/50 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-xs font-bold ${isToday ? 'text-primary bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center' : 'text-gray-700'}`}>
                      {day}
                    </span>
                    {dayJobs.length > 0 && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-hidden flex-1">
                    {dayJobs.map(job => (
                      <div 
                        key={job.id}
                        className={`text-[9px] font-bold p-1 rounded border truncate shadow-2xs ${job.color}`}
                        title={`${job.title} (${job.dept}) - Assigned: ${job.tech}`}
                      >
                        <div className="truncate font-extrabold">{job.title}</div>
                        <div className="text-[8px] opacity-80 truncate">{job.tech}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scheduled Jobs Sidebar */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col">
          <h3 className="font-bold text-olive text-base mb-4 flex items-center justify-between border-b border-border pb-3">
            <span className="flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Scheduled Jobs ({filteredJobs.length})
            </span>
          </h3>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="p-3.5 border border-border rounded-lg bg-gray-50 hover:bg-white hover:border-khaki transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-border text-gray-600">
                    Day {job.day} July
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${job.color}`}>
                    {job.priority || job.status}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 text-xs mb-1">{job.title}</h4>
                <div className="text-[11px] text-gray-500 space-y-0.5">
                  <p><strong>Department:</strong> <span className="text-olive font-semibold">{job.dept}</span></p>
                  <p><strong>Assigned Tech:</strong> <span className="text-primary font-bold">{job.tech}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}