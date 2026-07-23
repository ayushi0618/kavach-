export const executiveKPIs = [
  { label: 'Total Assets', value: 450, type: 'primary' },
  { label: 'Operational Assets', value: 380, type: 'success' },
  { label: 'Under Repair', value: 55, type: 'warning' },
  { label: 'Waiting for Parts', value: 15, type: 'danger' },
  { label: 'Inventory Value', value: '₹12.5 Cr', type: 'info' },
  { label: 'Low Stock Alerts', value: 24, type: 'danger' },
  { label: 'Open Procurements', value: 18, type: 'purple' },
  { label: 'Avg Repair Time', value: '3.2 Days', type: 'info' },
  { label: 'Active Technicians', value: 112, type: 'success' },
  { label: 'Workshop Capacity', value: '82%', type: 'warning' }
];

export const utilizationData = [
  { name: 'Jan', utilization: 65, turnaround: 4.5 },
  { name: 'Feb', utilization: 72, turnaround: 4.2 },
  { name: 'Mar', utilization: 85, turnaround: 3.8 },
  { name: 'Apr', utilization: 78, turnaround: 3.5 },
  { name: 'May', utilization: 90, turnaround: 3.1 },
  { name: 'Jun', utilization: 82, turnaround: 3.2 }
];

export const departmentEfficiency = [
  { subject: 'Vehicle Repair', A: 90, fullMark: 100 },
  { subject: 'Machine Shop', A: 85, fullMark: 100 },
  { subject: 'Fabrication', A: 75, fullMark: 100 },
  { subject: 'Electrical', A: 95, fullMark: 100 },
  { subject: 'Tool Room', A: 70, fullMark: 100 },
  { subject: 'QA / QC', A: 98, fullMark: 100 }
];

export const maintenanceTrends = [
  { name: 'W1', preventive: 20, corrective: 40, emergency: 5 },
  { name: 'W2', preventive: 25, corrective: 35, emergency: 2 },
  { name: 'W3', preventive: 30, corrective: 45, emergency: 8 },
  { name: 'W4', preventive: 40, corrective: 30, emergency: 3 }
];

export const vehicleReadinessData = [
  { name: 'Combat Ready', value: 380, fill: '#2E7D32' },
  { name: 'Under Repair', value: 55, fill: '#E69A8D' },
  { name: 'Waiting for Parts', value: 15, fill: '#C0392B' },
  { name: 'Testing & QA', value: 20, fill: '#C8B68A' }
];

export const technicianLeaderboard = [
  { id: 1, name: 'Rahul Sharma', dept: 'Vehicle Repair', jobs: 45, avgTime: '2.1 Days', eff: 98 },
  { id: 2, name: 'Amit Kumar', dept: 'Electrical', jobs: 38, avgTime: '1.5 Days', eff: 95 },
  { id: 3, name: 'Vikram Singh', dept: 'Machine Shop', jobs: 32, avgTime: '3.4 Days', eff: 88 },
  { id: 4, name: 'Deepak Verma', dept: 'Vehicle Repair', jobs: 28, avgTime: '2.8 Days', eff: 85 }
];
