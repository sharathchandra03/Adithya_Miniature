import Link from 'next/link';
import Button from '@/components/primitives/Button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-paper">
      <div className="draft-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative text-center">
        <p className="eyebrow">Error 404 · Off the rails</p>
        <h1 className="mx-auto mt-6 max-w-2xl font-display text-display-lg">
          This track doesn&rsquo;t connect.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-paper/70">
          The page you were looking for has been re-routed. Let&rsquo;s get you back on the main line.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/" variant="light">Back home</Button>
          <Link
            href="/collection"
            className="rounded-full border border-paper/25 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-paper/60"
          >
            The collection
          </Link>
        </div>
      </div>
    </section>
  );
}
