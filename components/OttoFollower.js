"use client";
import { useEffect, useRef } from "react";

const STATE = { CHASE: "chase", GRAB: "grab", SLEEP: "sleep" };

// Siluetas del diseño "vectorial peludo". Se generan con scripts/otto/, donde
// cada pieza es el contorno de una elipse con el radio ondulado: por eso el
// borde parece pelo rizado y no un circulo liso.
const D_CUERPO =
  "M65.31 45.66L64.83 46.76L64.44 47.65L64.13 48.32L63.90 48.77L63.75 49.00L63.60 49.23L63.43 49.45L63.24 49.67L63.05 49.88L62.64 50.22L62.02 50.68L61.18 51.25L60.14 51.95L59.30 52.53L58.69 52.98L58.28 53.30L58.09 53.51L57.83 53.85L57.49 54.34L57.08 54.96L56.59 55.73L56.17 56.37L55.79 56.87L55.48 57.23L55.22 57.45L54.95 57.66L54.65 57.85L54.33 58.02L54.00 58.18L53.59 58.31L53.11 58.43L52.56 58.52L51.95 58.60L51.12 58.62L50.09 58.58L48.85 58.49L47.41 58.34L45.96 58.25L44.51 58.24L43.05 58.29L41.59 58.41L40.35 58.50L39.34 58.55L38.55 58.57L37.98 58.55L37.09 58.46L35.87 58.30L34.32 58.07L32.43 57.76L30.88 57.50L29.66 57.27L28.76 57.08L28.19 56.94L27.65 56.76L27.15 56.55L26.67 56.31L26.22 56.05L25.84 55.79L25.53 55.53L25.27 55.28L25.08 55.04L24.92 54.79L24.77 54.53L24.65 54.26L24.54 53.98L24.43 53.64L24.32 53.24L24.21 52.77L24.09 52.23L23.97 51.78L23.86 51.40L23.74 51.10L23.62 50.88L23.49 50.67L23.33 50.46L23.15 50.26L22.95 50.07L22.62 49.81L22.15 49.49L21.54 49.09L20.80 48.63L20.19 48.23L19.69 47.89L19.31 47.61L19.05 47.39L18.82 47.16L18.61 46.93L18.42 46.69L18.26 46.45L18.13 46.20L18.02 45.95L17.94 45.69L17.89 45.43L17.86 45.17L17.86 44.91L17.87 44.65L17.91 44.39L17.97 44.13L18.04 43.87L18.12 43.62L18.21 43.36L18.38 42.96L18.62 42.40L18.93 41.70L19.31 40.85L19.66 40.13L19.97 39.53L20.24 39.07L20.47 38.72L20.71 38.42L20.94 38.15L21.16 37.91L21.39 37.70L21.76 37.42L22.28 37.07L22.94 36.63L23.76 36.12L24.42 35.70L24.94 35.35L25.30 35.08L25.51 34.89L25.79 34.57L26.14 34.10L26.55 33.49L27.02 32.75L27.47 32.10L27.88 31.55L28.27 31.10L28.63 30.74L28.98 30.44L29.33 30.18L29.67 29.98L30.00 29.82L30.41 29.69L30.89 29.57L31.44 29.48L32.05 29.40L32.88 29.38L33.91 29.42L35.15 29.51L36.59 29.66L38.04 29.75L39.49 29.76L40.95 29.71L42.41 29.59L43.65 29.50L44.66 29.45L45.45 29.43L46.02 29.45L46.96 29.55L48.28 29.73L49.98 29.99L52.06 30.33L53.75 30.64L55.06 30.90L55.98 31.13L56.52 31.31L57.00 31.49L57.41 31.68L57.75 31.87L58.03 32.06L58.28 32.27L58.52 32.49L58.73 32.72L58.92 32.96L59.08 33.21L59.23 33.47L59.35 33.74L59.46 34.02L59.57 34.36L59.68 34.76L59.79 35.23L59.91 35.77L60.03 36.22L60.14 36.60L60.26 36.90L60.38 37.12L60.51 37.33L60.67 37.54L60.85 37.74L61.05 37.93L61.38 38.19L61.85 38.51L62.46 38.91L63.20 39.37L63.84 39.80L64.38 40.20L64.83 40.57L65.18 40.91L65.47 41.23L65.70 41.52L65.87 41.80L65.98 42.05L66.05 42.34L66.09 42.66L66.09 43.02L66.07 43.41L65.93 43.98L65.67 44.73Z";
