import { useEffect, useMemo, useState } from 'react';
import SEO from '../components/seo/SEO.jsx';
import Button from '../components/ui/Button.jsx';
import { SITE } from '../constants/site.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { galleryCategories, galleryItems } from '../data/gallery.js';
import { celebrationPackages, comparisonPackages, packageAddOns, packageBenefits, packageBuilderOptions, packageComparisonRows, packageFaqs, packageInclusionCards, packageTerms } from '../data/packages.js';
import { buildEnquiryMessage, buildWhatsAppLink, contactCards, enquiryBudgetOptions, enquiryEventTypes, enquiryVenueOptions, initialEnquiryForm } from '../data/enquiry.js';
import { generateFaqSchema, generateLocalBusinessSchema, generateServiceSchema } from '../utils/schema.js';
import { trackFormSubmit, trackGalleryView, trackPageView } from '../utils/analytics.js';
import heroFallback from '../assets/hero-fallback.svg';
import whatsappQr from '../assets/whatsapp-qr.svg';
import mapsQr from '../assets/maps-qr.svg';
import styles from './HomePage.module.css';

const heroCards = [
  ['Wedding Capacity', '1200 Guests', 'Grand pillarless ballroom'],
  ['Guest Rooms', '28 Suites', 'Family-ready premium stays'],
  ['Parking', '250 Cars', 'Valet-ready arrival court'],
  ['Air Conditioned', 'Full Venue', 'Comfort in every season'],
  ['Starting Price', '₹1.25L+', 'Flexible premium packages'],
  ['Google Rating', '4.9★', 'Trusted by families'],
];

const trustItems = [
  { value: 500, suffix: '+', label: 'Successful Weddings', icon: '✦' },
  { value: 15, suffix: '+', label: 'Years Experience', icon: '♕' },
  { value: 49, suffix: '★', label: 'Google Rating', icon: '★', divisor: 10 },
  { value: 100, suffix: '%', label: 'Customer Satisfaction', icon: '♡' },
  { value: 2000, suffix: '+', label: 'Events Hosted', icon: '◈' },
];

const highlights = [
  ['Luxury Banquet', 'A refined ballroom crafted for grand celebrations.'],
  ['Outdoor Lawn', 'Open-air ceremonies with a resort-style ambience.'],
  ['Bridal Suite', 'Private, elegant preparation space for the bride.'],
  ['Large Parking', 'Smooth guest arrivals with spacious parking.'],
  ['Custom Decoration', 'Theme-led floral, stage, and lighting concepts.'],
  ['Premium Catering', 'Curated menus with polished hospitality service.'],
  ['Generator Backup', 'Reliable power backup for uninterrupted events.'],
  ['Valet Parking', 'A premium welcome from the first moment.'],
];

const aboutHighlights = [
  'Dedicated event planning team from first visit to final farewell',
  'Luxury interiors designed for weddings, receptions, and family rituals',
  'Flexible indoor and outdoor spaces for intimate and grand celebrations',
  'Premium hospitality standards with polished guest service',
];

const whyChooseUs = [
  ['⌖', 'Prime Location', 'Easy-to-reach venue access with a refined arrival experience for every guest.'],
  ['♕', 'Luxury Banquet Interiors', 'Elegant chandeliers, premium finishes, and a grand ballroom atmosphere.'],
  ['▣', 'Spacious Parking', 'Well-managed parking capacity for smooth wedding-day movement.'],
  ['◐', 'Premium Catering', 'Curated vegetarian and multi-cuisine menus served with hospitality care.'],
  ['✦', 'Custom Decoration', 'Theme-led stage, floral, lighting, and entrance concepts for every function.'],
  ['☉', 'Experienced Event Team', 'A professional team coordinating guest flow, vendors, rituals, and timelines.'],
  ['♡', 'Bridal & Groom Suites', 'Private preparation suites for comfort, photography, and family support.'],
  ['⚡', 'Power Backup', 'Reliable backup support for lighting, sound, catering, and comfort systems.'],
  ['◈', 'Security & CCTV', 'Monitored public areas and a security-first approach for safe celebrations.'],
  ['✧', 'Guest Hospitality', 'Warm welcome, guided assistance, and thoughtful service touchpoints.'],
  ['▱', 'Flexible Packages', 'Customizable celebration plans for different guest counts and budgets.'],
  ['✓', 'Hygienic Dining', 'Clean dining operations, organized serving flow, and careful kitchen standards.'],
];

const venues = [
  {
    name: 'Royal Grand Banquet',
    capacity: '800 guests',
    bestFor: 'Weddings & Receptions',
    type: 'Indoor Ballroom',
    image: 'royal-banquet',
    description: 'A cinematic pillarless banquet with chandeliers, grand stage visibility, and luxury seating flow.',
  },
  {
    name: 'Emerald Garden Lawn',
    capacity: '1200 guests',
    bestFor: 'Outdoor Weddings & Sangeet',
    type: 'Open Lawn',
    image: 'emerald-lawn',
    description: 'A resort-style outdoor lawn for pheras, sangeet nights, floral mandaps, and large family gatherings.',
  },
  {
    name: 'Sapphire Reception Hall',
    capacity: '500 guests',
    bestFor: 'Engagements & Parties',
    type: 'Reception Hall',
    image: 'sapphire-hall',
    description: 'A polished mid-size hall designed for receptions, ring ceremonies, cocktail evenings, and dinners.',
  },
  {
    name: 'Imperial Dining Pavilion',
    capacity: '600 guests',
    bestFor: 'Premium Dining',
    type: 'Dining Pavilion',
    image: 'dining-pavilion',
    description: 'A dedicated dining experience with elegant buffet layouts, live counters, and comfortable guest movement.',
  },
  {
    name: 'Luxury Bridal Suite',
    capacity: 'Private family space',
    bestFor: 'Bride Preparation & Family Comfort',
    type: 'Preparation Suite',
    image: 'bridal-suite',
    description: 'An intimate suite for makeup, family moments, outfit changes, photography, and calm preparation.',
  },
  {
    name: 'Rooftop Celebration Deck',
    capacity: '250 guests',
    bestFor: 'Cocktail Nights & Private Events',
    type: 'Rooftop Deck',
    image: 'rooftop-deck',
    description: 'An elevated celebration deck for intimate parties, cocktail nights, anniversaries, and private dinners.',
  },
];

const facilities = [
  'Fully Air Conditioned Halls', 'Large Parking Space', 'Valet Parking', 'Power Backup', 'Premium Decoration',
  'In-house Catering', 'Bride & Groom Rooms', 'Guest Rooms', 'Modern Kitchen', 'Lift Access',
  'CCTV Security', 'Fire Safety', 'Wheelchair Access', 'RO Water', 'Clean Washrooms',
  'Dedicated Event Manager', 'DJ & Sound Setup', 'Stage Lighting', 'Photography Support', 'Kids Friendly Space',
];

const events = [
  ['Wedding Ceremony', 'Elegant ritual-ready spaces for pheras, mandap, family seating, and photography.', '200–1200 guests'],
  ['Reception', 'A grand hospitality-led evening setup with stage, dining, and guest movement.', '300–1000 guests'],
  ['Engagement', 'Premium celebration spaces for ring ceremonies and close family functions.', '100–500 guests'],
  ['Ring Ceremony', 'Refined seating, stage lighting, and elegant décor for intimate moments.', '100–400 guests'],
  ['Haldi', 'Bright, joyful setups with flexible indoor or lawn arrangements.', '80–500 guests'],
  ['Mehendi', 'Colorful décor-friendly spaces for music, seating, and photo corners.', '80–500 guests'],
  ['Sangeet', 'Stage, sound, lighting, and guest flow planned for dance-led celebrations.', '200–1200 guests'],
  ['Birthday Party', 'Comfortable celebration layouts for kids, families, and premium dining.', '50–350 guests'],
  ['Anniversary', 'Warm and elegant spaces for milestone family celebrations.', '50–400 guests'],
  ['Baby Shower', 'Soft, graceful setups for family blessings and intimate gatherings.', '50–250 guests'],
  ['Corporate Event', 'Professional layouts for team celebrations, launches, and annual meets.', '80–600 guests'],
  ['Conference', 'Seating, AV-ready planning, dining, and hospitality support.', '100–700 guests'],
  ['Award Ceremony', 'Stage-led layouts with lighting, seating, and premium guest experience.', '150–800 guests'],
  ['Cultural Event', 'Flexible spaces for performances, community functions, and stage programs.', '200–1000 guests'],
  ['School Function', 'Large guest capacity with safe flow, seating, and backstage support.', '200–1000 guests'],
  ['Festival Celebration', 'Spacious indoor/outdoor setups for festive gatherings and community events.', '200–1200 guests'],
];

const decorationThemes = [
  ['royalThemeVisual', 'Royal Wedding Theme', 'Layered chandeliers, rich burgundy florals, carved stage details, and regal gold accents for a grand wedding mood.', 'Weddings & receptions', 'From ₹1.85L'],
  ['floralThemeVisual', 'Floral Luxury Theme', 'Premium fresh-flower styling with lush arches, ceiling blooms, aisle accents, and soft romantic lighting.', 'Engagements & receptions', 'From ₹1.45L'],
  ['traditionalThemeVisual', 'Traditional Indian Theme', 'Mandap-led décor with marigold warmth, brass-inspired details, rich fabrics, and ceremonial elegance.', 'Pheras, haldi & rituals', 'From ₹1.25L'],
  ['minimalThemeVisual', 'Modern Minimal Theme', 'Clean stage geometry, soft ivory palettes, refined lighting, and uncluttered luxury for contemporary couples.', 'Engagements & cocktails', 'From ₹95K'],
  ['goldenThemeVisual', 'Golden Reception Theme', 'A warm gold reception setting with premium backdrop, sparkling lights, and photo-ready stage composition.', 'Reception nights', 'From ₹1.55L'],
  ['gardenThemeVisual', 'Outdoor Garden Theme', 'Open-air floral styling, fairy lights, lawn seating, and resort-style celebration flow under the sky.', 'Sangeet & outdoor weddings', 'From ₹1.35L'],
  ['pastelThemeVisual', 'Pastel Engagement Theme', 'Soft blush, mint, champagne, and ivory details for graceful ring ceremonies and family photographs.', 'Ring ceremonies', 'From ₹85K'],
  ['sangeetThemeVisual', 'Luxury Sangeet Theme', 'Stage lighting, dance-floor energy, LED-inspired accents, and a cinematic party atmosphere.', 'Sangeet & cocktail nights', 'From ₹1.65L'],
];

