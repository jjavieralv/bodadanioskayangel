"use client";

import { useRef } from "react";

export default function CortejoCarousel({ personas = [] }) {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("[data-cortejo-card]");
    const amount = card ? card.getBoundingClientRect().width + 24 : 320;

    track.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 pb-5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Carrusel del cortejo"
      >
        {personas.map((p) => (
          <article
            key={p.nombre}
            data-cortejo-card
            className="snap-center shrink-0 w-[82vw] max-w-[330px] bg-white/70 border border-lavanda-200 rounded-3xl p-6 text-center shadow-soft"
          >
            <img
              loading="lazy"
              decoding="async"
              src={p.imagen}
              alt={p.nombre}
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-lavanda-200 shadow-soft"
            />
            <p className="font-serif text-2xl mt-4 text-tinta">{p.nombre}</p>
            <p className="text-xs uppercase tracking-widest text-lavanda-700 mt-1">
              {p.rol}
            </p>
            <p className="text-sm text-tinta/75 mt-3 leading-relaxed">{p.bio}</p>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Ver persona anterior"
          className="w-11 h-11 rounded-full border border-lavanda-300 bg-white/80 text-lavanda-700 text-2xl leading-none shadow-soft hover:bg-lavanda-50 transition"
        >
          ‹
        </button>
        <p className="text-xs uppercase tracking-[0.18em] text-tinta/55">
          Desliza para conocerlos
        </p>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Ver persona siguiente"
          className="w-11 h-11 rounded-full border border-lavanda-300 bg-white/80 text-lavanda-700 text-2xl leading-none shadow-soft hover:bg-lavanda-50 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
