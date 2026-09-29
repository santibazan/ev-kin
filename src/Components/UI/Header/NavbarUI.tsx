import { useState } from "react";
import styles from "./Navbar.module.css";
import imgLogo from "../../../Images/logo-nav.png";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Nuestros productos", href: "/productos" },
  { label: "Instalación", href: "/instalacion" },
  { label: "Preguntas frecuentes", href: "/preguntas" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Soporte", href: "/soporte" },
];

export default function NavbarUI() {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPath =
    typeof window === "undefined" ? "" : window.location.pathname.replace(/\/+$/, "");

  return (
    <header className={styles.header}>
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
