"use client";
import { useState } from "react";

export default function Quiz({ preguntas }) {
  const [respuestas, setRespuestas] = useState({});
  const [terminado, setTerminado] = useState(false);

  const total = preguntas.length;
  const correctas = preguntas.filter(
    (q, i) => respuestas[i] === q.correcta
  ).length;

  if (terminado) {
    const pct = Math.round((correctas / total) * 100);
    const mensaje =
      pct >= 80
        ? "¡Eres oficialmente del círculo íntimo! 🎩✨"
        : pct >= 50
        ? "Bien, pero podrías tomar más café con ellos ☕"
        : "Uy... ¿seguro que te invitaron? 😅";
    return (
      <div className="text-center bg-white/70 rounded-3xl p-10 border border-lavanda-200 max-w-xl mx-auto">
        <p className="text-6xl mb-4">🏆</p>
        <h3 className="font-serif text-3xl text-lavanda-700">
          {correctas} de {total}
        </h3>
        <p className="text-xl mt-2 text-tinta">{mensaje}</p>
        <button
          onClick={() => {
            setRespuestas({});
            setTerminado(false);
          }}
          className="mt-6 px-6 py-2 rounded-full bg-lavanda-600 text-white hover:bg-lavanda-700"
        >
          Volver a jugar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {preguntas.map((q, i) => (
        <div
          key={i}
          className="bg-white/70 backdrop-blur border border-lavanda-200 rounded-2xl p-5"
        >
          <p className="font-serif text-lg mb-3 text-tinta">
            {i + 1}. {q.pregunta}
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {q.opciones.map((op, j) => (
              <button
                key={j}
                onClick={() => setRespuestas({ ...respuestas, [i]: j })}
                className={`px-4 py-2 rounded-xl text-sm text-left border transition ${
                  respuestas[i] === j
                    ? "bg-lavanda-600 text-white border-lavanda-600"
                    : "bg-white border-lavanda-200 hover:border-lavanda-400"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => setTerminado(true)}
        disabled={Object.keys(respuestas).length !== total}
        className="w-full py-3 rounded-full bg-lavanda-600 text-white hover:bg-lavanda-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ver mi puntuación
      </button>
    </div>
  );
}
