import { SITE } from './site.js';

export const seoConfig = Object.freeze({
  siteName: SITE.name,
  defaultTitle: SITE.fullName,
  titleTemplate: `%s | ${SITE.name}`,
  defaultDescription: SITE.description,
  canonicalUrl: SITE.url,
  defaultImage: `${SITE.url}${SITE.ogImage}`,
  twitterCard: 'summary_large_image',
  business: {
    name: SITE.fullName,
    phone: SITE.phone,
    email: SITE.email,
    address: SITE.address,
    serviceArea: SITE.serviceArea,
    socialLinks: SITE.socialLinks,
  },
});

export const sitemapEntries = Object.freeze([
  '/',
  '/#about',
  '/#venues',
  '/#gallery',
  '/#packages',
  '/#booking',
  '/#testimonials',
  '/#faq',
  '/#location',
  '/#contact',
]);
