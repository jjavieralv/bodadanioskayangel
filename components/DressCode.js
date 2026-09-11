"use client";

import { useEffect, useRef } from "react";

export default function DressCode({ content }) {
  const sectionRef = useRef(null);
  const scopeTrackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scopeTrack = scopeTrackRef.current;
    if (!section || !scopeTrack) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        section.style.setProperty("--scope-progress", "1");
        section.style.setProperty("--scope-open", "1");
        return;
      }

      const scopeRect = scopeTrack.getBoundingClientRect();
      const startLine = window.innerHeight * 0.9;
      const travel = window.innerWidth >= 768 ? window.innerHeight * 0.34 : window.innerHeight * 0.48;
      const aperture = Math.max(0, Math.min(1, (startLine - scopeRect.top) / travel));
      section.style.setProperty("--scope-progress", aperture.toFixed(3));
      section.style.setProperty("--scope-open", aperture.toFixed(3));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener?.("change", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener?.("change", schedule);
    };
  }, []);

  return (
    <div ref={sectionRef} className="dresscode-page">
      <div className="dresscode-wash dresscode-wash-left" aria-hidden="true" />
      <div className="dresscode-wash dresscode-wash-right" aria-hidden="true" />

      <header className="dresscode-heading">
        <h2>{content.titulo}</h2>
        <div className="divider-paw" aria-hidden="true">🐾</div>
        <p className="dresscode-formal">{content.codigo}</p>
        <h3>{content.lema}</h3>
        <p className="dresscode-introduction">{content.introduccion}</p>
        <p className="dresscode-principle">{content.principio}</p>
      </header>

      <section className="dresscode-white" aria-labelledby="dresscode-colors-title">
        <img className="wine-stain wine-stain-colors" src="/images/wine-stains/blot-center.png" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className="dresscode-rule-heading">
          <span />
          <p id="dresscode-colors-title">{content.colores.titulo}</p>
          <span />
        </div>
        <div className="dresscode-white-copy">
          <h3>{content.colores.regla}</h3>
          <p>{content.colores.detalle}</p>
          <blockquote>{content.colores.excusa}</blockquote>
          <strong>{content.colores.conclusion}</strong>
        </div>
      </section>

      <section className="dresscode-agent" aria-labelledby="dresscode-agent-title">
        <div className="dresscode-rule-heading">
          <span />
          <p id="dresscode-agent-title">Aviso del cortejo</p>
          <span />
        </div>
        <div className="dresscode-agent-copy">
          <p>{content.advertencia}</p>
          <em>{content.remate[0]}<br />{content.remate[1]}</em>
        </div>
        <div className="wine-stain-cluster" aria-hidden="true">
          <img className="wine-stain wine-stain-ring" src="/images/wine-stains/ring-bottom.png" alt="" loading="lazy" decoding="async" />
          <img className="wine-stain wine-stain-splash" src="/images/wine-stains/splash-left.png" alt="" loading="lazy" decoding="async" />
          <img className="wine-stain wine-stain-drops" src="/images/wine-stains/drops-top.png" alt="" loading="lazy" decoding="async" />
        </div>
        <div ref={scopeTrackRef} className="otto-scope-track" aria-label="Agente Otto 007, seguridad del dress code">
          <div className="otto-scope">
            <div className="scope-blade scope-blade-1" />
            <div className="scope-blade scope-blade-2" />
            <div className="scope-blade scope-blade-3" />
            <div className="scope-blade scope-blade-4" />
            <div className="scope-blade scope-blade-5" />
            <div className="scope-blade scope-blade-6" />
            <div className="scope-photo">
              <img src={content.imagen} alt="Otto vestido de gala con una pistola de agua" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div className="otto-agent-caption">
          <span>Su elegancia también es letal</span>
          <strong>Agente Otto <b>007</b></strong>
        </div>
      </section>
    </div>
  );
}