const D_CABEZA =
  "M85.69 28.38L85.68 28.63L85.66 28.88L85.62 29.13L85.56 29.37L85.49 29.62L85.31 30.08L85.01 30.76L84.60 31.66L84.08 32.77L83.51 33.80L82.89 34.76L82.23 35.64L81.52 36.45L80.88 37.25L80.30 38.05L79.78 38.85L79.33 39.64L78.94 40.28L78.61 40.77L78.35 41.10L78.15 41.27L77.94 41.43L77.72 41.56L77.48 41.68L77.24 41.77L76.98 41.84L76.72 41.90L76.45 41.93L76.17 41.94L75.79 41.92L75.31 41.87L74.73 41.78L74.05 41.66L73.48 41.57L73.03 41.51L72.68 41.48L72.44 41.48L72.09 41.55L71.61 41.67L71.02 41.85L70.32 42.10L69.69 42.30L69.15 42.45L68.68 42.57L68.30 42.63L67.92 42.67L67.54 42.67L67.16 42.65L66.78 42.59L66.41 42.51L66.04 42.42L65.68 42.31L65.32 42.17L64.91 42.01L64.45 41.81L63.93 41.58L63.36 41.32L62.85 41.07L62.41 40.83L62.04 40.61L61.73 40.39L61.46 40.18L61.23 39.98L61.03 39.78L60.86 39.59L60.63 39.27L60.32 38.82L59.95 38.23L59.50 37.51L58.98 36.84L58.38 36.21L57.69 35.64L56.93 35.11L56.32 34.66L55.84 34.30L55.52 34.02L55.34 33.82L55.18 33.61L55.04 33.39L54.93 33.15L54.83 32.92L54.77 32.64L54.73 32.32L54.73 31.96L54.76 31.56L54.83 31.08L54.96 30.51L55.13 29.85L55.36 29.11L55.52 28.35L55.62 27.57L55.65 26.76L55.61 25.94L55.60 25.26L55.59 24.72L55.60 24.34L55.63 24.10L55.68 23.80L55.77 23.45L55.89 23.04L56.04 22.58L56.24 22.04L56.50 21.41L56.81 20.70L57.17 19.91L57.51 19.25L57.81 18.71L58.10 18.30L58.35 18.02L58.60 17.78L58.84 17.57L59.07 17.41L59.30 17.28L59.66 17.14L60.16 16.98L60.79 16.81L61.56 16.62L62.18 16.46L62.67 16.32L63.02 16.20L63.23 16.10L63.55 15.86L63.98 15.49L64.53 14.97L65.19 14.32L65.77 13.79L66.28 13.39L66.72 13.11L67.09 12.95L67.46 12.83L67.84 12.77L68.23 12.75L68.63 12.78L69.11 12.88L69.68 13.03L70.33 13.25L71.07 13.53L71.82 13.79L72.60 14.03L73.40 14.25L74.22 14.46L75.18 14.76L76.27 15.18L77.49 15.70L78.85 16.32L79.93 16.83L80.72 17.21L81.23 17.47L81.46 17.60L81.67 17.75L81.87 17.92L82.07 18.09L82.24 18.27L82.41 18.47L82.55 18.68L82.68 18.91L82.78 19.14L82.88 19.58L82.97 20.21L83.04 21.04L83.11 22.06L83.18 22.88L83.26 23.50L83.35 23.91L83.45 24.12L83.62 24.40L83.87 24.77L84.19 25.22L84.58 25.74L84.91 26.23L85.18 26.68L85.37 27.08L85.50 27.45L85.60 27.79L85.66 28.10Z";
const D_HOCICO =
  "M91.44 33.43L91.41 33.71L91.35 34.00L91.28 34.28L91.19 34.56L91.08 34.83L90.96 35.09L90.84 35.33L90.70 35.56L90.56 35.77L90.40 35.99L90.21 36.21L90.00 36.43L89.78 36.66L89.53 36.88L89.28 37.08L89.01 37.28L88.73 37.47L88.44 37.64L88.14 37.81L87.82 37.96L87.50 38.10L87.17 38.23L86.83 38.34L86.48 38.44L86.13 38.53L85.77 38.61L85.41 38.67L85.05 38.72L84.68 38.75L84.31 38.77L83.94 38.77L83.57 38.76L83.20 38.74L82.83 38.70L82.47 38.65L82.11 38.58L81.75 38.51L81.40 38.41L81.06 38.31L80.72 38.19L80.39 38.05L80.07 37.91L79.76 37.75L79.46 37.59L79.17 37.41L78.90 37.21L78.63 37.01L78.38 36.80L78.15 36.58L77.92 36.35L77.72 36.12L77.52 35.87L77.35 35.62L77.19 35.36L77.05 35.10L76.92 34.83L76.81 34.56L76.72 34.28L76.65 34.00L76.59 33.71L76.56 33.43L76.54 33.14L76.54 32.86L76.56 32.57L76.59 32.29L76.64 32.01L76.70 31.76L76.78 31.51L76.86 31.28L76.97 31.04L77.09 30.80L77.24 30.55L77.41 30.29L77.59 30.04L77.78 29.80L78.00 29.57L78.22 29.34L78.47 29.12L78.72 28.92L78.99 28.72L79.27 28.53L79.56 28.36L79.86 28.19L80.18 28.04L80.50 27.90L80.83 27.77L81.17 27.66L81.52 27.56L81.87 27.47L82.23 27.39L82.59 27.33L82.95 27.28L83.32 27.25L83.69 27.23L84.06 27.23L84.43 27.24L84.80 27.26L85.17 27.30L85.53 27.35L85.89 27.42L86.25 27.49L86.60 27.59L86.94 27.69L87.28 27.81L87.61 27.95L87.93 28.09L88.24 28.25L88.54 28.41L88.83 28.59L89.10 28.79L89.37 28.99L89.62 29.20L89.85 29.42L90.08 29.65L90.28 29.88L90.48 30.13L90.65 30.38L90.81 30.64L90.95 30.90L91.08 31.17L91.19 31.44L91.28 31.72L91.35 32.00L91.41 32.29L91.44 32.57L91.46 32.86L91.46 33.14Z";
