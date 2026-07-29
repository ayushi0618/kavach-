import PageTransition from '../../../components/animations/PageTransition';
import QRCodeDisplay from '../components/QRCodeDisplay';
import AssetTimeline from '../components/AssetTimeline';
import AssetDocuments from '../components/AssetDocuments';
import TransferHistoryTable from '../components/TransferHistoryTable';
import { 
  ArrowLeft, 
  Edit, 
  Tag, 
  Building2, 
  Factory, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Wrench 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function AssetDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const { data } = await api.get(`/assets/${id}`);
        if (data && data.asset) {
          setAsset(data.asset);
        }
      } catch (error) {
        toast.error('Failed to load asset details');
        navigate('/admin/assets');
      } finally {
        setLoading(false);
      }
    };
    fetchAsset();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-light">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold text-sm">Loading Asset & Equipment Details...</p>
      </div>
    );
  }

  if (!asset) return null;

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3.5 py-2 rounded-lg border border-border shadow-sm"
          >
            <ArrowLeft size={16} /> Back to Assets List
          </button>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/admin/assets/edit/${id}`)} 
              className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-5 py-2 rounded-lg font-bold transition-all shadow-sm text-sm"
            >
              <Edit size={16} /> Edit Asset Details
            </button>
          </div>
        </div>

        {/* Top Section: Equal Height Core Details & QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Core Asset Overview (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-border p-6 flex flex-col justify-between h-full">
            <div>
              {/* Asset Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-olive text-white flex items-center justify-center shadow-md shrink-0">
                    <Truck size={28} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-olive capitalize tracking-tight">{asset.name}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded border border-border">
                        ID: {asset.qrCode || asset.id}
                      </span>
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        <ShieldCheck size={14} /> Registered Asset
                      </span>
                    </div>
                  </div>
                </div>

                <span className={`self-start sm:self-auto px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  asset.status === 'Available' || asset.status === 'Active'
                    ? 'bg-green-100 text-success border border-green-200' 
                    : 'bg-orange-100 text-warning border border-orange-200'
                }`}>
                  {asset.status}
                </span>
              </div>

              {/* Structured Metadata Tiles (3x2 Grid) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Tag size={14} className="text-primary" /> Category
                  </div>
                  <div className="font-extrabold text-olive text-sm capitalize">{asset.type}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Building2 size={14} className="text-primary" /> Department
                  </div>
                  <div className="font-extrabold text-olive text-sm">{asset.departmentId || 'Unassigned (HQ)'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Factory size={14} className="text-primary" /> Manufacturer
                  </div>
                  <div className="font-extrabold text-olive text-sm">{asset.manufacturer || 'BEML / Ordnance'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <MapPin size={14} className="text-primary" /> Garrison Location
                  </div>
                  <div className="font-extrabold text-olive text-sm">{asset.location || 'Bay 04 - WSG Workshop'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Calendar size={14} className="text-primary" /> Commission Date
                  </div>
                  <div className="font-extrabold text-olive text-sm">{asset.purchaseDate || '15 Jan 2024'}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-gray-50 border border-border">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase mb-1">
                    <Clock size={14} className="text-primary" /> Maint. Interval
                  </div>
                  <div className="font-extrabold text-olive text-sm">{asset.maintenanceFreq || 6} Months Cycle</div>
                </div>
              </div>
            </div>

            {/* Bottom Status Banner */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1 font-semibold text-olive">
                <Wrench size={14} className="text-primary" /> Operational Readiness: 100% Fit
              </span>
              <span>Unit: 510 Army Base Workshop (EME)</span>
            </div>
          </div>

          {/* QR Code Tag Card (lg:col-span-4) */}
          <div className="lg:col-span-4 h-full">
            <QRCodeDisplay value={asset.qrCode || asset.id || 'TATRA-ERG-102'} />
          </div>
        </div>

        {/* Bottom Section: Balanced Equal Height Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Transfer History + Attached Documents */}
          <div className="lg:col-span-7 space-y-6">
            <TransferHistoryTable />
            <AssetDocuments assetId={asset.qrCode || asset.id} />
          </div>

          {/* Right Column: Asset Lifecycle Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <AssetTimeline />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}