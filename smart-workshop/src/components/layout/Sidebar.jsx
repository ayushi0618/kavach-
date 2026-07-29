import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronLeft, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Sidebar({ navItems, roleTitle, mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    if (setMobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <aside
        className={cn(
          "h-screen glass-sidebar flex flex-col z-50 fixed md:sticky top-0 left-0 shrink-0 shadow-md transition-all duration-300",
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
          collapsed ? "md:w-20" : "md:w-64"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <img src="/trishul-logo.png" alt="Trishul Logo" className="w-8 h-8 object-contain shrink-0" />
            <div className={cn("flex flex-col leading-tight", collapsed && "md:hidden")}>
              <span className="font-extrabold text-olive text-lg tracking-wider">TRISHUL</span>
              <span className="text-[9px] font-bold text-gray-400 tracking-tight">510 ABW EME COMMAND</span>
            </div>
          </div>
          
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block p-1.5 rounded hover:bg-gray-light text-olive transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>

          {/* Mobile close toggle */}
          <button
            onClick={() => setMobileOpen && setMobileOpen(false)}
            className="md:hidden p-1.5 rounded hover:bg-gray-light text-olive transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Role Badge */}
        <div className={cn("px-4 py-3", collapsed && "md:hidden")}>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {roleTitle}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary text-white shadow-sm" 
                    : "text-gray-600 hover:bg-khaki-light hover:text-olive"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={cn("shrink-0", isActive ? "text-white" : "text-gray-500 group-hover:text-olive")} />
                  
                  <span className={cn("whitespace-nowrap overflow-hidden text-sm font-medium", collapsed && "md:hidden")}>
                    {item.label}
                  </span>

                  {/* Optional Badge */}
                  {item.badge && (
                    <span className={cn(
                      "ml-auto text-xs font-bold px-2 py-0.5 rounded-full",
                      collapsed && "md:hidden",
                      isActive ? "bg-white text-primary" : "bg-danger text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
