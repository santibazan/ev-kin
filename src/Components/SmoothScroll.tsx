import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Scroll suave para toda la página. Montalo una sola vez, en App.
 * - lerp: cuánto "persigue" el scroll a la rueda por cuadro. Más bajo = más suave y lento.
 * - En celulares se deja el scroll nativo (el táctil ya es suave y no conviene tocarlo).
 * - Si la persona pidió reducir movimiento en su sistema, no se activa.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
