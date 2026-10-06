import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from "lucide-react";
import styles from "../Articulo.module.css";

/**
 * Artículo del blog: "Tipos de cargadores para autos eléctricos".
 *
 * Es el artículo de referencia del blog: el que alguien lee primero, cuando
 * todavía no entiende el vocabulario. Por eso ordena el tema en tres preguntas
 * —alterna o continua, qué modo, qué conector— en lugar de tirar una lista de
 * nombres técnicos.
 */

type ArticuloProps = {
  cover?: string;
  fecha?: string;
  lectura?: string;
  whatsapp?: string;
};

const MODOS = [
  {
    titulo: "Modo 1",
    meta: "No recomendado",
    texto:
      "El auto enchufado directo a un tomacorriente común, sin ninguna protección intermedia. Es la forma más barata y la más riesgosa. Muchos fabricantes directamente la desaconsejan.",
  },
  {
    titulo: "Modo 2",
    meta: "Para una emergencia",
    texto:
      "El cable con una caja en el medio que suele venir con el auto. Esa caja trae las protecciones y limita la corriente. Saca de un apuro, pero no está pensado para usarlo todas las noches.",
  },
  {
    titulo: "Modo 3",
    meta: "El de tu casa",
    destacada: true,
    texto:
      "El cargador de pared, con su línea dedicada y sus protecciones fijas en el tablero. El equipo conversa con el auto y ajusta la corriente. Es lo que instalás si vas a cargar todos los días.",
  },
  {
    titulo: "Modo 4",
    meta: "El de ruta",
    texto:
      "Corriente continua directo a la batería, sin pasar por el cargador de a bordo del auto. Son esos armarios grandes de las estaciones de servicio.",
  },
];

const POTENCIAS = [
  {
    fila: "Tomacorriente común",
    potencia: "2,3 kW",
    tiempo: "unas 19 h",
    donde: "En cualquier enchufe, sin instalación",
  },
  {
    fila: "Cargador monofásico",
    potencia: "3,7 a 7,4 kW",
    tiempo: "de 12 h a 6 h",
    donde: "Casas y cocheras. Es la franja del EV-KIN HOME 7",
  },
  {
    fila: "Cargador trifásico",
    potencia: "11 a 22 kW",
    tiempo: "de 4 h a 2 h",
    donde: "Comercios, edificios y casas con suministro trifásico",
  },
  {
    fila: "Carga rápida en continua",
    potencia: "50 kW o más",
    tiempo: "menos de 1 h",
    donde: "Estaciones de servicio y rutas",
  },
];

const CONECTORES = [
  {
    titulo: "Tipo 2",
    meta: "Alterna",
    destacada: true,
    texto:
      "El estándar de la carga en alterna, con siete pines. Es el que traen los cargadores EV-KIN y el que usa la mayoría de los autos que se venden hoy en la región.",
  },
  {
    titulo: "Tipo 1",
    meta: "Alterna",
    texto:
      "Cinco pines, solo monofásico. Aparece en autos más antiguos o pensados para el mercado norteamericano. Se resuelve con un cable adaptado al conector del auto.",
  },
  {
    titulo: "CCS2",
    meta: "Continua",
    texto:
      "Un conector Tipo 2 con dos pines gruesos agregados abajo. Es el que usan los cargadores rápidos de ruta. Por eso el mismo auto puede tener una sola boca para las dos cosas.",
  },
  {
    titulo: "CHAdeMO y GB/T",
    meta: "Continua",
    texto:
      "El japonés y el chino. Aparecen según de dónde venga el auto. Si el tuyo trae alguno de estos, lo importante es saberlo antes de salir a ruta, no antes de instalar en casa.",
  },
];