const videoGallery = [
  ['walkthroughVideoVisual', 'Venue Walkthrough', '02:40', 'A guided cinematic look through the grand banquet, arrival lobby, and celebration zones.'],
  ['weddingVideoVisual', 'Wedding Highlights', '03:18', 'A premium highlight mood for pheras, family rituals, décor, and emotional wedding moments.'],
  ['receptionVideoVisual', 'Reception Setup', '01:56', 'Stage lighting, dining flow, guest seating, and reception-ready hospitality planning.'],
  ['droneVideoVisual', 'Drone View', '00:48', 'Aerial-style visuals prepared for future drone footage of exterior, lawn, and arrival spaces.'],
  ['decorationVideoVisual', 'Decoration Reveal', '01:22', 'Before-to-after style décor reveal for floral setups, stage themes, and entrance styling.'],
  ['diningVideoVisual', 'Dining Experience', '01:14', 'A cinematic preview of buffet counters, premium service, and dining pavilion arrangement.'],
];

const tourChips = ['Grand Banquet View', 'Garden Lawn', 'Dining Pavilion', 'Bridal Suite', 'Entrance Lobby'];


const beforeAfterShowcase = [
  {
    title: 'Banquet Stage Transformation',
    before: 'Plain banquet stage with neutral base layout before floral styling and lighting layers.',
    after: 'Royal gold backdrop, layered florals, soft lighting, and photo-ready wedding stage styling.',
    beforeVisual: 'stageBeforeVisual',
    afterVisual: 'stageAfterVisual',
  },
  {
    title: 'Garden Lawn Setup',
    before: 'Open lawn space prepared for planning, guest flow, mandap positioning, and seating zones.',
    after: 'Outdoor celebration lawn with mandap styling, fairy lights, floral pathway, and elegant guest ambience.',
    beforeVisual: 'lawnBeforeVisual',
    afterVisual: 'lawnAfterVisual',
  },
  {
    title: 'Reception Entrance Decor',
    before: 'Clean entrance frontage ready for welcome desk, floral arches, signage, and guest arrival styling.',
    after: 'Luxury reception entry with warm lighting, premium floral arch, welcome signage, and red-carpet feel.',
    beforeVisual: 'entranceBeforeVisual',
    afterVisual: 'entranceAfterVisual',
  },
  {
    title: 'Dining Pavilion Arrangement',
    before: 'Spacious dining pavilion planned for buffet counters, service flow, and comfortable guest movement.',
    after: 'Premium dining setup with coordinated counters, soft lighting, elegant table styling, and organized hospitality.',
    beforeVisual: 'diningBeforeVisual',
    afterVisual: 'diningAfterVisual',
  },
];

const socialMoments = [
  ['socialWeddingVisual', 'Bride entry under soft floral lights', 'Wedding'],
  ['socialSangeetVisual', 'Sangeet night with stage glow and family energy', 'Sangeet'],
  ['socialDiningVisual', 'Premium dining counters ready for guests', 'Dining'],
  ['socialHaldiVisual', 'Haldi decor with joyful yellow accents', 'Haldi'],
  ['socialReceptionVisual', 'Reception stage with champagne gold mood', 'Reception'],
  ['socialMehendiVisual', 'Mehendi corner with pastel seating and florals', 'Mehendi'],
  ['socialGardenVisual', 'Garden lawn celebration under evening lights', 'Outdoor'],
  ['socialSuiteVisual', 'Bridal suite prepared for calm family moments', 'Rooms'],
  ['socialCorporateVisual', 'Corporate event setup with refined seating', 'Corporate'],
  ['socialEntranceVisual', 'Grand arrival lobby with welcome styling', 'Exterior'],
  ['socialDecorVisual', 'Luxury floral backdrop ready for portraits', 'Decoration'],
  ['socialDroneVisual', 'Aerial-style celebration view concept', 'Drone Views'],
];



const bookingProcessSteps = [
  ['✦', 'Send Celebration Enquiry', 'Share your date, guest count, venue preference, and celebration style.'],
  ['☎', 'Event Expert Calls You', 'Our celebration desk reviews your details and calls with practical availability guidance.'],
  ['⌖', 'Venue Visit', 'Visit the banquet, lawn, suites, dining pavilion, and arrival spaces with your family.'],
  ['♕', 'Package Finalization', 'Choose the right package, decoration theme, dining plan, and event flow.'],
  ['✓', 'Booking Confirmation', 'Confirm the date with clear terms, advance guidance, and planning next steps.'],
  ['♡', 'Celebrate Your Event', 'Arrive with confidence while our team manages hospitality, flow, and support.'],
];

const confirmationItems = [
  'Venue enquiry ready',
  'Event details recorded',
  'Event expert will contact you',
  'No booking charges for enquiry',
];

const nextStepCards = [
  ['♕', 'Dedicated Event Manager', 'A single planning contact guides your family through venue, décor, and timing decisions.'],
  ['⌖', 'Venue Visit', 'Walk through the banquet, lawn, dining, suites, entrance, and parking flow before finalizing.'],
  ['◈', 'Package Discussion', 'Compare inclusions, add-ons, guest count, and budget-fit options with clarity.'],
  ['✦', 'Decoration Planning', 'Shortlist themes, stage style, mandap concept, floral mood, and lighting direction.'],
  ['◐', 'Menu Selection', 'Plan dining flow, live counters, beverages, desserts, and hospitality service.'],
  ['✓', 'Booking Confirmation', 'Lock your preferred date and receive the next planning checklist from the team.'],
];

const bookingTrustStats = [
  { value: 500, suffix: '+', label: 'Luxury Weddings', icon: '♕' },
  { value: 2000, suffix: '+', label: 'Events Hosted', icon: '◈' },
  { value: 49, suffix: '★', label: 'Guest Rating', icon: '★', divisor: 10 },
  { value: 15, suffix: '+', label: 'Years Experience', icon: '✦' },
];


const testimonials = [
  ['Aarav & Meera Sharma', 'Noida', 'Royal Wedding', 'March 2026', 'The Grand Royale gave our wedding the calm, polished feeling we wanted. From décor coordination to dining flow and family support, every detail felt handled with care.'],
  ['Ritika Verma', 'Ghaziabad', 'Reception', 'February 2026', 'Our guests still remember the entrance styling and dinner service. The evening felt elegant, organized, and completely stress-free for our families.'],
  ['Karan Malhotra', 'Delhi', 'Engagement', 'January 2026', 'We wanted a graceful engagement without unnecessary chaos. The hall setup, soft lighting, and attentive hospitality created the exact mood our family hoped for.'],
  ['Pooja & Nikhil', 'Greater Noida', 'Sangeet', 'December 2025', 'The sangeet had the right balance of energy and sophistication. The stage, sound, lighting, and guest flow made it feel like a luxury hotel celebration.'],
  ['Ananya Singh', 'Noida Extension', 'Haldi & Mehendi', 'November 2025', 'The pastel décor was interpreted beautifully, and the entire function moved smoothly. Every corner looked photo-ready without feeling overdone.'],
  ['Rohit Bansal', 'Indirapuram', 'Corporate Event', 'October 2025', 'The coordination felt professional throughout. Seating, dining, announcements, and guest support were managed with the polish our company event required.'],
  ['Sneha Kapoor', 'Delhi NCR', 'Grand Reception', 'September 2025', 'The reception looked royal. The staff was attentive, the lighting was warm, and every family member felt well cared for.'],
  ['Ishaan & Kavya', 'Faridabad', 'Wedding Ceremony', 'August 2025', 'The garden lawn ceremony felt like a destination wedding. We loved the mandap styling and evening ambience.'],
];

const googleReviews = [
  ['Priya S.', '2 weeks ago', 'Verified family celebration', 'Beautiful venue with premium décor options. The team was supportive during planning and very responsive on WhatsApp.'],
  ['Manish G.', '1 month ago', 'Verified reception guest', 'Parking, dining, and stage setup were handled well. A very polished experience for a large family event.'],
  ['Neha R.', '2 months ago', 'Verified wedding booking', 'Loved the banquet interiors and hospitality. The event manager helped us choose the right package.'],
  ['Aditya K.', '3 months ago', 'Verified corporate event', 'Clean, professional and spacious. The venue worked well for our annual celebration and dinner.'],
];

const videoTestimonials = [
  ['Aarav & Meera', 'Royal Wedding', '02:18', 'weddingVideoVisual'],
  ['Ritika Family', 'Grand Reception', '01:42', 'receptionVideoVisual'],
  ['Karan & Aisha', 'Luxury Engagement', '01:26', 'pastelThemeVisual'],
  ['Kapoor Family', 'Sangeet Night', '02:05', 'sangeetThemeVisual'],
];

const successStories = [
  ['Royal Wedding', 'A 900-guest wedding planned across the grand banquet and garden lawn with regal stage décor, family hospitality, and smooth dining flow.', '900 guests', 'Royal Wedding Theme', 'royalThemeVisual'],
  ['Grand Reception', 'A champagne-gold reception evening with premium entrance styling, elegant stage lighting, and refined dinner service.', '650 guests', 'Golden Reception Theme', 'goldenThemeVisual'],
  ['Luxury Engagement', 'A pastel engagement celebration designed around intimate seating, floral corners, and photo-ready ring ceremony moments.', '280 guests', 'Pastel Engagement Theme', 'pastelThemeVisual'],
  ['Destination-style Celebration', 'An outdoor garden celebration with fairy lights, mandap styling, live counters, and a resort-like family experience.', '1100 guests', 'Outdoor Garden Theme', 'gardenThemeVisual'],
];

const socialProofCounters = [
  { value: 500, suffix: '+', label: 'Luxury Weddings', icon: '♕' },
  { value: 2000, suffix: '+', label: 'Events Hosted', icon: '◈' },
  { value: 49, suffix: '★', label: 'Rating', icon: '★', divisor: 10 },
  { value: 15, suffix: '+', label: 'Years', icon: '✦' },
  { value: 98, suffix: '%', label: 'Recommendation', icon: '♡' },
];


const locationDetails = Object.freeze({
  address: 'The Grand Royale, Premium Wedding District, Sector 142, Noida, Uttar Pradesh',
  city: 'Noida, Uttar Pradesh',
  pin: '201305',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The%20Grand%20Royale%20Luxury%20Wedding%20Venue%20Noida',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=The%20Grand%20Royale%20Luxury%20Wedding%20Venue%20Noida',
});

const locationInfoCards = [
  ['⌖', 'Full Address', locationDetails.address],
  ['▣', 'City & State', locationDetails.city],
  ['#', 'PIN Code', locationDetails.pin],
  ['◈', 'Nearby Metro/Station', 'Sector 142 Metro · approx. 12 minutes'],
  ['✈', 'Airport Distance', 'Indira Gandhi International Airport · approx. 55 minutes'],
  ['▤', 'Railway Station', 'New Delhi Railway Station · approx. 60 minutes'],
  ['⇄', 'Highway Connectivity', 'Easy access from Noida Expressway and city arterial roads'],
  ['Ⓟ', 'Parking Capacity', '250 cars, bike parking, and valet-ready arrival court'],
];

