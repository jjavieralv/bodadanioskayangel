"use client";
import { useMemo } from "react";
import Link from "next/link";
import elementos from "@/content/elementos.json";
import { useDecision } from "@/components/useDecision";

const VALORES = ["Sí", "Quizás", "No"];

export default function DecidirPage() {
  const { store, set, clear } = useDecision();

  const porCategoria = useMemo(() => {
    const grouped = {};
    for (const el of elementos.elementos) {
      grouped[el.categoria] = grouped[el.categoria] || [];
      grouped[el.categoria].push(el);
    }
    return grouped;
  }, []);

  const stats = useMemo(() => {
    const s = { "Sí": 0, "Quizás": 0, "No": 0, pendiente: 0 };
    for (const el of elementos.elementos) {
      const v = store[el.id] ?? el.decision;
      if (!store[el.id]) s.pendiente++;
      if (VALORES.includes(v)) s[v]++;
    }
    return s;
  }, [store]);

  const exportar = () => {
    const rows = elementos.elementos.map((el) => ({
      id: el.id,
      categoria: elementos.categorias.find((c) => c.id === el.categoria)?.nombre,
      nombre: el.nombre,
      propuesta: el.decision,
      decision: store[el.id] ?? el.decision,
      tocado: !!store[el.id],
    }));
    const csv = [
      "id,categoria,nombre,propuesta,decision,tocado",
      ...rows.map((r) =>
        [r.id, r.categoria, r.nombre, r.propuesta, r.decision, r.tocado]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "decisiones-boda.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-serif text-5xl text-lavanda-700">Modo decisión</h1>
          <p className="italic text-tinta/70 mt-2">
            Marcad qué queréis incluir. Se guarda automáticamente en este dispositivo.
          </p>
        </header>

        <div className="grid grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
          {["Sí", "Quizás", "No"].map((v) => (
            <Stat key={v} label={v} value={stats[v]} />
          ))}
          <Stat label="Sin marcar" value={stats.pendiente} />
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button onClick={exportar} className="px-5 py-2 rounded-full bg-lavanda-600 text-white hover:bg-lavanda-700">
            Exportar CSV
          </button>
          <Link
            href="/?decidir=1"
            className="px-5 py-2 rounded-full border border-lavanda-300 hover:bg-lavanda-50"
          >
            Abrir la web con modo flotante
          </Link>
          <button
            onClick={() => {
              if (confirm("¿Borrar todas las decisiones marcadas?")) clear();
            }}
            className="px-5 py-2 rounded-full border border-red-300 text-red-600 hover:bg-red-50"
          >
            Resetear
          </button>
        </div>

        <div className="space-y-8">
          {elementos.categorias.map((cat) => {
            const items = porCategoria[cat.id];
            if (!items) return null;
            return (
              <section key={cat.id} className="bg-white/70 border border-lavanda-200 rounded-3xl p-5">
                <h2 className="font-serif text-2xl text-lavanda-700 mb-4">
                  {cat.icono} {cat.nombre}
                </h2>
                <ul className="space-y-2">
                  {items.map((el) => {
                    const current = store[el.id] ?? el.decision;
                    return (
                      <li
                        key={el.id}
                        className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 border-b border-lavanda-100 pb-2"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-tinta">{el.nombre}</p>
                          <p className="text-xs text-tinta/60">{el.descripcion}</p>
                        </div>
                        <div className="flex gap-2">
                          {VALORES.map((v) => (
                            <button
                              key={v}
                              onClick={() => set(el.id, v)}
                              className={`px-3 py-1 text-xs rounded-full border transition ${
                                current === v
                                  ? v === "Sí"
                                    ? "bg-green-500 text-white border-green-500"
                                    : v === "Quizás"
                                    ? "bg-amber-400 text-white border-amber-400"
                                    : "bg-red-400 text-white border-red-400"
                                  : "bg-white border-lavanda-200 text-tinta/60 hover:border-lavanda-400"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                          <button
                            onClick={() => set(el.id, null)}
                            className="px-2 py-1 text-xs text-tinta/40 hover:text-tinta"
                            title="Quitar"
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center bg-white/70 rounded-2xl border border-lavanda-200 p-3">
      <p className="text-2xl font-serif text-lavanda-700">{value}</p>
      <p className="text-xs uppercase tracking-widest text-tinta/60">{label}</p>
    </div>
  );
}
