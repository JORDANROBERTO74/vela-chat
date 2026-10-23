import type { Dictionary, SeedChat } from "./en";

const chats: SeedChat[] = [
  {
    id: "spring-launch",
    title: "Brief de campaña de primavera",
    messages: [
      {
        id: "spring-launch-1",
        role: "user",
        text: "Ayúdame a armar el brief de lanzamiento de la campaña de primavera. Tenemos tres semanas y poco presupuesto.",
      },
      {
        id: "spring-launch-2",
        role: "assistant",
        text: "Tres semanas alcanzan si mantenemos el alcance acotado. Armaría el brief alrededor de una promesa, una audiencia y un canal.\n\n1. Promesa: la única frase que el cliente debería recordar.\n2. Audiencia: el grupo con más probabilidad de actuar en la primera semana.\n3. Canal: el único lugar donde podemos aparecer con constancia durante tres semanas.\n\nEscribe esas tres líneas y las convierto en un brief de una página.",
      },
    ],
  },
  {
    id: "design-review",
    title: "Notas de la revisión de diseño",
    messages: [
      {
        id: "design-review-1",
        role: "user",
        text: "Convierte mis notas sueltas en un resumen corto para enviar al equipo.",
      },
      {
        id: "design-review-2",
        role: "assistant",
        text: "Una versión compacta:\n\n• La nueva navegación funcionó bien, pero las etiquetas necesitan otra pasada.\n• Dos flujos siguen perdiendo gente en la confirmación.\n• El equipo acordó congelar lo visual el viernes y corregir textos la semana que viene.\n\n¿Lo quieres más corto para chat o un poco más formal para correo?",
      },
    ],
  },
  {
    id: "reading-list",
    title: "Lecturas de fin de semana",
    messages: [
      {
        id: "reading-list-1",
        role: "user",
        text: "Sugiere una lista corta de lecturas sobre tecnología tranquila.",
      },
      {
        id: "reading-list-2",
        role: "assistant",
        text: "Tres direcciones más que tres títulos:\n\n1. La ética de la atención: por qué los productos compiten por el foco y cómo sería un default más calmo.\n2. El oficio de las interfaces lentas: movimiento, ritmo y silencio como materiales de diseño.\n3. Un cierre de ficción: algo largo y absorbente que no tenga nada que ver con el trabajo.\n\nDime qué dirección te interesa y te sugiero piezas concretas.",
      },
    ],
  },
  {
    id: "pricing-rewrite",
    title: "Reescritura de la página de precios",
    messages: [
      {
        id: "pricing-rewrite-1",
        role: "user",
        text: "Reescribe la introducción de precios para que suene humana, no corporativa.",
      },
      {
        id: "pricing-rewrite-2",
        role: "assistant",
        text: "Prueba empezar por la decisión, no por la lista de funciones:\n\n«Elige el plan que coincida con la frecuencia con la que vas a usar Vela. Puedes cambiarlo después; nada queda bloqueado».\n\nLuego haz que cada tarjeta responda una pregunta: para quién es, qué incluye y cuándo conviene subir de plan. Deja la letra pequeña debajo.",
      },
    ],
  },
  {
    id: "onboarding-emails",
    title: "Secuencia de correos de bienvenida",
    messages: [
      {
        id: "onboarding-emails-1",
        role: "user",
        text: "Esboza una secuencia de cinco correos de onboarding para un usuario nuevo.",
      },
      {
        id: "onboarding-emails-2",
        role: "assistant",
        text: "Cinco correos, cada uno con un solo trabajo:\n\n1. Bienvenida: confirmar la elección y fijar expectativas.\n2. Primera victoria: una acción pequeña con un resultado visible.\n3. Hábito: mostrar el caso de uso semanal.\n4. Duda: responder el motivo más común por el que la gente abandona.\n5. Invitación: pedir feedback o proponer un upgrade, no ambas cosas.\n\nEnvíalos los días 0, 1, 3, 7 y 14.",
      },
    ],
  },
  {
    id: "quiet-research",
    title: "Plan de investigación: software tranquilo",
    messages: [
      {
        id: "quiet-research-1",
        role: "user",
        text: "Redacta un plan breve de investigación sobre software tranquilo.",
      },
      {
        id: "quiet-research-2",
        role: "assistant",
        text: "Un estudio pequeño también puede ser útil:\n\n• Pregunta: ¿qué hace que una interfaz se sienta calma sin sentirse vacía?\n• Método: cinco entrevistas de 30 minutos y un diario de una semana.\n• Artefacto: una matriz de una página sobre fricción, ritmo e interrupción.\n\nRecluta a personas que ya usen modos de concentración y pregúntales cuándo apagan las notificaciones.",
      },
    ],
  },
];

