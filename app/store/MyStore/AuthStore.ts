import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { User } from '../Models/User';
import { ENDPOINTS } from '../constants/api';

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(ENDPOINTS.LOGIN, { email, password });
          console.log('Login successful:', response.data.user);
          const { id, role, token } = response.data.user;
          set({  user: { id, role, token } });
       
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },
      logout: () => set({ user: null }),
    }),
    { name: 'auth-store' }
  )
);