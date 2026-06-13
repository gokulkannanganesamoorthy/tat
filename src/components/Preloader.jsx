import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const terminalLines = [
  'INITIALIZING KINETIC ENGINE...',
  'ESTABLISHING SECURE CONNECTION...',
  'BYPASSING MAINFRAME PROTOCOLS...',
  'LOADING SPATIAL ASSETS: 100%',
  'DECRYPTING MANIFESTO...',
  'SYS.BOOT SUCCESSFUL.',
];

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    // Fake progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Wait half a second at 100% before closing
          return 100;
        }
        return next;
      });
    }, 100);

    // Fake terminal line updater
    const lineInterval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev < terminalLines.length - 1) return prev + 1;
        clearInterval(lineInterval);
        return prev;
      });
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(lineInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="terminal-preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="terminal-container">
            <div className="terminal-header">
              <span>TAT.SYS_v2.0</span>
              <span>PORT: 8080</span>
            </div>

            <div className="terminal-body">
              {terminalLines.slice(0, lineIndex + 1).map((line, i) => (
                <div key={i} className="terminal-line">
                  {' '}
                  {line}
                </div>
              ))}
              {lineIndex < terminalLines.length - 1 && (
                <div className="terminal-cursor">_</div>
              )}
            </div>

            <div className="terminal-footer">
              <span className="terminal-progress">
                {progress.toString().padStart(3, '0')}%
              </span>
              <span className="terminal-status">AWAITING ENGAGEMENT</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
