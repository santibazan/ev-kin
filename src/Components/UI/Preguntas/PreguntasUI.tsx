import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Plus, Minus, X, MessageCircle } from "lucide-react";
import { PREGUNTAS, type FaqItem } from "./PreguntasData";
import styles from "./Preguntas.module.css";

type PreguntasUIProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
  allLabel?: string;
  /** Si lo pasás, el bloque final abre WhatsApp con la consulta ya empezada. */
  whatsapp?: string;
};

/**
 * Prepara un texto para buscar: minúsculas, sin tildes y sin signos.
 * Así "instalacion" encuentra "instalación" y "wifi" encuentra "Wi-Fi".
 */
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

/**
 * Dónde se busca: en la pregunta y en su respuesta.
 * La categoría queda afuera a propósito: si no, buscar "garantía" devolvía las
 * cinco preguntas del tema en lugar de la que realmente habla de la garantía.
 */
function searchableText(item: FaqItem) {
  const answer = item.answer
    .map((block) => (block.type === "p" ? block.text : block.items.join(" ")))
    .join(" ");
  return normalize(`${item.question} ${answer}`);
}

export default function PreguntasUI({
  eyebrow = "Preguntas frecuentes",
  title = "Todo lo que te preguntás antes de instalar",
  subtitle = "Buscá por palabra o filtrá por tema. Si algo no está acá, escribinos y lo respondemos.",
  items = PREGUNTAS,
  allLabel = "Todas",
  whatsapp,
}: PreguntasUIProps) {
  const shouldReduceMotion = !!useReducedMotion();
  const [category, setCategory] = useState(allLabel);
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  // Categorías en el orden en que aparecen, con su cantidad de preguntas.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    return [
      { label: allLabel, count: items.length },
      ...[...counts].map(([label, count]) => ({ label, count })),
    ];
  }, [items, allLabel]);

  const searchIndex = useMemo(
    () => items.map((item) => ({ item, text: searchableText(item) })),
    [items],
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return searchIndex
      .filter(({ item, text }) => {
        const matchesCategory = category === allLabel || item.category === category;
        const matchesQuery = q.length === 0 || text.includes(q);
        return matchesCategory && matchesQuery;
      })
      .map(({ item }) => item);
  }, [searchIndex, category, query, allLabel]);

  // Buscando, las coincidencias se abren solas: quien busca quiere la respuesta, no el título.
  useEffect(() => {
    if (query.trim().length < 3) return;
    setOpenIds(new Set(filtered.map((item) => item.id)));
  }, [query, filtered]);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola, tengo una consulta sobre los cargadores ev-kin.",
      )}`
    : undefined;

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

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search className={styles.searchIcon} aria-hidden="true" />
          <input
            id="faq-search"
            type="search"
            className={styles.searchInput}
            placeholder="Buscar: potencia, Wi-Fi, garantía…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Buscar en las preguntas frecuentes"
          />
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setQuery("")}
              aria-label="Borrar búsqueda"
            >
              <X />
            </button>
          )}
        </div>

        <div className={styles.filters} role="tablist" aria-label="Temas">
          {categories.map((entry) => {
            const isActive = entry.label === category;
            return (
              <button
                key={entry.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.filter} ${isActive ? styles.filterActive : ""}`}
                onClick={() => setCategory(entry.label)}
              >
                {isActive && (
                  <motion.span
                    layoutId="evkinFaqFilter"
                    className={styles.filterPill}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
                <span className={styles.filterLabel}>
                  {entry.label}
                  <span className={styles.filterCount}>{entry.count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.results}>
        <p className={styles.resultCount} aria-live="polite">
          {filtered.length === 0
            ? "No encontramos preguntas con ese texto"
            : `${filtered.length} ${filtered.length === 1 ? "pregunta" : "preguntas"}`}
        </p>

        <div className={styles.list}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((item) => {
              const isOpen = openIds.has(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout={!shouldReduceMotion}
                  className={styles.item}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className={styles.questionHeading}>
                    <button
                      type="button"
                      className={styles.questionRow}
                      aria-expanded={isOpen}
                      onClick={() => toggle(item.id)}
                    >
                      <span className={styles.question}>{item.question}</span>
                      <span className={styles.icon} aria-hidden="true">
                        {isOpen ? <Minus /> : <Plus />}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className={styles.answerWrap}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={styles.answer}>
                          {item.answer.map((block, index) =>
                            block.type === "p" ? (
                              <p key={index}>{block.text}</p>
                            ) : (
                              <ul key={index}>
                                {block.items.map((entry) => (
                                  <li key={entry}>{entry}</li>
                                ))}
                              </ul>
                            ),
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>Probá con otra palabra, o mirá todas las preguntas.</p>
            <button
              type="button"
              className={styles.resetButton}
              onClick={() => {
                setQuery("");
                setCategory(allLabel);
              }}
            >
              Ver todas las preguntas
            </button>
          </div>
        )}
      </div>

      <div className={styles.help}>
        <div>
          <p className={styles.helpTitle}>¿No encontraste tu respuesta?</p>
          <p className={styles.helpText}>
            Contanos tu caso y te ayudamos a elegir el equipo y coordinar la instalación.
          </p>
        </div>
        {whatsappHref ? (
          <a className={styles.helpCta} href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className={styles.helpIcon} />
            Escribinos
          </a>
        ) : (
          <a className={styles.helpCta} href="/soporte">
            <MessageCircle className={styles.helpIcon} />
            Escribinos
          </a>
        )}
      </div>
    </section>
  );
}
