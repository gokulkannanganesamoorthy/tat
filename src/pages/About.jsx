import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Elegant background color transition
      gsap.to(containerRef.current, {
        backgroundColor: "#0A0A0A", // Very deep, luxurious charcoal/black
        color: "#F7F4ED", // Shift text to cream
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Start shifting when section is 60% up the viewport
          end: "top 20%",
          scrub: true,
        }
      });

      // Deep parallax on the inner image
      // The wrapper has overflow hidden, the image scales up slightly and moves Y
      gsap.fromTo(imageRef.current, 
        { yPercent: -20, scale: 1.1 },
        { 
          yPercent: 20, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-editorial-container" ref={containerRef}>
      
      <div className="about-editorial-header">
        <p className="about-meta-tag">01 // THE MANIFESTO</p>
        <h2 className="about-editorial-title">
          WE BUILD <br />
          <span className="serif-italic">digital environments</span> <br />
          BEYOND THE GRID.
        </h2>
      </div>

      <div className="about-editorial-body">
        <div className="about-editorial-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" 
            alt="Editorial Architecture" 
            ref={imageRef}
            className="about-editorial-img"
          />
        </div>
        
        <div className="about-editorial-text-content">
          <p>
            TAT STUDIO rejects the stereotypic template. We curate fluid, high-end digital experiences that behave like modern art installations.
          </p>
          <p>
            Every interaction is engineered for maximum narrative impact, blending brutalist structural design with cinematic motion.
          </p>
        </div>
      </div>

    </section>
  );
};

export default About;
