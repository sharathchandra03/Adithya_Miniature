'use client';

interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
}

export default function Marquee({ items, className = '', reverse = false }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex shrink-0 animate-marquee items-center gap-10 pr-10 motion-reduce:animate-none"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl md:text-4xl text-paper/85">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          </span>
        ))}
      </div>
    </div>
  );
}
