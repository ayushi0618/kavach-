import QRCode from 'react-qr-code';
import { X, Printer, Download, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AssetQRModal({ asset, onClose }) {
  if (!asset) return null;

  const qrText = JSON.stringify({
    assetId: asset.id,
    qrCode: asset.qrCode || `QR-${asset.id.slice(0, 6)}`,
    name: asset.name,
    dept: asset.department || 'Vehicle Repair Group (WSG)',
    unit: '510 Army Base Workshop, Meerut Cantt'
  });

  const handlePrintQR = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>QR Tag - ${asset.name}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
            .box { border: 3px solid #4b5320; padding: 20px; display: inline-block; border-radius: 8px; }
            h2 { color: #2e3b2b; margin-bottom: 5px; }
            h4 { color: #556b2f; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>510 ARMY BASE WORKSHOP</h2>
            <h4>CORPS OF EME - MEERUT CANTT</h4>
            <div id="qr-container"></div>
            <p><strong>ASSET:</strong> ${asset.name}</p>
            <p><strong>ID:</strong> ${asset.qrCode || asset.id}</p>
            <p><strong>DEPT:</strong> ${asset.department || 'WSG'}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    toast.success('Initiated QR Label printing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 text-center relative border border-border">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>

        <div className="mb-4">
          <span className="text-[10px] font-bold bg-khaki-light text-olive px-2.5 py-1 rounded-full uppercase tracking-wider">
            510 ABW Official Asset Tag
          </span>
          <h3 className="font-bold text-olive text-lg mt-2">{asset.name}</h3>
          <p className="text-xs text-gray-500">{asset.type || 'Equipment Asset'}</p>
        </div>

        <div className="bg-white p-4 border border-border rounded-lg inline-block shadow-inner mb-4">
          <QRCode value={qrText} size={160} />
        </div>

        <div className="text-xs space-y-1 mb-6 text-gray-600 bg-gray-50 p-3 rounded border border-border">
          <p><strong>Tag Code:</strong> <span className="text-primary font-bold">{asset.qrCode || asset.id}</span></p>
          <p><strong>Department:</strong> {asset.department || 'Vehicle Repair Group (WSG)'}</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handlePrintQR} 
            className="flex-1 bg-primary text-white py-2 rounded font-bold text-xs shadow hover:bg-olive transition-colors flex items-center justify-center gap-1"
          >
            <Printer size={14} /> Print QR Label
          </button>
        </div>
      </div>
    </div>
  );
}
