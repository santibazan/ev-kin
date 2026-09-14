import type { ReactNode } from "react";
import { Wrench, ShieldCheck, Zap, Headphones } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Beneficios.module.css";

type Benefit = {
  icon: ReactNode;
  title: string;
  description: string;
};

type BenefitsUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  benefits?: Benefit[];
};

const DEFAULT_BENEFITS: Benefit[] = [
  {
    icon: <Wrench />,
    title: "Instalación profesional incluida",
    description:
      "Un técnico certificado instala tu cargador en tu casa o negocio, sin vueltas ni sorpresas.",
  },
  {
    icon: <ShieldCheck />,
    title: "Garantía en cada equipo",
    description:
      "Todos nuestros cargadores están cubiertos ante cualquier falla de fábrica desde el día uno.",
  },
  {
    icon: <Zap />,
    title: "Compatible con cualquier auto eléctrico",
    description:
      "Un solo cargador para cualquier marca o modelo, sin adaptadores ni complicaciones.",
  },
  {
    icon: <Headphones />,
    title: "Soporte cuando lo necesites",
    description:
      "Estamos para ayudarte antes, durante y después de la instalación, por el canal que prefieras.",
  },
];

export default function Beneficios({
  eyebrow = "Por qué elegir ev-kin",
  title = "Cargar tu auto no debería ser complicado",
  subtitle = "Diseñamos toda la experiencia — desde elegir el cargador hasta usarlo todos los días — para que sea simple.",
  benefits = DEFAULT_BENEFITS,
}: BenefitsUIProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.grid}>
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className={styles.card}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
          >
            <div className={styles.icon}>{benefit.icon}</div>
            <h3 className={styles.cardTitle}>{benefit.title}</h3>
            <p className={styles.cardDescription}>{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
