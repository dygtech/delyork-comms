import type { StrapiApp } from '@strapi/strapi/admin';
// @ts-ignore
import logo from './extensions/logo.png';

export default {
  config: {
    // Replace default Strapi logos
    auth: {
      logo: logo,
    },
    menu: {
      logo: logo,
    },
    // Extend Light and Dark themes with DYComms' premium red design colors
    theme: {
      light: {
        colors: {
          primary100: '#fdf2f2', // Soft light rose for active selection background
          primary200: '#fecaca',
          primary500: '#a40000', // Main Brand Red
          primary600: '#a40000', // Hover state
          primary700: '#800000', // Selected/Active active state
          buttonPrimary500: '#a40000',
          buttonPrimary600: '#800000',
        },
      },
      dark: {
        colors: {
          primary100: '#450a0a', // Deep elegant burgundy for active dark mode background
          primary200: '#7f1d1d',
          primary500: '#a40000', // Main Brand Red
          primary600: '#b91c1c', // Vibrant red for active elements
          primary700: '#fca5a5', // Soft light rose text for active menu selection
          buttonPrimary500: '#a40000',
          buttonPrimary600: '#b91c1c',
          neutral100: '#0f172a', // Premium deep dark slate background
          neutral150: '#1e293b',
        },
      },
    },
    // Customise branding translations
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'DYComms CMS',
        'app.components.LeftMenu.navbrand.workplace': 'Creative Engine',
        'Auth.form.welcome.title': 'Welcome to DYComms Admin Panel',
        'Auth.form.welcome.subtitle': 'Log in to manage DYComms',
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('Del-York Premium CMS Dashboard Initialized.');
  },
};
