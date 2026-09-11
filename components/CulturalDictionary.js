import Reveal from "@/components/Reveal";

export default function CulturalDictionary({ content }) {
  return (
    <div id="frases" data-element-id="bilingual_phrases" className="culture-dictionary">
      <div className="culture-dictionary-heading">
        <span aria-hidden="true">🇻🇪</span>
        <div><p>Diccionario</p><h3>Venekospañol</h3></div>
        <span aria-hidden="true">🇪🇸</span>
      </div>

      <div className="culture-entries">
        {content.frases.map((phrase, index) => (
          <Reveal className={`culture-entry culture-tone-${(index % 5) + 1}`} delay={(index % 3) * 70} key={phrase.venezolana}>
            <div className="culture-expression culture-expression-ve">
              <span>🇻🇪 Venezuela</span><strong>{phrase.venezolana}</strong>
            </div>
            <div className="culture-exchange" aria-hidden="true"><i />↔<i /></div>
            <div className="culture-expression culture-expression-es">
              <span>España 🇪🇸</span><strong>{phrase.espanola}</strong>
            </div>
            {phrase.significado && <p>{phrase.significado}</p>}
          </Reveal>
        ))}
      </div>

      <Reveal className="culture-perol">
        <p className="culture-perol-kicker">Misma palabra. Dos mundos.</p>
        <div className="culture-perol-word">
          <i aria-hidden="true" />
          <h4>{content.perol.palabra}</h4>
          <i aria-hidden="true" />
        </div>
        <div className="culture-perol-duel">
          <article className="culture-perol-side culture-perol-ve">
            <span>🇻🇪 Venezuela</span>
            <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M20 15c5-5 17-4 20 2 7-1 12 4 10 10 5 4 3 12-3 14-2 7-12 9-17 5-5 4-14 0-14-7-7-3-7-13-1-17-2-5 0-11 5-14Z"/><path d="m24 29 5 5 11-12"/></svg>
            <p><strong>Perol:</strong> {content.perol.venezuela}</p>
          </article>
          <div className="culture-perol-vs" aria-hidden="true">VS</div>
          <article className="culture-perol-side culture-perol-es">
            <span>Córdoba 🇪🇸</span>
            <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 26h32v18c0 6-5 10-10 10H26c-6 0-10-4-10-10V26Z"/><path d="M12 26h40M23 20c0-4 4-7 9-7s9 3 9 7M9 32h7m32 0h7M25 8c-3-3 1-6-1-9m15 9c3-3-1-6 1-9"/></svg>
            <p><strong>Perol:</strong> {content.perol.cordoba}</p>
          </article>
        </div>
      </Reveal>

      <Reveal className="culture-diplomacy">
        <p className="culture-eyebrow">Reservado para cuando perdemos la diplomacia</p>
        <div><strong>🇻🇪 {content.diplomacia.venezolana}</strong><span aria-hidden="true">↔</span><strong>🇪🇸 {content.diplomacia.espanola}</strong></div>
        <small>Pronunciar únicamente bajo vuestra propia responsabilidad.</small>
      </Reveal>
      <style>{`
        .culture-perol{position:relative;z-index:1;max-width:55rem;margin:3.3rem auto 0;padding:1.7rem clamp(1rem,3vw,2.2rem);overflow:hidden;border:1px solid rgba(114,83,154,.18);background:linear-gradient(105deg,rgba(185,161,206,.13),rgba(255,253,248,.88) 43%,rgba(155,170,131,.13));box-shadow:0 26px 62px -48px rgba(62,44,72,.72);text-align:center}.culture-perol:before,.culture-perol:after{content:"";position:absolute;z-index:-1;width:12rem;height:7rem;border-radius:50%;filter:blur(28px);opacity:.32}.culture-perol:before{top:-3rem;left:-4rem;background:#afcadb}.culture-perol:after{right:-4rem;bottom:-3rem;background:#ffe597}.culture-perol-kicker{font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;color:#72539a}.culture-perol-word{display:flex;align-items:center;justify-content:center;gap:1rem;margin:.45rem auto .9rem}.culture-perol-word i{width:clamp(2.5rem,8vw,6rem);height:1px;background:linear-gradient(90deg,transparent,rgba(114,83,154,.34))}.culture-perol-word i:last-child{transform:scaleX(-1)}.culture-perol-word h4{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2rem,5vw,3.1rem);font-weight:500;letter-spacing:.14em;line-height:1;color:#292523}.culture-perol-duel{display:grid;grid-template-columns:1fr 2.8rem 1fr;align-items:stretch}.culture-perol-side{display:grid;grid-template-columns:3.1rem 1fr;align-items:center;gap:.75rem;padding:.8rem 1rem;text-align:left}.culture-perol-side>span{grid-column:1/-1;font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(41,37,35,.52)}.culture-perol-es>span{text-align:right}.culture-perol-side svg{width:3rem;height:3rem;fill:none;stroke:currentColor;stroke-width:1.45;stroke-linecap:round;stroke-linejoin:round;color:#72539a;opacity:.72}.culture-perol-es svg{color:#667653}.culture-perol-side p{font-family:'Arapey',Georgia,serif;font-size:.94rem;line-height:1.35;color:rgba(41,37,35,.72)}.culture-perol-side strong{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.08rem;font-weight:600;color:#292523}.culture-perol-vs{display:grid;place-items:center;font-size:.55rem;letter-spacing:.16em;color:#72539a}.culture-perol-vs:before,.culture-perol-vs:after{content:"";width:1px;height:100%;background:linear-gradient(transparent,rgba(114,83,154,.22))}.culture-perol-vs:after{transform:scaleY(-1)}
        @media(max-width:767px){.culture-perol{margin-top:2.2rem;padding:1.35rem .75rem}.culture-perol-word{margin-bottom:.65rem}.culture-perol-duel{grid-template-columns:1fr}.culture-perol-side{grid-template-columns:2.6rem 1fr;padding:.7rem .45rem}.culture-perol-side svg{width:2.5rem;height:2.5rem}.culture-perol-es>span{text-align:left}.culture-perol-vs{display:flex;gap:.65rem;align-items:center;justify-content:center;margin:.05rem 0;font-size:.52rem}.culture-perol-vs:before,.culture-perol-vs:after{width:3rem;height:1px;background:linear-gradient(90deg,transparent,rgba(114,83,154,.25))}.culture-perol-vs:after{transform:scaleX(-1)}.culture-perol-side p{font-size:.9rem}}
      `}</style>
    </div>
  );
}
