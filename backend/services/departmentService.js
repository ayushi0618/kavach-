import * as deptRepo from '../repositories/departmentRepository.js';

export const getAllDepartments = async () => await deptRepo.findAllDepartments();
export const getDepartmentById = async (id) => {
  const dept = await deptRepo.findDepartmentById(id);
  if (!dept) throw { status: 404, message: 'Department not found' };
  return dept;
};
export const createDepartment = async (data) => await deptRepo.createDepartment(data);
export const updateDepartment = async (id, data) => {
  const dept = await deptRepo.updateDepartment(id, data);
  if (!dept) throw { status: 404, message: 'Department not found' };
  return dept;
};
export const deleteDepartment = async (id) => {
  const dept = await deptRepo.deleteDepartment(id);
  if (!dept) throw { status: 404, message: 'Department not found' };
  return { success: true };
};
