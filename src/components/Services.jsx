import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { id: "01", title: "SPATIAL", desc: "Crafting immersive physical environments. We design architectural spaces that subliminally guide behavior.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" },
  { id: "02", title: "CREATIVE", desc: "Engineering the impossible. Disrupting conventional visual paradigms with high-end narrative design.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
  { id: "03", title: "VIRTUAL", desc: "High-fidelity unreal production. Metaverse architecture and fully immersive VR cognitive spaces.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000&auto=format&fit=crop" },
  { id: "04", title: "SYSTEMS", desc: "Architecting the invisible foundation. Deep infrastructure, structural data ecosystems, and code.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" }
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
