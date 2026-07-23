import { motion } from 'framer-motion';

export default function SlideWelcome() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-olive-dark to-olive text-white p-12">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="text-center">
        <img src="/kavach-logo.png" alt="Kavach EME Emblem" className="w-32 h-32 object-contain mx-auto mb-6 drop-shadow-2xl" />
        <h1 className="text-5xl font-black mb-3 tracking-wider">Kavach - Asset and Maintenance Management System</h1>
        <h2 className="text-2xl text-khaki-light mb-10 font-bold tracking-wide uppercase">510 Army Base Workshop (EME) Command Ecosystem</h2>
        
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 inline-block text-left">
          <p className="text-sm text-gray-300 mb-1 uppercase font-bold">Presentation Demo</p>
          <p className="text-lg font-bold text-white mb-4">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <div className="flex gap-12">
            <div>
              <p className="text-xs text-khaki uppercase tracking-wider mb-1">Location</p>
              <p className="font-bold">Meerut Base Workshop</p>
            </div>
            <div>
              <p className="text-xs text-khaki uppercase tracking-wider mb-1">Status</p>
              <p className="font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Production Ready</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
