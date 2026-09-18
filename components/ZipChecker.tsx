'use client';

import { useId, useState, type FormEvent } from 'react';
import { hero, serviceableZips } from '@/lib/content';

type Status = 'idle' | 'invalid' | 'serviceable' | 'unknown';

/**
 * Front-end availability check.
 *
 * Matches the entered ZIP against the published service footprint held in
 * lib/content.ts. There is no network request and no data leaves the browser;
 * the result routes the visitor to a call either way.
 */
export default function ZipChecker() {
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const inputId = useId();
  const messageId = `${inputId}-message`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = zip.trim();

    if (!/^\d{5}$/.test(value)) {
      setStatus('invalid');
      return;
    }
    setStatus(serviceableZips.includes(value) ? 'serviceable' : 'unknown');
  }

  const message =
    status === 'invalid'
      ? hero.zip.invalid
      : status === 'serviceable'
        ? hero.zip.serviceable
        : status === 'unknown'
          ? hero.zip.unknown
          : null;

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor={inputId}
          className="block font-display text-sm font-semibold text-ivory"
        >
          {hero.zip.label}
        </label>

        {/* One continuous pill on wider screens, stacked below 640px so the
            input never has to share 320px with the button. */}
        <div className="mt-3 flex flex-col gap-2 rounded-2xl bg-ivory p-2 shadow-lg sm:flex-row sm:items-center sm:rounded-full">
          <input
            id={inputId}
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder={hero.zip.placeholder}
            value={zip}
            aria-describedby={message ? messageId : undefined}
            aria-invalid={status === 'invalid'}
            onChange={(event) => {
              setZip(event.target.value.replace(/\D/g, '').slice(0, 5));
              if (status !== 'idle') setStatus('idle');
            }}
            className="w-full min-w-0 rounded-xl bg-transparent px-4 py-3 text-base text-slate-ink outline-none placeholder:text-slate-ink/45 sm:flex-1 sm:rounded-full sm:px-5"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-sprout px-7 py-3 font-display text-base font-bold text-navy-dark transition-colors duration-200 hover:bg-sun active:bg-sun sm:rounded-full"
          >
            {hero.zip.button}
          </button>
        </div>
      </form>

      <p
        id={messageId}
        role="status"
        aria-live="polite"
        /* ivory/85 rather than /65: at /65 this line measured 4.41:1 over the
           hero photograph, just under the 4.5:1 AA needs for body text. */
        className={`text-on-media mt-3 max-w-lg text-sm leading-relaxed ${
          status === 'invalid' ? 'text-sun' : 'text-ivory/85'
        }`}
      >
        {message ?? hero.zip.helper}
      </p>
    </div>
  );
}
