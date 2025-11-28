import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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

const content = {
  EN: {
    title: 'Portfolio',
    subtitle: 'Projects I\'ve worked on',
    code: 'Code',
    live: 'Live',
    projects: [
      {
        title: 'Blitz City Dash',
        category: 'Development',
        description: 'Unity platformer game with coin collection and obstacle mechanics. Developed HUD, menu systems, and game assets in a team of 4.',
        tech: ['Unity', 'C#'],
        github: 'https://github.com/pluto93/PlatformerGame'
      },
      {
        title: 'Poker AI Player',
        category: 'Development',
        description: 'Final year project - AI player for tabletop games including Poker, Yacht, and Tic-tac-toe.',
        tech: ['Python', 'AI/ML'],
        github: 'https://github.com/JHwang831/Poker-AI_QMFYP_23-24_Junhyeok-Hwang'
      },
      {
        title: 'FUT.gg Translation Tool',
        category: 'Development',
        description: 'Korean translation tool for FC25/26 player database website using Tampermonkey script.',
        tech: ['JavaScript', 'Tampermonkey'],
        github: '#'
      },
      {
        title: 'Baseball English',
        category: 'Development',
        description: '36-week English learning platform for Korean baseball players preparing for American college teams.',
        tech: ['React', 'Tailwind CSS'],
        github: 'https://github.com/JHwang831/baseball-english',
        live: 'https://baseball-english.netlify.app/'
      },
      {
        title: 'OKSE Event Posters',
        category: 'Design',
        description: 'Designed promotional posters for various OKSE events from 2021 to 2024 using Adobe Photoshop.',
        tech: ['Photoshop'],
      }
    ]
  },
  KR: {
    title: '포트폴리오',
    subtitle: '작업한 프로젝트들',
    code: '코드',
    live: '라이브',
    projects: [
      {
        title: 'Blitz City Dash',
        category: '개발',
        description: '코인 수집과 장애물 회피의 Unity 플랫포머 게임. 4인 팀에서 HUD, 메뉴 시스템, 에셋 개발 담당.',
        tech: ['Unity', 'C#'],
        github: 'https://github.com/pluto93/PlatformerGame'
      },
      {
        title: 'Poker AI Player',
        category: '개발',
        description: '졸업 프로젝트 - 포커, 요트, 틱택토를 플레이하는 AI.',
        tech: ['Python', 'AI/ML'],
        github: 'https://github.com/JHwang831/Poker-AI_QMFYP_23-24_Junhyeok-Hwang'
      },
      {
        title: 'FUT.gg 번역 도구',
        category: '개발',
        description: 'Tampermonkey 스크립트를 사용한 FC25/26 선수 데이터베이스 한국어 번역 도구.',
        tech: ['JavaScript', 'Tampermonkey'],
        github: '#'
      },
      {
        title: 'Baseball English',
        category: '개발',
        description: '미국 대학 야구팀 준비하는 한국 야구선수를 위한 36주 영어 학습 플랫폼.',
        tech: ['React', 'Tailwind CSS'],
        github: 'https://github.com/JHwang831/baseball-english',
        live: 'https://baseball-english.netlify.app/'
      },
      {
        title: 'OKSE 이벤트 포스터',
        category: '디자인',
        description: '2021년부터 2024년까지 Adobe Photoshop으로 OKSE 이벤트 홍보 포스터 제작.',
        tech: ['Photoshop'],
      }
    ]
  }
};

const Portfolio = () => {
  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language] || content.EN;

  return (
    <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: c.textPrimary, marginBottom: '8px' }}>
        <MorphText text={t.title} />
      </h1>
      <p style={{ fontSize: '16px', color: c.textMuted, marginBottom: '32px' }}>
        <MorphText text={t.subtitle} />
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '16px' 
      }}>
        {t.projects.map((project, i) => (
          <div
            key={i}
            style={{
              backgroundColor: c.bgSecondary,
              border: `1px solid ${c.border}`,
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
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
              color: c.text, 
              lineHeight: 1.6, 
              margin: '0 0 16px 0',
              flex: 1
            }}>
              <MorphText text={project.description} />
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {project.tech.map((tech, j) => (
                <span
                  key={j}
                  style={{
                    padding: '2px 8px',
                    fontSize: '12px',
                    backgroundColor: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: '4px',
                    color: c.textMuted
                  }}
                >
                  <MorphText text={tech} />
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    color: c.textMuted,
                    textDecoration: 'none'
                  }}
                >
                  <Github size={16} />
                  <MorphText text={t.code} />
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
                    gap: '4px',
                    fontSize: '14px',
                    color: c.accent,
                    textDecoration: 'none'
                  }}
                >
                  <ExternalLink size={16} />
                  <MorphText text={t.live} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;