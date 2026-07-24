import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import './Services.css';

gsap.registerPlugin(ScrollTrigger, Draggable);

const servicesData = [
  {
    id: '01',
    title: 'BRAND STORIES',
    desc: 'Discovering your voice before the world hears it.',
    sub: [],
  },
  {
    id: '02',
    title: 'CONTENT STUDIO',
    desc: 'Creating films, photography and content people genuinely enjoy.',
    sub: [],
  },
  {
    id: '03',
    title: 'CREATIVE DESIGN',
    desc: 'Designing identities that feel timeless.',
    sub: [],
  },
  {
    id: '04',
    title: 'BRAND INFLUENCE',
    desc: 'Building conversations through creators, communities and media.',
    sub: [],
  },
  {
    id: '05',
    title: 'DIGITAL PRESENCE',
    desc: 'Crafting beautiful digital homes for modern brands.',
    sub: [],
  },
  {
    id: '06',
    title: 'CREATIVE TECHNOLOGY',
    desc: 'Connecting creativity with intelligent experiences.',
    sub: [],
  },
  {
    id: '07',
    title: 'EXPERIENCES',
    desc: 'Turning moments into memories.',
    sub: [],
  },
];

const Services = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const dialRef = useRef(null);
  const contentRef = useRef(null);
  const gearRef = useRef(null);
  const knobRef = useRef(null);

  const total = servicesData.length;
  const angleIncrement = 360 / total;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the section and rotate the dial based on scroll progress
      // Total rotation needed to see all 6 items is -300 degrees (5 steps of 60)
      const totalRotation = -(total - 1) * angleIncrement;

      gsap.to(dialRef.current, {
        rotation: totalRotation,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=6000', // Increased to 6000px so it has plenty of time to go through all 7 items
          scrub: 0.2, // Reduced scrub delay to prevent the animation lagging behind the scroll and unpinning early

          onUpdate: (self) => {
            const progress = self.progress;

            // Animate gear rotation
            if (gearRef.current) {
              gsap.set(gearRef.current, { rotation: progress * 360 });
            }

            // Animate knob position (down the track)
            if (knobRef.current) {
              // The track is 250px tall. Knob is 40px tall. Max travel is 210px.
              gsap.set(knobRef.current, { y: progress * 210 });
            }

            const currentIndex = Math.round(progress * (total - 1));

            setActive((prev) => {
              if (prev !== currentIndex) {
                return currentIndex;
              }
              return prev;
            });
          },
        },
      });

      // Make the knob Draggable to reverse-control the scroll position!
      Draggable.create(knobRef.current, {
        type: 'y',
        bounds: '.svc-lever-track',
        onDrag: function () {
          const progress = this.y / 210;
          // Find the ScrollTrigger instance attached to this section
          const st = ScrollTrigger.getAll().find(
            (t) => t.trigger === sectionRef.current,
          );
          if (st) {
            const scrollPos =
              st.start +
              (st.end - st.start) * Math.max(0, Math.min(1, progress));
            window.scrollTo(0, scrollPos);
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [angleIncrement, total]);

  // We can remove the click handler since it's driven purely by scroll now,
  // which provides the most bulletproof and cinematic UX.

  // Fade content when active changes
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      );
    }
  }, [active]);

  const activeService = servicesData[active];

  return (
    <section className="svc-clock-section" ref={sectionRef}>
      {/* Background wireframe hints */}
      <div className="svc-bg-lines">
        <div className="svc-line-v"></div>
        <div className="svc-line-h"></div>
      </div>

      <div className="svc-label-top">03 // WHAT WE CREATE</div>

      <div className="svc-clock-container">
        {/* The Rotating Dial */}
        <div className="svc-dial" ref={dialRef}>
          {servicesData.map((svc, i) => {
            const rotation = i * angleIncrement;
            return (
              <div
                key={svc.id}
                className="svc-dial-item"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div
                  className={`svc-item-inner ${active === i ? 'is-active' : ''}`}
                >
                  <span className="svc-dot"></span>
                  <span className="svc-item-title">{svc.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Content (Displays active service) */}
        <div className="svc-center-content" ref={contentRef}>
          <p className="svc-center-id">[{activeService.id}]</p>
          <h3 className="svc-center-title">{activeService.title}</h3>
          <p className="svc-center-desc">{activeService.desc}</p>
          <div className="svc-center-tags">
            {activeService.sub.map((tag, idx) => (
              <span key={idx}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* The Lottery Machine Lever (Scroll Indicator) */}
      <div className="svc-lever-container">
        <div className="svc-lever-gear" ref={gearRef}>
          <svg viewBox="0 0 100 100" className="svc-gear-svg">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(247, 244, 237, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="0"
                x2="50"
                y2="10"
                stroke="rgba(247, 244, 237, 0.6)"
                strokeWidth="4"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="10" fill="rgba(247, 244, 237, 0.6)" />
          </svg>
        </div>
        <div className="svc-lever-track">
          <div
            className="svc-lever-knob"
            ref={knobRef}
            style={{ cursor: 'grab' }}
          >
            <div className="svc-knob-handle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
