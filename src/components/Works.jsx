import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', title: 'LUMINA', type: 'SPATIAL', year: '2026', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200' },
  { id: '02', title: 'VOID', type: 'VIRTUAL', year: '2025', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200' },
  { id: '03', title: 'NEXUS', type: 'SYSTEM', year: '2026', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200' },
  { id: '04', title: 'ECHO', type: 'ENGINEERING', year: '2024', img: 'https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=1200' }
];

const Works = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const cards = gsap.utils.toArray('.works-ticking-card');
      
      cards.forEach((card, i) => {
        const info = card.querySelector('.works-tick-info');
        const img = card.querySelector('.works-tick-img');
        const tickLine = card.querySelector('.works-tick-line');

        // The "Tick" animation — sharp, elastic, mechanical
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            once: true
          }
        });

        // The tick line snaps across
        tl.fromTo(tickLine, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 0.4, ease: "power4.out" }
        );

        // The info snaps down
        tl.fromTo(info,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.2"
        );

        // Image fades and scales in
        tl.fromTo(img,
          { scale: 1.1, opacity: 0, filter: 'grayscale(100%)' },
          { scale: 1, opacity: 1, filter: 'grayscale(0%)', duration: 1, ease: "power3.out" },
          "-=0.4"
        );

        // Deep vertical parallax on image inner
        gsap.to(img.querySelector('img'), {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="works-timeline-section" ref={sectionRef}>
      
      {/* Central Axis Line */}
      <div className="works-axis-line"></div>

      <div className="works-timeline-header">
        <span className="works-label-top">04 // ARCHIVE</span>
      </div>

      <div className="works-ticking-grid">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0;
          return (
            <article 
              key={project.id} 
              className={`works-ticking-card ${isLeft ? 'card-left' : 'card-right'}`}
            >
              
              <div className="works-tick-connector">
                <div className="works-tick-dot"></div>
                <div className="works-tick-line"></div>
              </div>

              <div className="works-tick-content">
                <div className="works-tick-info">
                  <div className="works-project-meta">
                    <span>[{project.id}]</span>
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="works-project-title">{project.title}</h3>
                </div>

                <div className="works-tick-img">
                  <img src={project.img} alt={project.title} />
                </div>
              </div>

            </article>
          );
        })}
      </div>

    </section>
  );
};

export default Works;
