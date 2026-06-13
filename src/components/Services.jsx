import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { id: "01", title: "SPATIAL DESIGN", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=2000&auto=format&fit=crop", desc: "Crafting immersive physical and digital spaces." },
  { id: "02", title: "CREATIVE ENGINEERING", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop", desc: "Pushing the boundaries of what is technically possible." },
  { id: "03", title: "VIRTUAL PRODUCTION", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop", desc: "Unreal Engine and high-fidelity rendering." },
  { id: "04", title: "SYSTEM ARCHITECTURE", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop", desc: "Building the invisible foundation of the future." }
];

const Services = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray('.services-horizontal-item');
      
      // The core Horizontal Scroll interaction
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1), // Move left by 100% per section
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          end: () => "+=" + scrollRef.current.offsetWidth // Pin duration based on width
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-horizontal-container" ref={containerRef}>
      
      <div className="services-horizontal-scroll" ref={scrollRef}>
        
        {/* Intro Slide */}
        <div className="services-horizontal-item title-slide">
          <div className="title-slide-content">
            <p className="services-meta-tag">02 // CAPABILITIES</p>
            <h2 className="services-title">
              WHAT <br />
              <span className="serif-italic">we do</span>
            </h2>
          </div>
        </div>

        {/* Capability Slides */}
        {servicesList.map((service) => (
          <div className="services-horizontal-item capability-slide" key={service.id}>
            <div className="capability-card">
              <div className="capability-image-wrapper">
                <img src={service.img} alt={service.title} />
              </div>
              <div className="capability-text-content">
                <div className="capability-header">
                  <span className="capability-id">{service.id}</span>
                  <h3 className="capability-title">{service.title}</h3>
                </div>
                <p className="capability-desc">{service.desc}</p>
              </div>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Services;
