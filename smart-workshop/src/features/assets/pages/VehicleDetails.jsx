import PageTransition from '../../../components/animations/PageTransition';
import QRCodeDisplay from '../components/QRCodeDisplay';
import AssetDocuments from '../components/AssetDocuments';
import { 
  ArrowLeft, 
  Edit, 
  Calendar, 
  Wrench, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Cpu, 
  Gauge, 
  Fuel, 
  User 
} from 'lucide-react';
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
        setVehicle({
          id: id || 'V-101',
          registrationNumber: '21B-408912X',
          make: 'TATRA',
          model: 'VVN 8x8 Heavy Truck',
          chassisNumber: 'T815-21B-901',
          engineNumber: 'ENG-TAT-89012',
          department: 'Vehicle Repair Group (WSG)',
          status: 'In Repair',
          location: 'Bay 2 (WSG Depot)',
          yearOfMfg: '2021',
          odometerReading: '42,500 KM',
          fuelType: 'Diesel (High Cetane)',
          seatingCapacity: '2 + 16 Troops',
          driverName: 'Hav. Vikram Singh',
          driverPhone: '+91 98765 12345',
          unitAssignment: '510 ABW Heavy Overhaul Division',
          lastServiceDate: '12 Jan 2026',
          nextServiceDue: '30 Aug 2026'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-light">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold text-sm">Loading Military Vehicle Record...</p>
      </div>
    );
  }

  if (!vehicle) return null;

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3.5 py-2 rounded-lg border border-border shadow-sm"
          >
            <ArrowLeft size={16} /> Back to Fleet Vehicles
          </button>
          <button onClick={() => navigate(`/admin/vehicles/edit/${id}`)} className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-5 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
            <Edit size={16} /> Edit Vehicle Details
          </button>
        </div>

        {/* Top Section: Equal Height Core Details & QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Core Vehicle Details (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col justify-between h-full">
            <div>
              {/* Vehicle Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-olive text-white flex items-center justify-center shadow-md shrink-0">
                    <Truck size={28} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-olive uppercase tracking-tight">{vehicle.make} {vehicle.model}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-black text-primary bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 tracking-wider">
                        REG: {vehicle.registrationNumber}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        Year: {vehicle.year}
                      </span>
                    </div>
                  </div>
                </div>

                <span className={`self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  vehicle.status === 'Active' ? 'bg-green-100 text-success border border-green-200' :
                  vehicle.status === 'In Maintenance' ? 'bg-orange-100 text-warning border border-orange-200' :
                  vehicle.status === 'Deployed' ? 'bg-blue-100 text-info border border-blue-200' :
                  'bg-red-100 text-danger border border-red-200'
                }`}>{vehicle.status}</span>
              </div>

              {/* Structured Metadata Grid Tiles (3x2 Grid) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Cpu size={14} className="text-primary" /> Chassis Number
                  </div>
                  <div className="font-mono font-bold text-olive text-xs truncate">{vehicle.chassisNumber}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Wrench size={14} className="text-primary" /> Engine Number
                  </div>
                  <div className="font-mono font-bold text-olive text-xs truncate">{vehicle.engineNumber || 'EME-ENG-9082'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Gauge size={14} className="text-primary" /> Current Odometer
                  </div>
                  <div className="font-extrabold text-olive text-sm">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : '12,450 km'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Fuel size={14} className="text-primary" /> Fuel Grade
                  </div>
                  <div className="font-extrabold text-olive text-sm">{vehicle.fuelType || 'High Altitude Diesel (HAD)'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <User size={14} className="text-primary" /> Assigned Commander
                  </div>
                  <div className="font-extrabold text-olive text-sm">{vehicle.assignedTo || 'Sub. Maj. Rajesh Sharma'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <ShieldCheck size={14} className="text-primary" /> QA Inspection
                  </div>
                  <div className="font-extrabold text-success text-sm">Passed (100% Fit)</div>
                </div>
              </div>
            </div>

            {/* Bottom Status Info */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1 font-semibold text-olive">
                <MapPin size={14} className="text-primary" /> Stationed at: 510 ABW Heavy Fleet Depot
              </span>
              <span>Classified Military Asset</span>
            </div>
          </div>

          {/* QR Code (lg:col-span-4) */}
          <div className="lg:col-span-4 h-full">
            <QRCodeDisplay value={vehicle.registrationNumber || id} />
          </div>
        </div>

        {/* Bottom Section: Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Vehicle Timeline + Attached Documents */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-primary" /> Vehicle Activity & Maintenance Log
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
                  <div className="text-xs text-gray-500 mt-1">Yesterday at 15:45 PM • Inspector: Capt. Ayushi Singh</div>
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

            <AssetDocuments assetId={vehicle.registrationNumber || id} />
          </div>

          {/* Right Column: Operating Cost Tracking */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
               <h3 className="text-lg font-bold text-olive mb-4">Operating Cost Tracking</h3>
               <div className="space-y-3">
                 <div className="flex justify-between items-center pb-2 border-b border-border text-xs">
                   <span className="text-gray-600 font-semibold">Initial Procurement Cost</span>
                   <span className="font-extrabold text-gray-800 font-mono">₹ 1,25,00,000</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-border text-xs">
                   <span className="text-gray-600 font-semibold">Overhaul & Repairs YTD</span>
                   <span className="font-extrabold text-gray-800 font-mono">₹ 4,25,000</span>
                 </div>
                 <div className="flex justify-between items-center pb-2 border-b border-border text-xs">
                   <span className="text-gray-600 font-semibold">Fuel & Lubricants YTD</span>
                   <span className="font-extrabold text-gray-800 font-mono">₹ 8,90,000</span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                   <span className="text-sm font-extrabold text-gray-800">Total Operating Cost</span>
                   <span className="font-black text-danger text-sm font-mono">₹ 1,38,15,000</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
