import PageTransition from '../../../components/animations/PageTransition';
import QRCodeDisplay from '../components/QRCodeDisplay';
import AssetTimeline from '../components/AssetTimeline';
import AssetDocuments from '../components/AssetDocuments';
import TransferHistoryTable from '../components/TransferHistoryTable';
import { ArrowLeft, Edit } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F8F8]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold">Loading Asset Details...</p>
      </div>
    );
  }

  if (!asset) return null;

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
          <button onClick={() => navigate(`/admin/assets/edit/${id}`)} className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm">
            <Edit size={16} /> Edit Details
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Core Details */}
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-border p-6 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-gray-light rounded-lg border border-border flex items-center justify-center text-4xl overflow-hidden relative group">
              <span className="opacity-50 group-hover:scale-110 transition-transform">🚜</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-olive">{asset.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${asset.status === 'Available' ? 'bg-green-100 text-success' : 'bg-orange-100 text-warning'}`}>{asset.status}</span>
              </div>
              <p className="text-sm font-bold text-gray-500 mb-6 font-mono">{asset.qrCode || asset.id}</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Category</div>
                  <div className="font-semibold text-gray-800">{asset.type}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Department</div>
                  <div className="font-semibold text-gray-800">{asset.departmentId || 'Unassigned'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Manufacturer</div>
                  <div className="font-semibold text-gray-800">{asset.manufacturer || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Location</div>
                  <div className="font-semibold text-gray-800">{asset.location || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Purchase Date</div>
                  <div className="font-semibold text-gray-800">{asset.purchaseDate || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Maint. Freq.</div>
                  <div className="font-semibold text-gray-800">{asset.maintenanceFreq || 6} Months</div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="lg:col-span-4">
            <QRCodeDisplay value="TATRA-ERG-102" />
          </div>
        </div>

        {/* Timelines and Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 space-y-6">
            <TransferHistoryTable />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <AssetTimeline />
            <AssetDocuments />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}