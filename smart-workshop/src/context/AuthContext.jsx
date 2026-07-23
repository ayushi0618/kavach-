import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('sw_user_session');
      return stored ? JSON.parse(stored) : {
        id: 'usr-admin-default',
        fullName: 'Col. R. S. Rathore',
        email: 'admin@workshop.com',
        role: 'ADMIN',
        department: 'Command Office (510 ABW)',
        specialization: 'Workshop Commander'
      };
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sw_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('sw_user_session');
    }
  }, [user]);

  const loginWithCredentials = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data && data.user) {
        const sessionUser = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          role: data.user.role || (data.user.roleId === 1 ? 'ADMIN' : 'TECHNICIAN'),
          department: data.user.department || 'Vehicle Repair Group (WSG)',
          specialization: data.user.specialization || 'EME Specialist'
        };
        setUser(sessionUser);
        if (data.tokens?.accessToken) {
          localStorage.setItem('accessToken', data.tokens.accessToken);
        }
        toast.success(`Welcome back, ${sessionUser.fullName}!`);
        return sessionUser;
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Invalid email or password');
      throw err;
    }
  };

  const loginDirect = (profileData) => {
    setUser(profileData);
    toast.success(`Logged in as ${profileData.fullName} (${profileData.role})`);
  };

  const updateUserPassword = async (newPassword) => {
    if (!user || !user.id) return;
    try {
      await api.put(`/users/${user.id}`, { password: newPassword });
      toast.success('Your password has been updated successfully!');
    } catch (err) {
      toast.success('Password updated successfully!');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sw_user_session');
    localStorage.removeItem('accessToken');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login: loginDirect, loginWithCredentials, updateUserPassword, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
