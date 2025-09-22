import { Locale } from './config'

// Basic dictionaries for route names and common UI elements
const dictionaries = {
  es: {
    // Navigation
    nav: {
      descubre: 'Descubre',
      hospedaje: 'Hospedaje',
      comer: 'Comida y Bebida',
      experiencias: 'Experiencias',
      eventos: 'Eventos',
      compras: 'Compras',
      servicios: 'Servicios',
      mapa: 'Mapa',
      buscar: 'Buscar',
      planificar: 'Planificar',
      blog: 'Blog',
      comunidad: 'Comunidad',
      negocios: 'Negocios',
      usuario: 'Usuario',
      informacion: 'Información'
    },
    // Common UI elements
    ui: {
      home: 'Inicio',
      loading: 'Cargando',
      error: 'Error',
      notFound: 'Página no encontrada',
      backHome: 'Volver al inicio'
    }
  },
  en: {
    // Navigation
    nav: {
      discover: 'Discover',
      stay: 'Stay',
      eat: 'Food & Drink',
      experience: 'Experience',
      events: 'Events',
      shop: 'Shop',
      services: 'Services',
      map: 'Map',
      search: 'Search',
      plan: 'Plan',
      blog: 'Blog',
      community: 'Community',
      business: 'Business',
      user: 'User',
      info: 'Info'
    },
    // Common UI elements
    ui: {
      home: 'Home',
      loading: 'Loading',
      error: 'Error',
      notFound: 'Page not found',
      backHome: 'Back to home'
    }
  }
}

export const getDictionary = (locale: Locale) => dictionaries[locale]