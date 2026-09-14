import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import styles from "./Preguntas.module.css";

export type FaqItem = {
  question: string;
  answer: string;
};

type PreguntasUIProps = {
  title?: string;
  items?: FaqItem[];
  /** Índices que arrancan abiertos. Por defecto ninguno. */
  defaultOpen?: number[];
};

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "¿Qué es exactamente este producto?",
    answer:
      "Ev-kin Home Pro es un cargador pensado para cargar tu auto eléctrico de forma simple y segura, en tu casa o en tu negocio. ",
  },
  {
    question: "¿Con qué vehículos es compatible?",
    answer:
      "Es compatible con autos eléctricos e híbridos enchufables que usen conector Tipo 2, el más común en la región. Esto incluye marcas como BYD, Renault, Chery, Geely, JAC, Dongfeng, Bestune, Leapmotor, Hyundai, Chevrolet, Volvo, OMODA, BMW, AUDI, entre otros. ",
  },
//   {
//     question: "¿Necesito un electricista para instalarlo?",
//     answer:
//       "No tenés que preocuparte por eso: la instalación la coordinamos nosotros con un técnico certificado. ",
//   },
  {
    question: "¿Es seguro usarlo en exteriores o si llueve?",
    answer:
      "Sí, el cargador está diseñado para ser robusto y resistente. Cuenta con un grado de protección IP67 (conexión al vehículo) e IP55 (caja del cargador) que lo hace resistente al agua y al polvo, por lo que es seguro utilizarlo en exteriores con condiciones de polvo y lluvia pero no debe ser sumergido en agua.",
  },
  {
    question: "¿Qué garantía tiene?",
    answer:
      "Todos nuestros cargadores están cubiertos ante fallas de fábrica. ",
  },
  {
    question: "¿Qué incluye el paquete?",
    answer:
      " Cable de 5 metros. Adaptador Schuko (macho, hasta 16 A) a ficha industrial (hembra). 2 soportes para montaje en pared. Bolso de transporte y manual en español.",
  },
];

export default function PreguntasUI({
  title = "Preguntas frecuentes",
  items = DEFAULT_ITEMS,
  defaultOpen = [],
}: PreguntasUIProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set(defaultOpen));

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.list}>
          {items.map((item, index) => {
            const isOpen = openIndexes.has(index);
            return (
              <div key={item.question} className={styles.item}>
                <button
                  type="button"
                  className={styles.questionRow}
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span className={styles.icon}>
                    {isOpen ? <Minus /> : <Plus />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.answerWrap}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className={styles.answer}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
