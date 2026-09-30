import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics spring for the fluid trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10); // Center the small dot (20px)
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      // Find the closest parent with data-cursor, or just interactive
      const target = e.target.closest('.interactive, a, button, [data-cursor]');
      
      if (target) {
        setIsHovered(true);
        if (target.hasAttribute('data-cursor')) {
          setCursorText(target.getAttribute('data-cursor'));
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`custom-cursor ${isHovered ? 'hovered' : ''} ${cursorText ? 'has-text' : ''}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        width: isHovered ? (cursorText ? 80 : 40) : 20,
        height: isHovered ? (cursorText ? 80 : 40) : 20,
        x: cursorXSpring.get() - (isHovered ? (cursorText ? 30 : 10) : 0),
        y: cursorYSpring.get() - (isHovered ? (cursorText ? 30 : 10) : 0),
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {cursorText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cursor-text"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cursor;
