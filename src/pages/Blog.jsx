import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import usePageBackground from '../hooks/usePageBackground';

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
// BLOG POST DATA (Export for BlogPost page)
// ============================================================================

export const blogPostsData = {
  EN: [
    {
      id: 'futgg-development',
      slug: 'building-futgg-translation-tool',
      title: 'Building the FUT.gg Translation Tool',
      category: 'Development',
      date: '2024-12-05',
      tags: ['JavaScript', 'Tampermonkey', 'Translation'],
      excerpt: 'How I created a Tampermonkey script to provide Korean translations for the FC25 community, featuring DOM traversal and regex pattern matching for over 600 items.',
      content: `The FC25 Ultimate Team community in Korea was struggling with the English-only interface of FUT.gg, one of the most comprehensive player databases for the game. As someone who plays FC25 and understands both Korean and English, I saw an opportunity to bridge this gap.

I decided to build a Tampermonkey userscript that would automatically translate key elements of the FUT.gg website into Korean. The script needed to traverse the DOM to find translatable elements, match patterns using regex for player names and stats, apply translations in real-time without breaking functionality, and support over 600 items including players, chemstyles, and game mechanics.

The biggest challenge was traversing the dynamic DOM without impacting performance. I used MutationObserver to detect changes and apply translations only when necessary. The key was to observe only specific parts of the page that actually contained translatable content, rather than watching the entire document.

For player names and stats, I implemented a comprehensive regex system. Each translation category had its own pattern matcher for player names, positions, and stats. The challenge was handling edge cases like hyphenated names, special characters, and multi-word positions.

I organized translations into a modular system with separate files for players, positions, chemstyles, and stats. This modular approach made updates much easier. When EA releases new players, I only need to update the relevant file.

The tool currently supports over 600 player names, all positions and formations, chemistry styles, and player stats. I'm currently optimizing it for FC26 compatibility.

Performance was crucial. I applied debouncing to DOM mutations, used Map for O(1) translation lookups, translated only visible elements using Intersection Observer, and implemented lazy loading for translation files.

FUT.gg uses React, making DOM manipulation tricky. I implemented a debounced MutationObserver that only triggers after the DOM settles, which reduced translation calls by 80%. With 600+ translations, performance optimization was essential using Map data structures and translation caching.

The response from the Korean FC25 community has been incredibly positive with 200+ active users, multiple feature requests, and contributors helping with translations.

I'm currently optimizing the script for FC26 compatibility. The upcoming version will include user-customizable translations, a translation contribution system, support for additional languages, better performance with Web Workers, and automatic updates.

Building this tool taught me valuable lessons about browser extension development, DOM manipulation and performance, working with dynamic React applications, and serving a user community. The positive feedback from Korean FC25 players has been incredibly rewarding.`,
      featured: true
    }
  ],
  KR: [
    {
      id: 'futgg-development',
      slug: 'building-futgg-translation-tool',
      title: 'FUT.gg 번역 도구 개발기',
      category: '개발',
      date: '2024-12-05',
      tags: ['JavaScript', 'Tampermonkey', '번역'],
      excerpt: 'FC25 커뮤니티를 위한 한국어 번역을 제공하는 Tampermonkey 스크립트 개발 과정. DOM traversal과 regex 패턴 매칭으로 600개 이상의 항목을 번역합니다.',
      content: `한국의 FC25 얼티밋 팀 커뮤니티는 FUT.gg의 영어 전용 인터페이스로 어려움을 겪고 있었습니다. FC25를 플레이하고 한국어와 영어를 모두 이해하는 사람으로서, 저는 이 간극을 메울 기회를 발견했습니다.

FUT.gg 웹사이트의 주요 요소를 자동으로 한국어로 번역하는 Tampermonkey 유저스크립트를 만들기로 결정했습니다. 스크립트는 번역 가능한 요소를 찾기 위한 DOM 순회, 선수 이름과 스탯에 대한 regex 패턴 매칭, 기능을 손상시키지 않는 실시간 번역 적용, 그리고 선수, 켐스타일, 게임 메커니즘을 포함한 600개 이상의 항목 지원이 필요했습니다.

가장 큰 도전은 성능에 영향을 주지 않으면서 동적 DOM을 순회하는 것이었습니다. MutationObserver를 사용하여 변경 사항을 감지하고 필요할 때만 번역을 적용했습니다. 핵심은 전체 문서를 감시하는 대신 실제로 번역 가능한 콘텐츠가 있는 페이지의 특정 부분만 관찰하는 것이었습니다.

선수 이름과 스탯을 위해 포괄적인 regex 시스템을 구현했습니다. 각 번역 카테고리에는 선수 이름, 포지션, 스탯에 대한 자체 패턴 매처가 있었습니다. 하이픈으로 연결된 이름, 특수 문자, 여러 단어로 된 포지션과 같은 엣지 케이스를 처리하는 것이 과제였습니다.

번역을 선수, 포지션, 켐스타일, 스탯에 대한 별도 파일이 있는 모듈식 시스템으로 구성했습니다. 이러한 모듈식 접근 방식으로 업데이트가 훨씬 쉬워졌습니다. EA가 새 선수를 출시하면 관련 파일만 업데이트하면 됩니다.

현재 이 도구는 600개 이상의 선수 이름, 모든 포지션과 포메이션, 케미스트리 스타일, 선수 스탯을 지원합니다. 현재 FC26 호환성을 위해 최적화 중입니다.

성능이 중요했습니다. DOM 변경에 디바운싱을 적용하고, O(1) 번역 조회를 위해 Map을 사용하고, Intersection Observer를 사용하여 보이는 요소만 번역하고, 번역 파일에 대한 지연 로딩을 구현했습니다.

FUT.gg는 React를 사용하여 DOM 조작이 까다로웠습니다. DOM이 안정된 후에만 트리거되는 디바운스된 MutationObserver를 구현하여 번역 호출을 80% 줄였습니다. 600개 이상의 번역으로 Map 자료구조와 번역 캐싱을 사용한 성능 최적화가 필수적이었습니다.

한국 FC25 커뮤니티의 반응은 200명 이상의 활성 사용자, 여러 기능 요청, 번역을 돕는 기여자들과 함께 믿을 수 없을 정도로 긍정적이었습니다.

현재 FC26 호환성을 위한 스크립트 최적화 중입니다. 다가오는 버전에는 사용자 맞춤 번역, 번역 기여 시스템, 추가 언어 지원, Web Workers로 더 나은 성능, 자동 업데이트가 포함됩니다.

이 도구를 개발하면서 브라우저 확장 프로그램 개발, DOM 조작 및 성능, 동적 React 애플리케이션 작업, 사용자 커뮤니티 서비스에 대한 귀중한 교훈을 얻었습니다. 한국 FC25 플레이어들의 긍정적인 피드백은 정말 보람찼습니다.`,
      featured: true
    }
  ]
};

