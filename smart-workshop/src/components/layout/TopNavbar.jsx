import { useState, useEffect, useRef } from 'react';
import { Search, Bell, LogOut, User, CheckCheck, AlertTriangle, Wrench, ShoppingBag, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserProfileModal from '../common/UserProfileModal';

export default function TopNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Low Stock Alert: TATRA Oil Filters',
      desc: 'Stock level dropped to 4 units (Reorder limit: 10)',
      time: '10 mins ago',
      unread: true,
      type: 'stock',
      link: '/admin/inventory'
    },
    {
      id: 2,
      title: 'High Priority Repair Assigned',
      desc: 'Pinaka Launcher hydraulic leak assigned to WSG Bay 2',
      time: '35 mins ago',
      unread: true,
      type: 'maintenance',
      link: '/admin/workflow'
    },
    {
      id: 3,
      title: 'Tender Pending Commander Approval',
      desc: 'Tender #T-402 (Engine Spare Parts) awaiting L1 approval',
      time: '1 hour ago',
      unread: true,
      type: 'procurement',
      link: '/admin/procurement/evaluations'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (n) => {
    setNotifications(notifications.map(item => item.id === n.id ? { ...item, unread: false } : item));
    setShowNotifications(false);
    if (n.link) navigate(n.link);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const searchableData = [
    { title: 'TATRA VVN 8x8 Heavy Truck', type: 'Asset', link: '/admin/assets' },
    { title: 'Pinaka MBRL Rocket Launcher', type: 'Asset', link: '/admin/assets' },
    { title: 'BEML Earthmover Dozer D88', type: 'Asset', link: '/admin/assets' },
    { title: 'Sub. Maj. Rajesh Sharma', type: 'Technician', link: '/admin/employees' },
    { title: 'Hav. Vikram Singh', type: 'Technician', link: '/admin/employees' },
    { title: 'TNDR-045 Engine Spare Parts', type: 'Procurement', link: '/admin/procurement/evaluations' },
    { title: 'TATRA Oil Filter Assembly', type: 'Inventory', link: '/admin/inventory' },
    { title: 'Pinaka Hydraulic Flush Repair', type: 'Maintenance Ticket', link: '/admin/maintenance' },
  ];

  const searchResults = searchableData.filter(item => 
    searchQuery && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setShowSearchResults(false);
    navigate(`/admin/assets?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Left side: Search */}
      <div className="flex-1 flex items-center">
        <form onSubmit={handleSearchSubmit} className="relative w-64 md:w-80" ref={searchRef}>
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Search workshop assets, jobs, staff..." 
            className="w-full pl-10 pr-4 py-2 border border-border rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-gray-50/50"
          />

          {showSearchResults && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-xl overflow-hidden z-50 text-left">
              <div className="p-2 bg-gray-50 border-b border-border text-[10px] font-bold text-gray-500 uppercase">
                Search Results ({searchResults.length})
              </div>
              {searchResults.length === 0 ? (
                <div className="p-4 text-xs text-gray-400 text-center">No matching workshop records found</div>
              ) : (
                <div className="max-h-60 overflow-y-auto divide-y divide-border">
                  {searchResults.map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery('');
                        navigate(item.link);
                      }}
                      className="p-2.5 hover:bg-gray-50 cursor-pointer flex justify-between items-center transition-colors"
                    >
                      <span className="text-xs font-bold text-gray-800">{item.title}</span>
                      <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Time */}
        <div className="hidden md:block text-sm font-medium text-gray-500">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>

        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-gray-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-danger text-[9px] text-white items-center justify-center font-bold">
                  {unreadCount}
                </span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-border overflow-hidden z-50">
              <div className="p-3 bg-gray-50 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-olive text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead} 
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <CheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-border">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        n.unread ? 'bg-amber-50/50' : 'bg-white'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'stock' && <AlertTriangle size={18} className="text-danger" />}
                        {n.type === 'maintenance' && <Wrench size={18} className="text-primary" />}
                        {n.type === 'procurement' && <ShoppingBag size={18} className="text-warning" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-xs font-bold ${n.unread ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</h4>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{n.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 bg-gray-50 border-t border-border text-center">
                <button onClick={() => { setShowNotifications(false); navigate('/admin/workflow'); }} className="text-xs font-bold text-olive hover:underline">
                  View Workshop Workflow Board →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-border"></div>

        {/* Profile */}
        <div 
          onClick={() => setIsProfileModalOpen(true)}
          className="flex items-center gap-3 cursor-pointer p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          title="View My Personnel Profile & Change Password"
        >
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-olive">{user?.fullName || user?.name || 'Personnel Profile'}</span>
            <span className="text-xs bg-khaki-light text-olive px-2 py-0.5 rounded-full font-medium">
              {user?.role || 'TECHNICIAN'}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-olive text-white font-bold flex items-center justify-center text-xs overflow-hidden shadow-xs">
            {(user?.fullName || user?.name || 'EME').split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={logout}
          className="text-gray-500 hover:text-danger transition-colors p-2 rounded hover:bg-red-50"
          title="Logout"
        >
          <LogOut size={20} />
        </button>

        <UserProfileModal 
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    </header>
  );
}