export default function ArticuloTiposDeCargadores({
  cover,
  fecha = "30 de septiembre de 2026",
  lectura = "7 min de lectura",
  whatsapp,
}: ArticuloProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola, quiero saber qué tipo de cargador necesito para mi auto.",
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

        <span className={styles.categoria}>Guía</span>

        <h1 className={styles.titulo}>Tipos de cargadores para autos eléctricos</h1>

        <p className={styles.bajada}>
          Modo 2, Modo 3, Tipo 2, CCS, wallbox, alterna, continua. Parecen muchas categorías
          distintas, pero en realidad son tres preguntas encadenadas. Respondidas esas tres, sabés
          exactamente qué necesitás.
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
            alt="Distintos tipos de cargadores para autos eléctricos."
            className={styles.coverImg}
          />
        )}
      </div>

      <div className={styles.cuerpo}>
        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Primera pregunta: alterna o continua</h2>
          <p>
            Esta es la división de fondo, y explica todo lo demás. La batería de un auto solo puede
            recibir corriente continua, pero de la red sale corriente alterna. En algún punto entre
            el enchufe y la batería, alguien tiene que convertir una en la otra. La pregunta es
            quién.
          </p>
          <p>
            En la carga en alterna, el que convierte es el auto: trae adentro un equipo llamado
            cargador de a bordo. Eso permite que el cargador de la pared sea chico y barato, porque
            en el fondo es poco más que un interruptor inteligente. La contra es que ese equipo del
            auto tiene un techo de potencia, y ese techo es bajo.
          </p>
          <p>
            En la carga en continua, el que convierte es el cargador. Por eso los de ruta son
            armarios del tamaño de una heladera y cuestan lo que cuestan: toda la electrónica
            pesada está ahí adentro. A cambio se saltean el cargador de a bordo y pueden entregar
            potencias enormes.
          </p>

          <div className={styles.dato}>
            <span className={styles.datoValor}>La misma diferencia, en una frase</span>
            <p className={styles.datoTexto}>
              El cargador de tu casa es barato porque el trabajo pesado lo hace el auto. El de la
              ruta es caro porque el trabajo pesado lo hace él.
            </p>
          </div>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Segunda pregunta: qué modo de carga</h2>
          <p>
            La norma internacional que rige esto define cuatro modos. No es vocabulario de
            vendedor: es la forma correcta de nombrar las cosas, y te sirve para entender qué te
            están ofreciendo.
          </p>

          <ul className={styles.tarjetas}>
            {MODOS.map((modo) => (
              <li
                key={modo.titulo}
                className={styles.tarjeta}
                data-destacada={modo.destacada ? "true" : undefined}
              >
                <div className={styles.tarjetaCabecera}>
                  <p className={styles.tarjetaTitulo}>{modo.titulo}</p>
                  <span className={styles.tarjetaMeta}>{modo.meta}</span>
                </div>
                <p className={styles.tarjetaTexto}>{modo.texto}</p>
              </li>
            ))}
          </ul>

          <p>
            Cuando alguien dice "wallbox" o "cargador domiciliario", está hablando de un Modo 3.
            Cuando te dicen "ya viene con cargador incluido", casi siempre están hablando del cable
            de Modo 2 que trae el auto en el baúl. No son lo mismo ni cumplen la misma función.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Tercera pregunta: cuánta potencia</h2>
          <p>
            Dentro de cada modo hay distintas potencias, y son las que definen el tiempo. Para
            tener una referencia, la columna del medio muestra cuánto tardarías en reponer 40 kWh
            —unos 235 kilómetros en un auto de consumo medio.
          </p>

          <div className={styles.tablaScroll}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Potencia</th>
                  <th scope="col">40 kWh en</th>
                  <th scope="col">Dónde se usa</th>
                </tr>
              </thead>
              <tbody>
                {POTENCIAS.map((fila) => (
                  <tr key={fila.fila}>
                    <th scope="row">{fila.fila}</th>
                    <td>{fila.potencia}</td>
                    <td>{fila.tiempo}</td>
                    <td>{fila.donde}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Ojo con una trampa frecuente: un cargador de 22 kW no sirve de nada si tu casa es
            monofásica, porque esa potencia necesita suministro trifásico. Y tampoco sirve si tu
            auto acepta 7,4 kW, porque cargaría igual a 7,4. Más kW en el equipo no es
            automáticamente más rápido.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Y los conectores, que es otra cosa</h2>
          <p>
            El conector es la forma física del enchufe, y se confunde todo el tiempo con el tipo de
            carga. Son cosas separadas: el conector define si entra, la potencia define cuánto
            tarda.
          </p>

          <ul className={styles.tarjetas}>
            {CONECTORES.map((conector) => (
              <li
                key={conector.titulo}
                className={styles.tarjeta}
                data-destacada={conector.destacada ? "true" : undefined}
              >
                <div className={styles.tarjetaCabecera}>
                  <p className={styles.tarjetaTitulo}>{conector.titulo}</p>
                  <span className={styles.tarjetaMeta}>{conector.meta}</span>
                </div>
                <p className={styles.tarjetaTexto}>{conector.texto}</p>
              </li>
            ))}
          </ul>

          <aside className={styles.aviso}>
            <p className={styles.avisoTitulo}>Antes de comprar, mirá la ficha de tu auto</p>
            <p>
              Cada auto trae especificado qué conector usa en alterna y cuál en continua, y a qué
              potencia acepta cada uno. Son dos datos, están en el manual, y evitan el 90% de los
              problemas.
            </p>
          </aside>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Con cable fijo o con toma</h2>
          <p>
            Una última división, más práctica que técnica. Hay cargadores que vienen con el cable
            ya puesto y otros que traen solo una toma, donde enchufás tu propio cable.
          </p>
          <p>
            El de cable fijo es más cómodo para una casa: llegás, enchufás y listo, no hay que
            buscar nada ni acordarse de guardarlo. Los EV-KIN vienen así, con cinco metros de cable
            Tipo 2. El de toma tiene sentido en estacionamientos compartidos o flotas, donde cada
            usuario llega con su propio cable y así el equipo sirve para autos con conectores
            distintos.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Lo que conviene mirar además de la potencia</h2>
          <p>
            Dos equipos de 7 kW pueden ser muy distintos. Cuando compares, mirá las protecciones
            que trae adentro —sobre todo la detección de fugas de corriente continua—, el grado de
            protección contra agua y polvo si va a estar a la intemperie, la resistencia a golpes,
            y el rango de temperatura, que en Mendoza importa de verdad en las dos puntas del año.
          </p>
          <p>
            Después, si tiene app para programar y monitorear, si maneja balanceo dinámico de carga
            para convivir con el resto del consumo de la casa, cuánta garantía tiene y quién te la
            responde. Y por último, que exista alguien que lo instale bien: el mejor equipo mal
            instalado es peor que uno modesto bien puesto.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Entonces, ¿cuál necesitás?</h2>
          <p>
            Para el 90% de la gente la respuesta es la misma: un Modo 3 en alterna, monofásico, de
            7 kW, con conector Tipo 2 y cable fijo. Es el equipo que carga un auto entero durante
            la noche sin exigirle nada raro a la instalación de una casa.
          </p>
          <p>
            Vas a necesitar algo distinto en tres casos. Si tenés suministro trifásico y un auto
            que acepta 11 o 22 kW, podés aprovecharlo. Si el auto usa un conector Tipo 1, el equipo
            es el mismo pero el cable cambia. Y si la instalación de tu casa está al límite, lo que
            necesitás no es menos potencia sino balanceo dinámico, que reparte lo que hay en vez de
            obligarte a ampliar.
          </p>
        </motion.section>

        {/* Esta es la carta donde los clientes haran las preguntas */}
        <motion.div className={styles.cierre} {...reveal} transition={{ duration: 0.6 }}>
          <p className={styles.cierreTitulo}>¿Cuál te sirve a vos?</p>
          <p className={styles.cierreTexto}>
            Decinos qué auto tenés y cómo es tu instalación, y te decimos qué necesitás — incluso
            si la respuesta es que todavía no te conviene comprar.
          </p>
          <div className={styles.cierreAcciones}>
            {whatsappHref ? (
              <a
                className={styles.primary}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className={styles.secondaryIcon} aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            ) : (
              <a className={styles.primary} href="/soporte">
                <MessageCircle className={styles.secondaryIcon} aria-hidden="true" />
                Consultar
              </a>
            )}
            <a className={styles.secondary} href="/productos">
              Ver los modelos
              <ArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </article>
  );
}