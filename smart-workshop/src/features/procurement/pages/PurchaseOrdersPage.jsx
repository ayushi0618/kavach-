import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, Download, FileText, CheckCircle, Clock } from 'lucide-react';
import PageTransition from '../../../components/animations/PageTransition';
import CreatePOModal from '../components/CreatePOModal';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/procurement');
      if (data && data.orders) setOrders(data.orders);
    } catch (err) {
      toast.error('Failed to load purchase orders');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Received': return 'bg-green-100 text-success border border-green-200';
      case 'Approved': return 'bg-blue-100 text-info border border-blue-200';
      case 'Ordered': return 'bg-purple-100 text-purple-600 border border-purple-200';
      case 'Requested':
      default: return 'bg-orange-100 text-warning border border-orange-200';
    }
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#F8F8F8] min-h-screen">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-olive">Purchase Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Track requested parts, monitor PO statuses, and log received materials.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2 shadow-sm">
              <Download size={16} /> Export
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-primary hover:bg-olive text-white rounded text-sm font-bold flex items-center gap-2 shadow transition-colors w-full md:w-auto justify-center"
            >
              <Plus size={16} /> New PO
            </button>
          </div>
        </div>

        <CreatePOModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchOrders} 
        />

        <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Search PO number, vendor, or item..." 
                className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <button className="px-3 py-2 bg-white border border-border rounded text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2 w-full md:w-auto justify-center">
              <Filter size={16} /> Filter Status
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-light text-olive font-semibold border-b border-border">
                <tr>
                  <th className="p-4">PO Number</th>
                  <th className="p-4">Vendor</th>
                  <th className="p-4">Item Details</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4 text-right">Total Cost</th>
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
                        <p>Loading orders...</p>
                      </div>
                    </td>
                  </tr>
                ) : currentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No purchase orders found.
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order, idx) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-bold text-gray-700">PO-{order.id.slice(0, 6).toUpperCase()}</td>
                      <td className="p-4 font-bold text-olive">{order.vendorName}</td>
                      <td className="p-4 text-gray-600 max-w-[200px] truncate" title={order.item}>{order.item}</td>
                      <td className="p-4 text-center font-bold">{order.quantity}</td>
                      <td className="p-4 text-right font-bold text-gray-700">${order.totalCost.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="p-1.5 text-info hover:bg-blue-50 rounded" title="View Document">
                            <FileText size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && totalPages > 1 && (
            <div className="p-4 border-t border-border flex items-center justify-between bg-gray-50">
              <span className="text-sm text-gray-600">
                Showing <span className="font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="font-bold">{filteredOrders.length}</span> orders
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
      </div>
    </PageTransition>
  );
}