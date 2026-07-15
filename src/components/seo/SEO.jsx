import { useEffect, useMemo } from 'react';
import { seoConfig } from '../../constants/seo.js';
import { buildTitle, resolveCanonical } from '../../utils/seo.js';

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });
};

const removeJsonLd = () => {
  document.head.querySelectorAll('script[data-seo-jsonld="true"]').forEach((script) => script.remove());
};

export default function SEO({
  title,
  description = seoConfig.defaultDescription,
  canonical = '/',
  image = seoConfig.defaultImage,
  robots = 'index, follow',
  openGraphTitle,
  openGraphDescription,
  jsonLd = [],
}) {
  const finalTitle = useMemo(() => buildTitle(title), [title]);
  const canonicalUrl = useMemo(() => resolveCanonical(canonical), [canonical]);
  const schemaList = useMemo(() => (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean), [jsonLd]);

  useEffect(() => {
    document.title = finalTitle;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertMeta('meta[name="application-name"]', { name: 'application-name', content: seoConfig.siteName });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: seoConfig.siteName });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: openGraphTitle || finalTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: openGraphDescription || description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: seoConfig.twitterCard });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: openGraphTitle || finalTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: openGraphDescription || description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    removeJsonLd();
    schemaList.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => removeJsonLd();
  }, [canonicalUrl, description, finalTitle, image, openGraphDescription, openGraphTitle, robots, schemaList]);

  return null;
}
