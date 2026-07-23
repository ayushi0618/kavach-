import { motion } from 'framer-motion';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export default function SlideIntro() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-12">
      <div className="max-w-5xl w-full">
        <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-bold text-olive mb-4 text-center">Digital Transformation</motion.h2>
        <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-gray-500 mb-16 text-center max-w-3xl mx-auto">
          Replacing fragmented paper trails and manual ledgers with a centralized, AI-assisted platform.
        </motion.p>

        <div className="grid grid-cols-3 gap-8">
          {[
            { icon: Target, title: "Precision Tracking", desc: "Every asset gets a unique digital QR identity, ensuring 100% visibility of military hardware." },
            { icon: Zap, title: "Workflow Automation", desc: "Maintenance jobs move seamlessly from registration to QA with automated notifications." },
            { icon: ShieldCheck, title: "Enterprise Security", desc: "Strict Role-Based Access Control (RBAC) separates Officers, Admins, and Technicians." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + (i * 0.2) }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-olive/10 text-olive rounded-full flex items-center justify-center mb-6">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
