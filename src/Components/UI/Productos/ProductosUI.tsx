import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Gauge, Minus, ShieldCheck, Sparkles } from "lucide-react";
import VisorImagen from "../../UI/Blog/InstalarEnCasa/VisorImagen";
import producto from "../../../Images/product_white.png";
import ficha from "../../../Images/ficha-tecnica.jpg";
import styles from "./Productos.module.css";

/**
 * ProductosUI — EV-KIN HOME 7 y HOME 7 DLB
 *
 * Los dos equipos son físicamente idénticos: misma foto, mismas
 * especificaciones. Lo único que cambia es el balanceo dinámico de carga, así
 * que el diseño pone todo el peso ahí en lugar de fingir diferencias.
 *
 * Sin precios: los pide el visitante por WhatsApp.
 */

export type Product = {
  id: string;
  name: string;
  tagline: string;
  /** Specs que comparten los dos equipos. */
  chips: string[];
  /** El bloque que marca la diferencia entre modelos. */
  feature: { on: boolean; title: string; text: string };
  fit: string;
  /** Sello para el modelo destacado. */
  tag?: string;
};

const PRODUCTOS: Product[] = [
  {
    id: "home-7",
    name: "HOME 7",
    tagline: "Carga de 7 kW en tu casa, controlada desde el celular.",
    chips: ["7 kW", "Tipo 2", "Cable 5 m", "Wi-Fi", "IP65", "IK10"],
    feature: {
      on: false,
      title: "Sin balanceo dinámico",
      text: "Carga siempre a la potencia configurada. Pensado para instalaciones que ya tienen potencia disponible reservada para el cargador.",
    },
    fit: "instalaciones con potencia disponible",
  },
  {
    id: "home-7-dlb",
    name: "HOME 7 DLB",
    tagline: "El mismo equipo, con balanceo dinámico de carga.",
    chips: ["7 kW", "Tipo 2", "Cable 5 m", "Wi-Fi", "IP65", "IK10"],
    feature: {
      on: true,
      title: "No te salta la térmica",
      text: "Mide cuánta potencia está usando la casa y baja la carga del auto cuando prendés el aire acondicionado, el horno o la estufa. Cuando el consumo baja, vuelve a cargar a full.",
    },
    fit: "instalaciones con consumos variables y control de demanda",
    tag: "Más elegido",
  },
];

type ProductosUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  products?: Product[];
  /** Número para los botones de presupuesto, en cualquier formato. */
  whatsapp?: string;
  /** Imagen de la hoja de especificaciones. */
  specSheet?: string;
  photo?: string;
};

export default function ProductosUI({
  eyebrow = "Nuestros productos",
  title = "Dos equipos, una sola diferencia",
  subtitle = "El HOME 7 y el HOME 7 DLB son el mismo cargador: misma potencia, mismo conector, mismos materiales. Lo único que cambia es si el equipo se adapta o no al consumo de la casa.",
  products = PRODUCTOS,
  whatsapp,
  specSheet = ficha,
  photo = producto,
}: ProductosUIProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const digits = whatsapp ? whatsapp.replace(/\D/g, "") : "";

  function quoteHref(product: Product) {
    if (!digits) return undefined;
    const message = `Hola, quiero un presupuesto del EV-KIN ${product.name}.`;
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section className={styles.section} id="productos">
      <motion.div
        className={styles.header}
        {...reveal}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {eyebrow}
        </span>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      <div className={styles.grid}>
        {products.map((product, index) => {
          const href = quoteHref(product);
          return (
            <motion.article
              key={product.id}
              className={styles.card}
              data-featured={product.tag ? "true" : undefined}
              {...reveal}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {product.tag && (
                <span className={styles.tag}>
                  <Sparkles className={styles.tagIcon} aria-hidden="true" />
                  {product.tag}
                </span>
              )}

              <div className={styles.stage}>
                <span className={styles.halo} aria-hidden="true" />
                <img
                  className={styles.photo}
                  src={photo}
                  alt={`Cargador EV-KIN ${product.name}`}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.floor} aria-hidden="true" />
              </div>

              <div className={styles.body}>
                <p className={styles.brand}>EV-KIN</p>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.tagline}>{product.tagline}</p>

                <ul className={styles.chips}>
                  {product.chips.map((chip) => (
                    <li key={chip} className={styles.chip}>
                      {chip}
                    </li>
                  ))}
                </ul>

                <div
                  className={styles.feature}
                  data-on={product.feature.on ? "true" : undefined}
                >
                  <span className={styles.featureIcon} aria-hidden="true">
                    {product.feature.on ? <ShieldCheck /> : <Minus />}
                  </span>
                  <div className={styles.featureCopy}>
                    <p className={styles.featureTitle}>{product.feature.title}</p>
                    <p className={styles.featureText}>{product.feature.text}</p>
                  </div>
                </div>

                <p className={styles.fit}>
                  <Gauge className={styles.fitIcon} aria-hidden="true" />
                  <span>
                    Ideal para <strong>{product.fit}</strong>.
                  </span>
                </p>

                <div className={styles.actions}>
                  {href ? (
                    <a
                      className={styles.primary}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pedir presupuesto
                      <ArrowRight className={styles.arrow} aria-hidden="true" />
                    </a>
                  ) : (
                    <a className={styles.primary} href="/soporte">
                      Pedir presupuesto
                      <ArrowRight className={styles.arrow} aria-hidden="true" />
                    </a>
                  )}

                  <VisorImagen
                    src={specSheet}
                    label="Especificaciones"
                    titulo="Hoja de especificaciones EV-KIN"
                    nombreDescarga="ev-kin-especificaciones.jpg"
                    alt="Hoja de especificaciones de los cargadores EV-KIN HOME 7 y HOME 7 DLB: 7 kW, 230 V AC, 32 A, conector Tipo 2, cable de 5 metros, Wi-Fi, IP65, IK10, y balanceo dinámico de carga solo en la versión DLB."
                  />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p className={styles.footnote}>
        Conectividad Wi‑Fi a través de Smart Life / Tuya. Dos años de garantía para equipos
        instalados por instaladores aprobados.
      </p>

    </section>
  );
}