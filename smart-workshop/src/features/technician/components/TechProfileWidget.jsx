import { useAuth } from '../../../context/AuthContext';

export default function TechProfileWidget() {
  const { user } = useAuth();
  const initials = (user?.fullName || 'EME').split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
      <div className="w-24 h-24 rounded-full bg-olive text-white text-3xl font-bold flex items-center justify-center border-4 border-white shadow-lg shrink-0">
        {initials}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-olive">{user?.fullName || 'Technician Profile'}</h3>
        <p className="text-sm font-semibold text-gray-500 mb-1">
          {user?.rank || 'Senior Technician'} • {user?.department || user?.dept || 'Vehicle Repair Group'}
        </p>
        <p className="text-xs text-gray-400 font-medium mb-4">
          Service No: <strong className="font-mono text-gray-600">{user?.serviceNo || 'EME-890214-A'}</strong> • Email: {user?.email}
        </p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
          <span className="bg-primary/10 border border-primary/20 text-xs px-2.5 py-1 rounded font-bold text-primary">
            {user?.specialization || 'Heavy Transport Overhaul'}
          </span>
          <span className="bg-gray-light border border-border text-xs px-2.5 py-1 rounded font-bold text-gray-600">
            {user?.clearance || 'Level 3 - Secret'}
          </span>
          <span className="bg-gray-light border border-border text-xs px-2.5 py-1 rounded font-bold text-gray-600">
            {user?.garrison || 'Meerut Cantt'}
          </span>
        </div>
        
        <div className="flex justify-center md:justify-start gap-6 text-sm">
          <div>
            <div className="font-bold text-olive text-lg">8 Yrs</div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Experience</div>
          </div>
          <div>
            <div className="font-bold text-success text-lg">98%</div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Attendance</div>
          </div>
          <div>
            <div className="font-bold text-primary text-lg">342</div>
            <div className="text-xs text-gray-400 font-semibold uppercase">Jobs Done</div>
          </div>
        </div>
      </div>
    </div>
  );
}