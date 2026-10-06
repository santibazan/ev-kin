import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from "lucide-react";
import CalculadoraTiempo from "./CalculadoraTiempo";
import styles from "../Articulo.module.css";

/**
 * Artículo del blog: "Cómo calcular el tiempo de carga de tu auto".
 *
 * La idea central, y la que más confunde a la gente, es que la potencia que
 * manda es la menor entre la del cargador y la que acepta el auto. El resto
 * del artículo se apoya en eso.
 */

type ArticuloProps = {
  cover?: string;
  fecha?: string;
  lectura?: string;
  whatsapp?: string;
};

const ESCENARIOS = [
  {
    titulo: "Enchufe común, 2,3 kW",
    texto:
      "Unas 19 horas para reponer 40 kWh. Sirve para una emergencia, no para todos los días: el tomacorriente y su cableado no están pensados para entregar eso durante tantas horas seguidas.",
  },
  {
    titulo: "EV-KIN HOME 7, 7 kW",
    texto:
      "Las mismas 40 kWh en poco más de 6 horas. Entra holgado en una noche, y por eso es la potencia estándar para una casa.",
  },
  {
    titulo: "Cargador rápido de ruta",
    texto:
      "Del 10 al 80% en media hora. Es otra tecnología: entrega corriente continua directo a la batería, saltándose el cargador de a bordo del auto.",
  },
];

export default function ArticuloTiempoDeCarga({
  cover,
  fecha = "30 de septiembre de 2026",
  lectura = "6 min de lectura",
  whatsapp,
}: ArticuloProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola, quiero saber qué cargador me conviene para mi auto.",
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

        <span className={styles.categoria}>Cómo funciona</span>

        <h1 className={styles.titulo}>Cómo calcular el tiempo de carga de tu auto</h1>

        <p className={styles.bajada}>
          La cuenta es una división, pero hay un detalle que cambia todo el resultado y que casi
          nadie mira: no siempre manda el cargador. A veces el que pone el límite es el auto.
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
            alt="Un auto eléctrico enchufado a un cargador de pared durante la noche."
            className={styles.coverImg}
          />
        )}
      </div>

      <div className={styles.cuerpo}>
        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>La fórmula, en una línea</h2>
          <p>
            Cargar un auto es llenar un tanque. Los kWh de la batería son el tamaño del tanque y
            los kW del cargador son el grosor de la manguera. El tiempo sale de dividir uno por el
            otro.
          </p>

          <div className={styles.dato}>
            <span className={styles.datoValor}>kWh a reponer ÷ kW de carga = horas</span>
            <p className={styles.datoTexto}>
              Si tenés que reponer 40 kWh y cargás a 7 kW, son casi 6 horas. En la práctica tardás
              un poco más, y ahora vemos por qué.
            </p>
          </div>

          <p>
            Los kWh a reponer no son los de toda la batería, sino los del tramo que te falta. Un
            auto de 50 kWh que está al 20% y querés dejar al 80% necesita el 60% de 50, o sea 30
            kWh. Casi nadie carga de 0 a 100: se carga el pedazo del medio.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Por qué tarda más de lo que da la cuenta</h2>
          <p>
            Entre el enchufe y la batería hay conversión de corriente, y en toda conversión se
            pierde algo en forma de calor. Como regla práctica, calculá un 10% más de tiempo del
            que da la división. Es poco, pero es la diferencia entre que el auto esté listo a las
            siete de la mañana o a las siete y media.
          </p>
          <p>
            Hay otra cosa que estira el final: cerca del 100% el auto baja la potencia a propósito,
            para cuidar la batería. Por eso las últimas veinte unidades de porcentaje siempre
            tardan más que las veinte del medio, y por eso para el uso diario conviene cargar hasta
            el 80% y no hasta el tope.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>El detalle que cambia todo: quién pone el límite</h2>
          <p>
            Acá está lo que casi nadie tiene en cuenta. Cuando cargás en corriente alterna —que es
            lo que hacés en tu casa— la electricidad no va directo a la batería: pasa por un
            equipo que el auto trae adentro, el cargador de a bordo. Y ese equipo tiene su propio
            techo de potencia.
          </p>
          <p>
            La potencia real de la carga es <strong>la menor entre las dos</strong>: la que entrega
            tu cargador y la que acepta tu auto. Si tenés un EV-KIN HOME 7 de 7 kW pero tu auto
            acepta 3,7 kW, vas a cargar a 3,7 kW. Comprar un equipo más potente no lo haría más
            rápido.
          </p>
          <p>
            Vale también al revés, y es el error más caro: si tu auto acepta 7,4 kW y lo enchufás a
            un tomacorriente común de 2,3 kW, estás desperdiciando dos tercios de lo que podría
            hacer. Antes de elegir cargador, buscá en la ficha de tu auto cuánto acepta en AC.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Hacé la cuenta con tu auto</h2>
          <p>
            Poné la batería de tu auto, desde y hasta qué porcentaje querés cargar, y las dos
            potencias. La calculadora te avisa cuál de los dos está limitando.
          </p>
          <CalculadoraTiempo />
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Los tres escenarios típicos</h2>
          <p>
            Para tener una referencia rápida, así queda reponer 40 kWh —más o menos lo que gasta un
            auto mediano en 235 kilómetros— según dónde lo enchufes.
          </p>

          <ol className={styles.pasos}>
            {ESCENARIOS.map((item) => (
              <li key={item.titulo}>
                <span className={styles.pasoTitulo}>{item.titulo}</span>
                <p className={styles.pasoTexto}>{item.texto}</p>
              </li>
            ))}
          </ol>

          <aside className={styles.aviso}>
            <p className={styles.avisoTitulo}>El cargador rápido juega otro partido</p>
            <p>
              Los de ruta entregan corriente continua, que va directo a la batería sin pasar por el
              cargador de a bordo. Por eso alcanzan potencias que en una casa serían impensables. A
              cambio son mucho más caros por kWh y no se usan todos los días.
            </p>
          </aside>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>En casa, la pregunta correcta es otra</h2>
          <p>
            Cuando cargás en tu casa, cuánto tarda de 0 a 100 es un dato casi inútil. Nadie llega
            con la batería vacía ni se queda mirando el cargador. La pregunta que importa es
            cuántos kilómetros recuperás en las horas que el auto está quieto.
          </p>
          <p>
            Un EV-KIN HOME 7 repone alrededor de 37 kilómetros por cada hora enchufado, en un auto
            de consumo medio. En una noche de ocho horas son casi 300 kilómetros. Para el uso
            normal de una familia, eso significa que todas las mañanas salís con el auto lleno, sin
            haber pensado en el tema ni una vez.
          </p>
          <p>
            Ahí está la diferencia real entre cargar en casa y depender de la red pública: no es la
            velocidad, es que el tiempo de carga deja de existir como problema.
          </p>
        </motion.section>

        {/* Esta es la carta donde los clientes haran las preguntas */}
        <motion.div className={styles.cierre} {...reveal} transition={{ duration: 0.6 }}>
          <p className={styles.cierreTitulo}>¿No sabés cuánto acepta tu auto?</p>
          <p className={styles.cierreTexto}>
            Decinos qué modelo tenés y te confirmamos a qué potencia carga en corriente alterna, y
            si te conviene el HOME 7 o el HOME 7 DLB según tu instalación.
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
