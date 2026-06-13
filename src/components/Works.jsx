import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Works.css';

const projects = [
  { id: 1, title: "LUMINA", type: "SPATIAL", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, title: "VOID", type: "VIRTUAL", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, title: "NEXUS", type: "SYSTEM", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, title: "ECHO", type: "ENGINEERING", img: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=2000&auto=format&fit=crop" }
];

const Works = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = containerRef.current;
      const slider = sliderRef.current;
      const images = imageRefs.current;

      const handleMouseMove = (e) => {
        // Only trigger if we are hovered over this section
        const { clientX } = e;
        const { innerWidth } = window;
        const xProgress = clientX / innerWidth; // 0 to 1

        // Calculate how far the slider can actually move
        const maxScroll = slider.scrollWidth - innerWidth;
        
        // Smoothly pan the entire slider wrapper based on mouse X
        gsap.to(slider, {
          x: -xProgress * maxScroll,
          ease: "power3.out",
          duration: 1.2,
          overwrite: "auto"
        });

        // Parallax the images inside their frames in the opposite direction
        images.forEach((img) => {
          gsap.to(img, {
            x: xProgress * 150, // Pushes image right as frame moves left
            ease: "power3.out",
            duration: 1.2,
            overwrite: "auto"
          });
        });
      };

      if (container) {
        container.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (container) {
          container.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="works-carousel-container" ref={containerRef}>
      
      <div className="works-carousel-header">
        <p className="works-meta-tag">03 // SELECTED WORKS</p>
      </div>

      <div className="works-carousel-slider" ref={sliderRef}>
        {projects.map((project, index) => (
          <div className="works-carousel-card" key={project.id}>
            
            <div className="works-carousel-image-wrapper">
              <img 
                src={project.img} 
                alt={project.title} 
                ref={el => imageRefs.current[index] = el}
                className="works-carousel-img"
              />
            </div>
            
            <div className="works-carousel-text">
              <h3 className="works-carousel-title">{project.title}</h3>
              <span className="works-carousel-type">{project.type}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default Works;
