import { motion, useReducedMotion } from "framer-motion";
import styles from "./ComoFunciona.module.css";

type Step = {
  title: string;
  description: string;
};

type HowItWorksUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  steps?: Step[];
};

const DEFAULT_STEPS: Step[] = [
  {
    title: "Elegís tu cargador",
    description: "Mirá nuestros modelos y elegí el que mejor se adapta a tu casa o negocio.",
  },
  {
    title: "Coordinamos la instalación",
    description: "Te contactamos para agendar una fecha y relevar tu instalación eléctrica.",
  },
  {
    title: "Instalamos en el lugar",
    description: "Un técnico certificado instala y configura tu cargador de punta a punta.",
  },
  {
    title: "Empezás a cargar",
    description: "Enchufás tu auto y listo: carga rápida, segura y desde tu propio lugar.",
  },
];

export default function ComoFunciona({
  eyebrow = "Cómo funciona",
  title = "De la compra a tu primera carga, en cuatro pasos",
  subtitle = "Nos encargamos de todo el proceso para que vos solo tengas que enchufar.",
  steps = DEFAULT_STEPS,
}: HowItWorksUIProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.timeline}>
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            className={styles.step}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
          >
            <div className={styles.stepMarker}>
              <span className={styles.stepNumber}>{index + 1}</span>
              {index < steps.length - 1 && <span className={styles.stepLine} aria-hidden="true" />}
            </div>
            <div className={styles.stepBody}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
