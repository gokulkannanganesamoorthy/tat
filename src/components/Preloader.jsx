import { useState, useEffect } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const Preloader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Simulate clean, rapid loading
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5;
        if (currentProgress > 100) currentProgress = 100;
        setProgress(currentProgress);

        if (currentProgress === 100) {
          clearInterval(interval);
          
          // Elegant fade out
          gsap.to(".preloader-elegant", {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            delay: 0.3,
            onComplete: () => {
              setLoading(false);
            }
          });
        }
      }, 50);

      return () => clearInterval(interval);
    });

    return () => ctx.revert();
  }, [setLoading]);

  return (
    <div className="preloader-elegant">
      <div className="preloader-center-content">
        <h1 className="preloader-percentage">{progress}%</h1>
        <div className="preloader-brand">TAT STUDIO</div>
      </div>
    </div>
  );
};

export default Preloader;
