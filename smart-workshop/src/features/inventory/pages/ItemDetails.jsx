import PageTransition from '../../../components/animations/PageTransition';
import StockMovementTimeline from '../components/StockMovementTimeline';
import { ArrowLeft, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ItemDetails() {
  const navigate = useNavigate();

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
          <button className="flex items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm">
            <Edit size={16} /> Edit Item
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-border p-6 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-square bg-gray-light rounded-lg border border-border flex items-center justify-center text-4xl overflow-hidden relative">
              <span className="opacity-50">⚙️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-olive">TATRA Oil Filter</h1>
                <span className="bg-green-100 text-success px-3 py-1 rounded-full text-xs font-bold">Optimal</span>
              </div>
              <p className="text-sm font-bold text-gray-500 mb-6 font-mono">INV-1024</p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Category</div><div className="font-semibold text-gray-800">Consumables</div></div>
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Location</div><div className="font-semibold text-gray-800">Bay A, Shelf 12</div></div>
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Supplier</div><div className="font-semibold text-gray-800">AutoParts India Ltd</div></div>
                <div><div className="text-gray-500 text-xs uppercase font-bold mb-1">Stock Level</div><div className="font-semibold text-gray-800">45 (Min: 20, Max: 200)</div></div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
             <div className="bg-white rounded-lg shadow-sm border border-border p-6 text-center h-full flex flex-col justify-center">
                <h2 className="text-5xl font-bold text-olive mb-2">45</h2>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Units Available</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-6 overflow-hidden"><div className="bg-success h-full w-[22%]"></div></div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockMovementTimeline />
        </div>
      </div>
    </PageTransition>
  );
}