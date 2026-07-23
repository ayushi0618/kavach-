import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../../../components/animations/PageTransition';
import AssetForm from '../components/AssetForm';
import { ArrowLeft } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function EditAsset() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const { data } = await api.get(`/assets/${id}`);
        if (data && data.asset) {
          setInitialData(data.asset);
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

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <button 
          onClick={() => navigate('/admin/assets')}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Assets
        </button>
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-border">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold">Loading Asset Details...</p>
          </div>
        ) : (
          <AssetForm initialData={initialData} />
        )}
      </div>
    </PageTransition>
  );
}
