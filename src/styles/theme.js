export const colors = {
  light: {
    bg: '#ffffff',
    bgSecondary: '#f6f8fa',
    text: '#57606a',
    textPrimary: '#1f2328',
    textMuted: '#656d76',
    border: '#d0d7de',
    accent: '#f97316',        // 🔥 오렌지 (로고와 일치!)
    accentHover: '#ea580c',   // 진한 오렌지 (호버용)
  },
  dark: {
    bg: '#0d1117',
    bgSecondary: '#161b22',
    text: '#c9d1d9',
    textPrimary: '#f0f6fc',
    textMuted: '#8b949e',
    border: '#30363d',
    accent: '#667eea',        // 🔮 블루 (로고와 일치!)
    accentHover: '#5a67d8',   // 진한 블루 (호버용)
  }
};

export const getTheme = (darkMode) => darkMode ? colors.dark : colors.light;