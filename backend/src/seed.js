'use strict';

const { createStrapi } = require('@strapi/strapi');

const categoriasData = [
  { nombre: 'Noticias', descripcion: 'Últimas noticias y actualizaciones del sector eléctrico', color: '#007bff', icono: 'newspaper' },
  { nombre: 'Salud y Bienestar', descripcion: 'Consejos y recursos para la salud de los jubilados', color: '#28a745', icono: 'heart' },
  { nombre: 'Historia CFE', descripcion: 'Recuerdos y hechos históricos de la Comisión Federal de Electricidad', color: '#ffc107', icono: 'book' },
  { nombre: 'Eventos', descripcion: 'Eventos y actividades para la comunidad de jubilados', color: '#dc3545', icono: 'calendar' },
  { nombre: 'Beneficios', descripcion: 'Información sobre beneficios y servicios para jubilados', color: '#6f42c1', icono: 'gift' }
];

const autoresData = [
  { nombre: 'María González', biografia: 'Periodista especializada en temas de energía y jubilados.', cargo: 'Editora Jefe' },
  { nombre: 'Carlos Ramírez', biografia: 'Ingeniero eléctrico retirado con más de 30 años en CFE.', cargo: 'Colaborador' },
  { nombre: 'Ana López', biografia: 'Especialista en bienestar social para adultos mayores.', cargo: 'Consultora' }
];

const articulosData = [
  {
    titulo: 'Bienvenida al Portal Nacional de Jubilados CFE',
    resumen: 'Descubre el nuevo espacio digital dedicado a los jubilados de la Comisión Federal de Electricidad.',
    contenido: 'El Portal Nacional de Jubilados CFE es una iniciativa para mantener conectada a nuestra comunidad de jubilados. Aquí encontrarás noticias, recursos y actividades diseñadas especialmente para ti.',
    destacado: true,
    fecha_publicacion: '2024-01-15',
    tiempo_lectura: 5,
    seo_title: 'Bienvenida al Portal Jubilados CFE',
    seo_description: 'Nuevo portal digital para jubilados de CFE con noticias y recursos.'
  },
  {
    titulo: 'La experiencia de quienes construyeron la energía de México',
    resumen: 'Historias y testimonios de los pioneros que dieron forma a la CFE.',
    contenido: 'Desde sus inicios, la Comisión Federal de Electricidad ha sido el motor de desarrollo energético de México. Nuestros jubilados son testigos de esta transformación.',
    destacado: true,
    fecha_publicacion: '2024-02-01',
    tiempo_lectura: 8,
    seo_title: 'Historia de CFE - Testimonios de jubilados',
    seo_description: 'Relatos de los ingenieros que construyeron la energía nacional.'
  },
  {
    titulo: 'Salud digital para adultos mayores',
    resumen: 'Cómo aprovechar la tecnología para mantener una vida saludable.',
    contenido: 'En la era digital, los adultos mayores pueden beneficiarse de aplicaciones y dispositivos que promueven la salud y el bienestar.',
    destacado: false,
    fecha_publicacion: '2024-02-15',
    tiempo_lectura: 6,
    seo_title: 'Salud digital para jubilados',
    seo_description: 'Tecnología y salud para adultos mayores.'
  },
  {
    titulo: 'Memoria histórica de la Comisión Federal de Electricidad',
    resumen: 'Un recorrido por los hitos que marcaron la historia de CFE.',
    contenido: 'Desde la nacionalización de la industria eléctrica hasta los proyectos modernos, CFE ha sido protagonista del desarrollo mexicano.',
    destacado: true,
    fecha_publicacion: '2024-03-01',
    tiempo_lectura: 10,
    seo_title: 'Historia CFE - Memoria histórica',
    seo_description: 'Hitos y acontecimientos de la Comisión Federal de Electricidad.'
  },
  {
    titulo: 'Nuevas formas de comunicación para jubilados',
    resumen: 'Descubre herramientas digitales para mantener el contacto con familiares y amigos.',
    contenido: 'La tecnología facilita la comunicación. Aprende a usar videollamadas, redes sociales y aplicaciones de mensajería.',
    destacado: false,
    fecha_publicacion: '2024-03-15',
    tiempo_lectura: 7,
    seo_title: 'Comunicación digital para jubilados',
    seo_description: 'Herramientas para mantenerse conectado.'
  },
  {
    titulo: 'Beneficios exclusivos para jubilados CFE',
    resumen: 'Conoce los servicios y descuentos disponibles para nuestros jubilados.',
    contenido: 'Como jubilado de CFE, tienes acceso a una variedad de beneficios, incluyendo descuentos en servicios médicos y recreativos.',
    destacado: false,
    fecha_publicacion: '2024-04-01',
    tiempo_lectura: 5,
    seo_title: 'Beneficios para jubilados CFE',
    seo_description: 'Servicios y descuentos exclusivos.'
  },
  {
    titulo: 'Actividades recreativas para jubilados',
    resumen: 'Participa en eventos y talleres diseñados para el disfrute y aprendizaje.',
    contenido: 'El portal ofrece una agenda de actividades recreativas, desde talleres de arte hasta clases de tecnología.',
    destacado: false,
    fecha_publicacion: '2024-04-15',
    tiempo_lectura: 6,
    seo_title: 'Actividades para jubilados CFE',
    seo_description: 'Eventos y talleres recreativos.'
  },
  {
    titulo: 'Consejos para una jubilación activa',
    resumen: 'Ideas para mantener una vida plena y productiva después de la jubilación.',
    contenido: 'La jubilación es una nueva etapa llena de oportunidades. Mantén la mente activa y el cuerpo saludable.',
    destacado: false,
    fecha_publicacion: '2024-05-01',
    tiempo_lectura: 8,
    seo_title: 'Jubilación activa - Consejos',
    seo_description: 'Cómo vivir una jubilación plena.'
  }
];

