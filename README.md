# Portfolio Website

A modern, bilingual portfolio website showcasing my projects, experience, and blog posts. Built with React and Tailwind CSS, featuring smooth animations and responsive design.

🌐 **Live Site**: [https://junhyeok-hwang.vercel.app/](https://junhyeok-hwang.vercel.app/)  
📌 **Custom Domain** (planned): https://junhyeokhwang.com

## ✨ Key Features

### 🎨 MorphText Animation
**What it does**: Character-by-character morphing text animation on the home page  
**How to use**: Visit the home page and watch the greeting text animate smoothly  
**Implementation**: Custom React component using `setInterval` for character-level transitions

### 🌍 Bilingual Support (English/Korean)
**What it does**: Complete website content available in both English and Korean  
**How to use**: Click the language toggle button (EN/KR) in the top navigation bar  
**Implementation**: Context-based language switching with centralized content management in `content.js`

### 🌓 Dark/Light Mode
**What it does**: Comprehensive theming system with optimized color schemes for both modes  
**How to use**: Click the sun/moon icon in the navigation bar to switch themes  
**Implementation**: 
- Context-based theme management with `localStorage` persistence
- Cool tones for dark mode, warm tones for light mode
- Smooth CSS transitions between theme changes

### 📱 Fully Responsive Design
**What it does**: Optimized layout for all screen sizes (mobile, tablet, desktop)  
**How to use**: Resize your browser or visit on any device  
**Implementation**: 
- Tailwind CSS responsive utilities (`sm:`, `md:`, `lg:`, `xl:`)
- Mobile-first design approach
- Adaptive navigation (hamburger menu on mobile)

## 🏗️ Project Structure

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── Home.jsx           # Landing page with MorphText
│   │   ├── About.jsx           # About section with timeline
│   │   ├── Portfolio.jsx       # Projects gallery with Masonry layout
│   │   ├── Blog.jsx            # Blog posts with Markdown support
│   │   └── Navbar.jsx          # Navigation with language/theme toggles
│   ├── data/
│   │   ├── content.js          # Bilingual content
│   │   └── projects.js         # Project data
│   ├── assets/
│   │   └── blog/               # Markdown blog posts
│   ├── App.jsx                 # Main app component
│   └── index.css               # Global styles
├── public/
│   └── projects/               # Project screenshots
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/JHwang831/Portfolio-Website.git
cd Portfolio-Website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 📄 Pages & Features

### 🏠 Home
**Purpose**: Landing page with engaging first impression  
**Features**:
- MorphText animation greeting
- Quick introduction
- Call-to-action buttons

**Navigation**: Automatically shown when visiting the site

---

### 👤 About
**Purpose**: Detailed background and experience information  
**Features**:
- **Bento Box Layout**: Organized information cards
- **Interactive Timeline**: Education and work experience with animations
- **Scroll Animations**: Elements fade in as you scroll down

**How to explore**:
1. Click "About" in the navigation bar
2. Scroll through the timeline to see different experiences
3. Hover over cards for subtle interactions

---

### 💼 Portfolio
**Purpose**: Showcase of development and design projects  
**Features**:
- **Masonry Layout**: Pinterest-style grid arrangement
- **Category Filtering**: Filter by "All", "Development", or "Design"
- **Project Modals**: Click any project for detailed information
- **Tech Stack Badges**: Visual representation of technologies used

**How to use**:
1. Click "Portfolio" in navigation
2. Use category buttons to filter projects
3. Click any project card to open detailed modal
4. View GitHub links and live demos within modals

---

### 📝 Blog
**Purpose**: Technical writing and project insights  
**Features**:
- **Markdown Support**: Posts written in Markdown format
- **Category Organization**: Posts organized by topic
- **Read Time Estimation**: Approximate reading time for each post

**How to use**:
1. Click "Blog" in navigation
2. Browse available posts
3. Click on any post title to read the full article

---

### 🎨 Special Features

**Interactive Mesh Gradient Background**:
- Mouse-responsive gradient that follows cursor movement
- Smooth GPU-accelerated animations
- Different gradients for light/dark mode

**3D Tilt Effects**:
- Subtle 3D perspective on project cards
- Activated on mouse hover (desktop only)
- Smooth transitions for natural feel

**Performance Optimization**:
- 60fps animation standards maintained throughout
- Optimized blur effects for better performance
- Lazy loading for images

## 🌐 Deployment

The website is deployed on Vercel with automatic deployments from the main branch.

**Current URL**: [https://junhyeok-hwang.vercel.app/](https://junhyeok-hwang.vercel.app/)

**Custom Domain** (planned): [https://junhyeokhwang.com](https://junhyeokhwang.com)

## 📝 Adding New Blog Posts

Blog posts are written in Markdown and stored in `src/assets/blog/`.

**Step-by-step guide**:

1. **Create a new Markdown file**
   ```bash
   # Navigate to blog folder
   cd src/assets/blog/
   
   # Create new file (use kebab-case naming)
   touch my-new-post.md
   ```

2. **Add frontmatter metadata** at the top of the file
   ```markdown
   ---
   title: Your Post Title Here
   date: 2025-12-22
   category: Development
   excerpt: A brief summary of your post (optional)
   ---
   ```

3. **Write your content** in Markdown
   ```markdown
   ## Introduction
   
   Your content here...
   
   ### Code Examples
   
   ```javascript
   const example = "code";
   ```
   
   ### Images
   
   ![Alt text](image-path.png)
   ```

4. **Save and commit**
   ```bash
   git add src/assets/blog/my-new-post.md
   git commit -m "Add new blog post: Your Title"
   git push
   ```

5. **The post will automatically appear** in the blog section after deployment

**Supported Markdown features**:
- Headers (H1-H6)
- Bold, italic, strikethrough
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Links and images
- Blockquotes
- Tables

## 🔧 Customization Guide

### Updating Content

**Bilingual Content**:
1. Open `src/data/content.js`
2. Modify the `EN` and `KR` objects
3. Both languages share the same structure for easy maintenance

```javascript
export const content = {
  EN: {
    nav: ['Home', 'About', 'Portfolio', 'Blog'],
    home: {
      greeting: "Hi, I'm",
      name: "Your Name",
      // ... more content
    }
  },
  KR: {
    nav: ['홈', '소개', '포트폴리오', '블로그'],
    // ... Korean translations
  }
};
```

**Project Information**:
1. Open `src/data/projects.js`
2. Add or modify project entries
3. Each project includes:
   - Title (EN/KR)
   - Description
   - Tech stack
   - Links (GitHub, live demo)
   - Category

---

### Changing Theme Colors

**Quick color changes**:
1. Open `tailwind.config.js`
2. Modify the `extend.colors` section

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Customize these values
        primary: '#your-color',
        secondary: '#your-color',
        // ...
      }
    }
  }
}
```

**Dark mode specific colors**:
- Use Tailwind's `dark:` prefix in components
- Example: `bg-white dark:bg-gray-900`

---

### Modifying Animations

**MorphText Speed**:
- File: `src/components/Home.jsx`
- Adjust `setInterval` delay (default: 50ms)

**Scroll Animation Threshold**:
- File: `src/components/About.jsx`
- Modify `IntersectionObserver` threshold values

**Page Transition Duration**:
- Update Framer Motion `duration` props in components

## 📈 Future Enhancements

- [ ] Custom domain integration
- [ ] Blog post search functionality
- [ ] Project filtering by technology
- [ ] Contact form integration
- [ ] Performance analytics

## 📧 Contact

**Junhyeok Hwang**
- Email: jun00883311@gmail.com
- GitHub: [@JHwang831](https://github.com/JHwang831)
- LinkedIn: [LinkedIn](www.linkedin.com/in/junhyeok-hwang-497413226)


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built by Junhyeok Hwang, 2025
