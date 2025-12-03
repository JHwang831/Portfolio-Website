import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  const c = theme;
  const location = useLocation();
  
  // HOME 페이지 확인
  const isHomePage = location.pathname === '/';

  return (
    <div style={{ 
      minHeight: '100vh',
      height: isHomePage ? '100vh' : 'auto',
      overflow: isHomePage ? 'hidden' : 'visible',
      backgroundColor: c.bg,
      color: c.text,
      transition: 'background-color 1.2s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Navbar />
      <main style={{ 
        flex: 1, 
        paddingTop: isHomePage ? '0' : '64px',
        position: 'relative',
        zIndex: 2
      }}>
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