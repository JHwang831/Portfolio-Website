import React from 'react';
import { MapPin, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const content = {
  EN: {
    title: 'About Me',
    bio: "I'm a Computer Science graduate from Queen Mary University of London with a focus on front-end development, computer graphics, and UI/UX design. I enjoy building software that combines technical functionality with thoughtful design.",
    bio2: "Currently serving as Social Service Personnel in South Korea until August 2026.",
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
          degree: 'High School Diploma, Engineering',
          school: 'Daegun High School',
          period: '2017 - 2020',
          grade: 'Web Development, Robotics, English Discussion Society'
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
        }
      ]
    },
    certifications: {
      title: 'Certifications',
      items: [
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
    bio: "Queen Mary University of London에서 컴퓨터과학을 전공하고 프론트엔드 개발, 컴퓨터 그래픽스, UI/UX 디자인에 집중하고 있습니다. 기술적 기능과 디자인을 결합한 소프트웨어를 만드는 것을 좋아합니다.",
    bio2: "현재 2026년 8월까지 사회복무요원으로 복무 중입니다.",
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
          degree: '공학계열 고등학교 졸업',
          school: '대건고등학교',
          period: '2017 - 2020',
          grade: '웹개발동아리, 로봇공학동아리, 영어토론동아리'
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
        }
      ]
    },
    certifications: {
      title: '수상',
      items: [
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
  const t = content[language];

  const Section = ({ icon: Icon, title, children }) => (
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
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: c.textPrimary, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  );

  const Tag = ({ children }) => (
    <span style={{
      padding: '4px 12px',
      fontSize: '14px',
      backgroundColor: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: '16px',
      color: c.text
    }}>
      {children}
    </span>
  );

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: c.textPrimary, marginBottom: '24px' }}>
        {t.title}
      </h1>

      {/* Bio */}
      <Section icon={MapPin} title={t.location}>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: c.text, margin: '0 0 12px 0' }}>{t.bio}</p>
        <p style={{ fontSize: '16px', lineHeight: 1.7, color: c.text, margin: 0 }}>{t.bio2}</p>
      </Section>

      {/* Education */}
      <Section icon={GraduationCap} title={t.education.title}>
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
              <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>{item.degree}</p>
              <p style={{ fontSize: '14px', color: c.text, margin: '0 0 4px 0' }}>{item.school}</p>
              <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>{item.grade}</p>
            </div>
            <span style={{ fontSize: '14px', color: c.textMuted }}>{item.period}</span>
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section icon={Briefcase} title={t.experience.title}>
        {t.experience.items.map((item, i) => (
          <div key={i} style={{ 
            paddingBottom: i < t.experience.items.length - 1 ? '16px' : 0,
            marginBottom: i < t.experience.items.length - 1 ? '16px' : 0,
            borderBottom: i < t.experience.items.length - 1 ? `1px solid ${c.border}` : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>{item.role}</p>
                <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>{item.org}</p>
              </div>
              <span style={{ fontSize: '14px', color: c.textMuted }}>{item.period}</span>
            </div>
            <p style={{ fontSize: '14px', color: c.text, margin: 0, lineHeight: 1.6 }}>{item.description}</p>
          </div>
        ))}
      </Section>

      {/* Certifications */}
      <Section icon={Award} title={t.certifications.title}>
        {t.certifications.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: 600, color: c.textPrimary, margin: '0 0 4px 0' }}>{item.name}</p>
              <p style={{ fontSize: '14px', color: c.accent, margin: 0 }}>{item.issuer}</p>
            </div>
            <span style={{ fontSize: '14px', color: c.textMuted }}>{item.year}</span>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section icon={Code} title={t.skills.title}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {t.skills.items.map((skill, i) => <Tag key={i}>{skill}</Tag>)}
        </div>
      </Section>

      {/* Languages */}
      <Section icon={GraduationCap} title={t.languages.title}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {t.languages.items.map((lang, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: c.textPrimary }}>{lang.name}</span>
              <span style={{ fontSize: '12px', color: c.textMuted }}>({lang.level})</span>
            </div>
          ))}
        </div>
      </Section>


    </div>
  );
};

export default About;
