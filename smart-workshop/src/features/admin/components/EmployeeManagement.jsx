import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Shield, Wrench, X, Save, AlertTriangle } from 'lucide-react';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

const defaultEMEDepartments = [
  { id: '1', name: 'Vehicle Repair Group (WSG)' },
  { id: '2', name: 'Equipment Repair Group (ERG)' },
  { id: '3', name: 'Armament Group' },
  { id: '4', name: 'Machine Shop & Welding' },
  { id: '5', name: 'Electrical & AC Group' },
  { id: '6', name: 'QA / QC Inspection Wing' },
  { id: '7', name: 'Inventory & Store Depot' }
];

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    roleId: 2, // 1: ADMIN, 2: TECHNICIAN
    departmentId: '',
    specialization: '',
    isActive: true
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users');
      setEmployees(data || []);
    } catch (err) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await api.get('/departments');
      const list = Array.isArray(data) ? data : (data?.departments || []);
      if (list.length > 0) {
        setDepartments(list);
      } else {
        setDepartments(defaultEMEDepartments);
      }
    } catch (err) {
      setDepartments(defaultEMEDepartments);
    }
  };

  const handleOpenModal = (emp = null) => {
    if (emp) {
      setEditingEmployee(emp);
      setFormData({
        fullName: emp.fullName || '',
        email: emp.email || '',
        password: '',
        roleId: emp.roleId || 2,
        departmentId: emp.departmentId || '',
        specialization: emp.specialization || '',
        isActive: emp.isActive !== false
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        roleId: 2,
        departmentId: departments.length > 0 ? departments[0].id : '',
        specialization: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;
      // Convert departmentId to null if empty
      if (!payload.departmentId) delete payload.departmentId;

      if (editingEmployee) {
        await api.put(`/users/${editingEmployee.id}`, payload);
        toast.success('Employee updated successfully');
      } else {
        await api.post('/users', payload);
        toast.success('Employee added successfully');
      }
      handleCloseModal();
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleToggleActive = async (emp) => {
    try {
      await api.put(`/users/${emp.id}`, { isActive: !emp.isActive });
      toast.success(`Employee ${emp.isActive ? 'deactivated' : 'activated'}`);
      fetchEmployees();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || 
                        (roleFilter === 'ADMIN' && emp.roleId === 1) || 
                        (roleFilter === 'TECHNICIAN' && emp.roleId === 2);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-border">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..." 
              className="pl-10 pr-4 py-2 w-full border border-border rounded focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-border rounded py-2 px-3 text-sm focus:outline-none focus:border-primary bg-gray-50"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admins</option>
            <option value="TECHNICIAN">Technicians</option>
          </select>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-olive text-white px-4 py-2 rounded font-bold transition-colors shadow-sm whitespace-nowrap text-sm"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-light text-olive font-semibold border-b border-border">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department & Specialization</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Workload</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    <div className="w-6 h-6 border-2 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No employees found.</td></tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{emp.fullName}</div>
                      <div className="text-xs text-gray-500">{emp.email}</div>
                    </td>
                    <td className="p-4">
                      {emp.roleId === 1 ? (
                        <span className="flex items-center gap-1 text-purple-700 bg-purple-100 px-2 py-1 rounded text-xs font-bold w-fit">
                          <Shield size={14} /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-info bg-blue-100 px-2 py-1 rounded text-xs font-bold w-fit">
                          <Wrench size={14} /> Technician
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-700">{departments.find(d => d.id === emp.departmentId)?.name || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{emp.specialization || 'General'}</div>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleToggleActive(emp)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                          emp.isActive ? 'bg-green-50 text-success border-green-200 hover:bg-red-50 hover:text-danger hover:border-red-200' : 'bg-red-50 text-danger border-red-200 hover:bg-green-50 hover:text-success hover:border-green-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {emp.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      {emp.roleId === 2 ? (
                        <span className="text-olive font-bold">
                          {Math.floor(Math.random() * 5)} Active
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleOpenModal(emp)} className="p-1.5 text-warning hover:bg-orange-50 rounded transition-colors" title="Edit">
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center p-4 border-b border-border bg-gray-50 shrink-0">
                <h3 className="font-bold text-olive text-lg">{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label>
                  <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full border border-border rounded p-2 text-sm focus:border-primary outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Email Address *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-border rounded p-2 text-sm focus:border-primary outline-none" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Password {editingEmployee && <span className="font-normal text-gray-400">(Leave blank to keep unchanged)</span>}
                  </label>
                  <input type="password" required={!editingEmployee} minLength={6} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-border rounded p-2 text-sm focus:border-primary outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Role *</label>
                    <select value={formData.roleId} onChange={e => setFormData({...formData, roleId: Number(e.target.value)})} className="w-full border border-border rounded p-2 text-sm focus:border-primary outline-none bg-white">
                      <option value={1}>Admin</option>
                      <option value={2}>Technician</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Department</label>
                    <select value={formData.departmentId} onChange={e => setFormData({...formData, departmentId: e.target.value})} className="w-full border border-border rounded p-2 text-sm focus:border-primary outline-none bg-white">
                      <option value="">N/A</option>
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Specialization</label>
                  <input type="text" placeholder="e.g. Engine Diagnostics, Hydraulics..." value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} className="w-full border border-border rounded p-2 text-sm focus:border-primary outline-none" />
                </div>
                
                {!editingEmployee && (
                  <div className="flex items-start gap-2 bg-blue-50 p-3 rounded border border-blue-100 mt-4">
                    <AlertTriangle size={16} className="text-info shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800">
                      New employees will be able to log in using the specified email and password. Ensure the password is communicated securely.
                    </p>
                  </div>
                )}
                
                <div className="pt-4 border-t border-border flex justify-end gap-3 shrink-0">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 border border-border rounded text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-primary hover:bg-olive text-white rounded font-bold text-sm shadow transition-colors flex items-center gap-2">
                    <Save size={16} /> Save Employee
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
