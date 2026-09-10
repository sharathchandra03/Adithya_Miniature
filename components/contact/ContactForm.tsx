'use client';

import { useState } from 'react';
import { BRAND } from '@/lib/products';

/**
 * Accessible contact form. With no backend available, it composes a prefilled
 * email (mailto) — a reliable, dependency-free path that always works. Fields
 * are validated client-side before opening the mail client.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const message = (data.get('message') as string)?.trim();
    const scale = (data.get('scale') as string) || 'Not specified';

    const next: Record<string, string> = {};
    if (!name) next.name = 'Please tell us your name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'A valid email helps us reply.';
    if (!message) next.message = 'Let us know what you have in mind.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterested in: ${scale}\n\n${message}`,
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  };

  const field =
    'w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/35 transition-colors focus:border-brass focus:outline-none';

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
            Name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <p id="err-name" className="mt-1.5 text-xs text-brass-dark">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
          {errors.email && <p id="err-email" className="mt-1.5 text-xs text-brass-dark">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="scale" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
          I&rsquo;m interested in
        </label>
        <select id="scale" name="scale" className={field} defaultValue="">
          <option value="" disabled>Select…</option>
          <option>N Scale</option>
          <option>HO Scale</option>
          <option>G Scale</option>
          <option>Z Scale</option>
          <option>Custom layout</option>
          <option>Waiter-Less Food Delivery Train</option>
          <option>Ride-able train</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
          Message
        </label>
        <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
        {errors.message && <p id="err-message" className="mt-1.5 text-xs text-brass-dark">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-all duration-500 ease-expo hover:bg-ink-soft active:scale-[0.98]"
      >
        Send enquiry
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper/15 transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </button>
    </form>
  );
}
