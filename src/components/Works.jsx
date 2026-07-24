import './Works.css';

const Works = () => {
  return (
    <section className="works-canva-section" id="works">
      <div className="works-3d-overlay">
        <p className="works-label">05 // PRODUCTIONS</p>
      </div>

      <div className="works-canva-container">
        <iframe
          loading="lazy"
          className="works-canva-iframe"
          src="https://www.canva.com/design/DAHC2-wWJ90/amru226A-wV4uS5310ZvxA/view?embed"
          allowFullScreen
          allow="fullscreen"
          title="THE ADS TAG Presentation"
        ></iframe>
      </div>

      <div className="works-instruction">
        [ USE KEYBOARD ARROWS TO NAVIGATE ]
      </div>
    </section>
  );
};

export default Works;
