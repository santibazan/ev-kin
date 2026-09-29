import { useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  Cable,
  CircleCheck,
  ClipboardList,
  Gauge,
  MapPin,
  MessageCircle,
  Power,
  ShieldCheck,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";
import styles from "./Instalacion.module.css";

/**
 * InstalacionUI — "Red de instalación EV-KIN"
 *
 * Todo el contenido vive en una sola sección, pero plegado: los siete pasos
 * son una lista donde se abre uno por vez, y los dos montajes típicos están
 * en pestañas HOME 7 / HOME 7 DLB. Así entra completo sin volverse un muro
 * de texto en celular.
 */

type IconType = ComponentType<{ className?: string }>;

type Step = {
  id: string;
  icon: IconType;
  title: string;
  /** Frase que introduce la lista, cuando el paso tiene lista. */
  intro?: string;
  paragraphs?: string[];
  items?: string[];
};

type Montaje = {
  id: string;
  label: string;
  note?: string;
  paragraphs?: string[];
  includes?: string;
  items: string[];
};

const FICHA = [
  { icon: Zap, label: "Alimentación", value: "230 V AC monofásica" },
  { icon: Cable, label: "Cable dedicado", value: "3 × 6 mm² — Fase + Neutro + Tierra" },
  { icon: Power, label: "Interruptor termomagnético", value: "32 A" },
  { icon: ShieldCheck, label: "Interruptor diferencial", value: "40 A – 30 mA" },
  { icon: Anchor, label: "Puesta a tierra", value: "Conexión PE obligatoria" },
  { icon: Gauge, label: "Potencia máxima del cargador", value: "7 kW / 32 A" },
];

const STEPS: Step[] = [
  {
    id: "relevamiento",
    icon: ClipboardList,
    title: "Relevamiento de la instalación",
    intro: "Primero se verifica:",
    items: [
      "Potencia disponible",
      "Tensión de alimentación",
      "Capacidad del tablero eléctrico",
      "Estado de conductores",
      "Protecciones existentes",
      "Puesta a tierra",
      "Ubicación del vehículo y punto de carga",
      "Disponibilidad de señal Wi‑Fi",
    ],
  },
  {
    id: "punto-montaje",
    icon: MapPin,
    title: "Definición del punto de montaje",
    paragraphs: [
      "Se selecciona una pared o estructura firme, en una posición accesible y cercana al área habitual de estacionamiento.",
      "El objetivo es que el usuario pueda conectar el vehículo cómodamente y manipular el cable de forma simple y segura.",
    ],
  },
  {
    id: "alimentacion",
    icon: Cable,
    title: "Alimentación eléctrica dedicada",
    paragraphs: [
      "Se recomienda una línea dedicada desde el tablero hacia el cargador, correctamente dimensionada según la potencia del equipo y la longitud del tendido.",
    ],
  },
  {
    id: "protecciones",
    icon: ShieldCheck,
    title: "Protecciones eléctricas",
    paragraphs: [
      "La instalación debe contemplar las protecciones eléctricas correspondientes y las condiciones de seguridad exigidas para este tipo de equipos.",
    ],
  },
  {
    id: "montaje",
    icon: Wrench,
    title: "Montaje físico del cargador",
    paragraphs: [
      "Se fija el equipo sobre muro, se realiza el conexionado y se deja resuelta la posición del cable para un uso cómodo, prolijo y seguro.",
    ],
  },
  {
    id: "puesta-en-marcha",
    icon: Wifi,
    title: "Configuración y puesta en marcha",
    paragraphs: [
      "Luego del montaje se energiza el equipo, se verifica su funcionamiento, se conecta a Wi-Fi y se configura la app Smart Life / Tuya.",
    ],
  },
  {
    id: "verificacion",
    icon: CircleCheck,
    title: "Verificación final",
    intro: "Antes de entregar el sistema al usuario se valida:",
    items: [
      "Funcionamiento del cargador",
      "Estado de conexión",
      "Correcta carga del vehículo",
      "Uso general del equipo",
      "Configuración del DLB, en el caso de la versión HOME 7 DLB",
    ],
  },
];

const MONTAJES: Montaje[] = [
  {
    id: "home-7",
    label: "EV-KIN HOME 7",
    items: [
      "Cargador EV-KIN montado en pared",
      "Alimentación eléctrica dedicada desde tablero",
      "Protecciones eléctricas correspondientes",
      "Puesta a tierra verificada",
      "Conexión Wi‑Fi para monitoreo y configuración",
      "Espacio libre para enrollado y uso cómodo del cable",
      "Prueba final con vehículo",
    ],
  },
  {
    id: "home-7-dlb",
    label: "EV-KIN HOME 7 DLB",
    includes: "Incluye todo el montaje del HOME 7",
    paragraphs: [
      "En la versión con DLB, además del montaje anterior, se incorpora el sistema de medición o control necesario para que el cargador pueda gestionar dinámicamente la potencia disponible de la instalación.",
      "Esto permite que el equipo adapte la carga según el consumo del inmueble, mejorando la seguridad y optimizando el uso de la energía.",
    ],
    items: [
      "Sistema de medición o control de la potencia disponible del inmueble",
      "Configuración del balanceo dinámico de carga",
    ],
  },
];

const CADENA = ["Producto", "Instalación", "Puesta en marcha", "Respaldo"];

type InstalacionUIProps = {
  eyebrow?: string;
  title?: string;
  /** Número para los botones de WhatsApp, en cualquier formato. */
  whatsapp?: string;
};

export default function InstalacionUI({
  eyebrow = "Instalación",
  title = "Red de instalación EV-KIN",
  whatsapp,
}: InstalacionUIProps) {
  const shouldReduceMotion = !!useReducedMotion();
  const [openStep, setOpenStep] = useState<string>(STEPS[0].id);
  const [montaje, setMontaje] = useState<string>(MONTAJES[0].id);

  const activeMontaje = MONTAJES.find((item) => item.id === montaje) ?? MONTAJES[0];

  const digits = whatsapp ? whatsapp.replace(/\D/g, "") : "";
  const waLink = (text: string) =>
    digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : undefined;

  const consultaHref = waLink("Hola, quiero coordinar la instalación de un cargador EV-KIN.");
  const instaladorHref = waLink("Hola, soy instalador y quiero sumarme a la red EV-KIN.");

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <section className={styles.section} id="instalacion">
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
        <p className={styles.lead}>
          En EV-KIN trabajamos con una red de instaladores aprobados para asegurar que cada equipo
          quede correctamente montado, protegido y configurado.
        </p>
        <p className={styles.leadSecondary}>
          No se trata solo de colocar un cargador en la pared: una buena instalación garantiza
          seguridad, confiabilidad, experiencia de uso y vigencia de la garantía. Nuestros partners
          de instalación reciben lineamientos técnicos para evaluar la instalación existente,
          dimensionar correctamente la protección eléctrica y ejecutar un montaje prolijo, seguro y
          duradero.
        </p>
      </motion.div>

      {/* ---------------------------------------- ficha eléctrica */}

      <motion.div
        className={styles.ficha}
        {...reveal}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.fichaHead}>
          <p className={styles.fichaTitle}>Instalación típica EV-KIN HOME 7 / HOME 7 DLB</p>
          <p className={styles.fichaNote}>
            El cargador deberá contar con un circuito eléctrico dedicado desde el tablero de
            alimentación.
          </p>
        </div>

        <ul className={styles.fichaList}>
          {FICHA.map((row) => {
            const Icon = row.icon;
            return (
              <li key={row.label} className={styles.fichaRow}>
                <span className={styles.fichaIcon} aria-hidden="true">
                  <Icon className={styles.iconGlyph} />
                </span>
                <span className={styles.fichaLabel}>{row.label}</span>
                <span className={styles.fichaValue}>{row.value}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* ---------------------------------------- los siete pasos */}

      <motion.div
        className={styles.block}
        {...reveal}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className={styles.blockTitle}>Cómo se instala un EV-KIN</h3>
        <p className={styles.blockText}>
          La instalación debe ser realizada por personal idóneo y contempla, en términos generales,
          las siguientes etapas.
        </p>

        <div className={styles.steps}>
          {STEPS.map((step, index) => {
            const isOpen = step.id === openStep;
            const Icon = step.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={step.id}
                className={styles.step}
                data-open={isOpen ? "true" : undefined}
                data-last={index === STEPS.length - 1 ? "true" : undefined}
              >
                <h4 className={styles.stepHeading}>
                  <button
                    type="button"
                    className={styles.stepButton}
                    aria-expanded={isOpen}
                    aria-controls={`paso-${step.id}`}
                    onClick={() => setOpenStep(isOpen ? "" : step.id)}
                  >
                    <span className={styles.stepMarker} aria-hidden="true">
                      <Icon className={styles.stepGlyph} />
                    </span>
                    <span className={styles.stepNumber} aria-hidden="true">
                      {number}
                    </span>
                    <span className={styles.stepTitle}>{step.title}</span>
                  </button>
                </h4>

                <div className={styles.stepPanel}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`paso-${step.id}`}
                        className={styles.stepWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={styles.stepBody}>
                          {step.paragraphs?.map((text) => (
                            <p key={text}>{text}</p>
                          ))}
                          {step.intro && <p className={styles.stepIntro}>{step.intro}</p>}
                          {step.items && (
                            <ul className={styles.checkList}>
                              {step.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ---------------------------------------- montaje típico */}

      <motion.div
        className={styles.block}
        {...reveal}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className={styles.blockTitle}>Cómo es un montaje típico</h3>

        <div className={styles.tabs} role="tablist" aria-label="Modelos">
          {MONTAJES.map((item) => {
            const isActive = item.id === montaje;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => setMontaje(item.id)}
              >
                {isActive && (
                  <motion.span
                    layoutId="evkinMontajeTab"
                    className={styles.tabPill}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span className={styles.tabLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.montajeCard}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeMontaje.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeMontaje.includes && (
                <span className={styles.includes}>
                  <CircleCheck className={styles.includesIcon} aria-hidden="true" />
                  {activeMontaje.includes}
                </span>
              )}

              {activeMontaje.paragraphs?.map((text) => (
                <p key={text} className={styles.montajeText}>
                  {text}
                </p>
              ))}

              <ul className={styles.checkList}>
                {activeMontaje.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ---------------------------------------- cierre comercial */}

      <motion.div
        className={styles.closing}
        {...reveal}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.closingText}>
          Con EV-KIN no solo adquirís un cargador: accedés a una solución integral de carga, con
          instalación profesional, configuración, soporte y garantía.
        </p>

        <ul className={styles.chain}>
          {CADENA.map((paso, index) => (
            <li key={paso} className={styles.chainItem}>
              {index > 0 && (
                <span className={styles.chainPlus} aria-hidden="true">
                  +
                </span>
              )}
              <span className={styles.chainChip}>{paso}</span>
            </li>
          ))}
        </ul>

        <div className={styles.closingActions}>
          {consultaHref ? (
            <a
              className={styles.primary}
              href={consultaHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Coordinar instalación
              <ArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
          ) : (
            <a className={styles.primary} href="/soporte">
              Coordinar instalación
              <ArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
          )}
          <a className={styles.secondary} href="/productos">
            Ver los modelos
          </a>
        </div>
      </motion.div>

      {/* ---------------------------------------- sumate a la red */}

      <motion.div
        className={styles.partner}
        {...reveal}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.partnerCopy}>
          <p className={styles.partnerTitle}>¿Sos instalador?</p>
          <p className={styles.partnerText}>
            Sumate a la red de instaladores aprobados de EV-KIN y recibí los lineamientos técnicos
            para trabajar con nuestros equipos.
          </p>
        </div>
        {instaladorHref ? (
          <a
            className={styles.partnerCta}
            href={instaladorHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className={styles.partnerIcon} aria-hidden="true" />
            Sumarme a la red
          </a>
        ) : (
          <a className={styles.partnerCta} href="/soporte">
            <MessageCircle className={styles.partnerIcon} aria-hidden="true" />
            Sumarme a la red
          </a>
        )}
      </motion.div>
    </section>
  );
}
