import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Cpu, PenTool, ShieldCheck } from "lucide-react";
import styles from "./Marca.module.css";

/**
 * MarcaUI — bloque institucional de la página de inicio.
 *
 * Va después del hero y antes de "Por qué elegir ev-kin": explica quién está
 * detrás del producto antes de empezar a argumentar por qué comprarlo.
 *
 * Los cuatro pilares no son invento: son las cuatro palabras que el propio
 * texto nombra (seguridad, calidad, diseño y tecnología), sacadas del párrafo
 * y puestas donde se leen de un vistazo.
 */

const PILARES = [
  { icon: ShieldCheck, label: "Seguridad" },
  { icon: BadgeCheck, label: "Calidad" },
  { icon: PenTool, label: "Diseño" },
  { icon: Cpu, label: "Tecnología" },
];

const TITULO = ["Diseñado para integrarse.", "Preparado para durar."];

type MarcaUIProps = {
  eyebrow?: string;
  lines?: string[];
  paragraphs?: string[];
};

export default function MarcaUI({
  eyebrow = "EV-KIN by KINERGIA",
  lines = TITULO,
  paragraphs = [
    "EV-KIN es una marca de Kinergia creada para ofrecer soluciones de movilidad eléctrica que combinan seguridad, calidad, diseño y tecnología.",
    "Seleccionamos equipos confiables, seguros y funcionales, pensados para integrarse naturalmente a tu casa o negocio.",
  ],
}: MarcaUIProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const viewport = { once: true, margin: "-90px" } as const;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Un solo disparador para toda la columna.
            Los hijos NO pueden dispararse solos: la línea del título arranca
            escondida detrás de su máscara y la regla arranca en scaleX(0), y un
            elemento recortado o de área cero nunca cuenta como "visible" para
            el IntersectionObserver — la animación quedaría esperando para
            siempre. Este div sí es grande y visible, y framer propaga las
            variantes hacia abajo. */}
        <motion.div
          className={styles.left}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={viewport}
        >
          <motion.span
            className={styles.eyebrow}
            variants={
              shouldReduceMotion
                ? undefined
                : {
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { duration: 0.5 } },
                  }
            }
          >
            <span className={styles.dot} aria-hidden="true" />
            {eyebrow}
          </motion.span>

          <h2 className={styles.heading}>
            {lines.map((line, index) => (
              <span key={line} className={styles.lineMask}>
                <motion.span
                  className={styles.line}
                  data-soft={index === lines.length - 1 ? "true" : undefined}
                  variants={
                    shouldReduceMotion
                      ? undefined
                      : {
                          hidden: { y: "108%" },
                          show: {
                            y: "0%",
                            transition: {
                              duration: 0.75,
                              delay: 0.1 + index * 0.12,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }
                  }
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.span
            className={styles.rule}
            aria-hidden="true"
            variants={
              shouldReduceMotion
                ? undefined
                : {
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: 1,
                      transition: { duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                    },
                  }
            }
          />
        </motion.div>

        <div className={styles.right}>
          {paragraphs.map((text, index) => (
            <motion.p
              key={text}
              className={index === 0 ? styles.paragraphLead : styles.paragraph}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {text}
            </motion.p>
          ))}

          <ul className={styles.pilares}>
            {PILARES.map((pilar, index) => {
              const Icon = pilar.icon;
              return (
                <motion.li
                  key={pilar.label}
                  className={styles.pilar}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className={styles.pilarIcon} aria-hidden="true">
                    <Icon className={styles.pilarGlyph} />
                  </span>
                  {pilar.label}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
