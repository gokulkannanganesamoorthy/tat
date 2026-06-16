import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyUs.css';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  'WE ARE NOT JUST AN AGENCY.',
  'WE SUBORDINATE THE EGO TO YOUR BRAND NARRATIVE.',
  'CLICKS MEAN NOTHING WITHOUT CONVERSIONS.',
  'WE ENGINEER ENGINES OF ROI AND SCALING.',
  'THIS IS TECHNICAL MASTERY.',
];

const WhyUs = () => {
  const containerRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const texts = textRef.current;

      // Create a GSAP timeline linked to the scroll of the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=1000%', // Drastically extended pin duration so one swipe doesn't reveal everything
          pin: true,
          scrub: 1, // Smooth scrubbing
        },
      });

      // Add an initial empty space in the timeline so nothing happens immediately upon pinning
      tl.to({}, { duration: 0.5 });

      // We removed the background color animation, as the user wants it to be blue from the beginning.

      // Staggered text reveal and hide
      texts.forEach((text, i) => {
        // Fade in and slide up
        tl.fromTo(
          text,
          { opacity: 0, y: 100, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power2.out' },
          '+=0.5', // Start each text slightly after the previous sequence
        );

        // Fade out and slide up (except for the last one)
        if (i !== texts.length - 1) {
          tl.to(
            text,
            {
              opacity: 0,
              y: -100,
              scale: 1.1,
              duration: 2,
              ease: 'power2.in',
            },
            '+=2', // Give the user plenty of time to read before fading out
          );
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
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
              ref={(el) => (textRef.current[idx] = el)}
            >
              {stmt}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs; // Force HMR Cache Bust
