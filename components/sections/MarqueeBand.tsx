import Marquee from '@/components/primitives/Marquee';

export default function MarqueeBand() {
  const words = ['Locomotives', 'Layouts', 'Wagons', 'Coaches', 'Tracks', 'Scenery', 'Custom builds'];
  return (
    <section className="relative overflow-hidden border-y border-paper/10 bg-ink py-10 text-paper" aria-hidden="true">
      <Marquee items={words} />
    </section>
  );
}