const D_OREJA_N =
  "M64.93 29.81L64.93 30.34L64.91 30.89L64.85 31.44L64.76 32.00L64.64 32.57L64.46 33.19L64.22 33.87L63.92 34.59L63.57 35.37L63.21 36.22L62.86 37.17L62.52 38.19L62.17 39.30L61.88 40.18L61.63 40.84L61.44 41.26L61.29 41.46L61.14 41.62L60.98 41.74L60.82 41.82L60.66 41.86L60.48 41.84L60.30 41.77L60.11 41.66L59.91 41.49L59.66 41.20L59.37 40.80L59.03 40.28L58.65 39.65L58.25 39.07L57.83 38.55L57.40 38.08L56.96 37.67L56.59 37.29L56.31 36.95L56.10 36.63L55.97 36.36L55.85 36.05L55.75 35.73L55.66 35.37L55.58 34.99L55.52 34.58L55.47 34.12L55.44 33.61L55.42 33.07L55.44 32.37L55.49 31.51L55.57 30.49L55.68 29.32L55.77 28.08L55.84 26.79L55.89 25.42L55.92 24.00L55.97 22.82L56.03 21.87L56.11 21.16L56.22 20.69L56.32 20.29L56.42 19.95L56.51 19.68L56.61 19.48L56.72 19.30L56.82 19.14L56.93 19.00L57.05 18.87L57.17 18.76L57.29 18.67L57.41 18.60L57.54 18.54L57.73 18.49L57.98 18.43L58.29 18.38L58.67 18.33L59.08 18.21L59.51 18.00L59.97 17.71L60.46 17.35L60.85 17.08L61.16 16.90L61.37 16.81L61.50 16.82L61.62 16.85L61.75 16.90L61.87 16.97L61.99 17.06L62.10 17.18L62.21 17.31L62.32 17.47L62.42 17.65L62.53 17.88L62.63 18.14L62.73 18.44L62.84 18.79L62.96 19.33L63.10 20.06L63.25 20.99L63.42 22.12L63.61 23.18L63.82 24.19L64.05 25.15L64.29 26.04L64.49 26.81L64.65 27.46L64.76 27.99L64.82 28.39L64.88 28.83L64.91 29.30Z";
const D_OREJA_L =
  "M68.19 28.30L68.19 28.74L68.17 29.19L68.12 29.64L68.05 30.10L67.94 30.57L67.79 31.08L67.59 31.63L67.33 32.22L67.03 32.86L66.73 33.56L66.43 34.34L66.14 35.18L65.85 36.09L65.60 36.81L65.39 37.35L65.22 37.70L65.10 37.86L64.97 37.99L64.83 38.09L64.70 38.15L64.56 38.18L64.41 38.17L64.26 38.11L64.09 38.02L63.92 37.88L63.71 37.65L63.47 37.32L63.18 36.89L62.85 36.37L62.51 35.90L62.16 35.47L61.79 35.09L61.41 34.75L61.10 34.44L60.86 34.16L60.69 33.90L60.58 33.67L60.48 33.42L60.39 33.15L60.31 32.87L60.24 32.56L60.19 32.21L60.15 31.83L60.12 31.42L60.11 30.98L60.12 30.40L60.16 29.70L60.23 28.86L60.33 27.90L60.41 26.89L60.47 25.82L60.51 24.71L60.53 23.54L60.57 22.57L60.63 21.79L60.70 21.21L60.78 20.83L60.89 20.47L61.03 20.14L61.19 19.85L61.37 19.58L61.53 19.37L61.68 19.21L61.80 19.11L61.91 19.06L62.07 19.02L62.28 18.98L62.55 18.93L62.87 18.89L63.22 18.79L63.59 18.62L63.98 18.39L64.39 18.09L64.72 17.86L64.98 17.72L65.17 17.65L65.27 17.65L65.38 17.67L65.48 17.71L65.59 17.77L65.69 17.85L65.79 17.95L65.88 18.06L65.97 18.19L66.06 18.34L66.15 18.52L66.23 18.74L66.32 18.98L66.41 19.27L66.51 19.71L66.63 20.31L66.76 21.07L66.91 22.00L67.09 22.95L67.29 23.95L67.53 24.98L67.79 26.04L67.99 26.95L68.12 27.70Z";
