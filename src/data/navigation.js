import { ROUTES } from '../constants/routes.js';

export const navigationItems = [
  { label: 'Home', to: ROUTES.home },
  { label: 'About', to: '#about' },
  { label: 'Venues', to: '#venues', hasDropdown: true },
  { label: 'Events', to: '#events', hasDropdown: true },
  { label: 'Gallery', to: '#gallery' },
  { label: 'Packages', to: '#packages' },
  { label: 'Facilities', to: '#facilities' },
  { label: 'Testimonials', to: '#testimonials' },
  { label: 'FAQs', to: '#package-faq' },
  { label: 'Contact', to: '#contact' },
];
