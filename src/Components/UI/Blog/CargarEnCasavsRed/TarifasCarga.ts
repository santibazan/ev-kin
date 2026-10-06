/**
 * Precios usados por la calculadora de carga. Mercado: Mendoza, Argentina.
 *
 * Todo lo de acá son valores reales y públicos, con su fecha. Cuando cambien,
 * se tocan en este archivo y listo: no hay números sueltos en los componentes.
 *
 * Una advertencia importante sobre la tarifa eléctrica: en Mendoza no existe
 * hoy una tarifa residencial horaria, y el precio final del kWh depende del
 * nivel de segmentación del hogar (N1, N2 o N3) y del escalón de consumo. Por
 * eso el valor de referencia es aproximado y la calculadora deja cambiarlo:
 * el dato bueno está en la factura de cada uno.
 *
 * Fuentes:
 * - Costo de carga en casa y en cargadores públicos en Argentina (junio 2026):
 *   https://www.lanacion.com.ar/autos/cuanto-cuesta-cargar-un-auto-electrico-en-argentina-en-casa-en-el-trabajo-y-en-cargadores-publicos-nid25062026/
 *   https://www.ambito.com/autos/cuanto-cuesta-cargar-un-auto-electrico-hoy-la-argentina-2026-precios-tiempos-y-opciones-n6292705
 * - Cuadros tarifarios de EDEMSA y resoluciones del EPRE Mendoza:
 *   https://www.argentina.gob.ar/economia/energia/energia-electrica/estadisticas/cuadros-tarifarios-edemsa
 * - Precio de la nafta Súper en Mendoza (setiembre 2026):
 *   https://combustibles.ar/precios/mendoza/producto/nafta-super
 */

export const VIGENCIA_ELECTRICIDAD = "junio 2026";
export const VIGENCIA_COMBUSTIBLE = "setiembre 2026";

/** Precios de referencia del kWh en casa, en pesos argentinos. */
export const TARIFAS_CASA = {
  /** Mendoza y el interior, valor de referencia. */
  mendoza: 200,
  /** Buenos Aires y AMBA, para comparar. */
  amba: 150,
} as const;

/** Carga en la red pública. Tarifa de uso único de ChargeBox, sin plan. */
export const TARIFA_PUBLICA = 700;

/** Nafta Súper en Mendoza, pesos por litro (promedio de estaciones). */
export const PRECIO_NAFTA: number = 2168;

/** Valores de arranque de la calculadora: un uso doméstico típico. */
export const DEFAULTS = {
  kmPorMes: 1000,
  /** Consumo del eléctrico, kWh cada 100 km. */
  consumoElectrico: 17,
  /** Consumo del auto a nafta equivalente, litros cada 100 km. */
  consumoNafta: 8,
  /** Porcentaje de la energía que se carga en casa. */
  porcentajeCasa: 85,
} as const;

/** Paleta de las tres series del gráfico. Validada para daltonismo. */
export const COLORES = {
  casa: "#2f9c5c",
  publica: "#2563eb",
  nafta: "#c2410c",
} as const;

const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const numero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

/** Los precios del kWh y del litro se muestran sin decimales: son miles. */
const precio = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

export function formatPesos(value: number) {
  if (!Number.isFinite(value)) return "—";
  return pesos.format(Math.round(value));
}

export function formatNumero(value: number) {
  if (!Number.isFinite(value)) return "—";
  return numero.format(value);
}

export function formatPrecio(value: number) {
  if (!Number.isFinite(value)) return "—";
  return precio.format(value);
}
