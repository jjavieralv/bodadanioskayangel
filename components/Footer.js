import Link from "next/link";
import site from "@/content/site.json";

export default function Footer() {
  return (
    <footer className="no-print mt-16 py-10 border-t border-lavanda-200/50 text-center text-sm text-tinta/60">
      <div className="max-w-4xl mx-auto px-4 space-y-3">
        <p className="font-serif text-3xl text-lavanda-700 tracking-wide">
          {site.novios.iniciales}
        </p>
        <p>
          {site.fecha.legible} · {site.lugar.ciudad}
        </p>
        <p>
          <Link href="/decidir" className="underline decoration-dotted hover:text-lavanda-700">
            Modo decisión
          </Link>
          {" · "}
          <Link href="/#faq" className="underline decoration-dotted hover:text-lavanda-700">
            FAQ
          </Link>
          {" · "}
          <Link href="/#rsvp" className="underline decoration-dotted hover:text-lavanda-700">
            Confirmar
          </Link>
        </p>
        <p className="text-xs opacity-70">
          {site.redes.hashtag} · Hecho con 💜 para Dani y Ángel
        </p>
      </div>
    </footer>
  );
}
