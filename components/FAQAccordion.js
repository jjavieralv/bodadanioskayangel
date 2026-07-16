"use client";
import { useState } from "react";

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="bg-white/70 backdrop-blur border border-lavanda-200 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-tinta">{it.p}</span>
              <span className={`text-lavanda-700 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-tinta/75 animate-fadeUp">
                {it.r}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
