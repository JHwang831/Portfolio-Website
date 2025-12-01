import React, { useState, useEffect, useRef } from 'react';
import { MapPin, GraduationCap, Briefcase, Code, Award, Globe } from 'lucide-react';
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

// Section 컴포넌트 - Tobias 스타일 호버 효과
const Section = ({ icon: Icon, title, children, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const c = theme;
  
  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: c.bgSecondary,
        border: `1px solid ${c.border}`,
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '16px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(0, 0, 0, 0.1)' 
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
        cursor: 'default'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: `1px solid ${c.border}`
      }}>
        <Icon size={20} style={{ 
          color: c.accent,
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }} />
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: c.textPrimary, margin: 0 }}>
          <MorphText text={title} />
        </h2>
      </div>
      {children}
    </section>
  );
};

// Tag 컴포넌트 - 호버 효과
const Tag = ({ children, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const c = theme;
  
  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '4px 12px',
        fontSize: '14px',
        backgroundColor: isHovered ? c.accent : c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '16px',
        color: isHovered ? '#ffffff' : c.text,
        transition: 'all 0.2s ease',
        cursor: 'default',
        userSelect: 'none'
      }}
    >
      <MorphText text={children} />
    </span>
  );
};

const content = {
  EN: {
    title: 'About Me',
    profile: {
      title: 'Professional Profile',
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
          name: 'Regex-based Text Processing & Pattern Analysis',
          description: 'Expert in DOM text node traversal (TreeWalker), unstructured sentence normalisation, multi-pattern conflict resolution (e.g. time vs currency units), and RegExp.exec-based precision matching.'
        },
        {
          name: 'Web Automation & UserScript Development',
          description: 'Proficient in Tampermonkey script development, real-time UI translation systems, dynamic web content processing, and pattern-based automated translation pipelines.'
        },
        {
          name: 'AI Strategy Modelling & Algorithm Design',
          description: 'Experience in probabilistic decision-making analysis, state-action-reward structure definition, Expected Value (EV) calculations, and strategy optimisation in uncertain environments.'
        },
        {
          name: 'Full-Stack Web Development',
          description: 'Skilled in React-based interactive interfaces with advanced effects (MorphText transitions, hover animations), responsive design, and Git-based version control workflows.'
        }
      ]
    },
    skills: {
      title: 'Technical Skills',
      categories: [
        {
          name: 'Languages',
          items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML/CSS', 'C#']
        },
        {
          name: 'Frameworks & Libraries',
          items: ['React', 'Node.js', 'Unity']
        },
        {
          name: 'Tools & Technologies',
          items: ['Git', 'Tampermonkey', 'RegExp', 'DOM APIs', 'TreeWalker']
        },
        {
          name: 'Design & Media',
          items: ['Adobe Photoshop', 'Adobe After Effects']
        }
      ]
    },
    languages: {
      title: 'Languages',
      items: [
        { name: 'Korean', level: 'Native' },
        { name: 'English', level: 'Fluent (IELTS 7.0)' },
        { name: 'Spanish', level: 'Elementary' }
      ]
    },
    projects: {
      title: 'Featured Projects',
      items: [
        {
          name: 'FUT.GG Custom Translation Script',
          description: 'Korean translation userscript for FC25 (completed) and FC26 (v2.0 in progress). Resolves complex pattern conflicts and implements dynamic UI localisation.',
          link: 'View in Portfolio'
        },
        {
          name: 'Development of AI Player for Traditional Tabletop Games using Algorithms',
          description: 'Final Year Project implementing AI players for Poker, Yacht, and Tic-tac-toe using strategic decision-making models and probability-based algorithms.',
          link: 'View in Portfolio'
        }
      ]
    }
  },
  KR: {
    title: '소개',
    profile: {
      title: '소개',
      text: "Queen Mary University of London에서 컴퓨터과학 학사 학위를 취득했으며(Upper Second, 2:1), 정규표현식 기반 텍스트 처리와 웹 자동화, AI 전략 모델링 분야를 전문으로 합니다. 복잡한 패턴 분석 및 동적 번역 시스템 구축, 알고리즘 기반 문제 해결에 강점을 보유하고 있습니다. 현재 사회복무요원으로 복무 중이지만(2024년 11월–2026년 8월), 개인 프로젝트를 통해 소프트웨어 개발 역량을 지속적으로 발전시키고 있습니다."
    },
    education: {
      title: '학력',
      items: [
        {
          degree: '컴퓨터과학 학사',
          school: 'Queen Mary University of London',
          period: '2021 – 2024',
          grade: 'Upper Second (2:1) 졸업'
        },
        {
          degree: 'UK Foundation Course',
          school: "King's Seoul Foundation",
          period: '2020 – 2021',
          grade: 'Overall Score 78%'
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
          name: '정규표현식 기반 텍스트 처리 및 패턴 분석',
          description: 'DOM 텍스트 노드 탐색(TreeWalker)과 비정형 문장 정규화, 다중 패턴 충돌 해결(시간/통화 단위), RegExp.exec 기반 정밀 매칭에 능숙합니다.'
        },
        {
          name: '웹 자동화 및 사용자 스크립트 개발',
          description: 'Tampermonkey 스크립트 개발과 실시간 UI 번역 시스템, 동적 웹 콘텐츠 처리, 패턴 기반 자동 번역 파이프라인 구축에 능숙합니다.'
        },
        {
          name: 'AI 전략 모델링 및 알고리즘 설계',
          description: '확률적 의사결정 분석과 상태-행동-보상 구조 정의, 기댓값(EV) 계산, 불확실한 환경에서의 전략 최적화 경험을 보유하고 있습니다.'
        },
        {
          name: '풀스택 웹 개발',
          description: 'React 기반 인터랙티브 인터페이스 개발(MorphText 전환, 호버 애니메이션)과 반응형 디자인, Git 기반 버전 관리 워크플로우에 능숙합니다.'
        }
      ]
    },
    skills: {
      title: '기술',
      categories: [
        {
          name: '프로그래밍 언어',
          items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML/CSS', 'C#']
        },
        {
          name: '프레임워크 & 라이브러리',
          items: ['React', 'Node.js', 'Unity']
        },
        {
          name: '도구 & 기술',
          items: ['Git', 'Tampermonkey', 'RegExp', 'DOM APIs', 'TreeWalker']
        },
        {
          name: '디자인 & 미디어',
          items: ['Adobe Photoshop', 'Adobe After Effects']
        }
      ]
    },
    languages: {
      title: '언어',
      items: [
        { name: '한국어', level: '모국어' },
        { name: '영어', level: '유창함 (IELTS 7.0)' },
        { name: '스페인어', level: '초급' }
      ]
    },
    projects: {
      title: '주요 프로젝트',
      items: [
        {
          name: 'FUT.GG 커스텀 번역 스크립트',
          description: 'FC25 대응 버전을 완료했으며, 현재 FC26 v2.0을 개발 중입니다. 복잡한 패턴 충돌을 해결하고 동적 UI 현지화를 구현한 한국어 번역 사용자 스크립트입니다.',
          link: '포트폴리오에서 보기'
        },
        {
          name: '알고리즘을 이용한 전통적인 테이블탑 게임의 AI 플레이어 개발',
          description: '졸업 프로젝트로 진행한 연구로, 포커와 요트, 틱택토 게임을 위한 AI 플레이어를 전략적 의사결정 모델과 확률 기반 알고리즘을 활용하여 구현했습니다.',
          link: '포트폴리오에서 보기'
        }
      ]
    }
  }
};

