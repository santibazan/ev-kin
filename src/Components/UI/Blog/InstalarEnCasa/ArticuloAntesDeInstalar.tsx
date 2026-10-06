import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from "lucide-react";
import VisorImagen from "../InstalarEnCasa/VisorImagen";
import esquema from "../../../../Images/triptico-de-instalacion.jpg";
import styles from "../Articulo.module.css";

/**
 * Artículo del blog: "Qué mirar antes de instalar un cargador en casa".
 *
 * Está escrito desde el lado del dueño de casa, no del instalador: la sección
 * /instalacion ya cubre el procedimiento técnico. Acá la pregunta es otra —
 * qué tiene que revisar alguien antes de comprar, para no llevarse sorpresas.
 *
 * Los valores eléctricos salen del esquema del fabricante, que se puede abrir
 * entero desde el visor.
 */

type ArticuloProps = {
  cover?: string;
  fecha?: string;
  lectura?: string;
  whatsapp?: string;
};

const CHECKLIST = [
  {
    titulo: "Sacá una foto del tablero",
    texto:
      "Que se vean las térmicas, el diferencial si lo hay, y cuántos módulos libres quedan. Es lo primero que te va a pedir el instalador.",
  },
  {
    titulo: "Fijate cuánta potencia tenés",
    texto:
      "El valor de la térmica general del tablero te da una idea. El cargador se lleva 32 A él solo, así que hay que ver qué queda para el resto de la casa.",
  },
  {
    titulo: "Medí del tablero al lugar del cargador",
    texto:
      "Esa distancia define cuánto cable dedicado hay que tirar, y es una parte grande del presupuesto de instalación.",
  },
  {
    titulo: "Pensá de qué lado queda la toma del auto",
    texto:
      "El cable del equipo mide 5 metros. Si el auto estaciona con la toma del lado opuesto, ese cable se te hace corto.",
  },
  {
    titulo: "Averiguá si la casa tiene puesta a tierra",
    texto:
      "Es obligatoria y no es opcional. En casas viejas suele ser lo que más demora la instalación.",
  },
  {
    titulo: "Probá el Wi-Fi donde va a ir el equipo",
    texto:
      "Paráte ahí con el celular y mirá cuántas rayas tenés. Sin señal perdés la app, la programación y el monitoreo.",
  },
];

