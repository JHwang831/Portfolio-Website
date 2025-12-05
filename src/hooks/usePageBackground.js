import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * usePageBackground Hook
 * 
 * 페이지의 배경색을 테마에 맞게 설정하여 오버스크롤 시 흰색 배경이 노출되는 문제를 해결합니다.
 * 
 * 사용법:
 * ```jsx
 * import usePageBackground from '../hooks/usePageBackground';
 * 
 * const MyPage = () => {
 *   usePageBackground();
 *   
 *   return (
 *     <div>...</div>
 *   );
 * };
 * ```
 */
const usePageBackground = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    // body와 html 요소의 배경색을 테마 배경색으로 설정
    document.body.style.backgroundColor = theme.bg;
    document.documentElement.style.backgroundColor = theme.bg;
    
    // 컴포넌트 언마운트 시 정리 (선택적)
    // return () => {
    //   document.body.style.backgroundColor = '';
    //   document.documentElement.style.backgroundColor = '';
    // };
  }, [theme.bg]);
};

export default usePageBackground;