export const es: Dictionary = {
  meta: {
    title: "Vela — Un lugar más tranquilo para pensar",
    description:
      "Un espacio de chat sereno y bilingüe para dar forma a ideas, resúmenes y planes. Una demo de front-end con respuestas simuladas.",
  },
  common: {
    brand: "Vela",
    tagline: "Un lugar más tranquilo para pensar",
    skip: "Saltar al chat",
    close: "Cerrar menú",
    language: "Idioma",
    demo: "Demo",
  },
  sidebar: {
    newChat: "Nuevo chat",
    searchLabel: "Buscar conversaciones",
    searchPlaceholder: "Buscar",
    recent: "Recientes",
    noResults: "No se encontraron conversaciones.",
    reset: "Reiniciar demo",
    resetQuestion: "¿Borrar todos los chats locales?",
    resetConfirm: "Reiniciar",
    cancel: "Cancelar",
    collapse: "Contraer barra lateral",
    expand: "Expandir barra lateral",
  },
  topbar: {
    openMenu: "Abrir menú",
    rename: "Renombrar conversación",
    renameLabel: "Título de la conversación",
    save: "Guardar",
    cancel: "Cancelar",
    messages: {
      one: "{count} mensaje",
      other: "{count} mensajes",
    },
    user: {
      name: "Alex Rivera",
      initials: "AR",
    },
  },
  thread: {
    assistant: "Vela",
    you: "Tú",
    typing: "Vela está escribiendo",
    messageFrom: "Mensaje de {name}",
  },
  empty: {
    title: "¿En qué estamos pensando?",
    subtitle: "Un lugar más tranquilo para dar forma a una idea, un resumen o un plan.",
    suggestions: {
      summarize: {
        label: "Resumir un documento",
        prompt: "Resume los puntos clave de este documento:",
      },
      brainstorm: {
        label: "Idear opciones",
        prompt: "Ayúdame a idear opciones para",
      },
      plan: {
        label: "Armar un plan",
        prompt: "Crea un plan paso a paso para",
      },
    },
  },
  composer: {
    placeholder: "Pregunta lo que quieras…",
    send: "Enviar mensaje",
    hint: "Enter para enviar · Shift + Enter para salto de línea",
    disclaimer: "Demo · las respuestas son simuladas y quedan en tu navegador.",
    model: "Modelo",
    models: {
      balanced: "Equilibrado",
      fast: "Rápido",
    },
  },
  replies: {
    summarize:
      "Aquí tienes un resumen compacto para reutilizar:\n\n• El objetivo es claro y el alcance es lo bastante pequeño para terminarlo.\n• Dos dependencias necesitan un responsable antes de empezar.\n• El próximo checkpoint es una revisión corta, no un lanzamiento completo.\n\n¿Lo quieres en un solo párrafo en lugar de viñetas?",
    brainstorm:
      "Algunas direcciones que vale la pena explorar:\n\n1. Empieza por la versión más pequeña que todavía se sienta completa.\n2. Toma un formato de otro campo y adáptalo.\n3. Pregúntate qué recortarías si tuvieras la mitad del tiempo.\n\nElige una y la convierto en un esquema corto.",
    plan:
      "Un plan simple para empezar:\n\n1. Escribe el resultado en una frase.\n2. Enumera los tres pasos que lo hacen visible.\n3. Pon el primer paso en el calendario esta semana.\n\nDime la fecha límite y ajusto la secuencia.",
    generic:
      "Vamos a lo concreto. Escribe el objetivo en una frase, di para quién es y elige la restricción que más importa. Con eso puedo ayudarte a esbozar un esquema, un resumen o un plan.",
  },
  chats,
};
