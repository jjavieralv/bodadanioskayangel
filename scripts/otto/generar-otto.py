"""Otto vectorial de perfil, parametrizado, con piezas separadas y con pivote.

Cada pieza movil lleva data-pieza y data-pivote; el animador de la pagina las
rota. Mismo esqueleto que el componente real, para que integrarlo sea directo.
"""
import numpy as np
from skimage import measure

def rizo(cx, cy, rx, ry, ondas=(), pasos=190):
    t = np.linspace(0, 2*np.pi, pasos, endpoint=False)
    k = np.ones_like(t)
    for n, a, f in ondas:
        k = k + a*np.sin(n*t + f)
    p = np.column_stack([cx + rx*k*np.cos(t), cy + ry*k*np.sin(t)])
    p = measure.approximate_polygon(np.vstack([p, p[:1]]), tolerance=0.10)
    if np.allclose(p[0], p[-1]):
        p = p[:-1]
    for _ in range(2):
        q = []
        for i in range(len(p)):
            a_, b_ = p[i], p[(i+1) % len(p)]
            q.append(a_*0.75 + b_*0.25); q.append(a_*0.25 + b_*0.75)
        p = np.array(q)
    return "M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in p) + "Z"

def capsula(cx, y0, y1, w):
    r = w/2
    a = [(cx + r*np.cos(t), y0 + r + r*np.sin(t)) for t in np.linspace(np.pi, 2*np.pi, 26)]
    b = [(cx + r*np.cos(t), y1 - r + r*np.sin(t)) for t in np.linspace(0, np.pi, 26)]
    return "M" + "L".join(f"{x:.2f} {y:.2f}" for x, y in a+b) + "Z"

OJO, NARIZ, ROJO = "#241a33", "#b0796e", "#d4483f"

