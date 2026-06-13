import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './Services.css';

const servicesList = [
  {
    id: "01",
    title: "SPATIAL DESIGN",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "CREATIVE ENG.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "VIRTUAL PROD.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "SYSTEM ARCH.",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop"
  }
];

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP quickTo for ultra-smooth cursor tracking
    const xTo = gsap.quickTo(imageRef.current, "left", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(imageRef.current, "top", { duration: 0.4, ease: "power3" });

    const moveImage = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate relative position within the container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      xTo(x);
      yTo(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", moveImage);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", moveImage);
      }
    };
  }, []);

  return (
    <section className="services-cursor-container" ref={containerRef}>
      
      <div className="services-header">
        <p className="services-meta">CAPABILITIES // INVENTORY</p>
      </div>

      <div className="services-list-wrapper">
        {servicesList.map((service) => (
          <div 
            key={service.id}
            className="service-list-row interactive"
            onMouseEnter={() => setHoveredService(service)}
            onMouseLeave={() => setHoveredService(null)}
          >
            <span className="service-id">{service.id}</span>
            <h2 className="service-massive-text">{service.title}</h2>
          </div>
        ))}
      </div>

      {/* Floating Cursor Image Reveal */}
      <div 
        className={`service-hover-image ${hoveredService ? 'active' : ''}`}
        ref={imageRef}
      >
        <div className="service-image-inner">
          {servicesList.map((service) => (
            <img 
              key={service.id}
              src={service.image} 
              alt={service.title}
              className={hoveredService?.id === service.id ? 'active-img' : ''}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Services;
