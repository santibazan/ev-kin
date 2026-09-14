import type { ReactNode } from "react";
import { Shield, Zap, Leaf } from "lucide-react";
import styles from "./Nosotros.module.css";

type Stat = {
  value: string;
  label: string;
};

type Value = {
  icon: ReactNode;
  title: string;
  description: string;
};

type AboutUIProps = {
  eyebrow?: string;
  title?: string;
  mission?: string;
  /** Reemplazá estos por tus números reales cuando los tengas. */
  stats?: Stat[];
  values?: Value[];
  /** Pasale una foto real del equipo o de una instalación si tenés una. */
  image?: ReactNode;
};

const DEFAULT_STATS: Stat[] = [
  { value: "+10", label: "Cargadores instalados" },
  { value: "10", label: "Ciudades" },
  { value: "10", label: "Años de experiencia" },
];

const DEFAULT_VALUES: Value[] = [
  {
    icon: <Shield />,
    title: "Confiabilidad",
    description:
      "Cada cargador se prueba a fondo antes de salir de fábrica. Preferimos que dure años, no que sea desechable.",
  },
  {
    icon: <Zap />,
    title: "Simplicidad",
    description:
      "Cargar tu auto no debería requerir manual de instrucciones. Diseñamos pensando primero en la experiencia de uso.",
  },
  {
    icon: <Leaf />,
    title: "Compromiso ambiental",
    description:
      "Acompañamos la transición hacia una movilidad más limpia, con productos pensados para durar y consumir de forma eficiente.",
  },
];

export default function NosotrosUI({
  eyebrow = "Quiénes somos",
  title = "Hacemos que cargar tu auto eléctrico sea simple",
  mission = "En ev-kin diseñamos y fabricamos cargadores para el hogar y los negocios, pensados para acompañar la transición hacia una movilidad más limpia. Creemos que la tecnología que usás todos los días debería ser confiable, fácil de instalar y fácil de entender — así que eso es lo que construimos.",
  stats = DEFAULT_STATS,
  values = DEFAULT_VALUES,
  image,
}: AboutUIProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.mission}>{mission}</p>
      </div>

      {image && <div className={styles.imageWrap}>{image}</div>}

      {stats.length > 0 && (
        <div className={styles.statsRow}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.valuesGrid}>
        {values.map((value) => (
          <div key={value.title} className={styles.valueCard}>
            <div className={styles.valueIcon}>{value.icon}</div>
            <h3 className={styles.valueTitle}>{value.title}</h3>
            <p className={styles.valueDescription}>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
