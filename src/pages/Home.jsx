import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// 텍스트 길이에 따른 변환 속도 조절
const getSpeedByLength = (text) => {
  if (!text) return 30;
  const length = text.length;
  if (length < 5) return 60;    // 매우 짧은 텍스트: 천천히
  if (length < 15) return 40;   // 짧은 텍스트: 보통
  if (length < 30) return 25;   // 중간 텍스트: 빠르게
  if (length < 60) return 15;   // 긴 텍스트: 매우 빠르게
  return 8;                     // 매우 긴 텍스트: 초고속
};

// 실시간 텍스트 변환 효과
const MorphText = ({ text = '' }) => {
  const { language } = useTheme();
  const [displayedText, setDisplayedText] = useState(text);
  const [morphIndex, setMorphIndex] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);
  const prevTextRef = useRef(text);
  const prevLanguageRef = useRef(language);

  // 언어 변경 감지
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      console.log('🔄 Start morphing:', prevTextRef.current, '→', text);
      setIsMorphing(true);
      setMorphIndex(0);
      prevLanguageRef.current = language;
    } else {
      setDisplayedText(text);
      prevTextRef.current = text;
    }
  }, [language, text]);

  // 변환 애니메이션
  useEffect(() => {
    if (!isMorphing || !text) return;

    const oldText = prevTextRef.current;
    const newText = text;
    const maxLength = Math.max(oldText.length, newText.length);
    const speed = getSpeedByLength(newText); // 속도 자동 조절!

    if (morphIndex <= maxLength) {
      const timeout = setTimeout(() => {
        // 앞부분은 새 텍스트, 뒷부분은 이전 텍스트
        const morphed = newText.slice(0, morphIndex) + oldText.slice(morphIndex);
        setDisplayedText(morphed);
        setMorphIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // 완료
      setIsMorphing(false);
      setDisplayedText(newText);
      prevTextRef.current = newText;
      console.log('✅ Morph complete:', newText, `(${speed}ms/step)`);
    }
  }, [isMorphing, morphIndex, text]);

  return <>{displayedText}</>;
};

const content = {
  EN: {
    name: 'Junhyeok Hwang',
    subtitle: 'Developer & Designer',
    description: 'Specialising in regex-based text processing and web automation.',
    status: 'Social Service Personnel (ROK)',
  },
  KR: {
    name: '황준혁',
    subtitle: '개발자 & 디자이너',
    description: '정규표현식 기반 텍스트 처리와 웹 자동화를 전문으로 합니다.',
    status: '사회복무요원',
  }
};

const Home = () => {
  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language] || content.EN;

  return (
    <section style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px',
      paddingTop: '64px'
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
          marginBottom: '24px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{ color: c.textMuted }}>
            <MorphText text={t.status} />
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 3.75rem)',
          fontWeight: 700,
          color: c.textPrimary,
          marginBottom: '12px',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}>
          <MorphText text={t.name} />
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
          fontWeight: 500,
          color: c.accent,
          marginBottom: '20px'
        }}>
          <MorphText text={t.subtitle} />
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
          <MorphText text={t.description} />
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default Home;