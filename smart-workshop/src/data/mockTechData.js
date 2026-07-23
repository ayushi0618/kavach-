export const techJobs = [
  { id: 'JOB-902', vehicle: 'ERG-102', type: 'TATRA', dept: 'Vehicle Repair Group', priority: 'High', assignedTime: '08:00 AM', expected: 'Today, 14:00', status: 'In Progress' },
  { id: 'JOB-905', vehicle: 'DZR-88', type: 'Dozer', dept: 'Fabrication', priority: 'Medium', assignedTime: '11:30 AM', expected: '24 Jul, 09:00', status: 'Pending' }
];

export const techVehicles = [
  { id: 'ERG-102', type: 'TATRA VVN 8x8', category: 'Heavy Overhaul', stage: 'Repair', progress: 45 },
  { id: 'DZR-88', type: 'BEML Dozer', category: 'Structural', stage: 'Inspection', progress: 10 }
];

export const techNotifications = [
  { id: 1, text: 'New Assignment: JOB-905', type: 'info' },
  { id: 2, text: 'Inventory Available: Tatra Oil Filter', type: 'success' },
  { id: 3, text: 'Deadline Warning: JOB-902 due at 14:00', type: 'warning' },
];

export const techHistory = [
  { id: 'REP-741', vehicle: 'JCB-12', date: '15 Jul 2026', issue: 'Hydraulic leak repair', status: 'Completed' },
  { id: 'REP-702', vehicle: 'PNK-04', date: '10 Jul 2026', issue: 'Electrical harness replacement', status: 'Completed' },
  { id: 'REP-650', vehicle: 'TATRA-55', date: '01 Jul 2026', issue: 'Engine overhaul phase 1', status: 'Completed' },
];

export const techSchedule = [
  { time: '08:00', title: 'Shift Start / Briefing', type: 'admin' },
  { time: '08:30', title: 'TATRA ERG-102 Repair', type: 'work' },
  { time: '13:00', title: 'Lunch Break', type: 'break' },
  { time: '14:00', title: 'QA Handover (ERG-102)', type: 'work' },
  { time: '14:30', title: 'Dozer DZR-88 Inspection', type: 'work' },
  { time: '17:00', title: 'Shift End', type: 'admin' }
];

export const mockAssetDetails = {
  assetId: 'TATRA-ERG-102',
  type: 'Heavy Transport Vehicle',
  lastInspection: '12 Jan 2026',
  upcomingMaintenance: '30 Aug 2026',
  assignedTech: 'Rahul Sharma (Current)',
  partsRequired: ['Oil Filter X2', 'Hydraulic Hose 5m', 'Brake Pads (Set)'],
  history: 'Engine rebuilt on Jan 2025. Minor suspension work on Oct 2025.'
};
