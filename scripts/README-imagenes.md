# Cómo subir una foto nueva sin ralentizar la web

Las fotos del cortejo se ven en círculos de 160 px. Una foto de móvil sin tocar
pesa 2 MB y se descarga entera igualmente: 14 fotos así eran 26 MB de página.

Antes de subir fotos nuevas a `public/images/Fotos cortejo/`:

```bash
python3 -m venv /tmp/venv && /tmp/venv/bin/pip install Pillow
/tmp/venv/bin/python scripts/redimensionar-fotos.py
```

El script deja el lado corto en 600 px (sobra hasta en pantallas 3x), convierte a
JPEG calidad 85 y **conserva la proporción original**, así que el recorte circular
queda exactamente igual que antes. Borra el fichero original si cambia de extensión.

Si renombra algún fichero, hay que actualizar la ruta en `content/cortejo.json`.
