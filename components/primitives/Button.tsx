import Link from 'next/link';

type Variant = 'primary' | 'ghost' | 'light';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

const base =
  'group inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-all duration-500 ease-expo active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink-soft',
  light: 'bg-paper text-ink hover:bg-white',
  ghost: 'border border-ink/25 text-ink hover:border-ink/60',
};

const iconWrap: Record<Variant, string> = {
  primary: 'bg-paper/15 text-paper',
  light: 'bg-ink/10 text-ink',
  ghost: 'bg-ink/10 text-ink',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${iconWrap[variant]}`}
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </Link>
  );
}
