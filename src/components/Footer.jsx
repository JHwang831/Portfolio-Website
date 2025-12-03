import React from 'react';
import { useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  { icon: <Github size={20} />, href: 'https://github.com/JHwang831' },
  { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/junhyeok-hwang-497413226/' },
  { icon: <Mail size={20} />, href: 'mailto:jun00883311@gmail.com' }
];

const Footer = () => {
  const { theme } = useTheme();
  const c = theme;
  const location = useLocation();
  
  // HOME 페이지인지 체크
  const isHomePage = location.pathname === '/';
  
  // 다크모드 감지
  const isDarkMode = c.bg === '#0d1117';
  
  // Footer 스타일 결정
  const getFooterStyle = () => {
    if (isHomePage) {
      // HOME 페이지: 완전 투명! (모든 스타일 명시)
      return {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderTop: 'none',
        border: 'none',
        boxShadow: 'none',
        padding: '20px 0',
        transition: 'all 0.3s ease',
        zIndex: 50
      };
    } else {
      // 다른 페이지: 일반 스타일
      return {
        borderTop: `1px solid ${c.border}`,
        padding: '32px 0'
      };
    }
  };

  return (
    <footer style={getFooterStyle()}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: isHomePage ? 'transparent' : undefined
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          backgroundColor: isHomePage ? 'transparent' : undefined
        }}>
          {socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                padding: '8px',
                color: isHomePage ? '#ffffff' : c.textMuted,
                borderRadius: '6px',
                display: 'flex',
                transition: 'all 0.3s ease',
                filter: isHomePage 
                  ? 'brightness(1.5) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4))'
                  : 'none'
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p style={{ 
          fontSize: '14px', 
          color: isHomePage ? '#ffffff' : c.textMuted, 
          margin: 0,
          fontWeight: isHomePage ? 600 : 400,
          filter: isHomePage 
            ? 'brightness(1.5) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))'
            : 'none',
          textShadow: isHomePage ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none'
        }}>
          © 2025 Junhyeok Hwang
        </p>
      </div>
    </footer>
  );
};

export default Footer;