def perro(rizado=0.045, linea="#6b4f8a", grosor=2.2,
          pelo="#fffdfb", pelo_cuerpo=None, lejos="#e6dcef", linea_l="#a08fc4",
          oreja_tinte="#f1e9f6", oreja_largo=12.0, oreja_ancho=4.6,
          cabeza_r=15.0, cuerpo_rx=23.0, cuerpo_ry=15.0,
          ojo_r=3.4, pata_largo=0.0, collar=True):
    """Un Otto. Los parametros permiten sacar variantes sin redibujar nada."""
    pelo_cuerpo = pelo_cuerpo or pelo
    O  = [(7, rizado, 0.6), (11, rizado*0.55, 2.1)] if rizado else []
    O2 = [(6, rizado*1.2, 1.3), (10, rizado*0.65, 3.4)] if rizado else []
    Oc = [(5, rizado*2.0, 0.9)] if rizado else []

    hy = 28.0                                   # centro vertical de la cabeza
    p = lambda d, f, s, g=None: (
        f'<path d="{d}" fill="{f}" stroke="{s}" stroke-width="{g or grosor}" '
        f'stroke-linejoin="round"/>')

    pl1 = capsula(34, 44, 62 + pata_largo, 9)
    pl2 = capsula(54, 44, 62 + pata_largo, 9)
    pn1 = capsula(29, 44, 65 + pata_largo, 10)
    pn2 = capsula(49, 44, 65 + pata_largo, 10)
    suelo = 67 + pata_largo

    # El collar va DESPUES del cuerpo y ANTES de la cabeza: asi la barbilla le
    # tapa la parte de arriba y se lee como una banda que rodea el cuello, no
    # como una raya cruzada por encima.
    banda = (f'<path d="M53.5 33 Q57 41.5 62.5 46.5" stroke="{ROJO}" stroke-width="5" '
             f'fill="none" stroke-linecap="round"/>') if collar else ""

    return f'''<svg data-suelo="{suelo}" viewBox="0 0 100 72" width="100" height="72" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="46" cy="{suelo}" rx="26" ry="3" fill="#6b3878" opacity="0.15"/>
<g data-pieza="pataL1" data-pivote="34,46">{p(pl1, lejos, linea_l)}</g>
<g data-pieza="pataL2" data-pivote="54,46">{p(pl2, lejos, linea_l)}</g>
<g data-pieza="cola" data-pivote="26,34">{p(rizo(19, 29, 8, 7.5, Oc), pelo_cuerpo, linea)}</g>
<g data-pieza="cuerpo">{p(rizo(42, 44, cuerpo_rx, cuerpo_ry, O2), pelo_cuerpo, linea)}</g>
{banda}
<g data-pieza="pataN1" data-pivote="29,46">{p(pn1, pelo_cuerpo, linea)}</g>
<g data-pieza="pataN2" data-pivote="49,46">{p(pn2, pelo_cuerpo, linea)}</g>
<g data-pieza="cabeza" data-pivote="70,{hy}">
  <g data-pieza="orejaL" data-pivote="66,19">{p(rizo(64, 19+oreja_largo*0.72, oreja_ancho*0.85, oreja_largo*0.82, Oc), lejos, linea_l)}</g>
  {p(rizo(70, hy, cabeza_r, cabeza_r*0.97, O), pelo, linea)}
  {p(rizo(84, 33, 7.5, 5.8), pelo, linea)}
  <g data-pieza="ojo">
    <circle cx="73" cy="25" r="{ojo_r}" fill="{OJO}"/>
    <circle cx="{73+ojo_r*0.28:.1f}" cy="{25-ojo_r*0.28:.1f}" r="{ojo_r*0.32:.2f}" fill="#fff"/>
  </g>
  <ellipse cx="89" cy="31" rx="2.8" ry="2.3" fill="{NARIZ}"/>
  <path d="M89 33.3 v1.6 M89 34.9 q-2.4 1.9 -4.2 -0.3" fill="none" stroke="{OJO}"
        stroke-width="1.2" stroke-linecap="round"/>
  <path data-pieza="parpado" d="M{73-ojo_r-0.6:.1f} 25 Q73 {25+ojo_r+1.2:.1f} {73+ojo_r+0.6:.1f} 25"
        fill="none" stroke="{OJO}" stroke-width="1.5" stroke-linecap="round" opacity="0"/>
  <g data-pieza="orejaN" data-pivote="63,20">{p(rizo(60, 20+oreja_largo*0.75, oreja_ancho, oreja_largo, Oc), oreja_tinte, linea)}</g>

  <g data-pieza="cursor" opacity="0" transform="translate(90 34)">
    <path d="M0 0 L0 9 L2.1 6.9 L3.6 10.5 L5.2 9.9 L3.6 6.4 L6.8 6.4 Z"
          fill="#fff" stroke="#1a1a2e" stroke-width="1.1" stroke-linejoin="round"/>
  </g>
</g>
<g data-pieza="zetas" opacity="0" fill="none" stroke="#a08fc4"
   stroke-linecap="round" stroke-linejoin="round">
  <path data-z="0" d="M74 20 h3.6 l-3.6 4 h3.6" stroke-width="1.4"/>
  <path data-z="1" d="M80 13 h4.6 l-4.6 5 h4.6" stroke-width="1.7"/>
  <path data-z="2" d="M87 4 h5.6 l-5.6 6.2 h5.6" stroke-width="2"/>
</g>
</svg>'''

# ------------------------------------------------------------------ variantes
VARIANTES = {
 "d5":  dict(rizado=0.0,  oreja_tinte="#ffffff", grosor=2.4),
 "d6":  dict(),
 "d7":  dict(oreja_largo=16.0, oreja_ancho=5.2),
 "d8":  dict(cabeza_r=18.0, cuerpo_rx=20.0, cuerpo_ry=13.5, ojo_r=4.0),
 "d9":  dict(pelo_cuerpo="#f0e4d6", oreja_tinte="#f0e4d6"),
 "d10": dict(rizado=0.085, oreja_largo=14.0),
 "d11": dict(grosor=1.3, linea="#8a76ad", linea_l="#c2b3d8", rizado=0.03),
 "d12": dict(pata_largo=-5.0, cuerpo_rx=25.0, cuerpo_ry=16.5, cabeza_r=16.0),
}
DISENOS = {k: (lambda kw=v: perro(**kw)) for k, v in VARIANTES.items()}
