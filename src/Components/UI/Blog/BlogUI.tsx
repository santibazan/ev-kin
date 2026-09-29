import { useMemo, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ArrowRight, Clock } from "lucide-react";
import styles from "./Blog.module.css";
import blog1 from "../../../Images/blog-cover-1.jpg"
import blog2 from "../../../Images/blog-cover-2.jpg"
import blog3 from "../../../Images/blog-cover-3.jpg"
import blog4 from "../../../Images/blog-cover-4.jpg"

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** Formato ISO: "2026-08-14" */
  date: string;
  /** Ej: "6 min". Si no la pasás, no se muestra. */
  readingTime?: string;
  /** URL de la portada (importá la imagen y pasá la variable). */
  image: string;
  href?: string;
};

type BlogUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  allLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Si lo pasás, se usa en vez de navegar con href. */
  onPostClick?: (post: BlogPost) => void;
};

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "casa-vs-red-publica",
    title: "Cargar en casa o en la red pública: qué conviene",
    excerpt:
      "Comparamos costo por kilómetro, tiempos reales y comodidad para entender cuándo vale la pena cargar en casa y cuándo salir a la red pública.",
    category: "Guías",
    date: "2026-08-28",
    readingTime: "6 min",
    image: blog1,
    href: "#",
  },
  {
    id: "tipos-de-cargadores",
    title: "Tipos de cargadores para autos eléctricos",
    excerpt:
      "AC, DC, Tipo 1, Tipo 2: qué significa cada sigla, cómo se traduce en tiempo de carga y cuál necesitás según tu auto.",
    category: "Educativo",
    date: "2026-08-14",
    readingTime: "8 min",
    image: blog2,
    href: "#",
  },
  {
    id: "calculadora-tiempo-carga",
    title: "Cómo calcular el tiempo de carga de tu auto",
    excerpt:
      "Una fórmula simple para estimar cuánto tarda tu batería según su capacidad y la potencia del cargador que tengas instalado.",
    category: "Guías",
    date: "2026-07-30",
    readingTime: "4 min",
    image: blog3,
    href: "#",
  },
  {
    id: "instalacion-en-casa",
    title: "Qué mirar antes de instalar un cargador en casa",
    excerpt:
      "Potencia contratada, distancia al tablero, protecciones y permisos: lo que conviene revisar antes de que llegue el técnico.",
    category: "Instalación",
    date: "2026-07-11",
    readingTime: "5 min",
    image: blog4,
    href: "#",
  },
];

