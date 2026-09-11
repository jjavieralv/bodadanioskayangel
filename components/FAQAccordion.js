"use client";
import { useState } from "react";

function RichText({ children }) {
  const parts = children.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <article
            key={i}
            className={`faq-item ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="faq-question"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span>{it.p}</span>
              <i aria-hidden="true">+</i>
            </button>
            <div id={`faq-answer-${i}`} className="faq-answer" aria-hidden={!isOpen}>
              <div>
                {(Array.isArray(it.r) ? it.r : [it.r]).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}><RichText>{paragraph}</RichText></p>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
