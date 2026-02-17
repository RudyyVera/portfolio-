// Sistema de traducción para el portafolio

const translations = {
  es: {
    // Navegación
    nav_inicio: "Inicio",
    nav_proyectos: "Proyectos",
    nav_experiencia: "Experiencia",
    nav_sobre: "Sobre Mí",
    nav_tech: "Tecnologías",
    nav_contacto: "Contacto",
    
    // Hero
    hero_greeting: "Hola, soy",
    hero_subtitle: "Desarrollador Web & Creador de Experiencias Digitales",
    
    // Proyectos
    projects_title: "Proyectos Destacados",
    projects_subtitle: "Explora mis últimos trabajos en desarrollo web",
    project1_title: "RudIBot",
    project1_desc: "Chatbot inteligente con reconocimiento de voz y respuestas en tiempo real usando IA avanzada.",
    project2_title: "E-commerce",
    project2_desc: "Estoy trabajando en algo increíble. Mantente atento para ver más detalles pronto.",
    btn_demo: "Abrir Demo",
    btn_github: "GitHub",
    btn_dev: "En Desarrollo",
    coming_soon: "Coming Soon",
    
    // Experiencia
    exp_title: "Experiencia",
    exp_subtitle: "Lo que he construido hasta ahora",
    exp1_role: "Full Stack Developer",
    exp1_company: "Proyecto personal / Freelance",
    exp1_desc: "Construí un asistente IA (RudIBot) con stack Node.js + OpenAI, UI reactiva y despliegue en Vercel.",
    exp2_role: "WordPress | Prácticas Centro Cómputo SAC (3 meses, 2025)",
    exp2_company: "WooCommerce personalizado para ventas tech",
    exp2_desc: "Desarrollé tienda online con WooCommerce y código personalizado para ventas de tecnología.",
    exp3_role: "Prácticas UNI (Universidad Nacional de Ingeniería) (3 meses, 2024)",
    exp3_company: "Angular + Laravel para sistema de credenciales",
    exp3_desc: "Creación de sistema interno de credenciales para administración de estudiantes usando Angular y Laravel.",
    
    // Sobre mí
    about_title: "Sobre Mí",
    about_p1: "Soy un desarrollador web apasionado por crear experiencias digitales innovadoras y funcionales. Con experiencia en JavaScript, React, Node.js y Three.js, me especializo en construir aplicaciones web modernas que combinan diseño atractivo con funcionalidad robusta.",
    about_p2: "Mi enfoque se centra en escribir código limpio, escalable y mantenible, siempre pensando en la experiencia del usuario y el rendimiento de la aplicación. Me encanta aprender nuevas tecnologías y desafiarme con proyectos ambiciosos.",
    about_p3: "Cuando no estoy programando, disfruto contribuyendo a proyectos open source, leyendo sobre tendencias tech y buscando formas creativas de resolver problemas.",
    about_stat1: "Proyectos completados",
    about_stat2: "Clientes satisfechos",
    about_stat3: "Años de experiencia",
    
    // Tecnologías
    tech_title: "Tecnologías",
    tech_subtitle: "Stack de desarrollo con el que trabajo",
    
    // Contacto
    contact_title: "Trabajemos Juntos",
    contact_text: "¿Tienes un proyecto en mente? Conversemos sobre cómo puedo ayudarte.",
    
    // Footer
    footer_text: "Desarrollador Web apasionado por crear experiencias digitales innovadoras.",
    footer_nav: "Navegación",
    footer_follow: "Sígueme",
    footer_rights: "Todos los derechos reservados.",
    
    // Chat
    chat_title: "RudIBot",
    chat_placeholder: "Escribe un mensaje...",
    chat_send: "Enviar",
    chat_greeting: "Hola, soy RudIBot. ¿En qué te ayudo?",
    chat_responding: "respondiendo..."
  },
  
  en: {
    // Navigation
    nav_inicio: "Home",
    nav_proyectos: "Projects",
    nav_experiencia: "Experience",
    nav_sobre: "About Me",
    nav_tech: "Technologies",
    nav_contacto: "Contact",
    
    // Hero
    hero_greeting: "Hi, I'm",
    hero_subtitle: "Web Developer & Digital Experiences Creator",
    
    // Projects
    projects_title: "Featured Projects",
    projects_subtitle: "Explore my latest web development work",
    project1_title: "RudIBot",
    project1_desc: "Intelligent chatbot with voice recognition and real-time AI-powered responses.",
    project2_title: "E-commerce",
    project2_desc: "I'm working on something amazing. Stay tuned for more details soon.",
    btn_demo: "Open Demo",
    btn_github: "GitHub",
    btn_dev: "In Development",
    coming_soon: "Coming Soon",
    
    // Experience
    exp_title: "Experience",
    exp_subtitle: "What I've built so far",
    exp1_role: "Full Stack Developer",
    exp1_company: "Personal Project / Freelance",
    exp1_desc: "Built an AI assistant (RudIBot) with Node.js + OpenAI stack, reactive UI and Vercel deployment.",
    exp2_role: "React.js Developer",
    exp2_company: "Starbucks (demo)",
    exp2_desc: "Responsive, accessible UI with advanced patterns; REST integrations and performance improvements.",
    exp3_role: "React Native Developer",
    exp3_company: "Tesla (demo)",
    exp3_desc: "Smooth animations, optimized mobile layouts and API consumption for real-time features.",
    
    // About
    about_title: "About Me",
    about_p1: "I'm a web developer passionate about creating innovative and functional digital experiences. With experience in JavaScript, React, Node.js and Three.js, I specialize in building modern web applications that combine attractive design with robust functionality.",
    about_p2: "My focus is on writing clean, scalable and maintainable code, always thinking about user experience and application performance. I love learning new technologies and challenging myself with ambitious projects.",
    about_p3: "When I'm not coding, I enjoy contributing to open source projects, reading about tech trends and finding creative ways to solve problems.",
    about_stat1: "Completed Projects",
    about_stat2: "Satisfied Clients",
    about_stat3: "Years of Experience",
    
    // Technologies
    tech_title: "Technologies",
    tech_subtitle: "Development stack I work with",
    
    // Contact
    contact_title: "Let's Work Together",
    contact_text: "Do you have a project in mind? Let's talk about how I can help you.",
    
    // Footer
    footer_text: "Web Developer passionate about creating innovative digital experiences.",
    footer_nav: "Navigation",
    footer_follow: "Follow Me",
    footer_rights: "All rights reserved.",
    
    // Chat
    chat_title: "RudIBot",
    chat_placeholder: "Type a message...",
    chat_send: "Send",
    chat_greeting: "Hi, I'm RudIBot. How can I help you?",
    chat_responding: "responding..."
  }
};

