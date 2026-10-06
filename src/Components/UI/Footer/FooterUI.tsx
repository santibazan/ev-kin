import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import imgLogoMark from "../../../Images/logo-mark.png";
import styles from "./FooterUI.module.css";

/**
 * FooterUI
 *
 * Solo enlaza páginas que existen de verdad. El footer viejo linkeaba a
 * "Precios", "Estaciones públicas", "Prensa", "Sustentabilidad" y "Trabajá con
 * nosotros", que no existen — y "Precios" además va en contra de la decisión
 * del cliente de no mostrarlos.
 *
 * Las redes sociales se renderizan solo si tienen URL: mientras estén vacías,
 * no aparece nada. Un ícono que lleva a "#" se nota y queda peor que no
 * tenerlo.
 */


/**
 * Los logos de marcas salieron de lucide-react, así que los dibujamos acá.
 * Mismo grosor de trazo que el resto de los íconos del sitio.
 */
type IconoProps = { className?: string };

function IconoInstagram({ className }: IconoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconoFacebook({ className }: IconoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16.5 3h-2.6A4.4 4.4 0 0 0 9.5 7.4V10H7v3.6h2.5V21h3.6v-7.4h2.6l.8-3.6h-3.4V7.6c0-.6.4-1 1-1h2.4z" />
    </svg>
  );
}

function IconoLinkedin({ className }: IconoProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15.5 8.5A5.5 5.5 0 0 1 21 14v6.5h-3.5V14a2 2 0 0 0-4 0v6.5H10V9h3.5v1.4a5.5 5.5 0 0 1 2-1.9z" />
      <rect x="3" y="9" width="3.5" height="11.5" rx="0.6" />
      <circle cx="4.75" cy="4.5" r="1.9" />
    </svg>
  );
}

type Grupo = {
  label: string;
  links: { title: string; href: string }[];
};

const GRUPOS: Grupo[] = [
  {
    label: "Equipos",
    links: [
      { title: "Nuestros productos", href: "/productos" },
      { title: "Instalación", href: "/instalacion" },
      { title: "Preguntas frecuentes", href: "/preguntas" },
    ],
  },
  {
    label: "Aprender",
    links: [
      { title: "Cargar en casa o en la red pública", href: "/blog/casa-o-red-publica" },
      { title: "Qué mirar antes de instalar", href: "/blog/antes-de-instalar" },
      { title: "Calcular el tiempo de carga", href: "/blog/tiempo-de-carga" },
      { title: "Tipos de cargadores", href: "/blog/tipos-de-cargadores" },
    ],
  },
  {
    label: "EV-KIN",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Soporte", href: "/soporte" },
    ],
  },
];

type FooterUIProps = {
  /** Número de WhatsApp, en cualquier formato. */
  whatsapp?: string;
  email?: string;
  zona?: string;
  /** Poné la URL de cada red que exista. Las vacías no se muestran. */
  redes?: { instagram?: string; facebook?: string; linkedin?: string };
};

export default function FooterUI({
  whatsapp,
  email,
  zona = "Mendoza, Argentina",
  redes = {},
}: FooterUIProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const digits = whatsapp ? whatsapp.replace(/\D/g, "") : "";
  const whatsappHref = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(
        "Hola, quiero consultar por los cargadores EV-KIN.",
      )}`
    : undefined;

  const socialLinks = [
    { title: "Instagram", href: redes.instagram, Icon: IconoInstagram },
    { title: "Facebook", href: redes.facebook, Icon: IconoFacebook },
    { title: "LinkedIn", href: redes.linkedin, Icon: IconoLinkedin },
  ].filter((red): red is { title: string; href: string; Icon: typeof IconoInstagram } =>
    Boolean(red.href),
  );

  // Un solo disparador para toda la fila; los hijos heredan la variante.
  const contenedor = shouldReduceMotion
    ? {}
    : {
        initial: "oculto",
        whileInView: "visible",
        viewport: { once: true, margin: "-60px" } as const,
        variants: {
          visible: { transition: { staggerChildren: 0.08 } },
        },
      };

  const item = shouldReduceMotion
    ? undefined
    : {
        oculto: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <motion.div className={styles.top} {...contenedor}>
          <motion.div className={styles.marca} variants={item}>
            <a className={styles.logo} href="/" aria-label="EV-KIN by Kinergia — inicio">
              <img src={imgLogoMark} alt="" className={styles.logoMark} />
              <span className={styles.logoTexto}>
                EV-KIN
                <span className={styles.logoSub}>by Kinergia</span>
              </span>
            </a>

            <p className={styles.descripcion}>
              Cargadores para autos eléctricos pensados para integrarse a tu casa o tu negocio,
              con instalación profesional y soporte propio.
            </p>

            <ul className={styles.contacto}>
              {whatsappHref && (
                <li>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className={styles.contactoIcon} aria-hidden="true" />
                    {whatsapp}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`}>
                    <Mail className={styles.contactoIcon} aria-hidden="true" />
                    {email}
                  </a>
                </li>
              )}
              <li>
                <span>
                  <MapPin className={styles.contactoIcon} aria-hidden="true" />
                  {zona}
                </span>
              </li>
            </ul>

            {socialLinks.length > 0 && (
              <div className={styles.redes}>
                {socialLinks.map(({ title, href, Icon }) => (
                  <a
                    key={title}
                    className={styles.red}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={title}
                  >
                    <Icon className={styles.redIcon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          <nav className={styles.columnas} aria-label="Enlaces del sitio">
            {GRUPOS.map((grupo) => (
              <motion.div key={grupo.label} className={styles.grupo} variants={item}>
                <h3 className={styles.grupoTitulo}>{grupo.label}</h3>
                <ul className={styles.lista}>
                  {grupo.links.map((link) => (
                    <li key={link.title}>
                      <a className={styles.link} href={link.href}>
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        <div className={styles.barra}>
          <p>© {new Date().getFullYear()} EV-KIN. Una marca de Kinergia.</p>
          <p className={styles.barraNota}>Energía en movimiento</p>
        </div>
      </div>
    </footer>
  );
}