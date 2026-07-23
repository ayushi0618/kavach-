import PageTransition from '../../../components/animations/PageTransition';
import QRCodeDisplay from '../components/QRCodeDisplay';
import { ArrowLeft, Edit, Calendar, Wrench, ShieldCheck, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function VehicleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const { data } = await api.get(`/vehicles/${id}`);
        if (data && data.vehicle) {
          setVehicle(data.vehicle);
        }
      } catch (error) {
        toast.error('Failed to load vehicle details');
        navigate('/admin/assets');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F8F8]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold">Loading Vehicle Details...</p>
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={() => navigate(`/admin/vehicles/edit/${id}`)} className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm">
            <Edit size={16} /> Edit Details
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Core Details */}
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-border p-6 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-gray-light rounded-lg border border-border flex items-center justify-center text-5xl overflow-hidden relative group">
              <span className="opacity-50 group-hover:scale-110 transition-transform">🚛</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-olive">{vehicle.make} {vehicle.model}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    vehicle.status === 'Active' ? 'bg-green-100 text-success' :
                    vehicle.status === 'In Maintenance' ? 'bg-orange-100 text-warning' :
                    vehicle.status === 'Deployed' ? 'bg-blue-100 text-info' :
                    'bg-red-100 text-danger'
                  }`}>{vehicle.status}</span>
              </div>
              <p className="text-lg font-bold text-primary mb-6 font-mono tracking-widest">{vehicle.registrationNumber}</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Chassis Number</div>
                  <div className="font-semibold text-gray-800 font-mono">{vehicle.chassisNumber}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Engine Number</div>
                  <div className="font-semibold text-gray-800 font-mono">{vehicle.engineNumber || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Manufacturing Year</div>
                  <div className="font-semibold text-gray-800">{vehicle.year}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Current Mileage</div>
                  <div className="font-semibold text-gray-800">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Fuel Type</div>
                  <div className="font-semibold text-gray-800">{vehicle.fuelType || 'Diesel'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Assigned To</div>
                  <div className="font-semibold text-gray-800">{vehicle.assignedTo || 'Unassigned'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-4">
            <QRCodeDisplay value={vehicle.registrationNumber} />
          </div>
        </div>

        {/* Timelines and Maintenance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
              <Calendar size={18} /> Vehicle Timeline
            </h3>
            <div className="relative border-l-2 border-gray-200 ml-4 mt-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8 ml-6 relative">
                <div className="absolute -left-9 top-1 w-6 h-6 bg-blue-100 border-2 border-info rounded-full flex items-center justify-center">
                  <MapPin size={10} className="text-info" />
                </div>
                <div className="text-sm font-bold text-gray-800">Deployed to Field Operations</div>
                <div className="text-xs text-gray-500 mt-1">Today at 08:30 AM • Assigned to Sgt. Miller</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="mb-8 ml-6 relative">
                <div className="absolute -left-9 top-1 w-6 h-6 bg-green-100 border-2 border-success rounded-full flex items-center justify-center">
                  <ShieldCheck size={10} className="text-success" />
                </div>
                <div className="text-sm font-bold text-gray-800">Passed Quality Assurance Inspection</div>
                <div className="text-xs text-gray-500 mt-1">Yesterday at 15:45 PM • Inspector: John Doe</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="ml-6 relative">
                <div className="absolute -left-9 top-1 w-6 h-6 bg-orange-100 border-2 border-warning rounded-full flex items-center justify-center">
                  <Wrench size={10} className="text-warning" />
                </div>
                <div className="text-sm font-bold text-gray-800">Engine Oil Replacement & Routine Maintenance</div>
                <div className="text-xs text-gray-500 mt-1">2 Days Ago at 11:00 AM • Completed in Workshop Bay A</div>
              </motion.div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
               <h3 className="text-lg font-bold text-olive mb-4">Cost Tracking</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center pb-2 border-b border-border">
                   <span className="text-sm text-gray-600">Initial Value</span>
                   <span className="font-bold text-gray-800">$125,000</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-border">
                   <span className="text-sm text-gray-600">Maintenance YTD</span>
                   <span className="font-bold text-gray-800">$4,250</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-border">
                   <span className="text-sm text-gray-600">Fuel Costs YTD</span>
                   <span className="font-bold text-gray-800">$8,900</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                   <span className="text-sm font-bold text-gray-800">Total Operating Cost</span>
                   <span className="font-bold text-danger">$13,150</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