const About = () => {
  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language] || content.EN;

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: c.textPrimary, marginBottom: '24px' }}>
        <MorphText text={t.title} />
      </h1>

      {/* Professional Profile */}
      <Section icon={MapPin} title={t.profile.title} theme={theme}>
        <p style={{ fontSize: '15px', lineHeight: 1.7, color: c.text, margin: 0 }}>
          <MorphText text={t.profile.text} />
        </p>
      </Section>

      {/* Education */}
      <Section icon={GraduationCap} title={t.education.title} theme={theme}>
        {t.education.items.map((item, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '8px',
            paddingBottom: i < t.education.items.length - 1 ? '16px' : 0,
            marginBottom: i < t.education.items.length - 1 ? '16px' : 0,
            borderBottom: i < t.education.items.length - 1 ? `1px solid ${c.border}` : 'none'
          }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>
                <MorphText text={item.degree} />
              </p>
              <p style={{ fontSize: '14px', color: c.text, margin: '0 0 4px 0' }}>
                <MorphText text={item.school} />
              </p>
              <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>
                <MorphText text={item.grade} />
              </p>
            </div>
            <span style={{ fontSize: '14px', color: c.textMuted }}>
              <MorphText text={item.period} />
            </span>
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section icon={Briefcase} title={t.experience.title} theme={theme}>
        {t.experience.items.map((item, i) => (
          <div key={i} style={{ 
            paddingBottom: i < t.experience.items.length - 1 ? '16px' : 0,
            marginBottom: i < t.experience.items.length - 1 ? '16px' : 0,
            borderBottom: i < t.experience.items.length - 1 ? `1px solid ${c.border}` : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>
                  <MorphText text={item.role} />
                </p>
                <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>
                  <MorphText text={item.org} />
                </p>
              </div>
              <span style={{ fontSize: '14px', color: c.textMuted }}>
                <MorphText text={item.period} />
              </span>
            </div>
            <p style={{ fontSize: '14px', color: c.text, margin: 0, lineHeight: 1.6 }}>
              <MorphText text={item.description} />
            </p>
          </div>
        ))}
      </Section>

      {/* Certifications */}
      <Section icon={Award} title={t.certifications.title} theme={theme}>
        {t.certifications.items.map((item, i) => (
          <div key={i} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '8px',
            paddingBottom: i < t.certifications.items.length - 1 ? '16px' : 0,
            marginBottom: i < t.certifications.items.length - 1 ? '16px' : 0,
            borderBottom: i < t.certifications.items.length - 1 ? `1px solid ${c.border}` : 'none'
          }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>
                <MorphText text={item.name} />
              </p>
              <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>
                <MorphText text={item.issuer} />
              </p>
            </div>
            <span style={{ fontSize: '14px', color: c.textMuted }}>
              <MorphText text={item.year} />
            </span>
          </div>
        ))}
      </Section>

      {/* Core Competencies */}
      <Section icon={Code} title={t.competencies.title} theme={theme}>
        {t.competencies.items.map((item, i) => (
          <div key={i} style={{ 
            paddingBottom: i < t.competencies.items.length - 1 ? '16px' : 0,
            marginBottom: i < t.competencies.items.length - 1 ? '16px' : 0,
            borderBottom: i < t.competencies.items.length - 1 ? `1px solid ${c.border}` : 'none'
          }}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: c.textPrimary, margin: '0 0 6px 0' }}>
              <MorphText text={item.name} />
            </p>
            <p style={{ fontSize: '14px', color: c.text, margin: 0, lineHeight: 1.6 }}>
              <MorphText text={item.description} />
            </p>
          </div>
        ))}
      </Section>

      {/* Technical Skills */}
      <Section icon={Code} title={t.skills.title} theme={theme}>
        {t.skills.categories.map((category, i) => (
          <div key={i} style={{ marginBottom: i < t.skills.categories.length - 1 ? '16px' : 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: c.textMuted, margin: '0 0 8px 0' }}>
              <MorphText text={category.name} />
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {category.items.map((skill, j) => <Tag key={j} theme={theme}>{skill}</Tag>)}
            </div>
          </div>
        ))}
      </Section>

      {/* Languages */}
      <Section icon={Globe} title={t.languages.title} theme={theme}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {t.languages.items.map((lang, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: c.textPrimary }}>
                <MorphText text={lang.name} />
              </span>
              <span style={{ fontSize: '12px', color: c.textMuted }}>
                (<MorphText text={lang.level} />)
              </span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default About;