import site from "@/content/site.json";

// Saca el ID de la playlist de la URL de Spotify que hay en content/site.json
function playlistId(url) {
  const m = String(url || "").match(/playlist\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

export default function Playlist() {
  const id = playlistId(site.redes.spotifyPlaylistUrl);

  return (
    <div className="playlist-editorial">
      <div className="playlist-wash playlist-wash-one" aria-hidden="true" />
      <div className="playlist-wash playlist-wash-two" aria-hidden="true" />

      <article className="playlist-request">
        <p className="playlist-kicker">Una petición para la pista</p>
        <h3>Regálanos una canción <span>(o muchas)</span></h3>
        <p className="playlist-intro">
          Añadid ese tema que os hace levantaros de la silla, cantar a gritos o
          recordar una noche que todavía da risa. <strong>No hay límite de
          canciones. Esto no es Ryanair, no cobramos por añadir otra.</strong>
        </p>

        <div className="playlist-steps" aria-label="Cómo participar">
          <p><span>01</span><strong>Abre la playlist</strong></p>
          <p><span>02</span><strong>Añade tu temazo</strong></p>
          <p><span>03</span><strong>Nos vemos en la pista</strong></p>
        </div>

        <a
          href={site.redes.spotifyPlaylistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="playlist-primary"
        >
          {site.redes.spotifyPlaylistLabel} <span aria-hidden="true">↗</span>
        </a>
      </article>

      {id && (
        <aside className="playlist-player">
          <div className="playlist-player-label">
            <span>Danioska &amp; Ángel</span>
            <i aria-hidden="true" />
            <span>02 · 04 · 27</span>
          </div>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
            className="playlist-iframe"
            title="Playlist colaborativa de la boda"
            loading="lazy"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
          <p>En reproducción: vuestra banda sonora para nuestra fiesta.</p>
        </aside>
      )}
    </div>
  );
}
