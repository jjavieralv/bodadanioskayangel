"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

export default function WeddingPartyCarousel({ padres = [], personas = [] }) {
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [motion, setMotion] = useState(null);
  const [settling, setSettling] = useState(null);
  const touchStart = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const move = (direction) => {
    if (motion) return;
    const name = direction > 0 ? "next" : "previous";
    setMotion(name);
    timers.current.push(setTimeout(() => {
      setActive((current) => (current + direction + personas.length) % personas.length);
      setMotion(null);
      setSettling(name);
      timers.current.push(setTimeout(() => setSettling(null), 480));
    }, 620));
  };
  const finishSwipe = (clientX) => {
    if (touchStart.current === null) return;
    const distance = clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
  };
  const visiblePeople = [
    { person: personas[(active - 1 + personas.length) % personas.length], position: "before" },
    { person: personas[active], position: "first" },
    { person: personas[(active + 1) % personas.length], position: "second" },
    { person: personas[(active + 2) % personas.length], position: "after" },
  ];

  return (
    <div className="wedding-party">
      {padres.length > 0 && (
        <div className="party-parents">
          <Reveal className="party-subheading">
            <p>Los que hicieron posible el comienzo</p>
            <h3>Nuestros padres</h3>
          </Reveal>
          <div className="party-parents-grid">
            {padres.map((parent, index) => (
              <Reveal key={parent.nombre} delay={index * 100} className="party-parent-reveal">
                <article className={`party-parent-card party-parent-${index + 1}`}>
                  <div className="party-parent-photo">
                    <img loading="lazy" decoding="async" src={parent.imagen} alt={parent.nombre} />
                  </div>
                  <div className="party-parent-copy">
                    <span>{parent.rol}</span>
                    <h4>{parent.nombre}</h4>
                    <p>{parent.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {personas.length > 0 && (
        <div className="party-carousel-wrap">
          <Reveal className="party-subheading party-carousel-heading">
            <p>El equipo que completa la aventura</p>
            <h3>Padrinos, damas, caballeros y el Caniche</h3>
          </Reveal>
          <div
            className={`party-carousel ${motion ? `is-moving-${motion}` : ""} ${settling ? `is-settling-${settling}` : ""}`}
            tabIndex={0}
            aria-label="Carrusel del cortejo"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") move(1);
              if (event.key === "ArrowLeft") move(-1);
            }}
            onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => finishSwipe(event.changedTouches[0].clientX)}
          >
            <div className="party-person-stage" aria-live="polite">
              {visiblePeople.map(({ person, position }, index) => (
                <article
                  key={person.nombre}
                  className={`party-person-card party-position-${position} party-tone-${(active + index) % 3}`}
                  aria-hidden={position === "before" || position === "after" || (!isDesktop && position === "second")}
                >
                  <div className="party-person-photo">
                    <img loading={index === 0 ? "eager" : "lazy"} decoding="async" src={person.imagen} alt={person.nombre} />
                  </div>
                  <div className="party-person-copy">
                    <p className="party-person-role">{person.rol}</p>
                    <h4>{person.nombre}</h4>
                    <p className="party-person-bio">{person.bio}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="party-controls">
              <button type="button" disabled={Boolean(motion)} onClick={() => move(-1)} aria-label="Ver persona anterior"><span aria-hidden="true">←</span> Anterior</button>
              <p className="party-swipe-hint">Desliza para conocer al resto</p>
              <button type="button" disabled={Boolean(motion)} onClick={() => move(1)} aria-label="Ver siguiente persona">Siguiente <span aria-hidden="true">→</span></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