// ============================================================================
// BLOG CARD COMPONENT
// ============================================================================

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

  const readTime = calculateReadTime(post.content);

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
      {/* Date & Read Time */}
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
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '24px',
        fontWeight: 700,
        color: c.textPrimary,
        margin: '0 0 12px 0',
        lineHeight: 1.3
      }}>
        <MorphText text={post.title} />
      </h2>

      {/* Excerpt */}
      <p style={{
        fontSize: '15px',
        color: c.text,
        margin: '0 0 16px 0',
        lineHeight: 1.6
      }}>
        <MorphText text={post.excerpt} />
      </p>

      {/* Read More */}
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

// ============================================================================
// MAIN BLOG COMPONENT (List Page)
// ============================================================================

const Blog = () => {
  const { language, theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const c = theme;

  usePageBackground();

  const content = {
    EN: {
      title: 'Blog',
      subtitle: 'Thoughts, tutorials, and dev logs',
      categories: ['All Posts', 'Development', 'Experience', 'Design']
    },
    KR: {
      title: '블로그',
      subtitle: '생각, 튜토리얼, 개발 일지',
      categories: ['전체', '개발', '경험', '디자인']
    }
  };

  const t = content[language];
  const posts = blogPostsData[language];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : selectedCategory === 'development'
    ? posts.filter(p => p.category === (language === 'EN' ? 'Development' : '개발'))
    : selectedCategory === 'experience'
    ? posts.filter(p => p.category === (language === 'EN' ? 'Experience' : '경험'))
    : posts.filter(p => p.category === (language === 'EN' ? 'Design' : '디자인'));

  const handlePostClick = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
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

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {t.categories.map((cat, i) => {
          const categoryValue = ['all', 'development', 'experience', 'design'][i];
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

      {/* Blog Posts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {filteredPosts.map((post, i) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post)}
            index={i}
            theme={theme}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: c.textMuted
        }}>
          <p style={{ fontSize: '18px', margin: 0 }}>
            <MorphText text={language === 'EN' ? 'No posts in this category yet.' : '이 카테고리에 아직 포스트가 없습니다.'} />
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;