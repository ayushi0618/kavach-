const fs = require('fs');
const path = require('path');

const dirs = [
  'src/features/assets/data',
  'src/features/assets/components',
  'src/features/assets/pages'
];

dirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const files = {
  'src/features/assets/data/mockAssetData.js': `export const allAssets = [
  { id: 'TATRA-ERG-102', name: 'TATRA VVN 8x8', category: 'Heavy Transport', dept: 'Vehicle Repair Group', tech: 'Rahul Sharma', status: 'In Repair', location: 'Bay 4', lastMaint: '12 Jan 2026', nextMaint: '30 Aug 2026', qrStatus: 'Active' },
  { id: 'JCB-45', name: 'JCB Backhoe', category: 'Earthmoving', dept: 'Machine Shop', tech: 'Vikram Singh', status: 'Pending', location: 'Yard B', lastMaint: '05 Feb 2026', nextMaint: '05 Sep 2026', qrStatus: 'Active' },
  { id: 'PNK-09', name: 'Pinaka System', category: 'Artillery', dept: 'Testing', tech: 'Amit Patel', status: 'QA', location: 'Testing Pad A', lastMaint: '22 Mar 2026', nextMaint: '22 Nov 2026', qrStatus: 'Printed' },
  { id: 'GEN-500K', name: '500KVA Generator', category: 'Electrical', dept: 'Electrical', tech: 'Deepak Kumar', status: 'Active', location: 'Main Substation', lastMaint: '10 Apr 2026', nextMaint: '10 Oct 2026', qrStatus: 'Active' },
  { id: 'DZR-88', name: 'BEML Dozer', category: 'Earthmoving', dept: 'Fabrication', tech: 'Suresh N.', status: 'In Repair', location: 'Bay 1', lastMaint: '01 Jun 2026', nextMaint: '01 Dec 2026', qrStatus: 'Pending' },
];

export const assetHistory = [
  { id: 1, event: 'Registered', date: '01 Jan 2025', time: '09:00 AM', user: 'Admin User', dept: 'HQ', remarks: 'Initial Procurement' },
  { id: 2, event: 'Transferred', date: '05 Jan 2025', time: '10:30 AM', user: 'Logistics Head', dept: 'Vehicle Repair Group', remarks: 'Deployed to active service' },
  { id: 3, event: 'Maintenance', date: '12 Jan 2026', time: '14:00 PM', user: 'Rahul Sharma', dept: 'VRG', remarks: 'Annual servicing completed' },
  { id: 4, event: 'Repair', date: '20 Jul 2026', time: '08:00 AM', user: 'Rahul Sharma', dept: 'VRG', remarks: 'Engine overhaul initiated' },
];

export const transferHistory = [
  { id: 1, from: 'HQ', to: 'Logistics', date: '01 Jan 2025', reason: 'Initial Deployment', responsible: 'Major V. Kumar' },
  { id: 2, from: 'Logistics', to: 'Vehicle Repair Group', date: '05 Jan 2025', reason: 'Operational Requirement', responsible: 'Capt. A. Singh' },
];

export const maintenanceHistory = [
  { id: 'M-101', date: '12 Jan 2026', type: 'Preventive', tech: 'Rahul Sharma', status: 'Completed', cost: '₹ 15,000' },
  { id: 'M-085', date: '12 Jan 2025', type: 'Preventive', tech: 'Rahul Sharma', status: 'Completed', cost: '₹ 12,500' },
];
`,
  'src/features/assets/components/AssetTable.jsx': `import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Printer, Edit, Eye, Trash2, QrCode } from 'lucide-react';
import { allAssets } from '../data/mockAssetData';
import { useNavigate } from 'react-router-dom';

export default function AssetTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50">
        <div className="relative w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="p-4">Asset ID</th>
              <th className="p-4">Name / Category</th>
              <th className="p-4">Department</th>
              <th className="p-4">Status</th>
              <th className="p-4">QR</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allAssets.map((asset, idx) => (
              <motion.tr 
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="p-4 font-bold text-olive">{asset.id}</td>
                <td className="p-4">
                  <div className="font-semibold text-gray-800">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.category}</div>
                </td>
                <td className="p-4 text-gray-600">{asset.dept}</td>
                <td className="p-4">
                  <span className={\`px-2.5 py-1 rounded-full text-xs font-bold \${
                    asset.status === 'Active' ? 'bg-green-100 text-success' :
                    asset.status === 'In Repair' ? 'bg-blue-100 text-info' :
                    asset.status === 'QA' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-warning'
                  }\`}>
                    {asset.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={\`flex items-center gap-1 text-xs font-bold \${asset.qrStatus === 'Active' ? 'text-success' : 'text-gray-400'}\`}>
                    <QrCode size={14} /> {asset.qrStatus}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(\`/admin/assets/\${asset.id}\`)} className="p-1.5 text-info hover:bg-blue-50 rounded" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-warning hover:bg-orange-50 rounded" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded" title="Print QR">
                      <Printer size={18} />
                    </button>
                    <button className="p-1.5 text-danger hover:bg-red-50 rounded" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-border flex justify-between items-center text-sm text-gray-500 bg-gray-50">
        <div>Showing 1 to 5 of 12450 entries</div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 bg-primary text-white rounded">1</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200">2</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200">3</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}`,
  'src/features/assets/components/AssetForm.jsx': `import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssetForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/assets');
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm border border-border overflow-hidden"
    >
      <div className="p-6 border-b border-border bg-gray-50">
        <h2 className="text-xl font-bold text-olive">Register New Asset</h2>
        <p className="text-sm text-gray-500">Fill in the details to assign a unique identity and QR code.</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Core Information</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Asset Name *</label>
            <input required type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="e.g. TATRA VVN 8x8" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Asset Category *</label>
            <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
              <option>Heavy Transport</option>
              <option>Earthmoving</option>
              <option>Artillery</option>
              <option>Electrical</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Manufacturer & Model</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" className="border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Manufacturer" />
              <input type="text" className="border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Model No" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Serial Number / Chassis No *</label>
            <input required type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="Enter unique serial" />
          </div>
        </div>

        {/* Location & Tracking */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-700 border-b border-border pb-2">Tracking & Maintenance</h3>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Department Assigned *</label>
            <select required className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none">
              <option>Vehicle Repair Group</option>
              <option>Machine Shop</option>
              <option>Electrical</option>
              <option>Testing</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Current Location</label>
            <input type="text" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" placeholder="e.g. Bay 4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Purchase Date</label>
              <input type="date" className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Maintenance Freq (Months)</label>
              <input type="number" defaultValue={6} className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Remarks</label>
            <textarea className="w-full border border-border rounded p-2 text-sm bg-gray-50 focus:border-primary focus:outline-none" rows="2" placeholder="Initial condition notes..."></textarea>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-gray-50 flex justify-end gap-3">
        <button type="button" onClick={() => navigate('/admin/assets')} className="flex items-center gap-2 px-6 py-2 border border-border rounded text-gray-600 hover:bg-gray-200 font-bold text-sm transition-colors">
          <X size={18} /> Cancel
        </button>
        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow transition-colors">
          <Save size={18} /> Save & Generate QR
        </button>
      </div>
    </motion.form>
  );
}`,
  'src/features/assets/components/QRCodeDisplay.jsx': `import QRCode from 'react-qr-code';
import { Printer, Copy, Download } from 'lucide-react';

export default function QRCodeDisplay({ value = 'TATRA-ERG-102', size = 150 }) {
  const handlePrint = () => {
    window.print(); // Simple print trigger for the browser
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="text-gray-400 hover:text-primary"><Copy size={18} /></button>
        <button className="text-gray-400 hover:text-primary"><Download size={18} /></button>
      </div>
      
      <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-xl mb-6">
        <QRCode 
          value={value} 
          size={size} 
          bgColor="#FFFFFF"
          fgColor="#36452F" // Dark Olive
          level="H" 
        />
      </div>
      
      <h3 className="font-bold text-olive text-lg tracking-wider mb-1">{value}</h3>
      <p className="text-xs text-gray-500 mb-6 uppercase">Scan for complete history</p>
      
      <button onClick={handlePrint} className="w-full flex justify-center items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive font-bold py-2 rounded transition-colors">
        <Printer size={18} /> Print QR Tag
      </button>
    </div>
  );
}`,
  'src/features/assets/components/AssetTimeline.jsx': `import { motion } from 'framer-motion';
import { assetHistory } from '../data/mockAssetData';
import { CheckCircle2, Wrench, ArrowRightLeft, ShieldPlus } from 'lucide-react';

export default function AssetTimeline() {
  const getIcon = (event) => {
    if (event === 'Registered') return <ShieldPlus size={16} />;
    if (event === 'Transferred') return <ArrowRightLeft size={16} />;
    if (event === 'Maintenance' || event === 'Repair') return <Wrench size={16} />;
    return <CheckCircle2 size={16} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-6">Asset Lifecycle Timeline</h3>
      
      <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2.5 before:translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {assetHistory.map((history, idx) => (
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
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex justify-between">
                <span>By: {history.user}</span>
                <span>Dept: {history.dept}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/assets/components/AssetDocuments.jsx': `import { FileText, Upload, Download } from 'lucide-react';

const docs = [
  { name: 'Service_Manual_TATRA.pdf', size: '4.2 MB', date: '01 Jan 2025' },
  { name: 'Warranty_Certificate.pdf', size: '1.1 MB', date: '01 Jan 2025' },
  { name: 'Inspection_Report_Jul.pdf', size: '850 KB', date: '12 Jul 2026' }
];

export default function AssetDocuments() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-olive">Documents & Media</h3>
        <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
          <Upload size={14} /> Upload New
        </button>
      </div>

      <div className="space-y-3">
        {docs.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border border-border rounded bg-gray-light hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-red-100 text-danger flex items-center justify-center">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-olive truncate w-48 sm:w-64">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
              </div>
            </div>
            <Download size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}`,
  'src/features/assets/components/TransferHistoryTable.jsx': `import { transferHistory } from '../data/mockAssetData';

export default function TransferHistoryTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border overflow-hidden">
      <h3 className="text-lg font-bold text-olive mb-4">Department Transfer History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-light text-gray-600 font-semibold border-b border-border">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">From Dept</th>
              <th className="px-4 py-3">To Dept</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Authorized By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transferHistory.map((th) => (
              <tr key={th.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{th.date}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{th.from}</td>
                <td className="px-4 py-3 font-semibold text-olive">{th.to}</td>
                <td className="px-4 py-3 text-gray-600">{th.reason}</td>
                <td className="px-4 py-3 text-gray-500">{th.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`,
  'src/features/assets/pages/AssetList.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import AssetTable from '../components/AssetTable';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssetList() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Asset Management</h1>
            <p className="text-sm text-gray-500 mt-1">Complete registry of all workshop equipment and vehicles.</p>
          </div>
          <button 
            onClick={() => navigate('/admin/assets/new')}
            className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-6 py-2.5 rounded font-bold transition-colors shadow"
          >
            <Plus size={18} /> Register New Asset
          </button>
        </div>
        
        <AssetTable />
      </div>
    </PageTransition>
  );
}`,
  'src/features/assets/pages/RegisterAsset.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import AssetForm from '../components/AssetForm';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RegisterAsset() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <button 
          onClick={() => navigate('/admin/assets')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Assets
        </button>
        <AssetForm />
      </div>
    </PageTransition>
  );
}`,
  'src/features/assets/pages/AssetDetails.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import QRCodeDisplay from '../components/QRCodeDisplay';
import AssetTimeline from '../components/AssetTimeline';
import AssetDocuments from '../components/AssetDocuments';
import TransferHistoryTable from '../components/TransferHistoryTable';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssetDetails() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm">
            <Edit size={16} /> Edit Details
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Core Details */}
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-border p-6 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-gray-light rounded-lg border border-border flex items-center justify-center text-4xl overflow-hidden relative group">
              <span className="opacity-50 group-hover:scale-110 transition-transform">🚜</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-olive">TATRA VVN 8x8</h1>
                <span className="bg-blue-100 text-info px-3 py-1 rounded-full text-xs font-bold">In Repair</span>
              </div>
              <p className="text-sm font-bold text-gray-500 mb-6 font-mono">TATRA-ERG-102</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Category</div>
                  <div className="font-semibold text-gray-800">Heavy Transport</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Department</div>
                  <div className="font-semibold text-gray-800">Vehicle Repair Group</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Current Tech</div>
                  <div className="font-semibold text-primary">Rahul Sharma</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Location</div>
                  <div className="font-semibold text-gray-800">Bay 4</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Purchase Date</div>
                  <div className="font-semibold text-gray-800">01 Jan 2025</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Next Maintenance</div>
                  <div className="font-semibold text-danger">30 Aug 2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-4">
            <QRCodeDisplay value="TATRA-ERG-102" />
          </div>
        </div>

        {/* Timelines and Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 space-y-6">
            <TransferHistoryTable />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <AssetTimeline />
            <AssetDocuments />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}`,
  'src/features/assets/pages/QRScannerPage.jsx': `import PageTransition from '../../../components/animations/PageTransition';
import QRScannerWidget from '../../technician/components/QRScannerWidget';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QRScannerPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-2xl mx-auto bg-[#F8F8F8] min-h-screen flex flex-col justify-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors self-start"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <QRScannerWidget />
      </div>
    </PageTransition>
  );
}`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), filepath);
  fs.writeFileSync(fullPath, content);
}

console.log('Asset module components created successfully.');
