import Reveal from "@/components/Reveal";

export default function GuestGallery({ album }) {
  return (
    <div className="guest-gallery">
      <div className="gallery-watercolor gallery-watercolor-one" aria-hidden="true" />
      <div className="gallery-watercolor gallery-watercolor-two" aria-hidden="true" />

      <Reveal className="gallery-intro">
        <p className="gallery-kicker">La boda vista por vosotros</p>
        <h3>{album.titulo}</h3>
        <p>{album.texto}</p>
      </Reveal>

      <div className="gallery-composition">
        <Reveal className="gallery-polaroid gallery-polaroid-left" delay={100}>
          <img src="/images/gallery/danioska-angel-faro.jpg" alt="Danioska y Ángel junto a un faro de colores" loading="lazy" decoding="async" />
          <span>Los viajes</span>
        </Reveal>

        <Reveal className="gallery-upload-card" delay={180}>
          <div className="gallery-qr-frame shared-qr-frame">
            <span className="shared-qr-corner shared-qr-corner-one" aria-hidden="true" />
            <span className="shared-qr-corner shared-qr-corner-two" aria-hidden="true" />
            <img src={album.qrUrl} alt="Código QR para subir las fotos de la boda" loading="lazy" decoding="async" />
          </div>
          <p className="gallery-scan shared-qr-label">Escanea y comparte</p>
          <a href={album.enlaceSubida} target="_blank" rel="noopener noreferrer">Sube tus fotos <span aria-hidden="true">↗</span></a>
          <small>Google te pedirá iniciar sesión para proteger todos los recuerdos.</small>
        </Reveal>

        <Reveal className="gallery-polaroid gallery-polaroid-right" delay={260}>
          <img src="/images/gallery/danioska-angel-aventura.jpg" alt="Danioska y Ángel en una de sus aventuras" loading="lazy" decoding="async" />
          <span>Las locuras</span>
        </Reveal>
      </div>

      <Reveal className="gallery-closing">
        <i />
        <p>Fotos espontáneas, vídeos imposibles y todo eso que ocurre cuando nosotros no estamos mirando.</p>
        <i />
      </Reveal>
    </div>
  );
}
