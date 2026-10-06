import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import bienvenida from "../../../Images/cargador-en-casa.jpg";
// import bienvenida from "../../../Images/bienvenida.jpg";
import styles from "./Hero.module.css";

const SPECS = [
  { value: "7 kW", label: "Potencia" },
  { value: "Tipo 2", label: "Conector" },
  { value: "Wi-Fi", label: "App Smart Life" },
  { value: "IP65", label: "Apto exterior" },
];

export default function Hero() {
  const shouldReduceMotion = !!useReducedMotion();

  const rise = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className={styles.hero} data-still={shouldReduceMotion ? "true" : undefined}>
      <div className={styles.plate}>
        <motion.img
          src={bienvenida}
          alt="cargadores EV-KIN HOME 7 instalado en la pared de una casa moderna, con un auto eléctrico estacionado al lado."
          className={styles.photo}
          width={2400}
          height={1000}
          decoding="async"
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className={styles.band}>
        {/* Visible en celular, solo para Google y lectores de pantalla en escritorio. */}
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            EV-KIN by KINERGIA
          </span>
          <h1 className={styles.title}>Carga inteligente en tu casa</h1>
          <p className={styles.subtitle}>Segura, simple y lista para el futuro.</p>
        </div>

        <motion.div
          className={styles.actions}
          {...rise}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className={styles.primary} href="/productos">
            Ver los modelos
            <ArrowRight className={styles.arrow} aria-hidden="true" />
          </a>
          <a className={styles.secondary} href="/preguntas">
            Preguntas frecuentes
          </a>
        </motion.div>

        <motion.ul
          className={styles.specs}
          {...rise}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {SPECS.map((spec) => (
            <li key={spec.value} className={styles.spec}>
              <span className={styles.specValue}>{spec.value}</span>
              <span className={styles.specLabel}>{spec.label}</span>
            </li>
          ))}
        </motion.ul>

        <a className={styles.scrollCue} href="#contenido">
          <span className={styles.scrollText}>Ver más</span>
          <ChevronDown className={styles.scrollIcon} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
