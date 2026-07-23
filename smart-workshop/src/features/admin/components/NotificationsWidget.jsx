import { motion } from 'framer-motion';
import { notifications } from '../../../data/mockData';
import { Bell, AlertTriangle, Info } from 'lucide-react';

export default function NotificationsWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Bell size={18} /> Alerts
      </h3>
      <div className="flex-1 overflow-y-auto space-y-3">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`p-3 rounded border text-sm flex gap-3 ${
              notif.type === 'danger' ? 'bg-red-50 border-red-100 text-danger' :
              notif.type === 'warning' ? 'bg-orange-50 border-orange-100 text-warning' :
              'bg-blue-50 border-blue-100 text-info'
            }`}
          >
            {notif.type === 'danger' ? <AlertTriangle size={18} className="shrink-0" /> : <Info size={18} className="shrink-0" />}
            <span>{notif.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}