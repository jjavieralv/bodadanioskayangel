"use client";
import { useRef, useState, useEffect } from "react";

export default function HistoriaCarousel({ items }) {
  const scrollerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    const card = el.children[clamped];
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      for (let i = 0; i < el.children.length; i++) {
        const c = el.children[i];
        const cCenter = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cCenter - center);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      }
      setIndex(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((step, i) => (
          <article
            key={i}
            className="snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[55%] lg:w-[45%] bg-white/70 backdrop-blur rounded-3xl border border-lavanda-200 shadow-soft overflow-hidden"
          >
            <img
              src={step.imagen}
              alt={step.titulo}
              className="w-full h-56 md:h-64 object-cover"
            />
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-lavanda-700/80 mb-1">
                {step.fecha}
              </p>
              <h3 className="font-serif text-2xl text-tinta mb-2">
                {step.icono} {step.titulo}
              </h3>
              <p className="text-tinta/75 leading-relaxed text-sm">{step.texto}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => scrollTo(index - 1)}
          aria-label="Anterior"
          className="w-9 h-9 rounded-full bg-white border border-lavanda-200 text-lavanda-700 hover:bg-lavanda-50 shadow-soft"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ir a ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-lavanda-600" : "w-2 bg-lavanda-300"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollTo(index + 1)}
          aria-label="Siguiente"
          className="w-9 h-9 rounded-full bg-white border border-lavanda-200 text-lavanda-700 hover:bg-lavanda-50 shadow-soft"
        >
          ›
        </button>
      </div>
    </div>
  );
}
