import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const blueprintRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const blueprint = blueprintRef.current;

    // Pin the hero section and scale down the blueprint artwork
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=150%", // Pin for 1.5x viewport height
        pin: true,
        scrub: 1,
      }
    });

    // The zoom-out mechanic
    tl.to(blueprint, {
      scale: 0.3,
      y: "-10vh",
      borderRadius: "40px",
      opacity: 0.2, // Fade it out slightly as it becomes a relic
      filter: "grayscale(100%)",
      duration: 1,
      ease: "power2.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="hero-zoom-container" ref={containerRef}>
      
      {/* The massive artistic composition that will shrink */}
      <div className="blueprint-canvas interactive" ref={blueprintRef}>
        
        {/* Technical grid lines in the background */}
        <div className="blueprint-grid"></div>

        {/* Massive Artistic Typography */}
        <div className="blueprint-text-wrapper">
          <h1 className="blueprint-title">T.A.T</h1>
          <h2 className="blueprint-subtitle">SPATIAL DESIGN & CREATIVE ENG.</h2>
        </div>

        {/* Abstract Technical Data / Details */}
        <div className="blueprint-data-corners">
          <div className="data-corner top-left">
            <span>[SYS_ACTIVE]</span>
            <span>v2.0.4 // COIMBATORE</span>
          </div>
          <div className="data-corner top-right">
            <span>VOL: 99.4%</span>
            <span>INITIALIZING...</span>
          </div>
          <div className="data-corner bottom-left">
            <span>X: 1440 Y: 900</span>
            <span>FRAME: 001</span>
          </div>
          <div className="data-corner bottom-right">
            <span>SCROLL TO</span>
            <span>ENGAGE SEQUENCE</span>
          </div>
        </div>

        {/* The central abstract artwork/shape */}
        <div className="blueprint-centerpiece">
           <div className="rotating-wireframe"></div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
