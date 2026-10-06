import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText, Maximize2, Minimize2, X, ZoomIn } from "lucide-react";
import styles from "./VisorImagen.module.css";

/**
 * VisorImagen — abre una imagen grande (una ficha técnica, un esquema) en una
 * ventana sobre la página, con scroll, zoom y descarga.
 *
 * Se usa en dos lados: el botón "Especificaciones" de las tarjetas de producto
 * y el esquema de instalación del blog. Es un solo componente a propósito: si
 * algo del modal falla, se arregla en un único lugar.
 *
 * Con `variante="figura"` muestra además una miniatura clickeable, que es lo
 * que conviene dentro de un artículo; con `variante="boton"` es solo el botón.
 */

type VisorImagenProps = {
  src: string;
  /** Descripción de la imagen para quien no puede verla. */
  alt: string;
  /** Texto del botón que abre la ventana. */
  label?: string;
  /** Título de la ventana. */
  titulo?: string;
  /** Nombre con el que se descarga el archivo. */
  nombreDescarga?: string;
  variante?: "boton" | "figura";
  /** Epígrafe debajo de la miniatura, solo en `variante="figura"`. */
  epigrafe?: string;
};

export default function VisorImagen({
  src,
  alt,
  label = "Ver en grande",
  titulo = "Imagen",
  nombreDescarga,
  variante = "boton",
  epigrafe,
}: VisorImagenProps) {
  const shouldReduceMotion = !!useReducedMotion();
  const [abierto, setAbierto] = useState(false);
  const [ampliado, setAmpliado] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Para devolver el foco a donde estaba cuando se cierra la ventana.
  const origenRef = useRef<HTMLElement | null>(null);

  const cerrar = useCallback(() => setAbierto(false), []);

  function abrir(event: React.MouseEvent<HTMLElement>) {
    origenRef.current = event.currentTarget;
    setAbierto(true);
  }

  // Con la ventana abierta: Escape cierra, el fondo no scrollea y el foco
  // arranca en el botón de cerrar.
  useEffect(() => {
    if (!abierto) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") cerrar();
    }

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener("keydown", onKeyDown);
      setAmpliado(false);
      origenRef.current?.focus();
    };
  }, [abierto, cerrar]);

  return (
    <>
      {variante === "figura" ? (
        <figure className={styles.figura}>
          <button type="button" className={styles.miniatura} onClick={abrir}>
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            <span className={styles.lupa}>
              <ZoomIn className={styles.lupaIcon} aria-hidden="true" />
              {label}
            </span>
          </button>
          {epigrafe && <figcaption className={styles.epigrafe}>{epigrafe}</figcaption>}
        </figure>
      ) : (
        <button type="button" className={styles.boton} onClick={abrir}>
          <FileText className={styles.botonIcon} aria-hidden="true" />
          {label}
        </button>
      )}

      {/* La ventana se monta directamente en el <body>, no acá dentro.
          Motivo: un ancestro con `transform`, `filter` o `will-change` —y los
          bloques del artículo son motion.section, así que lo tienen mientras
          animan— convierte a `position: fixed` en relativo a ese ancestro. El
          modal aparece encajado dentro de la sección en lugar de cubrir la
          pantalla, o directamente no se ve. Con el portal eso no puede pasar,
          pase lo que pase en la página que lo use. */}
      {createPortal(
        <AnimatePresence>
          {abierto && (
          <motion.div
            className={styles.overlay}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={cerrar}
          >
            <motion.div
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-label={titulo}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.barra}>
                <p className={styles.titulo}>{titulo}</p>

                <div className={styles.herramientas}>
                  <button
                    type="button"
                    className={styles.herramienta}
                    onClick={() => setAmpliado((valor) => !valor)}
                    aria-pressed={ampliado}
                  >
                    {ampliado ? (
                      <Minimize2 className={styles.herramientaIcon} aria-hidden="true" />
                    ) : (
                      <Maximize2 className={styles.herramientaIcon} aria-hidden="true" />
                    )}
                    <span className={styles.herramientaLabel}>
                      {ampliado ? "Ajustar" : "Ampliar"}
                    </span>
                  </button>

                  <a
                    className={styles.herramienta}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className={styles.herramientaIcon} aria-hidden="true" />
                    <span className={styles.herramientaLabel}>Abrir</span>
                  </a>

                  <a className={styles.herramienta} href={src} download={nombreDescarga}>
                    <Download className={styles.herramientaIcon} aria-hidden="true" />
                    <span className={styles.herramientaLabel}>Descargar</span>
                  </a>

                  <button
                    ref={closeRef}
                    type="button"
                    className={styles.cerrar}
                    onClick={cerrar}
                    aria-label="Cerrar"
                  >
                    <X />
                  </button>
                </div>
              </div>

              {/* `data-lenis-prevent` es imprescindible: Lenis intercepta la rueda
                  del mouse en toda la página y llama a preventDefault, así que
                  sin esto el contenedor nunca recibe el scroll y la imagen
                  ampliada queda trabada. El atributo le dice a Lenis que no se
                  meta con lo que pase acá adentro.
                  `tabIndex` hace que se pueda scrollear también con el teclado. */}
              <div
                className={styles.scroll}
                data-ampliado={ampliado ? "true" : undefined}
                data-lenis-prevent
                tabIndex={0}
                role="group"
                aria-label={ampliado ? "Imagen ampliada, se puede desplazar" : titulo}
              >
                <img className={styles.imagen} src={src} alt={alt} />
              </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}