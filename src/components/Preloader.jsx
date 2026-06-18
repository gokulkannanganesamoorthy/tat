import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

const ring1Letters = ['X', 'J', 'M', 'Q', 'V', 'R', 'K', 'O', 'P', 'T'];
const ring2Letters = ['Z', 'B', 'W', 'L', 'F', 'Y', 'U', 'N', 'C', 'A'];
const ring3Letters = ['D', 'S', 'G', 'E', 'H', 'I', 'X', 'M', 'B', 'T'];

const Preloader = () => {
  const containerRef = useRef(null);
  const lockRef = useRef(null);
  const bladesRef = useRef([]);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Spin the lock rings
    tl.to(ring1Ref.current, { yPercent: -90, duration: 1.8, ease: "power4.inOut" }, 0);
    tl.to(ring2Ref.current, { yPercent: -90, duration: 2.0, ease: "power4.inOut" }, 0.1);
    tl.to(ring3Ref.current, { yPercent: -90, duration: 2.2, ease: "power4.inOut" }, 0.2);

    // Add a label for the "bounce back" moment
    tl.add("bounce", "+=0.1");

    // 2. Pulse the lock (bouncing back)
    tl.to(lockRef.current, { scale: 1.2, borderColor: "rgba(247, 244, 237, 1)", duration: 0.4, ease: "back.out(2)" }, "bounce");
    
    // 3. Fade out the lock quickly as it bounces
    tl.to(lockRef.current, { opacity: 0, duration: 0.4, ease: "power2.in" }, "bounce+=0.2");

    // 4. Open the Camera Aperture — each blade flies radially outward
    // By translating 'y' positively, the blade's edge pulls away from the center, opening the iris!
    tl.to(bladesRef.current, {
      y: "150vh", // Fly out radially by pulling back
      rotation: 30, // Pivot like a real iris shutter pin!
      duration: 1.4,
      ease: "expo.inOut",
    }, "bounce+=0.05");

    // 5. Hide container
    tl.set(containerRef.current, { display: "none" });

  }, []);

  return (
    <div className="preloader-combined-container" ref={containerRef}>
      
      {/* The 6 Mechanical Blades + 1 Interlocking Ray (Background Layer) */}
      <div className="preloader-blades-wrapper">
        {Array.from({ length: 7 }).map((_, i) => {
          const isInterlock = i === 6;
          const rotation = isInterlock ? 0 : i * 60;
          return (
            <div 
              key={`rotator-${i}`}
              className="blade-rotator"
              style={{ 
                position: 'absolute', top: 0, left: 0, width: 0, height: 0, 
                transform: `rotate(${rotation}deg)` 
              }}
            >
              <div 
                className="preloader-blade"
                style={{ 
                  transform: 'none',
                  // The 7th blade ONLY provides the missing top-right line!
                  // It shouldn't have a massive body that covers other blades.
                  height: isInterlock ? '16vh' : '150vh'
                }} 
              >
                <div 
                  className="blade-inner"
                  ref={el => bladesRef.current[i] = el}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Lock Mechanism (Foreground Layer) */}
      <div className="vault-lock-mechanism" ref={lockRef}>
        <div className="vault-ring-window">
          <div className="vault-ring" ref={ring1Ref}>
            {ring1Letters.map((l, i) => <div key={i} className="vault-letter">{l}</div>)}
          </div>
        </div>
        <div className="vault-ring-window">
          <div className="vault-ring" ref={ring2Ref}>
            {ring2Letters.map((l, i) => <div key={i} className="vault-letter">{l}</div>)}
          </div>
        </div>
        <div className="vault-ring-window">
          <div className="vault-ring" ref={ring3Ref}>
            {ring3Letters.map((l, i) => <div key={i} className="vault-letter">{l}</div>)}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Preloader;
