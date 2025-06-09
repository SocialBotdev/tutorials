import React, { useState, useEffect } from 'react';

const ReadingProgressBar: React.FC = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const scrollListener = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };
    
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600" 
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
