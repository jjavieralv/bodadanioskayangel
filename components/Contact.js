import Reveal from "@/components/Reveal";
import site from "@/content/site.json";

export default function Contact() {
  return (
    <div className="contact-card">
      <div className="contact-wash contact-wash-one" aria-hidden="true" />
      <div className="contact-wash contact-wash-two" aria-hidden="true" />

      <Reveal className="contact-intro">
        <p className="contact-kicker">¿Todavía quedan dudas?</p>
        <p>
          Si después de toda esta web todavía necesitáis preguntarnos algo, escribidnos.
          <br />
          <strong>A estas alturas, una notificación más ya no puede hacernos daño. Whatsapp suele funcionar mejor</strong>
        </p>
      </Reveal>

      <div className="contact-options">
        {site.contacto.telefonos.map((telefono, index) => (
          <Reveal className="contact-option" delay={index * 90} key={telefono.nombre}>
            <span className="contact-initial" aria-hidden="true">{telefono.nombre.charAt(0)}</span>
            <div>
              <small>Teléfono de {telefono.nombre}</small>
              <a href={`tel:${telefono.href}`}>{telefono.numero}</a>
            </div>
          </Reveal>
        ))}

        <Reveal className="contact-option contact-email" delay={180}>
          <span className="contact-initial contact-envelope" aria-hidden="true">✉</span>
          <div>
            <small>Correo de la boda</small>
            <a href={`mailto:${site.contacto.email}`}>{site.contacto.email}</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
