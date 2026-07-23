import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-light flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background styling for Enterprise minimal look */}
      <div className="absolute inset-0 bg-white/50 z-0"></div>
      
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img src="/kavach-logo.png" alt="Kavach Logo" className="w-20 h-20 object-contain drop-shadow-md" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-center text-3xl font-black text-olive tracking-wider uppercase"
        >
          KAVACH
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-1 text-center text-sm font-bold text-gray-600"
        >
          510 Army Base Workshop (EME) Digital Lifecycle Platform
        </motion.p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
