import { SITE } from '../constants/site.js';

const absoluteUrl = (path = '') => {
  if (!path) return SITE.url;
  if (path.startsWith('http')) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
};

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EventVenue'],
    name: SITE.fullName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: absoluteUrl(SITE.ogImage),
    priceRange: SITE.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.coordinates.latitude,
      longitude: SITE.coordinates.longitude,
    },
    openingHours: SITE.openingHours,
    areaServed: SITE.serviceArea.map((area) => ({ '@type': 'City', name: area })),
    sameAs: SITE.socialLinks,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
    makesOffer: [
      'Luxury wedding venue booking',
      'Banquet hall services',
      'Reception venue planning',
      'Decoration theme support',
      'Catering assistance',
      'Venue visit booking',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name,
        provider: { '@type': 'Organization', name: SITE.name },
      },
    })),
  };
}

export function generateServiceSchema() {
  const services = [
    ['Wedding Venue', 'Premium wedding venue with luxury banquet halls, garden lawn, decoration themes, and guest hospitality support.'],
    ['Reception Venue', 'Elegant reception venue for family celebrations, stage moments, dining, and guest flow.'],
    ['Engagement Event Space', 'Refined engagement venue space for ring ceremonies, family dinners, and premium décor setups.'],
    ['Corporate Event Venue', 'Professional event space for conferences, formal dinners, award nights, and business gatherings.'],
    ['Banquet Hall Services', 'Luxury banquet hall services with seating, lighting, event coordination, and venue visit support.'],
    ['Catering Assistance', 'Menu planning and catering support for weddings, receptions, and private celebrations.'],
    ['Decoration Services', 'Theme-led decoration guidance for royal, floral, traditional, modern, and luxury event setups.'],
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE.name} Event Services`,
    itemListElement: services.map(([name, description], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name,
        description,
        provider: {
          '@type': 'LocalBusiness',
          name: SITE.fullName,
          url: SITE.url,
        },
        areaServed: SITE.serviceArea.join(', '),
      },
    })),
  };
}

export function generateFaqSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}
