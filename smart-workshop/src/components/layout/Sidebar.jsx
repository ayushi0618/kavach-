import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Sidebar({ navItems, roleTitle }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-white border-r border-border flex flex-col z-20 sticky top-0 shrink-0 shadow-sm"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
            >
              <img src="/kavach-logo.png" alt="Kavach Logo" className="w-8 h-8 object-contain shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-olive text-lg tracking-wider">KAVACH</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-tight">510 ABW EME COMMAND</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded hover:bg-gray-light text-olive transition-colors"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-4 py-3">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {roleTitle}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Optional Badge */}
                {!collapsed && item.badge && (
                  <span className={cn(
                    "ml-auto text-xs font-bold px-2 py-0.5 rounded-full",
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
    </motion.aside>
  );
}
