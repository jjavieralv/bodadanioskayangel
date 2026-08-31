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
    <div className="bg-white/70 backdrop-blur rounded-3xl border border-lavanda-200 shadow-soft p-6 md:p-10 text-center">
      {configurado ? (
        <a
          href={site.formulario.googleFormUrlPublico}
          target="_blank"
          rel="noopener"
          className="magic-card group mx-auto block max-w-md rounded-3xl border border-lavanda-200 bg-white/80 px-6 py-8 transition hover:border-lavanda-400"
        >
          <img
            loading="lazy"
            decoding="async"
            src={site.formulario.imagen}
            alt="Confirmar asistencia"
            className="mx-auto w-full max-w-sm aspect-[3/2] rounded-2xl object-cover shadow-soft"
          />
          <span className="mt-7 inline-block rounded-full bg-lavanda-600 px-8 py-3 text-lg font-medium text-white shadow-soft transition group-hover:bg-lavanda-700">
            Click aquí para confirmar
          </span>
          <span className="mt-3 block text-xs text-tinta/60">
            El formulario se abre en una pestaña nueva · 2 minutos
          </span>
        </a>
      ) : (
        <div className="py-10 space-y-4">
          <p className="text-6xl">🪄</p>
          <h3 className="font-serif text-2xl text-lavanda-700">
            El formulario está en preparación
          </h3>
          <p className="text-tinta/70 max-w-md mx-auto">
            Crea tu Google Form siguiendo el README y pega el ID en{" "}
            <code className="text-lavanda-700">content/site.json</code>.
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-lavanda-200/60 flex flex-wrap items-center justify-center gap-3 text-sm">
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