const eventosData = [
  {
    titulo: 'Reunión Anual de Jubilados CFE',
    descripcion: 'Encuentro para compartir experiencias y celebrar logros.',
    fecha: '2024-06-15',
    ubicacion: 'Auditorio CFE, Ciudad de México'
  },
  {
    titulo: 'Taller de Salud Digital',
    descripcion: 'Aprende a usar dispositivos tecnológicos para monitorear tu salud.',
    fecha: '2024-07-20',
    ubicacion: 'Centro Comunitario CFE, Guadalajara'
  },
  {
    titulo: 'Conferencia sobre Historia de CFE',
    descripcion: 'Charla con expertos sobre la evolución de la industria eléctrica.',
    fecha: '2024-08-10',
    ubicacion: 'Museo CFE, Monterrey'
  }
];

const documentosData = [
  {
    titulo: 'Guía de Beneficios para Jubilados',
    descripcion: 'Documento completo con todos los beneficios disponibles.'
  },
  {
    titulo: 'Manual de Salud y Bienestar',
    descripcion: 'Consejos prácticos para mantener una vida saludable.'
  },
  {
    titulo: 'Historia Ilustrada de CFE',
    descripcion: 'Libro digital con la historia de la Comisión Federal de Electricidad.'
  }
];

async function seed(strapiInstance) {
  console.log('Iniciando seed de datos...');

  // Crear categorías
  const categorias = [];
  for (const cat of categoriasData) {
    const categoria = await strapiInstance.entityService.create('api::categoria.categoria', {
      data: {
        ...cat,
        publishedAt: new Date()
      }
    });
    categorias.push(categoria);
    console.log(`Categoría creada: ${categoria.nombre}`);
  }

  // Crear autores
  const autores = [];
  for (const aut of autoresData) {
    const autor = await strapiInstance.entityService.create('api::autor.autor', {
      data: {
        ...aut,
        publishedAt: new Date()
      }
    });
    autores.push(autor);
    console.log(`Autor creado: ${autor.nombre}`);
  }

  // Crear artículos
  for (const art of articulosData) {
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
    const autor = autores[Math.floor(Math.random() * autores.length)];
    const articulo = await strapiInstance.entityService.create('api::articulo.articulo', {
      data: {
        ...art,
        categoria: categoria.id,
        autor: autor.id,
        publishedAt: new Date()
      }
    });
    console.log(`Artículo creado: ${articulo.titulo}`);
  }

  // Crear eventos
  for (const evt of eventosData) {
    const evento = await strapiInstance.entityService.create('api::evento.evento', {
      data: {
        ...evt,
        publishedAt: new Date()
      }
    });
    console.log(`Evento creado: ${evento.titulo}`);
  }

  // Crear documentos
  for (const doc of documentosData) {
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];
    const documento = await strapiInstance.entityService.create('api::documento.documento', {
      data: {
        ...doc,
        categoria: categoria.id,
        publishedAt: new Date()
      }
    });
    console.log(`Documento creado: ${documento.titulo}`);
  }

  console.log('Seed completado exitosamente.');
}

async function main() {
  const app = createStrapi();
  await app.load();
  await seed(app);
  await app.destroy();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = seed;