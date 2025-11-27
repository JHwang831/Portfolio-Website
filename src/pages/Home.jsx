import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const content = {
  EN: {
    name: 'Junhyeok Hwang',
    subtitle: 'Developer & Designer',
    description: 'CS graduate from QMUL. Building things with code and design.',
    status: 'Social Service Personnel (ROK)',
  },
  KR: {
    name: '황준혁',
    subtitle: '개발자 & 디자이너',
    description: 'QMUL 컴퓨터과학 졸업. 코드와 디자인으로 무언가를 만듭니다.',
    status: '사회복무요원',
  }
};

const TypewriterText = ({ text, speed = 25 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <>
      {displayedText}
      {currentIndex < text.length && (
        <span style={{ 
          animation: 'blink 1s step-end infinite',
          marginLeft: '2px'
        }}>|</span>
      )}
    </>
  );
};

const Home = () => {
  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language];

  return (
    <section style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px'
    }}>
      <div style={{ maxWidth: '512px', textAlign: 'center' }}>
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          backgroundColor: c.bgSecondary,
          border: `1px solid ${c.border}`,
          borderRadius: '9999px',
          fontSize: '14px',
          marginBottom: '32px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{ color: c.textMuted }}>
            <TypewriterText text={t.status} speed={30} />
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 3.75rem)',
          fontWeight: 700,
          color: c.textPrimary,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          <TypewriterText text={t.name} speed={35} />
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
          fontWeight: 500,
          color: c.accent,
          marginBottom: '24px'
        }}>
          <TypewriterText text={t.subtitle} speed={30} />
        </p>

        {/* Description */}
        <p style={{
          fontSize: '16px',
          color: c.text,
          lineHeight: 1.6,
          maxWidth: '400px',
          margin: '0 auto',
          minHeight: '50px'
        }}>
          <TypewriterText text={t.description} speed={20} />
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Home;