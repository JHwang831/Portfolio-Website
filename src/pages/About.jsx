import React, { useState, useEffect, useRef } from 'react';
import { MapPin, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
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

// Section 컴포넌트를 외부로 분리!
const Section = ({ icon: Icon, title, children, theme }) => {
  const c = theme;
  return (
    <section style={{
      backgroundColor: c.bgSecondary,
      border: `1px solid ${c.border}`,
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: `1px solid ${c.border}`
      }}>
        <Icon size={20} style={{ color: c.accent }} />
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: c.textPrimary, margin: 0 }}>
          <MorphText text={title} />
        </h2>
      </div>
      {children}
    </section>
  );
};

// Tag 컴포넌트도 외부로 분리
const Tag = ({ children, theme }) => {
  const c = theme;
  return (
    <span style={{
      padding: '4px 12px',
      fontSize: '14px',
      backgroundColor: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: '16px',
      color: c.text
    }}>
      <MorphText text={children} />
    </span>
  );
};

const content = {
  EN: {
    title: 'About Me',
    bio: "I'm a Computer Science graduate from Queen Mary University of London who approaches every situation with sincerity and an open mind. My greatest strength lies in quickly understanding and adapting to changing environments. I have a strong sense of responsibility and always strive to complete tasks to the best of my ability.",
    bio2: "I value trust in relationships and believe in communication based on mutual respect and active listening. With an endless passion for learning, I view challenges as opportunities for growth. Currently serving as Social Service Personnel in South Korea until August 2026.",
    location: 'Daegu, South Korea',
    education: {
      title: 'Education',
      items: [
        {
          degree: 'BSc Computer Science',
          school: 'Queen Mary University of London',
          period: '2021 - 2024',
          grade: 'Upper Second-class Honours (2:1)'
        },
        {
          degree: 'UK Foundation Course',
          school: "King's Seoul Foundation",
          period: '2020 - 2021',
          grade: 'Overall Score 78%'
        },
        {
          degree: 'High School Diploma',
          school: 'Daegun High School (Autonomous Private)',
          period: '2017 - 2020',
          grade: 'Engineering Track'
        }
      ]
    },
    experience: {
      title: 'Experience',
      items: [
        { 
          role: 'Social Service Personnel', 
          org: 'Wolbae Public Sports Centre', 
          period: '2024.11 - 2026.08',
          description: 'Assisting fitness measurement at Dalseo Physical Fitness Certification Centre and facility maintenance.'
        },
        { 
          role: 'Vice President', 
          org: 'OKSE (Organisation of Korean Students in England)', 
          period: '2023.07 - 2024.04',
          description: 'Led event planning, promotional material design, and stakeholder relations for Korean students in London.'
        },
        { 
          role: 'Committee Member', 
          org: 'OKSE', 
          period: '2021.09 - 2023.06',
          description: 'Created and designed media and promotional materials for various events.'
        },
        { 
          role: 'Server', 
          org: 'Masigo (Korean Restaurant)', 
          period: '2024.06 - 2024.07',
          description: 'Provided customer service as a hall server in London.'
        },
        { 
          role: 'Server', 
          org: 'JH Holdings - Yori (Korean Restaurant)', 
          period: '2022.12 - 2023.02',
          description: 'Provided customer service as a hall server in London.'
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
          name: 'National High School Software Competition - Encouragement Award',
          issuer: 'KAIST',
          year: '2018'
        }
      ]
    },
    skills: {
      title: 'Skills',
      items: ['Java', 'Python', 'JavaScript', 'HTML/CSS', 'React', 'Unity', 'Adobe Photoshop', 'Figma', 'Git']
    },
    languages: {
      title: 'Languages',
      items: [
        { name: 'Korean', level: 'Native' },
        { name: 'English', level: 'Fluent' },
        { name: 'Spanish', level: 'Elementary' }
      ]
    }
  },
  KR: {
    title: '소개',
    bio: "저는 다양한 상황 속에서 언제나 성실함과 열린 마음으로 임하는 사람입니다. 가장 큰 장점은 상황을 빠르게 파악하고 적응하는 능력이며, 작은 일에도 최선을 다하는 책임감과 끈기를 가지고 있습니다.",
    bio2: "신뢰를 바탕으로 한 소통을 중시하며, 배움에 대한 끊임없는 열정으로 성장해 나가고 있습니다. 현재 2026년 8월까지 사회복무요원으로 복무 중입니다.",
    location: '대구광역시, 대한민국',
    education: {
      title: '학력',
      items: [
        {
          degree: '컴퓨터과학 학사',
          school: 'Queen Mary University of London',
          period: '2021 - 2024',
          grade: 'Upper Second (2:1) 졸업'
        },
        {
          degree: 'UK Foundation Course',
          school: "King's Seoul Foundation",
          period: '2020 - 2021',
          grade: 'Overall Score 78%'
        },
        {
          degree: '공학계열 고등학교 졸업',
          school: '대건고등학교 (자율형 사립)',
          period: '2017 - 2020',
          grade: '공학계열'
        }
      ]
    },
    experience: {
      title: '경력',
      items: [
        { 
          role: '사회복무요원', 
          org: '월배공영체육관', 
          period: '2024.11 - 2026.08',
          description: '달서구 국민체력100 인증센터 체력측정 보조 및 시설 관리.'
        },
        { 
          role: '부회장', 
          org: 'OKSE (런던 한국대학생회)', 
          period: '2023.07 - 2024.04',
          description: '이벤트 기획, 홍보자료 디자인, 스폰서 관리 담당.'
        },
        { 
          role: '운영위원', 
          org: 'OKSE', 
          period: '2021.09 - 2023.06',
          description: '다양한 이벤트의 미디어 및 홍보자료 제작.'
        },
        { 
          role: '홀 서버', 
          org: 'Masigo (런던 한식당)', 
          period: '2024.06 - 2024.07',
          description: '런던 내 한식당에서 고객 서비스 제공.'
        },
        { 
          role: '홀 서버', 
          org: 'JH Holdings - Yori (런던 한식당)', 
          period: '2022.12 - 2023.02',
          description: '런던 내 한식당에서 고객 서비스 제공.'
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
          issuer: 'KAIST',
          year: '2018'
        }
      ]
    },
    skills: {
      title: '기술',
      items: ['Java', 'Python', 'JavaScript', 'HTML/CSS', 'React', 'Unity', 'Adobe Photoshop', 'Figma', 'Git']
    },
    languages: {
      title: '언어',
      items: [
        { name: '한국어', level: '모국어' },
        { name: '영어', level: '유창' },
        { name: '스페인어', level: '초급' }
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

      {/* Bio */}
      <Section icon={MapPin} title={t.location} theme={theme}>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: c.text, margin: '0 0 12px 0' }}>
          <MorphText text={t.bio} />
        </p>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: c.text, margin: 0 }}>
          <MorphText text={t.bio2} />
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

      {/* Skills */}
      <Section icon={Code} title={t.skills.title} theme={theme}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {t.skills.items.map((skill, i) => <Tag key={i} theme={theme}>{skill}</Tag>)}
        </div>
      </Section>

      {/* Languages */}
      <Section icon={GraduationCap} title={t.languages.title} theme={theme}>
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