// Add real file URLs after copying assets to public/proyectos/<slug>/.
const slots = () => ({
  images: [
    "Vista general|Overview",
    "Flujo principal|Main workflow",
    "Detalle de la solución|Solution detail",
  ].map((label) => {
    const [es, en] = label.split("|");
    return { src: "", alt: { es, en }, caption: { es, en } };
  }),
  supporting: [
    {
      href: "",
      title: { es: "Arquitectura", en: "Architecture" },
      description: {
        es: "Componentes, datos e integración.",
        en: "Components, data and integration.",
      },
    },
    {
      href: "",
      title: { es: "Decisiones técnicas", en: "Technical decisions" },
      description: {
        es: "Alternativas y criterios de implementación.",
        en: "Alternatives and implementation criteria.",
      },
    },
    {
      href: "",
      title: { es: "Pruebas y resultados", en: "Tests and results" },
      description: {
        es: "Validación y evidencia del recorrido.",
        en: "Journey validation and evidence.",
      },
    },
  ],
});
export const projectMedia = {
  "chiletedevpath-web": {
    ...slots(),
    capturedAt: "2026-11-27",
    source: "https://chiletedevpath.com/",
    images: [
      {
        src: "/proyectos/chiletedevpath-web/01-portada.jpg",
        width: 1425,
        height: 990,
        source: "https://chiletedevpath.com/",
        alt: {
          es: "Portada publicada de Chilete DevPath con paisaje de Chilete, navegación y accesos a rutas y proyectos.",
          en: "Published Chilete DevPath homepage with the Chilete landscape, navigation and links to learning paths and projects.",
        },
        caption: {
          es: "Identidad y portada de la plataforma",
          en: "Platform identity and homepage",
        },
      },
      {
        src: "/proyectos/chiletedevpath-web/02-rutas-modulos.jpg",
        width: 1425,
        height: 990,
        source: "https://chiletedevpath.com/ruta/#directorio-rutas",
        alt: {
          es: "Directorio de rutas con Desarrollo de software desplegado, disponibilidad de módulos y etapas del recorrido.",
          en: "Learning path directory with Software Development expanded, module availability and learning stages.",
        },
        caption: {
          es: "Rutas y módulos desplegables",
          en: "Learning paths and expandable modules",
        },
      },
      {
        src: "/proyectos/chiletedevpath-web/03-busqueda-recursos.jpg",
        width: 1425,
        height: 990,
        source: "https://chiletedevpath.com/recursos/#catalogo-recursos",
        alt: {
          es: "Biblioteca de recursos con la búsqueda Fundamentos aplicada y tres colecciones encontradas.",
          en: "Resource library with the Fundamentos search applied and three matching collections.",
        },
        caption: {
          es: "Búsqueda y filtros de recursos",
          en: "Resource search and filters",
        },
      },
      {
        src: "/proyectos/chiletedevpath-web/04-modulo-fundamentos.jpg",
        width: 1425,
        height: 990,
        source:
          "https://chiletedevpath.com/ruta/software/fundamentos/#contenido-modulo",
        alt: {
          es: "Contenido del módulo Fundamentos con índice lateral, secuencia temática y enlaces a ejercicios publicados.",
          en: "Fundamentals module content with a sidebar index, learning sequence and links to published exercises.",
        },
        caption: {
          es: "Contenido y ejercicios de un módulo",
          en: "Module content and exercises",
        },
      },
      {
        src: "/proyectos/chiletedevpath-web/05-ingles-tema-claro.jpg",
        width: 1425,
        height: 990,
        source: "https://chiletedevpath.com/en/ruta/software/fundamentos/",
        alt: {
          es: "Módulo Fundamentals en inglés con el tema claro activo, objetivos y navegación traducida.",
          en: "Fundamentals module in English with light theme enabled, learning goals and translated navigation.",
        },
        caption: {
          es: "Versión en inglés y tema claro",
          en: "English version and light theme",
        },
      },
      {
        src: "/proyectos/chiletedevpath-web/06-vista-movil.jpg",
        width: 375,
        height: 811,
        source: "https://chiletedevpath.com/",
        alt: {
          es: "Portada de Chilete DevPath en una pantalla móvil con menú compacto y botones apilados.",
          en: "Chilete DevPath homepage on a mobile screen with compact navigation and stacked buttons.",
        },
        caption: {
          es: "Adaptación de la portada a móvil",
          en: "Homepage adapted to mobile",
        },
      },
    ],
  },
  chisabes: slots(),
  reminexa: slots(),
};
