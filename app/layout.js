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

export default function RootLayout({ children }) {
  return (
    <html lang="es">
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
