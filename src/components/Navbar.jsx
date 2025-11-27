import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = {
  EN: ['Home', 'About', 'Portfolio', 'Blog'],
  KR: ['홈', '소개', '포트폴리오', '블로그']
};

const navPaths = ['/', '/about', '/portfolio', '/blog'];

const Navbar = () => {
  const { darkMode, toggleDarkMode, language, toggleLanguage, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const c = theme;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: scrolled ? (darkMode ? 'rgba(13,17,23,0.95)' : 'rgba(255,255,255,0.95)') : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: scrolled ? `1px solid ${c.border}` : 'none',
      transition: 'all 0.3s'
    }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo */}
          <Link to="/" style={{ 
            fontFamily: 'monospace', 
            fontSize: '18px', 
            fontWeight: 600, 
            color: c.textPrimary,
            textDecoration: 'none'
          }}>
            @jhwang
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {navItems[language].map((item, i) => (
              <Link
                key={i}
                to={navPaths[i]}
                style={{
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: location.pathname === navPaths[i] ? c.accent : c.textMuted,
                  textDecoration: 'none',
                  borderRadius: '6px',
                }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleDarkMode}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="theme-toggle-btn"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
              aria-label="Toggle dark mode"
            >
              <div style={{
                position: 'relative',
                width: '20px',
                height: '20px',
                color: isHovering 
                  ? (darkMode ? '#fbbf24' : '#6366f1') 
                  : c.textMuted,
                transition: 'color 0.3s ease'
              }}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </button>

            <button
              onClick={toggleLanguage}
              style={{
                padding: '6px 10px',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: 'monospace',
                border: `1px solid ${c.border}`,
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: c.textMuted,
                cursor: 'pointer'
              }}
            >
              {language}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-mobile-btn"
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: 'transparent',
                color: c.textMuted,
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center'
              }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="nav-mobile-menu" style={{ 
          backgroundColor: c.bgSecondary, 
          borderTop: `1px solid ${c.border}`,
          padding: '12px 16px',
          display: 'none'
        }}>
          {navItems[language].map((item, i) => (
            <Link
              key={i}
              to={navPaths[i]}
              style={{
                display: 'block',
                padding: '8px 12px',
                fontSize: '14px',
                fontWeight: 500,
                color: c.text,
                textDecoration: 'none',
                borderRadius: '6px'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .theme-toggle-btn {
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .theme-toggle-btn:active {
          transform: rotate(360deg);
        }

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
    </nav>
  );
};

export default Navbar;