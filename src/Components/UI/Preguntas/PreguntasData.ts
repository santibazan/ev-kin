/**
 * Contenido de las preguntas frecuentes.
 * Está separado del componente para que se pueda editar el texto sin tocar código.
 */

export type FaqBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: FaqBlock[];
};

export const PREGUNTAS: FaqItem[] = [
  // ---------------------------------------------------------------- Producto
  {
    id: "que-es",
    category: "Producto",
    question: "¿Qué es EV-KIN HOME 7?",
    answer: [
      {
        type: "p",
        text: "EV-KIN HOME 7 es un cargador inteligente para vehículos eléctricos, pensado para uso residencial y comercial liviano. Permite cargar tu auto de forma segura, simple y conectada, con monitoreo desde la app Smart Life / Tuya.",
      },
    ],
  },
  {
    id: "diferencia-dlb",
    category: "Producto",
    question: "¿Cuál es la diferencia entre EV-KIN HOME 7 y EV-KIN HOME 7 DLB?",
    answer: [
      { type: "p", text: "Ambos equipos comparten la misma base tecnológica:" },
      {
        type: "list",
        items: [
          "Potencia: 7 kW",
          "Alimentación: 230 V AC",
          "Corriente nominal: 32 A",
          "Conector: Tipo 2",
          "Cable: 5 metros",
          "Conectividad: Wi-Fi",
          "App: Smart Life / Tuya",
        ],
      },
      {
        type: "p",
        text: "La diferencia es que EV-KIN HOME 7 DLB incorpora Dynamic Load Balancing (DLB), que ajusta dinámicamente la potencia de carga según el consumo eléctrico de la instalación.",
      },
    ],
  },
  {
    id: "que-es-dlb",
    category: "Producto",
    question: "¿Qué significa Dynamic Load Balancing (DLB)?",
    answer: [
      {
        type: "p",
        text: "El DLB permite que el cargador gestione automáticamente la potencia disponible en la vivienda o comercio.",
      },
      {
        type: "p",
        text: "Si en el inmueble se encienden otros consumos importantes, el equipo reduce la potencia de carga para evitar sobrecargas. Cuando vuelve a haber capacidad disponible, la carga aumenta nuevamente.",
      },
    ],
  },
  {
    id: "que-modelo-elegir",
    category: "Producto",
    question: "¿Qué modelo me conviene elegir?",
    answer: [
      {
        type: "list",
        items: [
          "EV-KIN HOME 7: ideal cuando la instalación tiene potencia suficiente y no necesitás gestión dinámica.",
          "EV-KIN HOME 7 DLB: recomendado cuando el inmueble tiene consumos variables o querés optimizar la potencia disponible y evitar sobrecargas.",
        ],
      },
    ],
  },
  {
    id: "solo-casas",
    category: "Producto",
    question: "¿EV-KIN sirve solo para casas?",
    answer: [
      { type: "p", text: "No. También es una muy buena solución para:" },
      {
        type: "list",
        items: ["Edificios", "Comercios", "Estacionamientos", "Oficinas", "Pequeñas empresas"],
      },
    ],
  },

  // -------------------------------------------------- Carga y compatibilidad
  {
    id: "potencia",
    category: "Carga y compatibilidad",
    question: "¿Qué potencia de carga tiene el equipo?",
    answer: [
      {
        type: "p",
        text: "El equipo entrega hasta 7 kW de potencia en corriente alterna, con alimentación 230 V AC y una corriente nominal de 32 A.",
      },
    ],
  },
  {
    id: "tipo-de-carga",
    category: "Carga y compatibilidad",
    question: "¿Qué tipo de carga realiza?",
    answer: [
      {
        type: "p",
        text: "EV-KIN HOME 7 realiza carga en corriente alterna (AC), ideal para viviendas, cocheras, edificios y pequeños comercios.",
      },
      {
        type: "p",
        text: "Es la solución más práctica para recargar el vehículo durante la noche o durante varias horas de estacionamiento.",
      },
    ],
  },
  {
    id: "conector",
    category: "Carga y compatibilidad",
    question: "¿Qué conector utiliza?",
    answer: [
      {
        type: "p",
        text: "Utiliza conector Tipo 2, con cable incorporado de 5 metros, que es el estándar más difundido para carga AC.",
      },
    ],
  },
  {
    id: "compatibilidad",
    category: "Carga y compatibilidad",
    question: "¿Es compatible con mi vehículo?",
    answer: [
      {
        type: "p",
        text: "Sí. EV-KIN está diseñado para ofrecer alta compatibilidad con vehículos eléctricos que cargan en AC mediante Tipo 2.",
      },
      {
        type: "p",
        text: "Si tenés dudas sobre un modelo específico, Kinergia puede verificar la compatibilidad antes de la instalación.",
      },
    ],
  },

  // ------------------------------------------------------ App y conectividad
  {
    id: "wifi",
    category: "App y conectividad",
    question: "¿El cargador tiene conectividad Wi-Fi?",
    answer: [
      {
        type: "p",
        text: "Sí. Ambos modelos incorporan Wi-Fi para configuración y monitoreo mediante la aplicación Smart Life / Tuya.",
      },
    ],
  },
  {
    id: "que-hace-la-app",
    category: "App y conectividad",
    question: "¿Qué puedo hacer desde la app Smart Life / Tuya?",
    answer: [
      { type: "p", text: "Desde la app podés:" },
      {
        type: "list",
        items: [
          "Monitorear el estado del cargador",
          "Visualizar la carga",
          "Gestionar funciones del equipo",
          "Controlar el cargador desde el celular",
        ],
      },
    ],
  },

  // --------------------------------------------------- Instalación y garantía
  {
    id: "interior-exterior",
    category: "Instalación y garantía",
    question: "¿Se puede instalar en interior o exterior?",
    answer: [
      {
        type: "p",
        text: "Sí. El equipo está preparado para uso interior o exterior, con grado de protección IP65, lo que lo hace apto para ambientes exigentes.",
      },
    ],
  },
  {
    id: "quien-instala",
    category: "Instalación y garantía",
    question: "¿Quién realiza la instalación?",
    answer: [
      {
        type: "p",
        text: "La instalación debe ser realizada por instaladores capacitados y aprobados, siguiendo los criterios técnicos y de seguridad definidos por Kinergia.",
      },
    ],
  },
  {
    id: "que-necesito",
    category: "Instalación y garantía",
    question: "¿Qué necesito para instalarlo?",
    answer: [
      { type: "p", text: "En general, se requiere:" },
      {
        type: "list",
        items: [
          "Una alimentación eléctrica adecuada",
          "Protecciones eléctricas correspondientes",
          "Puesta a tierra en condiciones",
          "Espacio de montaje apropiado",
          "Cobertura Wi-Fi si se desea usar la app",
        ],
      },
    ],
  },
  {
    id: "donde-instalarlo",
    category: "Instalación y garantía",
    question: "¿Dónde conviene instalarlo?",
    answer: [
      {
        type: "p",
        text: "Lo ideal es montarlo cerca del lugar habitual de estacionamiento del vehículo, a una altura cómoda de uso y en una ubicación que facilite el enrollado del cable y la conexión diaria.",
      },
    ],
  },
  {
    id: "garantia",
    category: "Instalación y garantía",
    question: "¿Qué garantía tiene?",
    answer: [
      {
        type: "p",
        text: "EV-KIN cuenta con 2 años de garantía, válida para equipos instalados por instaladores aprobados.",
      },
    ],
  },

  // -------------------------------------------------- Seguridad y resistencia
  {
    id: "protecciones",
    category: "Seguridad y resistencia",
    question: "¿Qué nivel de protección eléctrica incorpora?",
    answer: [
      { type: "p", text: "El equipo incorpora características de seguridad avanzadas, entre ellas:" },
      {
        type: "list",
        items: [
          "Protección diferencial Tipo A + 6 mA DC",
          "Protección contra choque eléctrico",
          "Protección al impacto IK10",
          "Diseño robusto y seguro para uso cotidiano",
        ],
      },
    ],
  },
  {
    id: "material-cable",
    category: "Seguridad y resistencia",
    question: "¿Qué material tiene el cable?",
    answer: [
      {
        type: "p",
        text: "El cable está fabricado en TPU, un material de alta resistencia y buena flexibilidad para uso intensivo.",
      },
    ],
  },
  {
    id: "temperatura",
    category: "Seguridad y resistencia",
    question: "¿Cuál es el rango de temperatura de trabajo?",
    answer: [
      {
        type: "p",
        text: "El equipo puede operar entre -25 °C y +55 °C, lo que lo hace apto para distintas condiciones ambientales.",
      },
    ],
  },
];
