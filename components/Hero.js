"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));

      hero.style.setProperty("--hero-scale", String(1 + progress * 0.075));
      hero.style.setProperty("--hero-shift", `${progress * -48}px`);
      hero.style.setProperty("--hero-fade", String(1 - progress * 0.9));
      hero.style.setProperty("--hero-veil", String(0.12 + progress * 0.48));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="hero-scene">
      <div className="hero-stage">
        <img src="/images/hero/portada-danioska-angel.jpg" alt="" className="hero-photo-backdrop" aria-hidden="true" />
        <img
          src="/images/hero/portada-danioska-angel.jpg"
          alt="Danioska y Ángel frente a la iglesia"
          className="hero-photo-main"
          fetchPriority="high"
        />
        <div className="hero-photo-overlay" aria-hidden="true" />
        <div className="hero-bottom-glow" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-kicker">Celebremos juntos la boda de</p>
          <h1 className="hero-names">
            <span>Danioska</span>
            <span className="hero-ampersand">&amp;</span>
            <span>Ángel</span>
          </h1>
          <div className="hero-date" aria-label="2 de abril de 2027">
            <span>02</span><i /><span>04</span><i /><span>2027</span>
          </div>
          <p className="hero-place">Madrid · España</p>
        </div>

        <div className="hero-actions">
          <a href="#rsvp" className="hero-rsvp">Confirmar asistencia</a>
          <a href="#countdown" className="hero-scroll" aria-label="Continuar hacia la cuenta atrás">
            <span>Desliza para descubrir</span>
            <span className="hero-scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
