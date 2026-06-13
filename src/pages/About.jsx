import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const textWrapperRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrapper = imageWrapperRef.current;
    const texts = gsap.utils.toArray('.manifesto-text-reveal');

    // Create the pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%", // Pin for 3 viewport heights
        pin: true,
        scrub: 1,
      }
    });

    // 1. Scale down the massive image to act like a floating center card
    tl.to(imageWrapper, {
      scale: 0.4,
      borderRadius: "24px",
      duration: 2,
      ease: "power2.inOut"
    }, 0);

    // 2. Fade and float the manifesto text in from behind the image as it shrinks
    tl.fromTo(texts, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" },
      0.5 // Start revealing text halfway through the image scale
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="about-mask-section" ref={sectionRef}>
      
      {/* Background Text Layer */}
      <div className="about-text-layer" ref={textWrapperRef}>
        <h1 className="manifesto-text-reveal top-text">WE CRAFT</h1>
        <div className="manifesto-center-gap"></div>
        <h1 className="manifesto-text-reveal bottom-text">THE UNSEEN</h1>
        
        <p className="manifesto-text-reveal sub-text">
          TAT Studio is a spatial design and creative engineering agency. <br/>
          We build digital experiences that drive unapologetic growth for visionary brands.
        </p>
      </div>

      {/* Foreground Image Mask Layer */}
      <div className="about-image-layer interactive" ref={imageWrapperRef}>
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
          alt="TAT Studio Creative" 
        />
        <div className="mask-overlay-noise"></div>
      </div>

    </section>
  );
};

export default About;
