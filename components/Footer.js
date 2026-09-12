import Link from "next/link";
import site from "@/content/site.json";

export default function Footer() {
  return (
    <footer className="no-print mt-16 py-10 border-t border-lavanda-200/50 text-center text-sm text-tinta/60">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <span className="footer-monogram" role="img" aria-label={`Monograma de ${site.novios.nombres}`} />
        <p>
          {site.fecha.legible} · {site.lugar.ciudad}
        </p>
        <p>
          <Link href="/#faq" className="underline decoration-dotted hover:text-lavanda-700">
            FAQ
          </Link>
          {" · "}
          <Link href="/#contacto" className="underline decoration-dotted hover:text-lavanda-700">
            Contacto
          </Link>
          {" · "}
          <a
            href={site.formulario.googleFormUrlPublico}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted hover:text-lavanda-700"
          >
            Confirmar
          </a>
        </p>
        <p className="text-xs opacity-70">
          {site.redes.hashtag} · Hecho con 💜 para Danioska & Ángel
        </p>
      </div>
    </footer>
  );
}
