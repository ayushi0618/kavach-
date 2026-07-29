export default function Footer() {
  return (
    <footer className="bg-olive text-gray-200 py-12 border-t border-[#46543F]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src="/trishul-logo.png" alt="Trishul Logo" className="w-10 h-10 object-contain shrink-0" />
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-lg leading-tight tracking-wider">TRISHUL</span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">510 ABW MEERUT</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Digitizing maintenance operations, inventory, and asset management for the modern Indian Army workshop.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#workflow" className="text-gray-400 hover:text-white transition-colors">Our Workflow</a></li>
            <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</a></li>
            <li><a href="/login" className="text-gray-400 hover:text-white transition-colors">Login Portal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Departments</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400">Vehicle Repair Group</li>
            <li className="text-gray-400">Machine Shop</li>
            <li className="text-gray-400">Electrical & HVAC</li>
            <li className="text-gray-400">Quality Assurance</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>510 Army Base Workshop</li>
            <li>Meerut Cantt, UP, India</li>
            <li className="pt-2">Secure Line: [Restricted]</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#46543F] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} 510 Army Base Workshop. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Enterprise Asset & Maintenance Management System</p>
      </div>
    </footer>
  );
}
