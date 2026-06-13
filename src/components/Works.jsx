import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    title: "Project Alpha",
    category: "SPATIAL DESIGN",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    speed: 1.2
  },
  {
    id: 2,
    title: "Neon Echoes",
    category: "CREATIVE ENGINEERING",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    speed: 0.8
  },
  {
    id: 3,
    title: "Brutalist Base",
    category: "ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop",
    speed: 1.5
  },
  {
    id: 4,
    title: "Void Construct",
    category: "VIRTUAL PRODUCTION",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    speed: 0.9
  }
];

const Works = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Parallax effect for each item
    itemsRef.current.forEach((item, index) => {
      const speed = works[index].speed;
      
      gsap.to(item, {
        y: () => -100 * speed + "px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="works-canvas-container" ref={containerRef}>
      
      <div className="works-canvas-header">
        <h2 className="works-massive-title">SELECTED<br/>ARCHIVE</h2>
      </div>

      <div className="works-scatter-grid">
        {works.map((work, index) => (
          <div 
            key={work.id} 
            className={`work-scatter-item item-${index + 1} interactive`}
            ref={el => itemsRef.current[index] = el}
          >
            <div className="work-image-wrapper">
              <img src={work.image} alt={work.title} />
              <div className="work-image-overlay">
                <span className="overlay-text">VIEW CASE</span>
              </div>
            </div>
            <div className="work-scatter-meta">
              <h3>{work.title}</h3>
              <p>[ {work.category} ]</p>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default Works;
