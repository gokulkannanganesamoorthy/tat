import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Services.css';

// We duplicate some images to create a large enough pool for a continuous trail
const trailImages = [
  "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
];

const Services = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let lastX = 0;
      let lastY = 0;
      let currentIndex = 0;
      let zIndex = 10;

      const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Spawn a new image if the cursor has moved enough distance
        if (dist > 80) {
          lastX = x;
          lastY = y;

          const img = imageRefs.current[currentIndex];

          // Instantly pop the image under the cursor
          gsap.killTweensOf(img); // Stop any currently running fade-outs for this specific image
          gsap.set(img, {
            x: x,
            y: y,
            xPercent: -50,
            yPercent: -50,
            zIndex: zIndex++,
            opacity: 1,
            scale: 1,
            rotation: Math.random() * 30 - 15 // Slight chaotic rotation for an artistic feel
          });

          // Fluidly animate it away
          gsap.to(img, {
            opacity: 0,
            scale: 0.3,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.1
          });

          // Loop through the image pool
          currentIndex = (currentIndex + 1) % imageRefs.current.length;
        }
      };

      containerRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="services-trail-container" ref={containerRef}>
      
      {/* Scattered background typography that the images will paint over */}
      <div className="services-scattered-text">
        <h2 className="scatter-1">SPATIAL</h2>
        <h2 className="scatter-2">VIRTUAL</h2>
        <h2 className="scatter-3">SYSTEMS</h2>
        <h2 className="scatter-4">CREATIVE</h2>
        <h2 className="scatter-5">ENGINEERING</h2>
      </div>

      <div className="services-trail-overlay">
        <h2>PAINT THE CAPABILITIES</h2>
      </div>

      {/* The invisible pool of images waiting to be painted */}
      <div className="services-image-pool">
        {trailImages.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt="Trail Element" 
            className="trail-image-element"
            ref={el => imageRefs.current[index] = el}
          />
        ))}
      </div>

    </section>
  );
};

export default Services;
