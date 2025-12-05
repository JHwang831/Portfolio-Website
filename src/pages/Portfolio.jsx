import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ExternalLink, Github, X, Calendar, Users, Briefcase, Trophy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Masonry from 'react-masonry-css';
import OKSEGallery from '../components/OKSEGallery';
import usePageBackground from '../hooks/usePageBackground';

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

// Project Data
const projectsData = {
  EN: [
    {
      id: 'futgg',
      title: 'FUT.gg Translation Tool',
      category: 'Development',
      brief: 'Korean translation tool for FC25/26 player database',
      description: 'Tampermonkey script for real-time Korean translation of FUT.gg website. Features DOM traversal, Regex pattern matching, and supports 600+ players, items, and chemstyles. Currently optimizing for FC26 compatibility.',
      tech: ['JavaScript', 'Tampermonkey', 'Regex'],
      period: '2024.10 - Present',
      team: 'Solo',
      role: 'Full-Stack Developer',
      status: 'In Progress (FC26 optimization)',
      github: 'https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-',
      image: '/projects/futgg.png',
      featured: true
    },
    {
      id: 'baseball',
      title: 'Baseball English',
      category: 'Development',
      brief: '36-week English learning platform for Korean baseball players',
      description: 'English learning platform designed for Korean baseball players preparing for American college teams. Features 36-week curriculum focused on baseball terminology, responsive design, and dark mode support.',
      tech: ['React', 'Tailwind CSS', 'JavaScript'],
      period: '2025.10 - Present',
      team: 'Solo',
      role: 'Full-Stack Developer + Designer',
      status: 'In Progress',
      github: 'https://github.com/JHwang831/baseball-english',
      live: 'https://baseball-english.netlify.app/',
      image: '/projects/baseballenglish.png', 
      featured: true
    },
    {
      id: 'okse',
      title: 'OKSE Event Posters',
      category: 'Design',
      brief: 'Event promotional materials for OKSE (2021-2024)',
      description: 'Designed promotional posters for OKSE (Organisation of Korean Students in England) events including Freshers Fair, Networking Events, and Social Gatherings. Created 7 posters and 1 teaser video.',
      tech: ['Adobe Photoshop', 'Graphic Design', 'Video Editing'],
      period: '2021.09 - 2024.04',
      team: 'Solo',
      role: 'Graphic Designer',
      status: 'Completed',
      gallery: true, // OKSE 갤러리 열기
      image: '/projects/oksepreview.png',
      featured: false
    },
    {
      id: 'poker',
      title: 'Poker AI Player',
      category: 'Development',
      brief: 'Texas Hold\'em Poker AI using MCTS & Q-learning',
      description: 'QMUL Final Year Project supervised by Dr. Soren Riis. Implemented Monte Carlo Tree Search (MCTS) and Q-learning for strategic poker gameplay. Features probabilistic decision-making, Expected Value calculations, and was evaluated against human players.',
      tech: ['Python', 'AI/ML', 'MCTS', 'Q-Learning', 'Reinforcement Learning'],
      period: '2023.09 - 2024.04',
      team: 'Solo (Final Year Project)',
      role: 'AI Developer + Researcher',
      status: 'Completed',
      github: 'https://github.com/JHwang831/Poker-AI_QMFYP_23-24_Junhyeok-Hwang',
      image: '/projects/pokerai.png',
      featured: false
    },
    {
      id: 'blitz',
      title: 'Blitz City Dash',
      category: 'Development',
      brief: 'Unity platformer game with coin collection mechanics',
      description: 'Unity-based platformer game featuring coin collection and obstacle avoidance. Developed in a team of 4, responsible for HUD system, menu screens, and game assets.',
      tech: ['Unity', 'C#'],
      period: '2023.03 - 2023.06',
      team: 'Team of 4',
      role: 'Frontend Developer (HUD, Menu, Assets)',
      status: 'Completed',
      github: 'https://github.com/pluto93/PlatformerGame',
      image: '/projects/blitz.png', 
      featured: false
    }
  ],
  KR: [
    {
      id: 'futgg',
      title: 'FUT.gg 번역 도구',
      category: '개발',
      brief: 'FC25/26 선수 데이터베이스 한국어 번역 도구',
      description: 'FUT.gg 웹사이트의 실시간 한국어 번역을 위한 Tampermonkey 스크립트. DOM traversal과 Regex 패턴 매칭을 활용하며, 600개 이상의 선수, 아이템, 켐스타일 번역을 지원합니다. 현재 FC26 호환성 최적화 진행 중.',
      tech: ['JavaScript', 'Tampermonkey', 'Regex'],
      period: '2024.10 - 현재',
      team: '개인',
      role: '풀스택 개발자',
      status: '진행 중 (FC26 최적화)',
      github: 'https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-',
      image: '/projects/futgg.png',
      featured: true
    },
    {
      id: 'baseball',
      title: 'Baseball English',
      category: '개발',
      brief: '한국 야구선수를 위한 36주 영어 학습 플랫폼',
      description: '미국 대학 야구팀 준비하는 한국 선수들을 위한 영어 학습 플랫폼. 야구 용어 중심의 36주 커리큘럼, 반응형 디자인, 다크모드 지원.',
      tech: ['React', 'Tailwind CSS', 'JavaScript'],
      period: '2025.10 - 현재',
      team: '개인',
      role: '풀스택 개발자 + 디자이너',
      status: '진행 중',
      github: 'https://github.com/JHwang831/baseball-english',
      live: 'https://baseball-english.netlify.app/',
      image: '/projects/baseballenglish.png', 
      featured: true
    },
    {
      id: 'okse',
      title: 'OKSE 이벤트 포스터',
      category: '디자인',
      brief: 'OKSE 이벤트 홍보자료 (2021-2024)',
      description: 'OKSE(런던 대학생 총학생회) 이벤트를 위한 홍보 포스터 디자인. Freshers Fair, 네트워킹 이벤트, 사교 모임 등을 포함하여 7개 포스터와 1개 티저 영상 제작.',
      tech: ['Adobe Photoshop', '그래픽 디자인', '영상 편집'],
      period: '2021.09 - 2024.04',
      team: '개인',
      role: '그래픽 디자이너',
      status: '완료',
      gallery: true,
      image: '/projects/oksepreview.png',
      featured: false
    },
    {
      id: 'poker',
      title: '포커 AI 플레이어 개발',
      category: '개발',
      brief: 'MCTS & Q-learning을 활용한 텍사스 홀덤 포커 AI',
      description: 'Dr. Soren Riis 교수 지도 하의 QMUL 졸업 프로젝트. Monte Carlo Tree Search(MCTS)와 Q-learning을 구현하여 전략적 포커 게임플레이 실현. 확률적 의사결정과 기댓값 계산을 특징으로 하며, 실제 플레이어와 대결하여 평가.',
      tech: ['Python', 'AI/ML', 'MCTS', 'Q-Learning', '강화학습'],
      period: '2023.09 - 2024.04',
      team: '개인 (졸업 프로젝트)',
      role: 'AI 개발자 + 연구원',
      status: '완료',
      github: 'https://github.com/JHwang831/Poker-AI_QMFYP_23-24_Junhyeok-Hwang',
      image: '/projects/pokerai.png', 
      featured: false
    },
    {
      id: 'blitz',
      title: 'Blitz City Dash',
      category: '개발',
      brief: '코인 수집 메커니즘의 Unity 플랫포머 게임',
      description: '코인 수집과 장애물 회피를 특징으로 하는 Unity 기반 플랫포머 게임. 4인 팀에서 HUD 시스템, 메뉴 화면, 게임 에셋 개발 담당.',
      tech: ['Unity', 'C#'],
      period: '2023.03 - 2023.06',
      team: '4인 팀',
      role: '프론트엔드 개발자 (HUD, 메뉴, 에셋)',
      status: '완료',
      github: 'https://github.com/pluto93/PlatformerGame',
      image: '/projects/blitz.png', 
      featured: false
    }
  ]
};

