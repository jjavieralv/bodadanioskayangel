"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const timelineIcons = [
  "ermita.png",
  "ceremonia.png",
  "coctel.png",
  "banquete.png",
  "fiesta.png",
  "horaloca.png",
  "recena.png",
];

function RichNote({ children }) {
  return children.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

export default function Timeline({ items }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        timeline.style.setProperty("--day-progress", "1");
        return;
      }
      const rect = timeline.getBoundingClientRect();
      const start = window.innerHeight * .78;
      const distance = rect.height + window.innerHeight * .12;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / distance));
      timeline.style.setProperty("--day-progress", progress.toFixed(3));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener?.("change", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener?.("change", requestUpdate);
    };
  }, []);

  return (
    <ol ref={timelineRef} className="day-timeline">
      <div className="day-line" aria-hidden="true"><span /></div>
      {items.map((item, index) => (
        <li key={`${item.hora}-${item.titulo}`} className="day-moment">
          <Reveal className="day-icon-wrap">
            <img
              src={`/images/icons/timeline/${timelineIcons[index]}`}
              alt=""
              aria-hidden="true"
              className="day-icon"
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <Reveal className="day-time">
            <span>{item.hora}</span>
            <small>horas</small>
          </Reveal>
          <Reveal className="day-copy" delay={90}>
            <h3>{item.titulo}</h3>
            {item.descripcion && <p>{item.descripcion}</p>}
            {item.nota && (
              <aside className="day-note">
                <span>Nota de los novios</span>
                <p><RichNote>{item.nota}</RichNote></p>
              </aside>
            )}
          </Reveal>
        </li>
      ))}
      <li className="day-finale" aria-hidden="true"><i /><span>Nos vemos en la pista</span><i /></li>
    </ol>
  );
}
