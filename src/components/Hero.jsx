import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Fade and slide up text
      gsap.fromTo(
        '.hero-headline, .hero-subheadline',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-safe-wrapper">
      <section 
        className="hero-awwwards-container interactive" 
        ref={containerRef}
        data-cursor="PLAY REEL"
      >
        {/* Background Cinematic Video */}
        <video 
          className="hero-video-bg"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop"
        >
          {/* Replace this with the actual reel URL from TAT later */}
          <source src="https://cdn.pixabay.com/video/2019/04/24/23011-332483103_large.mp4" type="video/mp4" />
        </video>

        {/* Foreground Typography */}
        <div className="hero-content">
          <h1 className="hero-headline">
            TAT | BEYOND ADS.
          </h1>

          <h2 className="hero-subheadline">
            We create brands to reach the position they wanted with one team.
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Hero;
