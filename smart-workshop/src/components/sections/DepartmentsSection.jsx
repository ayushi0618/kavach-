import { motion } from 'framer-motion';
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
}