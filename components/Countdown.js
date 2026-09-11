"use client";
import { useEffect, useState } from "react";
import site from "@/content/site.json";
import Reveal from "./Reveal";

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
    <div className="countdown-grid" aria-label="Cuenta atrás para la boda">
      {parts.map((p, index) => (
        <Reveal key={p.label} delay={index * 90} className="countdown-part">
          <p className="countdown-number">{String(p.value).padStart(2, "0")}</p>
          <p className="countdown-label">{p.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
