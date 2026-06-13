import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './About.css';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // We use GSAP quickSetter for ultra-high-performance CSS variable updates
      const xSet = gsap.quickSetter(containerRef.current, "--x", "px");
      const ySet = gsap.quickSetter(containerRef.current, "--y", "px");

      const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to the container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        xSet(x);
        ySet(y);
      };

      // Center the spotlight initially
      const rect = containerRef.current.getBoundingClientRect();
      xSet(rect.width / 2);
      ySet(rect.height / 2);

      containerRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-spotlight-container" ref={containerRef}>
      
      {/* Background hint (very dark) so it's not totally empty if mouse is off-screen */}
      <div className="about-spotlight-hint">
        <h2>EXPLORE</h2>
      </div>

      {/* The Revealed Content (Masked by CSS) */}
      <div className="about-spotlight-reveal">
        <div className="about-reveal-content">
          <h2 className="about-reveal-title">
            BEYOND <br />
            <span className="indent-text">THE</span> <br />
            GRID
          </h2>
          <div className="about-reveal-image-wrapper">
             <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="Futuristic Concept" 
            />
          </div>
          <p className="about-reveal-body">
            We abandon the template. We reject the standard. TAT STUDIO constructs fluid, experimental digital environments that react, breathe, and exist entirely outside the bounds of traditional web engineering.
          </p>
        </div>
      </div>

    </section>
  );
};

export default About;
