import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
    className: 'card-left-top floating-card',
    speed: 0.2,
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop',
    className: 'card-left-bottom floating-card',
    speed: 0.4,
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
    className: 'card-center-top floating-card',
    speed: 0.1,
  },
  {
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    className: 'card-right-top floating-card',
    speed: 0.3,
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
    className: 'card-right-bottom floating-card',
    speed: 0.5,
  }
];

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Mouse move parallax interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5);
      const yPercent = (clientY / window.innerHeight - 0.5);

      const cards = heroRef.current.querySelectorAll('.floating-card');
      cards.forEach((card, index) => {
        const factor = (index + 1) * 15;
        gsap.to(card, {
          x: xPercent * factor,
          y: yPercent * factor,
          rotate: xPercent * (index + 1) * 3,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // ScrollTrigger-driven animations
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Split title animation
      timeline.to('.hero-line.top-title', { xPercent: -35, opacity: 0.1, ease: 'none' }, 0);
      timeline.to('.hero-line.bottom-title', { xPercent: 35, opacity: 0.1, ease: 'none' }, 0);

      // Distort and slide images away on scroll
      timeline.to('.card-left-top', { xPercent: -120, yPercent: -50, rotate: -25, scale: 0.7, opacity: 0, ease: 'none' }, 0);
      timeline.to('.card-left-bottom', { xPercent: -150, yPercent: 50, rotate: -40, scale: 0.6, opacity: 0, ease: 'none' }, 0);
      timeline.to('.card-center-top', { yPercent: -150, scale: 0.5, opacity: 0, ease: 'none' }, 0);
      timeline.to('.card-right-top', { xPercent: 120, yPercent: -50, rotate: 25, scale: 0.7, opacity: 0, ease: 'none' }, 0);
      timeline.to('.card-right-bottom', { xPercent: 150, yPercent: 50, rotate: 40, scale: 0.6, opacity: 0, ease: 'none' }, 0);
    }, heroRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section className="creative-hero" ref={heroRef}>
      {/* Dynamic Grid of Floating Media Cards */}
      <div className="hero-grid-container">
        {/* Micro Elements: Crosshairs */}
        <div className="crosshair ch-top-left">+</div>
        <div className="crosshair ch-top-right">+</div>
        <div className="crosshair ch-bottom-left">+</div>
        <div className="crosshair ch-bottom-right">+</div>

        {heroImages.map((img, idx) => (
          <div key={idx} className={`image-card-wrapper ${img.className}`}>
            <div className="image-card-inner interactive">
              <img src={img.url} alt={`Creative design ${idx}`} />
              <div className="card-ambient-shadow" />
            </div>
          </div>
        ))}
      </div>

      {/* Extreme Kinetic Typography Layer */}
      <div className="hero-typography-container">
        <h1 className="hero-main-title">
          <span className="hero-line top-title">TAT STUDIO</span>
          <span className="hero-line bottom-title">CREATIVE AGENCY</span>
        </h1>
      </div>

      {/* Decorative Brand Details */}
      <div className="hero-bottom-meta">
        <div className="meta-right">
          <span>SCROLL DOWN TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
