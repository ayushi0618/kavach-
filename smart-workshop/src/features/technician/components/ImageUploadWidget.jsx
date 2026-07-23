import { useState } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';

export default function ImageUploadWidget() {
  const [images, setImages] = useState({ before: null, during: null, after: null });

  const handleFile = (e, stage) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages(prev => ({ ...prev, [stage]: url }));
    }
  };

  const clearImage = (stage) => {
    setImages(prev => ({ ...prev, [stage]: null }));
  };

  const UploadBox = ({ label, stage }) => (
    <div className="flex-1 min-w-[120px]">
      <div className="text-xs font-bold text-gray-500 mb-2 text-center uppercase">{label}</div>
      {images[stage] ? (
        <div className="relative aspect-square rounded border border-border overflow-hidden bg-gray-100 group">
          <img src={images[stage]} alt={label} className="w-full h-full object-cover" />
          <button 
            onClick={() => clearImage(stage)}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 hover:border-primary transition-colors cursor-pointer">
          <ImagePlus size={24} className="mb-2" />
          <span className="text-[10px] font-bold text-center px-2">Tap to Upload</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, stage)} />
        </label>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <h3 className="text-lg font-bold text-olive mb-4 flex items-center gap-2">
        <Camera size={18} /> Repair Documentation
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <UploadBox label="Before" stage="before" />
        <UploadBox label="During" stage="during" />
        <UploadBox label="After" stage="after" />
      </div>
      <button className="w-full mt-4 bg-primary text-white py-2.5 rounded font-bold text-sm shadow hover:shadow-md transition-shadow">
        Submit Documentation
      </button>
    </div>
  );
}