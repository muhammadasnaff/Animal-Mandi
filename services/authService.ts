
import { User, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

const AUTH_KEY = 'mandi_auth_user';
const USERS_STORAGE_KEY = 'mandi_all_users';

// Initialize users storage if empty
if (!localStorage.getItem(USERS_STORAGE_KEY)) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(MOCK_USERS));
}

export const getStoredUsers = (): User[] => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : MOCK_USERS;
};

export const login = (identifier: string, password: string): User | null => {
  const users = getStoredUsers();
  // Support searching by email or phone number
  const user = users.find(u => 
    u.email.toLowerCase() === identifier.toLowerCase() || 
    (u.phone && u.phone.replace(/[\s-]/g, '') === identifier.replace(/[\s-]/g, ''))
  );
  
  if (user) {
    // Enforce password for admin
    if (user.role === 'admin') {
      if (password === 'ITResources@786') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return user;
      } else {
        return null;
      }
    }
    
    // For regular users in this mock, any password works
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const signup = (name: string, email: string, phone: string): User => {
  const users = getStoredUsers();
  const newUser: User = {
    id: 'u' + (users.length + 1),
    name,
    email,
    phone,
    role: 'user',
    avatar: `https://i.pravatar.cc/150?u=${email}`
  };
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};
