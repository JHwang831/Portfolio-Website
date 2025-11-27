import React, { createContext, useContext, useState } from 'react';
import { getTheme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLanguage = () => setLanguage(language === 'EN' ? 'KR' : 'EN');

  const theme = getTheme(darkMode);

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      language, 
      toggleLanguage, 
      theme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
