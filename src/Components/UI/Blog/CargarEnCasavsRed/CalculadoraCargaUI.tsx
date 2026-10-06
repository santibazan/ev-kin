import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Fuel, House, RotateCcw, Settings2, Zap } from "lucide-react";
import {
  COLORES,
  DEFAULTS,
  PRECIO_NAFTA,
  TARIFAS_CASA,
  TARIFA_PUBLICA,
  VIGENCIA_COMBUSTIBLE,
  VIGENCIA_ELECTRICIDAD,
  formatNumero,
  formatPesos,
  formatPrecio,
} from "./TarifasCarga";
import styles from "./CalculadoraCarga.module.css";

/**
 * CalculadoraCarga — cuánto sale cargar en casa, en la red pública y cuánto
 * costaría el mismo recorrido con nafta. Precios de Mendoza.
 *
 * El precio del kWh en casa arranca con un valor de referencia, pero es
 * editable a propósito: depende del nivel de segmentación del hogar y del
 * escalón de consumo, así que el número bueno sale de la factura.
 */

type Escenario = {
  id: "casa" | "publica" | "nafta";
  label: string;
  detalle: string;
  costo: number;
  color: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Lee un input numérico sin romperse con el campo vacío. */
function toNumber(value: string, fallback: number) {
  if (value.trim() === "") return 0;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default function CalculadoraCarga() {
  const shouldReduceMotion = !!useReducedMotion();

  const [kmPorMes, setKmPorMes] = useState<number>(DEFAULTS.kmPorMes);
  const [consumoElectrico, setConsumoElectrico] = useState<number>(
    DEFAULTS.consumoElectrico,
  );
  const [consumoNafta, setConsumoNafta] = useState<number>(
    DEFAULTS.consumoNafta,
  );
  const [porcentajeCasa, setPorcentajeCasa] = useState<number>(
    DEFAULTS.porcentajeCasa,
  );

  const [ajustesAbiertos, setAjustesAbiertos] = useState(false);
  const [tarifaCasa, setTarifaCasa] = useState<number>(TARIFAS_CASA.mendoza);
  const [tarifaPublica, setTarifaPublica] = useState<number>(TARIFA_PUBLICA);
  const [precioNafta, setPrecioNafta] = useState<number>(PRECIO_NAFTA);

  function reiniciar() {
    setKmPorMes(DEFAULTS.kmPorMes);
    setConsumoElectrico(DEFAULTS.consumoElectrico);
    setConsumoNafta(DEFAULTS.consumoNafta);
    setPorcentajeCasa(DEFAULTS.porcentajeCasa);
    setTarifaCasa(TARIFAS_CASA.mendoza);
    setTarifaPublica(TARIFA_PUBLICA);
    setPrecioNafta(PRECIO_NAFTA);
  }

  const calculo = useMemo(() => {
    const kwhMes = (kmPorMes * consumoElectrico) / 100;

    const costoTodoCasa = kwhMes * tarifaCasa;
    const costoTodoPublica = kwhMes * tarifaPublica;
    const costoNafta = (kmPorMes / 100) * consumoNafta * precioNafta;

    const kwhCasa = (kwhMes * porcentajeCasa) / 100;
    const kwhPublica = kwhMes - kwhCasa;
    const costoMezcla = kwhCasa * tarifaCasa + kwhPublica * tarifaPublica;

    return {
      kwhMes,
      costoTodoCasa,
      costoTodoPublica,
      costoNafta,
      costoMezcla,
      ahorroMensual: costoNafta - costoMezcla,
      ahorroAnual: (costoNafta - costoMezcla) * 12,
      costoPorKmMezcla: kmPorMes > 0 ? costoMezcla / kmPorMes : 0,
    };
  }, [
    kmPorMes,
    consumoElectrico,
    consumoNafta,
    porcentajeCasa,
    tarifaCasa,
    tarifaPublica,
    precioNafta,
  ]);

  const escenarios: Escenario[] = [
    {
      id: "casa",
      label: "Todo en casa",
      detalle: `$${formatPrecio(tarifaCasa)} por kWh`,
      costo: calculo.costoTodoCasa,
      color: COLORES.casa,
    },
    {
      id: "publica",
      label: "Todo en la red pública",
      detalle: `$${formatPrecio(tarifaPublica)} por kWh`,
      costo: calculo.costoTodoPublica,
      color: COLORES.publica,
    },
    {
      id: "nafta",
      label: "El mismo recorrido con nafta",
      detalle: `${formatNumero(consumoNafta)} L/100 km a $${formatPrecio(precioNafta)} el litro`,
      costo: calculo.costoNafta,
      color: COLORES.nafta,
    },
  ];

  const maximo = Math.max(...escenarios.map((item) => item.costo), 1);

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div>
          <p className={styles.title}>¿Cuánto te costaría a vos?</p>
          <p className={styles.lead}>
            Moví los valores y mirá cómo cambia el costo del mes. Los precios de
            arranque son de referencia para Mendoza; si tenés tu factura a mano,
            cambialos por los tuyos.
          </p>
        </div>
        <button type="button" className={styles.reset} onClick={reiniciar}>
          <RotateCcw className={styles.resetIcon} aria-hidden="true" />
          Reiniciar
        </button>
      </div>

      {/* ---------------------------------------- entradas */}

      <div className={styles.campos}>
        <label className={styles.campo}>
          <span className={styles.campoLabel}>Kilómetros por mes</span>
          <span className={styles.campoValor}>{formatNumero(kmPorMes)} km</span>
          <input
            type="range"
            min={100}
            max={4000}
            step={50}
            value={kmPorMes}
            onChange={(event) => setKmPorMes(Number(event.target.value))}
            className={styles.range}
          />
        </label>

        <label className={styles.campo}>
          <span className={styles.campoLabel}>Consumo del eléctrico</span>
          <span className={styles.campoValor}>
            {formatNumero(consumoElectrico)} kWh/100 km
          </span>
          <input
            type="range"
            min={10}
            max={30}
            step={0.5}
            value={consumoElectrico}
            onChange={(event) =>
              setConsumoElectrico(Number(event.target.value))
            }
            className={styles.range}
          />
        </label>

        <label className={styles.campo}>
          <span className={styles.campoLabel}>Cuánto cargás en casa</span>
          <span className={styles.campoValor}>
            {porcentajeCasa}% casa · {100 - porcentajeCasa}% afuera
          </span>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={porcentajeCasa}
            onChange={(event) => setPorcentajeCasa(Number(event.target.value))}
            className={styles.range}
          />
        </label>
      </div>

      {/* ---------------------------------------- resultado principal */}

      <div className={styles.resultado}>
        <div className={styles.resultadoBloque}>
          <p className={styles.resultadoLabel}>Tu mezcla, por mes</p>
          <p className={styles.resultadoValor}>
            {formatPesos(calculo.costoMezcla)}
          </p>
          <p className={styles.resultadoNota}>
            {formatNumero(calculo.kwhMes)} kWh · $
            {formatPrecio(calculo.costoPorKmMezcla)} por km
          </p>
        </div>

        <div className={styles.resultadoBloque} data-destacado="true">
          <p className={styles.resultadoLabel}>
            {calculo.ahorroAnual >= 0 ? "Ahorro al año" : "Diferencia al año"}
          </p>
          <p className={styles.resultadoValor}>
            {formatPesos(Math.abs(calculo.ahorroAnual))}
          </p>
          <p className={styles.resultadoNota}>
            {formatPesos(Math.abs(calculo.ahorroMensual))} por mes frente a la
            nafta
          </p>
        </div>
      </div>

      {/* ---------------------------------------- gráfico */}

      <div className={styles.grafico}>
        <p className={styles.graficoTitulo}>
          Costo del mes, según dónde cargues
        </p>

        <ul className={styles.barras}>
          {escenarios.map((item) => (
            <li key={item.id} className={styles.barraFila}>
              <div className={styles.barraCabecera}>
                <span className={styles.barraLabel}>
                  <span
                    className={styles.punto}
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
                <span className={styles.barraMonto}>
                  {formatPesos(item.costo)}
                </span>
              </div>
              <div className={styles.pista}>
                <motion.div
                  className={styles.barra}
                  style={{ background: item.color }}
                  initial={false}
                  animate={{
                    width: `${clamp((item.costo / maximo) * 100, 0.5, 100)}%`,
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              </div>
              <p className={styles.barraDetalle}>{item.detalle}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------------------------------------- precios editables */}

      <button
        type="button"
        className={styles.ajustesToggle}
        onClick={() => setAjustesAbiertos((abierto) => !abierto)}
        aria-expanded={ajustesAbiertos}
      >
        <Settings2 className={styles.ajustesIcon} aria-hidden="true" />
        {ajustesAbiertos ? "Ocultar los precios" : "Ver y editar los precios"}
      </button>

      {ajustesAbiertos && (
        <div className={styles.ajustes}>
          <fieldset className={styles.grupo}>
            <legend className={styles.grupoTitulo}>
              <House className={styles.grupoIcon} aria-hidden="true" />
              En casa
            </legend>

            <div className={styles.opciones}>
              {(
                [
                  ["mendoza", "Mendoza"],
                  ["amba", "AMBA"],
                ] as const
              ).map(([clave, etiqueta]) => (
                <button
                  key={clave}
                  type="button"
                  className={`${styles.opcion} ${
                    tarifaCasa === TARIFAS_CASA[clave]
                      ? styles.opcionActiva
                      : ""
                  }`}
                  onClick={() => setTarifaCasa(TARIFAS_CASA[clave])}
                >
                  {etiqueta}
                </button>
              ))}
            </div>

            <label className={styles.numero}>
              <span>Precio del kWh</span>
              <input
                type="number"
                min={0}
                step={1}
                value={tarifaCasa}
                onChange={(event) =>
                  setTarifaCasa(
                    toNumber(event.target.value, TARIFAS_CASA.mendoza),
                  )
                }
              />
            </label>

            <p className={styles.ayuda}>
              Para sacar el tuyo: dividí el total del consumo de tu factura por
              los kWh que te facturaron.
            </p>
          </fieldset>

          <fieldset className={styles.grupo}>
            <legend className={styles.grupoTitulo}>
              <Zap className={styles.grupoIcon} aria-hidden="true" />
              En la red pública
            </legend>

            <label className={styles.numero}>
              <span>Precio del kWh</span>
              <input
                type="number"
                min={0}
                step={1}
                value={tarifaPublica}
                onChange={(event) =>
                  setTarifaPublica(toNumber(event.target.value, TARIFA_PUBLICA))
                }
              />
            </label>

            <p className={styles.ayuda}>
              El valor de arranque es el de uso único, sin abono. Con un plan
              mensual el kWh sale menos.
            </p>
          </fieldset>

          <fieldset className={styles.grupo}>
            <legend className={styles.grupoTitulo}>
              <Fuel className={styles.grupoIcon} aria-hidden="true" />
              El auto a nafta con el que comparás
            </legend>

            <label className={styles.numero}>
              <span>Consumo (L/100 km)</span>
              <input
                type="number"
                min={0}
                step={0.1}
                value={consumoNafta}
                onChange={(event) =>
                  setConsumoNafta(
                    toNumber(event.target.value, DEFAULTS.consumoNafta),
                  )
                }
              />
            </label>

            <label className={styles.numero}>
              <span>Precio del litro</span>
              <input
                type="number"
                min={0}
                step={1}
                value={precioNafta}
                onChange={(event) =>
                  setPrecioNafta(toNumber(event.target.value, PRECIO_NAFTA))
                }
              />
            </label>
          </fieldset>
        </div>
      )}

      <p className={styles.pie}>
        Valores de referencia de {VIGENCIA_ELECTRICIDAD} para la electricidad y
        de {VIGENCIA_COMBUSTIBLE} para la nafta Súper en Mendoza. Es una
        estimación: el precio real del kWh depende de tu categoría y tu consumo,
        y el del auto, del manejo y la temperatura.
      </p>
    </div>
  );
}
