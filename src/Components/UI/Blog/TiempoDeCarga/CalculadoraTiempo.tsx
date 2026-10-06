import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BatteryCharging, Car, Info, Plug, RotateCcw } from "lucide-react";
import styles from "./CalculadoraTiempo.module.css";

/**
 * CalculadoraTiempo — cuánto tarda en cargar un auto eléctrico.
 *
 * La cuenta de fondo es simple: energía a reponer dividida por potencia. Lo
 * que la calculadora hace visible es lo que casi nadie tiene en cuenta — que
 * la potencia que manda es la MENOR entre la del cargador y la que acepta el
 * cargador de a bordo del auto. Un auto de 3,7 kW no carga más rápido porque
 * le pongas un equipo de 7 kW.
 */

/** Pérdidas típicas de una carga en corriente alterna: algo se va en calor. */
const EFICIENCIA = 0.9;

const CARGADORES = [
  { kw: 2.3, label: "Enchufe común" },
  { kw: 7, label: "EV-KIN HOME 7" },
  { kw: 11, label: "11 kW (trifásico)" },
  { kw: 22, label: "22 kW (trifásico)" },
];

const AUTOS = [
  { kw: 3.7, label: "3,7 kW" },
  { kw: 7.4, label: "7,4 kW" },
  { kw: 11, label: "11 kW" },
  { kw: 22, label: "22 kW" },
];

const numero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });
const entero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

