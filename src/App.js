import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('idle'); // 'idle' | 'fadeOut' | 'fadeIn'
  const prevLocationRef = useRef(location);

  useEffect(() => {
    // 같은 페이지면 트랜지션 안 함
    if (location.pathname === prevLocationRef.current.pathname) return;

    // Phase 1: 이전 페이지 fade out (200ms)
    setTransitionStage('fadeOut');

    const fadeOutTimer = setTimeout(() => {
      // 페이지 교체
      setDisplayLocation(location);
      prevLocationRef.current = location;
      
      // Phase 2: 새 페이지 fade in (200ms)
      setTransitionStage('fadeIn');

      const fadeInTimer = setTimeout(() => {
        setTransitionStage('idle');
      }, 200);

      return () => clearTimeout(fadeInTimer);
    }, 200);

    return () => clearTimeout(fadeOutTimer);
  }, [location]);

  // 트랜지션 스타일
  const getTransitionStyle = () => {
    switch (transitionStage) {
      case 'fadeOut':
        return {
          opacity: 0,
          filter: 'blur(10px)',
          transform: 'scale(0.98)',
          transition: 'all 0.2s ease'
        };
      case 'fadeIn':
        return {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'scale(1)',
          transition: 'all 0.2s ease'
        };
      default: // 'idle'
        return {
          opacity: 1,
          filter: 'blur(0px)',
          transform: 'scale(1)',
          transition: 'all 0.2s ease'
        };
    }
  };

  const isHomePage = displayLocation.pathname === '/';

  return (
    <div
      style={{
        backgroundColor: isHomePage ? 'transparent' : undefined,
        background: isHomePage ? 'transparent' : undefined,
        ...getTransitionStyle()
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;