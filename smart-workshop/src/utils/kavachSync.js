// Centralized Real-time Data Synchronization Store for TRISHUL
// Connects Admin (Inventory, Procurement, Workflow, Maintenance) & Technician Portals

const EVENT_NAME = 'trishul_sync_change';

// Broadcast custom events across windows and components
const broadcastChange = () => {
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('trishul_requisitions_updated'));
  window.dispatchEvent(new Event('trishul_jobs_updated'));
  window.dispatchEvent(new Event('trishul_inventory_updated'));
  window.dispatchEvent(new Event('kavach_requisitions_updated'));
  window.dispatchEvent(new Event('kavach_jobs_updated'));
  window.dispatchEvent(new Event('kavach_inventory_updated'));
};

const INITIAL_JOBS = [
  {
    id: 'JOB-8901',
    assetName: 'TATRA 8x8 Heavy Truck',
    assetId: 'TATRA-ERG-102',
    category: 'Heavy Vehicles',
    department: 'Vehicle Repair Group (WSG)',
    bay: 'Bay 03 - WSG Workshop',
    priority: 'Emergency',
    status: 'In Progress',
    progress: 65,
    dueDate: 'Today, 17:00',
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: 'Transmission fluid leak and clutch pressure loss during mountain trial.',
    checklist: [
      { id: 1, text: 'Inspect hydraulic lines & seals', done: true },
      { id: 2, text: 'Replace damaged main clutch plate', done: true },
      { id: 3, text: 'Refill ATF synthetic fluid & pressure test', done: false },
      { id: 4, text: 'Conduct 5km road test & QA signoff', done: false }
    ],
    spares: [
      { id: 'sp-101', name: 'Clutch Assembly Kit TATRA', qty: 1, status: 'Issued' },
      { id: 'sp-102', name: 'Synthetic Hydraulic Fluid 5L', qty: 2, status: 'Issued' }
    ]
  },
  {
    id: 'JOB-8902',
    assetName: 'BMP-2 Infantry Combat Vehicle',
    assetId: 'BMP-ARM-044',
    category: 'Armament & Armor',
    department: 'Armament Group',
    bay: 'Bay 01 - Heavy Overhaul',
    priority: 'High',
    status: 'Pending Spares',
    progress: 30,
    dueDate: 'Tomorrow, 12:00',
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: '30mm auto-cannon feeder mechanism alignment error.',
    checklist: [
      { id: 1, text: 'Dismantle breech block assembly', done: true },
      { id: 2, text: 'Replace worn feed pawl gear', done: false },
      { id: 3, text: 'Calibrate optical recoil sensor', done: false }
    ],
    spares: [
      { id: 'sp-103', name: '30mm Breech Pawl Gear', qty: 1, status: 'Pending Requisition' }
    ]
  },
  {
    id: 'JOB-8903',
    assetName: 'Maruti Gipsy 4x4 Recon',
    assetId: 'GIPSY-LGT-19',
    category: 'Light Vehicles',
    department: 'Vehicle Repair Group (WSG)',
    bay: 'Bay 05 - Quick Repair',
    priority: 'Routine',
    status: 'In Progress',
    progress: 85,
    dueDate: 'Today, 16:30',
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: 'Scheduled 10,000km overhaul: Brake pad replacement & battery check.',
    checklist: [
      { id: 1, text: 'Front ceramic brake pad swap', done: true },
      { id: 2, text: 'Battery voltage & alternator test', done: true },
      { id: 3, text: 'Wheel balancing and alignment', done: false }
    ],
    spares: [
      { id: 'sp-104', name: 'Brake Pad Set Front', qty: 1, status: 'Issued' }
    ]
  },
  {
    id: 'JOB-8904',
    assetName: 'Cummins 250kVA Field Generator',
    assetId: 'GEN-PWR-901',
    category: 'Electrical & Power',
    department: 'Electrical & AC Group',
    bay: 'Electrical Lab 02',
    priority: 'High',
    status: 'In Testing',
    progress: 95,
    dueDate: 'Today, 18:00',
    technicianName: 'Hav. Vikram Singh',
    description: 'Voltage regulator fluctuation under full load test.',
    checklist: [
      { id: 1, text: 'Replace automatic voltage regulator (AVR)', done: true },
      { id: 2, text: 'Clean fuel injectors & lines', done: true },
      { id: 3, text: '4-hour continuous load bank trial', done: true }
    ],
    spares: [
      { id: 'sp-105', name: 'AVR Module 250kVA', qty: 1, status: 'Issued' }
    ]
  },
  {
    id: 'JOB-8905',
    assetName: 'Shaktiman 4-Ton Truck',
    assetId: 'SHAKTI-MED-502',
    category: 'Medium Transport',
    department: 'Vehicle Repair Group (WSG)',
    bay: 'Bay 02 - WSG Workshop',
    priority: 'Routine',
    status: 'Assigned',
    progress: 0,
    dueDate: '25 Jul 2026',
    technicianName: 'Sub. Maj. Rajesh Sharma',
    description: 'Exhaust manifold gasket blowby and engine noise diagnostics.',
    checklist: [
      { id: 1, text: 'Compression test all cylinders', done: false },
      { id: 2, text: 'Replace manifold gasket set', done: false }
    ],
    spares: []
  }
];