const nearbyLandmarks = [
  ['⌖', 'City Center', '8 km', '18 min', 'Easy urban access for local guests and families.'],
  ['▣', 'Metro Station', '5 km', '12 min', 'Convenient for guests arriving by public transport.'],
  ['✈', 'Airport', '42 km', '55 min', 'Helpful for outstation families and destination-style functions.'],
  ['▤', 'Railway Station', '38 km', '60 min', 'Connects visiting relatives with planned pickup options.'],
  ['▥', 'Premium Hotels', '3–7 km', '10–20 min', 'Nearby accommodation options for wedding guests.'],
  ['◐', 'Shopping Mall', '6 km', '15 min', 'Useful for last-minute celebration essentials.'],
  ['✦', 'Temple', '4 km', '10 min', 'Convenient for family rituals and blessings.'],
  ['✚', 'Hospital', '5 km', '12 min', 'Emergency support access for peace of mind.'],
];

const visitPlanningCards = [
  ['◴', 'Working Hours', '10:00 AM – 8:00 PM', 'Venue visits are best planned with a prior appointment.'],
  ['☀', 'Best Visiting Time', '11:00 AM – 5:00 PM', 'Explore halls, lawns, dining areas, and suites in natural light.'],
  ['◇', 'Weekend Availability', 'Saturday & Sunday visits', 'Weekend visit slots are limited during wedding season.'],
  ['☉', 'Guided Venue Tour', '30–45 minute walkthrough', 'Our event team explains venue flow, décor, and package options.'],
  ['Ⓟ', 'Parking Available', 'Cars, bikes, valet-ready', 'Spacious arrival court and guest parking support.'],
  ['▣', 'Virtual Visit', 'Video call tour available', 'Useful for families planning from another city.'],
];

const locationContactCards = [
  ['☎', 'Phone', SITE.phone, `tel:${SITE.phone.replace(/\\s/g, '')}`],
  ['WA', 'WhatsApp', SITE.whatsapp, `https://wa.me/${SITE.whatsapp}`],
  ['✉', 'Email', SITE.email, `mailto:${SITE.email}`],
  ['◴', 'Office Hours', '10:00 AM – 8:00 PM', '#visit-planning'],
  ['⌖', 'Booking Office', 'Ground Floor · Venue Reception', '#map'],
  ['⚑', 'Emergency Contact', '+91 98765 00000 (Demo)', 'tel:+919876500000'],
];

const quickLocationActions = [
  ['☎', 'Call Celebration Desk', `tel:${SITE.phone.replace(/\\s/g, '')}`],
  ['WA', 'WhatsApp', `https://wa.me/${SITE.whatsapp}`],
  ['⌖', 'Get Directions', locationDetails.directionsUrl],
  ['✦', 'Schedule Venue Visit', '#booking-bar'],
  ['✉', 'Send Enquiry', '#enquiry'],
];

const premiumSupportCards = [
  ['♕', 'Speak With Our Event Team', 'Discuss guest count, date availability, package fit, and décor direction.', '#enquiry'],
  ['☎', 'Call Us', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`],
  ['WA', 'WhatsApp', 'Send your date and event details instantly.', `https://wa.me/${SITE.whatsapp}`],
  ['✉', 'Email', SITE.email, `mailto:${SITE.email}`],
  ['⌖', 'Schedule Venue Visit', 'Schedule a family walk-through before confirming your celebration.', '#booking-bar'],
];

const createWhatsAppPackageLink = (packageName) => {
  const message = `Hello, I am interested in the ${packageName} package at The Grand Royale. Please share details and availability.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
};

function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('nav-lock');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('nav-lock');
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div className={styles.videoModal} role="dialog" aria-modal="true" aria-label={`${video[1]} video preview`} onMouseDown={onClose}>
      <div className={styles.videoModalPanel} onMouseDown={(event) => event.stopPropagation()}>
        <button className={styles.videoModalClose} type="button" aria-label="Close video preview" onClick={onClose}>×</button>
        <div className={`${styles.videoPreview} ${styles[video[0]]}`} aria-hidden="true">
          <span className={styles.videoPlayLarge}>▶</span>
        </div>
        <div className={styles.videoModalCopy}>
          <span>{video[2]} cinematic preview</span>
          <h3>{video[1]}</h3>
          <p>{video[3]} Real video playback can be connected here in a future part.</p>
        </div>
      </div>
    </div>
  );
}

function GalleryLightbox({ items, activeIndex, onClose, onPrevious, onNext }) {
  const item = activeIndex >= 0 ? items[activeIndex] : null;

  useEffect(() => {
    if (!item) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrevious();
      if (event.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('nav-lock');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('nav-lock');
    };
  }, [item, onClose, onNext, onPrevious]);

  if (!item) return null;

  return (
    <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${item.title} gallery preview`} onMouseDown={onClose}>
      <div className={styles.lightboxPanel} onMouseDown={(event) => event.stopPropagation()}>
        <button className={styles.lightboxClose} type="button" aria-label="Close gallery preview" onClick={onClose}>×</button>
        <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} type="button" aria-label="Previous gallery item" onClick={onPrevious}>‹</button>
        <div className={`${styles.lightboxVisual} ${styles[item.visual]}`} role="img" aria-label={item.alt} />
        <div className={styles.lightboxContent}>
          <span>{item.category}</span>
          <h3>{item.title}</h3>
          <p>{item.caption}</p>
        </div>
        <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} type="button" aria-label="Next gallery item" onClick={onNext}>›</button>
      </div>
    </div>
  );
}


function EnquiryField({ label, name, value, onChange, error, type = 'text', required = false, options, as = 'input', placeholder = ' ', ...fieldProps }) {
  const fieldId = `enquiry-${name}`;
  const describedBy = error ? `${fieldId}-error` : undefined;
  if (options) {
    return (
      <label className={`${styles.enquiryField} ${value ? styles.fieldHasValue : ''}`} htmlFor={fieldId}>
        <span>{label}{required ? ' *' : ''}</span>
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...fieldProps}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {error ? <small id={describedBy}>{error}</small> : null}
      </label>
    );
  }
  const FieldTag = as;
  return (
    <label className={`${styles.enquiryField} ${value ? styles.fieldHasValue : ''}`} htmlFor={fieldId}>
      <span>{label}{required ? ' *' : ''}</span>
      <FieldTag
        id={fieldId}
        name={name}
        value={value}
        onChange={onChange}
        type={as === 'textarea' ? undefined : type}
        rows={as === 'textarea' ? 4 : undefined}
        placeholder={placeholder}
        required={required}
        aria-required={required || undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...fieldProps}
      />
      {error ? <small id={describedBy}>{error}</small> : null}
    </label>
  );
}

function SuccessModal({ onClose, whatsappLink }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('nav-lock');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('nav-lock');
    };
  }, [onClose]);

  return (
    <div className={styles.successModal} role="dialog" aria-modal="true" aria-labelledby="success-modal-title" onMouseDown={onClose}>
      <div className={styles.successModalPanel} onMouseDown={(event) => event.stopPropagation()}>
        <button className={styles.successModalClose} type="button" aria-label="Close thank you message" onClick={onClose}>×</button>
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h2 id="success-modal-title">Your Enquiry Is Ready</h2>
        <p>Your details have been checked. Send the prepared message on WhatsApp so the celebration desk can receive and respond to your enquiry.</p>
        <div className={styles.actionsDark}>
          <Button href={whatsappLink}>Send on WhatsApp</Button>
          <Button type="button" onClick={onClose} variant="secondary">Continue Exploring</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </div>
    </div>
  );
}

function QRCodeCard({ whatsappLink }) {
  return (
    <article className={styles.qrCard} aria-labelledby="qr-title">
      <div className={styles.qrVisual}>
        <img src={whatsappQr} alt="Scannable WhatsApp QR code for The Grand Royale booking desk" />
      </div>
      <div className={styles.qrCopy}>
        <p className={styles.eyebrowDark}>Premium QR contact</p>
        <h2 id="qr-title">Scan & Chat Instantly</h2>
        <p>Families can instantly connect with the booking team by scanning this working WhatsApp QR code.</p>
        <small>Open camera, scan the QR, and send your event details directly to the booking team.</small>
        <div className={styles.actionsDark}>
          <Button href={whatsappLink}>Open WhatsApp Chat</Button>
          <Button href={whatsappQr} download="grand-royale-whatsapp-qr.svg" variant="secondary">Download QR</Button>
        </div>
      </div>
    </article>
  );
}


