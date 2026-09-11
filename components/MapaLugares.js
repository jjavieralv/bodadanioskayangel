"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function MapaLugares({ puntos }) {
  const categorias = Array.from(new Set(puntos.map((p) => p.categoria)));
  const [filtro, setFiltro] = useState("Todos");
  const [activo, setActivo] = useState(puntos[0]?.id);
  const visibles = filtro === "Todos" ? puntos : puntos.filter((p) => p.categoria === filtro);
  const seleccionado = visibles.find((p) => p.id === activo) || visibles[0] || puntos[0];
  const mapUrl = seleccionado?.mapaUrl || `https://www.google.com/maps?q=${encodeURIComponent(seleccionado?.direccion || "Madrid")}&output=embed`;

  const cambiarFiltro = (categoria) => {
    setFiltro(categoria);
    const primeros = categoria === "Todos" ? puntos : puntos.filter((p) => p.categoria === categoria);
    setActivo(primeros[0]?.id);
  };

  return (
    <div className="places-experience">
      <Reveal className="places-filters" aria-label="Filtrar lugares">
        {["Todos", ...categorias].map((categoria) => (
          <button key={categoria} type="button" onClick={() => cambiarFiltro(categoria)} className={filtro === categoria ? "is-active" : ""} aria-pressed={filtro === categoria}>
            {categoria}
          </button>
        ))}
      </Reveal>

      <div className="places-layout">
        <Reveal className="places-map">
          <iframe key={seleccionado?.id} src={mapUrl} title={`Mapa de ${seleccionado?.nombre || "los lugares de la boda"}`} loading="lazy" />
          <div className="places-map-caption" aria-live="polite">
            <span>{seleccionado?.categoria}</span>
            <strong>{seleccionado?.nombre}</strong>
          </div>
        </Reveal>

        <ul className="places-list">
          {visibles.map((punto) => (
            <li key={punto.id} className={punto.id === seleccionado?.id ? "is-active" : ""}>
              <div className="places-card-inner">
                <span className="places-card-icon" style={{ background: punto.color || "#e5d8ff" }}>
                  {punto.icono?.startsWith("/") ? <img src={punto.icono} alt="" aria-hidden="true" /> : punto.icono}
                </span>
                <div className="places-card-copy">
                  <p className="places-card-category">{punto.categoria}</p>
                  <p className="places-card-name">{punto.nombre}</p>
                  <p className="places-card-address">{punto.direccion}</p>
                  {punto.descripcion && <p className="places-card-description">{punto.descripcion}</p>}
                  <div className="places-card-actions">
                    <button type="button" onClick={() => setActivo(punto.id)}>Ver en el mapa</button>
                    {punto.direccionesUrl && <a href={punto.direccionesUrl} target="_blank" rel="noopener noreferrer">Cómo llegar →</a>}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
