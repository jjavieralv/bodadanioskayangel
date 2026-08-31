# Mejoras futuras

Cosas detectadas durante la revisión de estabilidad (31/08/2026) que **no** se han
aplicado todavía, con el motivo y los pasos exactos para hacerlo cuando toque.

---

## 1. Activar la caché de navegador (`public/_headers`)

**Estado: pendiente a propósito.** Se deja desactivado mientras se siga editando la
web, para que los cambios se vean al instante sin tener que forzar recargas.

Hoy Cloudflare sirve **todo** con `cache-control: public, max-age=0, must-revalidate`.
Eso significa que el navegador no guarda nada: cada visita vuelve a pedir el JS, el
CSS y las fotos por red. Si la conexión falla un momento, la página se queda a medias.

Para activarlo, crear el fichero `public/_headers` con este contenido:

```
# Ficheros con hash en el nombre: el nombre cambia en cada build, así que se
# pueden cachear para siempre sin riesgo de servir una versión vieja.
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# Imágenes: una hora. Suficiente para acelerar la navegación sin que una foto
# sustituida tarde días en verse.
/images/*
  Cache-Control: public, max-age=3600

# El HTML nunca se cachea, para que un despliegue nuevo se vea de inmediato.
/
  Cache-Control: public, max-age=0, must-revalidate
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

Next copia `public/_headers` a `out/` en el build, igual que ya hace con
`public/_redirects`. Después: `npm run deploy`.

> **Matiz útil:** el bloque de `/_next/static/*` se puede activar **ya**, aunque se
> siga editando. Esos ficheros llevan un hash en el nombre (`webpack-c81f7fd2….js`)
> que cambia en cada build, así que nunca se sirve una versión antigua. El único
> bloque que conviene dejar para el final es el de `/images/*`, porque ahí sí se
> reutiliza el mismo nombre de fichero al sustituir una foto.

Para comprobar que ha funcionado:

```bash
curl -sI https://bodadanioskayangel.com/_next/static/chunks/webpack-*.js | grep -i cache-control
```

---

## 2. Sustituir las imágenes de marcador por fotos reales

Las 20 imágenes de `public/images/placeholders/` son marcadores generados
localmente. Sustituyeron a `picsum.photos`, un servicio gratuito de fotos de
relleno que **estaba caído** el día de la revisión (522, 503 y timeouts en los 20
intentos seguidos que se hicieron a lo largo de 5 minutos) y que era una de las
causas principales de que la web fuera a ratos.

No se pudieron descargar los originales porque el servicio nunca llegó a responder.
Tampoco importa demasiado: eran fotos de stock aleatorias, no fotos de la boda.

Para sustituir cualquiera de ellas basta con **dejar una foto real con el mismo
nombre de fichero** en `public/images/placeholders/`. No hay que tocar ningún JSON.
Conviene mantener una proporción parecida para que el recorte quede igual.

| Fichero | Se usa en | Proporción |
|---|---|---|
| `bichon-frise-otto.jpg` | Foto grande de Otto | 1:1 |
| `caballero-diego.jpg` | Dito y Alfonso (cortejo) | 1:1 |
| `qr-album.jpg` | QR del álbum compartido | 1:1 |
| `rsvp-boda.jpg` | Tarjeta de confirmar asistencia | 3:2 |
| `hotel-plaza.jpg`, `hotel-tepa.jpg`, `petit-palace.jpg` | Hoteles | 3:2 |
| `escape-room.jpg`, `pintura.jpg`, `hogar.jpg`, `toto-cachorro.jpg`, `pedida-magia.jpg`, `boda-ermita.jpg` | Historia (sección no activa) | 4:3 |
| `ermita-virgen-puerto.jpg`, `coctel-jardines.jpg`, `banquete-finca.jpg`, `fiesta-boda.jpg` | Evento (no activas) | 3:2 |
| `valencia-vzla.jpg`, `avion.jpg`, `madrid-skyline.jpg` | Cultural (no activas) | 8:5 |

**Antes de subir una foto nueva, redimensiónala.** Las del cortejo pesaban 2 MB
cada una. Hay un script listo en `scripts/` (ver punto 6).

---

## 3. Decidir qué pasa con la pantalla de contraseña

`components/SiteGate.js` tapa toda la web hasta que se escribe `maricoiberico`.
Tiene dos efectos secundarios que explican parte de los "a veces no me funciona":

- **El desbloqueo se guarda en `localStorage`, y eso se pierde solo.** Safari lo
  borra a los 7 días sin visitar la web; el modo incógnito lo pierde siempre; y el
  navegador interno de WhatsApp o Instagram usa un almacén distinto al de
  Safari/Chrome. Un invitado que ya entró puede encontrarse la contraseña otra vez.
- **El HTML servido contiene solo la pantalla de contraseña.** Todo lo demás se
  pinta con JavaScript. Si un fichero JS no llega, no se ve una web a medias: se ve
  la pantalla de "En construcción" y nada más.

No se ha tocado porque es una decisión vuestra, no técnica. **Cuando la web sea
pública, quitar el `<SiteGate>` de `app/layout.js`** (dejando dentro a `Navbar`,
`main`, `Footer`, etc.) hace que la web pase a servirse como HTML de verdad y
desaparecen los dos problemas de golpe.

Aviso aparte: la contraseña está en texto plano dentro del JavaScript que se
descarga, así que no protege de nadie que sepa mirar. Sirve como cortina, no como
cerradura.

---

## 4. Limpiar la contraseña duplicada de `content/site.json`

`site.json` tiene un bloque que no se usa y que contradice al código:

```json
"dominio": { "passwordProtegido": false, "password": "toto2027" }
```

La contraseña real (`maricoiberico`) está escrita a mano en `SiteGate.js`. O se
borran esas dos claves, o se hace que `SiteGate` las lea. Tal como está, quien
edite el JSON pensará que cambia la contraseña y no cambiará nada.

---

## 5. Espacios en los nombres de las fotos del cortejo

Los ficheros de `public/images/Fotos cortejo/` tienen espacios y mayúsculas
(`Angustias y Antonio.jpg`, `Maria Laura.jpg`). Funciona —está comprobado en
producción—, pero es una fuente conocida de problemas con algunos navegadores
integrados y proxies.

Si algún día se toca esa carpeta, merece la pena pasarlos a minúsculas y guiones
(`angustias-y-antonio.jpg`) y actualizar `content/cortejo.json` a la vez.

---

## 6. Usar siempre el script al subir fotos nuevas

El redimensionado de las fotos del cortejo (26,4 MB → 1,28 MB) quedó guardado en
`scripts/redimensionar-fotos.py`, con instrucciones en `scripts/README-imagenes.md`.

No es una tarea pendiente sino un recordatorio: si alguien sube fotos nuevas desde
la interfaz web de GitHub —como se ha hecho hasta ahora— se vuelven a colar ficheros
de 2 MB y la página vuelve a pesar decenas de megas. Pasar el script después.

---

## 7. Las tipografías de Google bloquean el pintado

`app/layout.js` carga cinco familias de Google Fonts con un `<link rel="stylesheet">`
en el `<head>`. Es una hoja de estilo bloqueante: si `fonts.googleapis.com` va lento,
la página se queda en blanco hasta que responde.

Se arregla con `next/font/google`, que descarga las fuentes en el build y las sirve
desde el propio dominio. Es un cambio de media hora y quita otra dependencia externa.
