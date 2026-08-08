import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageInnerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const text = textRef.current;

      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power3.out', duration: 1.5, delay: 0.2 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page-safe-wrapper">
      <SEO
        title="About Us"
        description="Learn more about THE ADS TAG. We build beyond the grid, architecting fluid digital environments."
        url="/about"
      />
      <section className="about-premium-container" ref={containerRef}>
        {/* The Typography Layer */}
        <div className="about-premium-text-layer" ref={textRef} style={{ justifyContent: 'center' }}>
          
          <div className="about-text-right" style={{ textAlign: 'center', alignItems: 'center' }}>
            <h2 className="about-premium-title">
              <span className="serif-italic">About Us</span>
            </h2>
            <p className="about-premium-subtitle" style={{ textAlign: 'center' }}>
              The Ads Tag is a creative-first digital brand studio crafting
              meaningful brand experiences through strategy, storytelling,
              design, and performance-driven marketing.
            </p>
          </div>
        </div>

        {/* Edge Typography (Fixed to the screen edges) */}
        <div className="about-edge-text left-edge">
          [ T - A - T : STRUCTURAL ]
        </div>
        <div className="about-edge-text right-edge">[ 00:00:24:00 - REC ]</div>
      </section>
    </div>
  );
};

export default About;
