import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const imageRef = useRef(null);
  const textLinesRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the left image panel while the right side scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftPanelRef.current,
        pinSpacing: false, // The right side dictates the height
      });

      // Subtle, constant zoom on the pinned image for a cinematic feel
      gsap.to(imageRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Advanced staggered line mask reveal
      textLinesRef.current.forEach((line) => {
        gsap.fromTo(line, 
          { y: 100 }, // Start pushed down inside the hidden overflow wrapper
          {
            y: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%", // Trigger when the line is 90% down the screen
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-split-container" ref={containerRef}>
      
      {/* Pinned Left Panel */}
      <div className="about-split-left" ref={leftPanelRef}>
        <div className="about-pinned-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop" 
            alt="TAT STUDIO Essence" 
            ref={imageRef}
          />
          <div className="about-pinned-overlay">
            <span className="about-pinned-meta">DOC. REF: 001-TAT</span>
          </div>
        </div>
      </div>

      {/* Scrolling Right Panel */}
      <div className="about-split-right">
        
        <div className="about-text-content">
          <div className="about-line-wrapper">
            <h2 className="about-split-heading" ref={el => textLinesRef.current[0] = el}>THE</h2>
          </div>
          <div className="about-line-wrapper">
            <h2 className="about-split-heading" ref={el => textLinesRef.current[1] = el}>MANI</h2>
          </div>
          <div className="about-line-wrapper">
            <h2 className="about-split-heading" ref={el => textLinesRef.current[2] = el}>FESTO</h2>
          </div>
        </div>

        <div className="about-text-content">
          <div className="about-line-wrapper">
            <p className="about-split-body" ref={el => textLinesRef.current[3] = el}>
              TAT STUDIO exists at the exact intersection of spatial design, creative engineering, and brutalist architecture. We believe that digital and physical spaces are no longer separate entities. They are a single, continuous fabric that must be constructed with intention, precision, and absolute ruthlessness.
            </p>
          </div>
        </div>
        
        <div className="about-text-content">
          <div className="about-line-wrapper">
            <p className="about-split-body" ref={el => textLinesRef.current[4] = el}>
              Our methodology is simple: subtract the unnecessary until only the undeniable remains. We build platforms, experiences, and environments for those who refuse to blend into the noise. 
            </p>
          </div>
        </div>

        <div className="about-text-content">
          <div className="about-line-wrapper">
            <p className="about-split-body" ref={el => textLinesRef.current[5] = el}>
              If you are looking for templates, trends, or safety, you are in the wrong place. If you are looking to build something unseen, initialize the sequence.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default About;
