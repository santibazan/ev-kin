import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

export default function comoFunciona({
  eyebrow = "Cómo funciona",
  title = "De la compra a tu primera carga, en cuatro pasos",
  subtitle = "Nos encargamos de todo el proceso para que vos solo tengas que enchufar.",
  steps = DEFAULT_STEPS,
}: HowItWorksUIProps) {
  const shouldReduceMotion = !!useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const firstMarkerRef = useRef<HTMLSpanElement>(null);
  const lastMarkerRef = useRef<HTMLSpanElement>(null);

  // La "energía" avanza con el scroll: arranca cuando la línea entra en
  // pantalla y llega al último paso cuando está por la mitad.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 55%"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 });
  const progress = useTransform(smooth, (v) => Math.min(1, Math.max(0, v)));

  const [reached, setReached] = useState(shouldReduceMotion ? steps.length : 0);

  useMotionValueEvent(progress, "change", (v) => {
    if (shouldReduceMotion) return;
    const n = steps.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
      const threshold = n === 1 ? 0.02 : Math.max(0.02, i / (n - 1) - 0.015);
      if (v >= threshold) count = i + 1;
    }
    setReached(count);
  });

  // Mide dónde quedan el primer y el último círculo para que la línea vaya
  // exactamente de centro a centro, en horizontal o en vertical.
  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    const first = firstMarkerRef.current;
    const last = lastMarkerRef.current;
    if (!timeline || !first || !last) return;

    function measure() {
      if (!timeline || !first || !last) return;
      const t = timeline.getBoundingClientRect();
      const a = first.getBoundingClientRect();
      const b = last.getBoundingClientRect();
      timeline.style.setProperty("--x1", `${a.left + a.width / 2 - t.left}px`);
      timeline.style.setProperty("--y1", `${a.top + a.height / 2 - t.top}px`);
      timeline.style.setProperty("--x2", `${b.left + b.width / 2 - t.left}px`);
      timeline.style.setProperty("--y2", `${b.top + b.height / 2 - t.top}px`);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(timeline);
    return () => observer.disconnect();
  }, [steps.length]);

  const trackStyle = {
    "--p": shouldReduceMotion ? 1 : progress,
  } as unknown as CSSProperties;

  return (
    <section className={styles.section}>
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

      <div ref={timelineRef} className={styles.timeline}>
        <motion.div className={styles.track} style={trackStyle} aria-hidden="true">
          <span className={styles.fill} />
          <span className={styles.head} />
        </motion.div>

        <ol className={styles.steps}>
          {steps.map((step, index) => {
            const isOn = index < reached;
            return (
              <li
                key={step.title}
                className={styles.step}
                data-on={isOn ? "true" : "false"}
                aria-current={index === reached - 1 ? "step" : undefined}
              >
                <span
                  ref={
                    index === 0
                      ? firstMarkerRef
                      : index === steps.length - 1
                        ? lastMarkerRef
                        : undefined
                  }
                  className={styles.marker}
                >
                  {index + 1}
                </span>
                <div className={styles.stepBody}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
