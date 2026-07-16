"use client";
import { useEffect, useState } from "react";
import site from "@/content/site.json";

const STORAGE_KEY = "daniyangel-acceso";
const PASSWORD = "maricoiberico";

export default function SiteGate({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch (e) {
      /* localStorage no disponible */
    }
  }, []);

  function submit(e) {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch (e) {
        /* ignore */
      }
      setError(false);
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-watercolor px-4">
      <div className="w-full max-w-md rounded-3xl border border-lavanda-200 bg-white/90 p-8 text-center shadow-soft backdrop-blur-md sm:p-10 animate-fadeUp">
        <p className="mb-4 inline-block rounded-full bg-lavanda-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-lavanda-700">
          En construcción
        </p>

        <p className="font-script text-3xl text-lavanda-600">
          {site.novios.nombres}
        </p>
        <h1 className="mt-2 font-serif text-2xl font-semibold text-tinta sm:text-3xl">
          Nos casamos
        </h1>
        <p className="mt-1 text-lg text-tinta/70">
          {site.fecha.legible} · {site.lugar.ciudad}
        </p>

        <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-tinta/60">
          La web todavía está en construcción. Introduce la contraseña para
          acceder.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            placeholder="Contraseña"
            aria-label="Contraseña"
            className={`w-full rounded-full border bg-white px-5 py-3 text-center text-tinta outline-none transition focus:border-lavanda-400 focus:ring-2 focus:ring-lavanda-200 ${
              error ? "border-red-400" : "border-lavanda-200"
            }`}
          />
          {error && (
            <p className="text-sm text-red-500">
              Contraseña incorrecta. Inténtalo de nuevo.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-lavanda-600 px-6 py-3 font-medium text-white shadow-soft transition hover:bg-lavanda-700"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-xs text-tinta/40">
          {site.fecha.legible_corto}
        </p>
      </div>
    </div>
  );
}
