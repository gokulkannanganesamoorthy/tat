import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: '01', title: 'NIKE AIR', type: 'CAMPAIGN', year: '2025', img: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?q=80&w=2000' },
  { id: '02', title: 'RED BULL', type: 'BRAND FILM', year: '2026', img: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2000' },
  { id: '03', title: 'SPOTIFY', type: 'SYSTEM', year: '2024', img: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2000' },
  { id: '04', title: 'PORSCHE', type: 'AUTOMOTIVE', year: '2026', img: 'https://images.unsplash.com/photo-1503376712341-ea402a412212?q=80&w=2000' }
];

const Works = () => {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);

  const zSpacing = 3000; // Distance between projects in Z space

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const totalDepth = (projects.length) * zSpacing;

      // Animate the entire scene forward on the Z axis
      gsap.fromTo(sceneRef.current, 
        { z: 0 },
        {
          z: totalDepth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalDepth}`, // Scroll distance equals depth
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
          }
        }
      );

      // Fade out projects as they fly past the camera
      const posters = gsap.utils.toArray('.works-3d-poster');
      posters.forEach((poster, i) => {
        // The project is at z = -i * zSpacing
        // We want it to fade out when the scene reaches z = i * zSpacing (meaning the project is at z=0, right at the camera)
        gsap.to(poster, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${(i * zSpacing) - 500} top`, // Start fading out slightly before it hits the camera
            end: () => `top+=${(i * zSpacing) + 500} top`,
            scrub: true
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="works-3d-section" ref={sectionRef} id="works">
      
      <div className="works-3d-overlay">
        <p className="works-label">04 // PRODUCTIONS</p>
      </div>

      <div className="works-3d-viewport">
        <div className="works-3d-scene" ref={sceneRef}>
          
          {projects.map((project, i) => {
            const zPos = -(i * zSpacing);
            // Alternate left and right walls of the tunnel
            const xPos = i % 2 === 0 ? '-35vw' : '35vw';
            // Angle them slightly towards the center
            const rotateY = i % 2 === 0 ? '25deg' : '-25deg';

            return (
              <div 
                className="works-3d-poster" 
                key={project.id}
                style={{
                  transform: `translate3d(calc(-50% + ${xPos}), -50%, ${zPos}px) rotateY(${rotateY})`
                }}
              >
                <div className="works-poster-wrapper">
                  <img src={project.img} alt={project.title} className="works-poster-img" />
                </div>
                <div className="works-poster-meta">
                  <span className="works-id">[{project.id}]</span>
                  <h3 className="works-title">{project.title}</h3>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Works;
