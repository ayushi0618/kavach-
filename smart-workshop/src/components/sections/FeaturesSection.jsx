import { motion } from 'framer-motion';
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
}