import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal text elements as they scroll into view
      const textElements = gsap.utils.toArray('.reveal-text');
      
      textElements.forEach((text) => {
        gsap.fromTo(text, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef); // Scope to the container

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="about-editorial-container" ref={containerRef}>
      
      {/* Massive Header Section */}
      <section className="about-header">
        <h1 className="editorial-huge-title reveal-text">THE</h1>
        <h1 className="editorial-huge-title reveal-text indent-1">MANI</h1>
        <h1 className="editorial-huge-title reveal-text indent-2">FESTO</h1>
      </section>

      {/* Editorial Content Grid */}
      <section className="about-editorial-grid">
        
        {/* Left Column - Metadata & Small Images */}
        <div className="editorial-col-left">
          <div className="editorial-meta reveal-text">
            <span>DOC. REF: 001-TAT</span>
            <span>UPDATED: {new Date().getFullYear()}</span>
            <span>COORDINATES: IN</span>
          </div>
          
          <div className="editorial-stamp-img interactive reveal-text">
            <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop" alt="Abstract Concept" />
            <p className="stamp-caption">FIG 1. THE VOID</p>
          </div>
        </div>

        {/* Right Column - The Core Text */}
        <div className="editorial-col-right">
          <h2 className="editorial-subheading reveal-text">WE DO NOT DECORATE SPACE. WE ENGINEER REALITIES.</h2>
          
          <p className="editorial-body reveal-text">
            TAT STUDIO exists at the exact intersection of spatial design, creative engineering, and brutalist architecture. We believe that digital and physical spaces are no longer separate entities. They are a single, continuous fabric that must be constructed with intention, precision, and absolute ruthlessness.
          </p>
          
          <p className="editorial-body reveal-text">
            Our methodology is simple: subtract the unnecessary until only the undeniable remains. We build platforms, experiences, and environments for those who refuse to blend into the noise. 
          </p>

          <div className="editorial-large-img interactive reveal-text">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" alt="Brutalist Structure" />
            <div className="img-overlay-data">
              <span>SYS_NOMINAL</span>
              <span>100%</span>
            </div>
          </div>
          
          <p className="editorial-body reveal-text">
            If you are looking for templates, trends, or safety, you are in the wrong place. If you are looking to build something unseen, initialize the sequence.
          </p>
        </div>

      </section>
      
    </div>
  );
};

export default About;
