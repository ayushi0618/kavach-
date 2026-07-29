import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Printer, Edit, Eye, Trash2, QrCode } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AssetQRModal from './AssetQRModal';
import { allAssets } from '../data/mockAssetData';

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
      if (data && data.assets && data.assets.length > 0) {
        setAssets(data.assets);
      } else {
        const filtered = allAssets.filter(a => 
          !searchTerm || 
          a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setAssets(filtered);
      }
    } catch (error) {
      console.warn('Backend API offline, loading mock assets fallback data', error);
      const filtered = allAssets.filter(a => 
        !searchTerm || 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAssets(filtered);
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
        a.type || a.category || 'Equipment',
        a.department || a.dept || 'Vehicle Repair Group (WSG)',
        a.status,
        a.qrCode || 'Active'
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `510_ABW_Assets_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Assets Registry CSV downloaded successfully');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      {/* Header Actions */}
      <div className="p-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search assets by ID, name, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 border border-border rounded text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors bg-white shadow-xs"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 border border-border rounded text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors bg-white shadow-xs"
          >
            <Printer size={14} /> Print List
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-khaki-light/40 border-b border-border text-[11px] font-extrabold text-olive uppercase tracking-wider">
              <th className="py-3 px-4">
                <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
              </th>
              <th className="py-3 px-4">Asset ID</th>
              <th className="py-3 px-4">Name / Category</th>
              <th className="py-3 px-4">Department / Bay</th>
              <th className="py-3 px-4">Assigned Tech</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">QR Code</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs">
            {loading ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500 font-medium">
                  Loading Workshop Assets Registry...
                </td>
              </tr>
            ) : assets.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500 font-medium">
                  No assets found matching your criteria.
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-primary">
                    {asset.qrCode || asset.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{asset.name}</div>
                    <div className="text-[10px] text-gray-500">{asset.type || asset.category || 'Equipment'}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <div className="font-semibold">{asset.department || asset.dept || 'Vehicle Repair Group'}</div>
                    <div className="text-[10px] text-gray-400">{asset.location || 'Bay Area'}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {asset.tech || 'Sub. Maj. Rajesh Sharma'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      asset.status === 'Active' || asset.status === 'Operational' ? 'bg-green-100 text-success' :
                      asset.status === 'In Repair' || asset.status === 'Maintenance' ? 'bg-amber-100 text-warning' :
                      'bg-blue-100 text-info'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedQRAsset(asset)}
                      className="p-1.5 bg-gray-100 hover:bg-khaki-light text-olive rounded transition-colors"
                      title="View & Print QR Code"
                    >
                      <QrCode size={16} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/admin/assets/${asset.id}`)}
                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-primary transition-colors"
                        title="View Asset Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/assets/edit/${asset.id}`)}
                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-olive transition-colors"
                        title="Edit Asset"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* QR Modal */}
      {selectedQRAsset && (
        <AssetQRModal
          asset={selectedQRAsset}
          onClose={() => setSelectedQRAsset(null)}
        />
      )}
    </div>
  );
}