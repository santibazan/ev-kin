import { useRef, type PointerEvent, type ReactNode } from "react";
import { Wrench, ShieldCheck, Zap, Headphones } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
  /** Los primeros cuatro llevan una ilustración animada según su posición. */
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
    icon: <Headphones />,
    title: "Soporte cuando lo necesites",
    description:
      "Estamos para ayudarte antes, durante y después de la instalación, por el canal que prefieras.",
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
];

/** Grilla en damero: ancho, angosto / angosto, ancho. */
const LAYOUT: Array<{ wide: boolean; visual: "install" | "support" | "battery" | null }> = [
  { wide: true, visual: "install" },
  { wide: false, visual: "support" },
  { wide: false, visual: null },
  { wide: true, visual: "battery" },
];

export default function Beneficios({
  eyebrow = "Por qué elegir ev-kin",
  title = "Cargar tu auto no debería ser complicado",
  subtitle = "Diseñamos toda la experiencia — desde elegir el cargador hasta usarlo todos los días — para que sea simple.",
  benefits = DEFAULT_BENEFITS,
}: BenefitsUIProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Las ilustraciones solo se animan mientras la sección está en pantalla.
  const inView = useInView(sectionRef, { amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-playing={inView && !shouldReduceMotion ? "true" : "false"}
    >
      <motion.div
        className={styles.header}
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 22 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
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
        {benefits.map((benefit, index) => (
          <BenefitCard
            key={benefit.title}
            benefit={benefit}
            index={index}
            wide={LAYOUT[index]?.wide ?? false}
            visual={LAYOUT[index]?.visual ?? null}
            reduceMotion={!!shouldReduceMotion}
          />
        ))}
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  index,
  wide,
  visual,
  reduceMotion,
}: {
  benefit: Benefit;
  index: number;
  wide: boolean;
  visual: "install" | "support" | "battery" | null;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  // Mueve el foco de luz con el cursor sin re-renderizar: escribe variables CSS.
  function trackPointer(event: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    el.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  }

  return (
    <motion.article
      ref={ref}
      onPointerMove={reduceMotion ? undefined : trackPointer}
      className={`${styles.card} ${wide ? styles.wide : ""} ${visual ? styles.hasVisual : ""}`}
      initial={reduceMotion ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <span className={styles.spotlight} aria-hidden="true" />

      {visual && (
        <div className={styles.visual} aria-hidden="true">
          {visual === "install" && <InstallVisual />}
          {visual === "support" && <SupportVisual />}
          {visual === "battery" && <BatteryVisual />}
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.icon}>{benefit.icon}</div>
        <h3 className={styles.cardTitle}>{benefit.title}</h3>
        <p className={styles.cardDescription}>{benefit.description}</p>
      </div>
    </motion.article>
  );
}

/** Tablero eléctrico → cable → cargador, con un pulso de energía viajando. */
function InstallVisual() {
  return (
    <svg className={styles.installSvg} viewBox="0 0 320 150" fill="none">
      {/* tablero */}
      <rect x="18" y="26" width="76" height="92" rx="9" className={styles.stroke} />
      <rect x="31" y="42" width="50" height="13" rx="3" className={styles.breaker} />
      <rect x="31" y="62" width="50" height="13" rx="3" className={`${styles.breaker} ${styles.breakerOn}`} />
      <rect x="31" y="82" width="50" height="13" rx="3" className={styles.breaker} />
      <text x="56" y="138" textAnchor="middle" className={styles.svgLabel}>
        Tablero
      </text>

      {/* cable base */}
      <path
        d="M94 69 C 150 69, 168 112, 236 104"
        className={styles.cable}
        pathLength={100}
      />
      {/* pulso de energía */}
      <path
        d="M94 69 C 150 69, 168 112, 236 104"
        className={`${styles.pulse} ${styles.anim}`}
        pathLength={100}
      />

      {/* cargador */}
      <rect x="236" y="18" width="64" height="100" rx="17" className={styles.charger} />
      <rect x="250" y="32" width="36" height="20" rx="4" className={styles.chargerScreen} />
      <circle cx="268" cy="84" r="14" className={`${styles.ledRing} ${styles.anim}`} />
      <circle cx="268" cy="84" r="6" className={styles.ledCore} />
      <text x="268" y="138" textAnchor="middle" className={styles.svgLabel}>
        Cargador
      </text>
    </svg>
  );
}

/** Un cliente pregunta y ev-kin está respondiendo. */
function SupportVisual() {
  return (
    <div className={styles.support}>
      <span className={styles.onlinePill}>
        <span className={`${styles.onlineDot} ${styles.anim}`} />
        En línea
      </span>
      <div className={styles.chat}>
        <p className={styles.question}>¿Cuándo pueden venir a instalar?</p>
        <div className={styles.bubble}>
          <span className={`${styles.typing} ${styles.anim}`} />
          <span className={`${styles.typing} ${styles.anim}`} />
          <span className={`${styles.typing} ${styles.anim}`} />
        </div>
      </div>
    </div>
  );
}

/** Batería que se llena celda por celda, de izquierda a derecha. */
function BatteryVisual() {
  return (
    <div className={styles.battery}>
      <div className={styles.batteryBody}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={styles.cell} />
        ))}
        <span className={`${styles.charge} ${styles.anim}`} />
      </div>
      <span className={styles.batteryNub} />
      <div className={styles.batteryScale}>
        <span>0 %</span>
        <span>SoC</span>
        <span>100 %</span>
      </div>
    </div>
  );
}
