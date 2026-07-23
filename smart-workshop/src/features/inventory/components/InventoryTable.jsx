import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Plus, Edit, Eye } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function InventoryTable() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/inventory');
      if (data && data.inventory) setItems(data.inventory);
    } catch (err) {
      toast.error('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 15;

  const filteredItems = items.filter(item => 
    (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.category?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between md:items-center gap-4 bg-gray-50">
        <div className="relative w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search inventory..." 
            className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
          <button onClick={() => navigate('/admin/inventory/new')} className="px-4 py-2 bg-primary hover:bg-olive text-white rounded text-sm font-bold flex items-center gap-2 shadow transition-colors">
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="p-4">Item Code</th>
              <th className="p-4">Name / Category</th>
              <th className="p-4">Location</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p>Loading inventory...</p>
                  </div>
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">
                  No inventory items found.
                </td>
              </tr>
            ) : (
              currentItems.map((item, idx) => (
              <motion.tr 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                <td className="p-4 font-bold text-gray-700">{item.sku || item.id}</td>
                <td className="p-4">
                  <div className="font-bold text-olive truncate max-w-[200px]" title={item.name}>{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </td>
                <td className="p-4 text-gray-600">{item.location || 'N/A'}</td>
                <td className="p-4 text-center font-bold">
                  {item.quantity} / {item.reorderLevel}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    item.quantity > item.reorderLevel ? 'bg-green-100 text-success border border-green-200' :
                    item.quantity === 0 ? 'bg-red-100 text-danger border border-red-200' :
                    'bg-orange-100 text-warning border border-orange-200'
                  }`}>
                    {item.quantity > item.reorderLevel ? 'Optimal' : item.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(`/admin/inventory/${item.id}`)} className="p-1.5 text-info hover:bg-blue-50 rounded" title="View Details">
                      <Eye size={18} />
                    </button>
                    <button className="p-1.5 text-warning hover:bg-orange-50 rounded" title="Edit">
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            )))}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between bg-gray-50">
          <span className="text-sm text-gray-600">
            Showing <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> of <span className="font-bold">{filteredItems.length}</span> items
          </span>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1 border border-border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm font-bold px-3 py-1 bg-white border border-border rounded text-olive">
              {currentPage} / {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1 border border-border rounded text-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}