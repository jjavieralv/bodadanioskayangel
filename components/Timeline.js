export default function Timeline({ items }) {
  return (
    <ol className="relative max-w-2xl mx-auto">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-lavanda-200" aria-hidden />
      {items.map((it, i) => (
        <li key={i} className="relative pl-20 py-5">
          <span className="absolute left-0 top-3 w-16 h-16 rounded-full bg-white border-2 border-lavanda-300 flex items-center justify-center text-2xl shadow-soft">
            {it.icono}
          </span>
          <p className="font-serif text-xl text-lavanda-700">{it.hora}</p>
          <p className="text-tinta font-medium">{it.titulo}</p>
          {it.descripcion && (
            <p className="text-sm text-tinta/75 mt-1">{it.descripcion}</p>
          )}
          {it.nota && (
            <p className="text-xs text-lavanda-700/80 italic mt-1">📍 {it.nota}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
