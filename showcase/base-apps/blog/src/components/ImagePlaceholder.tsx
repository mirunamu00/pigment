export default function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <svg className="image-placeholder" viewBox="0 0 640 320" role="img" aria-label={alt}>
      <rect className="image-placeholder-bg" x="0" y="0" width="640" height="320" />
      <circle className="image-placeholder-shape" cx="220" cy="120" r="36" />
      <path className="image-placeholder-shape" d="M120 260 L260 150 L360 230 L440 170 L540 260 Z" />
    </svg>
  );
}
