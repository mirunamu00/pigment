export default function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <svg className="image-placeholder" viewBox="0 0 640 420" role="img" aria-label={alt}>
      <rect className="image-placeholder-bg" x="0" y="0" width="640" height="420" />
      <rect className="image-placeholder-shape" x="60" y="60" width="520" height="40" />
      <rect className="image-placeholder-shape" x="60" y="130" width="150" height="230" />
      <rect className="image-placeholder-shape" x="245" y="130" width="150" height="110" />
      <rect className="image-placeholder-shape" x="430" y="130" width="150" height="230" />
      <rect className="image-placeholder-shape" x="245" y="270" width="150" height="90" />
    </svg>
  );
}
