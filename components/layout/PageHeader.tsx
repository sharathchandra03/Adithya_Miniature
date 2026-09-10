import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="relative overflow-hidden bg-ink pb-16 pt-36 text-paper sm:pt-44">
      <div className="draft-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/45">
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.href ? (
                    <Link href={c.href} className="link-underline hover:text-brass">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-paper/70">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <span className="text-paper/30">/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-display-lg">{title}</h1>
        {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-paper/70">{intro}</p>}
      </div>
    </header>
  );
}
