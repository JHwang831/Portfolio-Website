import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div
      key={location.pathname}
      style={{
        backgroundColor: isHomePage ? 'transparent' : undefined,
        background: isHomePage ? 'transparent' : undefined
      }}
    >
      {children}
    </div>
  );
};

const AnimatedRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </PageTransition>
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