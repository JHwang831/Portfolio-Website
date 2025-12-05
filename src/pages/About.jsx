import React, { useState, useEffect, useRef } from 'react';
import { MapPin, GraduationCap, Briefcase, Code, Award, Globe, Mail, Github, Linkedin, Download, TrendingUp, Zap, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import usePageBackground from '../hooks/usePageBackground';

// MorphText 컴포넌트 (기존 유지)
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

// Counter 애니메이션 컴포넌트
const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={counterRef}>{count}{suffix}</span>;
};

// Bento Card 컴포넌트 with 3D Tilt
const BentoCard = ({ children, className = '', span = 1, style = {}, tiltEffect = true }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!tiltEffect || !cardRef.current) return;
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
      className={className}
      style={{
        gridColumn: `span ${span}`,
        transform: tiltEffect 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`
          : undefined,
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
};

// Skill Tag with Animation
const AnimatedSkillTag = ({ skill, index, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const c = theme;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <span
      style={{
        padding: '6px 14px',
        fontSize: '13px',
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '16px',
        color: c.text,
        display: 'inline-block',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
        transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
        cursor: 'default',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = c.accent;
        e.target.style.color = '#ffffff';
        e.target.style.transform = 'scale(1.05) translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = c.bg;
        e.target.style.color = c.text;
        e.target.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <MorphText text={skill} />
    </span>
  );
};

// Timeline Item
const TimelineItem = ({ item, index, isLast, theme, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);
  const c = theme;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      style={{
        display: 'flex',
        gap: '16px',
        paddingBottom: isLast ? 0 : '24px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'all 0.5s ease'
      }}
    >
      {/* Timeline Dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: c.accent,
            border: `3px solid ${c.bg}`,
            boxShadow: `0 0 0 2px ${c.accent}`,
            transition: 'all 0.3s ease',
            transform: isVisible ? 'scale(1)' : 'scale(0)'
          }}
        />
        {!isLast && (
          <div
            style={{
              width: '2px',
              flex: 1,
              backgroundColor: c.border,
              marginTop: '4px',
              transition: 'all 0.3s ease'
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>
              <MorphText text={type === 'education' ? item.degree : item.role} />
            </p>
            <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>
              <MorphText text={type === 'education' ? item.school : item.org} />
            </p>
          </div>
          <span style={{ fontSize: '13px', color: c.textMuted, fontWeight: 500 }}>
            <MorphText text={item.period} />
          </span>
        </div>
        {item.grade && (
          <p style={{ fontSize: '14px', color: c.text, margin: '4px 0 0 0' }}>
            <MorphText text={item.grade} />
          </p>
        )}
        {item.description && (
          <p style={{ fontSize: '14px', color: c.text, margin: '8px 0 0 0', lineHeight: 1.6 }}>
            <MorphText text={item.description} />
          </p>
        )}
      </div>
    </div>
  );
};

// Content Data
const content = {
  EN: {
    hero: {
      name: 'Junhyeok Hwang',
      title: 'Developer & Designer',
      tagline: 'Bridging code and creativity',
      status: 'Social Service Personnel (ROK)'
    },
    stats: [
      { value: 5, suffix: '+', label: 'Years Experience' },
      { value: 10, suffix: '+', label: 'Projects' },
      { value: 3, suffix: '', label: 'Languages' }
    ],
    quickInfo: {
      title: 'Quick Info',
      items: [
        { icon: MapPin, text: 'Daegu, South Korea' },
        { icon: GraduationCap, text: 'QMUL, BSc CS (2:1)' },
        { icon: Briefcase, text: 'Available Aug 2026' }
      ]
    },
    about: {
      title: 'About Me',
      text: "Computer Science graduate from Queen Mary University of London (Upper Second, 2:1) with expertise in regex-based text processing, web automation, and AI strategy modelling. Specialising in complex pattern analysis, dynamic translation systems, and algorithmic problem-solving. Currently serving as Social Service Personnel in South Korea (Nov 2024–Aug 2026) while actively maintaining software development projects and expanding technical capabilities."
    },
    education: {
      title: 'Education',
      items: [
        {
          degree: 'BSc Computer Science',
          school: 'Queen Mary University of London',
          period: '2021 – 2024',
          grade: 'Upper Second-class Honours (2:1)'
        },
        {
          degree: 'UK Foundation Course',
          school: "King's Seoul Foundation",
          period: '2020 – 2021',
          grade: 'Overall Score 78%'
        },
        {
          degree: 'High School Diploma',
          school: 'Daegun High School',
          period: '2017 – 2020',
          grade: 'Autonomous Private School (Engineering Track)'
        }
      ]
    },
    experience: {
      title: 'Experience',
      items: [
        {
          role: 'Social Service Personnel',
          org: 'Wolbae Public Sports Centre',
          period: 'Nov 2024 – Aug 2026',
          description: 'Assisting fitness assessments at Dalseo Physical Fitness Certification Centre (National Fitness Award 100) and facility maintenance whilst maintaining active software development.'
        },
        {
          role: 'Vice President',
          org: 'OKSE (Organisation of Korean Students in England)',
          period: 'Jul 2023 – Apr 2024',
          description: 'Led event planning, promotional material design, and stakeholder relations for Korean students in London. Managed operational strategy and cross-functional team coordination.'
        },
        {
          role: 'QMUL Representative',
          org: 'OKSE (Organisation of Korean Students in England)',
          period: 'Sep 2021 – Jun 2023',
          description: 'Designed and created media and promotional materials for various community events. Focused on visual communication and brand consistency.'
        },
        {
          role: 'Server',
          org: 'Masigo (Korean Restaurant)',
          period: 'Jun 2024 – Jul 2024',
          description: 'Provided customer service as hall server in London, demonstrating reliability and interpersonal skills in fast-paced environment.'
        },
        {
          role: 'Server',
          org: 'JH Holdings – Yori (Korean Restaurant)',
          period: 'Dec 2022 – Feb 2023',
          description: 'Delivered customer service as hall server in London, maintaining high service standards during peak periods.'
        }
      ]
    },
    certifications: {
      title: 'Certifications & Awards',
      items: [
        {
          name: 'IELTS Academic (Overall 7.0)',
          issuer: 'British Council, IDP Education',
          year: '2020'
        },
        {
          name: 'National High School Software Competition – Encouragement Award',
          issuer: 'KAIST (Korea Advanced Institute of Science and Technology)',
          year: '2018'
        }
      ]
    },
    competencies: {
      title: 'Core Competencies',
      items: [
        {
          icon: Code,
          name: 'Regex-based Text Processing & Pattern Analysis',
          description: 'Expert in DOM text node traversal (TreeWalker), unstructured sentence normalisation, multi-pattern conflict resolution (e.g. time vs currency units), and RegExp.exec-based precision matching.'
        },
        {
          icon: Zap,
          name: 'Web Automation & UserScript Development',
          description: 'Proficient in Tampermonkey script development, real-time UI translation systems, dynamic web content processing, and pattern-based automated translation pipelines.'
        },
        {
          icon: Target,
          name: 'AI Strategy Modelling & Algorithm Design',
          description: 'Experience in probabilistic decision-making analysis, state-action-reward structure definition, Expected Value (EV) calculations, and strategy optimisation in uncertain environments.'
        },
        {
          icon: TrendingUp,
          name: 'Full-Stack Web Development',
          description: 'Skilled in React-based interactive interfaces with advanced effects (MorphText transitions, hover animations), responsive design, and Git-based version control workflows.'
        }
      ]
    },
    skills: {
      title: 'Technical Skills',
      categories: [
        {
          name: 'Programming',
          items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'HTML/CSS']
        },
        {
          name: 'Frameworks & Tools',
          items: ['React', 'Node.js', 'Unity', 'Git', 'Tampermonkey']
        },
        {
          name: 'Design',
          items: ['Photoshop', 'After Effects', 'UI/UX Design']
        }
      ]
    },
    languages: {
      title: 'Languages',
      items: [
        { name: 'English', level: 'Full professional proficiency' },
        { name: 'Korean', level: 'Native' },
        { name: 'Spanish', level: 'Elementary proficiency' }
      ]
    }
  },
  KR: {
    hero: {
      name: '황준혁',
      title: '개발자 & 디자이너',
      tagline: '코드와 창의성을 잇다',
      status: '사회복무요원'
    },
    stats: [
      { value: 5, suffix: '+', label: '경력 연수' },
      { value: 10, suffix: '+', label: '프로젝트' },
      { value: 3, suffix: '', label: '언어' }
    ],
    quickInfo: {
      title: '간단 정보',
      items: [
        { icon: MapPin, text: '대구, 대한민국' },
        { icon: GraduationCap, text: 'QMUL, 컴퓨터공학 (2:1)' },
        { icon: Briefcase, text: '2026년 8월 사회복무요원 소집해제(예정)' }
      ]
    },
    about: {
      title: '소개',
      text: "Queen Mary University of London에서 컴퓨터과학 학사 학위를 취득했으며(Upper Second, 2:1), 정규표현식 기반 텍스트 처리와 웹 자동화, AI 전략 모델링 분야를 전문으로 합니다. 복잡한 패턴 분석 및 동적 번역 시스템 구축, 알고리즘 기반 문제 해결에 강점을 보유하고 있습니다. 현재 사회복무요원으로 복무 중이지만(2024년 11월–2026년 8월), 개인 프로젝트를 통해 소프트웨어 개발 역량을 지속적으로 발전시키고 있습니다."
    },
    education: {
      title: '학력',
      items: [
        {
          degree: '컴퓨터공학 학사',
          school: 'Queen Mary University of London',
          period: '2021 – 2024',
          grade: 'Upper Second-class Honours (2:1)'
        },
        {
          degree: '영국 파운데이션 과정',
          school: "King's Seoul Foundation",
          period: '2020 – 2021',
          grade: '총점 78%'
        },
        {
          degree: '고등학교 졸업',
          school: '대건고등학교',
          period: '2017 – 2020',
          grade: '자율형 사립 고등학교 (공학계열)'
        }
      ]
    },
    experience: {
      title: '경력',
      items: [
        {
          role: '사회복무요원',
          org: '월배국민체육센터',
          period: '2024년 11월 – 2026년 8월',
          description: '국민체력100 달서체력인증센터에서 체력 측정 보조 및 시설 관리를 담당하고 있으며, 복무와 병행하여 개인 소프트웨어 프로젝트를 지속하고 있습니다.'
        },
        {
          role: '부회장',
          org: 'OKSE (런던 대학생 총학생회)',
          period: '2023년 7월 – 2024년 4월',
          description: '런던 한인 유학생 커뮤니티를 위한 이벤트 기획과 홍보자료 디자인, 스폰서 관리를 이끌었으며, 조직 운영 전략 수립과 부서 간 협업을 조율했습니다.'
        },
        {
          role: 'QMUL 대표 임원',
          org: 'OKSE (런던 대학생 총학생회)',
          period: '2021년 9월 – 2023년 6월',
          description: '커뮤니티 이벤트를 위한 미디어 및 홍보자료 제작을 담당했으며, 시각적 일관성과 브랜드 아이덴티티 구축에 기여했습니다.'
        },
        {
          role: '홀 서버',
          org: 'Masigo (한식당)',
          period: '2024년 6월 – 2024년 7월',
          description: '런던 내 한식당에서 고객 응대 및 서비스를 제공하며, 빠르게 변화하는 업무 환경에서 책임감 있게 역할을 수행했습니다.'
        },
        {
          role: '홀 서버',
          org: 'JH Holdings – Yori (한식당)',
          period: '2022년 12월 – 2023년 2월',
          description: '런던 내 한식당에서 고객 응대 및 서비스를 제공했으며, 바쁜 시간대에도 안정적인 서비스 품질을 유지했습니다.'
        }
      ]
    },
    certifications: {
      title: '자격 및 수상',
      items: [
        {
          name: 'IELTS Academic (Overall 7.0)',
          issuer: 'British Council, IDP Education',
          year: '2020'
        },
        {
          name: '전국 고등학생 소프트웨어 경진대회 장려상',
          issuer: 'KAIST (한국과학기술원)',
          year: '2018'
        }
      ]
    },
    competencies: {
      title: '핵심 역량',
      items: [
        {
          icon: Code,
          name: '정규표현식 기반 텍스트 처리 및 패턴 분석',
          description: 'DOM 텍스트 노드 탐색(TreeWalker)과 비정형 문장 정규화, 다중 패턴 충돌 해결(시간/통화 단위), RegExp.exec 기반 정밀 매칭에 능숙합니다.'
        },
        {
          icon: Zap,
          name: '웹 자동화 및 사용자 스크립트 개발',
          description: 'Tampermonkey 스크립트 개발과 실시간 UI 번역 시스템, 동적 웹 콘텐츠 처리, 패턴 기반 자동 번역 파이프라인 구축에 능숙합니다.'
        },
        {
          icon: Target,
          name: 'AI 전략 모델링 및 알고리즘 설계',
          description: '확률적 의사결정 분석과 상태-행동-보상 구조 정의, 기댓값(EV) 계산, 불확실한 환경에서의 전략 최적화 경험을 보유하고 있습니다.'
        },
        {
          icon: TrendingUp,
          name: '풀스택 웹 개발',
          description: 'React 기반 인터랙티브 인터페이스 개발(MorphText 전환, 호버 애니메이션)과 반응형 디자인, Git 기반 버전 관리 워크플로우에 능숙합니다.'
        }
      ]
    },
    skills: {
      title: '기술 스택',
      categories: [
        {
          name: '프로그래밍',
          items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'HTML/CSS']
        },
        {
          name: '프레임워크 & 도구',
          items: ['React', 'Node.js', 'Unity', 'Git', 'Tampermonkey']
        },
        {
          name: '디자인',
          items: ['Photoshop', 'After Effects', 'UI/UX 디자인']
        }
      ]
    },
    languages: {
      title: '언어',
      items: [
        { name: '한국어', level: '모국어' },
        { name: '영어', level: '비즈니스 수준' },
        { name: '스페인어', level: '초급' }
      ]
    }
  }
};

const About = () => {
  usePageBackground();

  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language] || content.EN;

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 24px',
      minHeight: '100vh'
    }}>
      {/* Bento Grid Container */}
      <div
        className="bento-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '16px',
          '@media (maxWidth: 768px)': {
            gridTemplateColumns: '1fr'
          }
        }}
      >
        {/* Hero Profile Card - Large */}
        <BentoCard
          span={7}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '32px',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                backgroundColor: `${c.accent}20`,
                border: `1px solid ${c.accent}40`,
                borderRadius: '20px',
                fontSize: '13px',
                color: c.accent,
                fontWeight: 600,
                marginBottom: '16px',
                transition: 'all 0.3s ease'
              }}>
                <MorphText text={t.hero.status} />
              </div>
              <h1 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: c.textPrimary,
                margin: '0 0 8px 0',
                lineHeight: 1.2,
                transition: 'all 0.3s ease'
              }}>
                <MorphText text={t.hero.name} />
              </h1>
              <p style={{
                fontSize: '20px',
                color: c.accent,
                fontWeight: 600,
                margin: '0 0 8px 0',
                transition: 'all 0.3s ease'
              }}>
                <MorphText text={t.hero.title} />
              </p>
              <p style={{
                fontSize: '16px',
                color: c.textMuted,
                fontStyle: 'italic',
                margin: 0,
                transition: 'all 0.3s ease'
              }}>
                <MorphText text={t.hero.tagline} />
              </p>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: Github, href: 'https://github.com/JHwang831', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/junhyeok-hwang-497413226/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:jun00883311@gmail.com', label: 'Email' }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      padding: '10px',
                      backgroundColor: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: '10px',
                      color: c.textMuted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = c.accent;
                      e.currentTarget.style.borderColor = c.accent;
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = c.bg;
                      e.currentTarget.style.borderColor = c.border;
                      e.currentTarget.style.color = c.textMuted;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    aria-label={social.label}
                  >
                    <Icon size={20} style={{ transition: 'all 0.3s ease' }} />
                  </a>
                );
              })}
            </div>
          </div>
        </BentoCard>

        {/* Quick Info Card */}
        <BentoCard
          span={5}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '24px',
            transition: 'all 0.3s ease'
          }}
        >
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: c.textPrimary,
            margin: '0 0 20px 0',
            transition: 'all 0.3s ease'
          }}>
            <MorphText text={t.quickInfo.title} />
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {t.quickInfo.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: `${c.accent}15`,
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon size={18} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
                  </div>
                  <span style={{ fontSize: '14px', color: c.text, transition: 'all 0.3s ease' }}>
                    <MorphText text={item.text} />
                  </span>
                </div>
              );
            })}
          </div>
        </BentoCard>

        {/* Stats Cards */}
        {t.stats.map((stat, i) => (
          <BentoCard
            key={i}
            span={4}
            style={{
              backgroundColor: c.bgSecondary,
              border: `1px solid ${c.border}`,
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              fontSize: '36px',
              fontWeight: 700,
              color: c.accent,
              marginBottom: '8px',
              transition: 'all 0.3s ease'
            }}>
              <Counter end={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontSize: '14px', color: c.textMuted, fontWeight: 500, transition: 'all 0.3s ease' }}>
              <MorphText text={stat.label} />
            </div>
          </BentoCard>
        ))}

        {/* Education Card */}
        <BentoCard
          span={6}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '28px',
            transition: 'all 0.3s ease',
            gridRow: 'span 1'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: `${c.accent}15`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <GraduationCap size={22} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: c.textPrimary, margin: 0, transition: 'all 0.3s ease' }}>
              <MorphText text={t.education.title} />
            </h2>
          </div>
          {t.education.items.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isLast={i === t.education.items.length - 1}
              theme={theme}
              type="education"
            />
          ))}
        </BentoCard>

        {/* Experience Card */}
        <BentoCard
          span={6}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '28px',
            transition: 'all 0.3s ease',
            gridRow: 'span 2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: `${c.accent}15`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <Briefcase size={22} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: c.textPrimary, margin: 0, transition: 'all 0.3s ease' }}>
              <MorphText text={t.experience.title} />
            </h2>
          </div>
          {t.experience.items.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isLast={i === t.experience.items.length - 1}
              theme={theme}
              type="experience"
            />
          ))}
        </BentoCard>

        {/* Certifications Card */}
        <BentoCard
          span={6}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '28px',
            transition: 'all 0.3s ease',
            gridRow: 'span 1'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: `${c.accent}15`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <Award size={22} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: c.textPrimary, margin: 0, transition: 'all 0.3s ease' }}>
              <MorphText text={t.certifications.title} />
            </h2>
          </div>
          {t.certifications.items.map((cert, i) => (
            <div
              key={i}
              style={{
                paddingBottom: i < t.certifications.items.length - 1 ? '16px' : 0,
                marginBottom: i < t.certifications.items.length - 1 ? '16px' : 0,
                borderBottom: i < t.certifications.items.length - 1 ? `1px solid ${c.border}` : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px', marginBottom: '6px' }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: c.textPrimary, margin: 0, transition: 'all 0.3s ease' }}>
                  <MorphText text={cert.name} />
                </p>
                <span style={{ fontSize: '13px', color: c.textMuted, fontWeight: 500, flexShrink: 0, transition: 'all 0.3s ease' }}>
                  <MorphText text={cert.year} />
                </span>
              </div>
              <p style={{ fontSize: '14px', color: c.accent, margin: 0, transition: 'all 0.3s ease' }}>
                <MorphText text={cert.issuer} />
              </p>
            </div>
          ))}
        </BentoCard>

        {/* Core Competencies - Full Width */}
        <BentoCard
          span={12}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '28px',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: `${c.accent}15`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}>
              <Code size={22} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: c.textPrimary, margin: 0, transition: 'all 0.3s ease' }}>
              <MorphText text={t.competencies.title} />
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {t.competencies.items.map((comp, i) => {
              const Icon = comp.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    backgroundColor: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 8px 24px ${c.accent}20`;
                    e.currentTarget.style.borderColor = c.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = c.border;
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>
                    <Icon size={28} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
                  </div>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: c.textPrimary,
                    margin: '0 0 8px 0',
                    transition: 'all 0.3s ease'
                  }}>
                    <MorphText text={comp.name} />
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: c.text,
                    margin: 0,
                    lineHeight: 1.6,
                    transition: 'all 0.3s ease'
                  }}>
                    <MorphText text={comp.description} />
                  </p>
                </div>
              );
            })}
          </div>
        </BentoCard>

        {/* Technical Skills */}
        <BentoCard
          span={7}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '28px',
            transition: 'all 0.3s ease'
          }}
        >
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: c.textPrimary,
            margin: '0 0 20px 0',
            transition: 'all 0.3s ease'
          }}>
            <MorphText text={t.skills.title} />
          </h3>
          {t.skills.categories.map((category, i) => (
            <div key={i} style={{ marginBottom: i < t.skills.categories.length - 1 ? '20px' : 0 }}>
              <p style={{
                fontSize: '13px',
                fontWeight: 600,
                color: c.textMuted,
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease'
              }}>
                <MorphText text={category.name} />
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {category.items.map((skill, j) => (
                  <AnimatedSkillTag
                    key={j}
                    skill={skill}
                    index={j}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          ))}
        </BentoCard>

        {/* Languages */}
        <BentoCard
          span={5}
          style={{
            backgroundColor: c.bgSecondary,
            border: `1px solid ${c.border}`,
            borderRadius: '16px',
            padding: '28px',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe size={22} style={{ color: c.accent, transition: 'all 0.3s ease' }} />
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              color: c.textPrimary,
              margin: 0,
              transition: 'all 0.3s ease'
            }}>
              <MorphText text={t.languages.title} />
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {t.languages.items.map((lang, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: c.textPrimary,
                  transition: 'all 0.3s ease'
                }}>
                  <MorphText text={lang.name} />
                </span>
                <span style={{
                  fontSize: '14px',
                  color: c.textMuted,
                  transition: 'all 0.3s ease'
                }}>
                  <MorphText text={lang.level} />
                </span>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid > * {
            grid-column: span 12 !important;
            grid-row: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;