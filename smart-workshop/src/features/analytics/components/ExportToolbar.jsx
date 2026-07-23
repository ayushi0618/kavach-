import { FileText, FileSpreadsheet, Download, Printer } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExportToolbar({ title = 'Workshop Report' }) {
  const downloadCSV = () => {
    const csvData = [
      ['510 Army Base Workshop, Meerut Cantt'],
      [`Report Name: ${title}`],
      [`Generated Date: ${new Date().toLocaleString()}`],
      [],
      ['Asset / Job ID', 'Department', 'Status', 'Technician', 'Date'],
      ['JOB-902', 'Vehicle Repair Group', 'Completed', 'Rahul Sharma', '20 Jul 2026'],
      ['JOB-903', 'Machine Shop', 'In Progress', 'Amit Patel', '20 Jul 2026'],
      ['JOB-904', 'Electrical Group', 'Testing / QA', 'Suresh N.', '21 Jul 2026'],
      ['JOB-905', 'Armament Group', 'Completed', 'Deepak Kumar', '21 Jul 2026'],
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${title} CSV`);
  };

  const downloadExcel = () => {
    const excelContent = `
      <html>
        <head><meta charset="utf-8"/><title>${title}</title></head>
        <body>
          <h2>510 Army Base Workshop, Meerut Cantt</h2>
          <h3>${title}</h3>
          <p>Generated: ${new Date().toLocaleString()}</p>
          <table border="1">
            <thead>
              <tr style="background-color: #1e293b; color: white;">
                <th>ID</th><th>Department</th><th>Status</th><th>Technician</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>JOB-902</td><td>Vehicle Repair Group</td><td>Completed</td><td>Rahul Sharma</td><td>20 Jul 2026</td></tr>
              <tr><td>JOB-903</td><td>Machine Shop</td><td>In Progress</td><td>Amit Patel</td><td>20 Jul 2026</td></tr>
              <tr><td>JOB-904</td><td>Electrical Group</td><td>Testing / QA</td><td>Suresh N.</td><td>21 Jul 2026</td></tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${title} Excel file`);
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to view report PDF');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>${title} - PDF Export</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #1e293b; }
            h1 { color: #2e3b2b; margin-bottom: 5px; }
            h3 { color: #556b2f; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
            th { background-color: #4b5320; color: white; }
            .header-bar { border-bottom: 3px solid #4b5320; padding-bottom: 10px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header-bar">
            <h1>Indian Army - Corps of EME</h1>
            <h3>510 Army Base Workshop, Meerut Cantt</h3>
          </div>
          <h2>${title}</h2>
          <p><strong>Date Generated:</strong> ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr><th>Job ID</th><th>Department</th><th>Status</th><th>Technician</th><th>Completion Date</th></tr>
            </thead>
            <tbody>
              <tr><td>JOB-902</td><td>Vehicle Repair Group</td><td>Completed</td><td>Rahul Sharma</td><td>20 Jul 2026</td></tr>
              <tr><td>JOB-903</td><td>Machine Shop</td><td>In Progress</td><td>Amit Patel</td><td>20 Jul 2026</td></tr>
              <tr><td>JOB-904</td><td>Electrical Group</td><td>Testing / QA</td><td>Suresh N.</td><td>21 Jul 2026</td></tr>
              <tr><td>JOB-905</td><td>Armament Group</td><td>Completed</td><td>Deepak Kumar</td><td>21 Jul 2026</td></tr>
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    toast.success(`Generated ${title} PDF document`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button 
        onClick={downloadPDF}
        className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-danger hover:bg-red-50 flex items-center gap-2 shadow-sm transition-colors"
      >
        <FileText size={16} /> PDF
      </button>
      <button 
        onClick={downloadExcel}
        className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-success hover:bg-green-50 flex items-center gap-2 shadow-sm transition-colors"
      >
        <FileSpreadsheet size={16} /> Excel
      </button>
      <button 
        onClick={downloadCSV}
        className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-blue-600 hover:bg-blue-50 flex items-center gap-2 shadow-sm transition-colors"
      >
        <Download size={16} /> CSV
      </button>
      <button 
        onClick={handlePrint}
        className="px-3 py-1.5 bg-white border border-border rounded text-sm font-bold text-gray-600 hover:bg-gray-100 flex items-center gap-2 shadow-sm transition-colors"
      >
        <Printer size={16} /> Print
      </button>
    </div>
  );
}