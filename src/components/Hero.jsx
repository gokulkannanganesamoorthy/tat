import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);
  const dialRef = useRef(null); // Reference for the rotating dial

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Infinite slow rotation for the clock dial
      gsap.to(dialRef.current, {
        rotation: 360,
        duration: 60, // Extremely slow, mechanical rotation (1 minute per revolution)
        ease: "none",
        repeat: -1
      });

      // Create a timeline that pins the container and scales the text mask
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Pin for 3x viewport height for a long, smooth zoom
          pin: true,
          scrub: 0.5, // Slight scrub delay for buttery smoothness
        }
      });

      // Scale the text infinitely until a letter's negative space consumes the screen
      tl.to(textRef.current, {
        scale: 150, // Massive scale
        transformOrigin: "50% 50%", // Target the center
        ease: "power2.in",
        duration: 1
      });

      // Fade out the entire mask right at the end to guarantee a flawless transition
      tl.to(".hero-mask-layer", {
        opacity: 0,
        duration: 0.1,
        ease: "none"
      }, "-=0.1"); // Start right before the scale finishes

      // Subtle zoom on the background media to add depth during the scroll
      tl.to(mediaRef.current, {
        scale: 1.1,
        ease: "none",
        duration: 1
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-awwwards-container" ref={containerRef}>
      
      {/* Background Media Layer (The "Inside" of the text) */}
      <div className="hero-media-layer">
        <video 
          src="/tat_hero.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
          ref={mediaRef}
          className="hero-background-video"
        />
        
        {/* Massive Rotating Subliminal Clock Dial */}
        <div className="hero-subliminal-dial" ref={dialRef}>
          <svg viewBox="0 0 100 100" className="hero-dial-svg">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(247, 244, 237, 0.3)" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(247, 244, 237, 0.15)" strokeWidth="0.1" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(247, 244, 237, 0.05)" strokeWidth="0.1" strokeDasharray="0.5 4" />
            {/* The 12 Hour Tick Marks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={i} 
                x1="50" y1="2" 
                x2="50" y2="5" 
                stroke="rgba(247, 244, 237, 0.6)" 
                strokeWidth="0.4" 
                transform={`rotate(${i * 30} 50 50)`} 
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Foreground Mask Layer */}
      <div className="hero-mask-layer">
        <img 
          src="/logo.png" 
          alt="THE ADS TAG Logo Mask" 
          className="hero-mask-img" 
          ref={textRef} 
        />
      </div>

    </section>
  );
};

export default Hero;
