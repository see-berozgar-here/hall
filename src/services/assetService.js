export const imageFolders = Object.freeze([
  'hero',
  'venue',
  'stage',
  'decoration',
  'events',
  'dining',
  'rooms',
  'gallery',
  'food',
  'facilities',
  'exterior',
  'drone',
  'team',
  'qr',
]);

export function getImageAlt(context, detail = '') {
  return [context, detail].filter(Boolean).join(' - ');
}
