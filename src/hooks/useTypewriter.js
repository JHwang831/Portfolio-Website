import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 50, startDelay = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    setIsTyping(true);
    setDisplayedText('');
    
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isTyping };
};

export const useTypewriterDelete = (text, speed = 30, deleteSpeed = 20) => {
  const [displayedText, setDisplayedText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    // Start deleting current text
    setIsDeleting(true);
    let currentText = displayedText;
    
    const deleteInterval = setInterval(() => {
      if (currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setDisplayedText(currentText);
      } else {
        clearInterval(deleteInterval);
        setIsDeleting(false);
        
        // Start typing new text
        setIsTyping(true);
        let newIndex = 0;
        
        const typeInterval = setInterval(() => {
          if (newIndex <= text.length) {
            setDisplayedText(text.slice(0, newIndex));
            newIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, speed);
      }
    }, deleteSpeed);

    return () => {
      clearInterval(deleteInterval);
    };
  }, [text]);

  return { displayedText, isDeleting, isTyping };
};
