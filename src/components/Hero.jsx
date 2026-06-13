import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const dialRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Infinite slow rotation for the clock dial
      gsap.to(dialRef.current, {
        rotation: 360,
        duration: 60,
        ease: "none",
        repeat: -1
      });

      // Create a timeline that pins the container and scales the mask layer
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Pin for a long, smooth zoom
          pin: true,
          scrub: 0.5,
        }
      });

      // Step 1: Scale the mask up massively.
      // This takes up the first 85% of the scroll. The white background stays SOLID opaque!
      tl.to(mediaRef.current, {
        scale: 80, 
        transformOrigin: "48% 50%", // Zoom into a thick part of the drawing
        duration: 0.85,
        ease: "power3.in"
      });

      // Step 2: At the VERY END of the scroll, when the transparent hole is already massive,
      // we quickly fade out the mask layer to hide the jagged GIF pixels and perfectly reveal the full photo.
      tl.to(mediaRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: "none"
      });

      // Rotate the subliminal dial slowly as they zoom
      tl.to(".hero-subliminal-dial", {
        rotation: 90,
        duration: 1,
        ease: "none"
      }, "<");

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-safe-wrapper">
      <section className="hero-awwwards-container" ref={containerRef}>
        
        {/* The Media Layer (The Photo) */}
        <div className="hero-media-layer">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop" 
            alt="Abstract Architecture"
            className="hero-background-video"
          />
          
          {/* Massive Rotating Subliminal Clock Dial */}
          <div className="hero-subliminal-dial" ref={dialRef}>
            <svg viewBox="0 0 100 100" className="hero-dial-svg">
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="1 4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.2" />
              <path d="M50 2 L50 6 M50 94 L50 98 M2 50 L6 50 M94 50 L98 50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Foreground Mask Layer (Solid White Box with GIF) */}
        <div className="hero-mask-layer" ref={mediaRef}>
          <img 
            src="/hero.gif" 
            alt="Hero Mask"
            className="hero-mask-gif"
          />
        </div>

      </section>
    </div>
  );
};

export default Hero;
