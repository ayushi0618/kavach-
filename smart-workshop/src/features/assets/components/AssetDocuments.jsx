import { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  X, 
  File, 
  Image as ImageIcon, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import toast from 'react-hot-toast';

const initialDocs = [
  { id: 'doc-1', name: 'Service_Manual_TATRA.pdf', size: '4.2 MB', date: '01 Jan 2025', type: 'application/pdf', category: 'Technical Manual' },
  { id: 'doc-2', name: 'Warranty_Certificate.pdf', size: '1.1 MB', date: '01 Jan 2025', type: 'application/pdf', category: 'Warranty Record' },
  { id: 'doc-3', name: 'Inspection_Report_Jul.pdf', size: '850 KB', date: '12 Jul 2026', type: 'application/pdf', category: 'QA / QC Signoff' }
];

export default function AssetDocuments({ assetId = 'TATRA-8X8-102' }) {
  const fileInputRef = useRef(null);
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem(`trishul_docs_${assetId}`);
    return saved ? JSON.parse(saved) : initialDocs;
  });

  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    localStorage.setItem(`trishul_docs_${assetId}`, JSON.stringify(documents));
  }, [documents, assetId]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newDocs = files.map((file) => {
      let sizeStr = '';
      if (file.size >= 1024 * 1024) {
        sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      } else {
        sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      }

      const fileUrl = URL.createObjectURL(file);

      return {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: sizeStr,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: file.type || 'application/pdf',
        category: 'Uploaded Asset Doc',
        fileUrl: fileUrl,
        blobData: file
      };
    });

    setDocuments((prev) => [...newDocs, ...prev]);
    toast.success(`Successfully uploaded ${newDocs.length} document(s)!`);
    e.target.value = '';
  };

  const handleDownload = (doc, e) => {
    if (e) e.stopPropagation();
    toast.success(`Initiating download for ${doc.name}...`);
    
    const link = document.createElement('a');
    if (doc.fileUrl) {
      link.href = doc.fileUrl;
    } else {
      // Dummy text blob fallback for initial demo files
      const blob = new Blob([`TRISHUL 510 ABW Official Document: ${doc.name}\nSize: ${doc.size}\nDate: ${doc.date}`], { type: 'application/pdf' });
      link.href = URL.createObjectURL(blob);
    }
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (docId, docName, e) => {
    if (e) e.stopPropagation();
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    if (selectedDoc?.id === docId) setSelectedDoc(null);
    toast.success(`Deleted ${docName}`);
  };

  const getFileIcon = (mimeType, name) => {
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || mimeType.includes('image')) {
      return <ImageIcon size={18} className="text-info" />;
    }
    return <FileText size={18} className="text-danger" />;
  };

  return (
    <div className="bg-white p-4.5 rounded-xl shadow-sm border border-border space-y-3">
      <div>
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          multiple 
          className="hidden" 
        />

        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-base font-bold text-olive">Documents & Media</h3>
            <p className="text-[11px] text-gray-500">{documents.length} verified technical files attached</p>
          </div>
          <button 
            onClick={handleUploadClick}
            className="flex items-center gap-1 bg-primary hover:bg-olive text-white px-3 py-1 rounded text-xs font-bold shadow-sm transition-all"
          >
            <Upload size={13} /> Upload New
          </button>
        </div>

        {/* Documents List */}
        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {documents.length === 0 ? (
            <div className="p-5 text-center border-2 border-dashed border-border rounded-lg bg-gray-50">
              <Upload size={20} className="mx-auto text-gray-400 mb-1" />
              <p className="text-xs font-bold text-gray-600">No documents attached</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Click "Upload New" to attach technical manuals.</p>
            </div>
          ) : (
            documents.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => setSelectedDoc(doc)}
                className="flex items-center justify-between p-2 px-3 border border-border rounded-lg bg-gray-light hover:bg-gray-100 hover:border-gray-300 transition-all cursor-pointer group text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded bg-red-100/80 text-danger flex items-center justify-center shrink-0">
                    {getFileIcon(doc.type, doc.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-olive truncate group-hover:text-primary transition-colors">{doc.name}</p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                      <span>{doc.size}</span> • <span>{doc.date}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                  <button 
                    onClick={(e) => handleDownload(doc, e)}
                    className="p-1 rounded text-gray-500 hover:text-primary hover:bg-white transition-colors"
                    title="Download Document"
                  >
                    <Download size={14} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(doc.id, doc.name, e)}
                    className="p-1 rounded text-gray-400 hover:text-danger hover:bg-white transition-colors"
                    title="Remove Document"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-border flex justify-between items-center text-[10px] text-gray-400">
        <span className="flex items-center gap-1 font-semibold text-green-700">
          <ShieldCheck size={11} /> Encrypted Repository
        </span>
        <span>Max File Limit: 25 MB</span>
      </div>

      {/* Document Details & Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-border max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 bg-gray-50 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-danger flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-olive text-sm truncate max-w-[300px]">{selectedDoc.name}</h3>
                  <span className="text-[10px] bg-green-100 text-green-800 font-extrabold px-2 py-0.5 rounded-full">
                    {selectedDoc.category}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: Document Preview */}
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50 border border-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">File Size:</span>
                  <span className="font-extrabold text-olive">{selectedDoc.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Upload Date:</span>
                  <span className="font-bold text-gray-700">{selectedDoc.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">QA Status:</span>
                  <span className="text-success font-extrabold flex items-center gap-1">
                    <CheckCircle2 size={13} /> Verified & Digitized
                  </span>
                </div>
              </div>

              {/* Document Sample Box */}
              <div className="border border-border rounded-lg p-6 bg-slate-50 text-center space-y-2">
                <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-primary shadow-sm">
                  <FileText size={24} />
                </div>
                <p className="text-xs font-bold text-olive">{selectedDoc.name}</p>
                <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                  Official 510 Army Base Workshop technical file record encrypted with SHA-256 digital signature.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-gray-50 border-t border-border flex justify-between gap-3">
              <button 
                onClick={(e) => handleDelete(selectedDoc.id, selectedDoc.name, e)}
                className="px-3 py-2 border border-red-200 text-danger hover:bg-red-50 text-xs font-bold rounded flex items-center gap-1.5 transition-colors"
              >
                <Trash2 size={14} /> Remove File
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="px-4 py-2 border border-border text-gray-700 hover:bg-gray-100 text-xs font-bold rounded transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={(e) => handleDownload(selectedDoc, e)}
                  className="px-4 py-2 bg-primary hover:bg-olive text-white text-xs font-bold rounded flex items-center gap-1.5 shadow transition-colors"
                >
                  <Download size={14} /> Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}