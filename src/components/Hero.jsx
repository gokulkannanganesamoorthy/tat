import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Gentle parallax scroll effect for the central image
      gsap.to(imageWrapperRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Subtle image scale on scroll
      gsap.to(imageRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade out title on scroll
      gsap.to(titleRef.current, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-void-container" ref={containerRef}>
      
      <div className="hero-void-text-wrapper" ref={titleRef}>
        <h1 className="hero-massive-void-title">
          <span>CURATING</span><br />
          <span className="indent-text">SPATIAL</span><br />
          <span>REALITIES</span>
        </h1>
      </div>

      <div className="hero-elegant-image-wrapper" ref={imageWrapperRef}>
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
          alt="Curated Space" 
          ref={imageRef}
        />
      </div>

    </section>
  );
};

export default Hero;
