import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop" 
          alt="Abstract Architecture" 
          ref={mediaRef}
        />
      </div>

      {/* Foreground Mask Layer */}
      <div className="hero-mask-layer">
        <h1 className="hero-mask-text" ref={textRef}>
          TAT
        </h1>
      </div>

    </section>
  );
};

export default Hero;
