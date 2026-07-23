import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import TechLayout from '../layouts/TechLayout';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';

// Features: Assets & QR Module
import AssetList from '../features/assets/pages/AssetList';
import RegisterAsset from '../features/assets/pages/RegisterAsset';
import EditAsset from '../features/assets/pages/EditAsset';
import AssetDetails from '../features/assets/pages/AssetDetails';
import QRScannerPage from '../features/assets/pages/QRScannerPage';
import VehicleDetails from '../features/assets/pages/VehicleDetails';

// Features: Inventory Module
import InventoryDashboard from '../features/inventory/pages/InventoryDashboard';
import ItemList from '../features/inventory/pages/ItemList';
import AddItem from '../features/inventory/pages/AddItem';
import ItemDetails from '../features/inventory/pages/ItemDetails';
import IssueReturn from '../features/inventory/pages/IssueReturn';
import SuppliersPage from '../features/inventory/pages/SuppliersPage';
import WarehousePage from '../features/inventory/pages/WarehousePage';

// Features: Maintenance Module
import MaintenanceDashboard from '../features/maintenance/pages/MaintenanceDashboard';
import CreateTicket from '../features/maintenance/pages/CreateTicket';
import EditTicket from '../features/maintenance/pages/EditTicket';
import WorkflowBoardPage from '../features/maintenance/pages/WorkflowBoardPage';
import JobDetails from '../features/maintenance/pages/JobDetails';
import CompletedJobsPage from '../features/maintenance/pages/CompletedJobsPage';
import MaintenanceCalendar from '../features/maintenance/pages/MaintenanceCalendar';

// Features: Procurement Module
import ProcurementDashboard from '../features/procurement/pages/ProcurementDashboard';
import PurchaseRequestsPage from '../features/procurement/pages/PurchaseRequestsPage';
import TendersPage from '../features/procurement/pages/TendersPage';
import VendorsPage from '../features/procurement/pages/VendorsPage';
import VendorEvaluationPage from '../features/procurement/pages/VendorEvaluationPage';
import PurchaseOrdersPage from '../features/procurement/pages/PurchaseOrdersPage';
import MaterialReceiptPage from '../features/procurement/pages/MaterialReceiptPage';
import VendorPerformancePage from '../features/procurement/pages/VendorPerformancePage';

// Features: Analytics & Reports Module
import ExecutiveDashboard from '../features/analytics/pages/ExecutiveDashboard';
import DepartmentAnalyticsPage from '../features/analytics/pages/DepartmentAnalyticsPage';
import TechnicianPerformancePage from '../features/analytics/pages/TechnicianPerformancePage';
import VehicleReadinessPage from '../features/analytics/pages/VehicleReadinessPage';
import ReportsCenterPage from '../features/analytics/pages/ReportsCenterPage';

// Features: AI Integration Module
import AIDashboard from '../features/ai/pages/AIDashboard';

// Admin Pages (Other Modules)
import AdminDashboard from '../pages/admin/Dashboard';
import AdminEmployees from '../pages/admin/Employees';
import AdminSettings from '../pages/admin/Settings';

// Technician Pages
import TechDashboard from '../pages/technician/Dashboard';
import TechJobs from '../pages/technician/Jobs';
import TechMaintenance from '../pages/technician/Maintenance';
import TechProfile from '../pages/technician/Profile';

// Presentation Mode
import PresentationEngine from '../features/presentation/pages/PresentationEngine';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/presentation" element={<PresentationEngine />} />
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Routes - Protected (Role: ADMIN) */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            
            {/* Asset Management Module */}
            <Route path="assets" element={<AssetList />} />
            <Route path="assets/new" element={<RegisterAsset />} />
            <Route path="assets/edit/:id" element={<EditAsset />} />
            <Route path="assets/:id" element={<AssetDetails />} />

            <Route path="vehicles/:id" element={<VehicleDetails />} />

            {/* Inventory Module */}
            <Route path="inventory" element={<InventoryDashboard />} />
            <Route path="inventory/items" element={<ItemList />} />
            <Route path="inventory/new" element={<AddItem />} />
            <Route path="inventory/issue-return" element={<IssueReturn />} />
            <Route path="inventory/suppliers" element={<SuppliersPage />} />
            <Route path="inventory/warehouse" element={<WarehousePage />} />
            <Route path="inventory/:id" element={<ItemDetails />} />

            {/* Workflow Module */}
            <Route path="workflow" element={<WorkflowBoardPage />} />

            {/* Maintenance Module */}
            <Route path="maintenance" element={<MaintenanceDashboard />} />
            <Route path="maintenance/new" element={<CreateTicket />} />
            <Route path="maintenance/edit/:id" element={<EditTicket />} />
            <Route path="maintenance/board" element={<WorkflowBoardPage />} />
            <Route path="maintenance/completed" element={<CompletedJobsPage />} />
            <Route path="maintenance/calendar" element={<MaintenanceCalendar />} />
            <Route path="maintenance/:id" element={<JobDetails />} />

            {/* Procurement Module */}
            <Route path="procurement" element={<ProcurementDashboard />} />
            <Route path="procurement/requests" element={<PurchaseRequestsPage />} />
            <Route path="procurement/tenders" element={<TendersPage />} />
            <Route path="procurement/vendors" element={<VendorsPage />} />
            <Route path="procurement/evaluations" element={<VendorEvaluationPage />} />
            <Route path="procurement/orders" element={<PurchaseOrdersPage />} />
            <Route path="procurement/receipts" element={<MaterialReceiptPage />} />
            <Route path="procurement/performance" element={<VendorPerformancePage />} />

            {/* Analytics & Reports Module */}
            <Route path="analytics" element={<ExecutiveDashboard />} />
            <Route path="analytics/departments" element={<DepartmentAnalyticsPage />} />
            <Route path="analytics/technicians" element={<TechnicianPerformancePage />} />
            <Route path="analytics/readiness" element={<VehicleReadinessPage />} />
            <Route path="reports" element={<ReportsCenterPage />} />
            
            {/* AI Module */}
            <Route path="ai" element={<AIDashboard />} />

            <Route path="employees" element={<AdminEmployees />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* Technician Routes - Protected (Role: TECHNICIAN) */}
        <Route element={<ProtectedRoute allowedRoles={['TECHNICIAN']} />}>
          <Route path="/technician" element={<TechLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TechDashboard />} />
            <Route path="jobs" element={<TechJobs />} />
            
            {/* QR Scanner Module */}
            <Route path="scanner" element={<QRScannerPage />} />
            <Route path="assets/:id" element={<AssetDetails />} />

            <Route path="maintenance" element={<TechMaintenance />} />
            <Route path="profile" element={<TechProfile />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