// Función para cambiar idioma
function changeLanguage(lang) {
  const t = translations[lang];
  if (!t) return;
  
  // Navegación
  document.querySelector('a[href="#inicio"]').textContent = t.nav_inicio;
  document.querySelector('a[href="#proyectos"]').textContent = t.nav_proyectos;
  document.querySelector('a[href="#experiencia"]').textContent = t.nav_experiencia;
  document.querySelector('a[href="#sobre-mi"]').textContent = t.nav_sobre;
  document.querySelector('a[href="#skills"]').textContent = t.nav_tech;
  document.querySelector('a[href="#contacto"]').textContent = t.nav_contacto;
  
  // Hero
  const heroH1 = document.querySelector('.hero-text h1');
  if (heroH1) {
    const name = heroH1.querySelector('.gradient-text').textContent;
    heroH1.innerHTML = `${t.hero_greeting} <span class="gradient-text">${name}</span>`;
  }
  document.querySelector('.hero-subtitle').textContent = t.hero_subtitle;
  
  // Proyectos
  document.querySelector('#proyectos .section-title').textContent = t.projects_title;
  document.querySelector('#proyectos .section-description').textContent = t.projects_subtitle;
  
  const projects = document.querySelectorAll('.project-bento-card');
  if (projects[0]) {
    projects[0].querySelector('.project-content h3').textContent = t.project1_title;
    projects[0].querySelector('.project-content p').textContent = t.project1_desc;
    projects[0].querySelector('.demo span').textContent = t.btn_demo;
    projects[0].querySelector('.github span').textContent = t.btn_github;
  }
  if (projects[1]) {
    projects[1].querySelector('.project-content h3').textContent = t.project2_title;
    projects[1].querySelector('.project-content p').textContent = t.project2_desc;
    const disabledBtn = projects[1].querySelector('.disabled span');
    if (disabledBtn) disabledBtn.textContent = t.btn_dev;
  }
  
  const comingSoon = document.querySelector('.coming-content span');
  if (comingSoon) comingSoon.textContent = t.coming_soon;
  
  // Experiencia
  document.querySelector('#experiencia .section-title').textContent = t.exp_title;
  document.querySelector('#experiencia .section-subtitle').textContent = t.exp_subtitle;
  
  const expItems = document.querySelectorAll('.exp-card');
  if (expItems[0]) {
    expItems[0].querySelector('h3').textContent = t.exp1_role;
    expItems[0].querySelector('.exp-company').textContent = t.exp1_company;
    expItems[0].querySelector('.exp-desc').textContent = t.exp1_desc;
  }
  if (expItems[1]) {
    expItems[1].querySelector('h3').textContent = t.exp2_role;
    expItems[1].querySelector('.exp-company').textContent = t.exp2_company;
    expItems[1].querySelector('.exp-desc').textContent = t.exp2_desc;
  }
  if (expItems[2]) {
    expItems[2].querySelector('h3').textContent = t.exp3_role;
    expItems[2].querySelector('.exp-company').textContent = t.exp3_company;
    expItems[2].querySelector('.exp-desc').textContent = t.exp3_desc;
  }
  
  // Sobre mí
  document.querySelector('#sobre-mi .section-title').textContent = t.about_title;
  const aboutPs = document.querySelectorAll('.about-text p');
  if (aboutPs[0]) aboutPs[0].textContent = t.about_p1;
  if (aboutPs[1]) aboutPs[1].textContent = t.about_p2;
  if (aboutPs[2]) aboutPs[2].textContent = t.about_p3;
  
  const stats = document.querySelectorAll('.stat-box p');
  if (stats[0]) stats[0].textContent = t.about_stat1;
  if (stats[1]) stats[1].textContent = t.about_stat2;
  if (stats[2]) stats[2].textContent = t.about_stat3;
  
  // Tecnologías
  document.querySelector('#skills .section-title').textContent = t.tech_title;
  document.querySelector('#skills .section-subtitle').textContent = t.tech_subtitle;
  
  // Contacto
  document.querySelector('#contacto .section-title').textContent = t.contact_title;
  document.querySelector('.contacto-text').textContent = t.contact_text;
  
  // Footer
  document.querySelector('.footer-text').textContent = t.footer_text;
  const footerHeaders = document.querySelectorAll('.footer-links h4, .footer-social h4');
  if (footerHeaders[0]) footerHeaders[0].textContent = t.footer_nav;
  if (footerHeaders[1]) footerHeaders[1].textContent = t.footer_follow;
  
  const footerLinks = document.querySelectorAll('.footer-links a');
  if (footerLinks[0]) footerLinks[0].textContent = t.nav_inicio;
  if (footerLinks[1]) footerLinks[1].textContent = t.nav_proyectos;
  if (footerLinks[2]) footerLinks[2].textContent = t.nav_tech;
  if (footerLinks[3]) footerLinks[3].textContent = t.nav_contacto;
  
  const footerBottom = document.querySelector('.footer-bottom p');
  if (footerBottom) {
    footerBottom.innerHTML = `&copy; 2026 Rudy Vera. ${t.footer_rights}`;
  }
  
  // Chat
  document.querySelector('.chat-header h2').textContent = t.chat_title;
  document.querySelector('#texto').placeholder = t.chat_placeholder;
  document.querySelector('#btn').textContent = t.chat_send;
  
  // Guardar preferencia
  localStorage.setItem('lang', lang);
}

// Inicializar idioma
function initLanguage() {
  const langSelector = document.getElementById('lang-selector');
  const savedLang = localStorage.getItem('lang') || 'es';
  
  langSelector.value = savedLang;
  changeLanguage(savedLang);
  
  langSelector.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
