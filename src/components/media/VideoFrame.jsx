export default function VideoFrame({ src, poster, className, label = 'Venue video' }) {
  if (!src) return null;
  return (
    <video
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
