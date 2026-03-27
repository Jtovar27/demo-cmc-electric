import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@cmcelectric.com" },
    update: {},
    create: {
      email: "admin@cmcelectric.com",
      name: "CMC Admin",
      password: adminPassword,
      role: "admin",
    },
  });

  // Create student user
  const studentPassword = await bcrypt.hash("student123", 12);
  const student = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      email: "student@example.com",
      name: "Carlos Rivera",
      password: studentPassword,
      role: "student",
    },
  });

  // Create courses
  const course1 = await prisma.course.upsert({
    where: { slug: "principios-circuitos-electricos" },
    update: {},
    create: {
      title: "Electrical Circuit Principles",
      titleEs: "Principios de Circuitos Electricos",
      slug: "principios-circuitos-electricos",
      description: "Master the fundamentals of electrical circuits, from basic Ohm's Law to complex circuit analysis.",
      descriptionEs: "Domina los fundamentos de los circuitos electricos, desde la Ley de Ohm basica hasta el analisis de circuitos complejos.",
      longDesc: "This comprehensive course covers all essential principles of electrical circuits required to succeed in the Journeyman exam. You will learn how to analyze series and parallel circuits, calculate voltage, current, and resistance, and understand power distribution systems.",
      longDescEs: "Este curso completo cubre todos los principios esenciales de los circuitos electricos necesarios para el examen Journeyman. Aprenderás a analizar circuitos en serie y paralelo, calcular voltaje, corriente y resistencia.",
      coverImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80",
      price: 299,
      level: "beginner",
      duration: "40 hours",
      instructor: "CMC Electric Team",
      status: "published",
      featured: true,
      order: 1,
    },
  });

  const course2 = await prisma.course.upsert({
    where: { slug: "instalaciones-electricas-avanzadas" },
    update: {},
    create: {
      title: "Advanced Electrical Installations",
      titleEs: "Instalaciones Electricas Avanzadas",
      slug: "instalaciones-electricas-avanzadas",
      description: "Learn professional installation techniques including 3-way, 4-way switches, GFCI, and fault location equipment.",
      descriptionEs: "Aprende tecnicas de instalacion profesional incluyendo interruptores 3-way, 4-way, GFCI y equipos de localizacion de fallas.",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
      price: 399,
      level: "intermediate",
      duration: "60 hours",
      instructor: "CMC Electric Team",
      status: "published",
      featured: true,
      order: 2,
    },
  });

  const course3 = await prisma.course.upsert({
    where: { slug: "doblado-conductos-profesional" },
    update: {},
    create: {
      title: "Professional Conduit Bending",
      titleEs: "Doblado de Conductos Profesional",
      slug: "doblado-conductos-profesional",
      description: "Master conduit bending techniques: 90-degree, offset 3-point, 4-point, and saddle bends.",
      descriptionEs: "Domina las tecnicas de doblado de conductos: 90 grados, offset 3-point, 4-point y doblados saddle.",
      coverImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80",
      price: 249,
      level: "intermediate",
      duration: "30 hours",
      instructor: "CMC Electric Team",
      status: "published",
      featured: false,
      order: 3,
    },
  });

  const course4 = await prisma.course.upsert({
    where: { slug: "preparacion-examen-journeyman" },
    update: {},
    create: {
      title: "Journeyman Electrician Exam Prep",
      titleEs: "Preparacion Examen Journeyman",
      slug: "preparacion-examen-journeyman",
      description: "Complete preparation for the Journeyman Electrician exam with practice tests, code reviews, and expert guidance.",
      descriptionEs: "Preparacion completa para el examen de electricista Journeyman con pruebas de practica, revision de codigos y guia experta.",
      coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
      price: 499,
      level: "advanced",
      duration: "80 hours",
      instructor: "CMC Electric Team",
      status: "published",
      featured: true,
      order: 4,
    },
  });

  // Create modules for course1
  const module1 = await prisma.module.upsert({
    where: { id: "module-1-1" },
    update: {},
    create: {
      id: "module-1-1",
      title: "Introduction to Electrical Theory",
      titleEs: "Introduccion a la Teoria Electrica",
      description: "Foundational concepts every electrician must know",
      descriptionEs: "Conceptos fundamentales que todo electricista debe conocer",
      order: 1,
      courseId: course1.id,
    },
  });

  const module2 = await prisma.module.upsert({
    where: { id: "module-1-2" },
    update: {},
    create: {
      id: "module-1-2",
      title: "Ohm's Law and Power",
      titleEs: "Ley de Ohm y Potencia",
      description: "Understanding voltage, current, resistance, and power",
      descriptionEs: "Comprender voltaje, corriente, resistencia y potencia",
      order: 2,
      courseId: course1.id,
    },
  });

  const module3 = await prisma.module.upsert({
    where: { id: "module-1-3" },
    update: {},
    create: {
      id: "module-1-3",
      title: "Series and Parallel Circuits",
      titleEs: "Circuitos en Serie y Paralelo",
      description: "Circuit analysis techniques for complex systems",
      descriptionEs: "Tecnicas de analisis de circuitos para sistemas complejos",
      order: 3,
      courseId: course1.id,
    },
  });

  // Create lessons for module1
  await prisma.lesson.upsert({
    where: { id: "lesson-1-1-1" },
    update: {},
    create: {
      id: "lesson-1-1-1",
      title: "What is Electricity?",
      titleEs: "Que es la Electricidad?",
      description: "Understanding the basic nature of electrical energy",
      descriptionEs: "Comprender la naturaleza basica de la energia electrica",
      videoUrl: "https://www.youtube.com/embed/mc979OhitAg",
      duration: "18:42",
      order: 1,
      visible: true,
      moduleId: module1.id,
    },
  });

  await prisma.lesson.upsert({
    where: { id: "lesson-1-1-2" },
    update: {},
    create: {
      id: "lesson-1-1-2",
      title: "Conductors and Insulators",
      titleEs: "Conductores y Aislantes",
      description: "Properties of materials that conduct or resist electrical flow",
      descriptionEs: "Propiedades de los materiales que conducen o resisten el flujo electrico",
      videoUrl: "https://www.youtube.com/embed/TvLp5bLtFQ4",
      duration: "22:15",
      order: 2,
      visible: true,
      moduleId: module1.id,
    },
  });

  await prisma.lesson.upsert({
    where: { id: "lesson-1-1-3" },
    update: {},
    create: {
      id: "lesson-1-1-3",
      title: "Safety in Electrical Work",
      titleEs: "Seguridad en Trabajo Electrico",
      description: "Essential safety practices for electrical professionals",
      descriptionEs: "Practicas de seguridad esenciales para profesionales electricos",
      videoUrl: "https://www.youtube.com/embed/RYbn4GkzFBM",
      duration: "25:00",
      order: 3,
      visible: true,
      moduleId: module1.id,
    },
  });

  // Create lessons for module2
  await prisma.lesson.upsert({
    where: { id: "lesson-1-2-1" },
    update: {},
    create: {
      id: "lesson-1-2-1",
      title: "Ohm's Law Fundamentals",
      titleEs: "Fundamentos de la Ley de Ohm",
      description: "V = I x R — mastering the fundamental electrical equation",
      descriptionEs: "V = I x R — dominando la ecuacion electrica fundamental",
      videoUrl: "https://www.youtube.com/embed/HsLLq6Rm5tU",
      duration: "30:00",
      order: 1,
      visible: true,
      moduleId: module2.id,
    },
  });

  await prisma.lesson.upsert({
    where: { id: "lesson-1-2-2" },
    update: {},
    create: {
      id: "lesson-1-2-2",
      title: "Power Calculations",
      titleEs: "Calculos de Potencia",
      description: "Understanding watts, kilowatts, and electrical power",
      descriptionEs: "Comprender vatios, kilovatios y potencia electrica",
      videoUrl: "https://www.youtube.com/embed/VBeA0p4MQ-s",
      duration: "28:30",
      order: 2,
      visible: true,
      moduleId: module2.id,
    },
  });

  // Enroll student in course1
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: course1.id } },
    update: {},
    create: {
      userId: student.id,
      courseId: course1.id,
      status: "active",
    },
  });

  // Create services
  const services = [
    {
      title: "Residential Electrical Installation",
      titleEs: "Instalacion Electrica Residencial",
      description: "Complete electrical installations for homes, including wiring, panels, and fixtures.",
      descriptionEs: "Instalaciones electricas completas para hogares, incluyendo cableado, paneles y accesorios.",
      category: "residential",
      featured: true,
      order: 1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Circuit Breaker Installation",
      titleEs: "Instalacion de Interruptores",
      description: "Professional circuit breaker installation and panel upgrades for your safety.",
      descriptionEs: "Instalacion profesional de interruptores y actualizacion de paneles para tu seguridad.",
      category: "residential",
      featured: true,
      order: 2,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "GFCI Installation & Repair",
      titleEs: "Instalacion y Reparacion de GFCI",
      description: "Code-compliant GFCI outlet installation for kitchens, bathrooms, and outdoor areas.",
      descriptionEs: "Instalacion de salidas GFCI cumpliendo el codigo para cocinas, banos y areas exteriores.",
      category: "residential",
      featured: false,
      order: 3,
      image: "https://images.unsplash.com/photo-1486304873000-235643847519?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Fault Location & Diagnostics",
      titleEs: "Localizacion de Fallas y Diagnostico",
      description: "Advanced fault location using specialized equipment to identify and resolve electrical issues.",
      descriptionEs: "Localizacion avanzada de fallas usando equipos especializados para identificar y resolver problemas electricos.",
      category: "diagnostic",
      featured: true,
      order: 4,
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "3-Way & 4-Way Switch Wiring",
      titleEs: "Cableado de Interruptores 3-Way y 4-Way",
      description: "Expert wiring of multi-location switch circuits for homes and commercial spaces.",
      descriptionEs: "Cableado experto de circuitos de interruptores de multiples ubicaciones para hogares y espacios comerciales.",
      category: "residential",
      featured: false,
      order: 5,
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&auto=format&fit=crop&q=80",
    },
    {
      title: "Electrical Tutoring",
      titleEs: "Tutoria Electrica",
      description: "One-on-one tutoring for students preparing for the Journeyman exam or learning electrical fundamentals.",
      descriptionEs: "Tutoria individual para estudiantes que se preparan para el examen Journeyman o aprenden fundamentos electricos.",
      category: "education",
      featured: true,
      order: 6,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: `service-${service.order}` },
      update: {},
      create: { id: `service-${service.order}`, ...service },
    });
  }

  // Create FAQs
  const faqs = [
    {
      id: "faq-1",
      question: "What programs do you offer?",
      questionEs: "Que programas ofrecen?",
      answer: "We offer comprehensive electrical training programs covering circuit principles, advanced installations, conduit bending, and Journeyman exam preparation. All programs are designed to provide both theoretical knowledge and hands-on practical skills.",
      answerEs: "Ofrecemos programas completos de formacion electrica que cubren principios de circuitos, instalaciones avanzadas, doblado de conductos y preparacion para el examen Journeyman.",
      category: "programs",
      order: 1,
    },
    {
      id: "faq-2",
      question: "Do I need prior experience to enroll?",
      questionEs: "Necesito experiencia previa para inscribirme?",
      answer: "No prior experience is required for our beginner programs. We start from the fundamentals and progress through intermediate and advanced levels. Students with some background can enroll in higher-level programs after an assessment.",
      answerEs: "No se requiere experiencia previa para nuestros programas de nivel principiante. Comenzamos desde los fundamentos y progresamos a traves de niveles intermedios y avanzados.",
      category: "enrollment",
      order: 2,
    },
    {
      id: "faq-3",
      question: "How does the student portal work?",
      questionEs: "Como funciona el portal de estudiantes?",
      answer: "Once enrolled, you receive login credentials to access our private student portal. There you can view your courses, watch video lessons, download study materials, track your progress, and access all resources available for your program.",
      answerEs: "Una vez inscrito, recibes credenciales de acceso al portal privado de estudiantes. Ahi puedes ver tus cursos, ver clases en video, descargar materiales de estudio y seguir tu progreso.",
      category: "portal",
      order: 3,
    },
    {
      id: "faq-4",
      question: "What is the cost of your programs?",
      questionEs: "Cual es el costo de sus programas?",
      answer: "Program costs vary by level and content. Our programs range from $249 for specialized courses to $499 for our comprehensive Journeyman exam preparation program. Payment plans are available. Contact us for current pricing and any available promotions.",
      answerEs: "Los costos de los programas varian segun el nivel y contenido. Nuestros programas van desde $249 para cursos especializados hasta $499 para preparacion completa del examen Journeyman.",
      category: "pricing",
      order: 4,
    },
    {
      id: "faq-5",
      question: "Do you offer electrical services in addition to training?",
      questionEs: "Ofrecen servicios electricos ademas de formacion?",
      answer: "Yes! CMC Electric LLC provides professional electrical services for residential and commercial clients. This includes installations, circuit breaker work, GFCI installation, fault location, and more. Contact us to schedule a service appointment.",
      answerEs: "Si! CMC Electric LLC proporciona servicios electricos profesionales para clientes residenciales y comerciales, incluyendo instalaciones, trabajo con interruptores, instalacion de GFCI y localizacion de fallas.",
      category: "services",
      order: 5,
    },
    {
      id: "faq-6",
      question: "How long does it take to complete a program?",
      questionEs: "Cuanto tiempo lleva completar un programa?",
      answer: "Program duration varies. Our foundational circuit program is approximately 40 hours, advanced installations 60 hours, and the Journeyman prep program is 80 hours. Students can progress at their own pace through the online portal.",
      answerEs: "La duracion del programa varia. Nuestro programa de circuitos basicos dura aproximadamente 40 horas, instalaciones avanzadas 60 horas y el programa de preparacion Journeyman 80 horas.",
      category: "programs",
      order: 6,
    },
    {
      id: "faq-7",
      question: "Is training available in Spanish?",
      questionEs: "La formacion esta disponible en espanol?",
      answer: "Absolutely! All of our programs are available in both English and Spanish. Our instructors are fully bilingual and all course materials, videos, and resources are available in both languages.",
      answerEs: "Absolutamente! Todos nuestros programas estan disponibles en ingles y espanol. Nuestros instructores son totalmente bilingues y todos los materiales, videos y recursos estan disponibles en ambos idiomas.",
      category: "general",
      order: 7,
    },
    {
      id: "faq-8",
      question: "Can I schedule a free consultation?",
      questionEs: "Puedo agendar una consulta gratuita?",
      answer: "Yes! We offer free 30-minute consultations to help you determine which program is right for you. Use our scheduling tool on the website or contact us directly via phone or WhatsApp to book your session.",
      answerEs: "Si! Ofrecemos consultas gratuitas de 30 minutos para ayudarte a determinar que programa es el adecuado para ti. Usa nuestra herramienta de agendamiento en el sitio web o contactanos directamente.",
      category: "general",
      order: 8,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: {},
      create: faq,
    });
  }

  // Create blog posts
  const posts = [
    {
      id: "post-1",
      title: "Understanding the NEC 2023: What Every Electrician Needs to Know",
      titleEs: "Entendiendo el NEC 2023: Lo que Todo Electricista Necesita Saber",
      slug: "understanding-nec-2023",
      excerpt: "A comprehensive overview of the most important changes in the 2023 National Electrical Code and how they affect your work.",
      excerptEs: "Una descripcion completa de los cambios mas importantes en el Codigo Electrico Nacional 2023 y como afectan tu trabajo.",
      content: "The National Electrical Code (NEC) is updated every three years, and the 2023 edition brings several important changes that electricians, contractors, and inspectors need to be aware of. This article covers the key updates and their practical implications for your electrical work...",
      contentEs: "El Codigo Electrico Nacional (NEC) se actualiza cada tres anos, y la edicion 2023 trae varios cambios importantes que los electricistas, contratistas e inspectores necesitan conocer...",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
      category: "industry",
      tags: "NEC,code,regulations,electrician",
      status: "published",
      publishedAt: new Date("2024-01-15"),
    },
    {
      id: "post-2",
      title: "5 Common Mistakes on the Journeyman Exam (And How to Avoid Them)",
      titleEs: "5 Errores Comunes en el Examen Journeyman (Y Como Evitarlos)",
      slug: "journeyman-exam-common-mistakes",
      excerpt: "Learn from the most frequent errors candidates make on the Journeyman electrician exam and how proper preparation can help you pass.",
      excerptEs: "Aprende de los errores mas frecuentes que cometen los candidatos en el examen de electricista Journeyman y como la preparacion adecuada puede ayudarte a aprobar.",
      content: "The Journeyman Electrician exam is one of the most important milestones in an electrician's career. Unfortunately, many candidates don't pass on their first attempt — not because they lack knowledge, but because of avoidable mistakes...",
      contentEs: "El examen de Electricista Journeyman es uno de los hitos mas importantes en la carrera de un electricista. Desafortunadamente, muchos candidatos no aprueban en su primer intento...",
      coverImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
      category: "education",
      tags: "journeyman,exam,tips,preparation",
      status: "published",
      publishedAt: new Date("2024-02-08"),
    },
    {
      id: "post-3",
      title: "Conduit Bending Mastery: From 90-Degree to Complex Offsets",
      titleEs: "Dominio del Doblado de Conductos: De 90 Grados a Offsets Complejos",
      slug: "conduit-bending-mastery",
      excerpt: "A technical deep-dive into professional conduit bending techniques that every skilled electrician must master.",
      excerptEs: "Un analisis tecnico profundo de las tecnicas profesionales de doblado de conductos que todo electricista calificado debe dominar.",
      content: "Conduit bending is one of those skills that separates a good electrician from a great one. It requires a combination of mathematical precision, spatial awareness, and hands-on practice...",
      contentEs: "El doblado de conductos es una de esas habilidades que separa a un buen electricista de uno excelente. Requiere una combinacion de precision matematica, conciencia espacial y practica practica...",
      coverImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80",
      category: "technical",
      tags: "conduit,bending,techniques,installation",
      status: "published",
      publishedAt: new Date("2024-03-01"),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { id: post.id },
      update: {},
      create: post,
    });
  }

  // Create site config
  const configs = [
    { key: "whatsapp", value: "+1-555-000-0000" },
    { key: "calendly_url", value: "https://calendly.com/cmcelectric" },
    { key: "maps_embed", value: "https://maps.google.com/?q=CMC+Electric+LLC+USA" },
    { key: "facebook", value: "https://facebook.com/cmcelectric" },
    { key: "instagram", value: "https://instagram.com/cmcelectric" },
    { key: "email", value: "info@cmcelectric.com" },
    { key: "phone", value: "+1-555-000-0000" },
    { key: "address", value: "USA" },
    { key: "fb_pixel_id", value: "YOUR_PIXEL_ID" },
  ];

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: {},
      create: { ...config, id: `config-${config.key}` },
    });
  }

  console.log("Database seeded successfully");
  return { admin, student };
}
