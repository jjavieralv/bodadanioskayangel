export default function SceneTransition({ variant }) {
  return (
    <div className={`scene-transition scene-transition-${variant}`} aria-hidden="true">
      <div className="transition-watercolor transition-watercolor-one" />
      <div className="transition-watercolor transition-watercolor-two" />
      <div className="transition-watercolor transition-watercolor-three" />
      <svg className="transition-wave transition-wave-top" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 49C170 95 300 12 487 48c217 42 348 49 522 8 186-45 292 22 431-16v80H0Z" />
      </svg>
      <svg className="transition-wave transition-wave-bottom" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 69c179-41 314 26 493-5 221-39 350-48 526-3 169 43 286-18 421 8v51H0Z" />
      </svg>
    </div>
  );
}
