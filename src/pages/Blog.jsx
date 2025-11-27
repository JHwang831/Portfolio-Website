import React from 'react';
import { FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const content = {
  EN: {
    title: 'Blog',
    subtitle: 'Thoughts, tutorials, and dev logs',
    empty: 'No posts yet. Coming soon!',
    posts: [
      // Placeholder posts - will be replaced with real posts later
      // {
      //   title: 'Building my portfolio website',
      //   date: '2024-12-01',
      //   description: 'A walkthrough of how I built this portfolio using React.',
      //   tags: ['React', 'Web Development']
      // }
    ]
  },
  KR: {
    title: '블로그',
    subtitle: '생각, 튜토리얼, 개발 일지',
    empty: '아직 포스트가 없습니다. 곧 업데이트됩니다!',
    posts: []
  }
};

const Blog = () => {
  const { language, theme } = useTheme();
  const c = theme;
  const t = content[language];

  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: c.textPrimary, marginBottom: '8px' }}>
        {t.title}
      </h1>
      <p style={{ fontSize: '16px', color: c.textMuted, marginBottom: '32px' }}>
        {t.subtitle}
      </p>

      {t.posts.length === 0 ? (
        // Empty State
        <div style={{
          backgroundColor: c.bgSecondary,
          border: `1px solid ${c.border}`,
          borderRadius: '8px',
          padding: '48px 24px',
          textAlign: 'center'
        }}>
          <FileText size={48} style={{ color: c.textMuted, marginBottom: '16px' }} />
          <p style={{ fontSize: '16px', color: c.textMuted, margin: 0 }}>
            {t.empty}
          </p>
        </div>
      ) : (
        // Posts List
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {t.posts.map((post, i) => (
            <article
              key={i}
              style={{
                backgroundColor: c.bgSecondary,
                border: `1px solid ${c.border}`,
                borderRadius: '8px',
                padding: '24px',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '14px', color: c.textMuted }}>{post.date}</span>
              <h2 style={{ 
                fontSize: '20px', 
                fontWeight: 600, 
                color: c.textPrimary, 
                margin: '8px 0' 
              }}>
                {post.title}
              </h2>
              <p style={{ fontSize: '14px', color: c.text, margin: '0 0 12px 0', lineHeight: 1.6 }}>
                {post.description}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {post.tags?.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      padding: '2px 8px',
                      fontSize: '12px',
                      backgroundColor: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: '4px',
                      color: c.accent
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