const INITIAL_REQUISITIONS = [
  {
    id: 'REQ-9012',
    jobId: 'JOB-8901',
    assetName: 'TATRA 8x8 Heavy Truck',
    assetId: 'TATRA-ERG-102',
    technicianName: 'Sub. Maj. Rajesh Sharma',
    department: 'Vehicle Repair Group',
    partName: 'Clutch Pressure Seal',
    qty: 1,
    priority: 'Emergency',
    status: 'Pending Requisition',
    date: 'Today, 11:45 AM'
  },
  {
    id: 'REQ-9011',
    jobId: 'JOB-8902',
    assetName: 'BMP-2 Infantry Combat Vehicle',
    assetId: 'BMP-ARM-044',
    technicianName: 'Sub. Maj. Rajesh Sharma',
    department: 'Armament Group',
    partName: '30mm Breech Pawl Gear',
    qty: 1,
    priority: 'High',
    status: 'Pending Requisition',
    date: 'Today, 09:30 AM'
  }
];

const INITIAL_INVENTORY_ITEMS = [
  { id: 'INV-101', sku: 'TATRA-CLT-01', name: 'Clutch Assembly Kit TATRA', category: 'Heavy Spares', department: 'Vehicle Repair', location: 'Depot A, Shelf 04', quantity: 8, reorderLevel: 3, unitPrice: 37000, status: 'Optimal' },
  { id: 'INV-102', sku: 'BMP-PAW-30', name: '30mm Breech Pawl Gear', category: 'Armament Spares', department: 'Armament', location: 'Depot B, Shelf 12', quantity: 2, reorderLevel: 4, unitPrice: 46000, status: 'Low Stock' },
  { id: 'INV-103', sku: 'HYD-FL-5L', name: 'Synthetic Hydraulic Fluid 5L', category: 'Consumables', department: 'Vehicle Repair', location: 'Depot A, Shelf 01', quantity: 15, reorderLevel: 5, unitPrice: 2400, status: 'Optimal' },
  { id: 'INV-104', sku: 'BRK-PAD-SET', name: 'Brake Pad Set Front', category: 'Vehicle Repair', department: 'Vehicle Repair', location: 'Depot C, Shelf 08', quantity: 12, reorderLevel: 4, unitPrice: 4500, status: 'Optimal' },
  { id: 'INV-105', sku: 'GEN-AVR-250', name: 'AVR Module 250kVA', category: 'Electrical', department: 'Electrical', location: 'Depot D, Shelf 02', quantity: 4, reorderLevel: 2, unitPrice: 15000, status: 'Optimal' },
  { id: 'INV-106', sku: 'FLT-OIL-TAT', name: 'TATRA Oil Filter', category: 'Consumables', department: 'Vehicle Repair', location: 'Depot A, Shelf 12', quantity: 45, reorderLevel: 20, unitPrice: 1200, status: 'Optimal' },
  { id: 'INV-107', sku: 'BAT-12V-LEAD', name: '12V Lead Acid Battery', category: 'Electrical', department: 'Electrical', location: 'Depot B, Shelf 02', quantity: 1, reorderLevel: 5, unitPrice: 8500, status: 'Low Stock' },
  { id: 'INV-108', sku: 'CLT-SEAL-PR', name: 'Clutch Pressure Seal', category: 'Heavy Spares', department: 'Vehicle Repair', location: 'Depot A, Shelf 05', quantity: 6, reorderLevel: 2, unitPrice: 3200, status: 'Optimal' }
];

