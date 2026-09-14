import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/Components/UI/button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "./social-icons";
import imgLogoMark from "../../../Images/logo-mark.png";
import styles from "./FooterUI.module.css";

interface FooterLink {
  title: string;
  href: string;
}

interface FooterLinkGroup {
  label: string;
  links: FooterLink[];
}

const socialLinks = [
  { title: "Facebook", href: "#", icon: FacebookIcon },
  { title: "Instagram", href: "#", icon: InstagramIcon },
  { title: "YouTube", href: "#", icon: YoutubeIcon },
  { title: "LinkedIn", href: "#", icon: LinkedinIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
  {
    label: "Producto",
    links: [
      { title: "Carga en casa", href: "#" },
      { title: "Carga para negocios", href: "#" },
      { title: "Estaciones públicas", href: "#" },
      { title: "Compatibilidad de vehículos", href: "#" },
      { title: "Precios", href: "#" },
    ],
  },
  {
    label: "Soporte",
    links: [
      { title: "Centro de ayuda", href: "#" },
      { title: "Guía de instalación", href: "#" },
      { title: "Garantía", href: "#" },
      { title: "Preguntas frecuentes", href: "#" },
      { title: "Contacto", href: "#" },
    ],
  },
  {
    label: "Empresa",
    links: [
      { title: "Nosotros", href: "#" },
      { title: "Sustentabilidad", href: "#" },
      { title: "Prensa", href: "#" },
      { title: "Trabajá con nosotros", href: "#" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Términos de servicio", href: "#" },
      { title: "Política de privacidad", href: "#" },
      { title: "Política de cookies", href: "#" },
      { title: "Garantía legal", href: "#" },
    ],
  },
];

export default function FooterUI() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.topRow}>
          <AnimatedContainer className={styles.brandColumn}>
            <div className={styles.brandMark}>
              <img src={imgLogoMark} alt="" className={styles.brandMarkIcon} />
              <span className={styles.brandMarkText}>ev-kin</span>
            </div>
            <p className={styles.brandText}>
              Estaciones de carga inteligentes y conectividad total para que
              tu movilidad eléctrica nunca se detenga.
            </p>
            <div className={styles.socialRow}>
              {socialLinks.map((link) => (
                <Button
                  key={link.title}
                  size="icon"
                  variant="outline"
                  aria-label={link.title}
                  style={{ width: 32, height: 32 }}
                >
                  <link.icon className={styles.socialIcon} />
                </Button>
              ))}
            </div>
          </AnimatedContainer>

          {footerLinkGroups.map((group, index) => (
            <AnimatedContainer
              key={group.label}
              delay={0.1 + index * 0.1}
              className={styles.linkGroup}
            >
              <h3 className={styles.linkGroupTitle}>{group.label}</h3>
              <ul className={styles.linkList}>
                {group.links.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className={styles.linkAnchor}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}
        </div>

        <div className={styles.bottomBar}>
          <p>© 2026 ev-kin. Todos los derechos reservados.</p>
          <p>Hecho para la movilidad eléctrica.</p>
        </div>
      </div>
    </footer>
  );
}

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
  children?: React.ReactNode;
  delay?: number;
};

function AnimatedContainer({
  delay = 0.1,
  children,
  ...props
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
