export const inventoryKPIs = [
  { label: 'Total Items', value: 8450 },
  { label: 'Available', value: 7210 },
  { label: 'Issued', value: 1140 },
  { label: 'Low Stock', value: 85 },
  { label: 'Out of Stock', value: 15 },
  { label: 'Pending POs', value: 12 },
  { label: 'Incoming', value: 340 },
  { label: 'Capacity', value: '78%' }
];

export const allInventory = [
  { id: 'INV-1024', name: 'TATRA Oil Filter', category: 'Consumables', dept: 'Vehicle Repair', location: 'Bay A, Shelf 12', available: 45, min: 20, max: 200, supplier: 'AutoParts India Ltd', status: 'Optimal' },
  { id: 'INV-1088', name: 'Hydraulic Hose 5m', category: 'Hydraulics', dept: 'Vehicle Repair', location: 'Bay C, Shelf 04', available: 5, min: 10, max: 50, supplier: 'FluidTech Solutions', status: 'Low Stock' },
  { id: 'INV-2041', name: '12V Lead Acid Battery', category: 'Electrical', dept: 'Electrical', location: 'Bay B, Shelf 02', available: 0, min: 5, max: 30, supplier: 'Exide Defense', status: 'Out of Stock' },
  { id: 'INV-3090', name: 'Welding Electrodes (Box)', category: 'Materials', dept: 'Welding', location: 'Bay D, Shelf 01', available: 120, min: 50, max: 500, supplier: 'MetalWorks Inc', status: 'Optimal' },
];

export const lowStockAlerts = [
  { id: 1, item: '12V Lead Acid Battery', current: 0, required: 5, status: 'Critical', ETA: '24 Jul (Pending)' },
  { id: 2, item: 'Hydraulic Hose 5m', current: 5, required: 10, status: 'Warning', ETA: '22 Jul' },
  { id: 3, item: 'Brake Pads (Set)', current: 8, required: 15, status: 'Warning', ETA: 'Not Ordered' },
];

export const suppliersList = [
  { id: 'SUP-01', name: 'AutoParts India Ltd', contact: '+91 98765 43210', supplied: 124, activePOs: 3, rating: 4.8 },
  { id: 'SUP-02', name: 'Exide Defense', contact: '+91 98765 11223', supplied: 45, activePOs: 1, rating: 4.9 },
  { id: 'SUP-03', name: 'FluidTech Solutions', contact: '+91 91234 56789', supplied: 88, activePOs: 0, rating: 4.2 },
];

export const stockMovement = [
  { id: 1, action: 'Issued', date: '20 Jul 2026', time: '09:15 AM', user: 'Admin', tech: 'Rahul Sharma', qty: 2, reason: 'Used for JOB-902 (TATRA ERG-102)' },
  { id: 2, action: 'Received', date: '18 Jul 2026', time: '14:30 PM', user: 'Storekeeper', tech: 'Vendor Delivery', qty: 50, reason: 'PO-2026-074 Fulfillment' },
  { id: 3, action: 'Returned', date: '15 Jul 2026', time: '16:00 PM', user: 'Admin', tech: 'Amit Patel', qty: 1, reason: 'Defective piece returned' },
];
