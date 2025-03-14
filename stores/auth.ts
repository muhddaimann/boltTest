import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  username: string;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: '',
  login: (username: string, password: string) => {
    set({ isAuthenticated: true, username });
  },
  logout: () => {
    set({ isAuthenticated: false, username: '' });
  },
}));