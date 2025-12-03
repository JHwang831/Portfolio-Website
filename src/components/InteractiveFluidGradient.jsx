import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const InteractiveFluidGradient = () => {
  const { darkMode: isDarkMode } = useTheme();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const isHomePage = location.pathname === '/';
  const interactiveRef = useRef(null);
  const cursorRef = useRef({ curX: 0, curY: 0, tgX: 0, tgY: 0 });

  // HOME 페이지일 때만 visible
  useEffect(() => {
    if (isHomePage) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isHomePage]);

  // Mouse tracking for interactive blob
  useEffect(() => {
    if (!isHomePage || !interactiveRef.current) return;

    const handleMouseMove = (event) => {
      cursorRef.current.tgX = event.clientX;
      cursorRef.current.tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth cursor animation
    const animate = () => {
      const { curX, curY, tgX, tgY } = cursorRef.current;
      cursorRef.current.curX += (tgX - curX) / 20;
      cursorRef.current.curY += (tgY - curY) / 20;

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(
          cursorRef.current.curX
        )}px, ${Math.round(cursorRef.current.curY)}px)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isHomePage]);

  // Color system based on theme
  const colors = isDarkMode
    ? {
        bg1: 'rgb(13, 17, 23)',      // Layout과 동일!
        bg2: 'rgb(13, 17, 23)',      // Layout과 동일!
        color1: '18, 113, 255',      // Blue
        color2: '221, 74, 255',       // Purple
        color3: '100, 220, 255',      // Cyan
        color4: '200, 50, 50',        // Red
        color5: '180, 180, 50',       // Yellow
        color6: '255, 100, 150',      // Pink
        color7: '100, 255, 200',      // Mint
        interactive: '140, 100, 255', // Purple
      }
    : {
        bg1: 'rgb(255, 255, 255)',   // Layout과 동일!
        bg2: 'rgb(255, 255, 255)',   // Layout과 동일!
        color1: '249, 115, 22',       // Orange
        color2: '251, 146, 60',       // Light Orange
        color3: '59, 130, 246',       // Blue
        color4: '251, 191, 36',       // Yellow
        color5: '234, 88, 12',        // Dark Orange
        color6: '236, 72, 153',       // Pink
        color7: '34, 197, 94',        // Green
        interactive: '251, 146, 60',  // Light Orange
      };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1.2s ease, background-color 1.2s ease',
        backgroundColor: isDarkMode ? '#0d1117' : '#ffffff',
      }}
    >
      {/* SVG Filters */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Goo/Blur Filter */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Noise Background */}
      <svg
        viewBox="0 0 100vw 100vw"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: 1,
          mixBlendMode: 'soft-light',
          opacity: 0.3,
        }}
      >
        <filter id="noiseFilterBg">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilterBg)" />
      </svg>

      {/* Gradients Container */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          filter: 'url(#goo) blur(40px)',
        }}
      >
        {/* Gradient 1 - Vertical Movement */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color1}, 0.8) 0, rgba(${colors.color1}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '80%',
            height: '80%',
            top: 'calc(50% - 40%)',
            left: 'calc(50% - 40%)',
            transformOrigin: 'center center',
            animation: isVisible ? 'moveVertical 30s ease infinite' : 'none',
            opacity: 1,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Gradient 2 - Circle Movement (Reverse) */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color2}, 0.8) 0, rgba(${colors.color2}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '80%',
            height: '80%',
            top: 'calc(50% - 40%)',
            left: 'calc(50% - 40%)',
            transformOrigin: 'calc(50% - 400px)',
            animation: isVisible ? 'moveInCircle 20s reverse infinite' : 'none',
            opacity: 1,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Gradient 3 - Circle Movement (Linear) */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color3}, 0.8) 0, rgba(${colors.color3}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '80%',
            height: '80%',
            top: 'calc(50% - 40% + 200px)',
            left: 'calc(50% - 40% - 500px)',
            transformOrigin: 'calc(50% + 400px)',
            animation: isVisible ? 'moveInCircle 40s linear infinite' : 'none',
            opacity: 1,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Gradient 4 - Horizontal Movement */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color4}, 0.8) 0, rgba(${colors.color4}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '80%',
            height: '80%',
            top: 'calc(50% - 40%)',
            left: 'calc(50% - 40%)',
            transformOrigin: 'calc(50% - 200px)',
            animation: isVisible ? 'moveHorizontal 40s ease infinite' : 'none',
            opacity: 0.7,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Gradient 5 - Circle Movement (Ease) */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color5}, 0.8) 0, rgba(${colors.color5}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: 'calc(80% * 2)',
            height: 'calc(80% * 2)',
            top: 'calc(50% - 80%)',
            left: 'calc(50% - 80%)',
            transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
            animation: isVisible ? 'moveInCircle 20s ease infinite' : 'none',
            opacity: 1,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Gradient 6 - Diagonal Movement */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color6}, 0.8) 0, rgba(${colors.color6}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '80%',
            height: '80%',
            top: 'calc(50% - 40%)',
            left: 'calc(50% - 40%)',
            transformOrigin: 'calc(50% + 300px) calc(50% - 300px)',
            animation: isVisible ? 'moveInCircle 35s ease infinite' : 'none',
            opacity: 0.8,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Gradient 7 - Slow Vertical */}
        <div
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.color7}, 0.8) 0, rgba(${colors.color7}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '90%',
            height: '90%',
            top: 'calc(50% - 45%)',
            left: 'calc(50% - 45%)',
            transformOrigin: 'center center',
            animation: isVisible ? 'moveVertical 50s ease infinite' : 'none',
            opacity: 0.6,
            transition: 'background 1.2s ease',
          }}
        />

        {/* Interactive Gradient (Mouse Following) */}
        <div
          ref={interactiveRef}
          style={{
            position: 'absolute',
            background: `radial-gradient(circle at center, rgba(${colors.interactive}, 0.8) 0, rgba(${colors.interactive}, 0) 50%) no-repeat`,
            mixBlendMode: 'hard-light',
            width: '100%',
            height: '100%',
            top: '-50%',
            left: '-50%',
            opacity: 0.7,
            transition: 'background 1.2s ease',
          }}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes moveInCircle {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes moveVertical {
          0% {
            transform: translateY(-50%);
          }
          50% {
            transform: translateY(50%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes moveHorizontal {
          0% {
            transform: translateX(-50%) translateY(-10%);
          }
          50% {
            transform: translateX(50%) translateY(10%);
          }
          100% {
            transform: translateX(-50%) translateY(-10%);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveFluidGradient;