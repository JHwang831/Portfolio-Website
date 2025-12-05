import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import usePageBackground from '../hooks/usePageBackground';

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

const loadBlogPosts = async (language) => {
  const postSlugs = [
    // 포스트를 추가하려면 여기에 slug를 추가하세요
    // 예: 'my-first-post'
  ];

  const posts = [];

  for (const slug of postSlugs) {
    try {
      const langSuffix = language === 'EN' ? 'en' : 'kr';
      let response = await fetch(`/blog/posts/${slug}-${langSuffix}.md`);
      
      let hasCurrentLang = response.ok;
      let hasOtherLang = false;
      let languageOnly = null;

      const otherLangSuffix = language === 'EN' ? 'kr' : 'en';
      const otherResponse = await fetch(`/blog/posts/${slug}-${otherLangSuffix}.md`);
      hasOtherLang = otherResponse.ok;

      if (!hasCurrentLang && hasOtherLang) {
        response = otherResponse;
        languageOnly = otherLangSuffix;
      }

      if (response.ok) {
        const markdown = await response.text();
        const { data } = parseMarkdown(markdown);
        
        if (hasCurrentLang && !hasOtherLang) {
          languageOnly = langSuffix;
        }

        posts.push({
          ...data,
          slug: data.slug || slug,
          languageOnly: data.languageOnly || languageOnly,
          tags: data.tags ? data.tags.split(',').map(t => t.trim()) : []
        });
      }
    } catch (error) {
      console.error(`Failed to load post: ${slug}`, error);
    }
  }

  return posts;
};

const BlogCard = ({ post, onClick, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const c = theme;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const readTime = post.excerpt ? calculateReadTime(post.excerpt) : 5;

  const getLanguageTag = () => {
    if (post.languageOnly === 'kr') {
      return '한국어 포스트';
    } else if (post.languageOnly === 'en') {
      return 'English Only';
    }
    return null;
  };

  const languageTag = getLanguageTag();

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: c.bgSecondary,
        border: `1px solid ${c.border}`,
        borderRadius: '12px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? (isHovered ? 'translateY(-4px)' : 'translateY(0)') 
          : 'translateY(20px)',
        boxShadow: isHovered ? `0 8px 24px ${c.accent}20` : 'none'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: c.textMuted
        }}>
          <Calendar size={16} />
          <MorphText text={post.date} />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: c.textMuted
        }}>
          <Clock size={16} />
          <span>{readTime} min read</span>
        </div>
        {post.featured && (
          <span style={{
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: `${c.accent}20`,
            color: c.accent,
            borderRadius: '4px'
          }}>
            Featured
          </span>
        )}
        {languageTag && (
          <span style={{
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: post.languageOnly === 'kr' ? '#10b98120' : '#3b82f620',
            color: post.languageOnly === 'kr' ? '#10b981' : '#3b82f6',
            borderRadius: '4px'
          }}>
            {languageTag}
          </span>
        )}
      </div>

      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: c.textPrimary,
        margin: '0 0 12px 0',
        lineHeight: 1.3
      }}>
        <MorphText text={post.title} />
      </h2>

      <p style={{
        fontSize: '15px',
        color: c.text,
        margin: '0 0 16px 0',
        lineHeight: 1.6
      }}>
        <MorphText text={post.excerpt} />
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: c.accent,
        fontSize: '14px',
        fontWeight: 600
      }}>
        <span>Read more</span>
        <ArrowRight size={16} style={{
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
        }} />
      </div>
    </article>
  );
};

const Blog = () => {
  const { language, theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const c = theme;

  usePageBackground();

  useEffect(() => {
    const loadPosts = async () => {
      const loadedPosts = await loadBlogPosts(language);
      setPosts(loadedPosts);
      setInitialLoading(false);
    };

    loadPosts();
  }, [language]);

  const content = {
    EN: {
      title: 'Blog',
      subtitle: 'Thoughts, tutorials, and dev logs',
      categories: ['All Posts', 'Development', 'Design', 'Personal Stories'],
      noPostsYet: 'No posts in this category yet.'
    },
    KR: {
      title: '블로그',
      subtitle: '생각, 튜토리얼, 개발 일지',
      categories: ['전체', '개발', '디자인', '개인적인 이야기들'],
      noPostsYet: '이 카테고리에 아직 포스트가 없습니다.'
    }
  };

  const t = content[language];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : selectedCategory === 'development'
    ? posts.filter(p => p.category === (language === 'EN' ? 'Development' : '개발'))
    : selectedCategory === 'design'
    ? posts.filter(p => p.category === (language === 'EN' ? 'Design' : '디자인'))
    : posts.filter(p => p.category === (language === 'EN' ? 'Personal Stories' : '개인적인 이야기들'));

  const handlePostClick = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  // 처음 로드할 때만 null 리턴
  if (initialLoading) {
    return null;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          color: c.textPrimary,
          margin: '0 0 8px 0'
        }}>
          <MorphText text={t.title} />
        </h1>
        <p style={{
          fontSize: '16px',
          color: c.textMuted,
          margin: 0
        }}>
          <MorphText text={t.subtitle} />
        </p>
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {t.categories.map((cat, i) => {
          const categoryValue = ['all', 'development', 'design', 'personal'][i];
          return (
            <button
              key={i}
              onClick={() => setSelectedCategory(categoryValue)}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                border: `2px solid ${selectedCategory === categoryValue ? c.accent : c.border}`,
                borderRadius: '24px',
                backgroundColor: selectedCategory === categoryValue ? `${c.accent}20` : c.bgSecondary,
                color: selectedCategory === categoryValue ? c.accent : c.text,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== categoryValue) {
                  e.currentTarget.style.backgroundColor = c.bg;
                  e.currentTarget.style.borderColor = c.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== categoryValue) {
                  e.currentTarget.style.backgroundColor = c.bgSecondary;
                  e.currentTarget.style.borderColor = c.border;
                }
              }}
            >
              <MorphText text={cat} />
            </button>
          );
        })}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {filteredPosts.map((post, i) => (
          <BlogCard
            key={post.slug}
            post={post}
            onClick={() => handlePostClick(post)}
            index={i}
            theme={theme}
          />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: c.textMuted
        }}>
          <p style={{ fontSize: '18px', margin: 0 }}>
            <MorphText text={t.noPostsYet} />
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;