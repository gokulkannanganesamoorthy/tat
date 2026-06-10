import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', title: 'SYNTHESIS', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop' },
  { id: '02', title: 'AETHER', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' },
  { id: '03', title: 'VOID', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop' },
  { id: '04', title: 'NEXUS', image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000&auto=format&fit=crop' },
];

const Works = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Horizontal scrolling logic
    const track = trackRef.current;
    
    // Calculate how far to scroll the track. 
    // It's the total width of the track minus the viewport width.
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`, // Scroll for exactly the width of the track
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="works-scroll-container" ref={containerRef}>
      <div className="works-track" ref={trackRef}>
        
        <div className="works-intro">
          <h2 className="interactive">OUR<br/>WORK</h2>
        </div>

        {projects.map((project) => (
          <div className="work-item" key={project.id}>
            <div className="work-image-wrapper interactive">
              <img src={project.image} alt={project.title} />
              <div className="work-overlay">
                <h3>{project.title}</h3>
                <span>{project.id}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="works-outro">
          <h2 className="interactive">MORE TO COME</h2>
        </div>

      </div>
    </section>
  );
};

export default Works;