const D_COLA =
  "M27.57 29.50L27.58 29.84L27.55 30.17L27.47 30.49L27.35 30.80L27.19 31.10L26.90 31.46L26.48 31.88L25.94 32.36L25.28 32.90L24.64 33.46L24.04 34.06L23.46 34.68L22.92 35.33L22.47 35.84L22.11 36.23L21.84 36.48L21.66 36.60L21.48 36.70L21.29 36.79L21.09 36.87L20.88 36.94L20.68 36.99L20.47 37.03L20.25 37.05L20.04 37.06L19.82 37.05L19.61 37.03L19.39 37.00L19.18 36.95L18.83 36.80L18.35 36.56L17.73 36.23L16.98 35.80L16.21 35.41L15.43 35.05L14.62 34.73L13.79 34.45L13.11 34.19L12.56 33.93L12.15 33.69L11.88 33.46L11.66 33.23L11.47 32.99L11.31 32.75L11.20 32.50L11.12 32.23L11.06 31.93L11.03 31.62L11.03 31.27L11.08 30.85L11.18 30.35L11.32 29.76L11.50 29.10L11.64 28.44L11.74 27.80L11.79 27.17L11.79 26.56L11.80 26.02L11.83 25.58L11.86 25.22L11.91 24.95L11.96 24.70L12.03 24.47L12.11 24.26L12.20 24.07L12.30 23.89L12.41 23.72L12.54 23.56L12.68 23.41L12.83 23.27L12.99 23.13L13.17 23.01L13.35 22.90L13.54 22.81L13.74 22.72L13.94 22.65L14.15 22.58L14.51 22.52L15.01 22.47L15.67 22.41L16.48 22.36L17.29 22.27L18.11 22.13L18.95 21.95L19.79 21.72L20.48 21.55L21.01 21.44L21.39 21.38L21.61 21.39L21.82 21.40L22.04 21.44L22.25 21.48L22.45 21.54L22.65 21.61L22.85 21.70L23.03 21.80L23.21 21.91L23.39 22.05L23.57 22.21L23.75 22.40L23.93 22.62L24.14 22.96L24.38 23.42L24.65 24.00L24.95 24.70L25.28 25.36L25.65 26.00L26.04 26.59L26.46 27.15L26.81 27.63L27.08 28.04L27.27 28.37L27.39 28.62L27.48 28.89L27.54 29.19Z";
const D_PATA_L =
  "M29.50 48.50L29.54 47.94L29.64 47.38L29.82 46.84L30.06 46.33L30.36 45.85L30.72 45.42L31.13 45.03L31.59 44.70L32.08 44.43L32.61 44.22L33.16 44.08L33.72 44.01L34.28 44.01L34.84 44.08L35.39 44.22L35.92 44.43L36.41 44.70L36.87 45.03L37.28 45.42L37.64 45.85L37.94 46.33L38.18 46.84L38.36 47.38L38.46 47.94L38.50 48.50L38.50 57.50L38.46 58.06L38.36 58.62L38.18 59.16L37.94 59.67L37.64 60.15L37.28 60.58L36.87 60.97L36.41 61.30L35.92 61.57L35.39 61.78L34.84 61.92L34.28 61.99L33.72 61.99L33.16 61.92L32.61 61.78L32.08 61.57L31.59 61.30L31.13 60.97L30.72 60.58L30.36 60.15L30.06 59.67L29.82 59.16L29.64 58.62L29.54 58.06L29.50 57.50Z";
const D_PATA_N =
  "M24.00 49.00L24.04 48.37L24.16 47.76L24.35 47.16L24.62 46.59L24.95 46.06L25.36 45.58L25.81 45.15L26.32 44.78L26.87 44.48L27.45 44.24L28.06 44.09L28.69 44.01L29.31 44.01L29.94 44.09L30.55 44.24L31.13 44.48L31.68 44.78L32.19 45.15L32.64 45.58L33.05 46.06L33.38 46.59L33.65 47.16L33.84 47.76L33.96 48.37L34.00 49.00L34.00 60.00L33.96 60.63L33.84 61.24L33.65 61.84L33.38 62.41L33.05 62.94L32.64 63.42L32.19 63.85L31.68 64.22L31.13 64.52L30.55 64.76L29.94 64.91L29.31 64.99L28.69 64.99L28.06 64.91L27.45 64.76L26.87 64.52L26.32 64.22L25.81 63.85L25.36 63.42L24.95 62.94L24.62 62.41L24.35 61.84L24.16 61.24L24.04 60.63L24.00 60.00Z";
