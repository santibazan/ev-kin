import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import imgLogo from "../../../Images/logo-nav.png";

type NavItem = {
  label: string;
  href: string;
};

/**
 * El orden sigue el recorrido de quien compra:
 * qué vendemos → cómo se instala → dudas → quiénes somos → contenido → contacto.
 *
 * Si la sección de instalación queda DENTRO de la landing en lugar de tener
 * ruta propia, cambiá el href por "/#instalacion": InstalacionUI ya trae
 * id="instalacion".
 */
const NAV_ITEMS: NavItem[] = [
  { label: "Nuestros productos", href: "/productos" },
  { label: "Instalación", href: "/instalacion" },
  { label: "Preguntas frecuentes", href: "/preguntas" },
  { label: "Blog", href: "/blog" },
  { label: "Soporte", href: "/soporte" },
];

/* Si con seis pills la barra queda apretada en pantallas de ~900-1100px,
   usá estas etiquetas más cortas en lugar de las de arriba:

const NAV_ITEMS: NavItem[] = [
  { label: "Productos", href: "/productos" },
  { label: "Instalación", href: "/instalacion" },
  { label: "Preguntas", href: "/preguntas" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Soporte", href: "/soporte" },
];
*/

/** Desde qué altura empieza a esconderse. Antes de esto siempre se ve. */
const UMBRAL = 60;
/** Movimiento mínimo para reaccionar, así no titila con el scroll suave. */
const MINIMO = 5;

export default function NavbarUI() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [oculto, setOculto] = useState(false);
  const ultimaY = useRef(0);
  const pendiente = useRef(false);

  /**
   * Se esconde al bajar y vuelve al subir. Dos detalles que importan:
   * arriba de todo siempre se muestra, y con el menú de celular abierto nunca
   * se esconde — si no, el menú se iría con la barra mientras el usuario lo
   * está usando.
   */
  useEffect(() => {
    ultimaY.current = window.scrollY;

    function evaluar() {
      pendiente.current = false;
      const y = window.scrollY;
      const delta = y - ultimaY.current;

      if (Math.abs(delta) < MINIMO) return;
      ultimaY.current = y;

      if (menuOpen || y <= UMBRAL) {
        setOculto(false);
        return;
      }
      setOculto(delta > 0);
    }

    function onScroll() {
      if (pendiente.current) return;
      pendiente.current = true;
      requestAnimationFrame(evaluar);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Con seis items conviene que se vea en cuál está parado el usuario.
  const currentPath =
    typeof window === "undefined" ? "" : window.location.pathname.replace(/\/+$/, "");

  return (
    <header className={styles.header} data-oculto={oculto ? "true" : undefined}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="ev-kin by Kinergia — inicio">
          <img src={imgLogo} alt="ev-kin" className={styles.logoMark} />
        </a>

        <nav
          className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav}
          aria-label="Navegación principal"
        >
          {NAV_ITEMS.map((item) => {
            const isCurrent = currentPath !== "" && currentPath === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={styles.pill}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}