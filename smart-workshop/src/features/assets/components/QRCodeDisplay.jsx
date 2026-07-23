import QRCode from 'react-qr-code';
import { Printer, Copy, Download } from 'lucide-react';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function QRCodeDisplay({ value = 'TATRA-ERG-102', size = 150 }) {
  const qrRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    try {
      const svg = qrRef.current.querySelector('svg');
      if (!svg) return;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        
        const downloadLink = document.createElement('a');
        downloadLink.download = `QR_${value}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
        toast.success('QR Code downloaded successfully');
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (err) {
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={() => { navigator.clipboard.writeText(value); toast.success('Copied!'); }} className="text-gray-400 hover:text-primary"><Copy size={18} /></button>
        <button onClick={handleDownload} className="text-gray-400 hover:text-primary"><Download size={18} /></button>
      </div>
      
      <div className="bg-white p-4 border-2 border-dashed border-gray-300 rounded-xl mb-6" ref={qrRef}>
        <QRCode 
          value={value} 
          size={size} 
          bgColor="#FFFFFF"
          fgColor="#36452F"
          level="H" 
        />
      </div>
      
      <h3 className="font-bold text-olive text-lg tracking-wider mb-1">{value}</h3>
      <p className="text-xs text-gray-500 mb-6 uppercase">Scan for complete history</p>
      
      <button onClick={handlePrint} className="w-full flex justify-center items-center gap-2 bg-khaki hover:bg-[#b5a378] text-olive font-bold py-2 rounded transition-colors">
        <Printer size={18} /> Print QR Tag
      </button>
    </div>
  );
}