const D_PATA_L2 =
  "M49.50 48.50L49.54 47.94L49.64 47.38L49.82 46.84L50.06 46.33L50.36 45.85L50.72 45.42L51.13 45.03L51.59 44.70L52.08 44.43L52.61 44.22L53.16 44.08L53.72 44.01L54.28 44.01L54.84 44.08L55.39 44.22L55.92 44.43L56.41 44.70L56.87 45.03L57.28 45.42L57.64 45.85L57.94 46.33L58.18 46.84L58.36 47.38L58.46 47.94L58.50 48.50L58.50 57.50L58.46 58.06L58.36 58.62L58.18 59.16L57.94 59.67L57.64 60.15L57.28 60.58L56.87 60.97L56.41 61.30L55.92 61.57L55.39 61.78L54.84 61.92L54.28 61.99L53.72 61.99L53.16 61.92L52.61 61.78L52.08 61.57L51.59 61.30L51.13 60.97L50.72 60.58L50.36 60.15L50.06 59.67L49.82 59.16L49.64 58.62L49.54 58.06L49.50 57.50Z";
const D_PATA_N2 =
  "M44.00 49.00L44.04 48.37L44.16 47.76L44.35 47.16L44.62 46.59L44.95 46.06L45.36 45.58L45.81 45.15L46.32 44.78L46.87 44.48L47.45 44.24L48.06 44.09L48.69 44.01L49.31 44.01L49.94 44.09L50.55 44.24L51.13 44.48L51.68 44.78L52.19 45.15L52.64 45.58L53.05 46.06L53.38 46.59L53.65 47.16L53.84 47.76L53.96 48.37L54.00 49.00L54.00 60.00L53.96 60.63L53.84 61.24L53.65 61.84L53.38 62.41L53.05 62.94L52.64 63.42L52.19 63.85L51.68 64.22L51.13 64.52L50.55 64.76L49.94 64.91L49.31 64.99L48.69 64.99L48.06 64.91L47.45 64.76L46.87 64.52L46.32 64.22L45.81 63.85L45.36 63.42L44.95 62.94L44.62 62.41L44.35 61.84L44.16 61.24L44.04 60.63L44.00 60.00Z";

const PELO = "#fffdfb";
const LINEA = "#6b4f8a";
const LEJOS = "#e6dcef";          // lado en sombra, da profundidad
const LINEA_L = "#a08fc4";
const OREJA_TINTE = "#f1e9f6";    // sin tinte, oreja blanca sobre cabeza blanca
const OSCURO = "#241a33";
const NARIZ = "#b0796e";
const ROJO = "#d4483f";

// Pivotes de cada pieza. Si cambias el dibujo, actualiza tambien esto.
const P_CABEZA = [70, 28];
const P_OREJA_N = [63, 20];
const P_OREJA_L = [66, 19];
const P_COLA = [26, 34];
const P_PATAS = [[34, 46], [29, 46], [54, 46], [49, 46]];   // L1 N1 L2 N2

// Postura final al dormir (R1, "tumbado") y como se cierran los ojos
// (C2, "se va quedando dormido"): cabecea y los reabre antes de caer.
const DORMIR = {
  patas: [72, 72, -72, -72],
  baja: 8,
  cabeza: 15,
  cabezaDy: 8,
};

const lim = (v) => Math.max(0, Math.min(1, v));
const suave = (x) => { const t = lim(x); return t * t * (3 - 2 * t); };

// Muelle amortiguado: la pieza persigue al objetivo con retardo y se pasa de
// frenada. Es lo que convierte el movimiento de metronomo en algo vivo.
function muelle(m, objetivo, k, roce, frame) {
  m.vel += ((objetivo - m.pos) * k - m.vel * roce) * frame;
  m.pos += m.vel * frame;
}

