import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Masonry from 'react-masonry-css';

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

// OKSE Gallery Data
const okseData = {
  EN: {
    title: 'OKSE Event Posters (2021-24)',
    tabs: ['2021-22', '2022-23', '2023-24'],
    items: {
      '2021-22': [
        { type: 'image', src: '/projects/2021opening.png', title: '2021 Opening Party' },
        { type: 'image', src: '/projects/2021opening-wristband.png', title: '2021 Opening Party Wristband' },
        { type: 'image', src: '/projects/2021opening-menu.png', title: '2021 Opening Party Menu' },
        { type: 'image', src: '/projects/2022finalteaser.png', title: '2022 Final Party Teaser' },
        { type: 'image', src: '/projects/2022final-poster.png', title: '2022 Final Party Poster' },
        { type: 'image', src: '/projects/2022final-insta.png', title: '2022 Final Party Instagram' },
        { type: 'image', src: '/projects/2022final-wristband.png', title: '2022 Final Party Wristband' }
      ],
      '2022-23': [
        { type: 'image', src: '/projects/2022opening.png', title: '2022 Opening Party' },
        { type: 'image', src: '/projects/2022opening-floorplan.png', title: '2022 Opening Party Floor Plan' },
        { type: 'image', src: '/projects/2022freshers.png', title: '2022 Freshers Fair' },
        { type: 'image', src: '/projects/2022bandday.png', title: '2022 Band Day' },
        { type: 'image', src: '/projects/2023final.png', title: '2023 Final Party Poster' },
        { type: 'image', src: '/projects/2023final-bandonly.png', title: '2023 Final Party Band Only' }
      ],
      '2023-24': [
        { type: 'video', src: '/projects/2023opening.mp4', poster: '/projects/2023opening-preview.png', title: '2023 Opening Party Video' },
        { type: 'video', src: '/projects/2023opening-concept1.mp4', title: '2023 Opening Party Concept 1' },
        { type: 'video', src: '/projects/2023opening-concept2.mp4', title: '2023 Opening Party Concept 2' },
        { type: 'youtube', videoId: '8FIjUVy4eeU', title: '2024 Final Party Teaser' }
      ]
    }
  },
  KR: {
    title: 'OKSE 이벤트 포스터 (2021-24)',
    tabs: ['2021-22', '2022-23', '2023-24'],
    items: {
      '2021-22': [
        { type: 'image', src: '/projects/2021opening.png', title: '2021 오프닝 파티' },
        { type: 'image', src: '/projects/2021opening-wristband.png', title: '2021 오프닝 파티 손목밴드' },
        { type: 'image', src: '/projects/2021opening-menu.png', title: '2021 오프닝 파티 메뉴' },
        { type: 'image', src: '/projects/2022finalteaser.png', title: '2022 파이널 파티 티저' },
        { type: 'image', src: '/projects/2022final-poster.png', title: '2022 파이널 파티 포스터' },
        { type: 'image', src: '/projects/2022final-insta.png', title: '2022 파이널 파티 인스타그램' },
        { type: 'image', src: '/projects/2022final-wristband.png', title: '2022 파이널 파티 손목밴드' }
      ],
      '2022-23': [
        { type: 'image', src: '/projects/2022opening.png', title: '2022 오프닝 파티' },
        { type: 'image', src: '/projects/2022opening-floorplan.png', title: '2022 오프닝 파티 평면도' },
        { type: 'image', src: '/projects/2022freshers.png', title: '2022 신입생 환영회' },
        { type: 'image', src: '/projects/2022bandday.png', title: '2022 밴드 데이' },
        { type: 'image', src: '/projects/2023final.png', title: '2023 파이널 파티 포스터' },
        { type: 'image', src: '/projects/2023final-bandonly.png', title: '2023 파이널 파티 밴드 온리' }
      ],
      '2023-24': [
        { type: 'video', src: '/projects/2023opening.mp4', poster: '/projects/2023opening-preview.png', title: '2023 오프닝 파티 영상' },
        { type: 'video', src: '/projects/2023opening-concept1.mp4', title: '2023 오프닝 파티 컨셉 1' },
        { type: 'video', src: '/projects/2023opening-concept2.mp4', title: '2023 오프닝 파티 컨셉 2' },
        { type: 'youtube', videoId: '8FIjUVy4eeU', title: '2024 파이널 파티 티저' }
      ]
    }
  }
};

