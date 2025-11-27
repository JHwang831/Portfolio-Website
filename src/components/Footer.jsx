import React from 'react';
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

  return (
    <footer style={{
      borderTop: `1px solid ${c.border}`,
      padding: '32px 0'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                padding: '8px',
                color: c.textMuted,
                borderRadius: '6px',
                display: 'flex'
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '14px', color: c.textMuted, margin: 0 }}>
          © 2024 Junhyeok Hwang
        </p>
      </div>
    </footer>
  );
};

export default Footer;
