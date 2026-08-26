"use client";
import { useDecision } from "@/components/useDecision";

export default function Section({ id, elementId, title, subtitle, quiza, children, className = "" }) {
  const { get } = useDecision();
  const decision = elementId ? get(elementId) : null;

  return (
    <section
      id={id}
      data-element-id={elementId}
      className={`relative scroll-mt-24 py-16 md:py-24 px-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {(title || subtitle || quiza) && (
          <header className="text-center mb-10 md:mb-14 animate-fadeUp">
            {quiza && decision !== "Sí" && (
              <span className="inline-block mb-3 text-xs uppercase tracking-[0.25em] px-3 py-1 rounded-full badge-quiza">
                {decision === "No" ? "Descartado" : "Propuesta · pendiente"}
              </span>
            )}
            {title && (
              <h2 className="section-title text-5xl md:text-6xl lg:text-7xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="section-subtitle mt-3 max-w-2xl mx-auto italic">{subtitle}</p>
            )}
            <div className="divider-paw">🐾</div>
          </header>
        )}
        <div className="section-copy">{children}</div>
      </div>
    </section>
  );
}
