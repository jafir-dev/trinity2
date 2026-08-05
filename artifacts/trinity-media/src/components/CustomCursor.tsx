import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) return; // disable on mobile/tablet

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[100] transition-transform duration-200 mix-blend-difference hidden lg:block`}
      style={{ 
        transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0) scale(${isHovering ? 2.5 : 1})`,
        backgroundColor: 'rgba(123, 45, 142, 0.8)',
      }}
    />
  );
}
