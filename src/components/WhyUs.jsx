import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyUs.css';

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const gearRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      // The horizontal scroll for just this section
      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true
        }
      });

      // Rotate the background gear synced with the horizontal scroll
      gsap.to(gearRef.current, {
        rotation: 180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1
        }
      });

      // Manual word split for the text reveal
      const textEl = textRef.current;
      if (textEl) {
        const text = textEl.innerText;
        textEl.innerHTML = text
          .split(' ')
          .map((w) => `<span class="whyus-word-mask"><span class="whyus-word">${w}</span></span>`)
          .join(' ');
        
        // Reveal text only AFTER the section is pinned and you start scrolling horizontally
        gsap.fromTo(
          textEl.querySelectorAll('.whyus-word'),
          { yPercent: 110 },
          {
            yPercent: 0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textEl,
              containerAnimation: scrollTween, // Triggered by the horizontal scroll timeline
              start: "left 80%", // Only when the text enters the 80% mark horizontally
              end: "left 40%",
              scrub: 1
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="whyus-clockwork-section" ref={sectionRef}>
      
      {/* Massive rotating clock gear in the background */}
      <div className="whyus-bg-gear" ref={gearRef}>
        <svg viewBox="0 0 100 100" className="whyus-gear-svg">
          {/* Outer ring */}
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(247, 244, 237, 0.05)" strokeWidth="0.5" />
          {/* Inner ring */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(247, 244, 237, 0.05)" strokeWidth="0.2" strokeDasharray="2 2" />
          {/* 12 thick teeth */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line 
              key={i} 
              x1="50" y1="2" 
              x2="50" y2="10" 
              stroke="rgba(247, 244, 237, 0.08)" 
              strokeWidth="1.5" 
              transform={`rotate(${i * 30} 50 50)`} 
            />
          ))}
          {/* Center hub */}
          <circle cx="50" cy="50" r="5" fill="none" stroke="rgba(247, 244, 237, 0.08)" strokeWidth="1" />
        </svg>
      </div>

      <div className="whyus-track-container" ref={trackRef}>
        
        {/* Intro Space (allows user to scroll before text hits) */}
        <div className="whyus-panel whyus-intro-panel">
          <p className="whyus-label">02 // PHILOSOPHY</p>
          <div className="whyus-scroll-indicator">
            SCROLL TO REVEAL 
            <span className="whyus-arrow">→</span>
          </div>
        </div>

        {/* Text Reveal Panel */}
        <div className="whyus-panel whyus-text-panel">
          <h2 className="whyus-massive-text" ref={textRef}>
            WE ENGINEER SYSTEMS OF GROWTH AND SCALE
          </h2>
        </div>

        {/* Content Panel */}
        <div className="whyus-panel whyus-content-panel">
          <div className="whyus-columns">
            <div className="whyus-col">
              <p>Where other agencies build ads, we build belief. Every campaign, every frame, every pixel is subordinated to a singular strategic ambition: your growth.</p>
            </div>
            <div className="whyus-col">
              <p>We discard templated paradigms to construct fluid digital environments, architecting a narrative that is uniquely, unapologetically yours.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
