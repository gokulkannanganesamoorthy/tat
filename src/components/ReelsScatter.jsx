import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ReelsScatter.css';

gsap.registerPlugin(ScrollTrigger);

const reels = [
  '/reels/1.mp4',
  '/reels/2.mp4',
  '/reels/3.mp4',
  '/reels/4.mp4',
  '/reels/5.mp4',
  '/reels/6.mp4',
  '/reels/7.mp4',
  '/reels/8.mp4',
];

// Predefined scatter coordinates
const scatterPositions = [
  { x: '-38vw', y: '-28vh', rotation: -12 },
  { x: '-22vw', y: '32vh', rotation: 8 },
  { x: '5vw', y: '-36vh', rotation: -5 },
  { x: '28vw', y: '22vh', rotation: 15 },
  { x: '42vw', y: '-12vh', rotation: -10 },
  { x: '-42vw', y: '12vh', rotation: 12 },
  { x: '-18vw', y: '-18vh', rotation: -18 },
  { x: '12vw', y: '35vh', rotation: 22 },
];

const ReelsScatter = () => {
  const containerRef = useRef(null);
  const reelsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1, // Increase scrub for buttery smoothness
          anticipatePin: 1, // Helps with sudden pinning jumps
        }
      });

      // Scatter the reels from the center outwards
      tl.fromTo(reelsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.5,
        opacity: 0,
      }, {
        x: (i) => scatterPositions[i].x,
        y: (i) => scatterPositions[i].y,
        rotation: (i) => scatterPositions[i].rotation,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      });

    }, containerRef);
    
    // Force ScrollTrigger to recalculate positions after all components mount
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, []);

  return (
    <div className="reels-scatter-safe-wrapper">
      <section className="reels-scatter-container" ref={containerRef}>
        <div className="reels-overlay-text">
          <h2>Short-Form Stories</h2>
          <p>Impactful narratives in under a minute</p>
        </div>
      
      {reels.map((src, index) => (
        <div 
          key={index} 
          className="reel-wrapper"
          ref={el => reelsRef.current[index] = el}
        >
          <video 
            src={src} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="reel-video" 
          />
        </div>
      ))}
      </section>
    </div>
  );
};

export default ReelsScatter;
