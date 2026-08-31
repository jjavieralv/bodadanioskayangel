"""Redimensiona las fotos del cortejo a JPEG conservando la relacion de aspecto.

Se muestran en circulos de 160px con object-cover; dejando el lado corto en
600px hay margen de sobra hasta pantallas 3x y el recorte queda identico,
porque no se altera la proporcion original.
"""
from PIL import Image, ImageOps
import glob, os, re

SRC = "public/images/Fotos cortejo"
LADO_CORTO = 600
CALIDAD = 85

def base_sin_extension(nombre):
    # "Nohuger.jpg.jpeg" -> "Nohuger";  "Angustias y Antonio.png" -> "Angustias y Antonio"
    while True:
        raiz, ext = os.path.splitext(nombre)
        if ext.lower() in (".png", ".jpg", ".jpeg", ".webp"):
            nombre = raiz
        else:
            return nombre

renombres = {}
total_antes = total_despues = 0

for ruta in sorted(glob.glob(f"{SRC}/*")):
    if os.path.getsize(ruta) == 0:
        continue
    antes = os.path.getsize(ruta)
    im = ImageOps.exif_transpose(Image.open(ruta)).convert("RGB")
    w, h = im.size

    escala = min(1.0, LADO_CORTO / min(w, h))          # nunca ampliar
    nuevo = (max(1, round(w * escala)), max(1, round(h * escala)))
    if escala < 1.0:
        im = im.resize(nuevo, Image.LANCZOS)

    destino = f"{SRC}/{base_sin_extension(os.path.basename(ruta))}.jpg"
    im.save(destino, "JPEG", quality=CALIDAD, optimize=True, progressive=True)

    despues = os.path.getsize(destino)
    total_antes += antes
    total_despues += despues
    if os.path.abspath(destino) != os.path.abspath(ruta):
        renombres[os.path.basename(ruta)] = os.path.basename(destino)
        os.remove(ruta)

    print(f"{os.path.basename(ruta):28} {w}x{h} -> {im.size[0]}x{im.size[1]}   "
          f"{antes/1048576:6.2f} MB -> {despues/1024:6.0f} KB")

print()
print(f"TOTAL: {total_antes/1048576:.1f} MB -> {total_despues/1048576:.2f} MB "
      f"(reduccion {100*(1-total_despues/total_antes):.1f}%)")
print()
for viejo, nuevo in renombres.items():
    print(f"renombrado: {viejo}  ->  {nuevo}")
