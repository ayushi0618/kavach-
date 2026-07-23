import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Wrench, ShieldCheck, Layers, ArrowRight, Activity, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EMEWorkflowPipeline() {
  const navigate = useNavigate();

  const groups = [
    {
      id: 'wsg',
      name: 'WSG (Work Services Group)',
      code: 'WSG',
      color: 'border-l-blue-600 bg-blue-50/40',
      activeJobs: 12,
      subBays: ['Vehicle Repair', 'Welding', 'Electrical', 'Mechanical', 'Inventory'],
      bays: [
        { name: 'Bay 1 (Heavy Trucks)', vehicle: 'TATRA VVN 8x8', status: 'In Repair', tech: 'Rahul Sharma', progress: 65 },
        { name: 'Bay 2 (Light Recon)', vehicle: 'Gypsy 4x4', status: 'Testing', tech: 'Amit Patel', progress: 90 },
        { name: 'Bay 3 (Earthmoving)', vehicle: 'BEML Dozer D88', status: 'Waiting Parts', tech: 'Suresh N.', progress: 30 },
      ]
    },
    {
      id: 'erg',
      name: 'ERG (Equipment Repair Group)',
      code: 'ERG',
      color: 'border-l-purple-600 bg-purple-50/40',
      activeJobs: 6,
      subBays: ['Optical Systems', 'Power Generators', 'Communication Rig'],
      bays: [
        { name: 'Bay E1 (Power Supply)', vehicle: '500KVA Diesel Gen', status: 'In Repair', tech: 'Deepak Kumar', progress: 50 },
        { name: 'Bay E2 (Night Vision)', vehicle: 'TI Sight Assembly', status: 'Testing', tech: 'Vikram Singh', progress: 85 },
      ]
    },
    {
      id: 'armament',
      name: 'Armament Group',
      code: 'ARM',
      color: 'border-l-amber-600 bg-amber-50/40',
      activeJobs: 5,
      subBays: ['Turret Hydraulics', 'Rocket Launcher', 'Artillery Mechanism'],
      bays: [
        { name: 'Bay A1 (Rocket Systems)', vehicle: 'Pinaka MBRL Rig', status: 'In Repair', tech: 'Karan Verma', progress: 75 },
        { name: 'Bay A2 (Gun Barrel)', vehicle: '155mm Gun Mount', status: 'QA Inspection', tech: 'Sanjay Dutt', progress: 95 },
      ]
    },
    {
      id: 'qa',
      name: 'QA / QC Final Inspection Wing',
      code: 'QA',
      color: 'border-l-emerald-600 bg-emerald-50/40',
      activeJobs: 4,
      subBays: ['Diagnostic Scanner', 'Road Test Track', 'Command Sign-off'],
      bays: [
        { name: 'QA Bay 1 (Final Test)', vehicle: 'TATRA-ERG-102', status: 'Road Testing', tech: 'Maj. R. K. Nair', progress: 98 },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-olive text-white px-2.5 py-0.5 rounded-full">510 ABW MEERUT CANTT</span>
            <span className="text-xs font-bold text-gray-400">Master Operational Pipeline</span>
          </div>
          <h2 className="text-xl font-bold text-olive">EME Workshop Multi-Group Pipeline</h2>
          <p className="text-xs text-gray-500">Live workflow tracking across WSG, ERG, Armament Group, and QA/QC Wing.</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/maintenance/board')}
            className="px-4 py-2 bg-white border border-border text-olive rounded font-bold text-xs shadow-sm hover:bg-gray-50 flex items-center gap-2"
          >
            Switch to Kanban Board view <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Multi-Group Horizontal Pipeline */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {groups.map((grp) => (
          <motion.div 
            key={grp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-lg shadow-sm border border-border border-l-4 ${grp.color} p-5 flex flex-col justify-between`}
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-olive text-base">{grp.code} Pipeline</h3>
                <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {grp.activeJobs} Active Jobs
                </span>
              </div>
              <p className="text-xs font-bold text-gray-700 mb-3">{grp.name}</p>

              {/* Sub-bays tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {grp.subBays.map((b, i) => (
                  <span key={i} className="text-[10px] font-bold bg-white border border-border px-2 py-0.5 rounded text-gray-600">
                    {b}
                  </span>
                ))}
              </div>

              {/* Active Bays */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Bays</h4>
                {grp.bays.map((bay, idx) => (
                  <div key={idx} className="p-3 bg-white border border-border rounded shadow-xs">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-gray-800">{bay.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        bay.status === 'In Repair' ? 'bg-blue-100 text-info' :
                        bay.status === 'Testing' ? 'bg-purple-100 text-purple-600' :
                        bay.status === 'QA Inspection' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-orange-100 text-warning'
                      }`}>{bay.status}</span>
                    </div>
                    <p className="text-xs font-bold text-olive mb-2">{bay.vehicle}</p>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-1">
                      <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${bay.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold">
                      <span>Tech: {bay.tech}</span>
                      <span>{bay.progress}% Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
