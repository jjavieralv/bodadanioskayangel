/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Genera un sitio 100% estático en la carpeta `out/` (ideal para Cloudflare Pages).
  output: "export",
  // Cada ruta se sirve como carpeta/index.html; evita 404 en hosts estáticos.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;
