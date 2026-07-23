import bcrypt from 'bcryptjs';
import * as userRepo from '../repositories/userRepository.js';

export const getAllUsers = async () => await userRepo.findAllUsers();
export const getUserById = async (id) => {
  const user = await userRepo.findUserById(id);
  if (!user) throw { status: 404, message: 'User not found' };
  return { id: user.id, email: user.email, fullName: user.fullName, roleId: user.roleId, departmentId: user.departmentId, isActive: user.isActive };
};
export const createUser = async (data) => {
  const existing = await userRepo.findUserByEmail(data.email);
  if (existing) throw { status: 409, message: 'Email already exists' };
  
  const passwordHash = await bcrypt.hash(data.password, 10);
  const newUser = await userRepo.createUser({ ...data, passwordHash });
  delete newUser.passwordHash;
  return newUser;
};
export const updateUser = async (id, data) => {
  const payload = { ...data };
  if (payload.email) {
    const existing = await userRepo.findUserByEmail(payload.email);
    if (existing && existing.id !== id) throw { status: 409, message: 'Email already in use' };
  }
  if (payload.password) {
    payload.passwordHash = await bcrypt.hash(payload.password, 10);
    delete payload.password;
  }
  const updated = await userRepo.updateUser(id, payload);
  if (!updated) throw { status: 404, message: 'User not found' };
  delete updated.passwordHash;
  return updated;
};
export const deleteUser = async (id) => {
  const deleted = await userRepo.deleteUser(id);
  if (!deleted) throw { status: 404, message: 'User not found' };
  return { success: true };
};
