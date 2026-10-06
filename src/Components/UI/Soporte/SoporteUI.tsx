import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Send, ShieldCheck } from "lucide-react";
import styles from "./Soporte.module.css";

export type SoporteFormData = {
  nombre: string;
  email: string;
  telefono: string;
  comentario: string;
};

type SoporteUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  whatsapp?: string;
  email?: string;
  schedule?: string;
  address?: string;
  onSubmit?: (data: SoporteFormData) => void;
};

const VACIO: SoporteFormData = { nombre: "", email: "", telefono: "", comentario: "" };

export default function SoporteUI({
  eyebrow = "Soporte",
  title = "Atención al cliente",
  subtitle = "Contanos qué necesitás y te respondemos a la brevedad. Si es una consulta técnica, sumá el modelo de tu auto: ayuda a resolverla de una.",
  whatsapp = "+54 9 11 2631-4831",
  email = "aldo.sarelli@kinergiasas.com",
  schedule = "Lunes a viernes, de 10:00 a 17:00",
  address = "Buenos Aires",
  onSubmit,
}: SoporteUIProps) {
  const shouldReduceMotion = !!useReducedMotion();
  const [form, setForm] = useState<SoporteFormData>(VACIO);
  /** Cuando se envía, guardamos el link para poder reintentar si el navegador bloqueó la pestaña. */
  const [enviadoA, setEnviadoA] = useState<string | null>(null);

  const digits = whatsapp.replace(/\D/g, "");

  function handleChange(
    field: keyof SoporteFormData,
  ): (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    // El valor se lee ANTES de entrar al updater: React recicla el evento y
    // adentro de setForm ya no existe.
    return (e) => {
      const value = e.currentTarget.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(form);

    if (!digits) return;

    const mensaje = [
      `Hola, soy ${form.nombre || "un visitante de la web"}.`,
      "",
      form.comentario,
      "",
      `Teléfono: ${form.telefono || "-"}`,
      `Email: ${form.email || "-"}`,
    ].join("\n");

    const url = `https://wa.me/${digits}?text=${encodeURIComponent(mensaje)}`;
    setEnviadoA(url);
    // En pestaña nueva: así el visitante no pierde la página al volver.
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function volverAlFormulario() {
    setEnviadoA(null);
    setForm(VACIO);
  }

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section className={styles.section} id="soporte">
      <motion.div
        className={styles.header}
        {...reveal}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {eyebrow}
        </span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      <div className={styles.grid}>
        {/* ---------------------------------------- formulario */}

        <motion.div
          className={styles.formCard}
          {...reveal}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {enviadoA ? (
            <div className={styles.exito} role="status">
              <span className={styles.exitoIcono} aria-hidden="true">
                <MessageCircle />
              </span>
              <p className={styles.exitoTitulo}>Abrimos WhatsApp con tu mensaje</p>
              <p className={styles.exitoTexto}>
                Solo falta que lo envíes desde ahí. Si no se abrió ninguna ventana, es porque el
                navegador la bloqueó.
              </p>
              <div className={styles.exitoAcciones}>
                <a
                  className={styles.primary}
                  href={enviadoA}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir WhatsApp
                </a>
                <button type="button" className={styles.secondary} onClick={volverAlFormulario}>
                  Escribir otra consulta
                </button>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
              <div className={styles.row}>
                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="soporte-nombre">
                    Nombre
                  </label>
                  <input
                    id="soporte-nombre"
                    type="text"
                    name="nombre"
                    autoComplete="name"
                    className={styles.input}
                    value={form.nombre}
                    onChange={handleChange("nombre")}
                    required
                  />
                </div>

                <div className={styles.campo}>
                  <label className={styles.label} htmlFor="soporte-email">
                    Correo electrónico
                  </label>
                  <input
                    id="soporte-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={styles.input}
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="soporte-telefono">
                  Teléfono <span className={styles.opcional}>(opcional)</span>
                </label>
                <input
                  id="soporte-telefono"
                  type="tel"
                  name="telefono"
                  autoComplete="tel"
                  className={styles.input}
                  value={form.telefono}
                  onChange={handleChange("telefono")}
                />
              </div>

              <div className={styles.campo}>
                <label className={styles.label} htmlFor="soporte-comentario">
                  Contanos tu consulta
                </label>
                <textarea
                  id="soporte-comentario"
                  name="comentario"
                  rows={5}
                  className={styles.textarea}
                  value={form.comentario}
                  onChange={handleChange("comentario")}
                  required
                />
              </div>

              <button type="submit" className={styles.submit}>
                <Send className={styles.submitIcon} aria-hidden="true" />
                Enviar por WhatsApp
              </button>

              <p className={styles.aviso}>
                Al enviar se abre WhatsApp con el mensaje ya escrito. Lo mandás vos desde ahí.
              </p>
            </form>
          )}
        </motion.div>

        {/* ---------------------------------------- información */}

        <motion.aside
          className={styles.infoCard}
          {...reveal}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className={styles.infoHeading}>Información de contacto</h3>
          <p className={styles.infoIntro}>
            Escribinos por donde te quede más cómodo. El formulario y el WhatsApp van al mismo
            lugar.
          </p>

          <ul className={styles.infoList}>
            {digits && (
              <li className={styles.infoItem}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <MessageCircle />
                </span>
                <span className={styles.infoCuerpo}>
                  <span className={styles.infoLabel}>WhatsApp</span>
                  <a
                    className={styles.infoLink}
                    href={`https://wa.me/${digits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {whatsapp}
                  </a>
                </span>
              </li>
            )}

            <li className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">
                <Mail />
              </span>
              <span className={styles.infoCuerpo}>
                <span className={styles.infoLabel}>E-mail</span>
                <a className={styles.infoLink} href={`mailto:${email}`}>
                  {email}
                </a>
              </span>
            </li>

            <li className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">
                <Clock />
              </span>
              <span className={styles.infoCuerpo}>
                <span className={styles.infoLabel}>Horario</span>
                <span className={styles.infoValor}>{schedule}</span>
              </span>
            </li>

            <li className={styles.infoItem}>
              <span className={styles.infoIcon} aria-hidden="true">
                <MapPin />
              </span>
              <span className={styles.infoCuerpo}>
                <span className={styles.infoLabel}>Ubicación</span>
                <span className={styles.infoValor}>{address}</span>
              </span>
            </li>
          </ul>

          <p className={styles.infoNota}>
            <ShieldCheck className={styles.infoNotaIcon} aria-hidden="true" />
            ¿Es por una instalación? Contanos cómo es tu tablero y dónde estacionás, y te
            coordinamos con un instalador de la red.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}