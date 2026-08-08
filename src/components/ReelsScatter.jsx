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

const scatterPositionsMobile = [
  { x: '-28vw', y: '-28vh', rotation: -12 },
  { x: '-20vw', y: '30vh', rotation: 8 },
  { x: '15vw', y: '-32vh', rotation: -5 },
  { x: '25vw', y: '25vh', rotation: 15 },
  { x: '30vw', y: '-5vh', rotation: -10 },
  { x: '-32vw', y: '8vh', rotation: 12 },
  { x: '-10vw', y: '-15vh', rotation: -18 },
  { x: '5vw', y: '35vh', rotation: 22 },
];

const scatterWords = ['Skin Care', 'FMCG', 'Real Estates'];
const wordPositions = [
  { x: '30vw', y: '-25vh', rotation: 0 },
  { x: '15vw', y: '40vh', rotation: 0 },
  { x: '-15vw', y: '-35vh', rotation: 0 },
];

const ReelsScatter = () => {
  const containerRef = useRef(null);
  const reelsRef = useRef([]);
  const wordsRef = useRef([]);

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

      const isMobile = window.innerWidth <= 768;
      const positions = isMobile ? scatterPositionsMobile : scatterPositions;

      // Scatter the reels from the center outwards
      tl.fromTo(reelsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.5,
        opacity: 1, // Start fully visible
      }, {
        x: (i) => positions[i].x,
        y: (i) => positions[i].y,
        rotation: (i) => positions[i].rotation,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, 0);

      // Scatter words simultaneously
      tl.fromTo(wordsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0,
        opacity: 0,
      }, {
        x: (i) => wordPositions[i].x,
        y: (i) => wordPositions[i].y,
        rotation: (i) => wordPositions[i].rotation,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, 0);

      // Fade out overlay text
      tl.to('.reels-overlay-text', {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.out"
      }, 0);

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
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', textTransform: 'uppercase', maxWidth: '800px', margin: '0 auto', lineHeight: '1.2' }}>
            So these are some of the contents which you can quickly look into
          </h2>
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

      {scatterWords.map((word, index) => (
        <div 
          key={`word-${index}`} 
          className="reel-scatter-word"
          ref={el => wordsRef.current[index] = el}
        >
          {word}
        </div>
      ))}
      </section>
    </div>
  );
};

export default ReelsScatter;
