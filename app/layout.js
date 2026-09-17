import "./globals.css";
import { Suspense } from "react";
import site from "@/content/site.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OttoFollower from "@/components/OttoFollower";
import DecisionOverlay from "@/components/DecisionOverlay";

export const metadata = {
  title: `${site.novios.nombres} · ${site.fecha.legible_corto}`,
  description: `Boda de ${site.novios.nombres} el ${site.fecha.legible} en ${site.lugar.ciudad}.`,
};

// Red de seguridad para los bloques que aparecen al hacer scroll (Reveal).
// Va en linea dentro del HTML a proposito: si fuese un fichero aparte podria
// no llegar, igual que el resto del JavaScript.
// - Marca la pagina con .js: el CSS solo oculta los bloques si esta la marca,
//   asi que sin JavaScript se ve todo desde el principio.
// - Si a los 4 s Reveal no ha avisado (.js-listo) de que funciona, es que algun
//   fichero no ha llegado: se muestran todos los bloques en su estado final.
const redDeSeguridad = `(function () {
  var html = document.documentElement;
  html.classList.add("js");
  setTimeout(function () {
    if (html.classList.contains("js-listo")) return;
    function mostrar() {
      var bloques = document.querySelectorAll(".reveal");
      for (var i = 0; i < bloques.length; i++) bloques[i].classList.add("is-visible");
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mostrar);
    } else {
      mostrar();
    }
  }, 4000);
})();`;

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: el script de abajo añade clases a <html> antes
    // de que React hidrate, y eso no es un error.
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: redDeSeguridad }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Arapey:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Great+Vibes&family=Mea+Culpa&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
        <OttoFollower />
        <Suspense fallback={null}>
          <DecisionOverlay />
        </Suspense>
      </body>
    </html>
  );
}
