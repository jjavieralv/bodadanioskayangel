"use client";
import site from "@/content/site.json";
import AddToCalendar from "./AddToCalendar";

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-watercolor" />
        <div className="absolute top-10 left-10 text-3xl opacity-40 animate-float">✨</div>
        <div className="absolute top-24 right-16 text-2xl opacity-40 animate-sparkle">✨</div>
        <div className="absolute bottom-32 left-1/4 text-2xl opacity-40 animate-float">🎩</div>
        <div className="absolute bottom-20 right-1/3 text-2xl opacity-40 animate-sparkle">🎨</div>
        <div className="absolute top-1/2 right-10 text-3xl opacity-40 animate-float">🐾</div>
      </div>

      <div className="max-w-3xl animate-fadeUp">
        <h1 className="monogram mt-2 mb-0 leading-none">{site.novios.iniciales}</h1>

        <p className="font-serif text-2xl md:text-3xl text-tinta mb-2">
          {site.novios.nombres}
        </p>

        <p className="text-sm md:text-base uppercase tracking-[0.4em] text-lavanda-700/80 mt-4">
          {site.fecha.diaSemana} · {site.fecha.legible}
        </p>

        <p className="italic text-tinta/70 mt-6 mb-8 max-w-md mx-auto">
          se casan en {site.lugar.ciudad}. Y quieren verte ahí.
        </p>

        <div className="mx-auto mb-8 max-w-xl bg-white/70 backdrop-blur border border-lavanda-300 rounded-2xl px-5 py-4 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-lavanda-700">
            Fecha límite para confirmar
          </p>
          <p className="font-serif text-2xl text-tinta mt-1">
            {site.fecha.rsvpLimite}
          </p>
          <p className="text-xs text-tinta/70 mt-1">
            Después de esa fecha no podremos cerrar el menú ni el bus.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#rsvp"
            className="px-6 py-3 rounded-full bg-lavanda-600 text-white hover:bg-lavanda-700 transition shadow-soft"
          >
            Confirmar asistencia
          </a>
          <a
            href={site.redes.spotifyPlaylistUrl}
            target="_blank"
            rel="noopener"
            className="px-6 py-3 rounded-full bg-white/80 border border-lavanda-300 text-lavanda-700 hover:bg-lavanda-50 transition shadow-soft"
          >
            🎵 Playlist colaborativa
          </a>
          <AddToCalendar />
        </div>

        <p className="mt-10 text-xs uppercase tracking-widest text-tinta/50">
          ↓ Haz scroll para descubrir el plan
        </p>

        <div className="mt-16 flex items-center justify-center gap-6 opacity-70">
          <span className="font-iniciales text-4xl text-lavanda-700">
            {site.novios.iniciales}
          </span>
          <span className="text-lavanda-400">·</span>
          <span className="font-iniciales text-4xl text-lavanda-700">
            {site.novios.iniciales}
          </span>
        </div>
      </div>
    </section>
  );
}
