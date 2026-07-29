import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Star, Phone, Mail, MapPin } from 'lucide-react';
import PageTransition from '../../../components/animations/PageTransition';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { vendors as mockVendors } from '../data/mockProcurementData';

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/procurement/vendors');
      if (data && data.vendors && data.vendors.length > 0) {
        setVendors(data.vendors);
      } else {
        setVendors(mockVendors);
      }
    } catch (err) {
      setVendors(mockVendors);
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(v => 
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.gst?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-olive tracking-wide">Approved Vendor Registry</h1>
            <p className="text-sm text-gray-500">Registered ordnance suppliers and OEM vendors for 510 ABW.</p>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-4 py-2 rounded text-sm font-bold shadow transition-colors">
            <Plus size={16} /> Register Vendor
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg border border-border flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search vendors by name or GSTIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Loading vendors...</div>
          ) : filteredVendors.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500">No vendors found.</div>
          ) : (
            filteredVendors.map((v) => (
              <div key={v.id} className="bg-white p-5 rounded-lg border border-border shadow-xs hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{v.name}</h3>
                    <span className="text-xs font-mono text-gray-400">{v.gst}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    v.status === 'Approved' ? 'bg-green-100 text-success' : 'bg-amber-100 text-warning'
                  }`}>
                    {v.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-600 border-t border-border pt-3 mt-3">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    <span>{v.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-warning fill-warning" />
                    <span className="font-bold text-gray-800">{v.rating} / 5.0 Rating</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}