export default function ArticuloAntesDeInstalar({
  cover,
  fecha = "30 de septiembre de 2026",
  lectura = "7 min de lectura",
  whatsapp,
}: ArticuloProps) {
  const shouldReduceMotion = !!useReducedMotion();

  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Hola, quiero que revisen si mi instalación sirve para un cargador EV-KIN.",
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

        <span className={styles.categoria}>Instalación</span>

        <h1 className={styles.titulo}>Qué mirar antes de instalar un cargador en casa</h1>

        <p className={styles.bajada}>
          Antes de elegir el equipo conviene mirar la casa. Seis cosas que podés revisar vos mismo
          en diez minutos y que determinan si la instalación es simple, si hay que reforzar algo, o
          si te conviene la versión con balanceo de carga.
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
            alt="Un cargador para auto eléctrico montado en la pared de una casa."
            className={styles.coverImg}
          />
        )}
      </div>

      <div className={styles.cuerpo}>
        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>El cargador es la parte fácil</h2>
          <p>
            Cuando alguien decide poner un cargador en casa, lo primero que compara son los
            equipos. Y está bien, pero en la práctica el equipo casi nunca es el problema: el
            problema es la instalación que ya tenés. Un cargador de 7 kW no es un electrodoméstico
            más, es la carga más grande que va a tener tu casa.
          </p>
          <p>
            La buena noticia es que casi todo lo que define si la instalación va a ser simple o
            complicada lo podés revisar vos mismo, sin herramientas, en una recorrida de diez
            minutos. Vamos punto por punto.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>1. Cuánta potencia tenés disponible</h2>
          <p>
            Es la pregunta que manda sobre todas las demás. Un EV-KIN HOME 7 consume 32 amperes
            cuando está cargando a fondo. Si mirás la térmica general de tu tablero y dice 40 A, el
            cargador solo se estaría llevando la mayor parte de lo que tenés, y lo que quede tiene
            que alcanzar para el aire, el horno, el termotanque y todo lo demás.
          </p>

          <div className={styles.dato}>
            <span className={styles.datoValor}>32 A</span>
            <p className={styles.datoTexto}>
              Es lo que consume el cargador cargando a plena potencia. Más o menos lo mismo que
              tres o cuatro aires acondicionados prendidos al mismo tiempo.
            </p>
          </div>

          <p>
            Esto no significa que necesites ampliar la potencia contratada. Significa que hay que
            hacer la cuenta antes, y que según cómo dé, la respuesta puede ser la versión con
            balanceo dinámico — que en vez de pedir aumentar la instalación, le baja la carga al
            auto cuando la casa está consumiendo mucho. Sobre eso volvemos al final.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>2. Dónde va a ir, y a qué distancia del tablero</h2>
          <p>
            El cargador va montado en pared, a alrededor de 1,5 metros del piso medidos al centro
            del equipo, sobre una superficie firme y nivelada. Si no hay pared en el lugar donde
            estacionás, existe la opción de montarlo sobre una columna.
          </p>
          <p>
            Lo que más impacta en el presupuesto es la distancia entre el tablero y ese punto,
            porque el cargador necesita su propia línea desde el tablero y ese cable hay que
            tirarlo. Medila con una cinta antes de pedir presupuesto: es el dato que más cambia
            entre una cotización y otra.
          </p>
          <p>
            Y hay un detalle que se pasa por alto hasta que es tarde: el cable del equipo mide 5
            metros. Fijate de qué lado tiene la toma tu auto y cómo lo estacionás habitualmente. Si
            la toma queda del lado contrario, esos 5 metros se hacen cortos.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>3. Cómo está el tablero</h2>
          <p>
            El cargador necesita su propio circuito, con sus propias protecciones. Eso ocupa lugar
            físico en el tablero. Abrí la tapa y mirá si quedan módulos libres: si está lleno, hay
            que ampliarlo o cambiarlo, y eso suma.
          </p>
          <p>
            Fijate también si hay un interruptor diferencial. Es ese que tiene un botón de prueba,
            normalmente marcado con una T. Muchas casas antiguas no tienen, y para una instalación
            de carga no es opcional.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>4. Cómo es la línea que hay que tirar</h2>
          <p>
            Esto lo resuelve el instalador, pero saber qué lleva te ayuda a comparar presupuestos y
            a darte cuenta si alguien te está proponiendo un atajo. Según la ficha del fabricante,
            un EV-KIN HOME 7 se conecta a 230 V monofásica con una línea dedicada de 3 × 6 mm²
            —fase, neutro y tierra—, protegida con una térmica de 32 A curva C y un diferencial de
            40 A con corte de 30 mA tipo A.
          </p>

          <VisorImagen
            src={esquema}
            variante="figura"
            label="Ver el esquema completo"
            titulo="Esquema de instalación EV-KIN HOME 7 / HOME 7 DLB"
            nombreDescarga="ev-kin-esquema-instalacion.jpg"
            epigrafe="Esquema de conexión, dimensiones de la placa de montaje y recomendaciones del fabricante. Tocá para verlo en grande o descargarlo."
            alt="Esquema de instalación del EV-KIN HOME 7: alimentación de 230 V monofásica desde el tablero, interruptor termomagnético de 32 A curva C, interruptor diferencial de 40 A con 30 mA de corte tipo A, cable dedicado de 3 por 6 milímetros cuadrados con fase, neutro y tierra, montaje en pared a 1,5 metros del suelo y dimensiones de la placa de montaje."
          />

          <p>
            Si vas a pedir varios presupuestos, mandales esta imagen. Vas a ver enseguida cuál te
            está cotizando la instalación completa y cuál te está cotizando enchufarlo en una toma
            que ya existe.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>5. La puesta a tierra</h2>
          <p>
            De todo lo de esta lista, esta es la que más veces frena una instalación. La conexión a
            tierra es obligatoria, y en casas construidas hace algunas décadas muchas veces no
            existe, o existe pero no está en condiciones.
          </p>
          <p>
            No es algo que se pueda saltear ni improvisar: es la protección que hace que, si algo
            falla, la corriente se vaya a tierra en lugar de pasar por quien esté tocando el auto o
            el cable. Si tu casa no la tiene, hay que hacerla antes, y conviene saberlo desde el
            principio y no el día de la instalación.
          </p>

          <aside className={styles.aviso}>
            <p className={styles.avisoTitulo}>Esto no lo revisás vos</p>
            <p>
              Ver si hay un cable de tierra en el tablero es una cosa; saber si esa puesta a tierra
              funciona es otra, y requiere medirla con instrumental. Eso lo hace el instalador
              matriculado en el relevamiento.
            </p>
          </aside>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>6. Si llega el Wi-Fi hasta ahí</h2>
          <p>
            Es lo más fácil de verificar y lo que más se olvida. Andá hasta el lugar donde iría el
            cargador con el celular en la mano y mirá la señal. Las cocheras suelen estar lejos del
            router, y muchas veces con una pared de hormigón en el medio.
          </p>
          <p>
            Sin Wi-Fi el cargador carga igual, pero perdés todo lo que lo hace inteligente: la app,
            programar la carga para que arranque de madrugada, ver cuánto consumiste. Si la señal
            es floja, un repetidor sale mucho menos que resignar esas funciones.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>Cuando la instalación no da</h2>
          <p>
            Pasa seguido, sobre todo en casas donde el aire acondicionado ya hace trabajar al
            tablero al límite. La salida clásica es pedirle a la distribuidora un aumento de
            potencia, que es un trámite, tiene un costo y lleva tiempo.
          </p>
          <p>
            La otra salida es el balanceo dinámico de carga. El HOME 7 DLB mide cuánto está
            consumiendo la casa en tiempo real y le baja la potencia al auto cuando hace falta:
            cuando prendés el aire, carga más lento; cuando el consumo baja, vuelve a cargar a
            fondo. El auto termina cargado igual, porque tiene toda la noche, y la térmica no
            salta.
          </p>
        </motion.section>

        <motion.section className={styles.bloque} {...reveal} transition={{ duration: 0.6 }}>
          <h2 className={styles.h2}>La lista para tener a mano</h2>
          <p>
            Si vas a pedir un presupuesto, con esto resuelto la conversación arranca mucho más
            adelante.
          </p>

          <ol className={styles.pasos}>
            {CHECKLIST.map((item) => (
              <li key={item.titulo}>
                <span className={styles.pasoTitulo}>{item.titulo}</span>
                <p className={styles.pasoTexto}>{item.texto}</p>
              </li>
            ))}
          </ol>

          <p>
            Nada de esto reemplaza el relevamiento del instalador, que es quien mide, calcula y se
            hace responsable del trabajo. Pero llegar con estas respuestas hace que el relevamiento
            sea media hora y no dos visitas.
          </p>
        </motion.section>

        {/* Esta es la carta donde los clientes haran las preguntas */}
        <motion.div className={styles.cierre} {...reveal} transition={{ duration: 0.6 }}>
          <p className={styles.cierreTitulo}>¿Querés que revisemos tu caso?</p>
          <p className={styles.cierreTexto}>
            Mandanos la foto del tablero y contanos dónde estacionás. Te decimos qué modelo te
            conviene y coordinamos el relevamiento con un instalador de la red.
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
            <a className={styles.secondary} href="/instalacion">
              Cómo es la instalación
              <ArrowRight className={styles.arrow} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
