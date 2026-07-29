import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicNavbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="h-20 bg-white/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-12 fixed top-0 w-full z-50 shadow-sm"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img src="/trishul-logo.png" alt="Trishul Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0" />
        <div className="flex flex-col">
          <span className="font-extrabold text-olive text-lg sm:text-xl leading-tight tracking-wider">TRISHUL</span>
          <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate max-w-[170px] sm:max-w-none">
            510 Army Base Workshop (EME)
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">About</a>
        <a href="#departments" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Departments</a>
        <a href="#workflow" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Workflow</a>
        <a href="#gallery" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Gallery</a>
      </nav>

      {/* Desktop Login Button */}
      <div className="hidden md:flex items-center">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-6 py-2.5 rounded shadow hover:shadow-md transition-all font-medium text-sm"
        >
          <ShieldCheck size={18} />
          Login Portal
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="flex md:hidden items-center gap-2">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded text-xs font-bold shadow-xs"
        >
          <ShieldCheck size={14} />
          Login
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-olive hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 bg-white border-b border-border shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-3">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                About Workshop
              </a>
              <a 
                href="#departments" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Departments & Wings
              </a>
              <a 
                href="#workflow" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Repair Workflow
              </a>
              <a 
                href="#gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-700 hover:text-primary px-3 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Photo Gallery
              </a>
              <div className="pt-2 border-t border-border">
                <button 
                  onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded font-bold text-sm shadow-xs"
                >
                  <ShieldCheck size={16} />
                  Access Personnel Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
