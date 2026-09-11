"use client";

import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

const storyIcons = {
  water: "agua.png",
  heart: "corazon.png",
  rose: "rosa.png",
  toothbrush: "mudanza.png",
  coffee: "cafe.png",
  map: "mapa.png",
  music: "bandasonora.png",
  ring: "pedida.png",
};

function StoryIcon({ type }) {
  return (
    <img
      src={`/images/icons/story/${storyIcons[type]}`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
  );
}

function StoryPhoto({ chapter, index }) {
  const chapterClass = index === 1
    ? "story-photo-cuenca"
    : index === 3
      ? "story-photo-otto"
      : index === 7
        ? "story-photo-proposal"
        : "";

  return (
    <figure className={`story-photo story-photo-${(index % 4) + 1} ${chapterClass}`}>
      <span className="story-tape" aria-hidden="true" />
      {chapter.imagen ? (
        <img src={chapter.imagen} alt={chapter.alt || chapter.titulo} loading="lazy" decoding="async" />
      ) : (
        <div className="story-photo-placeholder">
          <span>Fotografía pendiente</span>
          <small>{chapter.fotoIdeal}</small>
        </div>
      )}
      {chapter.imagenSecundaria && (
        <span className="story-proposal-polaroid">
          <img src={chapter.imagenSecundaria} alt={chapter.altSecundaria || ""} loading="lazy" decoding="async" />
        </span>
      )}
    </figure>
  );
}

function ChapterHeading({ chapter, index }) {
  return (
    <header className="story-copy-heading">
      <p className="story-number">{String(index + 1).padStart(2, "0")} · Capítulo</p>
      <h3>{chapter.titulo}</h3>
    </header>
  );
}

function ChapterBody({ chapter }) {
  return (
    <div className="story-paragraphs">
      {chapter.parrafos.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex}>{paragraph}</p>
      ))}
    </div>
  );
}

export default function OurStory({ items }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const finalNode = timeline.querySelector(".story-finale .story-node");
      const timelineRect = timeline.getBoundingClientRect();
      const finalNodeRect = finalNode?.getBoundingClientRect();
      const lineTop = 32;
      const lineHeight = finalNodeRect
        ? finalNodeRect.top - timelineRect.top + finalNodeRect.height / 2 - lineTop
        : timeline.offsetHeight;
      timeline.style.setProperty("--story-line-height", `${Math.max(0, lineHeight)}px`);
      if (reducedMotion.matches) {
        timeline.style.setProperty("--story-progress", "1");
        return;
      }
      const start = window.innerHeight * 0.78;
      const distance = lineHeight + window.innerHeight * 0.28;
      const progress = Math.max(0, Math.min(1, (start - timelineRect.top) / distance));
      timeline.style.setProperty("--story-progress", progress.toFixed(3));
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
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
    <section id="nuestra-historia" className="our-story scroll-mt-24" aria-labelledby="our-story-title">
      <Reveal className="story-heading">
        <p className="story-overline">Un nosotros, poco a poco</p>
        <h2 id="our-story-title">Nuestra historia</h2>
        <p className="story-chapters">en 8 capítulos</p>
        <div className="divider-paw" aria-hidden="true">🐾</div>
        <p className="story-intro">Cómo estos dos seres, uno creativo y otro analítico, pasaron a ser un “nosotros”.</p>
      </Reveal>

      <div ref={timelineRef} className="story-timeline">
        <div className="story-line" aria-hidden="true"><span /></div>
        {items.map((chapter, index) => {
          const isFinal = index === items.length - 1;
          return (
            <article key={chapter.titulo} className={`story-chapter ${isFinal ? "story-finale" : ""}`}>
              <Reveal className="story-node"><StoryIcon type={chapter.icono} /></Reveal>
              {isFinal ? (
                <Reveal className="story-finale-content">
                  <ChapterHeading chapter={chapter} index={index} />
                  <ChapterBody chapter={chapter} />
                  <StoryPhoto chapter={chapter} index={index} />
                  <div className="story-ending">
                    <p>Dani dijo que sí.</p>
                    <span>Y, bueno…</span>
                    <strong>por eso estáis leyendo esta web.</strong>
                  </div>
                </Reveal>
              ) : (
                <>
                  <Reveal className="story-title"><ChapterHeading chapter={chapter} index={index} /></Reveal>
                  <Reveal className="story-visual"><StoryPhoto chapter={chapter} index={index} /></Reveal>
                  <Reveal className="story-body" delay={100}><ChapterBody chapter={chapter} /></Reveal>
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
