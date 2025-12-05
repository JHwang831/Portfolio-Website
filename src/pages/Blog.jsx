import React, { useState, useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import usePageBackground from '../hooks/usePageBackground';

const getSpeedByLength = (text) => {
  if (!text) return 30;
  const length = text.length;
  if (length < 5) return 60;
  if (length < 15) return 40;
  if (length < 30) return 25;
  return 15;
};

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
    title: 'Blog',
    subtitle: 'Thoughts, tutorials, and dev logs',
    empty: 'No posts yet. Coming soon!',
    posts: []
  },
  KR: {
    title: '블로그',
    subtitle: '생각, 튜토리얼, 개발 일지',
    empty: '아직 포스트가 없습니다. 곧 업데이트됩니다!',
    posts: []
  }
};

const Blog = () => {
  usePageBackground();

  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language] || content.EN;

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: c.textPrimary, marginBottom: '8px' }}>
        <MorphText text={t.title} />
      </h1>
      <p style={{ fontSize: '16px', color: c.textMuted, marginBottom: '32px' }}>
        <MorphText text={t.subtitle} />
      </p>

      {t.posts.length === 0 ? (
        <div style={{
          backgroundColor: c.bgSecondary,
          border: `1px solid ${c.border}`,
          borderRadius: '8px',
          padding: '48px 24px',
          textAlign: 'center'
        }}>
          <FileText size={48} style={{ color: c.textMuted, marginBottom: '16px' }} />
          <p style={{ fontSize: '16px', color: c.textMuted, margin: 0 }}>
            <MorphText text={t.empty} />
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {t.posts.map((post, i) => (
            <article
              key={i}
              style={{
                backgroundColor: c.bgSecondary,
                border: `1px solid ${c.border}`,
                borderRadius: '8px',
                padding: '24px',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '14px', color: c.textMuted }}>
                <MorphText text={post.date} />
              </span>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: 600, 
                color: c.textPrimary, 
                margin: '8px 0' 
              }}>
                <MorphText text={post.title} />
              </h2>
              <p style={{ fontSize: '14px', color: c.text, margin: '0 0 12px 0', lineHeight: 1.6 }}>
                <MorphText text={post.description} />
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {post.tags?.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: '4px',
                      color: c.accent
                    }}
                  >
                    <MorphText text={tag} />
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;