/** Evita el corrimiento de un día al parsear "YYYY-MM-DD" (que JS lee como UTC). */
function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("es-UY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function BlogUI({
  eyebrow = "Blog",
  title = "Todo lo que necesitás saber antes de enchufar",
  subtitle = "Guías, comparativas y respuestas claras sobre movilidad eléctrica, escritas por el equipo de ev-kin.",
  posts = DEFAULT_POSTS,
  allLabel = "Todos",
  ctaLabel = "Ver todos los artículos",
  ctaHref = "#",
  onPostClick,
}: BlogUIProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(allLabel);

  const categories = useMemo(
    () => [
      allLabel,
      ...Array.from(new Set(posts.map((post) => post.category))),
    ],
    [posts, allLabel],
  );

  const filtered = useMemo(
    () =>
      activeCategory === allLabel
        ? posts
        : posts.filter((post) => post.category === activeCategory),
    [posts, activeCategory, allLabel],
  );

  const [featured, ...rest] = filtered;

  // Parallax suave de la portada destacada mientras se hace scroll.
  const featuredRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  // Etiqueta "Leer" que sigue al cursor sobre la portada destacada (solo mouse).
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, {
    stiffness: 320,
    damping: 28,
    mass: 0.5,
  });
  const smoothY = useSpring(cursorY, {
    stiffness: 320,
    damping: 28,
    mass: 0.5,
  });

  function trackCursor(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - bounds.left);
    cursorY.set(event.clientY - bounds.top);
  }

  function handleClick(post: BlogPost) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      if (onPostClick) {
        event.preventDefault();
        onPostClick(post);
      }
    };
  }

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.header}
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 22 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      <div
        className={styles.filters}
        role="tablist"
        aria-label="Categorías del blog"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.filter} ${isActive ? styles.filterActive : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {isActive && (
                <motion.span
                  layoutId="evkinBlogFilter"
                  className={styles.filterPill}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                />
              )}
              <span className={styles.filterLabel}>{category}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="popLayout" initial={false}>
          {featured && (
            <motion.article
              key={featured.id}
              layout={!shouldReduceMotion}
              ref={featuredRef}
              className={styles.featured}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 26 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                className={styles.featuredLink}
                href={featured.href ?? "#"}
                onClick={handleClick(featured)}
              >
                <div
                  className={styles.featuredMedia}
                  onMouseMove={shouldReduceMotion ? undefined : trackCursor}
                  onMouseEnter={() => setCursorVisible(true)}
                  onMouseLeave={() => setCursorVisible(false)}
                >
                  <motion.img
                    src={featured.image}
                    alt=""
                    className={styles.featuredImage}
                    style={shouldReduceMotion ? undefined : { y: parallaxY }}
                    loading="lazy"
                  />
                  <span className={styles.mediaOverlay} aria-hidden="true" />
                  <span className={styles.shine} aria-hidden="true" />
                  <span className={styles.category}>{featured.category}</span>

                  {!shouldReduceMotion && (
                    <motion.span
                      className={styles.cursorBadge}
                      style={{ x: smoothX, y: smoothY }}
                      animate={{
                        opacity: cursorVisible ? 1 : 0,
                        scale: cursorVisible ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden="true"
                    >
                      Leer
                      <ArrowUpRight className={styles.cursorBadgeIcon} />
                    </motion.span>
                  )}
                </div>

                <div className={styles.featuredBody}>
                  <span className={styles.featuredFlag}>
                    <span className={styles.dot} aria-hidden="true" />
                    Destacado
                  </span>

                  <h3 className={styles.featuredTitle}>
                    <span className={styles.underline}>{featured.title}</span>
                  </h3>

                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>

                  <div className={styles.meta}>
                    <time dateTime={featured.date}>
                      {formatDate(featured.date)}
                    </time>
                    {featured.readingTime && (
                      <span className={styles.metaItem}>
                        <Clock className={styles.metaIcon} />
                        {featured.readingTime}
                      </span>
                    )}
                  </div>

                  <span className={styles.featuredCta}>
                    Leer artículo
                    <ArrowRight className={styles.featuredCtaIcon} />
                  </span>
                </div>
              </a>
            </motion.article>
          )}
        </AnimatePresence>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout" initial={false}>
            {rest.map((post, index) => (
              <motion.article
                key={post.id}
                layout={!shouldReduceMotion}
                className={styles.card}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 26 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }
                }
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: shouldReduceMotion ? 0 : index * 0.09,
                }}
              >
                <a
                  className={styles.cardLink}
                  href={post.href ?? "#"}
                  onClick={handleClick(post)}
                >
                  <div className={styles.cardMedia}>
                    <img
                      src={post.image}
                      alt=""
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <span className={styles.mediaOverlay} aria-hidden="true" />
                    <span className={styles.shine} aria-hidden="true" />
                    <span className={styles.category}>{post.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>
                      <span className={styles.underline}>{post.title}</span>
                    </h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    <div className={styles.cardFooter}>
                      <div className={styles.meta}>
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>
                        {post.readingTime && (
                          <span className={styles.metaItem}>
                            <Clock className={styles.metaIcon} />
                            {post.readingTime}
                          </span>
                        )}
                      </div>
                      <span className={styles.cardArrow} aria-hidden="true">
                        <ArrowUpRight />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            className={styles.empty}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Todavía no hay artículos en esta categoría.
          </motion.p>
        )}
      </div>

      <motion.a
        className={styles.sectionCta}
        href={ctaHref}
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {ctaLabel}
        <ArrowRight className={styles.sectionCtaIcon} />
      </motion.a>
    </section>
  );
}