// Project Card with 3D Tilt
const ProjectCard = ({ project, onClick, index, theme }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        backgroundColor: c.bgSecondary,
        border: `1px solid ${c.border}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
        opacity: isVisible ? 1 : 0,
        translateY: isVisible ? '0' : '30px',
        transition: 'all 0.3s ease, opacity 0.5s ease, transform 0.5s ease',
        boxShadow: isHovered ? `0 20px 40px ${c.accent}30` : 'none',
        marginBottom: '16px'
      }}
    >
      {/* Image */}
      <div style={{
        width: '100%',
        height: '250px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: c.bg
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        {/* Overlay on hover */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '16px',
            animation: 'fadeIn 0.3s ease'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#ffffff',
              margin: 0,
              fontWeight: 500
            }}>
              <MorphText text={project.brief} />
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          color: c.textPrimary,
          margin: '0 0 8px 0'
        }}>
          <MorphText text={project.title} />
        </h3>
        <p style={{
          fontSize: '14px',
          color: c.textMuted,
          margin: '0 0 12px 0',
          height: '40px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.4'
        }}>
          <MorphText text={project.brief} />
        </p>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tech.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              style={{
                padding: '4px 10px',
                fontSize: '12px',
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: '12px',
                color: c.text,
                transition: 'all 0.2s ease'
              }}
            >
              <MorphText text={tech} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Project Modal
const ProjectModal = ({ project, onClose, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useTheme();
  const c = theme;

  useEffect(() => {
    setIsVisible(true);
    // 배경 스크롤만 막기 (body를 fixed로 하지 않음)
    document.body.style.overflow = 'hidden';

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      // 스크롤 복원
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

  const labels = language === 'EN' 
    ? { period: 'Period', team: 'Team', role: 'Role', status: 'Status', achievement: 'Achievement', code: 'Code', live: 'Live' }
    : { period: '기간', team: '팀', role: '역할', status: '상태', achievement: '성과', code: '코드', live: '라이브' };

  const modalContent = (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div
        style={{
          backgroundColor: c.bgSecondary,
          borderRadius: '16px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '16px',
            left: '100%',
            marginLeft: '-56px',
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
            zIndex: 10,
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

        {/* Content */}
        <div style={{ padding: '0 32px 32px 32px' }}>
          {/* Image */}
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '12px',
              marginBottom: '24px',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation();
              // 이미지 클릭 시 새 탭에서 원본 크기로 열기
              window.open(project.image, '_blank');
            }}
          />

          {/* Title */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: c.textPrimary,
            margin: '0 0 12px 0'
          }}>
            <MorphText text={project.title} />
          </h2>

          {/* Description */}
          <p style={{
            fontSize: '16px',
            color: c.text,
            lineHeight: 1.7,
            margin: '0 0 24px 0'
          }}>
            <MorphText text={project.description} />
          </p>

          {/* Tech Stack */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '6px 14px',
                    fontSize: '13px',
                    backgroundColor: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: '16px',
                    color: c.accent,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = c.accent;
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = c.bg;
                    e.currentTarget.style.color = c.accent;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <MorphText text={tech} />
                </span>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Calendar size={16} style={{ color: c.accent }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: c.textMuted }}>
                  <MorphText text={labels.period} />
                </span>
              </div>
              <p style={{ fontSize: '14px', color: c.text, margin: 0 }}>
                <MorphText text={project.period} />
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Users size={16} style={{ color: c.accent }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: c.textMuted }}>
                  <MorphText text={labels.team} />
                </span>
              </div>
              <p style={{ fontSize: '14px', color: c.text, margin: 0 }}>
                <MorphText text={project.team} />
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Briefcase size={16} style={{ color: c.accent }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: c.textMuted }}>
                  <MorphText text={labels.role} />
                </span>
              </div>
              <p style={{ fontSize: '14px', color: c.text, margin: 0 }}>
                <MorphText text={project.role} />
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Trophy size={16} style={{ color: c.accent }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: c.textMuted }}>
                  <MorphText text={labels.status} />
                </span>
              </div>
              <p style={{ fontSize: '14px', color: c.text, margin: 0 }}>
                <MorphText text={project.status} />
              </p>
            </div>
          </div>

          {/* Achievement */}
          {project.achievement && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: `${c.accent}10`,
              border: `1px solid ${c.accent}30`,
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <p style={{ fontSize: '14px', color: c.accent, margin: 0, fontWeight: 500 }}>
                🏆 <MorphText text={project.achievement} />
              </p>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: c.bg,
                  border: `1px solid ${c.border}`,
                  borderRadius: '8px',
                  color: c.text,
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = c.textPrimary;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = c.bg;
                  e.currentTarget.style.color = c.text;
                }}
              >
                <Github size={18} />
                <MorphText text={labels.code} />
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: c.accent,
                  border: `1px solid ${c.accent}`,
                  borderRadius: '8px',
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
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
                <ExternalLink size={18} />
                <MorphText text={labels.live} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

const Portfolio = () => {
  const { language, theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showOKSEGallery, setShowOKSEGallery] = useState(false);
  const c = theme;

  // 오버스크롤 배경색 설정 Hook 사용
  usePageBackground();

  const content = {
    EN: {
      title: 'Portfolio',
      subtitle: 'Projects and creative work',
      categories: ['All Projects', 'Development', 'Design']
    },
    KR: {
      title: '포트폴리오',
      subtitle: '프로젝트와 창작물',
      categories: ['전체 프로젝트', '개발', '디자인']
    }
  };

  const t = content[language];
  const projects = projectsData[language];

  // Filter projects
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : selectedCategory === 'development'
    ? projects.filter(p => p.category === (language === 'EN' ? 'Development' : '개발'))
    : projects.filter(p => p.category === (language === 'EN' ? 'Design' : '디자인'));

  // Masonry breakpoints
  const breakpointColumns = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1
  };

  const handleProjectClick = (project) => {
    if (project.gallery) {
      setShowOKSEGallery(true);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
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
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        {t.categories.map((cat, i) => {
          const categoryValue = i === 0 ? 'all' : i === 1 ? 'development' : 'design';
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
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
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
              {selectedCategory === categoryValue && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '2px',
                  backgroundColor: c.accent,
                  animation: 'slideIn 0.3s ease'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {filteredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project)}
            index={i}
            theme={theme}
          />
        ))}
      </Masonry>


      {/* Masonry CSS */}
      <style>{`
        .masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .masonry-grid-column {
          padding-left: 16px;
          background-clip: padding-box;
        }
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 60%;
          }
        }
      `}</style>
      </div>

      {/* Project Modal - 부모 div 밖에서 렌더링 */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          theme={theme}
        />
      )}

      {/* OKSE Gallery Modal - 부모 div 밖에서 렌더링 */}
      {showOKSEGallery && (
        <OKSEGallery
          onClose={() => setShowOKSEGallery(false)}
          theme={theme}
        />
      )}
    </>
  );
};

export default Portfolio;