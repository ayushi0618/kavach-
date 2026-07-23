import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../../../components/animations/PageTransition';
import MaintenanceForm from '../components/MaintenanceForm';
import { ArrowLeft } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await api.get(`/maintenance/${id}`);
        if (data && data.job) {
          setInitialData(data.job);
        }
      } catch (error) {
        toast.error('Failed to load maintenance job details');
        navigate('/admin/maintenance');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto bg-[#F8F8F8] min-h-screen">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-border">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold">Loading Ticket Details...</p>
          </div>
        ) : (
          <MaintenanceForm initialData={initialData} />
        )}
      </div>
    </PageTransition>
  );
}
