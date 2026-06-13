import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textGroupRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const textGroup = textGroupRef.current;

    // Get the total height of the text block to calculate the scroll distance
    const getScrollAmount = () => -(textGroup.scrollHeight - window.innerHeight + 200);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    tl.to(textGroup, {
      y: getScrollAmount,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="about-pinned-section" ref={containerRef}>
      <div className="about-label">THE MANIFESTO</div>
      <div className="about-text-group" ref={textGroupRef}>
        <p className="about-manifesto-line">WE ARE A SPATIAL DESIGN</p>
        <p className="about-manifesto-line right">AND CREATIVE ENGINEERING AGENCY</p>
        <p className="about-manifesto-line">BUILT FOR THE UNSEEN.</p>
        
        <div className="about-spacer"></div>
        
        <p className="about-manifesto-line right">WE CRAFT DIGITAL</p>
        <p className="about-manifesto-line">AND PHYSICAL EXPERIENCES</p>
        <p className="about-manifesto-line right">THAT CHALLENGE</p>
        <p className="about-manifesto-line">THE STATUS QUO.</p>
        
        <div className="about-spacer"></div>

        <p className="about-manifesto-line right">UTILIZING RELENTLESS CREATIVITY</p>
        <p className="about-manifesto-line">AND TECHNICAL MASTERY</p>
        <p className="about-manifesto-line right">TO DRIVE UNAPOLOGETIC GROWTH</p>
        <p className="about-manifesto-line">FOR VISIONARY BRANDS.</p>
        
        <div className="about-spacer"></div>
        <div className="about-spacer"></div>
      </div>
    </section>
  );
};

export default About;
