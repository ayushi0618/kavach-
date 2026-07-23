import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="h-20 bg-white border-b border-border flex items-center justify-between px-6 md:px-12 fixed top-0 w-full z-50 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <img src="/kavach-logo.png" alt="Kavach Logo" className="w-10 h-10 object-contain shrink-0" />
        <div className="flex flex-col">
          <span className="font-extrabold text-olive text-xl leading-tight tracking-wider">KAVACH</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">510 Army Base Workshop (EME)</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</a>
        <a href="#departments" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Departments</a>
        <a href="#workflow" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Workflow</a>
        <a href="#gallery" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Gallery</a>
      </nav>

      <div className="flex items-center">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-6 py-2.5 rounded shadow hover:shadow-md transition-all font-medium text-sm"
        >
          <ShieldCheck size={18} />
          Login Portal
        </button>
      </div>
    </motion.header>
  );
}
