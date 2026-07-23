import { useState } from 'react';
import PageTransition from '../../../components/animations/PageTransition';
import AssetTable from '../components/AssetTable';
import VehicleTable from '../components/VehicleTable';
import RegisterVehicleModal from '../components/RegisterVehicleModal';
import { Plus, Package, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AssetList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assets'); // 'assets' or 'vehicles'
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Assets & Vehicles Registry</h1>
            <p className="text-sm text-gray-500 mt-1">Complete registry of all workshop equipment and transport vehicles.</p>
          </div>
          
          <div className="flex items-center gap-2">
            {activeTab === 'assets' ? (
              <button 
                onClick={() => navigate('/admin/assets/new')}
                className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm"
              >
                <Plus size={16} /> Register Asset
              </button>
            ) : (
              <button 
                onClick={() => setIsVehicleModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-olive text-white px-4 py-2 rounded font-bold transition-colors shadow-sm text-sm cursor-pointer"
              >
                <Plus size={16} /> Register Vehicle
              </button>
            )}
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex items-center gap-4 border-b border-border mb-6">
          <button 
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 font-bold transition-colors ${
              activeTab === 'assets' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Package size={18} /> Workshop Assets
          </button>
          <button 
            onClick={() => setActiveTab('vehicles')}
            className={`flex items-center gap-2 pb-3 px-2 border-b-2 font-bold transition-colors ${
              activeTab === 'vehicles' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Truck size={18} /> Transport Vehicles
          </button>
        </div>
        
        {/* Render Active Table */}
        {activeTab === 'assets' ? <AssetTable /> : <VehicleTable />}

        <RegisterVehicleModal 
          isOpen={isVehicleModalOpen} 
          onClose={() => setIsVehicleModalOpen(false)}
          onSuccess={() => setActiveTab('vehicles')}
        />
        
      </div>
    </PageTransition>
  );
}