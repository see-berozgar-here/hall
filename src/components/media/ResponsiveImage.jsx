import { getImageAlt } from '../../services/assetService.js';

export default function ResponsiveImage({ src, altContext, altDetail, width, height, className, loading = 'lazy' }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={getImageAlt(altContext, altDetail)}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
}
