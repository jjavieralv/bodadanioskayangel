"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDecision } from "@/components/useDecision";
import { Suspense } from "react";

function Overlay() {
  const params = useSearchParams();
  const active = params?.get("decidir") === "1";
  const { store, set, clear } = useDecision();
  const [sections, setSections] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!active) return;
    const els = Array.from(document.querySelectorAll("[data-element-id]"));
    setSections(els.map((el) => ({ id: el.dataset.elementId, top: el.offsetTop })));
    const onScroll = () => {
      const y = window.scrollY + 200;
      let found = null;
      for (const el of els) {
        if (el.offsetTop <= y) found = el.dataset.elementId;
      }
      setCurrent(found);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  if (!active) return null;

  const decided = Object.keys(store).length;

  return (
    <div className="fixed bottom-4 right-4 z-50 no-print">
      <div className="bg-white/95 backdrop-blur-md shadow-soft border border-lavanda-200 rounded-2xl p-4 w-80 max-w-[calc(100vw-2rem)]">
        <div className="flex items-center justify-between mb-2">
          <p className="font-serif text-lg text-lavanda-700">Modo decisión</p>
          <span className="text-xs text-tinta/60">{decided} decididos</span>
        </div>
        {current ? (
          <>
            <p className="text-xs uppercase tracking-wider text-tinta/50 mb-1">
              Sección actual
            </p>
            <p className="text-sm font-medium text-tinta mb-3 truncate">
              <code className="text-lavanda-700">{current}</code>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["Sí", "Quizás", "No"].map((v) => (
                <button
                  key={v}
                  onClick={() => set(current, v)}
                  className={`py-1.5 text-xs rounded-full border transition ${
                    store[current] === v
                      ? "bg-lavanda-600 text-white border-lavanda-600"
                      : "bg-white text-tinta/70 border-lavanda-200 hover:border-lavanda-400"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-tinta/60 mb-2">
            Scroll por la página para valorar cada sección.
          </p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs text-tinta/60">
          <Link
            href="/decidir"
            className="underline decoration-dotted hover:text-lavanda-700"
          >
            Ver resumen →
          </Link>
          <button
            onClick={() => {
              if (confirm("¿Borrar todas las decisiones?")) clear();
            }}
            className="underline decoration-dotted hover:text-red-500"
          >
            Resetear
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DecisionOverlay() {
  return (
    <Suspense fallback={null}>
      <Overlay />
    </Suspense>
  );
}
