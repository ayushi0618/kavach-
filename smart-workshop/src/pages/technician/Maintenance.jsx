import { useState } from 'react';
import PageTransition from '../../components/animations/PageTransition';
import { 
  Wrench, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award, 
  ShieldCheck, 
  FileText, 
  Download, 
  X, 
  Filter 
} from 'lucide-react';
import toast from 'react-hot-toast';

const mockCompletedLogs = [
  {
    id: 'JOB-8840',
    assetName: 'TATRA 8x8 Truck',
    assetId: 'TATRA-ERG-101',
    date: '20 Jul 2026',
    duration: '3.5 Hours',
    type: 'Engine Overhaul & Oil Filter',
    inspector: 'Capt. Ayushi Singh',
    qaScore: '100% Fit',
    remarks: 'Replaced main seal gasket. Passed 10km mountain gradient trial without leaks.',
    partsUsed: ['Main Gasket Ring', 'Synthetic Oil 10L']
  },
  {
    id: 'JOB-8792',
    assetName: 'BMP-2 Combat Vehicle',
    assetId: 'BMP-ARM-042',
    date: '18 Jul 2026',
    duration: '5.0 Hours',
    type: 'Cannon Feed Sensor Replacement',
    inspector: 'Sub. Maj. Rajesh Sharma',
    qaScore: '98% Fit',
    remarks: 'Optical alignment re-calibrated. Tested 50 rounds dummy feed sequence cleanly.',
    partsUsed: ['Optical Recoil Sensor', 'Feed Gear Set']
  },
  {
    id: 'JOB-8710',
    assetName: 'Cummins 250kVA Generator',
    assetId: 'GEN-PWR-901',
    date: '14 Jul 2026',
    duration: '2.0 Hours',
    type: 'Automatic Voltage Regulator Swap',
    inspector: 'Capt. Ayushi Singh',
    qaScore: '100% Fit',
    remarks: 'Replaced faulty AVR unit. Load bank trial stable at 245kW full output.',
    partsUsed: ['AVR Module 250kVA']
  },
  {
    id: 'JOB-8655',
    assetName: 'Shaktiman 4-Ton Ambulance',
    assetId: 'SHAKTI-AMB-08',
    date: '10 Jul 2026',
    duration: '1.5 Hours',
    type: 'Brake Line Flush & Pad Change',
    inspector: 'Col. R. S. Rathore',
    qaScore: '100% Fit',
    remarks: 'Flushed DOT-4 brake fluid lines and replaced front heavy duty pads.',
    partsUsed: ['Heavy Brake Pad Set', 'DOT-4 Fluid 2L']
  },
  {
    id: 'JOB-8520',
    assetName: 'Field Radar Mobile Unit',
    assetId: 'RDR-MOB-004',
    date: '02 Jul 2026',
    duration: '6.0 Hours',
    type: 'Power Distribution Module Repair',
    inspector: 'Sub. Maj. Rajesh Sharma',
    qaScore: '96% Fit',
    remarks: 'Resoldered main busbar connection and replaced surge protection fuse.',
    partsUsed: ['100A Surge Fuse', 'Busbar Connector']
  }
];

export default function Maintenance() {
  const [logs, setLogs] = useState(mockCompletedLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);

  const filteredLogs = logs.filter((log) =>
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.assetId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadCertificate = (log) => {
    toast.success(`Downloading Official QA Certificate for #${log.id}...`);
    const content = `510 ARMY BASE WORKSHOP (EME) - MAINTENANCE CERTIFICATE\nTicket ID: ${log.id}\nEquipment: ${log.assetName} (${log.assetId})\nDate: ${log.date}\nType: ${log.type}\nQA Inspector: ${log.inspector}\nStatus: ${log.qaScore}\nRemarks: ${log.remarks}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `QA_Certificate_${log.id}.txt`;
    link.click();
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border border-border shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-olive/10 text-olive p-2 rounded-lg">
                <Wrench size={24} />
              </span>
              <div>
                <h1 className="text-2xl font-black text-olive">My Maintenance History Ledger</h1>
                <p className="text-xs text-gray-500 font-medium">
                  Verified Overhauls, Repairs & QA Inspection Signoffs
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="px-3.5 py-1.5 rounded-lg bg-gray-50 border border-border text-center">
              <div className="text-[11px] font-bold text-gray-500">First-Time Fix</div>
              <div className="text-lg font-black text-success">96.4%</div>
            </div>
            <div className="px-3.5 py-1.5 rounded-lg bg-gray-50 border border-border text-center">
              <div className="text-[11px] font-bold text-gray-500">Avg Turnaround</div>
              <div className="text-lg font-black text-olive">3.6 Hrs</div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl border border-border shadow-sm flex justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Maintenance Logs, Ticket ID or Asset Name..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-border rounded-lg focus:border-primary focus:outline-none bg-gray-50 font-medium"
            />
          </div>

          <span className="text-xs font-bold text-gray-500 hidden sm:inline">
            Showing {filteredLogs.length} Completed Work Orders
          </span>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-light text-gray-600 font-bold uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-5 py-3.5">Ticket & Equipment</th>
                  <th className="px-5 py-3.5">Repair Task Type</th>
                  <th className="px-5 py-3.5">Date & Duration</th>
                  <th className="px-5 py-3.5">QA Inspector</th>
                  <th className="px-5 py-3.5">QA Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono font-bold text-primary bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                        {log.id}
                      </span>
                      <div className="font-extrabold text-olive text-sm mt-1">{log.assetName}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{log.assetId}</div>
                    </td>

                    <td className="px-5 py-4 font-bold text-gray-800">
                      {log.type}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      <div className="flex items-center gap-1 font-semibold">
                        <Calendar size={13} className="text-gray-400" /> {log.date}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <Clock size={12} /> {log.duration}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-700 font-semibold">
                      {log.inspector}
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-green-100 text-success border border-green-200 flex items-center gap-1 w-fit">
                        <ShieldCheck size={12} /> {log.qaScore}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-3 py-1.5 bg-khaki hover:bg-[#b5a378] text-olive font-bold rounded text-xs transition-colors"
                      >
                        View Signoff
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedLog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl border border-border max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-5 bg-olive text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award size={22} className="text-khaki" />
                  <div>
                    <h3 className="font-extrabold text-sm">Official QA Inspection Signoff</h3>
                    <p className="text-[10px] text-gray-300">Ticket #{selectedLog.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="p-4 bg-gray-50 border border-border rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">Equipment:</span>
                    <span className="font-black text-olive">{selectedLog.assetName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">Asset Tag:</span>
                    <span className="font-mono font-bold text-gray-700">{selectedLog.assetId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">Completion Date:</span>
                    <span className="font-bold text-gray-700">{selectedLog.date} ({selectedLog.duration})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-bold">QA Inspector:</span>
                    <span className="font-extrabold text-primary">{selectedLog.inspector}</span>
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 block mb-1">Supervisor Remarks & Trial Notes:</span>
                  <div className="p-3 bg-slate-50 border border-border rounded text-gray-600 font-medium">
                    "{selectedLog.remarks}"
                  </div>
                </div>

                <div>
                  <span className="font-bold text-gray-700 block mb-1">Parts & Spares Consumed:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLog.partsUsed.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 border border-border rounded text-[11px] font-bold text-gray-700">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-border flex justify-between gap-2">
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 border border-border text-gray-700 hover:bg-gray-100 font-bold rounded"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleDownloadCertificate(selectedLog)}
                  className="px-4 py-2 bg-primary hover:bg-olive text-white font-bold rounded flex items-center gap-1.5 shadow"
                >
                  <Download size={14} /> Download Certificate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
