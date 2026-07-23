import bcrypt from 'bcryptjs';
import { findUserByEmail } from '../repositories/userRepository.js';
import { generateTokens } from '../utils/jwtUtils.js';

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || !user.isActive) {
    const err = new Error('Invalid credentials or inactive user');
    err.status = 401;
    throw err;
  }
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  // Assign string role based on integer ID for RBAC simplicity
  const roleName = user.roleId === 1 ? 'ADMIN' : 'TECHNICIAN'; 
  const tokens = generateTokens({ id: user.id, roleName, email: user.email });
  
  return { 
    user: { id: user.id, email: user.email, fullName: user.fullName, role: roleName }, 
    tokens 
  };
};
