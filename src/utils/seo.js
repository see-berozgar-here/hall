import { seoConfig } from '../constants/seo.js';

export function buildTitle(title) {
  if (!title) return seoConfig.defaultTitle;
  if (title.includes(seoConfig.siteName)) return title;
  return seoConfig.titleTemplate.replace('%s', title);
}

export function resolveCanonical(path = '/') {
  if (path.startsWith('http')) return path;
  return `${seoConfig.canonicalUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
