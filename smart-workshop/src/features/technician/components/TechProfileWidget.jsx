export default function TechProfileWidget() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
      <div className="w-24 h-24 rounded-full bg-khaki text-white text-3xl font-bold flex items-center justify-center border-4 border-white shadow-lg shrink-0">
        RS
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-olive">Rahul Sharma</h3>
        <p className="text-sm font-semibold text-gray-500 mb-4">Senior Technician • Vehicle Repair Group</p>
        
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
          <span className="bg-gray-light border border-border text-xs px-2 py-1 rounded font-bold text-gray-600">Heavy Engine Repair</span>
          <span className="bg-gray-light border border-border text-xs px-2 py-1 rounded font-bold text-gray-600">Hydraulics</span>
          <span className="bg-gray-light border border-border text-xs px-2 py-1 rounded font-bold text-gray-600">Tatra Certified</span>
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