function BookingTimeline() {
  return (
    <section className={styles.bookingTimelineSection} aria-labelledby="booking-timeline-title">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrowDark}>Booking journey</p>
        <h2 id="booking-timeline-title">How Your Booking Journey Works</h2>
        <p>From first enquiry to final celebration, the process stays clear, premium, and family-friendly.</p>
      </div>
      <div className={styles.bookingTimeline}>
        {bookingProcessSteps.map(([icon, title, description], index) => (
          <article key={title} className={styles.bookingStep} style={{ '--delay': `${index * 80}ms` }}>
            <span className={styles.bookingStepNumber}>0{index + 1}</span>
            <span className={styles.bookingStepIcon} aria-hidden="true">{icon}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EnquiryReviewPanel({ form, whatsappLink, onConfirm }) {
  const reviewRows = [
    ['Name', form.fullName || 'Not shared yet'],
    ['Phone', form.phone || 'Not shared yet'],
    ['Event Date', form.eventDate || 'Not selected yet'],
    ['Event Type', form.eventType || 'Not selected yet'],
    ['Guests', form.guests || 'Not selected yet'],
    ['Venue', form.preferredVenue || 'Not selected yet'],
    ['Budget', form.budgetRange || 'Not selected yet'],
    ['Special Requirements', form.requirements || form.message || 'Not shared yet'],
  ];

  return (
    <aside className={styles.enquiryReviewCard} aria-labelledby="enquiry-review-title">
      <div className={styles.reviewCardHeader}>
        <p className={styles.eyebrowDark}>Review details</p>
        <h2 id="enquiry-review-title">Enquiry Summary</h2>
        <p>Check the details before sending your request to the celebration desk.</p>
      </div>
      <dl className={styles.reviewRows}>
        {reviewRows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.reviewActions}>
        <Button href="#enquiry" variant="secondary">Edit Details</Button>
        <Button type="button" onClick={onConfirm}>Send Enquiry</Button>
        <Button href={whatsappLink} variant="ghost">WhatsApp Chat</Button>
      </div>
    </aside>
  );
}

function ConfirmationPreview({ onConfirm }) {
  return (
    <article className={styles.confirmationPreview} aria-labelledby="confirmation-preview-title">
      <div>
        <p className={styles.eyebrow}>Final check</p>
        <h2 id="confirmation-preview-title">You&apos;re Almost Done</h2>
        <p>Your celebration enquiry is prepared. Confirm it now or continue exploring the venue experience.</p>
      </div>
      <ul>
        {confirmationItems.map((item) => <li key={item}>✓ {item}</li>)}
      </ul>
      <div className={styles.actionsDark}>
        <Button type="button" onClick={onConfirm}>Confirm Celebration Enquiry</Button>
        <Button href="#main-content" variant="secondary">Continue Exploring</Button>
      </div>
    </article>
  );
}

function BookingNextSteps() {
  return (
    <section className={styles.nextStepsSection} aria-labelledby="next-steps-title">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrowDark}>What happens next</p>
        <h2 id="next-steps-title">Premium support after your enquiry</h2>
        <p>Our team turns your initial details into a clear planning path for venue visit, package selection, décor, and confirmation.</p>
      </div>
      <div className={styles.nextStepGrid}>
        {nextStepCards.map(([icon, title, description]) => (
          <article key={title} className={styles.nextStepCard}>
            <span aria-hidden="true">{icon}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BookingTrustSection() {
  return (
    <section className={styles.bookingTrustSection} aria-labelledby="booking-trust-title">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrowDark}>Why families trust us</p>
        <h2 id="booking-trust-title">Celebrations handled with confidence</h2>
      </div>
      <div className={styles.bookingTrustGrid}>
        {bookingTrustStats.map((item) => <CounterCard key={item.label} item={item} />)}
      </div>
    </section>
  );
}

function PremiumSupportPanel() {
  return (
    <section className={styles.supportPanelSection} aria-labelledby="support-panel-title">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrowDark}>Premium support</p>
        <h2 id="support-panel-title">Need Help Choosing?</h2>
        <p>Choose the fastest way to speak with the team and plan your next step.</p>
      </div>
      <div className={styles.supportCardGrid}>
        {premiumSupportCards.map(([icon, title, description, href]) => (
          <a key={title} className={styles.supportCard} href={href}>
            <span aria-hidden="true">{icon}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}


function TestimonialsSection({ onPlayVideo }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const active = testimonials[activeIndex];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goTo = (index) => setActiveIndex((index + testimonials.length) % testimonials.length);
  const onTouchEnd = (event) => {
    if (touchStart === null) return;
    const distance = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(distance) > 42) goTo(activeIndex + (distance > 0 ? 1 : -1));
    setTouchStart(null);
  };

  return (
    <>
      <section id="testimonials" className={styles.testimonialIntroSection} aria-labelledby="testimonial-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Family trust</p>
          <h2 id="testimonial-title">What Families Say About The Grand Royale</h2>
          <p>Hundreds of families have celebrated weddings, receptions, engagements, sangeet nights, and special occasions with our hospitality team.</p>
        </div>
      </section>

      <section className={styles.testimonialSliderSection} aria-label="Premium testimonial carousel">
        <div
          className={styles.testimonialSlider}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
          onTouchEnd={onTouchEnd}
        >
          <article className={styles.testimonialHeroCard} aria-live="polite">
            <div className={styles.customerPhoto} aria-hidden="true">{active[0].split(' ').map((word) => word[0]).slice(0, 2).join('')}</div>
            <div>
              <span className={styles.ratingStars} aria-label="Five star rating">★★★★★</span>
              <blockquote>“{active[4]}”</blockquote>
              <div className={styles.testimonialMeta}>
                <strong>{active[0]}</strong>
                <span>{active[1]} · {active[2]} · {active[3]}</span>
              </div>
            </div>
          </article>
          <div className={styles.sliderControls}>
            <button type="button" aria-label="Previous testimonial" onClick={() => goTo(activeIndex - 1)}>‹</button>
            <button type="button" aria-label="Next testimonial" onClick={() => goTo(activeIndex + 1)}>›</button>
          </div>
          <div className={styles.sliderDots} role="tablist" aria-label="Testimonial slides">
            {testimonials.map((item, index) => (
              <button key={item[0]} type="button" className={index === activeIndex ? styles.activeDot : ''} aria-label={`Show testimonial ${index + 1}`} aria-selected={index === activeIndex} onClick={() => goTo(index)} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.googleReviewSection} aria-labelledby="google-review-title">
        <div className={styles.googleSummaryCard}>
          <span className={styles.googleIcon} aria-hidden="true">G</span>
          <p className={styles.eyebrowDark}>Google review style</p>
          <h2 id="google-review-title">4.9★ Overall Family Rating</h2>
          <p>Based on 486+ demo family reviews and celebration experiences.</p>
          <div className={styles.starBars} aria-label="Star distribution">
            {[92, 6, 2, 0, 0].map((width, index) => (
              <div key={index}><span>{5 - index}★</span><i><b style={{ width: `${width}%` }} /></i></div>
            ))}
          </div>
        </div>
        <div className={styles.googleReviewGrid}>
          {googleReviews.map(([name, date, badge, text]) => (
            <article key={name} className={styles.googleReviewCard}>
              <div><strong>{name}</strong><span>{date}</span></div>
              <span className={styles.verifiedBadge}>✓ {badge}</span>
              <span className={styles.ratingStars}>★★★★★</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.videoTestimonialsSection} aria-labelledby="video-testimonials-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Video experiences</p>
          <h2 id="video-testimonials-title">Couples and families sharing their moments</h2>
        </div>
        <div className={styles.videoTestimonialGrid}>
          {videoTestimonials.map(([name, eventType, duration, visual]) => (
            <button key={name} className={styles.videoTestimonialCard} type="button" onClick={() => onPlayVideo([visual, `${name} Testimonial`, duration, `${eventType} family testimonial preview.`])}>
              <span className={`${styles.videoTestimonialVisual} ${styles[visual]}`} aria-hidden="true"><i>▶</i></span>
              <strong>{name}</strong>
              <span>{eventType} · {duration}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.successStoriesSection} aria-labelledby="success-stories-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Client success stories</p>
          <h2 id="success-stories-title">Celebrations planned with detail and emotion</h2>
        </div>
        <div className={styles.storyGrid}>
          {successStories.map(([title, story, guests, theme, visual]) => (
            <article key={title} className={styles.storyCard}>
              <div className={`${styles.storyVisual} ${styles[visual]}`} aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{story}</p>
                <dl><div><dt>Guests</dt><dd>{guests}</dd></div><div><dt>Theme</dt><dd>{theme}</dd></div></dl>
                <Button href="#gallery" variant="secondary">View Gallery</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.socialProofSection} aria-labelledby="social-proof-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Trusted celebration proof</p>
          <h2 id="social-proof-title">Families choose us for confidence and care</h2>
        </div>
        <div className={styles.socialProofGrid}>
          {socialProofCounters.map((item) => <CounterCard key={item.label} item={item} />)}
        </div>
      </section>

      <section className={styles.trustCtaSection} aria-labelledby="trust-cta-title">
        <div>
          <p className={styles.eyebrow}>Real celebration confidence</p>
          <h2 id="trust-cta-title">Join Hundreds of Happy Families</h2>
          <p>Book a venue visit and see why families trust The Grand Royale for life’s biggest celebrations.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#booking-bar">Schedule Venue Visit</Button>
          <Button href={`https://wa.me/${SITE.whatsapp}`} variant="secondary">WhatsApp Chat</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </section>
    </>
  );
}

function MapsQRCode() {
  return <img src={mapsQr} className={styles.mapQrSvg} alt="Scannable QR code for directions to The Grand Royale" />;
}

function MapCard() {
  const [copied, setCopied] = useState(false);
  const copyAddress = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(locationDetails.address);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = locationDetails.address;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className={styles.mapCard} id="map" aria-labelledby="map-card-title">
      <div className={styles.demoMap} role="img" aria-label="Demo map card prepared for Google Maps integration">
        <span className={styles.mapPin} aria-hidden="true">⌖</span>
        <span className={styles.mapRoadOne} aria-hidden="true" />
        <span className={styles.mapRoadTwo} aria-hidden="true" />
        <span className={styles.mapRoadThree} aria-hidden="true" />
        <div className={styles.mapLabel}>
          <strong>The Grand Royale</strong>
          <small>Google Maps-ready demo location</small>
        </div>
      </div>
      <div className={styles.mapCopy}>
        <p className={styles.eyebrowDark}>Google Maps-ready</p>
        <h3 id="map-card-title">Reach the venue with confidence</h3>
        <p>This premium demo uses a safe, responsive map card until the real Google Maps embed or API key is connected. Replace the demo URLs with the final venue location before launch.</p>
        <div className={styles.mapActions}>
          <Button href={locationDetails.mapsUrl}>Open in Google Maps</Button>
          <Button href={locationDetails.directionsUrl} variant="secondary">Get Directions</Button>
          <Button type="button" variant="ghost" onClick={copyAddress}>{copied ? 'Address Copied' : 'Copy Address'}</Button>
        </div>
      </div>
    </article>
  );
}

function LocationExperience() {
  return (
    <>
      <section id="contact" className={styles.locationIntroSection} aria-labelledby="location-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Visit The Grand Royale</p>
          <h2 id="location-title">Experience Our Venue Before Your Celebration</h2>
          <p>Schedule a guided visit and explore our banquet halls, garden lawn, dining pavilion, arrival court, luxury suites, parking flow, and premium hospitality experience.</p>
        </div>
      </section>

      <section className={styles.mapExperienceSection} aria-label="Map and venue directions">
        <div className={styles.mapExperienceLayout}>
          <MapCard />
          <aside className={styles.mapQrCard} aria-labelledby="maps-qr-title">
            <MapsQRCode />
            <p className={styles.eyebrowDark}>Mobile directions</p>
            <h3 id="maps-qr-title">Scan to Open Maps</h3>
            <p>Scan the working QR code to open the prepared venue directions instantly on mobile.</p>
            <Button href={locationDetails.directionsUrl} variant="secondary">Open Directions</Button>
          </aside>
        </div>
      </section>

      <section className={styles.locationInfoSection} aria-labelledby="location-info-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Location information</p>
          <h2 id="location-info-title">Everything guests need before they travel</h2>
        </div>
        <div className={styles.locationInfoGrid}>
          {locationInfoCards.map(([icon, title, value]) => (
            <article key={title} className={styles.locationInfoCard}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.landmarksSection} aria-labelledby="landmarks-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Nearby landmarks</p>
          <h2 id="landmarks-title">Plan guest travel with nearby references</h2>
          <p>These demo landmark estimates help families understand guest movement, hotel planning, and travel convenience.</p>
        </div>
        <div className={styles.landmarkGrid}>
          {nearbyLandmarks.map(([icon, title, distance, time, description]) => (
            <article key={title} className={styles.landmarkCard}>
              <span aria-hidden="true">{icon}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <dl>
                <div><dt>Distance</dt><dd>{distance}</dd></div>
                <div><dt>Travel</dt><dd>{time}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="visit-planning" className={styles.visitPlanningSection} aria-labelledby="visit-planning-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Plan your visit</p>
          <h2 id="visit-planning-title">Choose the best time to explore the venue</h2>
          <p>Visit during daylight to understand space, parking, décor possibilities, guest flow, and dining arrangements clearly.</p>
        </div>
        <div className={styles.visitPlanningGrid}>
          {visitPlanningCards.map(([icon, title, value, description]) => (
            <article key={title} className={styles.visitCard}>
              <span aria-hidden="true">{icon}</span>
              <strong>{value}</strong>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className={styles.visitActions}>
          <Button href="#booking-bar">Schedule Venue Visit</Button>
          <Button href={locationDetails.directionsUrl} variant="secondary">Get Directions</Button>
        </div>
      </section>

      <section className={styles.locationContactSection} aria-labelledby="location-contact-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Direct contact</p>
          <h2 id="location-contact-title">Connect with the booking office</h2>
        </div>
        <div className={styles.locationContactGrid}>
          {locationContactCards.map(([icon, title, value, href]) => (
            <a key={title} className={styles.locationContactCard} href={href}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{value}</p>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.quickActionSection} aria-labelledby="quick-action-title">
        <div>
          <p className={styles.eyebrowDark}>Quick action panel</p>
          <h2 id="quick-action-title">Take the next step instantly</h2>
          <p>Use these fast actions to call, WhatsApp, open directions, book a visit, or send your enquiry without searching around the page.</p>
        </div>
        <div className={styles.quickActionPanel}>
          {quickLocationActions.map(([icon, label, href]) => (
            <a key={label} href={href} className={styles.quickActionButton}>
              <span aria-hidden="true">{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </section>

      <section className={styles.locationCtaSection} aria-labelledby="location-cta-title">
        <div>
          <p className={styles.eyebrow}>Venue visit experience</p>
          <h2 id="location-cta-title">Come Experience The Grand Royale In Person</h2>
          <p>Schedule a guided venue visit and discover why hundreds of families choose us for life&apos;s biggest celebrations.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#booking-bar">Schedule Venue Visit</Button>
          <Button href={locationDetails.mapsUrl} variant="secondary">Open Maps</Button>
          <Button href={`https://wa.me/${SITE.whatsapp}`} variant="ghost">WhatsApp Chat</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </section>
    </>
  );
}

function CounterCard({ item }) {
  const [ref, count] = useCountUp(item.value);
  const display = item.divisor ? (count / item.divisor).toFixed(1) : count.toLocaleString('en-IN');
  return (
    <article ref={ref} className={styles.trustCard}>
      <span className={styles.trustIcon} aria-hidden="true">{item.icon}</span>
      <strong>{display}{item.suffix}</strong>
      <span>{item.label}</span>
    </article>
  );
}

export default function HomePage() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeGalleryCategory, setActiveGalleryCategory] = useState('All');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(-1);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [openPackageFaq, setOpenPackageFaq] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState(initialEnquiryForm);
  const [enquiryErrors, setEnquiryErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [quickBookingOpen, setQuickBookingOpen] = useState(false);
  const [isQuickBookingVisible, setIsQuickBookingVisible] = useState(false);
  const [quickBookingError, setQuickBookingError] = useState('');
  const [quickBooking, setQuickBooking] = useState({
    eventDate: '',
    guests: '300',
    eventType: 'Wedding',
    budget: '₹2L - ₹5L',
  });
  const [packageBuilderSelection, setPackageBuilderSelection] = useState(() => Object.fromEntries(
    packageBuilderOptions.map((group) => [group.label, group.options[0]]),
  ));
  const prefersReducedMotion = useReducedMotion();
  const minimumEventDate = useMemo(() => {
    const now = new Date();
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60_000));
    return localDate.toISOString().split('T')[0];
  }, []);

  const filteredGalleryItems = useMemo(() => (
    activeGalleryCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeGalleryCategory)
  ), [activeGalleryCategory]);

  const closeLightbox = () => setActiveGalleryIndex(-1);
  const showPreviousMoment = () => setActiveGalleryIndex((index) => (index <= 0 ? filteredGalleryItems.length - 1 : index - 1));
  const showNextMoment = () => setActiveGalleryIndex((index) => (index >= filteredGalleryItems.length - 1 ? 0 : index + 1));

  const whatsappEnquiryLink = useMemo(() => buildWhatsAppLink(enquiryForm), [enquiryForm]);
  const enquiryPreview = useMemo(() => buildEnquiryMessage(enquiryForm), [enquiryForm]);

  const validateEnquiry = () => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = enquiryForm.eventDate ? new Date(`${enquiryForm.eventDate}T00:00:00`) : null;

    if (!enquiryForm.fullName.trim()) errors.fullName = 'Please share your full name.';
    if (!/^\+?[0-9\s-]{10,15}$/.test(enquiryForm.phone.trim())) errors.phone = 'Enter a valid phone number.';
    if (enquiryForm.whatsappNumber && !/^\+?[0-9\s-]{10,15}$/.test(enquiryForm.whatsappNumber.trim())) errors.whatsappNumber = 'Enter a valid WhatsApp number.';
    if (enquiryForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email.trim())) errors.email = 'Enter a valid email address.';
    if (!enquiryForm.eventDate) errors.eventDate = 'Please select your event date.';
    if (selectedDate && selectedDate < today) errors.eventDate = 'Please choose today or a future date.';
    if (!enquiryForm.eventType) errors.eventType = 'Please select event type.';
    if (enquiryForm.guests && (Number(enquiryForm.guests) < 20 || Number.isNaN(Number(enquiryForm.guests)))) errors.guests = 'Guest count should be 20 or more.';
    if (!enquiryForm.budgetRange) errors.budgetRange = 'Please select a budget range.';

    setEnquiryErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateEnquiryField = (event) => {
    const { name, value } = event.target;
    setEnquiryForm((current) => ({ ...current, [name]: value }));
    setEnquiryErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    if (validateEnquiry()) {
      setIsSubmittingEnquiry(true);
      trackFormSubmit({ form: 'premium_enquiry', eventType: enquiryForm.eventType, guests: enquiryForm.guests, venue: enquiryForm.preferredVenue });
      window.setTimeout(() => {
        setIsSubmittingEnquiry(false);
        setShowSuccessModal(true);
      }, prefersReducedMotion ? 0 : 420);
    }
  };

  const confirmEnquiry = () => {
    if (!validateEnquiry()) {
      document.getElementById('enquiry')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    setShowSuccessModal(true);
  };

  const quickBookingLink = useMemo(() => {
    const message = `Hello, I want to check venue availability at The Grand Royale.\n\nEvent date: ${quickBooking.eventDate || 'Not selected'}\nGuests: ${quickBooking.guests || 'Not selected'}\nEvent type: ${quickBooking.eventType}\nBudget: ${quickBooking.budget}`;
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
  }, [quickBooking]);

  const packageBuilderLink = useMemo(() => {
    const details = Object.entries(packageBuilderSelection)
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n');
    const message = `Hello, I want a custom celebration quote from The Grand Royale.\n\n${details}\n\nPlease share suitable package options and available dates.`;
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
  }, [packageBuilderSelection]);

  const updateQuickBooking = (event) => {
    const { name, value } = event.target;
    setQuickBooking((current) => ({ ...current, [name]: value }));
    setQuickBookingError('');
  };

  const submitQuickBooking = (event) => {
    event.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = quickBooking.eventDate ? new Date(`${quickBooking.eventDate}T00:00:00`) : null;

    if (!selectedDate) {
      setQuickBookingError('Please select an event date.');
      setQuickBookingOpen(true);
      return;
    }
    if (selectedDate < today) {
      setQuickBookingError('Please choose today or a future date.');
      setQuickBookingOpen(true);
      return;
    }
    if (!quickBooking.guests || Number(quickBooking.guests) < 20) {
      setQuickBookingError('Guest count should be at least 20.');
      setQuickBookingOpen(true);
      return;
    }

    trackFormSubmit({ form: 'quick_availability', ...quickBooking });
    const openedWindow = window.open(quickBookingLink, '_blank', 'noopener,noreferrer');
    if (!openedWindow) window.location.assign(quickBookingLink);
  };

  useEffect(() => {
    trackPageView('/', { page: 'home' });
  }, []);

  useEffect(() => {
    const updateQuickBookingVisibility = () => {
      const revealPoint = Math.min(520, window.innerHeight * 0.65);
      setIsQuickBookingVisible(window.scrollY > revealPoint);
    };
    updateQuickBookingVisibility();
    window.addEventListener('scroll', updateQuickBookingVisibility, { passive: true });
    window.addEventListener('resize', updateQuickBookingVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateQuickBookingVisibility);
      window.removeEventListener('resize', updateQuickBookingVisibility);
    };
  }, []);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll('main section, main article, main form, main .luxury-motion-target'));

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealTargets.forEach((element) => element.classList.add('luxury-revealed'));
      return undefined;
    }

    revealTargets.forEach((element, index) => {
      element.classList.add('luxury-reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 8, 6) * 42}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('luxury-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [prefersReducedMotion, activeGalleryCategory]);

  const handleMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    setTilt({
      x: ((event.clientX / innerWidth) - 0.5) * 14,
      y: ((event.clientY / innerHeight) - 0.5) * 14,
    });
  };

  return (
    <>
      <SEO
        title="The Grand Royale | Luxury Wedding & Banquet Venue"
        description="The Grand Royale is a premium wedding and banquet venue offering luxury banquet halls, garden lawns, decoration themes, catering support, packages and venue visit booking."
        canonical="/"
        openGraphTitle="The Grand Royale | Luxury Wedding & Banquet Venue"
        openGraphDescription="Explore a luxury wedding venue with banquet halls, garden lawn, packages, gallery, booking enquiry, WhatsApp contact and venue visit planning."
        jsonLd={[
          generateLocalBusinessSchema(),
          generateServiceSchema(),
          generateFaqSchema(packageFaqs),
        ]}
      />

      <section id="home" className={styles.hero} aria-labelledby="home-hero-title" onMouseMove={handleMouseMove}>
        <div className={styles.videoLayer} aria-hidden="true">
          <div className={styles.fallbackImage} style={{ backgroundImage: `url(${heroFallback})` }} />
        </div>
        <div className={styles.overlay} />
        <div className={styles.heroGlow} style={{ transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)` }} />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Luxury wedding destination</p>
            <h1 id="home-hero-title">Celebrate Life&apos;s Most Precious Moments in Timeless Elegance</h1>
            <p className={styles.lead}>
              {SITE.name} brings together ceremonial grandeur, warm Indian hospitality, refined décor direction, curated dining support, and thoughtfully planned guest movement for celebrations that feel effortless from arrival to farewell.
            </p>
            <div className={styles.actions}>
              <Button href="#booking-bar" size="lg">Schedule a Venue Visit</Button>
              <Button href="#venues" variant="secondary" size="lg">Explore Celebration Spaces</Button>
              <Button href={`https://wa.me/${SITE.whatsapp}`} variant="ghost" size="lg">Speak on WhatsApp Chat</Button>
            </div>
            <div className={styles.badges} aria-label="Venue trust badges">
              <span>4.9★ Rated</span>
              <span>500+ Weddings</span>
              <span>Premium Hospitality</span>
            </div>
          </div>

          <div className={styles.heroCards} aria-label="Venue quick facts">
            {heroCards.map(([title, value, copy], index) => (
              <article key={title} className={styles.infoCard} style={{ '--delay': `${index * 90}ms` }}>
                <span>{title}</span>
                <strong>{value}</strong>
                <small>{copy}</small>
              </article>
            ))}
          </div>
        </div>

        <a className={styles.scrollIndicator} href="#trust" aria-label="Scroll to trust section">
          <span />
          Scroll
        </a>
      </section>

      <section id="trust" className={styles.trustSection} aria-labelledby="trust-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Trusted for grand celebrations</p>
          <h2 id="trust-title">A venue families trust for once-in-a-lifetime moments</h2>
        </div>
        <div className={styles.trustGrid}>
          {trustItems.map((item) => <CounterCard key={item.label} item={item} />)}
        </div>
      </section>

      <section id="quick-highlights" className={styles.highlightsSection} aria-labelledby="highlights-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Quick highlights</p>
          <h2 id="highlights-title">Everything required for a graceful guest experience</h2>
        </div>
        <div className={styles.highlightScroller}>
          {highlights.map(([title, copy], index) => (
            <article key={title} className={styles.highlightCard} style={{ '--delay': `${index * 70}ms` }}>
              <span aria-hidden="true">✦</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrowDark}>About The Grand Royale</p>
            <h2 id="about-title">A luxury celebration address crafted for unforgettable family moments</h2>
            <p>
              The Grand Royale blends elegant interiors, warm hospitality, modern facilities, and professional event coordination to create weddings and celebrations that feel effortless, graceful, and deeply memorable.
            </p>
            <div className={styles.aboutHighlights}>
              {aboutHighlights.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className={styles.actionsDark}>
              <Button href="#venues">Explore Our Venue Story</Button>
              <Button href="#booking-bar" variant="secondary">Begin Your Celebration Journey</Button>
            </div>
          </div>
          <div className={styles.aboutMedia} aria-label="Luxury venue visual collage">
            <div className={`${styles.imageBlock} ${styles.aboutImagePrimary}`} role="img" aria-label="Grand luxury banquet interior with warm gold lighting" />
            <div className={`${styles.imageBlock} ${styles.aboutImageSecondary}`} role="img" aria-label="Elegant outdoor wedding lawn with premium decoration" />
            <div className={styles.aboutBadge}><strong>15+</strong><span>Years of Hospitality</span></div>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className={styles.whySection} aria-labelledby="why-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Why families choose us</p>
          <h2 id="why-title">Why Choose The Grand Royale</h2>
          <p>Every detail is designed to make the celebration feel premium, organized, safe, and comfortable for every guest.</p>
        </div>
        <div className={styles.whyGrid}>
          {whyChooseUs.map(([icon, title, copy]) => (
            <article key={title} className={styles.featureCard}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="venues" className={styles.venueSection} aria-labelledby="venues-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Venue showcase</p>
          <h2 id="venues-title">Choose the perfect space for every celebration</h2>
        </div>
        <div className={styles.venueGrid}>
          {venues.map((venue) => (
            <article key={venue.name} className={styles.venueCard}>
              <div className={`${styles.venueImage} ${styles[venue.image]}`} role="img" aria-label={`${venue.name} at The Grand Royale`}>
                <span>{venue.capacity}</span>
              </div>
              <div className={styles.venueContent}>
                <p>{venue.type}</p>
                <h3>{venue.name}</h3>
                <small>Best for: {venue.bestFor}</small>
                <p>{venue.description}</p>
                <div className={styles.venueActions}>
                  <Button href="#venues" variant="secondary" size="sm">View Space Details</Button>
                  <Button href="#booking-bar" size="sm">Check Preferred Date</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="facilities" className={styles.facilitiesSection} aria-labelledby="facilities-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Premium facilities</p>
          <h2 id="facilities-title">Modern comfort, elegant service, and complete event support</h2>
        </div>
        <div className={styles.facilityGrid}>
          {facilities.map((facility, index) => (
            <article key={facility} className={`${styles.facilityCard} ${index % 7 === 0 ? styles.facilityWide : ''}`}>
              <span aria-hidden="true">✦</span>
              <h3>{facility}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="events" className={styles.eventsSection} aria-labelledby="events-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Events we host</p>
          <h2 id="events-title">A premium venue for weddings, family functions, and formal gatherings</h2>
        </div>
        <div className={styles.eventsGrid}>
          {events.map(([title, copy, capacity], index) => (
            <article key={title} className={styles.eventCard}>
              <div className={styles.eventVisual} aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
                <small>{capacity}</small>
                <a href="#booking-bar" aria-label={`Plan ${title}`}>Plan This Celebration</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand} aria-labelledby="cta-title">
        <div>
          <p className={styles.eyebrow}>Private venue consultation</p>
          <h2 id="cta-title">Planning a wedding or celebration?</h2>
          <p>Let our event team help you choose the perfect space, guest flow, décor style, and celebration package.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#booking-bar">Schedule a Venue Visit</Button>
          <Button href={`https://wa.me/${SITE.whatsapp}`} variant="secondary">Speak on WhatsApp Chat</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </section>

      <section id="gallery" className={styles.galleryIntroSection} aria-labelledby="gallery-intro-title">
        <div className={styles.galleryIntro}>
          <p className={styles.eyebrowDark}>Our Celebration Gallery</p>
          <h2 id="gallery-intro-title">Moments Crafted With Elegance</h2>
          <p>Explore the visual mood of weddings, receptions, engagements, haldi, mehendi, sangeet, birthdays, corporate events, dining experiences, suites, exterior views, and drone-style celebration moments at The Grand Royale.</p>
          <span className={styles.goldLine} aria-hidden="true" />
          <div className={styles.actionsDark}>
            <Button href="#filterable-gallery">Explore Full Gallery</Button>
            <Button href="#booking-bar" variant="secondary">Schedule a Venue Visit</Button>
          </div>
        </div>
      </section>

      <section id="filterable-gallery" className={styles.gallerySection} aria-labelledby="gallery-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Filterable gallery</p>
          <h2 id="gallery-title">A premium glimpse of every celebration style</h2>
        </div>

        <div className={styles.galleryFilters} aria-label="Gallery categories">
          {galleryCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeGalleryCategory === category ? styles.activeFilter : ''}
              onClick={() => {
                setActiveGalleryCategory(category);
                setActiveGalleryIndex(-1);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.galleryGrid}>
          {filteredGalleryItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.galleryCard} ${styles[item.visual]}`}
              onClick={() => { trackGalleryView({ title: item.title, category: item.category }); setActiveGalleryIndex(index); }}
              aria-label={`View ${item.title}`}
            >
              <span className={styles.galleryImage} role="img" aria-label={item.alt} />
              <span className={styles.galleryOverlay}>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
                <em>View Moment →</em>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="decoration-themes" className={styles.themeSection} aria-labelledby="themes-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Decoration themes</p>
          <h2 id="themes-title">Premium décor concepts for every celebration style</h2>
          <p>Choose a curated visual mood for weddings, receptions, engagements, sangeet nights, and outdoor celebrations.</p>
        </div>
        <div className={styles.themeGrid}>
          {decorationThemes.map(([visual, title, copy, suitedFor, price]) => (
            <article key={title} className={styles.themeCard}>
              <div className={`${styles.themeVisual} ${styles[visual]}`} role="img" aria-label={`${title} decoration concept at The Grand Royale`}>
                <span>{price}</span>
              </div>
              <div className={styles.themeContent}>
                <small>Best suited for: {suitedFor}</small>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Button href="#booking-bar" variant="secondary" size="sm">Explore Theme</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="video-gallery" className={styles.videoGallerySection} aria-labelledby="video-gallery-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Video gallery</p>
          <h2 id="video-gallery-title">Cinematic previews prepared for premium venue storytelling</h2>
          <p>Short visual cards for walkthroughs, décor reveals, dining experiences, drone views, and wedding highlights.</p>
        </div>
        <div className={styles.videoGrid}>
          {videoGallery.map((video) => (
            <button key={video[1]} type="button" className={styles.videoCard} onClick={() => setActiveVideo(video)} aria-label={`Open ${video[1]} preview`}>
              <span className={`${styles.videoThumb} ${styles[video[0]]}`} aria-hidden="true">
                <span className={styles.playButton}>▶</span>
                <em>{video[2]}</em>
              </span>
              <span className={styles.videoCardCopy}>
                <strong>{video[1]}</strong>
                <span>{video[3]}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="virtual-tour" className={styles.virtualTourSection} aria-labelledby="virtual-tour-title">
        <div className={styles.virtualTourGrid}>
          <div className={styles.virtualTourCopy}>
            <p className={styles.eyebrow}>360° virtual tour</p>
            <h2 id="virtual-tour-title">Take a Virtual Walk Through The Grand Royale</h2>
            <p>Families can explore banquet spaces, garden lawn, dining pavilion, bridal suite, and entrance experience before visiting.</p>
            <div className={styles.tourChips} aria-label="Virtual tour areas">
              {tourChips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
            <div className={styles.ctaActions}>
              <Button href="#virtual-tour">Start Virtual Tour</Button>
              <Button href="#booking-bar" variant="secondary">Schedule Physical Visit</Button>
            </div>
          </div>
          <div className={styles.tourVisualPanel} role="img" aria-label="Immersive virtual tour preview for The Grand Royale">
            <div className={styles.tourOrbit} aria-hidden="true" />
            <div className={styles.tourInfoCard}>
              <span>Preview mode</span>
              <strong>360° Experience Ready</strong>
              <p>UI prepared for future real virtual tour integration.</p>
            </div>
          </div>
        </div>
      </section>


      <section id="before-after-showcase" className={styles.beforeAfterSection} aria-labelledby="before-after-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Before & after showcase</p>
          <h2 id="before-after-title">Decoration transformations that turn spaces into celebration stories</h2>
          <p>See how blank venue zones can become elegant wedding, reception, lawn, and dining experiences with thoughtful styling.</p>
        </div>
        <div className={styles.beforeAfterGrid}>
          {beforeAfterShowcase.map((item) => (
            <article key={item.title} className={styles.beforeAfterCard}>
              <div className={styles.beforeAfterVisuals}>
                <div className={`${styles.transformVisual} ${styles[item.beforeVisual]}`} role="img" aria-label={`Before view for ${item.title}`}>
                  <span>Before</span>
                </div>
                <div className={`${styles.transformVisual} ${styles[item.afterVisual]}`} role="img" aria-label={`After view for ${item.title}`}>
                  <span>After</span>
                </div>
              </div>
              <div className={styles.beforeAfterCopy}>
                <h3>{item.title}</h3>
                <p><strong>Before:</strong> {item.before}</p>
                <p><strong>After:</strong> {item.after}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="social-moments" className={styles.socialMomentsSection} aria-labelledby="social-moments-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Social moments</p>
          <h2 id="social-moments-title">Instagram-style celebration moments</h2>
          <p>Short visual moments designed to feel premium on the website and ready for future real Instagram content.</p>
        </div>
        <div className={styles.socialGrid}>
          {socialMoments.map(([visual, caption, category]) => (
            <article key={caption} className={`${styles.socialCard} ${styles[visual]}`}>
              <div className={styles.socialOverlay}>
                <span aria-hidden="true">◎</span>
                <small>{category}</small>
                <p>{caption}</p>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.socialFooter}>
          <Button href="#gallery" variant="secondary">Follow Our Celebrations</Button>
        </div>
      </section>

      <section className={styles.mediaCtaBand} aria-labelledby="media-cta-title">
        <div>
          <p className={styles.eyebrow}>Experience it in person</p>
          <h2 id="media-cta-title">Liked what you saw?</h2>
          <p>Visit The Grand Royale and experience the elegance, hospitality, spaces, décor possibilities, and celebration flow in person.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#booking-bar">Schedule a Venue Visit</Button>
          <Button href={`https://wa.me/${SITE.whatsapp}`} variant="secondary">Speak on WhatsApp Chat</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </section>

      <section id="packages" className={styles.packagesSection} aria-labelledby="packages-title">
        <div className={styles.packagesIntro}>
          <p className={styles.eyebrowDark}>Celebration Packages</p>
          <h2 id="packages-title">Curated Packages for Every Grand Occasion</h2>
          <p>Families can choose flexible packages for weddings, receptions, engagements, corporate events, and private celebrations. Each plan is designed to feel premium, organized, and easy to customize around guest count, décor style, dining needs, and event flow.</p>
          <span className={styles.goldLine} aria-hidden="true" />
          <div className={styles.actionsDark}>
            <Button href="#package-cards">Explore Packages</Button>
            <Button href={createWhatsAppPackageLink('Custom Quote')} variant="secondary">Request Tailored Quote</Button>
          </div>
        </div>

        <div id="package-cards" className={styles.packageGrid}>
          {celebrationPackages.map((pkg) => (
            <article key={pkg.name} className={`${styles.packageCard} ${pkg.popular ? styles.popularPackage : ''}`}>
              <div className={styles.packageTopline}>
                <span>{pkg.tag}</span>
                {pkg.popular ? <strong>Most Popular</strong> : null}
              </div>
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <div className={styles.packagePrice}>{pkg.price}</div>
              <dl className={styles.packageMeta}>
                <div>
                  <dt>Best suited for</dt>
                  <dd>{pkg.bestFor}</dd>
                </div>
                <div>
                  <dt>Guest capacity</dt>
                  <dd>{pkg.capacity}</dd>
                </div>
              </dl>
              <ul className={styles.packageInclusions} aria-label={`${pkg.name} inclusions`}>
                {pkg.inclusions.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Button href={createWhatsAppPackageLink(pkg.name)} size="sm">Request Package Guidance</Button>
            </article>
          ))}
        </div>
      </section>


      <section id="package-comparison" className={styles.comparisonSection} aria-labelledby="comparison-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Compare packages</p>
          <h2 id="comparison-title">Choose the celebration plan that fits your family best</h2>
          <p>Compare spaces, hospitality support, décor depth, guest comfort, and premium add-ons before requesting a custom quote.</p>
        </div>

        <div className={styles.comparisonTableWrap} role="region" aria-label="Package comparison table" tabIndex="0">
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {comparisonPackages.map((name) => (
                  <th key={name} scope="col" className={name === 'Gold Wedding' ? styles.bestValueColumn : ''}>
                    {name === 'Gold Wedding' ? <span>Best Value</span> : null}
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageComparisonRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {row.values.map((value, index) => (
                    <td key={`${row.feature}-${comparisonPackages[index]}`} className={comparisonPackages[index] === 'Gold Wedding' ? styles.bestValueCell : ''}>
                      {value === true ? <span className={styles.checkIcon} aria-label="Included">✓</span> : value === false ? <span className={styles.dashIcon} aria-label="Not included">—</span> : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="custom-package-builder" className={styles.builderSection} aria-labelledby="builder-title">
        <div className={styles.builderPanel}>
          <div className={styles.builderCopy}>
            <p className={styles.eyebrow}>Custom package builder</p>
            <h2 id="builder-title">Build Your Own Package</h2>
            <p>Select your preferred celebration style, guest count, decoration, dining, rooms, and media support. This preview is prepared for future pricing logic and WhatsApp quote automation.</p>
          </div>
          <div className={styles.builderGrid}>
            {packageBuilderOptions.map((group) => (
              <fieldset key={group.label} className={styles.builderGroup}>
                <legend>{group.label}</legend>
                <div className={styles.builderChips}>
                  {group.options.map((option) => (
                    <label key={option} className={styles.builderChip}>
                      <input
                        type="radio"
                        name={group.label}
                        value={option}
                        checked={packageBuilderSelection[group.label] === option}
                        onChange={() => setPackageBuilderSelection((current) => ({ ...current, [group.label]: option }))}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <div className={styles.builderFooter}>
            <p>Our event team will review your selected preferences and share a practical custom quote with available dates.</p>
            <Button href={packageBuilderLink} size="lg">Send My Custom Plan</Button>
          </div>
        </div>
      </section>


      <section id="package-benefits" className={styles.packageBenefitsSection} aria-labelledby="package-benefits-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Package confidence</p>
          <h2 id="package-benefits-title">Why families prefer a curated venue package</h2>
          <p>Packages make planning easier by combining venue access, decoration guidance, dining support, guest comfort, and professional coordination into one organized celebration experience.</p>
        </div>
        <div className={styles.packageBenefitGrid}>
          {packageBenefits.map((benefit) => (
            <article key={benefit.title} className={styles.packageBenefitCard}>
              <span aria-hidden="true">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="package-inclusions" className={styles.packageInclusionsSection} aria-labelledby="package-inclusions-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>What&apos;s included</p>
          <h2 id="package-inclusions-title">Everything required for a polished celebration experience</h2>
          <p>From venue access and décor support to guest seating, rooms, lighting, security, and coordination, every inclusion is designed to reduce pressure on the family.</p>
        </div>
        <div className={styles.inclusionCardGrid}>
          {packageInclusionCards.map(([title, description]) => (
            <article key={title} className={styles.inclusionCard}>
              <span aria-hidden="true">✦</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="package-addons" className={styles.packageAddonsSection} aria-labelledby="package-addons-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Optional add-on services</p>
          <h2 id="package-addons-title">Enhance your celebration with luxury upgrades</h2>
          <p>Choose additional experiences for décor, media, hospitality, entertainment, guest comfort, and premium arrival moments.</p>
        </div>
        <div className={styles.addonGrid}>
          {packageAddOns.map(([visual, title, description]) => (
            <article key={title} className={styles.addonCard}>
              <div className={`${styles.addonVisual} ${styles[visual]}`} role="img" aria-label={`${title} visual concept`}>
                <span>Available as Add-on</span>
              </div>
              <div className={styles.addonCopy}>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="brochure" className={styles.brochureSection} aria-labelledby="brochure-title">
        <div className={styles.brochureCard}>
          <div className={styles.brochureMock} aria-hidden="true">
            <div className={styles.brochureCover}>
              <span>The Grand Royale</span>
              <strong>Luxury Venue Brochure</strong>
              <em>Packages • Facilities • Gallery • Booking</em>
            </div>
          </div>
          <div className={styles.brochureCopy}>
            <p className={styles.eyebrowDark}>Luxury brochure</p>
            <h2 id="brochure-title">Download Our Luxury Venue Brochure</h2>
            <p>Visitors can view venue details, facilities, packages, gallery highlights, decoration themes, and booking information. The PDF file can be connected later, so this button shows a polished coming-soon experience instead of a broken download.</p>
            <div className={styles.actionsDark}>
              <Button type="button" onClick={() => setShowBrochureModal(true)}>Download Brochure</Button>
              <Button href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello, please share The Grand Royale luxury venue brochure with package details.')}`} variant="secondary">Request Digital Brochure</Button>
            </div>
          </div>
        </div>
      </section>

      <span id="faq" className={styles.anchorOffset} aria-hidden="true" />
      <section id="package-faq" className={styles.packageFaqSection} aria-labelledby="package-faq-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Package FAQ</p>
          <h2 id="package-faq-title">Clear answers before you enquire</h2>
          <p>Simple package guidance so families can understand customization, catering, rooms, parking, advance booking, and venue visit options.</p>
        </div>
        <div className={styles.faqList}>
          {packageFaqs.map(([question, answer], index) => {
            const isOpen = openPackageFaq === index;
            return (
              <article key={question} className={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`package-faq-${index}`}
                    onClick={() => setOpenPackageFaq(isOpen ? -1 : index)}
                  >
                    <span>{question}</span>
                    <strong aria-hidden="true">{isOpen ? '−' : '+'}</strong>
                  </button>
                </h3>
                <div id={`package-faq-${index}`} className={styles.faqPanel} hidden={!isOpen}>
                  <p>{answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="package-terms" className={styles.packageTermsSection} aria-labelledby="package-terms-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Package terms</p>
          <h2 id="package-terms-title">Professional booking guidance for smooth planning</h2>
          <p>These demo terms help visitors understand how advance booking, access timing, vendor policy, extra guests, and event rules are generally handled.</p>
        </div>
        <div className={styles.termsGrid}>
          {packageTerms.map(([title, description]) => (
            <article key={title} className={styles.termCard}>
              <span aria-hidden="true">◈</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.finalPackageCta} aria-labelledby="final-package-cta-title">
        <div>
          <p className={styles.eyebrow}>Complete package guidance</p>
          <h2 id="final-package-cta-title">Let&apos;s Create a Celebration Your Family Will Remember Forever.</h2>
          <p>Share your date, guest count, venue preference, and celebration style. Our event team will help you choose the right package and next visit slot.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#booking-bar">Schedule Venue Visit</Button>
          <Button href={createWhatsAppPackageLink('Event Expert Consultation')} variant="secondary">Speak With Our Event Team</Button>
          <Button href={`https://wa.me/${SITE.whatsapp}`} variant="ghost">Speak on WhatsApp Chat</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </section>



      <span id="booking" className={styles.anchorOffset} aria-hidden="true" />
      <section id="enquiry" className={styles.enquiryIntroSection} aria-labelledby="enquiry-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Premium enquiry</p>
          <h2 id="enquiry-title">Let&apos;s Begin Your Celebration Journey</h2>
          <p>Our event specialists will help you choose the perfect venue, package and decoration according to your celebration.</p>
          <div className={styles.actionsDark}>
            <Button href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello, I want to talk to an event expert for my celebration at The Grand Royale.')}`}>Speak With Our Event Team</Button>
            <Button href={whatsappEnquiryLink} variant="secondary">Speak on WhatsApp Chat</Button>
          </div>
        </div>
      </section>

      <section className={styles.enquirySection} aria-labelledby="enquiry-form-title">
        <div className={styles.enquiryLayout}>
          <form className={styles.enquiryFormCard} onSubmit={submitEnquiry} noValidate>
            <div className={styles.formHeading}>
              <p className={styles.eyebrowDark}>Share event details</p>
              <h2 id="enquiry-form-title">Premium Enquiry Form</h2>
              <p>Fill the details below and our celebration desk will prepare availability, venue suggestions, and package guidance.</p>
            </div>
            <div className={styles.formGrid}>
              <EnquiryField label="Full Name" name="fullName" value={enquiryForm.fullName} onChange={updateEnquiryField} error={enquiryErrors.fullName} autoComplete="name" required />
              <EnquiryField label="Phone Number" name="phone" type="tel" value={enquiryForm.phone} onChange={updateEnquiryField} error={enquiryErrors.phone} autoComplete="tel" inputMode="tel" required />
              <EnquiryField label="WhatsApp Number" name="whatsappNumber" type="tel" value={enquiryForm.whatsappNumber} onChange={updateEnquiryField} error={enquiryErrors.whatsappNumber} autoComplete="tel" inputMode="tel" />
              <EnquiryField label="Email Address" name="email" type="email" value={enquiryForm.email} onChange={updateEnquiryField} error={enquiryErrors.email} autoComplete="email" />
              <EnquiryField label="Event Date" name="eventDate" type="date" value={enquiryForm.eventDate} onChange={updateEnquiryField} error={enquiryErrors.eventDate} min={minimumEventDate} required />
              <EnquiryField label="Event Type" name="eventType" value={enquiryForm.eventType} onChange={updateEnquiryField} error={enquiryErrors.eventType} options={enquiryEventTypes} required />
              <EnquiryField label="Expected Guests" name="guests" type="number" value={enquiryForm.guests} onChange={updateEnquiryField} error={enquiryErrors.guests} min="20" inputMode="numeric" />
              <EnquiryField label="Preferred Venue" name="preferredVenue" value={enquiryForm.preferredVenue} onChange={updateEnquiryField} error={enquiryErrors.preferredVenue} options={enquiryVenueOptions} />
              <EnquiryField label="Budget Range" name="budgetRange" value={enquiryForm.budgetRange} onChange={updateEnquiryField} error={enquiryErrors.budgetRange} options={enquiryBudgetOptions} />
              <EnquiryField label="City" name="city" value={enquiryForm.city} onChange={updateEnquiryField} error={enquiryErrors.city} />
              <EnquiryField label="Special Requirements" name="requirements" value={enquiryForm.requirements} onChange={updateEnquiryField} error={enquiryErrors.requirements} as="textarea" />
              <EnquiryField label="Message" name="message" value={enquiryForm.message} onChange={updateEnquiryField} error={enquiryErrors.message} as="textarea" />
            </div>
            <div className={styles.formActions}>
              <Button type="submit" isLoading={isSubmittingEnquiry}>{isSubmittingEnquiry ? 'Sending Enquiry...' : 'Send Celebration Enquiry'}</Button>
              <Button href={whatsappEnquiryLink} variant="secondary">Share on WhatsApp Chat</Button>
            </div>
          </form>

          <aside className={styles.enquirySidePanel} aria-label="Generated WhatsApp enquiry preview">
            <div className={styles.whatsappPreviewCard}>
              <span aria-hidden="true" className={styles.whatsappIcon}>WA</span>
              <p className={styles.eyebrowDark}>Auto WhatsApp message</p>
              <h3>Professional enquiry preview</h3>
              <pre>{enquiryPreview}</pre>
              <Button href={whatsappEnquiryLink}>Share on WhatsApp Chat</Button>
            </div>
            <QRCodeCard whatsappLink={whatsappEnquiryLink} />
          </aside>
        </div>
      </section>


      <BookingTimeline />

      <section className={styles.bookingReviewSection} aria-labelledby="booking-review-title">
        <div className={styles.bookingReviewLayout}>
          <div className={styles.bookingReviewCopy}>
            <p className={styles.eyebrowDark}>Booking review</p>
            <h2 id="booking-review-title">Review your celebration enquiry before sharing it</h2>
            <p>Use this premium review area to confirm your contact, event, guest count, venue preference, budget, and special requirements. If anything needs changing, return to the enquiry form and edit it before sending.</p>
            <ConfirmationPreview onConfirm={confirmEnquiry} />
          </div>
          <EnquiryReviewPanel form={enquiryForm} whatsappLink={whatsappEnquiryLink} onConfirm={confirmEnquiry} />
        </div>
      </section>

      <BookingNextSteps />
      <BookingTrustSection />
      <PremiumSupportPanel />

      <section className={styles.finalBookingCta} aria-labelledby="final-booking-cta-title">
        <div>
          <p className={styles.eyebrow}>Complete booking experience</p>
          <h2 id="final-booking-cta-title">Let&apos;s Make Your Celebration Truly Unforgettable</h2>
          <p>Book a venue visit, confirm your enquiry, or speak with the event team now. The next step should feel simple, clear, and premium.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#booking-bar">Schedule Venue Visit</Button>
          <Button type="button" variant="secondary" onClick={confirmEnquiry}>Confirm Celebration Enquiry</Button>
          <Button href={whatsappEnquiryLink} variant="ghost">WhatsApp Chat</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        </div>
      </section>

      <TestimonialsSection onPlayVideo={setActiveVideo} />

      <section className={styles.callbackCta} aria-labelledby="callback-title">
        <div>
          <p className={styles.eyebrow}>Immediate assistance</p>
          <h2 id="callback-title">Need Immediate Assistance?</h2>
          <p>Call, WhatsApp, email, or request a callback from our celebration desk for quick availability and package guidance.</p>
        </div>
        <div className={styles.ctaActions}>
          <Button href="#enquiry">Request Callback</Button>
          <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="secondary">Call Celebration Desk</Button>
          <Button href={whatsappEnquiryLink} variant="ghost">WhatsApp Chat</Button>
          <Button href={`mailto:${SITE.email}`} variant="ghost">Email Us</Button>
        </div>
      </section>

      <section className={styles.contactCardsSection} aria-labelledby="contact-cards-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrowDark}>Contact information</p>
          <h2 id="contact-cards-title">Every way to connect with The Grand Royale</h2>
        </div>
        <div className={styles.contactCardGrid}>
          {contactCards.map(([icon, title, value, href]) => (
            <a key={title} className={styles.contactCard} href={href}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{value}</p>
            </a>
          ))}
        </div>
      </section>

      <span id="location" className={styles.anchorOffset} aria-hidden="true" />
      <LocationExperience />

      {showSuccessModal ? <SuccessModal onClose={() => setShowSuccessModal(false)} whatsappLink={whatsappEnquiryLink} /> : null}

      {showBrochureModal ? (
        <div className={styles.brochureModal} role="dialog" aria-modal="true" aria-labelledby="brochure-modal-title" onMouseDown={() => setShowBrochureModal(false)}>
          <div className={styles.brochureModalPanel} onMouseDown={(event) => event.stopPropagation()}>
            <button className={styles.brochureModalClose} type="button" aria-label="Close brochure message" onClick={() => setShowBrochureModal(false)}>×</button>
            <span className={styles.brochureModalIcon} aria-hidden="true">✦</span>
            <h2 id="brochure-modal-title">Brochure Download Coming Soon</h2>
            <p>The PDF brochure is not attached yet, so the website is safely avoiding a broken download link. Visitors can request the brochure on WhatsApp instead.</p>
            <div className={styles.actionsDark}>
              <Button href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello, please send me The Grand Royale luxury venue brochure.')}`}>Request Digital Brochure</Button>
              <Button type="button" variant="secondary" onClick={() => setShowBrochureModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      ) : null}

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      <GalleryLightbox
        items={filteredGalleryItems}
        activeIndex={activeGalleryIndex}
        onClose={closeLightbox}
        onPrevious={showPreviousMoment}
        onNext={showNextMoment}
      />

      <form
        id="booking-bar"
        className={`${styles.bookingBar} ${(isQuickBookingVisible || quickBookingOpen) ? styles.bookingBarVisible : ''} ${quickBookingOpen ? styles.bookingBarOpen : ''}`}
        aria-label="Quick availability checker"
        onSubmit={submitQuickBooking}
      >
        <button
          type="button"
          className={styles.bookingBarToggle}
          aria-expanded={quickBookingOpen}
          aria-controls="quick-booking-fields"
          onClick={() => setQuickBookingOpen((current) => !current)}
        >
          <span>Check venue availability</span>
          <strong>{quickBookingOpen ? 'Close' : 'Open'}</strong>
        </button>
        <div id="quick-booking-fields" className={styles.bookingBarFields}>
        <label>
          <span>Event Date</span>
          <input name="eventDate" type="date" min={minimumEventDate} value={quickBooking.eventDate} onChange={updateQuickBooking} required />
        </label>
        <label>
          <span>Guests</span>
          <input name="guests" type="number" min="20" inputMode="numeric" value={quickBooking.guests} onChange={updateQuickBooking} required />
        </label>
        <label>
          <span>Event Type</span>
          <select name="eventType" value={quickBooking.eventType} onChange={updateQuickBooking}>
            <option>Wedding</option>
            <option>Engagement</option>
            <option>Reception</option>
            <option>Corporate Event</option>
          </select>
        </label>
        <label>
          <span>Budget</span>
          <select name="budget" value={quickBooking.budget} onChange={updateQuickBooking}>
            <option>₹1L - ₹2L</option>
            <option>₹2L - ₹5L</option>
            <option>₹5L+</option>
          </select>
        </label>
        <Button type="submit">Check Preferred Date</Button>
        <Button href={quickBookingLink} variant="secondary">WhatsApp Chat</Button>
        <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="ghost">Call Celebration Desk</Button>
        {quickBookingError ? <p className={styles.bookingBarError} role="alert">{quickBookingError}</p> : null}
        </div>
      </form>

      <div className={styles.floatingActions} aria-label="Quick contact actions">
        <a className={styles.whatsapp} href={`https://wa.me/${SITE.whatsapp}`} aria-label="Speak on WhatsApp">WA</a>
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} aria-label="Call venue">☎</a>
        <a href="#main-content" aria-label="Scroll to top">↑</a>
      </div>
      <div className={styles.progress} aria-hidden="true" />
    </>
  );
}
