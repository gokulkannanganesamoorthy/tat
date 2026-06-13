import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageInnerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const imgWrapper = imageWrapperRef.current;
      const imgInner = imageInnerRef.current;
      const text = textRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%', // Scroll depth for the animation
          pin: true,
          scrub: 1, // Buttery smooth scrubbing
        },
      });

      // 1. Shrink the massive fullscreen wrapper down to a center frame
      tl.to(
        imgWrapper,
        {
          width: '35vw',
          height: '60vh',
          borderRadius: '8px', // Soften the edges as it becomes a frame
          ease: 'power2.inOut',
          duration: 1,
        },
        0,
      );

      // 2. Counter-scale the image inside to maintain aspect ratio and add parallax
      tl.to(
        imgInner,
        {
          scale: 1.2,
          ease: 'power2.inOut',
          duration: 1,
        },
        0,
      );

      // 3. Fade in and scale up the typography from the background
      tl.fromTo(
        text,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: 'power2.inOut', duration: 1 },
        0.2, // Start slightly after the image begins shrinking
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-premium-container" ref={containerRef}>
      {/* The Typography Layer (Sits on top, split left/right) */}
      <div className="about-premium-text-layer" ref={textRef}>
         
         <div className="about-text-left">
           <p className="about-premium-meta">01 // THE MANIFESTO</p>
           <h2 className="about-premium-title">
             WE REJECT <br /> THE
           </h2>
         </div>

         <div className="about-text-right">
           <h2 className="about-premium-title">
             <span className="serif-italic">template</span>
           </h2>
           <p className="about-premium-subtitle">
             Architecting fluid digital environments engineered for maximum narrative impact. We build beyond the grid.
           </p>
         </div>

      </div>

      {/* The Fullscreen Image Layer (Shrinks down) */}
      <div className="about-premium-image-layer" ref={imageWrapperRef}>
        <img
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
          alt="Abstract Architecture"
          ref={imageInnerRef}
        />
        {/* Dark overlay to ensure text contrast later */}
        <div className="about-premium-image-overlay"></div>
      </div>
    </section>
  );
};

export default About;
