export const vehicles = [
  { id: 'ERG-102', type: 'TATRA', dept: 'VRG', tech: 'Rahul Sharma', status: 'In Progress', priority: 'High', expected: 'Today, 14:00' },
  { id: 'JCB-45', type: 'JCB', dept: 'Machine Shop', tech: 'Vikram Singh', status: 'Pending', priority: 'Medium', expected: 'Tomorrow, 10:00' },
  { id: 'PNK-09', type: 'Pinaka', dept: 'Testing', tech: 'Amit Patel', status: 'QA', priority: 'Critical', expected: 'Today, 16:30' },
  { id: 'AKS-22', type: 'Akash System', dept: 'Electrical', tech: 'Deepak Kumar', status: 'Completed', priority: 'Low', expected: '-' },
  { id: 'DZR-88', type: 'Dozer', dept: 'Fabrication', tech: 'Suresh N.', status: 'In Progress', priority: 'High', expected: '24 Jul, 09:00' }
];

export const departments = [
  { name: 'Vehicle Repair Group', jobs: 24, staff: 45, machines: 12, status: 'Green' },
  { name: 'Machine Shop', jobs: 18, staff: 30, machines: 20, status: 'Yellow' },
  { name: 'Electrical', jobs: 15, staff: 25, machines: 8, status: 'Green' },
  { name: 'Fabrication', jobs: 8, staff: 20, machines: 15, status: 'Green' },
  { name: 'QA & QC', jobs: 12, staff: 15, machines: 5, status: 'Red' },
];

export const chartData = [
  { name: 'Mon', capacity: 65, maintenance: 45 },
  { name: 'Tue', capacity: 70, maintenance: 50 },
  { name: 'Wed', capacity: 85, maintenance: 40 },
  { name: 'Thu', capacity: 90, maintenance: 60 },
  { name: 'Fri', capacity: 75, maintenance: 55 },
  { name: 'Sat', capacity: 60, maintenance: 35 },
  { name: 'Sun', capacity: 40, maintenance: 20 },
];

export const pieData = [
  { name: 'Engines', value: 400 },
  { name: 'Electrical', value: 300 },
  { name: 'Hydraulics', value: 300 },
  { name: 'Armor', value: 200 },
];

export const activities = [
  { id: 1, text: 'Technician Rahul assigned to Vehicle ERG-102', time: '10 mins ago', type: 'assignment' },
  { id: 2, text: 'Inventory updated: 50x Tatra filters received', time: '1 hour ago', type: 'inventory' },
  { id: 3, text: 'Maintenance completed for JCB-45', time: '2 hours ago', type: 'maintenance' },
  { id: 4, text: 'New Asset Registered: Skid Loader (SKD-01)', time: '3 hours ago', type: 'asset' },
];

export const notifications = [
  { id: 1, text: 'Low Inventory: Hydraulic Fluid (10L remaining)', type: 'danger' },
  { id: 2, text: 'Delayed Repair: Pinaka Launcher PNK-12', type: 'warning' },
  { id: 3, text: 'Upcoming Maintenance: 15 Vehicles tomorrow', type: 'info' },
];
