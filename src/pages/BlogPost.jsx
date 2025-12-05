import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import usePageBackground from '../hooks/usePageBackground';
import { blogPostsData } from './Blog';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getSpeedByLength = (text) => {
  if (!text) return 30;
  const length = text.length;
  if (length < 5) return 60;
  if (length < 15) return 40;
  if (length < 30) return 25;
  if (length < 60) return 15;
  return 8;
};

const calculateReadTime = (content) => {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
};

// ============================================================================
// MORPH TEXT COMPONENT
// ============================================================================

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

// ============================================================================
// BLOG POST PAGE
// ============================================================================

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, theme } = useTheme();
  const c = theme;

  usePageBackground();

  // Find post by slug
  const posts = blogPostsData[language];
  const post = posts.find(p => p.slug === slug);

  // If post not found, redirect to blog list
  useEffect(() => {
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  const readTime = calculateReadTime(post.content);

  const labels = {
    EN: {
      back: 'Back to Blog',
      readTime: 'min read',
      date: 'Published',
      viewGithub: 'View on GitHub'
    },
    KR: {
      back: '블로그로 돌아가기',
      readTime: '분 읽기',
      date: '발행일',
      viewGithub: 'GitHub에서 보기'
    }
  };

  const t = labels[language];

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 24px 80px 24px'
    }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/blog')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 500,
          border: `1px solid ${c.border}`,
          borderRadius: '8px',
          backgroundColor: c.bgSecondary,
          color: c.text,
          cursor: 'pointer',
          marginBottom: '32px',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = c.bg;
          e.currentTarget.style.borderColor = c.accent;
          e.currentTarget.style.color = c.accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = c.bgSecondary;
          e.currentTarget.style.borderColor = c.border;
          e.currentTarget.style.color = c.text;
        }}
      >
        <ArrowLeft size={16} />
        <MorphText text={t.back} />
      </button>

      {/* Post Header */}
      <header style={{ marginBottom: '40px' }}>
        {/* Category Badge */}
        <span style={{
          display: 'inline-block',
          padding: '6px 12px',
          fontSize: '14px',
          fontWeight: 600,
          backgroundColor: `${c.accent}20`,
          color: c.accent,
          borderRadius: '6px',
          marginBottom: '16px'
        }}>
          <MorphText text={post.category} />
        </span>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 700,
          color: c.textPrimary,
          margin: '0 0 16px 0',
          lineHeight: 1.2,
          letterSpacing: '-0.02em'
        }}>
          <MorphText text={post.title} />
        </h1>

        {/* Meta Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '15px',
            color: c.textMuted
          }}>
            <Calendar size={18} />
            <MorphText text={post.date} />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '15px',
            color: c.textMuted
          }}>
            <Clock size={18} />
            <span>{readTime} {t.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                fontSize: '14px',
                backgroundColor: c.bgSecondary,
                border: `1px solid ${c.border}`,
                borderRadius: '6px',
                color: c.textMuted
              }}
            >
              <Tag size={14} />
              <MorphText text={tag} />
            </span>
          ))}
        </div>
      </header>

      {/* Divider */}
      <div style={{
        height: '1px',
        backgroundColor: c.border,
        margin: '40px 0'
      }} />

      {/* Article Content */}
      <article style={{
        fontSize: '18px',
        lineHeight: 1.8,
        color: c.text,
        letterSpacing: '-0.01em'
      }}>
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} style={{
            margin: '0 0 24px 0',
            textAlign: 'justify'
          }}>
            {paragraph}
          </p>
        ))}
      </article>

      {/* Divider */}
      <div style={{
        height: '1px',
        backgroundColor: c.border,
        margin: '60px 0 40px 0'
      }} />

      {/* GitHub Link (if FUT.gg post) */}
      {post.id === 'futgg-development' && (
        <div style={{
          backgroundColor: c.bgSecondary,
          border: `1px solid ${c.border}`,
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '40px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: c.textPrimary,
            margin: '0 0 16px 0'
          }}>
            {language === 'EN' ? 'Project Repository' : '프로젝트 저장소'}
          </h3>
          <a
            href="https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              fontSize: '15px',
              fontWeight: 500,
              backgroundColor: c.accent,
              color: '#ffffff',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 12px ${c.accent}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Github size={18} />
            <span>{t.viewGithub}</span>
            <ExternalLink size={16} />
          </a>
        </div>
      )}

      {/* Back Button (Bottom) */}
      <button
        onClick={() => navigate('/blog')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          fontSize: '15px',
          fontWeight: 500,
          border: `2px solid ${c.accent}`,
          borderRadius: '8px',
          backgroundColor: `${c.accent}10`,
          color: c.accent,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          width: '100%',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = c.accent;
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${c.accent}10`;
          e.currentTarget.style.color = c.accent;
        }}
      >
        <ArrowLeft size={18} />
        <MorphText text={t.back} />
      </button>
    </div>
  );
};

export default BlogPost;
