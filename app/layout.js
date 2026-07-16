import "./globals.css";
import { Suspense } from "react";
import site from "@/content/site.json";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OttoFollower from "@/components/OttoFollower";
import DecisionOverlay from "@/components/DecisionOverlay";
import SiteGate from "@/components/SiteGate";

export const metadata = {
  title: `${site.novios.nombres} · ${site.fecha.legible_corto}`,
  description: `Boda de ${site.novios.nombres} el ${site.fecha.legible} en ${site.lugar.ciudad}.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Great+Vibes&family=Mea+Culpa&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <SiteGate>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <OttoFollower />
          <Suspense fallback={null}>
            <DecisionOverlay />
          </Suspense>
        </SiteGate>
      </body>
    </html>
  );
}
