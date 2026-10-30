export interface MaskIconProps {
  src: string;
  size?: number;
  className?: string;
}

/**
 * Renders a single-color SVG file as a mask filled with `currentColor`,
 * so the icon follows the text color (e.g. white on an active nav item).
 */
export function MaskIcon({ src, size = 18, className = "" }: MaskIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        width: size,
        height: size,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
