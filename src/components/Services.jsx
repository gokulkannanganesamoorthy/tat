import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { id: "01", title: "SPATIAL", desc: "Crafting immersive physical environments. We design architectural spaces that subliminally guide behavior.", img: "https://picsum.photos/seed/spatial/2000/1200" },
  { id: "02", title: "CREATIVE", desc: "Engineering the impossible. Disrupting conventional visual paradigms with high-end narrative design.", img: "https://picsum.photos/seed/creative/2000/1200" },
  { id: "03", title: "VIRTUAL", desc: "High-fidelity unreal production. Metaverse architecture and fully immersive VR cognitive spaces.", img: "https://picsum.photos/seed/virtual/2000/1200" },
  { id: "04", title: "SYSTEMS", desc: "Architecting the invisible foundation. Deep infrastructure, structural data ecosystems, and code.", img: "https://picsum.photos/seed/systems/2000/1200" }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.services-stack-card');
      
      cards.forEach((card, i) => {
        // As the next card scrolls UP and overlaps this card, this card scales down and dims!
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="services-page-safe-wrapper" ref={containerRef}>
      
      <div className="services-stack-header">
        <p className="services-awwwards-meta">02 // CAPABILITIES</p>
        <h2 className="services-stack-title">WE ENGINEER <br/><span className="serif-italic">experiences</span></h2>
      </div>

      <div className="services-stack-container">
        {servicesList.map((service, index) => (
          <div 
            key={service.id} 
            className="services-stack-card"
            style={{ 
              top: `calc(15vh + ${index * 40}px)`, // Each card sticks slightly lower than the one before it
              zIndex: index 
            }}
          >
            {/* Card Background Image */}
            <div className="services-card-img-wrapper">
              <img src={service.img} alt={service.title} className="services-card-img" />
              <div className="services-card-overlay"></div>
            </div>

            {/* Card Content */}
            <div className="services-card-content">
              <div className="services-card-top">
                <span className="services-card-id">{service.id}</span>
                <button className="services-card-btn">EXPLORE &rarr;</button>
              </div>
              <div className="services-card-bottom">
                <h3 className="services-card-title">{service.title}</h3>
                <p className="services-card-desc">{service.desc}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
      
      {/* Buffer space to allow scrolling past the last card */}
      <div className="services-stack-buffer"></div>
    </div>
  );
};

export default Services;
