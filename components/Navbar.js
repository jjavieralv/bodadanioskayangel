"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import site from "@/content/site.json";

const links = [
  { href: "/#historia", label: "Historia" },
  { href: "/#evento", label: "El día" },
  { href: "/#viaje", label: "Cómo llegar" },
  { href: "/#madrid", label: "Madrid" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#otto", label: "Otto 🐾" },
  { href: "/#quiz", label: "Quiz" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`no-print fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-crema/85 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="font-iniciales text-3xl md:text-4xl text-lavanda-700 leading-none tracking-wide">
            {site.novios.iniciales}
          </span>
          <span className="hidden sm:block text-xs uppercase tracking-[0.3em] text-lavanda-700/70">
            {site.fecha.legible_corto}
          </span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          className="md:hidden p-2 text-lavanda-700"
        >
          <span className="block w-6 h-0.5 bg-lavanda-700 mb-1.5" />
          <span className="block w-6 h-0.5 bg-lavanda-700 mb-1.5" />
          <span className="block w-6 h-0.5 bg-lavanda-700" />
        </button>

        <ul className="hidden md:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-tinta/80 hover:text-lavanda-700 transition"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.redes.spotifyPlaylistUrl}
              target="_blank"
              rel="noopener"
              title="Playlist colaborativa de Spotify"
              className="px-3 py-2 rounded-full border border-lavanda-300 text-lavanda-700 hover:bg-lavanda-50 transition text-sm"
            >
              🎵 Playlist
            </a>
          </li>
          <li>
            <Link
              href="/#rsvp"
              className="px-4 py-2 rounded-full bg-lavanda-600 text-white text-sm hover:bg-lavanda-700 transition"
            >
              Confirmar
            </Link>
          </li>
        </ul>
      </div>

      {open && (
        <ul className="md:hidden bg-crema/95 backdrop-blur-md border-t border-lavanda-200 px-4 py-3 flex flex-col gap-3 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-1.5 text-tinta/80 hover:text-lavanda-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.redes.spotifyPlaylistUrl}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="block py-1.5 text-lavanda-700"
            >
              🎵 Playlist colaborativa
            </a>
          </li>
          <li>
            <Link
              href="/#rsvp"
              onClick={() => setOpen(false)}
              className="block py-2 px-4 rounded-full bg-lavanda-600 text-white text-center"
            >
              Confirmar asistencia
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
