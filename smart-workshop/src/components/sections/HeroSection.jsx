import { motion } from 'framer-motion';
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
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src="/kavach-logo.png" 
          alt="Kavach EME Emblem" 
          className="w-24 h-24 object-contain mx-auto mb-4 drop-shadow-2xl" 
        />

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-black text-white tracking-wider leading-tight mb-4"
        >
          Kavach - Asset and Maintenance Management System
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-2xl font-bold text-khaki mb-6 tracking-wide"
        >
          510 Army Base Workshop (EME) Command Ecosystem
        </motion.h2>
        
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
}