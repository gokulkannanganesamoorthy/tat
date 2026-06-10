import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 15);
          return next >= 100 ? 100 : next;
        });
      }, 100);
    } else {
      // Small delay at 100% before triggering the exit animation
      setTimeout(() => setIsLoaded(true), 600);
    }

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div 
          className="preloader-container"
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="preloader-content">
            <h1 className="preloader-counter">{progress}%</h1>
            <p className="preloader-label">INITIALIZING THE VOID</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
