# El dibujo de Otto

Las siluetas de `components/OttoFollower.js` se generan aquí, no se dibujan a mano.
El diseño en uso es el **vectorial peludo**: cada pieza (cuerpo, cabeza, orejas,
cola, patas) es el contorno de una elipse a la que se le **ondula el radio**
sumando varias ondas. Eso es lo que hace que el borde parezca pelo rizado.

Detalle que importa: las frecuencias de esas ondas **no pueden ser múltiplos entre
sí**. Si lo son, el contorno sale periódico y parece un engranaje en vez de pelo.

## Uso

```bash
python3 -m venv /tmp/venv
/tmp/venv/bin/pip install numpy scikit-image
/tmp/venv/bin/python -c "from generar_otto import DISENOS; print(DISENOS['d6']())"
```

`VARIANTES` al final del fichero define versiones alternativas (orejas más largas,
cabezón, cuerpo crema, línea fina, más rechoncho…). Todas comparten esqueleto, así
que cambiar de una a otra es sustituir las constantes `D_*` del componente.

## Cuidado con esto

1. **Los pivotes.** Si mueves una pieza aquí, actualiza también su pivote en el
   componente (`P_CABEZA`, `P_OREJA_N`, `P_COLA`, `P_PATAS`) o la rotación se
   descoloca respecto al dibujo.
2. **Nada de `<text>`.** Las "z" de dormir son trazos dibujados a propósito: con
   texto dependerían de la fuente que tenga cada visitante.
3. **El orden de las patas.** De pie van delante del cuerpo (si no, no se ven);
   tumbado van detrás, para que solo asomen las pezuñas. El componente lo cambia
   en marcha usando marcadores que guardan la posición original de cada una.
