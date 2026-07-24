import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { id: '01', title: 'Truth.', desc: 'We begin by understanding your story.' },
  { id: '02', title: 'Strategy.', desc: 'We shape ideas into meaningful creative directions.' },
  { id: '03', title: 'Creation.', desc: 'We produce work that feels human.' },
  { id: '04', title: 'Connection.', desc: "We help brands become part of people's lives." }
];

const Process = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.process-step');
      
      steps.forEach((step, i) => {
        gsap.fromTo(step, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="process-container">
        <div className="process-label-top">04 // OUR PROCESS</div>
        
        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <div className="process-step" key={step.id}>
              <div className="process-step-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="process-arrow">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