function formatHoras(horas: number) {
  if (!Number.isFinite(horas) || horas <= 0) return "0 min";
  const totalMinutos = Math.round(horas * 60);
  const h = Math.floor(totalMinutos / 60);
  const m = totalMinutos % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export default function CalculadoraTiempo() {
  const shouldReduceMotion = !!useReducedMotion();

  const [capacidad, setCapacidad] = useState<number>(50);
  const [actual, setActual] = useState<number>(20);
  const [objetivo, setObjetivo] = useState<number>(80);
  const [potenciaCargador, setPotenciaCargador] = useState<number>(7);
  const [potenciaAuto, setPotenciaAuto] = useState<number>(7.4);
  const [consumo, setConsumo] = useState<number>(17);

  /** El nivel de partida nunca puede pasar al objetivo, ni al revés. */
  function cambiarActual(valor: number) {
    setActual(valor);
    if (valor > objetivo) setObjetivo(valor);
  }

  function cambiarObjetivo(valor: number) {
    setObjetivo(valor);
    if (valor < actual) setActual(valor);
  }

  function reiniciar() {
    setCapacidad(50);
    setActual(20);
    setObjetivo(80);
    setPotenciaCargador(7);
    setPotenciaAuto(7.4);
    setConsumo(17);
  }

  const calculo = useMemo(() => {
    const potenciaReal = Math.min(potenciaCargador, potenciaAuto);
    const limitaElAuto = potenciaAuto < potenciaCargador;

    const energia = (capacidad * Math.max(0, objetivo - actual)) / 100;
    const horas = potenciaReal > 0 ? energia / (potenciaReal * EFICIENCIA) : 0;

    const km = consumo > 0 ? (energia / consumo) * 100 : 0;
    const kmPorHora = consumo > 0 ? ((potenciaReal * EFICIENCIA) / consumo) * 100 : 0;

    return { potenciaReal, limitaElAuto, energia, horas, km, kmPorHora };
  }, [capacidad, actual, objetivo, potenciaCargador, potenciaAuto, consumo]);

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div>
          <p className={styles.title}>Calculá tu tiempo de carga</p>
          <p className={styles.lead}>
            Poné los datos de tu auto y de tu cargador. La cuenta tiene en cuenta las pérdidas y,
            sobre todo, cuál de los dos manda.
          </p>
        </div>
        <button type="button" className={styles.reset} onClick={reiniciar}>
          <RotateCcw className={styles.resetIcon} aria-hidden="true" />
          Reiniciar
        </button>
      </div>

      {/* ---------------------------------------- batería */}

      <div className={styles.bateria}>
        <div className={styles.pista}>
          <div className={styles.yaCargado} style={{ width: `${actual}%` }} />
          <motion.div
            className={styles.aCargar}
            initial={false}
            animate={{ left: `${actual}%`, width: `${Math.max(0, objetivo - actual)}%` }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
          />
        </div>
        <div className={styles.bateriaLeyenda}>
          <span>
            Ahora <strong>{actual}%</strong>
          </span>
          <span className={styles.bateriaCentro}>
            {numero.format(calculo.energia)} kWh a reponer
          </span>
          <span>
            Hasta <strong>{objetivo}%</strong>
          </span>
        </div>
      </div>

      {/* ---------------------------------------- entradas */}

      <div className={styles.campos}>
        <label className={styles.campo}>
          <span className={styles.campoLabel}>Batería del auto</span>
          <span className={styles.campoValor}>{numero.format(capacidad)} kWh</span>
          <input
            type="range"
            min={15}
            max={120}
            step={1}
            value={capacidad}
            onChange={(event) => setCapacidad(Number(event.target.value))}
            className={styles.range}
          />
        </label>

        <label className={styles.campo}>
          <span className={styles.campoLabel}>Carga actual</span>
          <span className={styles.campoValor}>{actual}%</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={actual}
            onChange={(event) => cambiarActual(Number(event.target.value))}
            className={styles.range}
          />
        </label>

        <label className={styles.campo}>
          <span className={styles.campoLabel}>Hasta cuánto querés cargar</span>
          <span className={styles.campoValor}>{objetivo}%</span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={objetivo}
            onChange={(event) => cambiarObjetivo(Number(event.target.value))}
            className={styles.range}
          />
        </label>
      </div>

      {/* ---------------------------------------- potencias */}

      <div className={styles.potencias}>
        <fieldset className={styles.grupo}>
          <legend className={styles.grupoTitulo}>
            <Plug className={styles.grupoIcon} aria-hidden="true" />
            Tu cargador
          </legend>
          <div className={styles.opciones}>
            {CARGADORES.map((item) => (
              <button
                key={item.kw}
                type="button"
                className={`${styles.opcion} ${
                  potenciaCargador === item.kw ? styles.opcionActiva : ""
                }`}
                onClick={() => setPotenciaCargador(item.kw)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.grupo}>
          <legend className={styles.grupoTitulo}>
            <Car className={styles.grupoIcon} aria-hidden="true" />
            Lo que acepta tu auto
          </legend>
          <div className={styles.opciones}>
            {AUTOS.map((item) => (
              <button
                key={item.kw}
                type="button"
                className={`${styles.opcion} ${
                  potenciaAuto === item.kw ? styles.opcionActiva : ""
                }`}
                onClick={() => setPotenciaAuto(item.kw)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ---------------------------------------- resultado */}

      <div className={styles.resultado}>
        <div className={styles.resultadoPrincipal}>
          <p className={styles.resultadoLabel}>
            <BatteryCharging className={styles.resultadoIcon} aria-hidden="true" />
            Tarda
          </p>
          <p className={styles.resultadoValor}>{formatHoras(calculo.horas)}</p>
          <p className={styles.resultadoNota}>
            cargando a {numero.format(calculo.potenciaReal)} kW reales
          </p>
        </div>

        <ul className={styles.secundarios}>
          <li>
            <span className={styles.secundarioValor}>+{entero.format(calculo.km)} km</span>
            <span className={styles.secundarioLabel}>de autonomía recuperada</span>
          </li>
          <li>
            <span className={styles.secundarioValor}>
              {entero.format(calculo.kmPorHora)} km/h
            </span>
            <span className={styles.secundarioLabel}>por cada hora enchufado</span>
          </li>
        </ul>
      </div>

      {calculo.limitaElAuto && (
        <p className={styles.alerta}>
          <Info className={styles.alertaIcon} aria-hidden="true" />
          <span>
            Acá el que limita es el auto: acepta {numero.format(potenciaAuto)} kW, así que de tu
            cargador de {numero.format(potenciaCargador)} kW solo usa esa parte. Ponerle un equipo
            más potente no lo cargaría más rápido.
          </span>
        </p>
      )}

      <label className={styles.consumo}>
        <span>Consumo del auto, para calcular los kilómetros</span>
        <span className={styles.consumoInput}>
          <input
            type="number"
            min={5}
            max={40}
            step={0.5}
            value={consumo}
            onChange={(event) => {
              const valor = Number(event.target.value.replace(",", "."));
              setConsumo(Number.isFinite(valor) ? valor : 0);
            }}
          />
          kWh/100 km
        </span>
      </label>

      <p className={styles.pie}>
        El cálculo descuenta un 10% de pérdidas, que es lo típico de una carga en corriente
        alterna. Los tiempos reales varían con la temperatura y con cómo el auto administra su
        batería, sobre todo cerca del 100%.
      </p>
    </div>
  );
}
