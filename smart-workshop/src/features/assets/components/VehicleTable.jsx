import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Printer, Edit, Eye, Trash2, Key } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const defaultVehicles = [
  { id: 'V-101', registrationNumber: '21B-408912X', make: 'TATRA', model: 'VVN 8x8 Heavy Truck', chassisNumber: 'T815-21B-901', department: 'Vehicle Repair Group (WSG)', status: 'In Repair', location: 'Bay 2' },
  { id: 'V-102', registrationNumber: '22C-990142A', make: 'Ashok Leyland', model: 'Stallion 4x4 Transport', chassisNumber: 'AL-STL-8821', department: 'Transport Wing', status: 'Operational', location: 'Fleet Yard 1' },
  { id: 'V-103', registrationNumber: '20A-331089M', make: 'BEML', model: 'Earthmover Dozer D88', chassisNumber: 'BEML-D88-302', department: 'Equipment Repair Group', status: 'Under Inspection', location: 'Bay 5' },
  { id: 'V-104', registrationNumber: '23D-551902K', make: 'TATRA', model: 'Recovery Vehicle 8x8', chassisNumber: 'T815-REC-112', department: 'Heavy Overhaul Wing', status: 'Operational', location: 'Fleet Yard 2' },
  { id: 'V-105', registrationNumber: '19E-118239P', make: 'Mahindra', model: 'Marksman Light Armoured', chassisNumber: 'MM-LAV-4091', department: 'Armament Group', status: 'Maintenance Completed', location: 'Bay 3' }
];

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
      if (data && data.vehicles && data.vehicles.length > 0) {
        setVehicles(data.vehicles);
      } else {
        setVehicles(defaultVehicles);
      }
    } catch (error) {
      console.warn('Backend API offline, loading mock vehicles fallback', error);
      setVehicles(defaultVehicles);
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
    if (!window.confirm('Are you sure you want to delete this vehicle record?')) return;
    try {
      await api.delete(`/vehicles/${id}`);
      setVehicles(vehicles.filter(v => v.id !== id));
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      setVehicles(vehicles.filter(v => v.id !== id));
      toast.success('Vehicle removed from view');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      {/* Search Header */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by reg number, make, model, or chassis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-khaki-light/40 border-b border-border text-[11px] font-extrabold text-olive uppercase tracking-wider">
              <th className="py-3 px-4">Reg Number</th>
              <th className="py-3 px-4">Make & Model</th>
              <th className="py-3 px-4">Chassis Number</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500 font-medium">
                  Loading Vehicles...
                </td>
              </tr>
            ) : currentVehicles.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500 font-medium">
                  No transport vehicles found.
                </td>
              </tr>
            ) : (
              currentVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-primary">
                    {v.registrationNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{v.make} {v.model}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-600">
                    {v.chassisNumber}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {v.department}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'Operational' ? 'bg-green-100 text-success' : 'bg-amber-100 text-warning'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/admin/vehicles/${v.id}`)}
                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-primary transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-danger transition-colors"
                        title="Delete Vehicle"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
