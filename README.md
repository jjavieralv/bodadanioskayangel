# Web boda · Dani & Ángel 💜🐾

Web para la boda de **Dani y Ángel** el **2 de abril de 2027** en Madrid.

Es una **web de una sola página**: todo el contenido (historia, el día, cómo llegar, Madrid, galería, Otto, quiz, RSVP y preguntas frecuentes) está en la misma pantalla, uno debajo de otro. Los botones del menú de arriba **te llevan directamente** a cada sección haciendo scroll automático, sin cambiar de página.

Está hecha con Next.js + Tailwind, en español, y **todo el texto y las imágenes se editan en ficheros de la carpeta `content/`**, sin tocar código.

---

## ✏️ Lo más importante: cómo cambiar cosas en la web

Casi todo lo que ves (textos, fechas, fotos, hoteles, preguntas, etc.) vive en la carpeta **`content/`** en forma de ficheros `.json`. Un `.json` es solo texto ordenado por pares de `"etiqueta": "valor"`.

### Regla de oro para editar un `.json`

Cambia **solo lo que está entre comillas a la derecha de los dos puntos**. No toques las comillas, las comas ni las etiquetas de la izquierda.

```json
"venue": "Ermita de la Virgen del Puerto"
         └────────── esto SÍ lo puedes cambiar ──────────┘
```

3 cosas que **no** debes borrar nunca, o la web dejará de cargar:
- Las **comillas** `"` que rodean cada texto.
- Las **comas** `,` al final de cada línea (menos la última de cada bloque).
- Las **llaves** `{ }` y **corchetes** `[ ]`.

> Consejo: antes de tocar un fichero, haz una copia de seguridad (clic derecho → copiar/pegar). Si algo se rompe, restauras la copia.

### ¿Qué se edita en cada fichero?

| Quiero cambiar... | Abro este fichero |
|---|---|
| Nombres, fecha, lugar, contacto, contraseña, **playlist de Spotify** | `content/site.json` |
| Nuestra historia y los "fun facts" | `content/historia.json` |
| El cronograma / horarios del día | `content/evento.json` |
| Cómo llegar, hoteles, mapa | `content/viaje.json` |
| Guía de Madrid (restaurantes, planes) | `content/madrid.json` |
| Frases venezolanas/españolas | `content/cultural.json` |
| Código de vestimenta y colores | `content/dresscode.json` |
| Padres, padrinos, damas, caballeros | `content/cortejo.json` |
| Fotos de la galería | `content/galeria.json` |
| La ficha y fotos de Otto 🐾 | `content/otto.json` |
| Preguntas del quiz, bingo, predicciones | `content/quiz.json` |
| Preguntas frecuentes (FAQ) | `content/faq.json` |

Al guardar el fichero, **la web se actualiza sola** si la tienes abierta (ver la sección siguiente). Si no ves el cambio, refresca la página con `Ctrl + Shift + R`.

### Ejemplo real: poner la playlist de Spotify

Abre `content/site.json`, busca el bloque `redes` y pega el enlace de tu playlist:

```json
"redes": {
  "hashtag": "#DaniYAngel2027",
  "spotifyPlaylistUrl": "https://open.spotify.com/playlist/TU_PLAYLIST_AQUI",
  "spotifyPlaylistLabel": "Añade tu canción a la playlist"
}
```

(Ya está puesto el enlace actual; para cambiarlo, sustituye solo el texto entre comillas.)

---

## 🚀 Ver la web en tu ordenador

