const ANALYTICS_ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

function normalizePayload(payload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );
}

export function trackEvent(eventName, payload = {}) {
  if (!eventName) return;
  if (!ANALYTICS_ENABLED) return;

  const eventPayload = normalizePayload({
    ...payload,
    source: 'the-grand-royale-demo',
    timestamp: new Date().toISOString(),
  });

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventPayload);
  }

  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...eventPayload });
  }
}

export function trackPageView(path = typeof window !== 'undefined' ? window.location.pathname : '/', payload = {}) {
  trackEvent('page_view', { path, ...payload });
}

export function trackWhatsAppClick(payload = {}) {
  trackEvent('whatsapp_click', payload);
}

export function trackCallClick(payload = {}) {
  trackEvent('call_click', payload);
}

export function trackFormSubmit(payload = {}) {
  trackEvent('form_submit', payload);
}

export function trackBookingIntent(payload = {}) {
  trackEvent('booking_intent', payload);
}

export function trackGalleryView(payload = {}) {
  trackEvent('gallery_view', payload);
}

export function inferConversionEvent({ href, label, explicitEvent }) {
  if (explicitEvent) return explicitEvent;
  const normalizedHref = String(href || '').toLowerCase();
  const normalizedLabel = String(label || '').toLowerCase();

  if (normalizedHref.includes('wa.me') || normalizedLabel.includes('whatsapp')) return 'whatsapp_click';
  if (normalizedHref.startsWith('tel:') || normalizedLabel.includes('call')) return 'call_click';
  if (normalizedLabel.includes('book') || normalizedLabel.includes('availability')) return 'booking_intent';
  if (normalizedLabel.includes('brochure')) return 'brochure_request';
  if (normalizedLabel.includes('direction') || normalizedLabel.includes('map')) return 'directions_click';
  if (normalizedLabel.includes('gallery') || normalizedLabel.includes('view moment')) return 'gallery_view';
  if (normalizedLabel.includes('enquire') || normalizedLabel.includes('enquiry')) return 'enquiry_click';
  return null;
}
