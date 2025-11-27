<div align="center">

# 🎨 Junhyeok Hwang Portfolio

### Personal Portfolio Website

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com)

[🌐 Live Demo](#) | [📝 About](#about) | [✨ Features](#features) | [🚀 Getting Started](#getting-started)

</div>

---

## 📖 About

A modern, responsive portfolio website showcasing my projects, experience, and skills. Built with React and designed with a clean, minimal aesthetic inspired by GitHub and Velog.

**Key Highlights:**
- 🌓 Seamless dark/light mode switching
- 🌐 Bilingual support (English/Korean)
- ⌨️ Smooth typewriter animations
- 📱 Fully responsive design
- ⚡ Optimized performance

---

## ✨ Features

### 🎭 Theme Switching
- **Dark/Light Mode**: Toggle between themes with animated icon transitions
- **Colorful Hover Effects**: Sun icon (yellow) in dark mode, Moon icon (purple) in light mode
- **Smooth Transitions**: 360° rotation animation on theme change

### 🌍 Internationalization
- **Dual Language Support**: Switch between English and Korean
- **Typewriter Effect**: Elegant text animation when changing languages
- **Dynamic Content**: All pages adapt to selected language

### 📱 Responsive Design
- **Mobile-First Approach**: Optimized for all screen sizes
- **Adaptive Navigation**: Hamburger menu on mobile devices
- **Flexible Layouts**: Grid-based project cards that reflow automatically

### 🎯 Clean UI/UX
- **Minimalist Design**: Focus on content with clean typography
- **Consistent Styling**: GitHub/Velog-inspired color palette
- **Intuitive Navigation**: Fixed header with smooth page transitions

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library
- **Inline CSS** - Component-scoped styling

### Development
- **Create React App** - Project setup and build tool
- **Git** - Version control

### Deployment
- **Vercel** - Hosting and continuous deployment

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 14.0.0
npm >= 6.0.0
```

### Installation

```bash
# Clone the repository
git clone https://github.com/JHwang831/portfolio.git

# Navigate to project directory
cd portfolio-project

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000` 🎉

---

## 📂 Project Structure

```
src/
├── 📄 App.js                    # Main app component & routing
├── 📄 index.js                  # Entry point
│
├── 📁 context/
│   └── ThemeContext.jsx         # Global state (theme & language)
│
├── 📁 styles/
│   └── theme.js                 # Color theme definitions
│
├── 📁 components/
│   ├── Navbar.jsx               # Navigation bar with theme toggle
│   ├── Footer.jsx               # Footer with social links
│   └── Layout.jsx               # Common layout wrapper
│
└── 📁 pages/
    ├── Home.jsx                 # Landing page with typewriter effect
    ├── About.jsx                # Education, experience, skills
    ├── Portfolio.jsx            # Project showcase
    └── Blog.jsx                 # Blog posts (upcoming)
```

---

## 🎨 Pages Overview

| Page | Description |
|------|-------------|
| **Home** | Hero section with name, title, and social links |
| **About** | Education history, work experience, skills, and languages |
| **Portfolio** | Project cards with descriptions, tech stack, and links |
| **Blog** | Blog posts and development logs (coming soon) |

---

## 🌐 Deployment

### Deploy to Vercel

#### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click **"Import Project"** → Select your repository
4. Vercel auto-detects React settings → Click **"Deploy"**
5. Done! 🎉

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Build for Production

```bash
npm run build
```

Generates optimized production build in `build/` folder.

---

## 🔧 Configuration

### Customize Theme Colors

Edit `src/styles/theme.js`:

```javascript
export const colors = {
  light: {
    bg: '#ffffff',
    text: '#57606a',
    accent: '#0969da',
    // ...
  },
  dark: {
    bg: '#0d1117',
    text: '#c9d1d9',
    accent: '#58a6ff',
    // ...
  }
};
```

### Adjust Typewriter Speed

Edit `src/pages/Home.jsx`:

```javascript
<TypewriterText text={t.name} speed={35} /> // Adjust speed (ms)
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Junhyeok Hwang**

- 🎓 BSc Computer Science, Queen Mary University of London (2:1)
- 💼 Currently serving as Social Service Personnel in South Korea
- 🌐 Former Vice President, OKSE (Organisation of Korean Students in England)

### Connect with me

[![GitHub](https://img.shields.io/badge/GitHub-JHwang831-181717?style=flat&logo=github)](https://github.com/JHwang831)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Junhyeok%20Hwang-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/junhyeok-hwang-497413226/)
[![Email](https://img.shields.io/badge/Email-jun00883311@gmail.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:jun00883311@gmail.com)

---

## 🙏 Acknowledgments

- Design inspiration: [GitHub](https://github.com) & [Velog](https://velog.io)
- Icons: [Lucide React](https://lucide.dev)
- Hosting: [Vercel](https://vercel.com)

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by Junhyeok Hwang

© 2024 Junhyeok Hwang. All Rights Reserved.

</div>
