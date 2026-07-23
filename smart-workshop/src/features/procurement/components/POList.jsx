import { useState, useEffect } from 'react';
import { FileText, Download, Eye, X, Printer, CheckCircle } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function POList() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPO, setSelectedPO] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/procurement');
      if (data && data.orders) {
        setPurchaseOrders(data.orders);
      }
    } catch (err) {
      toast.error('Failed to load purchase orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = (po) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to download invoice');
      return;
    }
    const poNum = `PO-${(po.id || '').toString().slice(0, 6).toUpperCase()}`;
    printWindow.document.write(`
      <html>
        <head>
          <title>Purchase Order Invoice - ${poNum}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
            .header { border-bottom: 3px solid #4b5320; padding-bottom: 15px; margin-bottom: 25px; flex justify-between; }
            h1 { color: #2e3b2b; margin: 0; }
            h3 { color: #556b2f; margin: 5px 0 0 0; }
            .details { margin-bottom: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; }
            th { background-color: #4b5320; color: white; }
            .total { text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold; }
            .stamp { border: 2px solid #16a34a; color: #16a34a; font-weight: bold; display: inline-block; padding: 8px 16px; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Indian Army - Corps of EME</h1>
              <h3>510 Army Base Workshop, Meerut Cantt</h3>
            </div>
          </div>
          <h2>PURCHASE ORDER / INVOICE</h2>
          <div class="details">
            <div>
              <p><strong>PO Number:</strong> ${poNum}</p>
              <p><strong>Vendor Name:</strong> ${po.vendorName}</p>
              <p><strong>Status:</strong> ${po.status || 'Approved'}</p>
            </div>
            <div>
              <p><strong>Date Issued:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Delivery Destination:</strong> Central Store, 510 ABW</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Estimated Unit Cost</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${po.item}</td>
                <td>${po.quantity}</td>
                <td>₹${Math.round((po.totalCost || 5000) / (po.quantity || 1))}</td>
                <td>₹${(po.totalCost || 5000).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">
            Total Order Value: ₹${(po.totalCost || 5000).toLocaleString()}
          </div>
          <div class="stamp">✓ OFFICIAL EME PURCHASE ORDER APPROVED</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    toast.success(`Generated Invoice for ${poNum}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden relative">
      <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-olive">Active Purchase Orders</h3>
        <span className="text-xs font-bold text-gray-500">{purchaseOrders.length} Total POs</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-light text-olive font-semibold border-b border-border">
            <tr>
              <th className="p-4">PO Number</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Items</th>
              <th className="p-4">Value</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                    <p>Loading purchase orders...</p>
                  </div>
                </td>
              </tr>
            ) : purchaseOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No purchase orders found.
                </td>
              </tr>
            ) : (
              purchaseOrders.map((po, idx) => {
                const poNum = `PO-${(po.id || '').toString().slice(0, 6).toUpperCase()}`;
                return (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-700">{poNum}</td>
                    <td className="p-4 font-semibold text-olive">{po.vendorName}</td>
                    <td className="p-4 text-gray-600">{po.item} ({po.quantity}x)</td>
                    <td className="p-4 font-bold text-gray-800">₹{(po.totalCost || 5000).toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        po.status === 'Received' ? 'bg-green-100 text-success' : 'bg-orange-100 text-warning'
                      }`}>{po.status || 'Ordered'}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setSelectedPO(po)}
                          className="p-1.5 text-info hover:bg-blue-50 rounded transition-colors" 
                          title="View Invoice Details"
                        >
                          <Eye size={16}/>
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(po)}
                          className="p-1.5 text-gray-700 hover:bg-gray-200 rounded transition-colors" 
                          title="Download PO Invoice Document"
                        >
                          <Download size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PO View Modal */}
      {selectedPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setSelectedPO(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={20} />
            </button>
            <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
              <FileText className="text-primary" size={24} />
              <div>
                <h3 className="font-bold text-olive text-lg">Purchase Order Invoice</h3>
                <p className="text-xs text-gray-500">PO-{selectedPO.id?.slice(0, 6).toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-gray-500">Vendor:</span>
                <span className="font-bold text-gray-800">{selectedPO.vendorName}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-gray-500">Item Requisition:</span>
                <span className="font-bold text-gray-800">{selectedPO.item} ({selectedPO.quantity} units)</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-gray-500">Total PO Value:</span>
                <span className="font-bold text-primary text-base">₹{(selectedPO.totalCost || 5000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-gray-500">Delivery Status:</span>
                <span className="font-bold text-success flex items-center gap-1"><CheckCircle size={14} /> {selectedPO.status || 'Approved'}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => handleDownloadInvoice(selectedPO)} 
                className="flex-1 bg-primary text-white py-2.5 rounded font-bold text-sm shadow hover:bg-olive transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} /> Download Invoice PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}