Necesitas tener instalado [Node.js](https://nodejs.org). Luego, en una terminal dentro de la carpeta del proyecto:

```bash
npm install     # solo la primera vez
npm run dev     # arranca la web
```

Abre en el navegador: **http://localhost:3000**

Mientras `npm run dev` esté corriendo, cada vez que guardes un fichero de `content/` el cambio aparece al momento.

Otros comandos:
- `npm run build` – prepara la versión final para publicar.
- `npm run start` – arranca esa versión final.

---

## 🖼️ Cambiar imágenes

Ahora mismo las fotos son de ejemplo (de un servicio gratuito, `picsum.photos`). Para poner **vuestras fotos reales**:

1. Copia tus imágenes en la carpeta `public/images/` (crea subcarpetas si quieres, p. ej. `public/images/pareja/`).
2. En el `.json` correspondiente, sustituye la URL larga `https://picsum.photos/...` por la ruta de tu foto, empezando por `/images/`:

```json
"imagen": "/images/pareja/preboda-01.jpg"
```

> Las fotos de ejemplo necesitan internet para verse. Las fotos vuestras en `public/images/` funcionan siempre.

---

## 📝 Conectar el formulario de confirmación (RSVP)

El formulario de "Confirmar asistencia" se hace con Google Forms + un pequeño script. Se configura **una sola vez**.

### Paso 1 · Crear el Google Form

1. Entra en https://script.google.com → **Nuevo proyecto**.
2. Borra lo que haya y pega el contenido de `scripts/1-crear-formulario.gs`.
3. Ponle nombre "Boda RSVP · Dani y Ángel" y pulsa **Guardar** 💾.
4. Arriba, elige la función `crearFormularioBoda` y pulsa **Ejecutar** (la primera vez pide autorizar → acepta).
5. En **Ver → Registros** verás el **ID del formulario** y las URLs. Copia el ID.

### Paso 2 · Pegar el ID en la web

Abre `content/site.json` y sustituye `REEMPLAZAR_FORM_ID` por el ID real en los **tres** campos del bloque `formulario`:

```json
"formulario": {
  "googleFormId": "1ABCxyz123456...",
  "googleFormUrl": "https://docs.google.com/forms/d/e/1ABCxyz123456.../viewform?embedded=true",
  "googleFormUrlPublico": "https://docs.google.com/forms/d/e/1ABCxyz123456.../viewform"
}
```

Recarga http://localhost:3000/#rsvp y el formulario aparecerá integrado.

### Paso 3 · Email automático de confirmación

1. Abre la **hoja de respuestas** que creó el script (mira la URL en el registro del paso 1).
2. Dentro de la hoja: **Extensiones → Apps Script**.
3. Pega el contenido de `scripts/2-email-confirmacion.gs`.
4. Cambia `NOVIOS_EMAIL` por el email real de Dani/Ángel y guarda.
5. Ejecuta una vez la función `instalarTrigger` (autoriza permisos de Gmail).

A partir de ahí, cada confirmación manda un email al invitado y una copia a los novios.

---

## ✅ Modo decisión (herramienta interna para los novios)

Es una página privada para ir marcando qué elementos entran en la web final. **No forma parte de la web de una sola página** que ven los invitados.

- Listado completo con botones **Sí / Quizás / No**: http://localhost:3000/decidir
- Panel flotante mientras navegas: http://localhost:3000/?decidir=1

Las decisiones se guardan en el navegador y se pueden **exportar a CSV** desde `/decidir`.

---

## ⚙️ Repasar antes de publicar

En `content/site.json`:

| Campo | Qué poner |
|---|---|
| `contacto.email` | Email real de Dani o Ángel |
| `contacto.telefono` | Número para dudas |
| `lugar.*` | Dirección y venue definitivos |
| `formulario.*` | Tras el "Paso 1" del RSVP |
| `dominio.url` | La URL final (p. ej. daniyangel.com) |
| `redes.spotifyPlaylistUrl` | La playlist colaborativa |

---

## 🎨 Colores y tipografías (avanzado)

- Colores principales: lavanda, crema y tinta. Se cambian en `tailwind.config.js` (bloque `colors`).
- Fuentes (Google Fonts): se cargan solas, no hay que hacer nada.

---

## 🌐 Publicar la web (cuando toque)

1. Sube el proyecto a GitHub.
2. Entra en https://vercel.com → "Import project" → elige el repo.
3. Se publica solo (podéis conectar un dominio propio comprado en Namecheap/Porkbun/GoDaddy).

---

## 🆘 Problemas comunes

- **Cambié un `.json` y no se ve.** Refresca con `Ctrl + Shift + R`. Si sigue igual, para `npm run dev` y vuelve a lanzarlo.
- **La web se ha quedado en blanco / da error tras editar.** Casi siempre es una **coma** o una **comilla** que se borró en el `.json`. Restaura tu copia de seguridad y vuelve a intentarlo.
- **No se ven las fotos de ejemplo.** Necesitan internet. Usa fotos propias en `public/images/` si vas sin conexión.
- **El formulario dice "en preparación".** Falta pegar el `googleFormId` (Pasos 1 y 2 del RSVP).

---

## 📁 Estructura del proyecto (referencia)

```
web_dani/
├── app/
│   ├── page.js           ← la web de una sola página (todas las secciones)
│   ├── decidir/          ← herramienta interna de decisiones (no pública)
│   ├── faq/ galeria/     ← redirigen a su sección dentro de la página única
│   ├── otto/ quiz/ madrid/  (mantienen los enlaces antiguos funcionando)
│   └── not-found.js      ← página de error 404
├── components/           ← piezas reutilizables (menú, secciones, etc.)
├── content/              ← 🧩 TODO EL CONTENIDO EDITABLE (los .json)
├── public/images/        ← aquí van vuestras fotos reales
└── scripts/              ← scripts de Google para el formulario RSVP
```

---

¡Felicidades Dani y Ángel! Y saludos a Otto 🐾
