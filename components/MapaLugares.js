"use client";
import { useState } from "react";

export default function MapaLugares({ puntos }) {
  const categorias = Array.from(new Set(puntos.map((p) => p.categoria)));
  const [filtro, setFiltro] = useState("Todos");
  const visibles =
    filtro === "Todos" ? puntos : puntos.filter((p) => p.categoria === filtro);

  const primero = visibles[0] || puntos[0];
  const query = encodeURIComponent(
    visibles.map((p) => p.direccion).join(" | ")
  );
  const mapUrl = primero?.mapaUrl
    ? primero.mapaUrl
    : `https://www.google.com/maps?q=${encodeURIComponent(
        primero?.direccion || "Madrid"
      )}&output=embed`;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {["Todos", ...categorias].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFiltro(c)}
            className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-widest transition ${
              filtro === c
                ? "bg-lavanda-600 text-white"
                : "bg-white/70 border border-lavanda-200 text-tinta/70 hover:bg-lavanda-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-3xl overflow-hidden border border-lavanda-200 shadow-soft bg-white/70 aspect-square md:aspect-video">
          <iframe
            key={primero?.id}
            src={mapUrl}
            className="w-full h-full border-0"
            title="Mapa de lugares de la boda"
            loading="lazy"
          />
        </div>

        <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {visibles.map((p) => (
            <li
              key={p.id}
              className="bg-white/80 rounded-2xl border border-lavanda-200 p-3 hover:border-lavanda-400 transition"
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-lg"
                  style={{ background: p.color || "#e5d8ff" }}
                >
                  {p.icono}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-lavanda-700/80">
                    {p.categoria}
                  </p>
                  <p className="font-serif text-base text-tinta leading-tight">
                    {p.nombre}
                  </p>
                  <p className="text-xs text-tinta/60 mt-0.5">{p.direccion}</p>
                  {p.descripcion && (
                    <p className="text-xs text-tinta/75 mt-1">{p.descripcion}</p>
                  )}
                  {p.direccionesUrl && (
                    <a
                      href={p.direccionesUrl}
                      target="_blank"
                      rel="noopener"
                      className="inline-block mt-1.5 text-xs text-lavanda-700 underline decoration-dotted hover:text-lavanda-900"
                    >
                      Cómo llegar →
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
