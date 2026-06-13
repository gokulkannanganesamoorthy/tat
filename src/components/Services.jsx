import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Services.css';

const servicesList = [
  { id: "01", title: "SPATIAL DESIGN", img: "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=2000&auto=format&fit=crop" },
  { id: "02", title: "CREATIVE ENGINEERING", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
  { id: "03", title: "VIRTUAL PRODUCTION", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
  { id: "04", title: "SYSTEM ARCHITECTURE", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" }
];

const ServiceRow = ({ service, isActive, onClick }) => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Expand
      gsap.to(contentRef.current, {
        height: '40vh',
        duration: 0.8,
        ease: "power4.inOut"
      });
      // Subtle parallax effect on the image inside
      gsap.fromTo(imageRef.current, 
        { scale: 1.2, yPercent: 10 },
        { scale: 1, yPercent: 0, duration: 0.8, ease: "power4.inOut" }
      );
    } else {
      // Collapse
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.8,
        ease: "power4.inOut"
      });
    }
  }, [isActive]);

  return (
    <div className={`service-accordion-row ${isActive ? 'active' : ''}`} onClick={onClick}>
      
      <div className="service-accordion-header interactive">
        <span className="service-accordion-id">{service.id}</span>
        <h2 className="service-accordion-title">{service.title}</h2>
      </div>
      
      <div className="service-accordion-content" ref={contentRef}>
        <div className="service-accordion-image-wrapper">
          <img src={service.img} alt={service.title} ref={imageRef} />
        </div>
      </div>
      
    </div>
  );
};

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0); // First one open by default

  return (
    <section className="services-accordion-container">
      
      <div className="services-accordion-meta-header">
        <p className="services-accordion-meta">CAPABILITIES // INVENTORY</p>
      </div>

      <div className="services-accordion-list">
        {servicesList.map((service, index) => (
          <ServiceRow 
            key={service.id} 
            service={service} 
            isActive={activeIndex === index} 
            onClick={() => setActiveIndex(activeIndex === index ? -1 : index)} 
          />
        ))}
      </div>

    </section>
  );
};

export default Services;
