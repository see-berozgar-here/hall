import { SITE } from '../constants/site.js';

export const footerQuickLinks = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Venues', '#venues'],
  ['Gallery', '#gallery'],
  ['Packages', '#packages'],
  ['Booking', '#booking-bar'],
  ['Testimonials', '#testimonials'],
  ['FAQs', '#package-faq'],
  ['Location', '#map'],
  ['Contact', '#contact'],
];

export const footerEventLinks = [
  ['Wedding Ceremony', '#events'],
  ['Reception', '#events'],
  ['Engagement', '#events'],
  ['Haldi', '#events'],
  ['Mehendi', '#events'],
  ['Sangeet', '#events'],
  ['Birthday Party', '#events'],
  ['Corporate Events', '#events'],
];

export const footerVenueLinks = [
  ['Royal Grand Banquet', '#venues'],
  ['Emerald Garden Lawn', '#venues'],
  ['Sapphire Reception Hall', '#venues'],
  ['Dining Pavilion', '#venues'],
  ['Bridal Suite', '#venues'],
  ['Rooftop Celebration Deck', '#venues'],
];

export const footerContactItems = [
  ['Phone', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`],
  ['WhatsApp', 'Chat instantly', `https://wa.me/${SITE.whatsapp}`],
  ['Email', SITE.email, `mailto:${SITE.email}`],
  ['Address', SITE.address, '#map'],
  ['Working Hours', '10:00 AM – 9:00 PM', '#visit-planning'],
];

export const footerSocialLinks = [
  ['Instagram', 'IG', 'https://www.instagram.com/'],
  ['Facebook', 'FB', 'https://www.facebook.com/'],
  ['YouTube', 'YT', 'https://www.youtube.com/'],
  ['Google Business', 'G', 'https://www.google.com/search?q=The+Grand+Royale+wedding+venue'],
  ['WhatsApp', 'WA', `https://wa.me/${SITE.whatsapp}`],
];

export const footerTrustItems = [
  ['✓', 'Secure Enquiry'],
  ['☎', 'Quick Response'],
  ['♕', 'Dedicated Event Team'],
  ['◈', 'Transparent Packages'],
];

export const legalLinks = [
  ['Privacy Policy', '#footer-legal'],
  ['Terms & Conditions', '#footer-legal'],
  ['Sitemap', '#footer-sitemap'],
];
