import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./ProductosUI.module.css";
import ScrollToTop from "../Scroll/ScrollToTop";

export type ProductVariant = {
  id: string;
  /** Nombre del color, ej: "Blanco". */
  label: string;
  /** Color del círculo selector, ej: "#f4f4f5". */
  swatch: string;
  /** Foto del producto (importala y pasá la variable). Mejor con fondo transparente. */
  image: string;
};

export type ProductSpec = {
  /** Ej: "Potencia" */
  label: string;
  /** Ej: "7,4 kW" */
  value: string;
};

export type Product = {
  id: string;
  name: string;
  /** Frase corta opcional debajo del nombre. */
  tagline?: string;
  /** Ej: "Nuevo". */
  badge?: string;
  /** Ej: "USD 458". */
  price?: string;
  /** Precio anterior; si ambos son números, el descuento se calcula solo. */
  originalPrice?: string;
  /** Solo datos reales de la ficha técnica. Si no hay, no se muestra la tabla. */
  specs?: ProductSpec[];
  variants: ProductVariant[];
};

type ProductosUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  products: Product[];
  /** Si lo pasás, el botón abre WhatsApp con el modelo y el color ya escritos. */
  whatsapp?: string;
  /** Alternativa a whatsapp: manejá vos el clic. */
  onQuote?: (product: Product, variant: ProductVariant) => void;
  ctaLabel?: string;
};

/** "USD 1.234,50" → 1234.5. Devuelve null si no hay un número claro. */
function parsePrice(value?: string): number | null {
  if (!value) return null;
  const digits = value.replace(/[^\d.,]/g, "");
  if (!digits) return null;
  // Si la coma aparece después del punto, la coma es el decimal (formato 1.234,50).
  const normalized =
    digits.lastIndexOf(",") > digits.lastIndexOf(".")
      ? digits.replace(/\./g, "").replace(",", ".")
      : digits.replace(/,/g, "");
  const n = Number(normalized);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function ProductosUI({
  eyebrow = "Nuestros productos",
  title = "Un cargador pensado para tu casa",
  subtitle = "Elegí el color que mejor combina con tu espacio. Nosotros nos encargamos del resto.",
  products,
  whatsapp,
  onQuote,
  ctaLabel = "Pedir presupuesto",
}: ProductosUIProps) {
  const shouldReduceMotion = !!useReducedMotion();
  const [productIndex, setProductIndex] = useState(0);
  const [variantIndex, setVariantIndex] = useState(0);

  const product = products[productIndex] ?? products[0];
  if (!product || product.variants.length === 0) return null;
  const variant = product.variants[variantIndex] ?? product.variants[0];

  const now = parsePrice(product.price);
  const before = parsePrice(product.originalPrice);
  const discount = now && before && before > now ? Math.round((1 - now / before) * 100) : null;

  const message = `Hola, quiero un presupuesto del ${product.name} en color ${variant.label.toLowerCase()}.`;
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : undefined;

  function selectProduct(index: number) {
    setProductIndex(index);
    setVariantIndex(0);
  }

  const swap = shouldReduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 26, scale: 0.94, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, y: -22, scale: 0.96, filter: "blur(6px)" },
      };

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

      {products.length > 1 && (
        <div className={styles.tabs} role="tablist" aria-label="Modelos">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === productIndex}
              className={`${styles.tab} ${i === productIndex ? styles.tabActive : ""}`}
              onClick={() => selectProduct(i)}
            >
              {i === productIndex && (
                <motion.span
                  layoutId="evkinProductTab"
                  className={styles.tabPill}
                  transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className={styles.tabLabel}>{p.name}</span>
            </button>
          ))}
        </div>
      )}

      <motion.div
        className={styles.showcase}
        style={{ "--tone": variant.swatch } as CSSProperties}
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ---------- escenario */}
        <div className={styles.stage}>
          <span className={styles.stageGlow} aria-hidden="true" />
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.ringInner} aria-hidden="true" />

          {product.badge && <span className={styles.badge}>{product.badge}</span>}
          {discount !== null && <span className={styles.discount}>-{discount}%</span>}

          <div className={styles.productArea}>
          <div className={styles.photoWrap}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={`${product.id}-${variant.id}`}
                src={variant.image}
                alt={`${product.name} color ${variant.label.toLowerCase()}`}
                className={styles.photo}
                {...swap}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
          <span className={styles.floorShadow} aria-hidden="true" />
          </div>
        </div>

        {/* ---------- información */}
        <div className={styles.info}>
          <div className={styles.titleBlock}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h3
                key={product.id}
                className={styles.productName}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {product.name}
              </motion.h3>
            </AnimatePresence>
            {product.tagline && <p className={styles.tagline}>{product.tagline}</p>}
          </div>

          {(product.price || product.originalPrice) && (
            <div className={styles.priceRow}>
              {product.price && <span className={styles.price}>{product.price}</span>}
              {product.originalPrice && (
                <span className={styles.originalPrice}>{product.originalPrice}</span>
              )}
              {discount !== null && <span className={styles.saving}>Ahorrás {discount}%</span>}
            </div>
          )}

          <div className={styles.colorBlock}>
            <p className={styles.colorLabel}>
              Color: <strong>{variant.label}</strong>
            </p>
            <div className={styles.swatches} role="radiogroup" aria-label="Color">
              {product.variants.map((v, i) => {
                const active = i === variantIndex;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={v.label}
                    className={styles.swatch}
                    onClick={() => setVariantIndex(i)}
                  >
                    {active && (
                      <motion.span
                        layoutId={`evkinSwatch-${product.id}`}
                        className={styles.swatchRing}
                        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 34 }}
                      />
                    )}
                    <span className={styles.swatchDot} style={{ background: v.swatch }} />
                  </button>
                );
              })}
            </div>
          </div>

          {product.specs && product.specs.length > 0 && (
            <dl className={styles.specs}>
              {product.specs.map((spec) => (
                <div key={spec.label} className={styles.specRow}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className={styles.actions}>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                {ctaLabel}
                <ArrowRight className={styles.ctaIcon} />
              </a>
            ) : (
              <button
                type="button"
                className={styles.cta}
                onClick={() => onQuote?.(product, variant)}
              >
                {ctaLabel}
                <ArrowRight className={styles.ctaIcon} />
              </button>
            )}
            <p className={styles.ctaNote}>
              {whatsappHref
                ? "Te respondemos por WhatsApp con el modelo y el color que elegiste."
                : "Te contactamos para coordinar la instalación."}
            </p>
          </div>
        </div>
      </motion.div>
      <ScrollToTop />
    </section>
  );
}