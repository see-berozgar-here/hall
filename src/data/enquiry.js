import { SITE } from '../constants/site.js';

export const WHATSAPP_NUMBER = SITE.whatsapp;

export const enquiryEventTypes = [
  'Wedding',
  'Reception',
  'Engagement',
  'Haldi',
  'Mehendi',
  'Sangeet',
  'Birthday',
  'Anniversary',
  'Corporate Event',
  'Conference',
  'Other',
];

export const enquiryVenueOptions = [
  'Royal Grand Banquet',
  'Emerald Garden Lawn',
  'Sapphire Reception Hall',
  'Imperial Dining Pavilion',
  'Rooftop Celebration Deck',
  'Not Sure Yet',
];

export const enquiryBudgetOptions = [
  '₹1L – ₹2L',
  '₹2L – ₹5L',
  '₹5L – ₹10L',
  '₹10L+',
  'Discuss With Team',
];

export const contactCards = [
  ['☎', 'Call Us', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`],
  ['◈', 'WhatsApp', SITE.phone, `https://wa.me/${SITE.whatsapp}`],
  ['✉', 'Email', SITE.email, `mailto:${SITE.email}`],
  ['◷', 'Working Hours', '10:00 AM – 9:00 PM', '#enquiry'],
  ['⌖', 'Venue Visit', 'By appointment, all 7 days', '#enquiry'],
];

export const workingHours = Object.freeze({
  label: 'Working Hours',
  value: '10:00 AM – 9:00 PM, all 7 days',
});

export const initialEnquiryForm = Object.freeze({
  fullName: '',
  phone: '',
  whatsappNumber: '',
  email: '',
  eventDate: '',
  eventType: '',
  guests: '',
  preferredVenue: '',
  budgetRange: '',
  city: '',
  requirements: '',
  message: '',
});

export const buildEnquiryMessage = (form) => `Hello,\n\nI would like to enquire about booking The Grand Royale.\n\nName: ${form.fullName || 'Not shared'}\nPhone: ${form.phone || 'Not shared'}\nWhatsApp: ${form.whatsappNumber || form.phone || 'Not shared'}\nEmail: ${form.email || 'Not shared'}\nEvent: ${form.eventType || 'Not selected'}\nDate: ${form.eventDate || 'Not selected'}\nGuests: ${form.guests || 'Not selected'}\nVenue: ${form.preferredVenue || 'Not selected'}\nBudget: ${form.budgetRange || 'Not selected'}\nCity: ${form.city || 'Not shared'}\nRequirements: ${form.requirements || form.message || 'Please guide me with package and availability.'}\n\nPlease contact me.`;

export const buildWhatsAppLink = (form) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildEnquiryMessage(form))}`;
