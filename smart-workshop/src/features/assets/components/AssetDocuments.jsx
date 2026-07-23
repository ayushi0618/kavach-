import { FileText, Upload, Download } from 'lucide-react';

const docs = [
  { name: 'Service_Manual_TATRA.pdf', size: '4.2 MB', date: '01 Jan 2025' },
  { name: 'Warranty_Certificate.pdf', size: '1.1 MB', date: '01 Jan 2025' },
  { name: 'Inspection_Report_Jul.pdf', size: '850 KB', date: '12 Jul 2026' }
];

export default function AssetDocuments() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-olive">Documents & Media</h3>
        <button className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
          <Upload size={14} /> Upload New
        </button>
      </div>

      <div className="space-y-3">
        {docs.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 border border-border rounded bg-gray-light hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-red-100 text-danger flex items-center justify-center">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-olive truncate w-48 sm:w-64">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
              </div>
            </div>
            <Download size={16} className="text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}