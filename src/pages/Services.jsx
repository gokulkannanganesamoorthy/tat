import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesPage.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: 'PERFORMANCE MARKETING',
    description: 'We hack the algorithm so your visibility skyrockets overnight. Clicks mean nothing without conversions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'DIGITAL BRANDING',
    description: 'Crafting bespoke identities that subordinate the agency ego to your brand narrative. Visual systems that command attention.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'WEB ENGINEERING',
    description: 'Smart UI. Impactful UX. Scalable growth. We build kinetic, highly-optimized environments that convert.',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '04',
    title: 'CONTENT PRODUCTION',
    description: 'Immersive 3D, cinematic video, and high-fidelity assets designed for the tactile maximalism era.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1000&auto=format&fit=crop'
  }
];

const ServicesPage = () => {
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const rightPanel = rightPanelRef.current;
    const sections = gsap.utils.toArray('.service-right-item');

    // Pin the left panel while the right panel scrolls
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: leftPanelRef.current,
      pinSpacing: false,
    });

    // Update the active index based on which right-side image is in view
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveIndex(index);
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="services-page-layout" ref={containerRef}>
      
      {/* Sticky Left Panel */}
      <div className="services-left-panel" ref={leftPanelRef}>
        <div className="services-left-content">
          <div className="services-counter">
            {servicesData[activeIndex].id} / 04
          </div>
          
          <div className="services-title-wrapper">
            {/* We map all titles but only show the active one via CSS opacity for smooth transition */}
            {servicesData.map((service, idx) => (
              <h2 
                key={`title-${idx}`} 
                className={`services-sticky-title ${idx === activeIndex ? 'active' : ''}`}
              >
                {service.title}
              </h2>
            ))}
          </div>
          
          <div className="services-desc-wrapper">
             {servicesData.map((service, idx) => (
              <p 
                key={`desc-${idx}`} 
                className={`services-sticky-desc ${idx === activeIndex ? 'active' : ''}`}
              >
                {service.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling Right Panel */}
      <div className="services-right-panel" ref={rightPanelRef}>
        <div className="services-spacer-top">SCROLL DOWN TO EXPLORE</div>
        
        {servicesData.map((service, idx) => (
          <div className="service-right-item" key={`item-${idx}`}>
            <div className="service-image-container interactive">
              <img src={service.image} alt={service.title} />
              <div className="image-noise-overlay"></div>
            </div>
          </div>
        ))}
        
        <div className="services-spacer-bottom">END OF SERVICES</div>
      </div>

    </section>
  );
};

export default ServicesPage;
