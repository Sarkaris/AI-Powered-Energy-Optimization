import React, { createContext, useContext, useEffect } from 'react';

// Simplified theme context - single dark theme only
interface ThemeContextType {}

const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set dark theme permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};