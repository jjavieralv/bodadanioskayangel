import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import RSVP from "@/components/RSVP";
import Countdown from "@/components/Countdown";
import FAQAccordion from "@/components/FAQAccordion";
import MapaLugares from "@/components/MapaLugares";
import CulturalDictionary from "@/components/CulturalDictionary";
import Playlist from "@/components/Playlist";
import CouplePortrait from "@/components/CouplePortrait";
import OurStory from "@/components/OurStory";
import SceneTransition from "@/components/SceneTransition";
import WeddingPartyCarousel from "@/components/WeddingPartyCarousel";
import DressCode from "@/components/DressCode";
import GuestGallery from "@/components/GuestGallery";
import site from "@/content/site.json";
import historia from "@/content/historia.json";
import evento from "@/content/evento.json";
import viaje from "@/content/viaje.json";
import faq from "@/content/faq.json";
import cortejo from "@/content/cortejo.json";
import cultural from "@/content/cultural.json";
import dresscode from "@/content/dresscode.json";
import galeria from "@/content/galeria.json";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="countdown" data-element-id="countdown" className="countdown-scene">
        <div className="countdown-transition" aria-hidden="true">
          <div className="countdown-mist" />
          <div className="magic-particles">
            {Array.from({ length: 11 }).map((_, index) => <i key={index} />)}
          </div>
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
            <path d="M0,82 C180,18 320,142 525,72 C730,2 910,138 1110,70 C1260,18 1368,54 1440,34 L1440,150 L0,150 Z" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-12 text-center md:pb-32">
          <p className="countdown-script">Cada día un poquito más cerca</p>
          <h2 className="countdown-title">Faltan</h2>
          <Countdown />
          <p className="countdown-ending">para celebrar juntos</p>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <Section id="historia" className="about-scene">
        <CouplePortrait historia={historia} />
        <OurStory items={historia.timeline} />
      </Section>

      {/* CORTEJO */}
      <Section id="cortejo" elementId="wedding_party" title={cortejo.titulo} subtitle={cortejo.subtitulo}>
        <WeddingPartyCarousel padres={cortejo.padres} personas={cortejo.personas} />
      </Section>

      <SceneTransition variant="story-day" />

      {/* EVENTO — solo cronograma */}
      <Section id="evento" elementId="ceremony" title={evento.titulo} subtitle={evento.subtitulo}>
        {evento.notaHorarios && (
          <p className="day-schedule-note">
            {evento.notaHorarios}
          </p>
        )}
        <div id="cronograma" data-element-id="day_timeline">
          <Timeline items={evento.timeline} />
        </div>
      </Section>

      <SceneTransition variant="day-places" />

      {/* DRESS CODE */}
      <Section id="dresscode" elementId="color_guide" className="dresscode-scene">
        <DressCode content={dresscode} />
      </Section>

      <SceneTransition variant="culture-dress" />

      {/* RSVP */}
      <Section
        id="rsvp"
        elementId="rsvp_form"
        className="rsvp-scene"
        title="Confirma tu magia"
        subtitle="Una última pregunta antes de empezar la cuenta atrás"
      >
        <RSVP />
      </Section>

      {/* VIAJE — mapa con puntos de interés + hoteles */}
      <Section id="viaje" elementId="venue_map" title={viaje.titulo} subtitle={viaje.subtitulo}>
        <MapaLugares puntos={viaje.puntosInteres} />

        <div id="hoteles" data-element-id="hotels" className="hotel-guide">
          <p className="hotel-guide-overline">Dónde quedarse</p>
          <h3>Hoteles</h3>
          <p className="hotel-guide-intro">Cuatro opciones cerca de los lugares principales de la boda.</p>
          <div className="hotel-guide-grid">
            {viaje.hoteles.map((h) => (
              <article key={h.nombre} className="hotel-guide-card magic-card">
                <span className="hotel-guide-number">
                  <img src={h.icono} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                </span>
                <div>
                  <h4>{h.nombre}</h4>
                  <p className="hotel-guide-address">{h.direccion}</p>
                  <p className="hotel-guide-note">{h.nota}</p>
                  {h.descuento && (
                    <p className="hotel-guide-discount">
                      <span>Ventaja para invitados</span>{h.descuento}
                    </p>
                  )}
                  <div className="hotel-guide-actions">
                    <a href={h.url} target="_blank" rel="noopener noreferrer">Reservar →</a>
                    <a href={h.direccionesUrl} target="_blank" rel="noopener noreferrer">Ver mapa</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* GALERÍA */}
      <Section id="galeria" elementId="gallery" className="gallery-scene" title={galeria.titulo} subtitle={galeria.subtitulo}>
        <GuestGallery album={galeria.albumCompartido} />
      </Section>

      <SceneTransition variant="gallery-rsvp" />

      {/* PLAYLIST */}
      <Section
        id="playlist"
        elementId="spotify_collab"
        className="playlist-scene"
        title="La Playlist"
        subtitle="La banda sonora de la fiesta también lleva un poquito de vosotros"
      >
        <Playlist />
      </Section>

      {/* DICCIONARIO VENEKOESPAÑOL */}
      <Section id="culturas" elementId="two_cultures" className="culture-scene" title="Aprende a hablar como nosotros" subtitle="Un pequeño diccionario para venezolanos, españoles y todo lo demás">
        <CulturalDictionary content={cultural} />
      </Section>

      {/* FAQ completo */}
      <Section id="faq" elementId="faq" title={faq.titulo} subtitle={faq.subtitulo}>
        <FAQAccordion items={faq.preguntas} />
      </Section>
    </>
  );
}
