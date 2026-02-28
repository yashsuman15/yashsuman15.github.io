const ITEMS = [
  'DEEP LEARNING', 'NEURAL NETWORKS', 'TRANSFORMER MODELS',
  'COMPUTER VISION', 'NLP', 'REINFORCEMENT LEARNING',
  'GENERATIVE AI', 'MLOps', 'PYTORCH', 'TENSORFLOW',
];

export function Marquee() {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="sep">//</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
