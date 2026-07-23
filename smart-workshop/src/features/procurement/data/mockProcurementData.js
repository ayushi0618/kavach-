export const procurementKPIs = [
  { label: 'Pending PRs', value: 12, type: 'warning' },
  { label: 'Open Tenders', value: 4, type: 'info' },
  { label: 'Approved Vendors', value: 48, type: 'primary' },
  { label: 'Active POs', value: 18, type: 'purple' },
  { label: 'Awaiting Delivery', value: 9, type: 'warning' },
  { label: 'Under Inspection', value: 3, type: 'info' },
  { label: 'Completed (YTD)', value: 145, type: 'success' },
  { label: 'Avg Proc Time', value: '18 Days', type: 'info' }
];

export const purchaseRequests = [
  { id: 'PR-2026-081', dept: 'Vehicle Repair', item: 'TATRA VVN Tyres', qty: 12, estCost: '₹4,50,000', status: 'Approved', priority: 'High', date: '15 Jul 2026' },
  { id: 'PR-2026-082', dept: 'Machine Shop', item: 'CNC Milling Bits', qty: 50, estCost: '₹75,000', status: 'Pending', priority: 'Normal', date: '18 Jul 2026' },
  { id: 'PR-2026-083', dept: 'Electrical', item: '24V Alternators', qty: 5, estCost: '₹1,20,000', status: 'Tender Stage', priority: 'High', date: '10 Jul 2026' },
];

export const tenders = [
  { id: 'TNDR-045', title: 'Supply of Heavy Vehicle Tyres', issued: '16 Jul 2026', closing: '30 Jul 2026', status: 'Open', eligible: 5 },
  { id: 'TNDR-044', title: 'Procurement of 24V Alternators', issued: '11 Jul 2026', closing: '25 Jul 2026', status: 'Under Evaluation', eligible: 3 },
];

export const vendors = [
  { id: 'VND-001', name: 'AutoParts India Ltd', gst: '27AABCT1234D1Z5', phone: '+91 98765 43210', rating: 4.8, status: 'Approved' },
  { id: 'VND-002', name: 'Defence Spares Co.', gst: '27XYZCT9876E2Z1', phone: '+91 91234 56789', rating: 4.2, status: 'Approved' },
  { id: 'VND-003', name: 'Global Tech Systems', gst: '09TESTC3333F4Z9', phone: '+91 99988 77766', rating: 3.5, status: 'Probation' },
];

export const purchaseOrders = [
  { id: 'PO-2026-112', vendor: 'AutoParts India Ltd', items: 'TATRA VVN Tyres', qty: 12, delivery: '05 Aug 2026', value: '₹4,45,000', status: 'Dispatched' },
  { id: 'PO-2026-110', vendor: 'Defence Spares Co.', items: '24V Alternators', qty: 5, delivery: '28 Jul 2026', value: '₹1,15,000', status: 'Delivered' },
];
