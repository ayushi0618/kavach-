import { db } from './database/index.js';
import {
  roles, departments, users, assets, inventory,
  maintenance_jobs, procurement_orders, vehicles, vendors
} from './database/schema.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const SEED_CONFIG = {
  departments: 10,
  employees: 50,
  assets: 150,
  vehicles: 80,
  inventory: 300,
  vendors: 20,
  maintenance: 100,
  procurement: 50
};

const runSeed = async () => {
  console.log('🌱 Starting Database Seed...');

  try {
    // 1. Roles
    console.log('Seeding Roles...');
    await db.delete(roles);
    const insertedRoles = await db.insert(roles).values([
      { name: 'ADMIN' },
      { name: 'TECHNICIAN' }
    ]).returning();
    const adminRoleId = insertedRoles.find(r => r.name === 'ADMIN').id;
    const techRoleId = insertedRoles.find(r => r.name === 'TECHNICIAN').id;

    // 2. Departments
    console.log(`Seeding ${SEED_CONFIG.departments} Departments...`);
    await db.delete(departments);
    const deptNames = ['Mechanical', 'Electrical', 'Welding', 'Vehicle Maintenance (VM)', 'Carpenter', 'Air Conditioning (AC)', 'Quality Assurance (QA)', 'Quality Control (QC)', 'Heavy Machinery', 'Armoury'];
    const deptData = deptNames.map(name => ({
      name,
      description: faker.company.catchPhrase(),
      isActive: true
    }));
    const insertedDepartments = await db.insert(departments).values(deptData).returning();

    // 3. Vendors
    console.log(`Seeding ${SEED_CONFIG.vendors} Vendors...`);
    await db.delete(vendors);
    const vendorData = Array.from({ length: SEED_CONFIG.vendors }).map(() => ({
      name: faker.company.name(),
      contactPerson: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      rating: faker.number.int({ min: 1, max: 5 }),
      status: 'Active'
    }));
    const insertedVendors = await db.insert(vendors).values(vendorData).returning();

    // 4. Users (Employees & Technicians)
    console.log(`Seeding ${SEED_CONFIG.employees} Users...`);
    await db.delete(users);
    const defaultPassword = await bcrypt.hash('password123', 10);
    const userData = [];
    
    // Add default admin first
    userData.push({
      email: 'admin@workshop.com',
      passwordHash: defaultPassword,
      fullName: 'System Admin',
      roleId: adminRoleId,
      departmentId: insertedDepartments[0].id,
      specialization: 'System Management',
      isActive: true
    });

    const indianNames = [
      'Sub. Maj. Rajesh Sharma', 'Hav. Vikram Singh', 'Nk. Amit Patel', 'Sub. Suresh Kumar', 
      'Sep. Deepak Verma', 'Col. R. S. Rathore', 'Capt. Ayushi Singh', 'Sub. Manoj Kumar', 
      'Nk. Devendra Singh', 'Sep. Rohit Yadav', 'Hav. Harpreet Singh', 'Nk. Sunil Dutt', 
      'Sub. Anil Deshmukh', 'Sep. Gourav Kulkarni', 'Hav. Ramesh Rao', 'Nk. Pradeep Mishra',
      'Sub. Maj. D. S. Chauhan', 'Capt. Karan Johar', 'Sep. Alok Pandey', 'Nk. Sachin Pilot',
      'Hav. Bhupendra Tyagi', 'Sep. Tarun Saxena', 'Sub. Virendra Sehwag', 'Nk. Ishant Sharma'
    ];

    for (let i = 0; i < SEED_CONFIG.employees - 1; i++) {
      const isTech = i < 25; // 25 technicians
      const randomName = indianNames[i % indianNames.length] + (i >= indianNames.length ? ` ${i + 1}` : '');
      const cleanEmail = randomName.toLowerCase().replace(/[^a-z0-9]/g, '.') + '@eme.gov.in';

      userData.push({
        email: cleanEmail,
        passwordHash: defaultPassword,
        fullName: randomName,
        roleId: isTech ? techRoleId : adminRoleId,
        departmentId: faker.helpers.arrayElement(insertedDepartments).id,
        specialization: isTech ? faker.helpers.arrayElement(['Engine Repair', 'Electrical Wiring', 'Hydraulics', 'Welding', 'General Maintenance']) : 'Administration',
        isActive: true
      });
    }
    const insertedUsers = await db.insert(users).values(userData).returning();
    const technicians = insertedUsers.filter(u => u.roleId === techRoleId);

    // 5. Inventory
    console.log(`Seeding ${SEED_CONFIG.inventory} Inventory Items...`);
    await db.delete(inventory);
    const inventoryData = Array.from({ length: SEED_CONFIG.inventory }).map(() => ({
      sku: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(['Spare Parts', 'Consumables', 'Tools', 'Fluids', 'Electronics']),
      quantity: faker.number.int({ min: 0, max: 500 }),
      reorderLevel: faker.number.int({ min: 10, max: 50 }),
      location: `Aisle ${faker.number.int({ min: 1, max: 20 })}-Bin ${faker.number.int({ min: 1, max: 100 })}`,
      unitCost: faker.number.int({ min: 10, max: 5000 })
    }));
    // SQLite batch limit is roughly 500-999 variables per query depending on version, doing chunking to be safe
    for (let i = 0; i < inventoryData.length; i += 50) {
        await db.insert(inventory).values(inventoryData.slice(i, i + 50));
    }
    const insertedInventory = await db.select().from(inventory);

    // 6. Assets
    console.log(`Seeding ${SEED_CONFIG.assets} Assets...`);
    await db.delete(assets);
    const assetData = Array.from({ length: SEED_CONFIG.assets }).map(() => ({
      qrCode: `ASSET-${faker.string.alphanumeric({ length: 6, casing: 'upper' })}`,
      name: faker.commerce.productName() + ' Machine',
      type: faker.helpers.arrayElement(['Heavy Machinery', 'Diagnostic Tool', 'Generator', 'Crane', 'Forklift']),
      manufacturer: faker.company.name(),
      model: faker.vehicle.model(),
      serial: faker.string.uuid().slice(0, 8).toUpperCase(),
      location: `Workshop Zone ${faker.helpers.arrayElement(['A', 'B', 'C', 'D'])}`,
      purchaseDate: faker.date.past({ years: 10 }).toISOString().split('T')[0],
      maintenanceFreq: faker.helpers.arrayElement([30, 90, 180, 365]),
      departmentId: faker.helpers.arrayElement(insertedDepartments).id,
      status: faker.helpers.arrayElement(['Available', 'Under Repair', 'Out of Service']),
      lastMaintenance: faker.date.recent({ days: 30 }).toISOString().split('T')[0]
    }));
    for (let i = 0; i < assetData.length; i += 50) {
        await db.insert(assets).values(assetData.slice(i, i + 50));
    }
    const insertedAssets = await db.select().from(assets);

    // 7. Vehicles
    console.log(`Seeding ${SEED_CONFIG.vehicles} Vehicles...`);
    await db.delete(vehicles);
    const vehicleData = Array.from({ length: SEED_CONFIG.vehicles }).map(() => ({
      registrationNumber: faker.vehicle.vrm(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date.past({ years: 15 }).getFullYear(),
      chassisNumber: faker.vehicle.vin(),
      engineNumber: `ENG-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}`,
      departmentId: faker.helpers.arrayElement(insertedDepartments).id,
      assignedTechnicianId: faker.helpers.arrayElement(technicians).id,
      status: faker.helpers.arrayElement(['Active', 'Under Repair', 'Out of Service']),
      currentWorkshopId: faker.helpers.arrayElement(insertedDepartments).id,
      totalRepairCost: faker.number.int({ min: 1000, max: 50000 })
    }));
    for (let i = 0; i < vehicleData.length; i += 50) {
      await db.insert(vehicles).values(vehicleData.slice(i, i + 50));
    }
    const insertedVehicles = await db.select().from(vehicles);

    // 8. Maintenance Jobs
    console.log(`Seeding ${SEED_CONFIG.maintenance} Maintenance Records...`);
    await db.delete(maintenance_jobs);
    const maintenanceData = Array.from({ length: SEED_CONFIG.maintenance }).map(() => {
      const isComplete = faker.datatype.boolean();
      return {
        assetId: faker.helpers.arrayElement(insertedAssets).id, // Or vehicle id if we mix
        technicianId: faker.helpers.arrayElement(technicians).id,
        status: isComplete ? 'Completed' : faker.helpers.arrayElement(['Pending', 'In Progress', 'QA']),
        priority: faker.helpers.arrayElement(['Normal', 'High', 'Critical']),
        department: faker.helpers.arrayElement(deptNames),
        description: faker.helpers.arrayElement([
          'TATRA VVN 8x8 Engine misfire and fuel injector replacement',
          'Pinaka Rocket Launcher hydraulic pressure leak repair',
          'BEML Earthmover track tension adjustment & brake overhaul',
          '500KVA Generator alternator rewiring & voltage regulator fix',
          'Machine Shop heavy lathe spindle calibration & bearing check',
          'Air Conditioning compressor overhaul for command post vehicle',
          'Armoury turret rotation gear lubrication and alignment',
          'Heavy Crane 20-Ton winch cable inspection & load test',
          'Vehicle Repair Group transmission oil flush & clutch kit replacement',
          'QA/QC pre-deployment complete electrical and chassis diagnostic'
        ]),
        remarks: isComplete ? 'Repaired successfully.' : '',
        startDate: faker.date.recent({ days: 14 }).toISOString().split('T')[0],
        dueDate: faker.date.soon({ days: 7 }).toISOString().split('T')[0],
        endDate: isComplete ? faker.date.recent({ days: 2 }).toISOString().split('T')[0] : null
      };
    });
    for (let i = 0; i < maintenanceData.length; i += 50) {
      await db.insert(maintenance_jobs).values(maintenanceData.slice(i, i + 50));
    }

    // 9. Procurement Orders
    console.log(`Seeding ${SEED_CONFIG.procurement} Procurement Orders...`);
    await db.delete(procurement_orders);
    const procurementData = Array.from({ length: SEED_CONFIG.procurement }).map(() => ({
      vendorId: faker.helpers.arrayElement(insertedVendors).id,
      vendorName: faker.helpers.arrayElement(insertedVendors).name,
      item: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 100 }),
      status: faker.helpers.arrayElement(['Requested', 'Approved', 'Ordered', 'Received']),
      totalCost: faker.number.int({ min: 500, max: 20000 })
    }));
    for (let i = 0; i < procurementData.length; i += 50) {
      await db.insert(procurement_orders).values(procurementData.slice(i, i + 50));
    }

    console.log('✅ Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
