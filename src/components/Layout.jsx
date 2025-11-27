import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  const c = theme;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: c.bg, 
      color: c.text,
      transition: 'background-color 0.3s, color 0.3s',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '64px' }}>
        {children}
      </main>
      <Footer />

      {/* Global Styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .nav-mobile-menu { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
