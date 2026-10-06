import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from "lucide-react";
import CalculadoraCarga from "./CalculadoraCargaUI";
import { VIGENCIA_COMBUSTIBLE, VIGENCIA_ELECTRICIDAD } from "./TarifasCarga";
import styles from "../Articulo.module.css";

/**
 * Artículo del blog: "Cargar en casa o en la red pública: qué conviene".
 * Mercado: Mendoza, Argentina.
 *
 * Las cifras son de referencia pública y están fechadas, con las fuentes
 * listadas al final. Si cambian, se tocan en `tarifasCarga.ts` y acá solo hay
 * que revisar el ejemplo del medio.
 */

type ArticuloProps = {
  /** Imagen de portada. Sin ella se dibuja un degradado de la marca. */
  cover?: string;
  fecha?: string;
  lectura?: string;
  whatsapp?: string;
};

const TABLA = [
  {
    fila: "Precio de la energía",
    casa: "Alrededor de $200 por kWh en Mendoza, según tu categoría y tu escalón de consumo",
    publica: "Alrededor de $700 por kWh en la tarifa de uso único, sin abono",
  },
  {
    fila: "Cuándo cargás",
    casa: "De noche, mientras dormís",
    publica: "Cuando encontrás un puesto libre",
  },
  {
    fila: "Cuánto tardás",
    casa: "Varias horas, pero el tiempo no te cuesta nada",
    publica: "Media hora en un cargador rápido; unas tres en uno semi-rápido",
  },
  {
    fila: "Dónde hay",
    casa: "En tu cochera, siempre",
    publica: "En puntos contados, y en Mendoza todavía son pocos",
  },
  {
    fila: "Qué pasa si está ocupado",
    casa: "No pasa",
    publica: "Esperás, o vas hasta el siguiente",
  },
  {
    fila: "Inversión inicial",
    casa: "El cargador y su instalación",
    publica: "Ninguna",
  },
];

const CUANDO_PUBLICA = [
  "Cuando salís a ruta y necesitás recuperar autonomía en el camino.",
  "Cuando vivís en un departamento donde todavía no se puede instalar un cargador propio.",
  "Cuando el auto no es tuyo, o lo tenés por poco tiempo.",
  "Cuando hacés tan pocos kilómetros al mes que el ahorro no justifica la instalación.",
];

