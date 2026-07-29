import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wrench, Cog, Factory, Cpu, Zap, ShieldCheck, 
  CheckCircle2, Building2, Truck, ClipboardList, Package, Target, 
  Compass, Radio, FileText, Anchor, Activity, Gauge, FlameKindling, Search
} from 'lucide-react';

const departments = [
  { code: '01', name: 'WSG', fullName: 'Vehicle Repair Group (WSG)', icon: Truck, category: 'Vehicle & Transport', desc: 'Heavy vehicle overhaul, engine rebuilding & chassis servicing.' },
  { code: '02', name: 'TT Cell', fullName: 'Technical Training Cell', icon: ClipboardList, category: 'Admin & Training', desc: 'Technical skill training, certification & workshop personnel instruction.' },
  { code: '03', name: 'ADM Block', fullName: 'Administration Block', icon: Building2, category: 'Admin & Training', desc: 'HQ command operations, personnel administration & workshop leadership.' },
  { code: '04', name: 'PRP', fullName: 'Production Planning & Control', icon: Target, category: 'Admin & Training', desc: 'Production planning, workshop load balancing & job routing.' },
  { code: '05', name: 'MCO', fullName: 'Movement Control Office', icon: Compass, category: 'Logistics & Stores', desc: 'Equipment transit control & movement coordination.' },
  { code: '06', name: 'MPO', fullName: 'Material Planning Office', icon: Package, category: 'Logistics & Stores', desc: 'Material forecasting, spare parts inventory & stock planning.' },
  { code: '07', name: 'GEG', fullName: 'General Engineering Group', icon: Cog, category: 'Mechanical & Repair', desc: 'General engineering, lathe machining & mechanical fitting.' },
  { code: '08', name: 'ERG', fullName: 'Equipment Repair Group', icon: Wrench, category: 'Mechanical & Repair', desc: 'Heavy field equipment, earthmovers & engineering machinery repair.' },
  { code: '09', name: 'OSS', fullName: 'Ordnance Stores Section', icon: Package, category: 'Logistics & Stores', desc: 'Military spares warehouse, inventory storage & stock issuance.' },
  { code: '10', name: 'CES', fullName: 'Component Examination Section', icon: Gauge, category: 'QA & Testing', desc: 'Metallurgical testing, flaw inspection & NDT component clearance.' },
  { code: '11', name: 'Tool Room', fullName: 'Tool Room (PSG)', icon: Cpu, category: 'Precision Group (PSG)', desc: 'Specialized tooling, jigs/fixtures & gauge calibration.' },
  { code: '12', name: 'RPM', fullName: 'Repair & Maintenance (PSG)', icon: Wrench, category: 'Precision Group (PSG)', desc: 'Precision machine tool maintenance & spindle overhaul.' },
  { code: '13', name: 'ANCY', fullName: 'Ancillary Section (PSG)', icon: Factory, category: 'Precision Group (PSG)', desc: 'Ancillary fittings, sub-assembly overhauls & sheet metal parts.' },
  { code: '14', name: 'FAB', fullName: 'Fabrication Section (PSG)', icon: Factory, category: 'Precision Group (PSG)', desc: 'Structural welding, armor plating & heavy sheet metal fabrication.' },
  { code: '15', name: 'ED Shop', fullName: 'Electro-Discharge Shop (PSG)', icon: Zap, category: 'Precision Group (PSG)', desc: 'High-precision spark erosion & wire EDM machining.' },
  { code: '16', name: 'VRG', fullName: 'Vehicle Repair Group (PSG)', icon: Truck, category: 'Precision Group (PSG)', desc: 'Precision vehicle assembly, transmission tuning & chassis alignment.' },
  { code: '17', name: 'AVG', fullName: 'Armoured Vehicle Group', icon: ShieldCheck, category: 'Armaments & Missiles', desc: 'Main battle tank & armored combat vehicle overhaul.' },
  { code: '18', name: 'HRV RV-15', fullName: 'HRV RV-15 Recovery Group', icon: Anchor, category: 'Vehicle & Transport', desc: 'Heavy recovery vehicle winches, hydraulic booms & tow rigs.' },
  { code: '19', name: 'SRG', fullName: 'Small Arms Repair Group', icon: Target, category: 'Armaments & Missiles', desc: 'Infantry rifles, machine guns & small arms calibration.' },
  { code: '20', name: 'TRG', fullName: 'Transport Repair Group', icon: Truck, category: 'Vehicle & Transport', desc: 'Light & medium transport vehicle maintenance pool.' },
  { code: '21', name: 'R&I', fullName: 'Receipt & Inspection Section', icon: FileText, category: 'Logistics & Stores', desc: 'Inbound equipment triage, inspection logging & unboxing.' },
  { code: '22', name: 'EERG', fullName: 'Electrical & Electronics Repair', icon: Zap, category: 'Electronics & Radar', desc: 'Vehicle electrical harnesses, alternators & control units.' },
  { code: '23', name: 'MT', fullName: 'Mechanical Transport Group', icon: Truck, category: 'Vehicle & Transport', desc: 'Workshop vehicle dispatch, logistics fleet & transport ops.' },
  { code: '24', name: 'PWG', fullName: 'Precision Workshop Group', icon: Gauge, category: 'Mechanical & Repair', desc: 'Micro-precision turning, gear cutting & shaft grinding.' },
  { code: '25', name: 'AWG', fullName: 'Armament Workshop Group', icon: Target, category: 'Armaments & Missiles', desc: 'Artillery field guns, mortar turrets & heavy recoil mechanisms.' },
  { code: '26', name: 'ARCC', fullName: 'Artillery Repair & Calibration', icon: Activity, category: 'Armaments & Missiles', desc: 'Optical sights, muzzle velocity sensors & artillery calibration.' },
  { code: '27', name: 'CWG', fullName: 'Chassis & Wheel Group', icon: Cog, category: 'Vehicle & Transport', desc: 'Multi-axle alignment, brake systems & suspension overhauls.' },
  { code: '28', name: 'CRC', fullName: 'Control & Radar Cell', icon: Radio, category: 'Electronics & Radar', desc: 'Fire control radars, tactical comms & sensor electronics.' },
  { code: '29', name: 'MRSAM', fullName: 'MRSAM Missile Maintenance', icon: Target, category: 'Armaments & Missiles', desc: 'Medium-range SAM launcher vehicles & missile container pods.' },
  { code: '30', name: 'ATGM', fullName: 'Anti-Tank Guided Missile', icon: Target, category: 'Armaments & Missiles', desc: 'ATGM launcher tripods, thermal sights & guidance electronics.' },
  { code: '31', name: 'FIRE Sec', fullName: 'Fire & Safety Section', icon: FlameKindling, category: 'Admin & Training', desc: 'Workshop fire protection, hazard safety & emergency response.' },
  { code: '32', name: 'LPO', fullName: 'Local Purchase Office', icon: Package, category: 'Logistics & Stores', desc: 'Local market procurement, emergency spares & tender sourcing.' },
  { code: '33', name: 'QA', fullName: 'Quality Assurance Wing', icon: ShieldCheck, category: 'QA & Testing', desc: 'Pre-handover quality inspection & official military QA clearance.' },
  { code: '34', name: 'QC (TG-17)', fullName: 'Quality Control (TG-17)', icon: CheckCircle2, category: 'QA & Testing', desc: 'Strict compliance audits & TG-17 technical standards.' },
];

