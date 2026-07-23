import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Printer, Edit, Eye, Trash2, QrCode } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AssetQRModal from './AssetQRModal';

export default function AssetTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQRAsset, setSelectedQRAsset] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      const { data } = await api.get('/assets', { params });
      if (data && data.assets) {
        setAssets(data.assets);
      }
    } catch (error) {
      toast.error('Failed to load assets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchAssets();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleExportCSV = () => {
    const csvRows = [
      ['510 Army Base Workshop, Meerut Cantt - Assets Registry'],
      ['Asset ID', 'Name', 'Category', 'Department', 'Status', 'QR Code'],
      ...assets.map(a => [
        a.qrCode || a.id,
        a.name,
        a.type || 'Equipment',
        a.department || 'Vehicle Repair Group (WSG)',
        a.status,
        a.qrCode || 'Active'
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', '510_ABW_Workshop_Assets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exported Assets registry to CSV');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await api.delete(`/assets/${id}`);
        toast.success('Asset deleted successfully');
        fetchAssets();
      } catch (error) {
        toast.error('Failed to delete asset');
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
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assets..." 
            className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="p-4">Asset ID</th>
              <th className="p-4">Name / Category</th>
              <th className="p-4">Department</th>
              <th className="p-4">Status</th>
              <th className="p-4">QR</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p>Loading workshop assets...</p>
                  </div>
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No assets found in the registry.
                </td>
              </tr>
            ) : (
              assets.map((asset, idx) => (
              <motion.tr 
                key={asset.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="p-4 font-bold text-olive">{asset.qrCode || asset.id}</td>
                <td className="p-4">
                  <div className="font-semibold text-gray-800">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.type}</div>
                </td>
                <td className="p-4 text-gray-600 font-semibold">{asset.department || 'Vehicle Repair Group (WSG)'}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    asset.status === 'Available' ? 'bg-green-100 text-success' :
                    asset.status === 'Under Repair' ? 'bg-blue-100 text-info' :
                    asset.status === 'Testing' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-warning'
                  }`}>
                    {asset.status}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => setSelectedQRAsset(asset)}
                    className="flex items-center gap-1 text-xs font-bold text-success hover:underline"
                  >
                    <QrCode size={14} /> Active
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(`/admin/assets/${asset.id}`)} className="p-1.5 text-info hover:bg-blue-50 rounded" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => navigate(`/admin/assets/edit/${asset.id}`)} className="p-1.5 text-warning hover:bg-orange-50 rounded" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => setSelectedQRAsset(asset)} className="p-1.5 text-gray-700 hover:bg-gray-200 rounded" title="Print / View QR">
                      <Printer size={18} />
                    </button>
                    <button onClick={() => handleDelete(asset.id)} className="p-1.5 text-danger hover:bg-red-50 rounded" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            )))}
          </tbody>
        </table>
      </div>

      <AssetQRModal asset={selectedQRAsset} onClose={() => setSelectedQRAsset(null)} />
      
      <div className="p-4 border-t border-border flex justify-between items-center text-sm text-gray-500 bg-gray-50">
        <div>Showing 1 to 5 of 12450 entries</div>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 bg-primary text-white rounded">1</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200">2</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200">3</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-gray-200 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}