import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create a timeline that pins the container and scales the mask layer.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
        },
      });

      // Scale the mask up massively to reveal the white background and text
      tl.to(mediaRef.current, {
        scale: 80,
        transformOrigin: '48% 50%',
        duration: 0.85,
        ease: 'power3.in',
      });

      // Fade out the mask layer at the end
      tl.to(mediaRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'none',
      });

      // Animate text in immediately so it's visible through the mask
      tl.fromTo(
        '.hero-text-line',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        0.0,
      );

      tl.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0.2,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-safe-wrapper">
      <section className="hero-awwwards-container" ref={containerRef}>
        {/* The Media Layer (Solid White Background with Text) */}
        <div className="hero-media-layer">
          <div className="hero-content">
            <h1 className="hero-headline">
              <div className="hero-text-line">TAT | Beyond ads.</div>
            </h1>

            <h2 className="hero-subheadline">
              <div className="hero-text-line">
                We create brands to reach the position
              </div>
              <div className="hero-text-line">they wanted with one team!!</div>
            </h2>

            <Link
              to="/contact"
              className="hero-cta"
              style={{ textDecoration: 'none' }}
            >
              Let's Tell Your Story
            </Link>
          </div>
        </div>

        {/* Foreground Mask Layer (Solid Black background, Inverted GIF drawing) */}
        <div className="hero-mask-layer" ref={mediaRef}>
          <img src="/hero.gif" alt="Hero Mask" className="hero-mask-gif" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
