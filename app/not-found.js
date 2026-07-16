import Link from "next/link";

export const metadata = { title: "404 · Página desaparecida" };

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-4 animate-float">🎩</div>
        <h1 className="font-serif text-6xl text-lavanda-700 mb-2">404</h1>
        <p className="font-serif text-2xl text-tinta mb-3">
          Esta página desapareció como un truco de Ángel
        </p>
        <p className="text-tinta/70 mb-8">
          No te preocupes, Otto la está buscando. Mientras tanto, vuelve al principio del show.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-lavanda-600 text-white hover:bg-lavanda-700"
        >
          Volver al inicio
        </Link>
        <div className="mt-6 text-3xl opacity-60">✨ 🐾 ✨</div>
      </div>
    </div>
  );
}
