"use client";
import { useEffect, useState } from "react";
import site from "@/content/site.json";

function calc() {
  const target = new Date(site.fecha.iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setT(calc());
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);

  const parts = [
    { label: "días", value: t.days },
    { label: "horas", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "seg", value: t.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-5">
      {parts.map((p) => (
        <div
          key={p.label}
          className="min-w-[80px] md:min-w-[110px] bg-white/70 backdrop-blur rounded-2xl border border-lavanda-200 py-4 px-3 shadow-soft"
        >
          <p className="font-serif text-4xl md:text-5xl text-lavanda-700 text-center leading-none">
            {String(p.value).padStart(2, "0")}
          </p>
          <p className="text-xs uppercase tracking-widest text-tinta/60 text-center mt-2">
            {p.label}
          </p>
        </div>
      ))}
    </div>
  );
}
