import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "LUMINA", type: "SPATIAL", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, title: "VOID", type: "VIRTUAL", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, title: "NEXUS", type: "SYSTEM", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, title: "ECHO", type: "ENGINEERING", img: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=2000&auto=format&fit=crop" }
];

const Works = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // For each card (except the last), scale it down and darken it as the next card scrolls over it
      cardsRef.current.forEach((card, index) => {
        if (index === cardsRef.current.length - 1) return; // Skip last card

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 10%", // When it reaches the sticky position
            end: "bottom top", // As the next section pushes it up
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="works-stack-container" ref={containerRef}>
      
      <div className="works-stack-header">
        <h2 className="works-stack-title">SELECTED WORKS</h2>
        <p className="works-stack-meta">ARCHIVE // 2026</p>
      </div>

      <div className="works-stack-wrapper">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="works-sticky-card" 
            ref={el => cardsRef.current[index] = el}
            style={{ zIndex: index, top: `calc(10vh + ${index * 20}px)` }} // Slight cascading offset
          >
            <div className="works-card-inner">
              <img src={project.img} alt={project.title} className="works-card-img" />
              <div className="works-card-overlay">
                <h3 className="works-card-project-title">{project.title}</h3>
                <span className="works-card-project-type">{project.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Works;
