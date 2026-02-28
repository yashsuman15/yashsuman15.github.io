export function Navigation() {
  return (
    <nav>
      <a href="#hero" className="nav-logo">
        <img src="/logo.png" alt="Logo" style={{ height: '32px' }} />
      </a>
      <div className="nav-links">
        <a href="#about">// ABOUT</a>
        <a href="#skills">// SKILLS</a>
        <a href="#showcase">// PROJECTS</a>
        <a href="#experience">// EXP</a>
        <a href="#contact">// CONTACT</a>
      </div>
      <div className="nav-status">
        <div className="status-dot" />
        WORKING
      </div>
    </nav>
  );
}
