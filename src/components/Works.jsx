import './Works.css';

const projects = [
  { id: 1, title: "LUMINA", type: "SPATIAL", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, title: "VOID", type: "VIRTUAL", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, title: "NEXUS", type: "SYSTEM", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, title: "ECHO", type: "ENGINEERING", img: "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?q=80&w=2000&auto=format&fit=crop" }
];

const Works = () => {
  return (
    <section className="works-stack-container">
      
      {projects.map((project, index) => (
        <div className="works-stack-card" key={project.id} style={{ zIndex: index + 1 }}>
          
          {/* Fullscreen Background Image */}
          <div className="works-stack-bg">
            <img src={project.img} alt={project.title} />
            <div className="works-stack-overlay"></div>
          </div>

          {/* Brutalist Foreground Typography */}
          <div className="works-stack-content">
            <p className="works-stack-meta">03 // SELECTED WORKS</p>
            <div className="works-stack-header">
              <h2 className="works-stack-title">{project.title}</h2>
              <span className="works-stack-type">{project.type}</span>
            </div>
          </div>

        </div>
      ))}

    </section>
  );
};

export default Works;
