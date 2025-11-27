export const colors = {
  light: {
    bg: '#ffffff',
    bgSecondary: '#f6f8fa',
    text: '#57606a',
    textPrimary: '#1f2328',
    textMuted: '#656d76',
    border: '#d0d7de',
    accent: '#0969da',
  },
  dark: {
    bg: '#0d1117',
    bgSecondary: '#161b22',
    text: '#c9d1d9',
    textPrimary: '#f0f6fc',
    textMuted: '#8b949e',
    border: '#30363d',
    accent: '#58a6ff',
  }
};

export const getTheme = (darkMode) => darkMode ? colors.dark : colors.light;
