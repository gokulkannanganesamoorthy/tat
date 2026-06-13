import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyUs.css';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  "WE ARE NOT JUST AN AGENCY.",
  "WE SUBORDINATE THE EGO TO YOUR BRAND NARRATIVE.",
  "CLICKS MEAN NOTHING WITHOUT CONVERSIONS.",
  "WE ENGINEER ENGINES OF ROI AND SCALING.",
  "THIS IS TECHNICAL MASTERY."
];

const WhyUs = () => {
  const containerRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const texts = textRef.current;

    // Create a GSAP timeline linked to the scroll of the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=400%", // Extended pin duration
        pin: true,
        scrub: 1,
      }
    });

    // Add an initial empty space in the timeline so nothing happens immediately upon pinning
    tl.to({}, { duration: 1 });

    // Background color inversion starts AFTER the initial scroll delay
    tl.to(container, {
      backgroundColor: "var(--text-primary)", // Dark blue
      color: "var(--bg-color)", // Creamy white
      duration: 1,
      ease: "none"
    }, "+=0");

    // Staggered text reveal and hide
    texts.forEach((text, i) => {
      // Fade in and slide up
      tl.fromTo(text, 
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power2.out" },
        "+=0.5" // Start each text slightly after the previous sequence
      );

      // Fade out and slide up (except for the last one)
      if (i !== texts.length - 1) {
        tl.to(text, 
          { opacity: 0, y: -100, scale: 1.1, duration: 1.5, ease: "power2.in" },
          "+=1" // Give the user time to read before fading out
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="why-us-cinematic" ref={containerRef}>
      <div className="why-us-center-content">
        <div className="why-us-label">THE PHILOSOPHY</div>
        <div className="statements-wrapper">
          {statements.map((stmt, idx) => (
            <h2 
              key={idx} 
              className="cinematic-statement"
              ref={el => textRef.current[idx] = el}
            >
              {stmt}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