export default function ArticuloCasaVsRed({
  cover,
  fecha = "30 de septiembre de 2026",
  lectura = "6 min de lectura",
  whatsapp,
}: ArticuloProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola, quiero saber más sobre instalar un cargador EV-KIN en casa.",
      )}`
    : undefined;

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      };

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <a className={styles.volver} href="/blog">
          <ArrowLeft className={styles.volverIcon} aria-hidden="true" />
          Volver al blog
        </a>

        <span className={styles.categoria}>Costos</span>

        <h1 className={styles.titulo}>
          Cargar en casa o en la red pública: qué conviene
        </h1>

        <p className={styles.bajada}>
          En Mendoza, el kWh de un cargador público cuesta más de tres veces lo
          que cuesta el de tu casa. Acá está el número, de dónde sale, y en qué
          casos igual conviene la red pública.
        </p>

        <p className={styles.meta}>
          <span>{fecha}</span>
          <span className={styles.metaSep} aria-hidden="true" />
          <span className={styles.metaItem}>
            <Clock className={styles.metaIcon} aria-hidden="true" />
            {lectura}
          </span>
        </p>
      </header>

      <div className={styles.cover} data-vacio={cover ? undefined : "true"}>
        {cover && (
          <img
            src={cover}
            alt="Un auto eléctrico cargando en la entrada de una casa."
            className={styles.coverImg}
          />
        )}
      </div>

      <div className={styles.cuerpo}>
        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>La respuesta corta</h2>
          <p>
            Cargar en casa es, con diferencia, la opción más barata. La red
            pública existe para otra cosa: para que puedas viajar. Cuando la
            usás como si fuera tu cargador de todos los días, el costo del mes
            se multiplica por más de tres.
          </p>
          <p>
            A eso hay que sumarle algo que en Mendoza pesa tanto como el precio:
            los puntos de carga pública todavía son pocos, y depender de ellos
            significa organizar tu semana alrededor de dónde hay uno libre.
          </p>
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Cuánto cuesta cargar en casa</h2>
          <p>
            En Mendoza, el kWh residencial ronda los $200. Decimos "ronda" en
            serio: el precio final depende de tu nivel de segmentación —N1, N2 o
            N3— y del escalón de consumo en el que caigas ese mes, así que puede
            moverse bastante de una casa a otra. En el AMBA, para comparar, está
            más cerca de los $150.
          </p>
          <p>
            El número exacto lo tenés en tu propia factura, y sacarlo es simple:
            dividí el total del consumo por los kWh que te facturaron. Ese es el
            valor que conviene poner en la calculadora de más abajo.
          </p>

          <aside className={styles.aviso}>
            <p className={styles.avisoTitulo}>Acá no hay tarifa nocturna</p>
            <p>
              A diferencia de otros países, en Mendoza no existe hoy una tarifa
              residencial por franja horaria: el kWh de la madrugada cuesta lo
              mismo que el del mediodía. Cargar de noche igual conviene, pero
              por otro motivo — a esa hora la casa no está usando el aire, el
              horno ni el termotanque, y el cargador tiene toda la instalación
              para él.
            </p>
          </aside>
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Cuánto cuesta cargar en la red pública</h2>
          <p>
            La red pública en Argentina se cobra por energía entregada. En la
            modalidad de uso único, sin abono mensual, el kWh está alrededor de
            los $700. Cargar de cero a lleno un auto chico, de unos 43 kWh de
            batería, ronda los $30.000; una carga típica hasta el 80%, unos
            $18.000.
          </p>
          <p>
            Si cargás afuera seguido, conviene mirar los planes con abono: el
            precio por kWh baja respecto del uso único. Aun así, difícilmente se
            acerque a lo que te cuesta el kWh en tu casa.
          </p>
          <p>
            La otra diferencia es el tiempo. Un cargador rápido te deja al 80%
            en alrededor de media hora; uno semi-rápido tarda unas tres horas.
            En casa tardás más, pero no estás esperando: estás durmiendo.
          </p>
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Un ejemplo con números</h2>
          <p>
            Tomemos un caso común: 1.000 km por mes y un auto que consume 17 kWh
            cada 100 km. Son 170 kWh al mes.
          </p>

          <ul className={styles.ejemplo}>
            <li>
              <span className={styles.ejemploLabel}>Todo en casa</span>
              <span className={styles.ejemploValor}>unos $34.000 por mes</span>
            </li>
            <li>
              <span className={styles.ejemploLabel}>
                Todo en la red pública, sin abono
              </span>
              <span className={styles.ejemploValor}>unos $119.000 por mes</span>
            </li>
            <li>
              <span className={styles.ejemploLabel}>
                El mismo recorrido con un auto a nafta de 8 L/100 km
              </span>
              <span className={styles.ejemploValor}>unos $173.400 por mes</span>
            </li>
          </ul>

          <p>
            La diferencia entre la primera línea y la última es de unos $139.000
            por mes. En un año, más de un millón y medio de pesos — sin contar
            service, aceite ni filtros.
          </p>
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Probalo con tus números</h2>
          <p>
            Los kilómetros que hacés, el consumo de tu auto y cuánto cargás
            afuera cambian bastante el resultado. Movelo hasta que se parezca a
            tu caso, y si tenés la factura a mano, reemplazá el precio del kWh
            por el tuyo.
          </p>
          <CalculadoraCarga />
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Las dos opciones, lado a lado</h2>

          <div className={styles.tablaScroll}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">En tu casa</th>
                  <th scope="col">En la red pública</th>
                </tr>
              </thead>
              <tbody>
                {TABLA.map((fila) => (
                  <tr key={fila.fila}>
                    <th scope="row">{fila.fila}</th>
                    <td>{fila.casa}</td>
                    <td>{fila.publica}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Cuándo sí conviene la red pública</h2>
          <p>
            Que sea más cara no la hace mala: la red pública resuelve cosas que
            un cargador en casa no puede resolver.
          </p>
          <ul className={styles.lista}>
            {CUANDO_PUBLICA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Lo razonable, para casi todo el mundo, es combinar las dos: el día a
            día en casa y la red pública para los viajes. Es exactamente la
            mezcla que podés simular arriba.
          </p>
        </motion.section>

        <motion.section
          className={styles.bloque}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.h2}>Lo que no aparece en el precio</h2>
          <p>
            Hay una diferencia que ninguna tarifa muestra: el tiempo. Cargar en
            casa no te lleva tiempo, porque ocurre mientras dormís. Cargar
            afuera sí: hay que llegar hasta el puesto, esperar que se desocupe
            si está tomado, y quedarse ahí hasta que termine.
          </p>
          <p>
            Si hacés la cuenta de cuántas horas al año son, el cargador propio
            se paga solo mucho antes de lo que sugiere la diferencia de precio
            del kWh.
          </p>
        </motion.section>

        {/* Esta es la carta donde los clientes haran las preguntas */}
        <motion.div
          className={styles.cierre}
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.cierreTitulo}>¿Querés cargar en casa?</p>
          <p className={styles.cierreTexto}>
            Los equipos EV-KIN HOME 7 y HOME 7 DLB cargan a 7 kW y se programan
            desde el celular. La versión DLB además mide el consumo de la casa y
            baja la carga cuando prendés el aire, así no te salta la térmica.
          </p>
          <div className={styles.cierreAcciones}>
            <a className={styles.primary} href="/productos">
              Ver los modelos
              <ArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
            {whatsappHref ? (
              <a
                className={styles.secondary}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle
                  className={styles.secondaryIcon}
                  aria-hidden="true"
                />
                Consultar instalación
              </a>
            ) : (
              <a className={styles.secondary} href="/instalacion">
                <MessageCircle
                  className={styles.secondaryIcon}
                  aria-hidden="true"
                />
                Consultar instalación
              </a>
            )}
          </div>
        </motion.div>

        <footer className={styles.fuentes}>
          <p className={styles.fuentesTitulo}>De dónde salen los números</p>
          <p className={styles.fuentesNota}>
            Valores de referencia de {VIGENCIA_ELECTRICIDAD} para la
            electricidad y de {VIGENCIA_COMBUSTIBLE} para la nafta Súper en
            Mendoza. El precio del kWh residencial varía según la categoría del
            hogar y el escalón de consumo.
          </p>
          <ul>
            <li>
              <a
                href="https://www.lanacion.com.ar/autos/cuanto-cuesta-cargar-un-auto-electrico-en-argentina-en-casa-en-el-trabajo-y-en-cargadores-publicos-nid25062026/"
                target="_blank"
                rel="noopener noreferrer"
              >
                La Nación — Cuánto cuesta cargar un auto eléctrico en Argentina
              </a>
            </li>
            <li>
              <a
                href="https://www.ambito.com/autos/cuanto-cuesta-cargar-un-auto-electrico-hoy-la-argentina-2026-precios-tiempos-y-opciones-n6292705"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ámbito — Precios, tiempos y opciones de carga en 2026
              </a>
            </li>
            <li>
              <a
                href="https://www.argentina.gob.ar/economia/energia/energia-electrica/estadisticas/cuadros-tarifarios-edemsa"
                target="_blank"
                rel="noopener noreferrer"
              >
                Secretaría de Energía — Cuadros tarifarios de EDEMSA
              </a>
            </li>
            <li>
              <a
                href="https://combustibles.ar/precios/mendoza/producto/nafta-super"
                target="_blank"
                rel="noopener noreferrer"
              >
                Precios de la nafta Súper en Mendoza
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </article>
  );
}
