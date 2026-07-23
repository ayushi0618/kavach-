import { useState } from 'react';
import PageTransition from '../../../components/animations/PageTransition';
import ExportToolbar from '../components/ExportToolbar';
import { Search, Filter, X, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const initialReportsList = [
  { id: 1, title: 'Daily Workshop Output', desc: 'Summary of jobs completed today across all bays.', date: 'Today, 08:00 AM', dept: 'Vehicle Repair', category: 'Output' },
  { id: 2, title: 'Weekly Maintenance Summary', desc: 'Preventive vs Corrective maintenance ratios.', date: 'Last Week', dept: 'Vehicle Repair', category: 'Maintenance' },
  { id: 3, title: 'Monthly Inventory Valuation', desc: 'Current value of warehouse stock and low alerts.', date: '01 Jul 2026', dept: 'Inventory', category: 'Inventory' },
  { id: 4, title: 'Quarterly Vendor Performance', desc: 'L1 selections, delivery delays, and QA rejections.', date: 'Q2 2026', dept: 'Procurement', category: 'Procurement' },
  { id: 5, title: 'Annual Vehicle Readiness Report', desc: 'Complete breakdown of fleet operational status.', date: '2025-2026', dept: 'Vehicle Repair', category: 'Fleet' },
  { id: 6, title: 'Armament Group Hydraulic Diagnostic Report', desc: 'Pressure leak checks and seal replacement history for Pinaka & Artillery.', date: 'Yesterday', dept: 'Armament', category: 'Armament' },
];

export default function ReportsCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [timeFilter, setTimeFilter] = useState('Last 30 Days');
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [reportFormat, setReportFormat] = useState('ALL');

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setActiveSearch(searchTerm.trim().toLowerCase());
    toast.success(`Search applied: "${searchTerm}"`);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveSearch('');
    setDeptFilter('All Departments');
    setTimeFilter('Last 30 Days');
    setReportFormat('ALL');
    setShowMoreModal(false);
    toast.success('Filters reset to default');
  };

  const filteredReports = initialReportsList.filter((report) => {
    const matchesSearch = !activeSearch || 
      report.title.toLowerCase().includes(activeSearch) || 
      report.desc.toLowerCase().includes(activeSearch) ||
      report.dept.toLowerCase().includes(activeSearch);

    const matchesDept = deptFilter === 'All Departments' || report.dept.toLowerCase() === deptFilter.toLowerCase();

    return matchesSearch && matchesDept;
  });

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Reports Center</h1>
            <p className="text-sm text-gray-500 mt-1">Generate, filter, and export comprehensive enterprise reports.</p>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <form onSubmit={handleSearchSubmit} className="bg-white p-4 rounded-lg shadow-sm border border-border flex flex-wrap gap-3 items-center mb-6">
          <div className="flex-1 min-w-[240px] relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports by title or keyword..." 
                className="w-full pl-9 pr-4 py-2 border border-border rounded text-sm focus:border-primary focus:outline-none" 
              />
            </div>
            <button 
              type="submit" 
              className="px-5 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow transition-colors flex items-center gap-1 shrink-0"
            >
              <Search size={16} /> Search
            </button>
          </div>

          <select 
            value={deptFilter} 
            onChange={(e) => setDeptFilter(e.target.value)}
            className="border border-border rounded px-3 py-2 text-sm bg-gray-50 font-semibold text-gray-700 focus:outline-none"
          >
            <option>All Departments</option>
            <option>Vehicle Repair</option>
            <option>Inventory</option>
            <option>Procurement</option>
            <option>Armament</option>
          </select>

          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-border rounded px-3 py-2 text-sm bg-gray-50 font-semibold text-gray-700 focus:outline-none"
          >
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>

          <button 
            type="button"
            onClick={() => setShowMoreModal(true)}
            className="px-4 py-2 bg-gray-100 border border-border rounded text-sm font-bold text-olive flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Filter size={16} /> More Filters
          </button>
        </form>

        {/* Active Filter Tags */}
        {(activeSearch || deptFilter !== 'All Departments' || timeFilter !== 'Last 30 Days') && (
          <div className="mb-4 flex flex-wrap gap-2 items-center text-xs">
            <span className="font-bold text-gray-500">Active Filters:</span>
            {activeSearch && (
              <span className="bg-blue-100 text-info px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                Search: "{activeSearch}" <X size={12} className="cursor-pointer" onClick={() => { setSearchTerm(''); setActiveSearch(''); }} />
              </span>
            )}
            {deptFilter !== 'All Departments' && (
              <span className="bg-green-100 text-success px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                Dept: {deptFilter} <X size={12} className="cursor-pointer" onClick={() => setDeptFilter('All Departments')} />
              </span>
            )}
            <button onClick={handleResetFilters} className="text-primary hover:underline font-bold ml-2">Clear All</button>
          </div>
        )}

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-lg border border-border text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-olive mb-1">No Matching Reports Found</h3>
              <p className="text-sm text-gray-500 mb-4">No reports match your current search query or department filters.</p>
              <button onClick={handleResetFilters} className="px-4 py-2 bg-primary text-white rounded font-bold text-xs inline-flex items-center gap-2">
                <RefreshCw size={14} /> Reset Search & Filters
              </button>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col hover:border-khaki transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-olive text-lg">{report.title}</h3>
                  <span className="text-[10px] font-bold bg-khaki-light text-olive px-2 py-0.5 rounded-full">{report.dept}</span>
                </div>
                <p className="text-xs font-bold text-gray-400 mb-4">{report.date}</p>
                <p className="text-sm text-gray-600 mb-6 flex-1">{report.desc}</p>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Preview</span>
                  <ExportToolbar title={report.title} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* More Filters Modal */}
      {showMoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <div className="flex justify-between items-center mb-4 border-b border-border pb-3">
              <h3 className="font-bold text-olive text-lg flex items-center gap-2">
                <Filter size={18} /> Advanced Report Filters
              </h3>
              <button onClick={() => setShowMoreModal(false)} className="text-gray-400 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Department Scope</label>
                <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="w-full border border-border rounded p-2 text-sm">
                  <option>All Departments</option>
                  <option>Vehicle Repair</option>
                  <option>Inventory</option>
                  <option>Procurement</option>
                  <option>Armament</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Date Period</label>
                <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)} className="w-full border border-border rounded p-2 text-sm">
                  <option>Last 30 Days</option>
                  <option>This Quarter</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-border">
              <button onClick={handleResetFilters} className="px-4 py-2 border border-border rounded text-gray-600 font-bold text-xs hover:bg-gray-100 flex-1">
                Reset
              </button>
              <button onClick={() => { setShowMoreModal(false); toast.success('Filters applied'); }} className="px-4 py-2 bg-primary text-white rounded font-bold text-xs shadow hover:bg-olive flex-1">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}