export default function OttoFollower() {
  const wrapRef = useRef(null);
  const bodyRef = useRef(null);
  const sombraRef = useRef(null);
  const cuerpoRef = useRef(null);
  const headRef = useRef(null);
  const tailRef = useRef(null);
  const earNRef = useRef(null);
  const earLRef = useRef(null);
  const ojoRef = useRef(null);
  const lidRef = useRef(null);
  const zetasRef = useRef(null);
  const z0 = useRef(null);
  const z1 = useRef(null);
  const z2 = useRef(null);
  const leg0 = useRef(null);
  const leg1 = useRef(null);
  const leg2 = useRef(null);
  const leg3 = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Otto solo se dibuja en pantallas md+ y con raton. Fuera de ahi no se monta
    // ni el bucle de animacion ni el listener, para no gastar bateria en movil.
    if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) {
      return;
    }

    // Mientras lleva el cursor en la boca se esconde el puntero real. Vuelve en
    // cuanto el visitante mueve el raton, porque eso saca del estado GRAB.
    const hideStyle = document.createElement("style");
    hideStyle.textContent = "*, *::before, *::after { cursor: none !important; }";

    const legRefs = [leg0, leg1, leg2, leg3];
    const legPhase = [0, Math.PI, Math.PI, 0];   // trote: las cruzadas a la vez

    // De pie las patas van DELANTE del cuerpo (si no, no se ven). Tumbado van
    // DETRAS, para que solo asomen las pezuñas en vez de quedar como muñones.
    // Guardamos un marcador en el sitio original de cada una: restaurar por
    // nextSibling falla en cuanto una pata ya se ha movido.
    const marcas = legRefs.map((r) => {
      const el = r.current;
      if (!el || !el.parentNode) return null;
      const m = document.createElementNS("http://www.w3.org/2000/svg", "g");
      el.parentNode.insertBefore(m, el.nextSibling);
      return m;
    });
    let patasDetras = false;
    function ordenarPatas(detras) {
      if (detras === patasDetras || !cuerpoRef.current) return;
      patasDetras = detras;
      const padre = cuerpoRef.current.parentNode;
      legRefs.forEach((r, i) => {
        if (!r.current) return;
        padre.insertBefore(r.current, detras ? cuerpoRef.current : marcas[i]);
      });
    }

    const s = {
      x: -120,
      y: window.innerHeight - 80,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      facing: 1,
      bodyAngle: 0,
      lastMove: 0,
      cursorX: window.innerWidth / 2,
      cursorY: window.innerHeight / 2,
      state: STATE.CHASE,
      stateStart: 0,
      wanderTx: 0,
      wanderTy: 0,
      nextWander: 0,
      runPhase: 0,
      visible: false,
      sleepAmt: 0,
      raf: 0,
    };

    const m = {
      orejaN: { pos: 0, vel: 0 },
      orejaL: { pos: 0, vel: 0 },
      cola: { pos: 0, vel: 0 },
    };

    function pickWander(now) {
      const b = 120;
      s.wanderTx = b + Math.random() * Math.max(0, window.innerWidth - 2 * b);
      s.wanderTy = b + Math.random() * Math.max(0, window.innerHeight - 2 * b);
      s.nextWander = now + 2400 + Math.random() * 1800;
    }

    function setState(ns, now) {
      if (s.state === ns) return;
      const prev = s.state;
      s.state = ns;
      s.stateStart = now;
      if (prev === STATE.GRAB && ns !== STATE.GRAB) {
        if (hideStyle.parentNode) hideStyle.remove();
        if (cursorRef.current) cursorRef.current.style.opacity = "0";
      }
      if (ns === STATE.GRAB) {
        document.head.appendChild(hideStyle);
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
        pickWander(now);
      }
    }

    const onMove = (e) => {
      const now = performance.now();
      s.cursorX = e.clientX;
      s.cursorY = e.clientY;
      s.lastMove = now;
      if (!s.visible && wrapRef.current) {
        s.visible = true;
        wrapRef.current.style.opacity = "1";
      }
      if (s.state !== STATE.CHASE) setState(STATE.CHASE, now);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Coloca una pieza girada (y opcionalmente desplazada) sobre su pivote.
    function poner(el, [px, py], rot, dy) {
      if (!el) return;
      el.setAttribute(
        "transform",
        `translate(0 ${dy || 0}) translate(${px} ${py}) rotate(${rot}) translate(${-px} ${-py})`
      );
    }

    let last = performance.now();
    const tick = (now) => {
      const elapsed = Math.min(40, now - last);
      last = now;
      const frame = elapsed / 16.67;

      const dt = now - s.lastMove;
      const distToCursor = Math.hypot(s.cursorX - s.x, s.cursorY - s.y);

      if (s.state === STATE.CHASE) {
        if (s.visible && dt > 2000 && distToCursor < 60) setState(STATE.GRAB, now);
      } else if (s.state === STATE.GRAB) {
        if (dt > 10000) setState(STATE.SLEEP, now);
        else if (now > s.nextWander) pickWander(now);
      }

      if (s.state === STATE.CHASE) {
        s.tx = s.cursorX;
        s.ty = s.cursorY;
      } else if (s.state === STATE.GRAB) {
        s.tx = s.wanderTx;
        s.ty = s.wanderTy;
      }

      const dx = s.tx - s.x;
      const dy = s.ty - s.y;
      const dist = Math.hypot(dx, dy);

      let ease;
      if (s.state === STATE.SLEEP) ease = 0;
      else if (s.state === STATE.GRAB) ease = 0.05;
      else ease = Math.min(0.13, 0.07 + dist / 3000);

      const vx = dx * ease;
      const vy = dy * ease;
      s.x += vx * frame;
      s.y += vy * frame;

      const speed = Math.hypot(vx, vy);
      if (Math.abs(vx) > 0.5) s.facing = vx > 0 ? 1 : -1;
      const moving = speed > 0.4;
      const running = speed > 1.8;
      const avance = vx * s.facing;

      const targetTilt = Math.min(8, speed * 0.6);
      s.bodyAngle += (targetTilt - s.bodyAngle) * 0.12 * frame;
      s.runPhase += (moving ? 0.18 + speed * 0.025 : 0.025) * frame;

      if (s.state === STATE.SLEEP) s.sleepAmt = Math.min(1, s.sleepAmt + 0.012 * frame);
      else s.sleepAmt = Math.max(0, s.sleepAmt - 0.05 * frame);
      const k = suave(s.sleepAmt);          // 0 = de pie, 1 = tumbado del todo

      // Se va quedando dormido: los ojos se cierran poco a poco pero los reabre
      // de golpe un par de veces, con un tiron de cabeza, hasta que cae.
      const sacudida =
        s.sleepAmt > 0.05 && s.sleepAmt < 0.95
          ? Math.max(0, Math.sin(s.sleepAmt * Math.PI * 3)) * (1 - s.sleepAmt)
          : 0;
      const ojosCerrados = lim(suave((s.sleepAmt - 0.25) / 0.5) - sacudida * 0.8);

      ordenarPatas(k > 0.12);

      const tope = (v, t) => Math.max(-t, Math.min(t, v));
      const swingAmp = moving ? Math.min(20, 6 + speed * 3.5) : 0;
      for (let i = 0; i < 4; i++) {
        const swing = Math.sin(s.runPhase + legPhase[i]) * swingAmp * (1 - k);
        poner(legRefs[i].current, P_PATAS[i], swing + DORMIR.patas[i] * k, 2 * k);
      }

      // Orejas: persiguen al cuerpo con retardo, no oscilan solas. Al dormir caen.
      muelle(m.orejaN, tope(-avance * 5, 38) * (1 - k) + 11 * k, 0.055, 0.26, frame);
      muelle(m.orejaL, tope(-avance * 4, 30) * (1 - k) + 8 * k, 0.05, 0.28, frame);
      poner(earNRef.current, P_OREJA_N, m.orejaN.pos, 0);
      poner(earLRef.current, P_OREJA_L, m.orejaL.pos, 0);

      // La cola menea a proposito (dice el humor); el muelle pone el latigazo.
      let rate, amp;
      if (k > 0.5) { rate = 1.5; amp = 4; }
      else if (s.state === STATE.GRAB) { rate = 18; amp = 26; }
      else if (running) { rate = 26; amp = 29; }
      else if (moving) { rate = 14; amp = 21; }
      else { rate = 6; amp = 17; }
      muelle(m.cola, tope(-avance * 3, 22) * (1 - k), 0.06, 0.3, frame);
      poner(tailRef.current, P_COLA, Math.sin((now * rate) / 1000) * amp + m.cola.pos, 0);

      // Cabeza: mira al cursor de pie; al dormir baja y da tirones al cabecear.
      if (k < 0.05) {
        const lookY = Math.max(-7, Math.min(6, dy * 0.04 * s.facing));
        const bob = moving ? Math.sin(s.runPhase * 2) * 0.9 : 0;
        poner(headRef.current, P_CABEZA, lookY, bob);
      } else {
        poner(headRef.current, P_CABEZA,
              DORMIR.cabeza * k - 11 * sacudida, DORMIR.cabezaDy * k);
      }

      // Cerrar el ojo es OCULTARLO: el parpado es un arco dibujado encima y por
      // si solo no tapa nada.
      if (ojoRef.current) ojoRef.current.setAttribute("opacity", String(1 - ojosCerrados));
      if (lidRef.current) lidRef.current.setAttribute("opacity", String(ojosCerrados));

      if (zetasRef.current) {
        zetasRef.current.setAttribute("opacity", (lim(ojosCerrados - 0.25) * 1.4).toFixed(2));
        [z0, z1, z2].forEach((r, i) => {
          if (!r.current) return;
          const c = ((now / 2600) + i * 0.33) % 1;
          r.current.setAttribute("opacity", (1 - c).toFixed(2));
          r.current.setAttribute("transform",
            `translate(${(c * 4).toFixed(1)} ${(-c * 10).toFixed(1)})`);
        });
      }

      const breathe = k > 0.5 ? Math.sin(now / 1400) * 1.8 : Math.sin(now / 900) * 0.7;
      const trote = moving ? Math.abs(Math.sin(s.runPhase)) * Math.min(3.2, speed * 0.9) * (1 - k) : 0;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${s.x - 50}px, ${
          s.y - 40 + DORMIR.baja * k + breathe - trote
        }px, 0)`;
      }

      // Nada de deformar la figura: se veia achatada al correr y al tumbarse.
      // Solo se voltea para mirar al otro lado y se inclina un poco al trotar.
      if (bodyRef.current) {
        const ang = (1 - k) * s.bodyAngle;
        bodyRef.current.style.transform = `scaleX(${s.facing}) rotate(${ang}deg)`;
      }
      if (sombraRef.current) {
        // La sombra vive fuera del grupo que rota: se queda plana en el suelo.
        // Se escala con el atributo transform de SVG y no con CSS, porque el
        // transform-box por defecto de los SVG no es igual en todos los navegadores.
        const e = 1 - trote * 0.05 + k * 0.1;   // la sombra si crece al tumbarse
        sombraRef.current.setAttribute(
          "transform", `translate(46 67) scale(${e.toFixed(3)}) translate(-46 -67)`);
      }

      if (cursorRef.current && s.state === STATE.GRAB) {
        cursorRef.current.style.transform =
          `translate3d(${s.x + 40 * s.facing - 4}px, ${s.y - 4}px, 0)`;
      }

      s.raf = requestAnimationFrame(tick);
    };

    s.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(s.raf);
      // Sin esto, desmontar en pleno GRAB dejaria la pagina sin cursor.
      if (hideStyle.parentNode) hideStyle.remove();
    };
  }, []);

  const silueta = { fill: PELO, stroke: LINEA, strokeWidth: 2.2, strokeLinejoin: "round" };
  const lejos = { fill: LEJOS, stroke: LINEA_L, strokeWidth: 2.2, strokeLinejoin: "round" };

  return (
    <>
      <div
        ref={wrapRef}
        aria-hidden
        className="no-print fixed top-0 left-0 pointer-events-none z-30 hidden md:block transition-opacity duration-500"
        style={{ opacity: 0, willChange: "transform" }}
      >
        {/* La sombra va en su propio svg, fuera del grupo que rota y se aplasta,
            para que se quede plana en el suelo. Posicion absoluta y no margen
            negativo: los <svg> son inline y el interlineado descuadraria la capa. */}
        <svg
          width="100"
          height="72"
          viewBox="0 0 100 72"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0"
        >
          <ellipse ref={sombraRef} cx="46" cy="67" rx="26" ry="3" fill="#6b3878" opacity="0.15" />
        </svg>
        <div ref={bodyRef} style={{ transformOrigin: "46px 67px", willChange: "transform" }}>
          <svg
            width="100"
            height="72"
            viewBox="0 0 100 72"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            {/* lado lejano, en sombra */}
            <g ref={leg0}><path d={D_PATA_L} {...lejos} /></g>
            <g ref={leg2}><path d={D_PATA_L2} {...lejos} /></g>
            <g ref={tailRef}><path d={D_COLA} {...silueta} /></g>

            <g ref={cuerpoRef}><path d={D_CUERPO} {...silueta} /></g>
            <path d="M53.5 33 Q57 41.5 62.5 46.5" stroke={ROJO} strokeWidth="5"
                  fill="none" strokeLinecap="round" />

            <g ref={leg1}><path d={D_PATA_N} {...silueta} /></g>
            <g ref={leg3}><path d={D_PATA_N2} {...silueta} /></g>

            <g ref={headRef}>
              <g ref={earLRef}><path d={D_OREJA_L} {...lejos} /></g>
              <path d={D_CABEZA} {...silueta} />
              <path d={D_HOCICO} {...silueta} />
              <g ref={ojoRef}>
                <circle cx="73" cy="25" r="3.4" fill={OSCURO} />
                <circle cx="74" cy="24" r="1.09" fill="#fff" />
              </g>
              <path ref={lidRef} d="M69.0 25 Q73 29.6 77.0 25" fill="none"
                    stroke={OSCURO} strokeWidth="1.5" strokeLinecap="round" opacity="0" />
              <ellipse cx="89" cy="31" rx="2.8" ry="2.3" fill={NARIZ} />
              <path d="M89 33.3 v1.6 M89 34.9 q-2.4 1.9 -4.2 -0.3" fill="none"
                    stroke={OSCURO} strokeWidth="1.2" strokeLinecap="round" />
              <g ref={earNRef}><path d={D_OREJA_N} {...silueta} fill={OREJA_TINTE} /></g>
            </g>

            {/* Las "z" son trazos, no texto: asi no dependen de la fuente del visitante. */}
            <g ref={zetasRef} opacity="0" fill="none" stroke={LINEA_L}
               strokeLinecap="round" strokeLinejoin="round">
              <path ref={z0} d="M74 20 h3.6 l-3.6 4 h3.6" strokeWidth="1.4" />
              <path ref={z1} d="M80 13 h4.6 l-4.6 5 h4.6" strokeWidth="1.7" />
              <path ref={z2} d="M87 4 h5.6 l-5.6 6.2 h5.6" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
      <svg
        ref={cursorRef}
        aria-hidden
        width="22"
        height="24"
        viewBox="0 0 22 24"
        className="no-print fixed top-0 left-0 pointer-events-none z-40 hidden md:block"
        style={{ opacity: 0, willChange: "transform", transition: "opacity 0.2s" }}
      >
        <path
          d="M 2 2 L 2 19 L 6 15 L 9 22 L 12 21 L 9 14 L 14 14 Z"
          fill="white"
          stroke="#1a1a2e"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
