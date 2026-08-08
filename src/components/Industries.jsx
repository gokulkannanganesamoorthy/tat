import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Industries.css';

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.ind-fade', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="industries-section" ref={containerRef}>
      <div className="ind-container">
        <h2 className="ind-heading ind-fade">
          WE HAVE WORKED WITH RENOWNED BRANDS WHICH ARE SMALL TO BIG PLAYERS IN THE INDUSTRY
        </h2>
        <p className="ind-subheading ind-fade">
          Industries we covered and experienced are:
        </p>
        
        <div className="ind-list">
          <div className="ind-item ind-fade">
            <span className="ind-num">01</span>
            <span className="ind-text">Fashion Clothing + Jewellery</span>
          </div>
          <div className="ind-item ind-fade">
            <span className="ind-num">02</span>
            <span className="ind-text">Skin Care</span>
          </div>
          <div className="ind-item ind-fade">
            <span className="ind-num">03</span>
            <span className="ind-text">FMCG</span>
          </div>
          <div className="ind-item ind-fade">
            <span className="ind-num">04</span>
            <span className="ind-text">Real Estates</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
