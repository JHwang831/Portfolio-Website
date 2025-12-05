import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import usePageBackground from '../hooks/usePageBackground';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const parseMarkdown = (markdown) => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: markdown };
  }
  
  const [, frontmatter, content] = match;
  const data = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();
    
    if (key && value) {
      data[key] = value;
    }
  });
  
  return { data, content: content.trim() };
};

const getSpeedByLength = (text) => {
  if (!text) return 30;
  const length = text.length;
  if (length < 5) return 60;
  if (length < 15) return 40;
  if (length < 30) return 25;
  if (length < 60) return 15;
  return 8;
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

const calculateReadTime = (content) => {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language, theme } = useTheme();
  const [post, setPost] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [languageOnly, setLanguageOnly] = useState(null);
  const [contentKey, setContentKey] = useState(0);
  const prevLanguageRef = useRef(language);
  const c = theme;

  usePageBackground();

  useEffect(() => {
    if (prevLanguageRef.current !== language && post) {
      setContentKey(prev => prev + 1);
      prevLanguageRef.current = language;
    }
  }, [language, post]);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const langSuffix = language === 'EN' ? 'en' : 'kr';
        let response = await fetch(`/blog/posts/${slug}-${langSuffix}.md`);
        
        let hasCurrentLang = response.ok;
        let hasOtherLang = false;

        const otherLangSuffix = language === 'EN' ? 'kr' : 'en';
        const otherResponse = await fetch(`/blog/posts/${slug}-${otherLangSuffix}.md`);
        hasOtherLang = otherResponse.ok;

        if (!hasCurrentLang && hasOtherLang) {
          response = otherResponse;
        }

        if (response.ok) {
          const markdown = await response.text();
          const { data, content } = parseMarkdown(markdown);
          
          let onlyLang = null;
          if (hasCurrentLang && !hasOtherLang) {
            onlyLang = langSuffix;
          } else if (!hasCurrentLang && hasOtherLang) {
            onlyLang = otherLangSuffix;
          }

          setPost({
            ...data,
            content,
            tags: data.tags ? data.tags.split(',').map(t => t.trim()) : []
          });
          setLanguageOnly(data.languageOnly || onlyLang);
          setInitialLoading(false);
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.error('Failed to load post:', error);
        navigate('/blog');
      }
    };

    loadPost();
  }, [slug, language, navigate]);

  if (initialLoading) {
    return null;
  }

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

  const getLanguageTag = () => {
    if (languageOnly === 'kr') {
      return '한국어 포스트';
    } else if (languageOnly === 'en') {
      return 'English Only';
    }
    return null;
  };

  const languageTag = getLanguageTag();

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 24px 80px 24px'
    }}>
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

      <header 
        key={`header-${contentKey}`}
        style={{ 
          marginBottom: '40px',
          animation: 'headerFadeIn 0.4s ease'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 12px',
            fontSize: '14px',
            fontWeight: 600,
            backgroundColor: `${c.accent}20`,
            color: c.accent,
            borderRadius: '6px'
          }}>
            <MorphText text={post.category} />
          </span>
          {languageTag && (
            <span style={{
              display: 'inline-block',
              padding: '6px 12px',
              fontSize: '14px',
              fontWeight: 600,
              backgroundColor: languageOnly === 'kr' ? '#10b98120' : '#3b82f620',
              color: languageOnly === 'kr' ? '#10b981' : '#3b82f6',
              borderRadius: '6px'
            }}>
              {languageTag}
            </span>
          )}
        </div>

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

        {post.tags.length > 0 && (
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
        )}
      </header>

      <div style={{
        height: '1px',
        backgroundColor: c.border,
        margin: '40px 0'
      }} />

      <article 
        key={`content-${contentKey}`}
        className="blog-content"
        style={{
          fontSize: '18px',
          lineHeight: 1.8,
          color: c.text,
          letterSpacing: '-0.01em',
          animation: 'contentFadeIn 0.4s ease'
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => (
              <h1 style={{
                fontSize: '36px',
                fontWeight: 700,
                color: c.textPrimary,
                margin: '48px 0 24px 0',
                lineHeight: 1.3
              }} {...props} />
            ),
            h2: ({node, ...props}) => (
              <h2 style={{
                fontSize: '28px',
                fontWeight: 600,
                color: c.textPrimary,
                margin: '40px 0 20px 0',
                lineHeight: 1.4
              }} {...props} />
            ),
            h3: ({node, ...props}) => (
              <h3 style={{
                fontSize: '22px',
                fontWeight: 600,
                color: c.textPrimary,
                margin: '32px 0 16px 0',
                lineHeight: 1.4
              }} {...props} />
            ),
            p: ({node, ...props}) => (
              <p style={{
                margin: '0 0 24px 0',
                lineHeight: 1.8
              }} {...props} />
            ),
            img: ({node, ...props}) => (
              <img
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  margin: '32px 0',
                  boxShadow: `0 4px 12px ${c.border}`
                }}
                {...props}
              />
            ),
            a: ({node, ...props}) => (
              <a
                style={{
                  color: c.accent,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${c.accent}50`,
                  transition: 'all 0.2s ease'
                }}
                {...props}
              />
            ),
            code: ({node, inline, ...props}) => {
              if (inline) {
                return (
                  <code
                    style={{
                      backgroundColor: c.bgSecondary,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      color: c.accent
                    }}
                    {...props}
                  />
                );
              }
              return (
                <code
                  style={{
                    display: 'block',
                    backgroundColor: c.bgSecondary,
                    padding: '16px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontFamily: 'monospace',
                    overflowX: 'auto',
                    margin: '24px 0',
                    lineHeight: 1.6
                  }}
                  {...props}
                />
              );
            },
            blockquote: ({node, ...props}) => (
              <blockquote
                style={{
                  borderLeft: `4px solid ${c.accent}`,
                  paddingLeft: '20px',
                  margin: '24px 0',
                  color: c.textMuted,
                  fontStyle: 'italic'
                }}
                {...props}
              />
            ),
            ul: ({node, ...props}) => (
              <ul
                style={{
                  margin: '16px 0',
                  paddingLeft: '24px'
                }}
                {...props}
              />
            ),
            ol: ({node, ...props}) => (
              <ol
                style={{
                  margin: '16px 0',
                  paddingLeft: '24px'
                }}
                {...props}
              />
            ),
            li: ({node, ...props}) => (
              <li
                style={{
                  margin: '8px 0'
                }}
                {...props}
              />
            )
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <div style={{
        height: '1px',
        backgroundColor: c.border,
        margin: '60px 0 40px 0'
      }} />

      {slug.includes('futgg') && (
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

      <style>{`
        @keyframes headerFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;