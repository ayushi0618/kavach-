export const allAssets = [
  { id: 'TATRA-ERG-102', name: 'TATRA VVN 8x8', category: 'Heavy Transport', dept: 'Vehicle Repair Group', tech: 'Rahul Sharma', status: 'In Repair', location: 'Bay 4', lastMaint: '12 Jan 2026', nextMaint: '30 Aug 2026', qrStatus: 'Active' },
  { id: 'JCB-45', name: 'JCB Backhoe', category: 'Earthmoving', dept: 'Machine Shop', tech: 'Vikram Singh', status: 'Pending', location: 'Yard B', lastMaint: '05 Feb 2026', nextMaint: '05 Sep 2026', qrStatus: 'Active' },
  { id: 'PNK-09', name: 'Pinaka System', category: 'Artillery', dept: 'Testing', tech: 'Amit Patel', status: 'QA', location: 'Testing Pad A', lastMaint: '22 Mar 2026', nextMaint: '22 Nov 2026', qrStatus: 'Printed' },
  { id: 'GEN-500K', name: '500KVA Generator', category: 'Electrical', dept: 'Electrical', tech: 'Deepak Kumar', status: 'Active', location: 'Main Substation', lastMaint: '10 Apr 2026', nextMaint: '10 Oct 2026', qrStatus: 'Active' },
  { id: 'DZR-88', name: 'BEML Dozer', category: 'Earthmoving', dept: 'Fabrication', tech: 'Suresh N.', status: 'In Repair', location: 'Bay 1', lastMaint: '01 Jun 2026', nextMaint: '01 Dec 2026', qrStatus: 'Pending' },
];

export const assetHistory = [
  { id: 1, event: 'Registered', date: '01 Jan 2025', time: '09:00 AM', user: 'Admin User', dept: 'HQ', remarks: 'Initial Procurement' },
  { id: 2, event: 'Transferred', date: '05 Jan 2025', time: '10:30 AM', user: 'Logistics Head', dept: 'Vehicle Repair Group', remarks: 'Deployed to active service' },
  { id: 3, event: 'Maintenance', date: '12 Jan 2026', time: '14:00 PM', user: 'Rahul Sharma', dept: 'VRG', remarks: 'Annual servicing completed' },
  { id: 4, event: 'Repair', date: '20 Jul 2026', time: '08:00 AM', user: 'Rahul Sharma', dept: 'VRG', remarks: 'Engine overhaul initiated' },
];

export const transferHistory = [
  { id: 1, from: 'HQ', to: 'Logistics', date: '01 Jan 2025', reason: 'Initial Deployment', responsible: 'Major V. Kumar' },
  { id: 2, from: 'Logistics', to: 'Vehicle Repair Group', date: '05 Jan 2025', reason: 'Operational Requirement', responsible: 'Capt. A. Singh' },
];

export const maintenanceHistory = [
  { id: 'M-101', date: '12 Jan 2026', type: 'Preventive', tech: 'Rahul Sharma', status: 'Completed', cost: '₹ 15,000' },
  { id: 'M-085', date: '12 Jan 2025', type: 'Preventive', tech: 'Rahul Sharma', status: 'Completed', cost: '₹ 12,500' },
];
