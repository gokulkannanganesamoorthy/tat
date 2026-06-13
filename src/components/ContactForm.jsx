import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactForm.css';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    project: '',
    description: '',
    email: ''
  });
  const [status, setStatus] = useState('idle');
  const containerRef = useRef(null);

  const [sessionTime, setSessionTime] = useState("00:00:00:000");

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animation for the form
      gsap.fromTo(".contact-sentence-wrapper",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    // Live REC Tracker
    const startTime = Date.now();
    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      const ms = (elapsed % 1000).toString().padStart(3, '0');
      const seconds = Math.floor((elapsed / 1000) % 60).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed / (1000 * 60)) % 60).toString().padStart(2, '0');
      setSessionTime(`00:${minutes}:${seconds}:${ms}`);
      requestAnimationFrame(updateTimer);
    };
    const animFrame = requestAnimationFrame(updateTimer);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', company: '', project: '', description: '', email: '' });
    }, 1500);
  };

  return (
    <section className="contact-terminal-container" ref={containerRef}>
      
      <div className="contact-meta-header">
        <span>04 // GET IN TOUCH</span>
      </div>

      {status === 'success' ? (
        <div className="contact-success-message interactive">
          <h2>MESSAGE RECEIVED.</h2>
          <p>WE WILL REVIEW YOUR REQUEST AND GET BACK TO YOU SHORTLY.</p>
          <button className="reset-btn interactive" onClick={() => setStatus('idle')}>
            SEND ANOTHER MESSAGE
          </button>
        </div>
      ) : (
        <form className="contact-sentence-form interactive" onSubmit={handleSubmit}>
          
          {/* Structural Targeting Grid */}
          <div className="contact-targeting-bracket top-left"></div>
          <div className="contact-targeting-bracket top-right"></div>
          <div className="contact-targeting-bracket bottom-left"></div>
          <div className="contact-targeting-bracket bottom-right"></div>
          
          {/* High-speed REC Indicator */}
          <div className="contact-rec-indicator">
            <span className="rec-dot"></span> REC: {sessionTime}
          </div>

          <div className="contact-sentence-wrapper">
            <span>HI, I AM </span>
            <input 
              type="text" 
              name="name" 
              placeholder="[YOUR NAME]" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="blank-input"
            />
            <span> FROM </span>
            <input 
              type="text" 
              name="company" 
              placeholder="[COMPANY]" 
              value={formData.company} 
              onChange={handleChange} 
              required 
              className="blank-input"
            />
            <span>. I WANT TO BUILD </span>
            <input 
              type="text" 
              name="project" 
              placeholder="[A PROJECT]" 
              value={formData.project} 
              onChange={handleChange} 
              required 
              className="blank-input long-input"
            />
            <span>. BRIEFLY DESCRIBED AS </span>
            <input 
              type="text" 
              name="description" 
              placeholder="[DESCRIPTION]" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="blank-input long-input"
            />
            <span>. YOU CAN REACH ME AT </span>
            <input 
              type="email" 
              name="email" 
              placeholder="[EMAIL ADDRESS]" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="blank-input long-input"
            />
            <span>.</span>
          </div>

          <button type="submit" className="terminal-submit-btn interactive" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
        </form>
      )}

    </section>
  );
};

export default ContactForm;
