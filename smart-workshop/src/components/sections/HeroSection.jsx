import { motion } from 'framer-motion';
import { ArrowRight, Activity, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 md:py-0">
      {/* Background Video / Image */}
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mt-6 md:mt-16">
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          src="/trishul-logo.png" 
          alt="Trishul EME Emblem" 
          className="w-16 h-16 sm:w-24 sm:h-24 object-contain mx-auto mb-3 sm:mb-4 drop-shadow-2xl" 
        />

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wider leading-tight mb-3 sm:mb-4"
        >
          Trishul - Asset & Maintenance Management
        </motion.h1>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base sm:text-xl md:text-2xl font-bold text-khaki mb-4 sm:mb-6 tracking-wide"
        >
          510 Army Base Workshop (EME) Command Ecosystem
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto font-light px-2"
        >
          Digitizing maintenance operations, inventory, workflow tracking and asset management for the 510 Army Base Workshop.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a href="/login" className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary hover:bg-[#3d4d2f] text-white rounded font-medium shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
            Explore Dashboard <ArrowRight size={18} />
          </a>
          <a href="#workflow" className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-khaki hover:bg-[#b5a378] text-olive rounded font-medium shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
            View Workflow <Activity size={18} />
          </a>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto border-t border-white/20 pt-6 sm:pt-8"
        >
          {[
            { label: 'Assets Managed', value: '10,000+' },
            { label: 'Departments', value: '12' },
            { label: 'Active Repairs', value: '145' },
            { label: 'Technicians', value: '300+' }
          ].map((stat, i) => (
            <div key={i} className="text-center bg-black/20 sm:bg-transparent p-2 sm:p-0 rounded-lg backdrop-blur-xs sm:backdrop-blur-none">
              <div className="text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider">{stat.label}</div>
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
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}