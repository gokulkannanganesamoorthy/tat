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
          const next = prev + Math.floor(Math.random() * 8) + 2;
          return next >= 100 ? 100 : next;
        });
      }, 50);
    } else {
      setTimeout(() => setIsLoaded(true), 800);
    }

    return () => clearInterval(interval);
  }, [progress]);

  const shutterVariants = {
    initial: { scaleY: 1 },
    exit: (i) => ({
      scaleY: 0,
      transition: {
        duration: 0.9,
        ease: [0.85, 0, 0.15, 1],
        delay: i * 0.08,
      }
    })
  };

  const contentVariants = {
    initial: { opacity: 1, y: 0 },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.6, ease: [0.85, 0, 0.15, 1] } 
    }
  };

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="preloader-overlay">
          {/* Alternating Shutter Columns */}
          <div className="shutter-grid">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                className="shutter-col"
                style={{ transformOrigin: i % 2 === 0 ? 'top' : 'bottom' }}
                variants={shutterVariants}
                initial="initial"
                exit="exit"
              />
            ))}
          </div>

          <motion.div 
            className="preloader-content-wrapper"
            variants={contentVariants}
            initial="initial"
            exit="exit"
          >
            <div className="svg-container">
              <svg className="preloader-svg" viewBox="0 0 100 100">
                <motion.path
                  d="M 20 25 L 80 25 M 50 25 L 50 75 M 35 75 L 65 75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ ease: "easeInOut" }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                />
              </svg>
            </div>

            <div className="preloader-info">
              <div className="preloader-progress-text">
                {progress}<span className="percent-sign">%</span>
              </div>
              <div className="preloader-status-container">
                <span className="status-dot"></span>
                <p className="preloader-subtext">CRAFTING SPATIAL EXPERIENCES</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
