# Mejoras futuras

Cosas detectadas durante la revisión de estabilidad (31/08/2026) que **no** se han
aplicado todavía, con el motivo y los pasos exactos para hacerlo cuando toque.

---

## 1. Terminar de activar la caché de navegador (`public/_headers`)

**Estado: a medias.** Desde el 17/09/2026 `public/_headers` ya cachea
`/_next/static/*` (el JavaScript y el CSS) para siempre. Es seguro aunque se siga
editando: esos ficheros llevan un hash en el nombre que cambia en cada build, así
que nunca se sirve una versión antigua.

Falta la parte de las imágenes, que se deja para cuando la web esté cerrada:
ahí sí se reutiliza el mismo nombre de fichero al sustituir una foto, y con caché
una foto cambiada tardaría en verse. Cuando toque, añadir a `public/_headers`:

```
# Imágenes: una hora. Suficiente para acelerar la navegación sin que una foto
# sustituida tarde días en verse.
/images/*
  Cache-Control: public, max-age=3600
```

El HTML no hace falta tocarlo: Cloudflare ya lo sirve con
`max-age=0, must-revalidate`, que es lo correcto para que un despliegue se vea al
momento.

Para comprobar que funciona, tras desplegar:

```bash
CHUNK=$(curl -s https://bodadanioskayangel.com/ | grep -o '/_next/static/chunks/webpack-[^"]*' | head -1)
curl -sI "https://bodadanioskayangel.com$CHUNK" | grep -i cache-control
# debe decir: public, max-age=31536000, immutable
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