const categories = [
  'All (34)',
  'Vehicle & Transport',
  'Armaments & Missiles',
  'Precision Group (PSG)',
  'Mechanical & Repair',
  'Logistics & Stores',
  'Electronics & Radar',
  'QA & Testing',
  'Admin & Training'
];

export default function DepartmentsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All (34)');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = departments.filter((dept) => {
    const matchesCategory = selectedCategory === 'All (34)' || dept.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dept.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="departments" className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-olive mb-3"
          >
            Workshop Departments (34 Specialized Wings)
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-3xl mx-auto text-sm"
          >
            A highly structured ecosystem of 34 specialized EME workshop departments, groups, and precision sections working in sync for total combat readiness.
          </motion.p>

          {/* Search & Filter Controls */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by department name (e.g. WSG, ERG, MRSAM)..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:border-primary shadow-xs"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white shadow-xs' 
                      : 'bg-white text-gray-600 border border-border hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredDepts.map((dept) => (
            <motion.div
              key={dept.code}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-xl border border-border shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-khaki-light flex items-center justify-center text-olive group-hover:bg-primary group-hover:text-white transition-colors">
                    <dept.icon size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    #{dept.code}
                  </span>
                </div>
                <h3 className="font-extrabold text-olive text-base group-hover:text-primary transition-colors">
                  {dept.name}
                </h3>
                <h4 className="text-xs font-bold text-gray-700 mb-1.5 line-clamp-1">
                  {dept.fullName}
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {dept.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400">
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                  {dept.category}
                </span>
                <span className="text-primary group-hover:underline">View Wing →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}