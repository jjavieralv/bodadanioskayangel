import Reveal from "./Reveal";

const iconPaths = {
  dani: ["casita_ve.png", "projectManager.png", "pintura.png", "vela.png", "queso.png", "paw_ve.png", "destello.png"],
  angel: ["casita_es.png", "trebol.png", "varita.png", "lego.png", "dice.png", "paw_es.png", "planificar.png"],
};

// Cuando tengáis las fotos, solo hay que escribir aquí sus rutas dentro de /public.
const characterPhotos = {
  dani: "/images/personajes/danioska-profile.jpg",
  angel: "images/personajes/Angel-closeup.jpg",
};

const characterProfiles = {
  dani: {
    className: "Hada Artesana",
    ability: "Yo puedo hacer eso",
    abilityDetail: "Si existe, puede hacerlo; si no sabe, aprenderá. El coste y los viajes a la tienda son irrelevantes.",
  },
  angel: {
    className: "Coleccionista de reliquias",
    ability: "Esto no se tira",
    abilityDetail: "Acumula toda clase de artefactos: juegos, monedas, barajas, LEGO y cajas vacías.",
  },
};

function TraitIcon({ filename }) {
  return <img
    src={`/images/icons/characters/${filename}`}
    alt=""
    aria-hidden="true"
    className="trait-icon"
  />;
}

function CharacterPhoto({ name, src }) {
  return <div className="character-photo">
    {src ? <img src={src} alt={`Retrato de ${name}`} /> : <span>Foto</span>}
  </div>;
}

function CharacterSheet({ id, name, origin, facts, delay = 0 }) {
  const profile = characterProfiles[id];
  return <Reveal className={`character-sheet character-sheet-${id}`} delay={delay}>
    <div className="character-wash" aria-hidden="true"/>
    <header className="character-header">
      <CharacterPhoto name={name} src={characterPhotos[id]}/>
      <div className="character-identity">
        <p className="character-origin">{origin}</p>
        <h3>{name}</h3>
        <p className="character-class"><span>Clase:</span> {profile.className}</p>
      </div>
    </header>
    <div className="character-special">
      <span>Habilidad especial</span>
      <p><strong>{profile.ability}</strong><em> — {profile.abilityDetail}</em></p>
    </div>
    <div className="character-divider"><span>Rasgos</span></div>
    <ul className="character-traits">
      {facts.map((fact,index) => <li key={fact.texto}>
        <span className="trait-medallion"><TraitIcon filename={iconPaths[id][index]}/></span><p>{fact.texto}</p>
      </li>)}
    </ul>
  </Reveal>;
}

export default function CouplePortrait({ historia }) {
  return <div id="fun-facts" data-element-id="fun_facts" className="couple-portrait">
    <Reveal className="couple-heading">
      <p className="couple-overline">Dos mundos, una misma partida</p>
      <h2>Conoce a los personajes</h2>
      <div className="divider-paw" aria-hidden="true">🐾</div>
      <p>Una artista que convierte cualquier idea en proyecto y un científico que intenta ordenarlo todo en columnas. Sorprendentemente, funciona.</p>
    </Reveal>
    <div className="character-grid">
      <CharacterSheet id="dani" name="Danioska" origin="Venezuela · Madrid" facts={historia.funFacts.dani}/>
      <CharacterSheet id="angel" name="Ángel" origin="Córdoba · Madrid" facts={historia.funFacts.angel} delay={120}/>
    </div>
  </div>;
}
