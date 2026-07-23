import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Keyboard, X, CheckCircle2 } from 'lucide-react';
import { mockAssetDetails } from '../../../data/mockTechData';

export default function QRScannerWidget() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const simulateScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult(mockAssetDetails);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full flex flex-col">
      <h2 className="text-lg font-bold text-olive mb-4">QR Asset Scanner</h2>
      
      {!result ? (
        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[250px]">
          {isScanning ? (
            <div className="w-48 h-48 border-2 border-primary rounded-lg relative overflow-hidden bg-gray-50">
              <motion.div 
                animate={{ y: [0, 192, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-full h-1 bg-primary absolute top-0 shadow-[0_0_8px_2px_rgba(75,93,58,0.6)]"
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary animate-pulse">
                Scanning...
              </div>
            </div>
          ) : (
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <Camera size={48} className="mb-2 opacity-50" />
              <span className="text-xs font-semibold">Camera Ready</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 w-full mt-6">
            <button onClick={simulateScan} disabled={isScanning} className="flex flex-col items-center justify-center p-2 rounded bg-gray-light hover:bg-gray-200 border border-border text-olive font-semibold text-xs disabled:opacity-50">
              <Camera size={18} className="mb-1" /> Open
            </button>
            <button disabled={isScanning} className="flex flex-col items-center justify-center p-2 rounded bg-gray-light hover:bg-gray-200 border border-border text-olive font-semibold text-xs disabled:opacity-50">
              <Upload size={18} className="mb-1" /> Upload
            </button>
            <button disabled={isScanning} className="flex flex-col items-center justify-center p-2 rounded bg-gray-light hover:bg-gray-200 border border-border text-olive font-semibold text-xs disabled:opacity-50">
              <Keyboard size={18} className="mb-1" /> Manual
            </button>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-success font-bold">
                <CheckCircle2 size={20} /> Scan Success
              </div>
              <button onClick={() => setResult(null)} className="text-gray-400 hover:text-danger"><X size={20} /></button>
            </div>
            
            <div className="bg-khaki-light/30 p-3 rounded border border-khaki-light mb-4">
              <h3 className="font-bold text-olive text-lg">{result.assetId}</h3>
              <p className="text-sm font-semibold text-gray-600">{result.type}</p>
            </div>

            <div className="space-y-2 text-sm flex-1 overflow-y-auto">
              <p><span className="font-semibold text-gray-500">Last Inspection:</span> {result.lastInspection}</p>
              <p><span className="font-semibold text-gray-500">Next Due:</span> {result.upcomingMaintenance}</p>
              <p><span className="font-semibold text-gray-500">Tech:</span> {result.assignedTech}</p>
              <div>
                <span className="font-semibold text-gray-500 block mb-1">Parts Required:</span>
                <ul className="list-disc pl-5 text-gray-700 text-xs font-medium">
                  {result.partsRequired.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
            <button className="w-full mt-4 bg-primary text-white py-2 rounded font-bold">Assign to Me</button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}