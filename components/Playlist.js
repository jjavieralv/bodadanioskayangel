import site from "@/content/site.json";

// Saca el ID de la playlist de la URL de Spotify que hay en content/site.json
function playlistId(url) {
  const m = String(url || "").match(/playlist\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

export default function Playlist() {
  const id = playlistId(site.redes.spotifyPlaylistUrl);

  return (
    <div className="max-w-3xl mx-auto">
      {id && (
        <div className="rounded-3xl overflow-hidden border border-lavanda-200 shadow-soft bg-white/70">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`}
            className="w-full h-[380px] border-0"
            title="Playlist colaborativa de la boda"
            loading="lazy"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href={site.redes.spotifyPlaylistUrl}
          target="_blank"
          rel="noopener"
          className="inline-block px-6 py-3 rounded-full bg-[#1DB954] text-white shadow-soft hover:opacity-90 transition"
        >
          🎵 {site.redes.spotifyPlaylistLabel}
        </a>
        <p className="mt-3 text-xs text-tinta/60">
          Es colaborativa: cualquiera puede añadir canciones desde Spotify.
        </p>
      </div>
    </div>
  );
}