// Lightbox Component
const Lightbox = ({ item, onClose, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const c = theme;

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <X size={24} />
      </button>

      {/* Content */}
      <div style={{
        maxWidth: '90vw',
        maxHeight: '90vh',
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        transition: 'transform 0.3s ease'
      }}>
        {item.type === 'image' && (
          <img
            src={item.src}
            alt={item.title}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        )}
        {item.type === 'video' && (
          <video
            src={item.src}
            controls
            autoPlay
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              borderRadius: '8px'
            }}
          />
        )}
      </div>
    </div>
  );
};

// Gallery Item Component
const GalleryItem = ({ item, onClick, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);
  const c = theme;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 50);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        marginBottom: '16px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s ease'
      }}
    >
      {item.type === 'image' && (
        <img
          src={item.src}
          alt={item.title}
          style={{
            width: '100%',
            display: 'block',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            filter: isHovered ? 'blur(4px)' : 'blur(0)'
          }}
        />
      )}

      {item.type === 'video' && (
        <div style={{ position: 'relative' }}>
          <video
            src={item.src}
            poster={item.poster}
            preload="metadata"
            style={{
              width: '100%',
              display: 'block',
              transition: 'all 0.3s ease',
              filter: isHovered ? 'blur(4px)' : 'blur(0)'
            }}
          />
          {/* Play Overlay */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            opacity: isHovered ? 0 : 0.8,
            pointerEvents: 'none'
          }}>
            <Play size={28} style={{ color: '#ffffff', marginLeft: '4px' }} />
          </div>
        </div>
      )}

      {item.type === 'youtube' && (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}`}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '12px'
            }}
          />
        </div>
      )}

      {/* Title Overlay - 중앙에 크게 표시 */}
      {isHovered && item.type !== 'youtube' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 0.3s ease',
          padding: '20px'
        }}>
          <p style={{
            fontSize: '20px',
            color: '#ffffff',
            margin: 0,
            fontWeight: 600,
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}>
            <MorphText text={item.title} />
          </p>
        </div>
      )}
    </div>
  );
};

const OKSEGallery = ({ onClose, theme }) => {
  const { language } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('2021-22');
  const [lightboxItem, setLightboxItem] = useState(null);
  const c = theme;

  const data = okseData[language];

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const breakpointColumns = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1
  };

  const handleItemClick = (item) => {
    if (item.type === 'youtube') return; // YouTube는 클릭 불가
    setLightboxItem(item);
  };

  const galleryContent = (
    <>
      <div
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1500,
          padding: '20px',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div
          style={{
            backgroundColor: c.bgSecondary,
            borderRadius: '16px',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            transform: isVisible ? 'scale(1)' : 'scale(0.9)',
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Header */}
          <div style={{
            position: 'sticky',
            top: 0,
            backgroundColor: c.bgSecondary,
            borderBottom: `1px solid ${c.border}`,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: c.textPrimary,
              margin: 0
            }}>
              <MorphText text={data.title} />
            </h2>

            <button
              onClick={onClose}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: `1px solid ${c.border}`,
                backgroundColor: c.bg,
                color: c.textMuted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = c.accent;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = c.bg;
                e.currentTarget.style.color = c.textMuted;
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{
            padding: '24px 32px 0 32px',
            display: 'flex',
            gap: '12px',
            borderBottom: `1px solid ${c.border}`
          }}>
            {data.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: activeTab === tab ? c.accent : c.textMuted,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.color = c.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.color = c.textMuted;
                  }
                }}
              >
                <MorphText text={tab} />
                {activeTab === tab && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: c.accent,
                    borderRadius: '3px 3px 0 0',
                    animation: 'slideIn 0.3s ease'
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Gallery Content */}
          <div style={{ padding: '32px' }}>
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {data.items[activeTab].map((item, i) => (
                <GalleryItem
                  key={i}
                  item={item}
                  onClick={() => handleItemClick(item)}
                  index={i}
                  theme={theme}
                />
              ))}
            </Masonry>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
          theme={theme}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </>
  );

  return ReactDOM.createPortal(galleryContent, document.body);
};

export default OKSEGallery;