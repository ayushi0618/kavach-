import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Printer, Edit, Eye, Trash2, Key } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function VehicleTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/vehicles');
      if (data && data.vehicles) {
        setVehicles(data.vehicles);
      }
    } catch (error) {
      toast.error('Failed to load vehicles');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => 
    v.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.chassisNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const currentVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        toast.success('Vehicle deleted successfully');
        fetchVehicles();
      } catch (error) {
        toast.error('Failed to delete vehicle');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50">
        <div className="relative w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search reg no, make, model..." 
            className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100">
            <Filter size={16} /> Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4">Reg No</th>
              <th className="p-4">Make & Model</th>
              <th className="p-4">Chassis / Engine No</th>
              <th className="p-4 text-center">Year</th>
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
                    <p>Loading vehicles...</p>
                  </div>
                </td>
              </tr>
            ) : currentVehicles.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No vehicles found.
                </td>
              </tr>
            ) : (
              currentVehicles.map((vehicle, idx) => (
              <motion.tr 
                key={vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-bold text-olive">
                  <div className="flex items-center gap-2">
                    <Key size={14} className="text-gray-400" />
                    {vehicle.registrationNumber}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-800">{vehicle.make}</div>
                  <div className="text-xs text-gray-500">{vehicle.model}</div>
                </td>
                <td className="p-4 text-gray-600 text-xs font-mono">
                  {vehicle.chassisNumber}<br/>
                  <span className="text-gray-400">{vehicle.engineNumber}</span>
                </td>
                <td className="p-4 text-center text-gray-600 font-bold">{vehicle.year}</td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    vehicle.status === 'Active' ? 'bg-green-100 text-success' :
                    vehicle.status === 'In Maintenance' ? 'bg-orange-100 text-warning' :
                    vehicle.status === 'Deployed' ? 'bg-blue-100 text-info' :
                    'bg-red-100 text-danger'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(`/admin/vehicles/${vehicle.id}`)} className="p-1.5 text-info hover:bg-blue-50 rounded" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => navigate(`/admin/vehicles/edit/${vehicle.id}`)} className="p-1.5 text-warning hover:bg-orange-50 rounded" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(vehicle.id)} className="p-1.5 text-danger hover:bg-red-50 rounded" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            )))}
          </tbody>
        </table>
      </div>
      
      {!loading && totalPages > 1 && (
        <div className="p-4 border-t border-border flex justify-between items-center text-sm text-gray-500 bg-gray-50">
          <div>Showing <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold">{Math.min(currentPage * itemsPerPage, filteredVehicles.length)}</span> of <span className="font-bold">{filteredVehicles.length}</span> entries</div>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1 border border-border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-bold px-3 py-1 bg-white border border-border rounded text-olive">
              {currentPage} / {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1 border border-border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
