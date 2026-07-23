import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img src="/kavach-logo.png" alt="Kavach Logo" className="w-24 h-24 object-contain drop-shadow-xl mb-4" />
        
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-black text-olive mb-1 tracking-wider text-center"
        >
          Kavach - Asset and Maintenance Management System
        </motion.h1>
        
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8"
        >
          510 Army Base Workshop (EME) Command System
        </motion.p>

        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-olive"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
