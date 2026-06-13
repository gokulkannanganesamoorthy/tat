import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = () => {
  const [timeStr, setTimeStr] = useState('00:00:00:000');
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // The chronograph runs for exactly 2.5 seconds
    const durationMs = 1000;
    const startTime = Date.now();

    const updateTimer = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < durationMs) {
        // Format as MM:SS:MS
        const ms = (elapsed % 1000).toString().padStart(3, '0');
        const seconds = Math.floor((elapsed / 1000) % 60)
          .toString()
          .padStart(2, '0');
        setTimeStr(`00:00:${seconds}:${ms}`);
        requestAnimationFrame(updateTimer);
      } else {
        // Freeze at the final precise moment
        setTimeStr('00:00:01:000');

        // Trigger the cinematic shutter outro
        gsap.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in',
        });

        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'expo.inOut',
          delay: 0.4,
        });
      }
    };

    requestAnimationFrame(updateTimer);
  }, []);

  return (
    <div className="preloader-chronograph-container" ref={containerRef}>
      <div className="preloader-chronograph-content" ref={textRef}>
        <p className="preloader-meta">INITIALIZING TAT PROTOCOL</p>
        {/* The Digital Chronograph */}
        <h1 className="preloader-time">{timeStr}</h1>
      </div>
    </div>
  );
};

export default Preloader;
