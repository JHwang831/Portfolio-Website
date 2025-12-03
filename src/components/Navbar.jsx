import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Trophy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = {
  EN: ['Home', 'About', 'Portfolio', 'Blog'],
  KR: ['홈', '소개', '포트폴리오', '블로그']
};

const navPaths = ['/', '/about', '/portfolio', '/blog'];

const achievementContent = {
  EN: {
    header: 'ACHIEVEMENT UNLOCKED',
    title: 'Secret Developer',
    description: 'You found the hidden easter egg!'
  },
  KR: {
    header: '업적 달성',
    title: '숨겨진 개발자',
    description: '숨겨진 이스터에그를 발견했습니다!'
  }
};

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

// Steam Achievement용 Typewriter
const TypewriterText = ({ text = '', speed = 50 }) => {
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

  return <>{displayedText}</>;
};

// Steam 스타일 Achievement 모달
const SteamAchievementModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const hasPlayedSoundRef = useRef(false);
  const { language } = useTheme();
  const t = achievementContent[language];
  const isKorean = language === 'KR';

  // 페이지 변경 감지 - 페이지가 바뀌면 무조건 닫기
  useEffect(() => {
    if (shouldRender && prevPathRef.current !== location.pathname) {
      // 페이지 전환 감지 → 슬라이드아웃
      setIsVisible(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // 애니메이션 완료 후 DOM 제거
      timerRef.current = setTimeout(() => {
        setShouldRender(false);
        onClose();
        hasPlayedSoundRef.current = false;
      }, 400);
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, shouldRender, onClose]);

  useEffect(() => {
    if (isOpen) {
      // DOM에 먼저 추가
      setShouldRender(true);
      
      // 사운드 재생 (한 번만)
      if (!hasPlayedSoundRef.current) {
        hasPlayedSoundRef.current = true;
        if (!audioRef.current || audioRef.current.paused) {
          audioRef.current = new Audio('/steam-achievement.mp3');
          audioRef.current.volume = 0.5;
          audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
      }

      // 다음 프레임에 슬라이드인 시작 (자연스러운 애니메이션)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      
      // 5초 후 자동 닫기
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        // 애니메이션 완료 후 DOM 제거
        setTimeout(() => {
          setShouldRender(false);
          onClose();
          hasPlayedSoundRef.current = false;
        }, 400);
      }, 5000);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    } else {
      // isOpen이 false가 되면 리셋
      hasPlayedSoundRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    }
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setTimeout(() => {
      setShouldRender(false);
      onClose();
      hasPlayedSoundRef.current = false;
    }, 400);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        fontFamily: '"Press Start 2P", monospace',
        transform: isVisible ? 'translateX(0)' : 'translateX(calc(100% + 20px))',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease'
      }}
      onClick={handleClose}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #1b2838 0%, #2a475e 100%)',
          border: '2px solid #5c7e9a',
          borderRadius: '4px',
          padding: '16px',
          minWidth: '350px',
          maxWidth: '400px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {/* Icon */}
        <div style={{
          background: 'linear-gradient(135deg, #c6d4df 0%, #8ba4b7 100%)',
          borderRadius: '4px',
          padding: '12px',
          minWidth: '64px',
          minHeight: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          flexShrink: 0
        }}>
          <Trophy size={40} color="#1b2838" strokeWidth={2.5} />
        </div>

        {/* Text - 한국어일 때 폰트 크기 증가 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: isKorean ? '12px' : '10px',
            color: '#8b8b8b',
            margin: '0 0 6px 0',
            letterSpacing: isKorean ? '0.5px' : '1px',
            fontWeight: 'bold'
          }}>
            <TypewriterText text={t.header} speed={30} />
          </p>
          <h3 style={{
            fontSize: isKorean ? '15px' : '12px',
            color: '#c6d4df',
            margin: '0 0 8px 0',
            lineHeight: '1.6',
            wordBreak: 'break-word'
          }}>
            <TypewriterText text={t.title} speed={40} />
          </h3>
          <p style={{
            fontSize: isKorean ? '11px' : '9px',
            color: '#8b8b8b',
            margin: 0,
            lineHeight: '1.6',
            wordBreak: 'break-word'
          }}>
            <TypewriterText text={t.description} speed={35} />
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { darkMode, toggleDarkMode, language, toggleLanguage, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [clickedNav, setClickedNav] = useState(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [logoHover, setLogoHover] = useState(false);
  const [logoMousePos, setLogoMousePos] = useState({ x: 0, y: 0 });
  const [logoClicked, setLogoClicked] = useState(false);
  const location = useLocation();
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadFont = async () => {
      try {
        if (document.fonts && document.fonts.load) {
          await document.fonts.load('16px "Press Start 2P"');
          await document.fonts.ready;
          setTimeout(() => setFontLoaded(true), 100);
        } else {
          setTimeout(() => setFontLoaded(true), 1000);
        }
      } catch (error) {
        console.error('Font loading error:', error);
        setTimeout(() => setFontLoaded(true), 1000);
      }
    };

    loadFont();
  }, []);

  const handleThemeToggle = () => {
    setIsRotating(true);
    toggleDarkMode();
    setTimeout(() => setIsRotating(false), 600);
  };

  const handleNavClick = (index) => {
    setClickedNav(index);
    setTimeout(() => setClickedNav(null), 300);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);
    
    setLogoClicked(true);
    setTimeout(() => setLogoClicked(false), 200);
    
    if (newCount === 5) {
      setShowAchievement(true);
      setLogoClickCount(0);
    }
  };

  const handleLogoMouseMove = (e) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setLogoMousePos({ x, y });
  };

  const handleLogoMouseEnter = () => setLogoHover(true);
  const handleLogoMouseLeave = () => {
    setLogoHover(false);
    setLogoMousePos({ x: 0, y: 0 });
  };

  const c = theme;
  const items = navItems[language] || navItems.EN;
  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? (darkMode ? 'rgba(13,17,23,0.95)' : 'rgba(255,255,255,0.95)') : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? `1px solid ${c.border}` : 'none',
        transition: 'all 0.3s'
      }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <a 
              ref={logoRef}
              href="#"
              onClick={handleLogoClick}
              onMouseMove={handleLogoMouseMove}
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
              className="logo-link"
              style={{ 
                fontFamily: fontLoaded ? '"Press Start 2P", monospace' : 'monospace',
                fontSize: '16px', 
                fontWeight: 400, 
                textDecoration: 'none',
                backgroundImage: darkMode 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: isHomePage ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4))' : 'none',
                transition: 'transform 0.1s ease, filter 0.3s ease',
                cursor: 'pointer',
                opacity: fontLoaded ? 1 : 0,
                visibility: fontLoaded ? 'visible' : 'hidden',
                transform: logoHover 
                  ? `translate(${logoMousePos.x * 0.15}px, ${logoMousePos.y * 0.15}px) ${logoClicked ? 'scale(0.9)' : 'scale(1)'}`
                  : logoClicked ? 'scale(0.9)' : 'scale(1)',
                display: 'inline-block'
              }}
            >
              @jhwang
            </a>

            <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {items.map((item, i) => (
                <Link
                  key={i}
                  to={navPaths[i]}
                  onClick={() => handleNavClick(i)}
                  className="nav-item"
                  style={{
                    padding: '8px 12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: isHomePage ? '#ffffff' : (location.pathname === navPaths[i] ? c.accent : c.textMuted),
                    textDecoration: 'none',
                    borderRadius: '6px',
                    position: 'relative',
                    filter: isHomePage ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4))' : 'none',
                    textShadow: isHomePage ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none',
                    transition: 'all 0.3s ease',
                    transform: clickedNav === i ? 'scale(0.95)' : 'scale(1)'
                  }}
                >
                  <MorphText text={item} />
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleThemeToggle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="theme-toggle-btn"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }}
                aria-label="Toggle dark mode"
              >
                <div style={{
                  position: 'relative',
                  width: '20px',
                  height: '20px',
                  color: isHomePage 
                    ? (isHovering 
                      ? (darkMode ? '#fb923c' : '#c084fc')
                      : '#ffffff')
                    : (isHovering 
                      ? (darkMode ? '#fb923c' : '#c084fc')
                      : c.textMuted),
                  filter: isHomePage ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4))' : 'none',
                  transition: 'color 0.3s ease, filter 0.3s ease'
                }}>
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </div>
              </button>

              <button
                onClick={toggleLanguage}
                className="lang-toggle"
                style={{
                  padding: '6px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: isHomePage 
                    ? '1px solid rgba(255, 255, 255, 0.2)'
                    : `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '8px',
                  backgroundColor: isHomePage
                    ? 'rgba(255, 255, 255, 0.1)'
                    : (darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'),
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: isHomePage ? '#ffffff' : c.textMuted,
                  filter: isHomePage ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4))' : 'none',
                  textShadow: isHomePage ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isHomePage 
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                    : (darkMode ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.05)')
                }}
              >
                {language}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="nav-mobile-btn"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: c.textMuted,
                  cursor: 'pointer',
                  display: 'none',
                  alignItems: 'center'
                }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="nav-mobile-menu" style={{ 
            backgroundColor: c.bgSecondary, 
            borderTop: `1px solid ${c.border}`,
            padding: '12px 16px',
            display: 'none',
            animation: 'slideDown 0.3s ease-out'
          }}>
            {items.map((item, i) => (
              <Link
                key={i}
                to={navPaths[i]}
                style={{
                  display: 'block',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: c.text,
                  textDecoration: 'none',
                  borderRadius: '6px'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=block');

          .logo-link:hover {
            transform: scale(1.1);
            filter: brightness(1.1);
          }

          .logo-link {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: ${c.accent};
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }
          .nav-item:hover::after { width: 80%; }
          .nav-item:hover {
            transform: translateY(-2px) scale(1.05);
            color: ${c.accent} !important;
          }
          .theme-toggle-btn:hover { transform: scale(1.1); }
          .lang-toggle:hover {
            transform: scale(1.05);
            background-color: ${c.accent}20;
            border-color: ${c.accent}60;
          }
          .lang-toggle:active { transform: scale(0.95); }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-btn { display: flex !important; }
            .nav-mobile-menu { display: block !important; }
          }
          @media (min-width: 769px) {
            .nav-desktop { display: flex !important; }
            .nav-mobile-btn { display: none !important; }
            .nav-mobile-menu { display: none !important; }
          }
        `}</style>
      </nav>

      <SteamAchievementModal 
        isOpen={showAchievement} 
        onClose={() => setShowAchievement(false)}
      />
    </>
  );
};

export default Navbar;