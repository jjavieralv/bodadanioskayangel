import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import Countdown from "@/components/Countdown";
import FAQAccordion from "@/components/FAQAccordion";
import HistoriaCarousel from "@/components/HistoriaCarousel";
import MapaLugares from "@/components/MapaLugares";
import FlagIcon from "@/components/FlagIcon";
import Quiz from "@/components/Quiz";
import site from "@/content/site.json";
import historia from "@/content/historia.json";
import evento from "@/content/evento.json";
import viaje from "@/content/viaje.json";
import faq from "@/content/faq.json";
import cortejo from "@/content/cortejo.json";
import cultural from "@/content/cultural.json";
import dresscode from "@/content/dresscode.json";
import madrid from "@/content/madrid.json";
import galeria from "@/content/galeria.json";
import otto from "@/content/otto.json";
import quiz from "@/content/quiz.json";

export default function Home() {
  return (
    <>
      <Hero />

      {/* HISTORIA — carrusel horizontal */}
      <Section id="historia" elementId="proposal" title={historia.titulo} subtitle={historia.subtitulo}>
        <HistoriaCarousel items={historia.timeline} />

        <div id="fun-facts" data-element-id="fun_facts" className="mt-20 grid md:grid-cols-2 gap-6">
          <div className="bg-white/70 rounded-3xl border border-lavanda-200 p-6">
            <h3 className="font-serif text-2xl text-lavanda-700 mb-4">
              Sobre Dani 🎨
            </h3>
            <ul className="space-y-2">
              {historia.funFacts.dani.map((f, i) => {
                const isFlag = f.icono === "🇻🇪" || f.icono === "🇪🇸";
                return (
                  <li key={i} className="text-tinta/80 flex items-start gap-2">
                    {isFlag ? (
                      <FlagIcon country={f.icono === "🇻🇪" ? "VE" : "ES"} className="w-5 h-3 mt-1 rounded-sm shrink-0" />
                    ) : (
                      <span className="shrink-0">{f.icono}</span>
                    )}
                    <span>{f.texto}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bg-white/70 rounded-3xl border border-lavanda-200 p-6">
            <h3 className="font-serif text-2xl text-lavanda-700 mb-4">
              Sobre Ángel 🎩
            </h3>
            <ul className="space-y-2">
              {historia.funFacts.angel.map((f, i) => {
                const isFlag = f.icono === "🇻🇪" || f.icono === "🇪🇸";
                return (
                  <li key={i} className="text-tinta/80 flex items-start gap-2">
                    {isFlag ? (
                      <FlagIcon country={f.icono === "🇻🇪" ? "VE" : "ES"} className="w-5 h-3 mt-1 rounded-sm shrink-0" />
                    ) : (
                      <span className="shrink-0">{f.icono}</span>
                    )}
                    <span>{f.texto}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Section>

      {/* EVENTO — solo cronograma */}
      <Section id="evento" elementId="ceremony" title={evento.titulo} subtitle={evento.subtitulo}>
        {evento.notaHorarios && (
          <p className="text-center max-w-2xl mx-auto -mt-4 mb-10 text-sm italic text-tinta/70 bg-white/60 border border-lavanda-200 rounded-2xl px-4 py-2">
            {evento.notaHorarios}
          </p>
        )}
        <div id="cronograma" data-element-id="day_timeline">
          <Timeline items={evento.timeline} />
        </div>
      </Section>

      {/* VIAJE — mapa con puntos de interés + hoteles */}
      <Section id="viaje" elementId="venue_map" title={viaje.titulo} subtitle={viaje.subtitulo}>
        <MapaLugares puntos={viaje.puntosInteres} />

        <p className="text-center text-sm text-tinta/60 mt-8 mb-12 italic">
          Entre la ermita y la finca hay ~32 km. Habrá autobuses gratuitos de ida
          y de vuelta (última salida de la finca a las 04:00 h).
        </p>

        <div id="hoteles" data-element-id="hotels">
          <h3 className="font-serif text-3xl text-center text-lavanda-700 mb-6">
            Hoteles recomendados
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {viaje.hoteles.map((h) => (
              <a
                key={h.nombre}
                href={h.url}
                target="_blank"
                rel="noopener"
                className="magic-card block bg-white/70 rounded-2xl overflow-hidden border border-lavanda-200"
              >
                <img src={h.imagen} alt={h.nombre} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h4 className="font-serif text-lg text-tinta">{h.nombre}</h4>
                  <p className="text-sm text-lavanda-700 font-medium">{h.precio}</p>
                  <p className="text-xs text-tinta/60 mt-1">{h.distancia}</p>
                  <p className="text-xs text-tinta/70 mt-2">{h.nota}</p>
                  {h.descuento && (
                    <p className="mt-3 text-xs font-medium text-lavanda-700 bg-lavanda-50 rounded-full px-3 py-1 inline-block">
                      🎟️ {h.descuento}
                    </p>
                  )}
                  <p className="text-xs text-lavanda-700 underline decoration-dotted mt-3">
                    Reservar →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* MADRID — guía de qué hacer */}
      <Section id="madrid" elementId="madrid_guide" title={madrid.titulo} subtitle={madrid.subtitulo}>
        <div className="space-y-10">
          {madrid.secciones.map((s) => (
            <div key={s.tema}>
              <h3 className="font-serif text-3xl text-tinta mb-4">
                {s.icono} {s.tema}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {s.items.map((it) => (
                  <div key={it.nombre} className="bg-white/70 border border-lavanda-200 rounded-2xl p-4">
                    <p className="font-medium text-tinta">{it.nombre}</p>
                    <p className="text-sm text-lavanda-700">{it.tipo}</p>
                    <p className="text-xs text-tinta/60">{it.zona}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CULTURAL — solo frases */}
      <Section id="culturas" elementId="two_cultures" title="Aprende a hablar como nosotros" subtitle="Un pequeño diccionario para venezolanos, madrileños y todo lo demás">
        <div id="frases" data-element-id="bilingual_phrases" className="bg-white/60 border border-lavanda-200 rounded-3xl p-6 max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {cultural.frases.map((f, i) => (
              <div key={i} className="p-3 rounded-xl bg-lavanda-50">
                <p className="font-medium flex items-center gap-2">
                  {f.venezolana && (
                    <>
                      <FlagIcon country="VE" className="w-5 h-3 rounded-sm shrink-0" />
                      <span>"{f.venezolana}"</span>
                    </>
                  )}
                  {f.espanola && (
                    <>
                      <FlagIcon country="ES" className="w-5 h-3 rounded-sm shrink-0" />
                      <span>"{f.espanola}"</span>
                    </>
                  )}
                </p>
                <p className="text-tinta/70 italic">{f.traduccion}</p>
                <p className="text-xs text-tinta/50 mt-1">{f.uso}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DRESS CODE — simplificado */}
      <Section id="dresscode" elementId="color_guide" title={dresscode.titulo} subtitle={dresscode.subtitulo}>
        <div className="max-w-2xl mx-auto bg-white/70 border border-lavanda-200 rounded-3xl p-6 space-y-5">
          <div>
            <h3 className="font-serif text-lg text-lavanda-700 mb-2">Paleta bienvenida</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {dresscode.paleta.bienvenidos.map((c) => (
                <div key={c} className="w-10 h-10 rounded-full border border-lavanda-200 shadow-sm" style={{ background: c }} />
              ))}
            </div>
            <p className="text-sm italic text-tinta/70">{dresscode.paleta.nota}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-lavanda-700 mb-1">Estilo</p>
              <p className="text-tinta/80">{dresscode.estilo}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-lavanda-700 mb-1">Calzado</p>
              <p className="text-tinta/80">{dresscode.calzado}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-lavanda-700 mb-1">Clima</p>
              <p className="text-tinta/80">{dresscode.clima}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CORTEJO */}
      <Section id="cortejo" elementId="wedding_party" title={cortejo.titulo} subtitle={cortejo.subtitulo}>
        {cortejo.padres && (
          <div className="mb-12">
            <h3 className="font-serif text-2xl text-center text-lavanda-700 mb-6">Nuestros padres</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {cortejo.padres.map((p) => (
                <div key={p.nombre} className="bg-white/70 border border-lavanda-200 rounded-3xl p-5 flex gap-4 items-start">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-24 h-24 rounded-full object-cover border-2 border-lavanda-200 shrink-0"
                  />
                  <div>
                    <p className="font-serif text-xl text-tinta">{p.nombre}</p>
                    <p className="text-xs uppercase tracking-widest text-lavanda-700 mt-1">{p.rol}</p>
                    <p className="text-sm text-tinta/75 mt-2">{p.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="font-serif text-2xl text-center text-lavanda-700 mb-6">
          Padrinos, damas, caballeros y el bichón
        </h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          {cortejo.personas.map((p) => (
            <div key={p.nombre} className="text-center">
              <img
                src={p.imagen}
                alt={p.nombre}
                className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-lavanda-200 shadow-soft"
              />
              <p className="font-serif text-xl mt-3 text-tinta">{p.nombre}</p>
              <p className="text-xs uppercase tracking-widest text-lavanda-700 mt-1">{p.rol}</p>
              <p className="text-sm text-tinta/75 mt-2">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALERÍA */}
      <Section id="galeria" elementId="gallery" title={galeria.titulo} subtitle={galeria.subtitulo}>
        {galeria.albumes.map((al) => (
          <div key={al.nombre} className="mb-12">
            <h3 className="font-serif text-3xl text-tinta mb-4">{al.nombre}</h3>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {al.fotos.map((f, i) => (
                <figure key={i} className="break-inside-avoid magic-card rounded-2xl overflow-hidden border border-lavanda-200">
                  <img src={f.url} alt={f.caption} className="w-full" />
                  <figcaption className="p-2 text-xs text-center text-tinta/70 bg-white/70">
                    {f.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white/70 rounded-3xl border border-lavanda-200 p-8 text-center">
          <h3 className="font-serif text-3xl text-lavanda-700">
            {galeria.albumCompartido.titulo}
          </h3>
          <p className="text-tinta/70 mt-2 max-w-xl mx-auto">
            {galeria.albumCompartido.texto}
          </p>
          <img
            src={galeria.albumCompartido.qrUrl}
            alt="QR álbum compartido"
            className="w-40 h-40 mx-auto mt-4 rounded-2xl border border-lavanda-200"
          />
          <a
            href={galeria.albumCompartido.enlaceSubida}
            target="_blank"
            rel="noopener"
            className="inline-block mt-4 px-6 py-2 rounded-full bg-lavanda-600 text-white hover:bg-lavanda-700"
          >
            Abrir álbum compartido
          </a>
        </div>
      </Section>

      {/* OTTO */}
      <Section id="otto" elementId="otto" title={otto.titulo} subtitle={otto.subtitulo}>
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <img
            src={otto.imagenPrincipal}
            alt="Otto"
            className="rounded-3xl shadow-soft w-full aspect-square object-cover"
          />
          <div>
            <h3 className="font-serif text-3xl text-tinta mb-2">Ficha de personaje</h3>
            <p className="text-lavanda-700 font-medium mb-4">{otto.cargo}</p>
            <dl className="space-y-2 text-sm">
              {Object.entries(otto.bio).map(([k, v]) => (
                <div key={k} className="flex gap-3 border-b border-lavanda-100 pb-1">
                  <dt className="capitalize font-medium text-tinta w-40">{k.replace(/([A-Z])/g, " $1")}</dt>
                  <dd className="text-tinta/75">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="font-serif text-3xl text-lavanda-700 text-center mb-6">Galería</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otto.galeria.map((g, i) => (
              <figure key={i} className="magic-card overflow-hidden rounded-2xl border border-lavanda-200">
                <img src={g.url} alt={g.caption} className="w-full aspect-square object-cover" />
                <figcaption className="p-2 text-xs text-center text-tinta/70 bg-white/70">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-3xl text-lavanda-700 text-center mb-6">Reseñas de Otto</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {otto.resenas.map((r, i) => (
              <div key={i} className="bg-white/70 border border-lavanda-200 rounded-2xl p-5">
                <p className="font-serif text-xl text-tinta">{r.lugar}</p>
                <p className="text-amber-500">{"🐾".repeat(r.estrellas)}</p>
                <p className="text-sm text-tinta/75 mt-2 italic">"{r.comentario}"</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* QUIZ */}
      <Section id="quiz" elementId="quiz" title={quiz.titulo} subtitle={quiz.subtitulo}>
        <Quiz preguntas={quiz.preguntas} />

        <div className="mt-16">
          <h3 className="font-serif text-3xl text-lavanda-700 text-center mb-6">
            ¿Quién dijo qué?
          </h3>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {quiz.quienDijoQue.map((q, i) => (
              <details key={i} className="bg-white/70 rounded-2xl border border-lavanda-200 p-4">
                <summary className="cursor-pointer font-serif text-lg">{q.frase}</summary>
                <p className="mt-2 text-lavanda-700 font-medium">→ {q.respuesta}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-3xl text-lavanda-700 text-center mb-6">
            Bingo de boda
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-4xl mx-auto">
            {quiz.bingo.map((b, i) => (
              <BingoCell key={i} texto={b} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-3xl text-lavanda-700 text-center mb-6">
            Predicciones
          </h3>
          <ul className="max-w-2xl mx-auto space-y-2 text-tinta/80">
            {quiz.predicciones.map((p, i) => (
              <li key={i} className="bg-white/70 rounded-xl border border-lavanda-200 p-3">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* RSVP */}
      <Section
        id="rsvp"
        elementId="rsvp_form"
        title="Confirma tu magia"
        subtitle={`Rellena el formulario antes del ${site.fecha.rsvpLimite}. Menú, alergias, canción y más.`}
      >
        <div className="max-w-3xl mx-auto mb-8 text-center bg-lavanda-100/60 border border-lavanda-300 rounded-2xl px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-lavanda-700">
            Fecha límite
          </p>
          <p className="font-serif text-2xl text-tinta mt-1">
            {site.fecha.rsvpLimite}
          </p>
          <p className="text-xs text-tinta/70 mt-1">
            Después de esta fecha no podremos cerrar el menú, el sitio en la mesa
            ni la plaza en el autobús.
          </p>
        </div>

        <RSVP />

        <div className="mt-16" id="countdown" data-element-id="countdown">
          <p className="text-center text-xs uppercase tracking-widest text-lavanda-700 mb-4">
            Ya has confirmado · ahora empieza la cuenta atrás
          </p>
          <Countdown />
        </div>
      </Section>

      {/* FAQ completo */}
      <Section id="faq" elementId="faq" title={faq.titulo} subtitle={faq.subtitulo}>
        <FAQAccordion items={faq.preguntas} />
      </Section>
    </>
  );
}

function BingoCell({ texto }) {
  return (
    <label className="relative block bg-white/70 border border-lavanda-200 rounded-xl p-3 text-xs text-center cursor-pointer hover:border-lavanda-500 transition has-[:checked]:bg-lavanda-600 has-[:checked]:text-white">
      <input type="checkbox" className="sr-only peer" />
      <span>{texto}</span>
    </label>
  );
}
