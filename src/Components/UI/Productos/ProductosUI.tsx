import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./ProductosUI.module.css";

export type ProductSpec = {
  icon: ReactNode;
  label: string;
};

type ProductCardProps = {
  title: string;
  /** Frase corta, una línea. Ej: "Carga doméstica de alta potencia". */
  tagline?: string;
  /** Ej: [{ icon: <Zap/>, label: "22 kW" }, { icon: <Cable/>, label: "Cable de 5m" }] */
  specs?: ProductSpec[];
  /** Ej: "USD 458". Si no la pasás, no se muestra el bloque de precio. */
  price?: string;
  /** Precio anterior, se muestra tachado al lado del precio actual. */
  originalPrice?: string;
  /** Ej: 15 → se muestra como chip "-15%" sobre la imagen. */
  discountPercent?: number;
  /** Ej: "Nuevo". Si no la pasás, no aparece la etiqueta. */
  badge?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  /** Pasale tu foto real: <img src={fotoProducto} alt="..." /> */
  image: ReactNode;
};

export default function ProductosUI({
  title,
  tagline,
  specs = [],
  price,
  originalPrice,
  discountPercent,
  badge,
  primaryLabel = "Obtené un presupuesto",
  secondaryLabel = "Más información",
  onPrimaryClick,
  onSecondaryClick,
  image,
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className={styles.card}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
    >
      <div className={styles.media}>
        <div className={styles.mediaGlow} aria-hidden="true" />
        {badge && <span className={styles.badge}>{badge}</span>}
        {typeof discountPercent === "number" && (
          <span className={styles.discountChip}>-{discountPercent}%</span>
        )}
        <div className={styles.imageFrame}>{image}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <h3 className={styles.title}>{title}</h3>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>

        {specs.length > 0 && (
          <ul className={styles.specList}>
            {specs.map((spec) => (
              <li key={spec.label} className={styles.specItem}>
                <span className={styles.specIcon}>{spec.icon}</span>
                {spec.label}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.footer}>
          {(price || originalPrice) && (
            <div className={styles.priceBlock}>
              {originalPrice && <span className={styles.originalPrice}>{originalPrice}</span>}
              {price && <span className={styles.price}>{price}</span>}
            </div>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.primaryBtn} onClick={onPrimaryClick}>
              <span>{primaryLabel}</span>
              <ArrowRight className={styles.primaryBtnIcon} />
            </button>
            <button type="button" className={styles.secondaryLink} onClick={onSecondaryClick}>
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
