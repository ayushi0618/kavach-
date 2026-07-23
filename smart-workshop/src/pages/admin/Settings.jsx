import { useState } from 'react';
import PageTransition from '../../components/animations/PageTransition';
import { 
  Building2, 
  ShieldCheck, 
  Bell, 
  Database, 
  Lock, 
  Save, 
  RefreshCw, 
  Layers, 
  Globe, 
  Download 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('workshop');
  const [loading, setLoading] = useState(false);

  const [workshopConfig, setWorkshopConfig] = useState({
    workshopName: '510 Army Base Workshop',
    location: 'Meerut Cantt, Uttar Pradesh',
    commandName: 'Corps of Electronics & Mechanical Engineers (EME)',
    commanderName: 'Col. R. S. Rathore',
    contactEmail: 'commander.510abw@eme.gov.in',
    contactPhone: '+91 121 2640100',
    timeFormat: '24-Hour',
    autoBackup: true,
    backupFrequency: 'Daily (02:00 AM)',
    lowStockThreshold: 10,
    criticalAlertsEmail: true,
    auditLogging: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Workshop settings updated successfully!');
    }, 600);
  };

  const handleTriggerBackup = () => {
    toast.success('Initiating manual database backup...');
    setTimeout(() => {
      toast.success('Database backup snapshot created successfully!');
    }, 1200);
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto bg-[#F8F8F8] min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Workshop Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Configure unit identity, group parameters, notification rules, and security controls.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-5 py-2.5 rounded font-bold text-sm shadow transition-colors disabled:opacity-50"
          >
            <Save size={18} /> {loading ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Tabs */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('workshop')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'workshop' 
                  ? 'bg-primary text-white shadow' 
                  : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
              }`}
            >
              <Building2 size={18} /> Unit Identity
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'groups' 
                  ? 'bg-primary text-white shadow' 
                  : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
              }`}
            >
              <Layers size={18} /> EME Groups & Bays
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'notifications' 
                  ? 'bg-primary text-white shadow' 
                  : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
              }`}
            >
              <Bell size={18} /> Notifications & Alerts
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'backup' 
                  ? 'bg-primary text-white shadow' 
                  : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
              }`}
            >
              <Database size={18} /> Backup & Database
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                activeTab === 'security' 
                  ? 'bg-primary text-white shadow' 
                  : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
              }`}
            >
              <ShieldCheck size={18} /> Security & Auditing
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {activeTab === 'workshop' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-lg font-bold text-olive flex items-center gap-2">
                    <Building2 size={20} className="text-primary" /> 510 Army Base Workshop Information
                  </h2>
                  <p className="text-xs text-gray-500">Official unit designation and command headquarters metadata.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Workshop Name</label>
                    <input 
                      type="text" 
                      value={workshopConfig.workshopName} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, workshopName: e.target.value })}
                      className="w-full border border-border rounded p-2.5 text-sm bg-gray-50 focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Location & Garrison</label>
                    <input 
                      type="text" 
                      value={workshopConfig.location} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, location: e.target.value })}
                      className="w-full border border-border rounded p-2.5 text-sm bg-gray-50 focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Parent Command / Corps</label>
                    <input 
                      type="text" 
                      value={workshopConfig.commandName} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, commandName: e.target.value })}
                      className="w-full border border-border rounded p-2.5 text-sm bg-gray-50 focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Workshop Commander</label>
                    <input 
                      type="text" 
                      value={workshopConfig.commanderName} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, commanderName: e.target.value })}
                      className="w-full border border-border rounded p-2.5 text-sm bg-gray-50 focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Official Contact Email</label>
                    <input 
                      type="email" 
                      value={workshopConfig.contactEmail} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, contactEmail: e.target.value })}
                      className="w-full border border-border rounded p-2.5 text-sm bg-gray-50 focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Official Phone Line</label>
                    <input 
                      type="text" 
                      value={workshopConfig.contactPhone} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, contactPhone: e.target.value })}
                      className="w-full border border-border rounded p-2.5 text-sm bg-gray-50 focus:border-primary focus:outline-none" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-lg font-bold text-olive flex items-center gap-2">
                    <Layers size={20} className="text-primary" /> Active Workshop Groups & Sub-bays
                  </h2>
                  <p className="text-xs text-gray-500">Manage operational divisions under 510 Army Base Workshop.</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-olive text-sm">WSG (Work Services Group)</h4>
                      <p className="text-xs text-gray-500">Sub-bays: Vehicle Repair, Welding, Electrical, Mechanical, QA/QC, Inventory</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Active • 6 Bays</span>
                  </div>

                  <div className="p-4 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-olive text-sm">ERG (Equipment Repair Group)</h4>
                      <p className="text-xs text-gray-500">Specialized optical and heavy power equipment repairs</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Active • 4 Bays</span>
                  </div>

                  <div className="p-4 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-olive text-sm">Armament Group</h4>
                      <p className="text-xs text-gray-500">Weaponry, artillery, launcher hydraulics & turret mechanisms</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Active • 3 Bays</span>
                  </div>

                  <div className="p-4 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-olive text-sm">QA / QC Inspection Wing</h4>
                      <p className="text-xs text-gray-500">Quality assurance testing, pre-deployment sign-offs</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">Active • 2 Testing Lines</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-lg font-bold text-olive flex items-center gap-2">
                    <Bell size={20} className="text-primary" /> Thresholds & Alert Rules
                  </h2>
                  <p className="text-xs text-gray-500">Configure automated alerts for stockouts, job delays, and tender approvals.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Inventory Low Stock Alert Threshold</h4>
                      <p className="text-xs text-gray-500">Trigger notification when spare parts drop below threshold</p>
                    </div>
                    <input 
                      type="number" 
                      value={workshopConfig.lowStockThreshold} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, lowStockThreshold: Number(e.target.value) })}
                      className="w-24 border border-border rounded p-2 text-sm text-center font-bold" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Critical Priority Job Alerts</h4>
                      <p className="text-xs text-gray-500">Instant notification for high priority vehicle repair tickets</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={workshopConfig.criticalAlertsEmail} 
                      onChange={e => setWorkshopConfig({ ...workshopConfig, criticalAlertsEmail: e.target.checked })}
                      className="w-5 h-5 accent-primary cursor-pointer" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-lg font-bold text-olive flex items-center gap-2">
                    <Database size={20} className="text-primary" /> Database Backup & Snapshot Control
                  </h2>
                  <p className="text-xs text-gray-500">Manage SQLite database backups and disaster recovery snapshots.</p>
                </div>

                <div className="p-4 bg-gray-50 border border-border rounded space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-olive text-sm">Automated Nightly Backup</h4>
                      <p className="text-xs text-gray-500">Schedule: {workshopConfig.backupFrequency}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">ENABLED</span>
                  </div>

                  <div className="pt-3 border-t border-border flex gap-3">
                    <button 
                      onClick={handleTriggerBackup}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-xs font-bold hover:bg-olive transition-colors"
                    >
                      <RefreshCw size={14} /> Create Snapshot Now
                    </button>
                    <button 
                      onClick={handleTriggerBackup}
                      className="flex items-center gap-2 bg-white border border-border text-gray-700 px-4 py-2 rounded text-xs font-bold hover:bg-gray-100 transition-colors"
                    >
                      <Download size={14} /> Download Latest Backup (.db)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-border space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-lg font-bold text-olive flex items-center gap-2">
                    <ShieldCheck size={20} className="text-primary" /> Security & Role Audit Trail
                  </h2>
                  <p className="text-xs text-gray-500">System access logs, JWT session settings, and role-based permissions.</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="p-3 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-700">JWT Token Expiry</span>
                    <span className="font-bold text-olive">8 Hours</span>
                  </div>
                  <div className="p-3 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-700">Audit Logging</span>
                    <span className="font-bold text-green-700">Enabled (Winston Logger)</span>
                  </div>
                  <div className="p-3 border border-border rounded bg-gray-50 flex justify-between items-center">
                    <span className="font-bold text-gray-700">HTTP Security Headers</span>
                    <span className="font-bold text-green-700">Active (Helmet Middleware)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
