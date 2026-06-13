import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Physics spring for the fluid trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // The Ticking Second Hand (6 degrees every second = 360 degrees in 60s)
    const tickInterval = setInterval(() => {
      setRotation(prev => prev + 6);
    }, 1000);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20); // Center the 40px container
      cursorY.set(e.clientY - 20);
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering an interactive element
      if (e.target.closest('.interactive') || e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      clearInterval(tickInterval);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        rotate: rotation, // Framer Motion handles the smooth rotation
      }}
      animate={{
        scale: isHovered ? 1.5 : 1, // Expand the container on hover
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* The physical hand geometry is handled in CSS */}
    </motion.div>
  );
};

export default Cursor;
