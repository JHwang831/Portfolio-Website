import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import InteractiveFluidGradient from '../components/InteractiveFluidGradient';

// 텍스트 길이에 따른 변환 속도 조절
const getSpeedByLength = (text) => {
  if (!text) return 30;
  const length = text.length;
  if (length < 5) return 60;
  if (length < 15) return 40;
  if (length < 30) return 25;
  if (length < 60) return 15;
  return 8;
};

// 실시간 텍스트 변환 효과
const MorphText = ({ text = '' }) => {
  const { language } = useTheme();
  const [displayedText, setDisplayedText] = useState(text);
  const [morphIndex, setMorphIndex] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);
  const prevTextRef = useRef(text);
  const prevLanguageRef = useRef(language);

  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      setIsMorphing(true);
      setMorphIndex(0);
      prevLanguageRef.current = language;
    } else {
      setDisplayedText(text);
      prevTextRef.current = text;
    }
  }, [language, text]);

  useEffect(() => {
    if (!isMorphing || !text) return;

    const oldText = prevTextRef.current;
    const newText = text;
    const maxLength = Math.max(oldText.length, newText.length);
    const speed = getSpeedByLength(newText);

    if (morphIndex <= maxLength) {
      const timeout = setTimeout(() => {
        const morphed = newText.slice(0, morphIndex) + oldText.slice(morphIndex);
        setDisplayedText(morphed);
        setMorphIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsMorphing(false);
      setDisplayedText(newText);
      prevTextRef.current = newText;
    }
  }, [isMorphing, morphIndex, text]);

  return <>{displayedText}</>;
};

const content = {
  EN: {
    name: 'Junhyeok Hwang',
    subtitle: 'Developer & Designer',
    status: 'Social Service Personnel (ROK)',
  },
  KR: {
    name: '황준혁',
    subtitle: '개발자 & 디자이너',
    status: '사회복무요원',
  }
};

const Home = () => {
  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language] || content.EN;
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef(null);

  // 다크모드 감지
  const isDarkMode = c.bg === '#0d1117';

  // 마우스 위치 추적
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  // 3D Tilt 계산
  const getTiltTransform = () => {
    const maxTilt = 8;
    const centerX = 50;
    const centerY = 50;
    
    const rotateY = ((mousePosition.x - centerX) / 50) * maxTilt;
    const rotateX = -((mousePosition.y - centerY) / 50) * maxTilt;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // 테마별 이름 그라디언트 색상
  const nameGradientStyle = useMemo(() => {
    const colors = isDarkMode
      ? {
          color1: '#ffffff',
          color2: '#f0f0f0',
          color3: '#ffffff',
          color4: '#e0e0e0'
        }
      : {
          color1: '#ffffff',
          color2: '#f8f8f8',
          color3: '#ffffff',
          color4: '#f0f0f0'
        };

    return {
      color: colors.color1,
      background: `linear-gradient(
        90deg,
        ${colors.color1},
        ${colors.color2},
        ${colors.color3},
        ${colors.color4},
        ${colors.color1}
      )`,
      backgroundSize: '300% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      MozBackgroundClip: 'text',
      MozTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 2px 20px rgba(255, 255, 255, 0.3)'
    };
  }, [isDarkMode]);

  // Subtitle 색상 - 흰색으로 통일
  const subtitleColor = '#ffffff';

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        transition: 'background-color 0.8s ease'
      }}
    >
      {/* Interactive Fluid Gradient Background */}
      <InteractiveFluidGradient />

      {/* 3D Tilt Container */}
      <div 
        style={{
          maxWidth: '512px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          transform: getTiltTransform(),
          transition: 'transform 0.3s ease',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))'
        }}
      >
        {/* Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '9999px',
          fontSize: '14px',
          marginBottom: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          filter: 'brightness(1.2)'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
            boxShadow: '0 0 15px rgba(34, 197, 94, 1), 0 0 30px rgba(34, 197, 94, 0.6)'
          }} />
          <span style={{ 
            color: '#ffffff',
            fontWeight: 600,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)',
            filter: 'brightness(1.2)'
          }}>
            <MorphText text={t.status} />
          </span>
        </div>

        {/* Name with Gradient Animation */}
        <h1 
          key={`name-${isDarkMode}`}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 3.75rem)',
            fontWeight: 700,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            padding: '6px 0',
            textAlign: 'center',
            animation: 'gradient-shift 8s ease infinite',
            filter: 'brightness(1.3) drop-shadow(0 6px 20px rgba(0, 0, 0, 0.4)) drop-shadow(0 10px 40px rgba(0, 0, 0, 0.3))',
            ...nameGradientStyle
          }}
        >
          <MorphText text={t.name} />
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
          fontWeight: 500,
          color: subtitleColor,
          marginBottom: '0',
          textShadow: '0 3px 15px rgba(0, 0, 0, 0.5), 0 6px 30px rgba(0, 0, 0, 0.3)',
          filter: 'brightness(1.2) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3))'
        }}>
          <MorphText text={t.subtitle} />
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;