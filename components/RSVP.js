"use client";
import { useState } from "react";
import site from "@/content/site.json";

export default function RSVP() {
  const [copied, setCopied] = useState(false);
  const configurado = site.formulario.googleFormId !== "REEMPLAZAR_FORM_ID";

  const shareMsg = `¡Nos casamos! Puedes confirmar aquí: ${site.dominio.url}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;

  const copy = () => {
    navigator.clipboard.writeText(site.dominio.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/70 backdrop-blur rounded-3xl border border-lavanda-200 shadow-soft p-6 md:p-10">
      {configurado ? (
        <div className="aspect-[3/4] md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white">
          <iframe
            src={site.formulario.googleFormUrl}
            className="w-full h-full border-0"
            title="Formulario RSVP"
            loading="lazy"
          >
            Cargando formulario...
          </iframe>
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <p className="text-6xl">🪄</p>
          <h3 className="font-serif text-2xl text-lavanda-700">
            El formulario está en preparación
          </h3>
          <p className="text-tinta/70 max-w-md mx-auto">
            Crea tu Google Form siguiendo el README y pega el ID en{" "}
            <code className="text-lavanda-700">content/site.json</code>.
            Cuando lo hagas, el formulario aparecerá aquí embebido automáticamente.
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-lavanda-200/60 flex flex-wrap items-center justify-center gap-3 text-sm">
        <a
          href={site.formulario.googleFormUrlPublico}
          target="_blank"
          rel="noopener"
          className="px-4 py-2 rounded-full border border-lavanda-300 hover:bg-lavanda-50"
        >
          Abrir en pestaña nueva
        </a>
        <a
          href={site.redes.spotifyPlaylistUrl}
          target="_blank"
          rel="noopener"
          className="px-4 py-2 rounded-full bg-[#1DB954] text-white hover:opacity-90"
        >
          🎵 Añade tu canción
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener"
          className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
        >
          Compartir por WhatsApp
        </a>
        <button
          onClick={copy}
          className="px-4 py-2 rounded-full border border-lavanda-300 hover:bg-lavanda-50"
        >
          {copied ? "¡Copiado!" : "Copiar enlace"}
        </button>
      </div>
    </div>
  );
}
