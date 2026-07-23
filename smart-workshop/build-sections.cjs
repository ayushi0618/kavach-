const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'src/components/sections');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const files = {
  'HeroSection.jsx': `import { motion } from 'framer-motion';
import { ArrowRight, Activity, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-olive">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-olive/60"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6"
        >
          Smart Workshop Asset & <br className="hidden md:block"/> Maintenance Management System
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
        >
          Digitizing maintenance operations, inventory, workflow tracking and asset management for the 510 Army Base Workshop.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="/login" className="px-8 py-3.5 bg-primary hover:bg-[#3d4d2f] text-white rounded font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            Explore Dashboard <ArrowRight size={18} />
          </a>
          <a href="#workflow" className="px-8 py-3.5 bg-khaki hover:bg-[#b5a378] text-olive rounded font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            View Workflow <Activity size={18} />
          </a>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto border-t border-white/20 pt-8"
        >
          {[
            { label: 'Assets Managed', value: '10,000+' },
            { label: 'Departments', value: '12' },
            { label: 'Active Repairs', value: '145' },
            { label: 'Technicians', value: '300+' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a 
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}`,
  'AboutSection.jsx': `import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] rounded-lg overflow-hidden bg-khaki-light flex items-center justify-center border border-border shadow-sm"
        >
          {/* Placeholder for missing image */}
          <div className="text-center p-8">
            <span className="block text-4xl mb-4">📸</span>
            <p className="text-olive font-medium">Workshop Front View</p>
            <p className="text-sm text-gray-500 mt-2">Replace with uploaded image</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-olive mb-6">About 510 Army Base Workshop</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The 510 Army Base Workshop in Meerut is a premier establishment dedicated to the overhaul, repair, and maintenance of critical military assets. This digital platform modernizes operations, ensuring complete visibility and efficiency across all departments.
          </p>
          
          <div className="space-y-6 mt-8">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-bold text-olive mb-2">Mission</h3>
              <p className="text-sm text-gray-600">To provide state-of-the-art repair and maintenance facilities ensuring the operational readiness of the Indian Army's vehicle and equipment fleet.</p>
            </div>
            <div className="border-l-4 border-khaki pl-4">
              <h3 className="text-lg font-bold text-olive mb-2">Vision</h3>
              <p className="text-sm text-gray-600">Pioneering digital transformation in military engineering through smart tracking, predictive maintenance, and seamless workflow management.</p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="text-lg font-bold text-olive mb-2">Objectives</h3>
              <p className="text-sm text-gray-600">Reduce turnaround time, optimize inventory management, and enforce strict quality control at every stage of the repair process.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`,
  'DepartmentsSection.jsx': `import { motion } from 'framer-motion';
import { Wrench, Cpu, ShieldCheck, Cog, Zap, Flame, ThermometerSnowflake, CheckCircle2, Factory, Stethoscope } from 'lucide-react';

const departments = [
  { name: 'Vehicle Repair Group', icon: Wrench, desc: 'Complete overhaul and maintenance of heavy vehicles.' },
  { name: 'Machine Shop', icon: Cog, desc: 'Precision machining and component manufacturing.' },
  { name: 'Fabrication', icon: Factory, desc: 'Structural repairs and custom fabrication.' },
  { name: 'Tool Room', icon: Cpu, desc: 'Specialized tools management and calibration.' },
  { name: 'Electrical', icon: Zap, desc: 'Electrical systems repair and diagnostics.' },
  { name: 'Welding', icon: Flame, desc: 'Advanced welding and structural integrity.' },
  { name: 'AC Section', icon: ThermometerSnowflake, desc: 'HVAC systems maintenance and testing.' },
  { name: 'Quality Assurance', icon: ShieldCheck, desc: 'Pre and post-repair quality verification.' },
  { name: 'Quality Control', icon: CheckCircle2, desc: 'Strict adherence to repair standards.' },
  { name: 'Testing Area', icon: Stethoscope, desc: 'Final operational testing and clearance.' },
];

export default function DepartmentsSection() {
  return (
    <section id="departments" className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-olive mb-4"
          >
            Workshop Departments
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            A highly structured ecosystem of specialized departments working together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {departments.map((dept, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg border border-border shadow-sm text-center group cursor-pointer transition-shadow hover:shadow-md"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-khaki-light flex items-center justify-center text-olive group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                <dept.icon size={24} />
              </div>
              <h3 className="font-semibold text-olive mb-2 text-sm">{dept.name}</h3>
              <p className="text-xs text-gray-500">{dept.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'WorkflowSection.jsx': `import { motion } from 'framer-motion';

const steps = [
  "Arrival", "Inspection", "Assignment", "Repair", "QA", "QC", "Testing", "Dispatch"
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-olive mb-4"
          >
            Complete Workflow Timeline
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Every asset follows a strict, digitized path ensuring absolute transparency.
          </motion.p>
        </div>

        <div className="relative mt-20 hidden md:block">
          {/* Animated Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0"
          ></motion.div>

          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 + 0.5, type: 'spring' }}
                className="flex flex-col items-center"
              >
                <div className="w-8 h-8 rounded-full bg-white border-4 border-primary shadow flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-olive"></div>
                </div>
                <div className="mt-4 text-sm font-semibold text-olive uppercase tracking-wider">{step}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-6 relative pl-4 border-l-2 border-primary/30 mt-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-white shadow"></div>
              <h3 className="font-bold text-olive text-lg">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'FeaturesSection.jsx': `import { motion } from 'framer-motion';
import { QrCode, PackageSearch, CalendarClock, UserPlus, FileBarChart, Activity } from 'lucide-react';

const features = [
  { title: "QR Asset Tracking", desc: "Instant asset identification and history retrieval via secure QR scanning.", icon: QrCode },
  { title: "Inventory Management", desc: "Real-time stock monitoring, automated alerts, and procurement tracking.", icon: PackageSearch },
  { title: "Maintenance Scheduling", desc: "Predictive and preventive maintenance scheduling to avoid critical failures.", icon: CalendarClock },
  { title: "Technician Assignment", desc: "Smart job allocation based on technician availability and specialized skills.", icon: UserPlus },
  { title: "Automated Reports", desc: "Generate exhaustive compliance, repair, and throughput reports instantly.", icon: FileBarChart },
  { title: "Live Analytics", desc: "Command-center dashboards providing real-time workshop visibility.", icon: Activity },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-olive text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Enterprise Workshop Features
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#3d4d2f] p-8 rounded-lg border border-[#4d613c]"
            >
              <feature.icon size={32} className="text-khaki mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'StatsSection.jsx': `import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

function Counter({ from, to }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary border-b-4 border-khaki text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={8500} />+</div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Vehicles Serviced</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={12450} /></div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Assets Tracked</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={320} /></div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Expert Technicians</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2"><Counter from={0} to={50000} />+</div>
          <div className="text-sm font-medium text-khaki uppercase tracking-widest">Inventory Items</div>
        </div>
      </div>
    </section>
  );
}`,
  'GallerySection.jsx': `import { motion } from 'framer-motion';

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-gray-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-olive mb-4"
          >
            Workshop Gallery
          </motion.h2>
          <p className="text-gray-600">Glimpses of our state-of-the-art facilities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={\`relative overflow-hidden rounded-lg bg-khaki-light aspect-video flex items-center justify-center border border-border group \${i === 1 || i === 4 ? 'md:col-span-2' : ''}\`}
            >
              <span className="text-2xl opacity-50 group-hover:scale-110 transition-transform">📸 Image {i}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  'CTASection.jsx': `import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-khaki-light/30"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-olive mb-8 leading-tight"
        >
          Digitizing the Future of <br/> Army Workshop Management
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/login')}
          className="px-10 py-4 bg-primary hover:bg-olive text-white rounded shadow-lg hover:shadow-xl transition-all font-bold text-lg flex items-center gap-3 mx-auto"
        >
          Access Portal <ArrowRight size={20} />
        </motion.button>
      </div>
    </section>
  );
}`
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content);
}

console.log('Sections created successfully.');
