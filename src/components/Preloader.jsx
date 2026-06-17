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

    // 4. Open the Camera Aperture — each blade flies in its OWN radial direction
    // 6 blades at 60° apart. Calculate outward direction vector for each.
    // The blades are anchored at center (50%, 50%) and each covers a 60° wedge.
    // We push each blade along the midpoint angle of its wedge.
    const bladeCount = 6;
    const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;

    bladesRef.current.forEach((blade, i) => {
      // Mid angle of this blade's wedge in radians
      const angleDeg = i * 60 + 30; // +30 to point to the center of the wedge
      const angleRad = (angleDeg * Math.PI) / 180;
      const dx = Math.sin(angleRad) * distance;
      const dy = -Math.cos(angleRad) * distance;

      tl.to(blade, {
        x: dx,
        y: dy,
        rotation: (i % 2 === 0 ? 1 : -1) * 30, // alternating rotate for iris feel
        duration: 1.4,
        ease: "expo.inOut",
      }, "bounce+=0.05"); // all start together
    });

    // 5. Hide container
    tl.set(containerRef.current, { display: "none" });

  }, []);

  return (
    <div className="preloader-combined-container" ref={containerRef}>
      
      {/* The 6 Mechanical Blades (Background Layer) */}
      <div className="preloader-blades-wrapper">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="preloader-blade"
            ref={el => bladesRef.current[i] = el}
            style={{ transform: `rotate(${i * 60}deg)` }}
          >
            <div className="blade-inner"></div>
          </div>
        ))}
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
