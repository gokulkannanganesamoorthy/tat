import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const narrative = [
  'WE REJECT THE TEMPLATE.',
  'WE ABANDON THE GRID.',
  'TAT STUDIO ARCHITECTS FLUID DIGITAL ENVIRONMENTS.',
  'ENGINEERED FOR MAXIMUM NARRATIVE IMPACT.',
  'BEYOND THE BROWSER.'
];

const About = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const texts = textRefs.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=400%", // Deep pin
          pin: true,
          scrub: 1,
        }
      });

      // Slowly fade in the dark background image over the course of the entire pin
      tl.to(bgRef.current, {
        opacity: 0.3,
        scale: 1.1,
        duration: 10, // Span the timeline
        ease: "none"
      }, 0);

      // Staggered reveal and hide for each narrative line
      texts.forEach((text, i) => {
        // Fade in and slide up
        tl.fromTo(text, 
          { opacity: 0, y: 150, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" },
          "+=0.5" 
        );

        // Fade out and slide up (except for the last one)
        if (i !== texts.length - 1) {
          tl.to(text, 
            { opacity: 0, y: -150, scale: 1.1, duration: 1.5, ease: "power2.in" },
            "+=1.5" // Allow reading time
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-monolith-container" ref={containerRef}>
      
      {/* Deep cinematic background */}
      <div className="about-monolith-bg" ref={bgRef}>
        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" alt="Abstract Architecture" />
      </div>

      <div className="about-monolith-content">
        <p className="about-meta">01 // THE MANIFESTO</p>
        <div className="about-narrative-wrapper">
          {narrative.map((line, index) => (
            <h2 
              className="about-monolith-line" 
              key={index}
              ref={el => textRefs.current[index] = el}
            >
              {line}
            </h2>
          ))}
        </div>
      </div>

    </section>
  );
};

export default About;
