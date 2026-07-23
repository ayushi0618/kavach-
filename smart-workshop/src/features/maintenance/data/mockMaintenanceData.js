export const maintenanceKPIs = [
  { label: "Today's Jobs", value: 24, type: 'info' },
  { label: 'Pending', value: 8, type: 'warning' },
  { label: 'In Progress', value: 12, type: 'primary' },
  { label: 'Testing / QA', value: 4, type: 'purple' },
  { label: 'Completed', value: 45, type: 'success' },
  { label: 'Delayed', value: 2, type: 'danger' },
  { label: 'Avg Repair Time', value: '4.2 Hrs', type: 'info' },
  { label: 'Vehicle Uptime', value: '92%', type: 'success' }
];

export const allJobs = [
  { id: 'JOB-902', asset: 'TATRA-ERG-102', vehicle: 'TATRA VVN 8x8', priority: 'High', status: 'In Progress', dept: 'Vehicle Repair', tech: 'Rahul Sharma', created: '20 Jul 2026', due: '21 Jul 2026' },
  { id: 'JOB-903', asset: 'JCB-45', vehicle: 'JCB Backhoe', priority: 'Medium', status: 'Pending', dept: 'Machine Shop', tech: 'Unassigned', created: '20 Jul 2026', due: '22 Jul 2026' },
  { id: 'JOB-904', asset: 'PNK-09', vehicle: 'Pinaka System', priority: 'Critical', status: 'QA', dept: 'Testing', tech: 'Amit Patel', created: '19 Jul 2026', due: '20 Jul 2026' },
  { id: 'JOB-905', asset: 'GEN-500K', vehicle: '500KVA Generator', priority: 'Low', status: 'Completed', dept: 'Electrical', tech: 'Deepak Kumar', created: '18 Jul 2026', due: '19 Jul 2026' },
  { id: 'JOB-906', asset: 'DZR-88', vehicle: 'BEML Dozer', priority: 'High', status: 'Waiting Parts', dept: 'Fabrication', tech: 'Suresh N.', created: '19 Jul 2026', due: '24 Jul 2026' },
];

export const jobTimeline = [
  { id: 1, event: 'Ticket Created', date: '20 Jul 2026', time: '08:00 AM', user: 'Admin User', remarks: 'Engine misfire reported.' },
  { id: 2, event: 'Technician Assigned', date: '20 Jul 2026', time: '08:15 AM', user: 'Admin User', remarks: 'Assigned to Rahul Sharma.' },
  { id: 3, event: 'Inspection Started', date: '20 Jul 2026', time: '08:30 AM', user: 'Rahul Sharma', remarks: 'Initial diagnostic scan.' },
  { id: 4, event: 'Parts Issued', date: '20 Jul 2026', time: '09:15 AM', user: 'Storekeeper', remarks: 'Oil Filter x2, Hydraulic Hose.' },
  { id: 5, event: 'Repair Started', date: '20 Jul 2026', time: '09:30 AM', user: 'Rahul Sharma', remarks: 'Replacing worn parts.' },
];

export const mockPartsUsed = [
  { id: 'INV-1024', name: 'TATRA Oil Filter', qty: 2, issuedBy: 'Storekeeper', date: '20 Jul 2026' },
  { id: 'INV-1088', name: 'Hydraulic Hose 5m', qty: 1, issuedBy: 'Storekeeper', date: '20 Jul 2026' },
];
