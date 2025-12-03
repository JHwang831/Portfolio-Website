import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  const c = theme;
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // HOME 페이지 확인
  const isHomePage = location.pathname === '/';

  // 페이지 전환 시 fade 효과
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div style={{ 
      minHeight: '100vh',
      height: isHomePage ? '100vh' : 'auto',
      overflow: isHomePage ? 'hidden' : 'visible',
      backgroundColor: isHomePage ? 'transparent' : c.bg,
      color: c.text,
      transition: 'background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1), color 1s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* 페이지 전환 시 부드러운 overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: isHomePage ? 'transparent' : c.bg,
        opacity: isTransitioning ? 0.3 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      <Navbar />
      <main style={{ 
        flex: 1, 
        paddingTop: isHomePage ? '0' : '64px',
        backgroundColor: isHomePage ? 'transparent' : undefined,
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.8s ease',
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