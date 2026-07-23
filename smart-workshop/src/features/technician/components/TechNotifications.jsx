import { techNotifications } from '../../../data/mockTechData';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TechNotifications() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Bell size={18} /> Notifications
      </h3>
      <div className="space-y-3">
        {techNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded border text-sm flex gap-3 ${
              notif.type === 'warning' ? 'bg-orange-50 border-orange-100 text-warning' :
              notif.type === 'success' ? 'bg-green-50 border-green-100 text-success' :
              'bg-blue-50 border-blue-100 text-info'
            }`}
          >
            {notif.type === 'warning' ? <AlertTriangle size={18} className="shrink-0" /> : 
             notif.type === 'success' ? <CheckCircle size={18} className="shrink-0" /> : 
             <Info size={18} className="shrink-0" />}
            <span className="font-medium">{notif.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}