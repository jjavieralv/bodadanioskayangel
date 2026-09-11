"use client";

import { useState } from "react";
import site from "@/content/site.json";

export default function RSVP() {
  const [copied, setCopied] = useState(false);
  const formUrl = site.formulario.googleFormUrlPublico;
  const shareMsg = `Danioska y Ángel se casan. Confirma tu asistencia antes del ${site.fecha.rsvpLimite}: ${formUrl}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copia el enlace del formulario:", formUrl);
    }
  };

  return (
    <div className="rsvp-scene-card">
      <div className="rsvp-wash rsvp-wash-one" aria-hidden="true" />
      <div className="rsvp-wash rsvp-wash-two" aria-hidden="true" />
      <div className="rsvp-letter">
        <span className="rsvp-letter-corner rsvp-letter-corner-one" aria-hidden="true" />
        <span className="rsvp-letter-corner rsvp-letter-corner-two" aria-hidden="true" />
        <p className="rsvp-overline">Répondez s’il vous plaît</p>
        <h3>¿Nos acompañas?</h3>
        <p className="rsvp-heading-note">Hay días que sólo tienen sentido cuando están las personas adecuadas.</p>
        <p className="rsvp-copy">Necesitamos algunos detalles para reservarte un lugar, preparar tu menú y asegurarnos de que puedas llegar, brindar y bailar con nosotros.</p>
        <div className="rsvp-deadline">
          <span>Confirma antes del</span>
          <strong>{site.fecha.rsvpLimite}</strong>
          <p>Después de esa fecha, no podremos garantizarte un sitio en la mesa para celebrar con nosotros.</p>
        </div>
        <div className="rsvp-actions">
          <a className="rsvp-primary" href={formUrl} target="_blank" rel="noopener noreferrer">Confirmar asistencia <span aria-hidden="true">↗</span></a>
          <div className="rsvp-secondary-actions">
            <button type="button" onClick={copy} aria-live="polite">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7V5.8A2.8 2.8 0 0 1 10.8 3h7.4A2.8 2.8 0 0 1 21 5.8v7.4a2.8 2.8 0 0 1-2.8 2.8H17M5.8 8h7.4a2.8 2.8 0 0 1 2.8 2.8v7.4a2.8 2.8 0 0 1-2.8 2.8H5.8A2.8 2.8 0 0 1 3 18.2v-7.4A2.8 2.8 0 0 1 5.8 8Z" /></svg>
              {copied ? "¡Enlace copiado!" : "Copiar enlace"}
            </button>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.4l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z" /><path d="M8.2 7.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.2.2-.1.4 0 .6.7 1.3 1.8 2.4 3.2 3 .2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .4-.2 1.5-1 2.1-.7.6-1.6.8-2.6.5-1.1-.3-2.8-1-4.6-2.6-1.5-1.4-2.6-3.1-2.9-4.3-.3-1.1.2-2 .5-2.4Z" /></svg>
              Compartir por WhatsApp
            </a>
          </div>
        </div>
      </div>
      <aside className="rsvp-qr">
        <div className="shared-qr-frame">
          <span className="shared-qr-corner shared-qr-corner-one" aria-hidden="true" />
          <span className="shared-qr-corner shared-qr-corner-two" aria-hidden="true" />
          <img src="/images/rsvp-form-qr.png" alt="Código QR para confirmar asistencia" loading="lazy" decoding="async" />
        </div>
        <p className="shared-qr-label">También puedes escanear</p>
        <span>El formulario tarda aproximadamente dos minutos.</span>
      </aside>
    </div>
  );
}
