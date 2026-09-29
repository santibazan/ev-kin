import { useEffect, useRef } from "react";

type EnergyFieldProps = {
  className?: string;
  /** Si es true dibuja un solo cuadro y no anima (accesibilidad). */
  still?: boolean;
};

type Stream = {
  /** Posición vertical base, 0-1 */
  y: number;
  /** Amplitud de la onda, 0-1 */
  amplitude: number;
  /** Cuántas ondas entran a lo ancho */
  frequency: number;
  phase: number;
  /** Velocidad de deriva de la onda */
  drift: number;
  width: number;
  alpha: number;
  pulses: Pulse[];
};

type Pulse = {
  /** Posición a lo largo de la corriente, 0-1 */
  t: number;
  speed: number;
  size: number;
  /** Verde del anillo LED del producto, o plata */
  accent: boolean;
};

const SILVER = "156, 160, 166";
const GREEN = "74, 200, 120";

function buildStreams(): Stream[] {
  // Valores fijos (no aleatorios) para que el resultado sea idéntico en cada
  // carga y no cambie entre servidor y cliente.
  const config: Array<[number, number, number, number, number, number, number]> = [
    // y, amplitud, frecuencia, fase, deriva, grosor, alfa
    [0.18, 0.07, 1.1, 0.0, 0.055, 1.1, 0.5],
    [0.32, 0.05, 1.5, 1.7, -0.04, 0.9, 0.38],
    [0.47, 0.09, 0.9, 3.1, 0.032, 1.3, 0.6],
    [0.61, 0.06, 1.7, 0.8, -0.058, 0.9, 0.34],
    [0.74, 0.08, 1.2, 2.3, 0.045, 1.1, 0.46],
    [0.88, 0.05, 1.4, 4.2, -0.03, 0.8, 0.3],
  ];

  const pulseConfig: Array<Array<[number, number, number, boolean]>> = [
    [[0.1, 0.055, 2.6, false], [0.68, 0.043, 2.0, false]],
    [[0.42, 0.038, 1.8, false]],
    [[0.24, 0.05, 3.0, true], [0.79, 0.06, 2.2, false]],
    [[0.55, 0.045, 1.9, false]],
    [[0.05, 0.052, 2.4, false], [0.6, 0.04, 2.8, true]],
    [[0.35, 0.036, 1.7, false]],
  ];

  return config.map(([y, amplitude, frequency, phase, drift, width, alpha], i) => ({
    y,
    amplitude,
    frequency,
    phase,
    drift,
    width,
    alpha,
    pulses: pulseConfig[i].map(([t, speed, size, accent]) => ({ t, speed, size, accent })),
  }));
}

export default function EnergyField({ className, still = false }: EnergyFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const streams = buildStreams();
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;

    // Los halos de los pulsos se dibujan una sola vez como "sprite" y después
    // se estampan escalados: evita crear un degradado radial por cuadro.
    const HALO_SIZE = 64;
    function makeHalo(color: string, peak: number) {
      const sprite = document.createElement("canvas");
      sprite.width = HALO_SIZE;
      sprite.height = HALO_SIZE;
      const sctx = sprite.getContext("2d");
      if (sctx) {
        const r = HALO_SIZE / 2;
        const g = sctx.createRadialGradient(r, r, 0, r, r, r);
        g.addColorStop(0, `rgba(${color}, ${peak})`);
        g.addColorStop(0.35, `rgba(${color}, ${peak * 0.3})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        sctx.fillStyle = g;
        sctx.fillRect(0, 0, HALO_SIZE, HALO_SIZE);
      }
      return sprite;
    }
    const haloSilver = makeHalo(SILVER, 0.42);
    const haloGreen = makeHalo(GREEN, 0.5);

    // El degradado de las líneas solo depende del ancho: se cachea al redimensionar.
    let lineGradient: CanvasGradient | null = null;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);


      if (ctx) {
        lineGradient = ctx.createLinearGradient(0, 0, width, 0);
        lineGradient.addColorStop(0, `rgba(${SILVER}, 0)`);
        lineGradient.addColorStop(0.5, `rgba(${SILVER}, 0.22)`);
        lineGradient.addColorStop(1, `rgba(${SILVER}, 0)`);
      }
    }

    /** Devuelve el punto (x, y) de una corriente para un avance t (0-1). */
    function pointOn(stream: Stream, t: number, time: number) {
      const x = t * width;
      const wave =
        Math.sin(t * Math.PI * 2 * stream.frequency + stream.phase + time * stream.drift * 6) *
        stream.amplitude;
      const tilt = (t - 0.5) * 0.06; // leve inclinación, evita líneas planas
      const y = (stream.y + wave + tilt) * height;
      return { x, y };
    }

    function drawStreams(time: number) {
      if (!ctx) return;
      for (const stream of streams) {
        // línea base
        ctx.beginPath();
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const { x, y } = pointOn(stream, i / steps, time);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (lineGradient) ctx.strokeStyle = lineGradient;
        ctx.globalAlpha = stream.alpha;
        ctx.lineWidth = stream.width;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // pulsos que viajan por la corriente
        for (const pulse of stream.pulses) {
          const t = (pulse.t + time * pulse.speed) % 1;
          const { x, y } = pointOn(stream, t, time);

          // estela: unos pocos puntos detrás del pulso
          for (let k = 1; k <= 5; k++) {
            const tt = t - k * 0.015;
            if (tt < 0) continue;
            const p = pointOn(stream, tt, time);
            const fade = (1 - k / 6) * 0.5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, pulse.size * (1 - k / 9), 0, Math.PI * 2);
            ctx.fillStyle = pulse.accent
              ? `rgba(${GREEN}, ${0.32 * fade})`
              : `rgba(${SILVER}, ${0.45 * fade})`;
            ctx.fill();
          }

          // cabeza del pulso: se estampa el sprite del halo, escalado
          const halo = pulse.accent ? haloGreen : haloSilver;
          const haloR = pulse.size * 7;
          ctx.drawImage(halo, x - haloR, y - haloR, haloR * 2, haloR * 2);

          ctx.beginPath();
          ctx.arc(x, y, pulse.size * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = pulse.accent
            ? `rgba(${GREEN}, 0.75)`
            : `rgba(120, 124, 130, 0.62)`;
          ctx.fill();
        }
      }
    }

    function render(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawStreams(time);
    }

    function loop(now: number) {
      if (!running) return;
      render(now / 1000);
      frame = requestAnimationFrame(loop);
    }

    resize();

    if (still) {
      render(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resize();
      if (still) render(0);
    };
    window.addEventListener("resize", handleResize);

    // Pausa cuando la pestaña está oculta: no gasta batería de fondo.
    const handleVisibility = () => {
      if (still) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Pausa cuando el hero sale de la pantalla.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (still) return;
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, [still]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
