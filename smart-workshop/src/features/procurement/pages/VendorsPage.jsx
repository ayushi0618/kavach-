import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Star, Phone, Mail, MapPin } from 'lucide-react';
import PageTransition from '../../../components/animations/PageTransition';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

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
      if (data && data.vendors) setVendors(data.vendors);
    } catch (err) {
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const filteredVendors = vendors.filter(v => 
    v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Vendor Directory</h1>
            <p className="text-sm text-gray-500 mt-1">Manage suppliers, view performance ratings, and contact details.</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-olive text-white rounded text-sm font-bold flex items-center gap-2 shadow transition-colors w-full md:w-auto justify-center">
            <Plus size={16} /> Add Vendor
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50 flex items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by vendor name, contact, or email..." 
                className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-light text-olive font-semibold border-b border-border">
                <tr>
                  <th className="p-4">Vendor Details</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Address</th>
                  <th className="p-4 text-center">Rating</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p>Loading vendors...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No vendors found.
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((vendor, idx) => (
                    <motion.tr 
                      key={vendor.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-bold text-olive text-base">{vendor.name}</div>
                        <div className="text-gray-500 text-xs mt-1">Rep: {vendor.contactPerson}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <Mail size={14} className="text-gray-400"/> {vendor.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={14} className="text-gray-400"/> {vendor.phone}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-2 truncate max-w-[200px]" title={vendor.address}>
                          <MapPin size={14} className="text-gray-400 flex-shrink-0"/> <span className="truncate">{vendor.address}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} fill={i < vendor.rating ? "currentColor" : "none"} className={i < vendor.rating ? "" : "text-gray-300"} />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          vendor.status === 'Active' ? 'bg-green-100 text-success border border-green-200' : 'bg-red-100 text-danger border border-red-200'
                        }`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="p-1.5 text-info hover:bg-blue-50 rounded" title="Edit Vendor">
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}