import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { LightTheme, DarkTheme } from '@/constants/theme';

const THEME_MODE_KEY = 'userThemeMode';

type ModeContextType = {
  isDarkMode: boolean;
  theme: typeof LightTheme | typeof DarkTheme;
  toggleMode: () => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadThemeMode = async () => {
      const storedMode = await SecureStore.getItemAsync(THEME_MODE_KEY);
      setIsDarkMode(storedMode === 'dark');
    };
    loadThemeMode();
  }, []);

  const toggleMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await SecureStore.setItemAsync(THEME_MODE_KEY, newMode ? 'dark' : 'light');
  };

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ModeContext.Provider value={{ isDarkMode, theme, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
