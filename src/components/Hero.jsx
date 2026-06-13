import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const blueprintRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const blueprint = blueprintRef.current;
    const grid = gridRef.current;

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

    // Simultaneously scale up the grid while shrinking the blueprint
    tl.to(grid, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // The zoom-out mechanic for the blueprint
    tl.to(blueprint, {
      scale: 0.3,
      y: "-10vh",
      borderRadius: "40px",
      opacity: 0.2, // Fade it out slightly as it becomes a relic
      filter: "grayscale(100%) blur(4px)", // Add blur to make it recede
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="hero-zoom-container" ref={containerRef}>
      
      {/* NEW: The Background Grid that reveals as the blueprint shrinks */}
      <div className="hero-background-grid" ref={gridRef}>
        <div className="grid-item img-1"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" alt="Work 1"/></div>
        <div className="grid-item img-2"><img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" alt="Work 2"/></div>
        <div className="grid-item img-3"><img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop" alt="Work 3"/></div>
        <div className="grid-item img-4"><img src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop" alt="Work 4"/></div>
        <div className="grid-item img-5"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Work 5"/></div>
        <div className="grid-item img-6"><img src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=800&auto=format&fit=crop" alt="Work 6"/></div>
        
        {/* Massive Typography embedded in the grid */}
        <div className="grid-text-item top-left-text">ARCHIVE</div>
        <div className="grid-text-item bottom-right-text">001</div>
      </div>

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