export const trishulSync = {
  // --- INVENTORY STOCK ITEMS ---
  getInventoryItems: () => {
    try {
      const saved = localStorage.getItem('kavach_sync_inventory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    localStorage.setItem('kavach_sync_inventory', JSON.stringify(INITIAL_INVENTORY_ITEMS));
    return INITIAL_INVENTORY_ITEMS;
  },

  saveInventoryItems: (items) => {
    localStorage.setItem('kavach_sync_inventory', JSON.stringify(items));
    broadcastChange();
  },

  // --- JOBS ---
  getJobs: () => {
    try {
      const saved = localStorage.getItem('kavach_sync_jobs') || localStorage.getItem('kavach_tech_jobs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    localStorage.setItem('kavach_sync_jobs', JSON.stringify(INITIAL_JOBS));
    localStorage.setItem('kavach_tech_jobs', JSON.stringify(INITIAL_JOBS));
    return INITIAL_JOBS;
  },

  saveJobs: (jobs) => {
    localStorage.setItem('kavach_sync_jobs', JSON.stringify(jobs));
    localStorage.setItem('kavach_tech_jobs', JSON.stringify(jobs));
    broadcastChange();
  },

  updateJobStatus: (jobId, newStatus) => {
    const jobs = kavachSync.getJobs();
    const nextJobs = jobs.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j));
    kavachSync.saveJobs(nextJobs);
  },

  updateJobProgress: (jobId, progress, status) => {
    const jobs = kavachSync.getJobs();
    const nextJobs = jobs.map((j) => (j.id === jobId ? { ...j, progress, status: status || j.status } : j));
    kavachSync.saveJobs(nextJobs);
  },

  toggleChecklist: (jobId, itemId) => {
    const jobs = kavachSync.getJobs();
    const nextJobs = jobs.map((job) => {
      if (job.id !== jobId) return job;
      const updatedChecklist = job.checklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      );
      const doneCount = updatedChecklist.filter((c) => c.done).length;
      const progress = Math.round((doneCount / updatedChecklist.length) * 100);
      return { ...job, checklist: updatedChecklist, progress };
    });
    kavachSync.saveJobs(nextJobs);
  },

  addJob: (newJob) => {
    const jobs = kavachSync.getJobs();
    const jobWithId = {
      id: newJob.id || `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      progress: 0,
      status: 'Assigned',
      checklist: newJob.checklist || [{ id: 1, text: 'Initial Diagnostic Inspection', done: false }],
      spares: [],
      ...newJob
    };
    kavachSync.saveJobs([jobWithId, ...jobs]);
    return jobWithId;
  },

  // --- REQUISITIONS (SPARES REQUESTS) ---
  getRequisitions: () => {
    try {
      const saved = localStorage.getItem('kavach_sync_requisitions') || localStorage.getItem('kavach_pending_requisitions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    localStorage.setItem('kavach_sync_requisitions', JSON.stringify(INITIAL_REQUISITIONS));
    localStorage.setItem('kavach_pending_requisitions', JSON.stringify(INITIAL_REQUISITIONS));
    return INITIAL_REQUISITIONS;
  },

  saveRequisitions: (reqs) => {
    localStorage.setItem('kavach_sync_requisitions', JSON.stringify(reqs));
    localStorage.setItem('kavach_pending_requisitions', JSON.stringify(reqs));
    broadcastChange();
  },

  // Called when Technician requests a spare part
  requestSpare: (jobId, partName, technicianName = 'Sub. Maj. Rajesh Sharma') => {
    const jobs = kavachSync.getJobs();
    const targetJob = jobs.find((j) => j.id === jobId);
    
    const newSpareId = `sp-${Date.now()}`;
    const newSpare = { id: newSpareId, name: partName, qty: 1, status: 'Pending Requisition' };

    // Update job in jobs list
    const updatedJobs = jobs.map((j) => {
      if (j.id !== jobId) return j;
      const updatedSpares = [...(j.spares || []), newSpare];
      return { ...j, spares: updatedSpares, status: 'Pending Spares' };
    });

    localStorage.setItem('kavach_sync_jobs', JSON.stringify(updatedJobs));
    localStorage.setItem('kavach_tech_jobs', JSON.stringify(updatedJobs));

    // Create requisition entry
    const reqs = kavachSync.getRequisitions();
    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      jobId: jobId,
      assetName: targetJob ? targetJob.assetName : 'Equipment Asset',
      assetId: targetJob ? targetJob.assetId : 'EQUIP-101',
      technicianName,
      department: targetJob ? targetJob.department : 'Vehicle Repair Group',
      partName,
      qty: 1,
      priority: targetJob ? targetJob.priority : 'High',
      status: 'Pending Requisition',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };

    const updatedReqs = [newReq, ...reqs];
    localStorage.setItem('kavach_sync_requisitions', JSON.stringify(updatedReqs));
    localStorage.setItem('kavach_pending_requisitions', JSON.stringify(updatedReqs));

    broadcastChange();
    return newReq;
  },

  // Called when Admin approves & issues a spare part
  approveRequisition: (reqId) => {
    const reqs = kavachSync.getRequisitions();
    const targetReq = reqs.find((r) => r.id === reqId);
    
    // 1. Update Requisition status
    const updatedReqs = reqs.map((r) => (r.id === reqId ? { ...r, status: 'Issued' } : r));
    localStorage.setItem('kavach_sync_requisitions', JSON.stringify(updatedReqs));
    localStorage.setItem('kavach_pending_requisitions', JSON.stringify(updatedReqs));

    // 2. Update Technician Job Spares status
    if (targetReq) {
      const jobs = kavachSync.getJobs();
      const updatedJobs = jobs.map((j) => {
        const isMatchJob = (targetReq.jobId && j.id === targetReq.jobId) || 
                           j.spares?.some(s => s.name.toLowerCase().includes(targetReq.partName.toLowerCase()) || targetReq.partName.toLowerCase().includes(s.name.toLowerCase()));

        if (!isMatchJob) return j;

        let updatedSpares = (j.spares || []).map((s) => {
          const isPartMatch = s.name.toLowerCase().includes(targetReq.partName.toLowerCase()) || 
                              targetReq.partName.toLowerCase().includes(s.name.toLowerCase());
          return isPartMatch ? { ...s, status: 'Issued' } : s;
        });

        // Fallback: If spare is not present in target job array, append it as Issued
        if (!updatedSpares.some(s => s.name.toLowerCase().includes(targetReq.partName.toLowerCase()))) {
          updatedSpares.push({ id: `sp-${Date.now()}`, name: targetReq.partName, qty: targetReq.qty || 1, status: 'Issued' });
        }

        const allIssued = updatedSpares.every((s) => s.status === 'Issued');

        return {
          ...j,
          spares: updatedSpares,
          status: allIssued && j.status === 'Pending Spares' ? 'In Progress' : j.status
        };
      });

      localStorage.setItem('kavach_sync_jobs', JSON.stringify(updatedJobs));
      localStorage.setItem('kavach_tech_jobs', JSON.stringify(updatedJobs));

      // 3. DECREMENT INVENTORY STOCK QUANTITY & DEDUCT FROM CENTRAL STORE
      const invItems = kavachSync.getInventoryItems();
      const issueQty = targetReq.qty || 1;

      let foundMatchingStock = false;
      const updatedInvItems = invItems.map((inv) => {
        const isStockMatch = inv.name.toLowerCase().includes(targetReq.partName.toLowerCase()) || 
                             targetReq.partName.toLowerCase().includes(inv.name.toLowerCase());

        if (isStockMatch) {
          foundMatchingStock = true;
          const newQty = Math.max(0, inv.quantity - issueQty);
          return {
            ...inv,
            quantity: newQty,
            status: newQty === 0 ? 'Out of Stock' : newQty <= inv.reorderLevel ? 'Low Stock' : 'Optimal'
          };
        }
        return inv;
      });

      // If item was not pre-existing in stock catalog, create an entry with decremented stock
      if (!foundMatchingStock) {
        updatedInvItems.push({
          id: `INV-${Math.floor(100 + Math.random() * 900)}`,
          sku: `SPARE-${Date.now().toString().slice(-4)}`,
          name: targetReq.partName,
          category: 'Technician Spares',
          department: targetReq.department || 'Vehicle Repair',
          location: 'Depot A, Shelf 01',
          quantity: 10 - issueQty, // Issued 1 from base 10
          reorderLevel: 3,
          unitPrice: 4500,
          status: 'Optimal'
        });
      }

      localStorage.setItem('kavach_sync_inventory', JSON.stringify(updatedInvItems));
    }

    broadcastChange();
  },

  // Called when Admin forwards requisition to Procurement
  forwardToProcurement: (reqId) => {
    const reqs = kavachSync.getRequisitions();
    const targetReq = reqs.find((r) => r.id === reqId);

    const updatedReqs = reqs.map((r) => (r.id === reqId ? { ...r, status: 'Forwarded to Procurement' } : r));
    localStorage.setItem('kavach_sync_requisitions', JSON.stringify(updatedReqs));
    localStorage.setItem('kavach_pending_requisitions', JSON.stringify(updatedReqs));

    if (targetReq) {
      // Add to Purchase Requests store
      const prs = JSON.parse(localStorage.getItem('kavach_sync_prs') || '[]');
      const newPR = {
        id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `Procurement Requisition for ${targetReq.partName}`,
        item: targetReq.partName,
        qty: targetReq.qty,
        requestedBy: targetReq.technicianName,
        department: targetReq.department,
        priority: targetReq.priority,
        status: 'Pending Commander Approval',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      localStorage.setItem('kavach_sync_prs', JSON.stringify([newPR, ...prs]));
      localStorage.setItem('kavach_purchase_requests', JSON.stringify([newPR, ...prs]));
    }

    broadcastChange();
  },

  // --- SUBSCRIBE LISTENER ---
  subscribe: (callback) => {
    const handler = () => callback();
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener('storage', handler);
    window.addEventListener('kavach_requisitions_updated', handler);
    window.addEventListener('kavach_jobs_updated', handler);
    window.addEventListener('kavach_inventory_updated', handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
      window.removeEventListener('kavach_requisitions_updated', handler);
      window.removeEventListener('kavach_jobs_updated', handler);
      window.removeEventListener('kavach_inventory_updated', handler);
    };
  }
};

export const kavachSync = trishulSync;
