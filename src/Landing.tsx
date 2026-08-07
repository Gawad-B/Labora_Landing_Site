import { useEffect, useState } from 'react';
import { COPY, MOCK_ROWS, type Lang } from './copy.js';
import { useReveal } from './useReveal.js';
import { useActiveSection } from './useActiveSection.js';

/**
 * Labora marketing page.
 *
 * Design tokens are inlined as Tailwind arbitrary values, per the handoff, so
 * the file carries its own look and needs no theme. The rules worth keeping:
 * one accent colour, borders are always 1px hairlines, the only radius is 3px
 * on buttons, and section 03 is the single dark band.
 *
 * This page is deliberately isolated from the application: no API, no auth, no
 * shared code. It is published on the open internet; Labora itself runs on a
 * machine inside a laboratory.
 */

/* ---- contact ------------------------------------------------------------ */

const CONTACT = {
  email: 'abdelrahman.gawad.28@gmail.com',
  // Display carries spaces for legibility; the hrefs must not.
  phone: '+20 102 732 1793',
  phoneHref: '+201027321793',
  whatsapp: '+20 102 732 1793',
  whatsappHref: '201027321793', // wa.me — no plus
  portfolio: 'gawad-b.github.io',
  portfolioHref: 'https://gawad-b.github.io',
};

/**
 * Cairo's current UTC offset, resolved in the visitor's browser.
 *
 * Egypt reintroduced daylight saving in 2023, so the country is GMT+3 through
 * the summer and GMT+2 through the winter. Writing either one into the page
 * makes it wrong for half the year; asking Intl for the Africa/Cairo offset
 * keeps it correct without anyone remembering to change it.
 */
function cairoOffset(): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Cairo',
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date());
    const name = parts.find((part) => part.type === 'timeZoneName')?.value;
    if (name && /GMT[+-]\d/.test(name)) return name;
  } catch {
    // Intl without shortOffset support: fall through to the winter value
    // rather than showing nothing.
  }
  return 'GMT+2';
}

function hrefFor(key: string): string | undefined {
  switch (key) {
    case 'email':
      return `mailto:${CONTACT.email}`;
    case 'phone':
      return `tel:${CONTACT.phoneHref}`;
    case 'whatsapp':
      return `https://wa.me/${CONTACT.whatsappHref}`;
    case 'portfolio':
      return CONTACT.portfolioHref;
    // "Based in" is plain text: a row with no href renders unlinked.
    default:
      return undefined;
  }
}

function valueFor(key: string, lang: Lang): string {
  switch (key) {
    case 'email':
      return CONTACT.email;
    case 'phone':
      return CONTACT.phone;
    case 'whatsapp':
      return CONTACT.whatsapp;
    case 'portfolio':
      return CONTACT.portfolio;
    default:
      return `${COPY[lang].contact.city} · ${cairoOffset()}`;
  }
}

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. `as` keeps the markup honest — a grid cell must stay a direct child of
 * its grid, so it renders the wrapper as the cell itself rather than nesting a
 * div inside it.
 */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, className: motion } = useReveal<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={`${motion} ${className}`}>
      {children}
    </div>
  );
}

/** The bilingual monogram: Latin L and Arabic ل in one stroke. */
function Mark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={9}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Labora"
    >
      <path d="M31 14 V46" />
      <path d="M31 46 H49" />
      <path d="M31 46 C31 57.5 21.5 59.5 14 52" />
    </svg>
  );
}

function Eyebrow({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode;
  tone?: 'muted' | 'teal' | 'cyan';
}) {
  const color =
    tone === 'teal' ? 'text-[#1f5f66]' : tone === 'cyan' ? 'text-[#4fb3bd]' : 'text-[#8a8f8c]';
  return (
    <div className={`font-mono text-[11px] uppercase tracking-[0.16em] ${color}`}>{children}</div>
  );
}

const NAV_ITEMS = [
  { id: 'what', label: 'what' },
  { id: 'queues', label: 'workflow' },
  { id: 'safety', label: 'safety' },
  { id: 'running', label: 'running' },
] as const;

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

function Header({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  const t = COPY[lang];
  const active = useActiveSection(NAV_IDS);
  const wordmark = lang === 'ar' ? 'لابورا' : 'Labora';
  return (
    <header className="sticky top-0 z-20 border-b border-[#e8eae9] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a
          href="#hero"
          className="flex items-center gap-2.5 text-[#1f5f66] transition-opacity duration-200 hover:opacity-80"
        >
          <Mark className="h-6 w-6 shrink-0" />
          <span
            className={`text-lg font-semibold tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {wordmark}
          </span>
        </a>

        {/* Nav links are hidden on phones; the mark and the CTA are enough. */}
        <nav className="hidden items-center gap-6 text-[14px] text-[#55595a] md:flex lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const current = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={`relative py-1 transition-colors duration-300 hover:text-[#1a1d1f] ${
                  current ? 'text-[#1f5f66]' : ''
                }`}
              >
                {t.nav[item.label]}
                {/* A hairline that grows from the centre — the only moving part,
                    and it uses the accent rather than adding a colour. */}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-[#1f5f66] transition-transform duration-300 ease-out ${
                    current ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className={`border-b border-[#c9cfcd] pb-0.5 text-[13px] text-[#55595a] transition-colors duration-200 hover:text-[#1a1d1f] ${
              lang === 'en' ? 'font-arabic' : ''
            }`}
          >
            {t.langToggle}
          </button>
          <a
            href="#contact"
            className="rounded-[3px] bg-[#1f5f66] px-4 py-2 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#16474d]"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

const FLAG_STYLES: Record<string, string> = {
  LOW: 'bg-[#fdf3e3] text-[#8a5b12]',
  HIGH: 'bg-[#fbeceb] text-[#8f2c22]',
};

/** Static illustration. Never wired to the API, never a real patient. */
function ResultMock({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <figure className="border border-[#e3e5e3] bg-white">
      <figcaption className="flex items-center justify-between border-b border-[#eceeec] px-5 py-3">
        <Eyebrow>{t.mock.caption}</Eyebrow>
        <Mark className="h-4 w-4 text-[#b8bcba]" />
      </figcaption>
      {/* The table's intrinsic minimum is about 400px, so on a phone it scrolls
          inside its own box. The page body must never scroll sideways. */}
      <div className="overflow-x-auto">
      <table className="w-full min-w-[380px] border-collapse">
        <thead>
          <tr className="border-b border-[#eceeec] text-start">
            <th className="px-5 py-2.5 text-start font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8f8c]">
              {t.mock.columns.test}
            </th>
            <th className="px-5 py-2.5 text-start font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8f8c]">
              {t.mock.columns.result}
            </th>
            <th className="px-5 py-2.5 text-start font-mono text-[10px] uppercase tracking-[0.12em] text-[#8a8f8c]">
              {t.mock.columns.range}
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_ROWS.map((row) => (
            <tr key={row.test} className="border-b border-[#f0f2f0] last:border-b-0">
              <td className="px-5 py-3 text-[14px] text-[#1a1d1f]" dir="auto">
                {lang === 'ar' ? row.testAr : row.test}
              </td>
              {/* Numbers, units and ranges stay left-to-right inside an Arabic
                  page, or "13.5 – 17.5" prints reversed. */}
              <td className="px-5 py-3 text-start" dir="ltr">
                <span className="font-mono text-[14px] text-[#1a1d1f]">{row.value}</span>
                <span className="ms-1.5 font-mono text-[11px] text-[#8a8f8c]">{row.unit}</span>
                {row.flag && (
                  <span
                    className={`ms-2 px-1.5 py-px font-mono text-[10px] ${FLAG_STYLES[row.flag]}`}
                  >
                    {row.flag}
                  </span>
                )}
              </td>
              <td
                className="px-5 py-3 text-start font-mono text-[12px] text-[#55595a]"
                dir="ltr"
              >
                {row.range}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="border-t border-[#eceeec] px-5 py-3 text-[11px] text-[#8a8f8c]" dir="auto">
        {t.mock.note}
      </div>
    </figure>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="hero" className="border-b border-[#e8eae9]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-[52px] px-5 pb-[72px] pt-16 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-[72px] lg:pb-[88px] lg:pt-24">
        <div className="flex flex-col items-start gap-[22px] lg:gap-[26px]">
          <Eyebrow tone="teal">{t.hero.eyebrow}</Eyebrow>
          <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] [text-wrap:balance] sm:text-[42px] lg:text-[54px] lg:leading-[1.06]">
            {t.hero.h1}
          </h1>
          <p className="max-w-[32em] text-base leading-[1.65] text-[#4c5153] [text-wrap:pretty] lg:text-lg">
            {t.hero.body}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-[18px]">
            <a
              href="#contact"
              className="rounded-[3px] bg-[#1f5f66] px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-[#16474d]"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#what"
              className="border-b border-[#c9cfcd] pb-0.5 text-[15px] text-[#55595a] transition-colors duration-200 hover:text-[#1a1d1f]"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 font-mono text-xs text-[#8a8f8c]">
            {t.hero.chips.map((chip) => (
              <span key={chip} dir="auto">
                {chip}
              </span>
            ))}
          </div>
        </div>
        <ResultMock lang={lang} />
      </div>
    </section>
  );
}

function WhatItDoes({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="what" className="border-b border-[#e8eae9] bg-[#fafbfa]">
      <div className="mx-auto max-w-[1120px] px-5 py-[64px] md:px-10 md:py-[84px]">
        <Reveal className="mb-[44px] flex max-w-[620px] flex-col gap-3.5 md:mb-[52px]">
          <Eyebrow>{t.what.eyebrow}</Eyebrow>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] md:text-4xl">
            {t.what.h2}
          </h2>
        </Reveal>
        <div className="grid gap-px border border-[#e3e5e3] bg-[#e3e5e3] md:grid-cols-2 lg:grid-cols-3">
          {t.what.items.map((c, i) => (
            <Reveal
              key={c.title}
              // Stagger across the row, capped so the ninth card is not a
              // second behind the first.
              delay={Math.min(i, 5) * 45}
              className="flex flex-col gap-2.5 bg-white px-[26px] py-7"
            >
              <div className="text-base font-semibold">{c.title}</div>
              <p className="text-sm leading-[1.65] text-[#55595a]">
                {c.body}
                {c.mono && (
                  <>
                    {' '}
                    <span className="font-mono text-[13px]" dir="ltr">
                      {c.mono}
                    </span>
                  </>
                )}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Queues({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="queues" className="border-b border-[#e8eae9]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-[44px] px-5 py-[64px] md:px-10 md:py-[84px] lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
        <div className="flex flex-col gap-3.5 lg:sticky lg:top-24">
          <Eyebrow>{t.queues.eyebrow}</Eyebrow>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] md:text-4xl">
            {t.queues.h2}
          </h2>
          <p className="mt-2 text-base leading-[1.7] text-[#4c5153] [text-wrap:pretty]">
            {t.queues.body}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 border border-[#e3e5e3] px-7 py-[30px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#1f5f66] px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                {t.queues.orders.tag}
              </span>
              <span className="text-[13px] text-[#8a8f8c]">{t.queues.orders.who}</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#4c5153]">{t.queues.orders.body}</p>
          </div>

          <div className="flex flex-col gap-3 border border-[#e3e5e3] px-7 py-[30px]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#1a1d1f] px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                {t.queues.worklist.tag}
              </span>
              <span className="text-[13px] text-[#8a8f8c]">{t.queues.worklist.who}</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#4c5153]">
              {t.queues.worklist.body}{' '}
              <span className="font-mono text-[13px] text-[#8a5b12]">
                {t.queues.worklist.flag}
              </span>
              .
            </p>
          </div>

          {/* Accent hairline on the leading edge — logical, so it mirrors. */}
          <div className="border border-[#e3e5e3] border-s-[3px] border-s-[#1f5f66] bg-[#fafbfa] px-7 py-[26px]">
            <p className="text-[15px] leading-[1.7] text-[#4c5153]">{t.queues.pull}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The single dark band, and the one pull-quote. */
function Safety({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="safety" className="border-b border-[#e8eae9] bg-[#16191c] text-[#f2f4f3]">
      <div className="mx-auto max-w-[1120px] px-5 py-[64px] md:px-10 md:py-[84px]">
        <Reveal className="mb-[44px] grid max-w-[900px] grid-cols-1 gap-3.5 md:mb-[52px]">
          <Eyebrow tone="cyan">{t.safety.eyebrow}</Eyebrow>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white md:text-4xl">
            {t.safety.h2}
          </h2>
          <p className="mt-2 max-w-[46em] text-base leading-[1.7] text-[#b6bfbd] [text-wrap:pretty]">
            {t.safety.body}
          </p>
        </Reveal>

        <Reveal delay={120}>
        <blockquote className="mb-[44px] border-s-[3px] border-s-[#4fb3bd] ps-6 text-[22px] font-medium leading-[1.4] tracking-[-0.02em] text-white md:text-[26px]">
          {t.safety.quote}
        </blockquote>
        </Reveal>

        <div className="grid gap-px border border-[#2b3033] bg-[#2b3033] md:grid-cols-2">
          {t.safety.points.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 60}
              className="flex flex-col gap-2.5 bg-[#1b1f22] px-[26px] py-7"
            >
              <div className="text-base font-semibold text-white">{p.title}</div>
              <p className="text-sm leading-[1.7] text-[#b6bfbd]">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Running({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="running" className="border-b border-[#e8eae9]">
      <div className="mx-auto max-w-[1120px] px-5 py-[64px] md:px-10 md:py-[84px]">
        <Reveal className="mb-[44px] flex max-w-[680px] flex-col gap-3.5 md:mb-[52px]">
          <Eyebrow>{t.running.eyebrow}</Eyebrow>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] md:text-4xl">
            {t.running.h2}
          </h2>
          <p className="mt-2 text-base leading-[1.7] text-[#4c5153] [text-wrap:pretty]">
            {t.running.body}
          </p>
        </Reveal>
        <div className="grid gap-px border border-[#e3e5e3] bg-[#e3e5e3] md:grid-cols-2">
          {t.running.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 60}
              className="flex flex-col gap-2.5 bg-white px-[26px] py-7"
            >
              <div className="text-base font-semibold">{item.title}</div>
              <p className="text-sm leading-[1.65] text-[#55595a]">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="contact" className="bg-[#fafbfa]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-[44px] px-5 py-[64px] md:px-10 md:py-[84px] lg:grid-cols-[1fr_1fr] lg:gap-[72px]">
        <div className="flex flex-col gap-3.5">
          <Eyebrow>{t.contact.eyebrow}</Eyebrow>
          <h2 className="text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] md:text-4xl">
            {t.contact.h2}
          </h2>
          <p className="mt-2 max-w-[34em] text-base leading-[1.7] text-[#4c5153] [text-wrap:pretty]">
            {t.contact.body}
          </p>
        </div>

        <div>
          {/* A list of direct channels, not a form: there is no endpoint behind
              a form and a dead contact form is worse than none. */}
          <div className="border border-[#e3e5e3] bg-white">
            {t.contact.rows.map((row, index) => {
              const href = hrefFor(row.key);
              const value = valueFor(row.key, lang);
              const inner = (
                <>
                  <span className="text-[13px] text-[#8a8f8c]">{row.label}</span>
                  <span
                    // Email, phone and URL are pure Latin and must stay LTR
                    // even on the Arabic page. "Alexandria, Egypt · GMT+3" is
                    // mixed free text, so it takes its direction from its own
                    // first strong character instead of being forced.
                    dir={row.key === 'location' ? 'auto' : 'ltr'}
                    className={`text-start text-[15px] ${
                      href ? 'text-[#1f5f66]' : 'text-[#55595a]'
                    } ${row.key === 'location' ? '' : 'font-mono text-[14px]'}`}
                  >
                    {value}
                  </span>
                </>
              );
              const cls = `flex items-baseline justify-between gap-5 px-[26px] py-5 ${
                index === 0 ? '' : 'border-t border-[#eceeec]'
              }`;
              return href ? (
                <a
                  key={row.key}
                  href={href}
                  target={row.key === 'portfolio' || row.key === 'whatsapp' ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`${cls} transition-colors duration-200 hover:bg-[#fafbfa]`}
                >
                  {inner}
                </a>
              ) : (
                <div key={row.key} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Kept deliberately, and explained rather than buried. */}
          <div className="mt-6 border border-[#f0dfc4] bg-[#fdf9f1] px-[26px] py-6">
            <div className="text-[14px] font-semibold text-[#6b5528]">
              {t.contact.noticeTitle}
            </div>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#6b5528]">
              {t.contact.noticeBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#e8eae9] bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-10">
        <div className="flex items-center gap-2.5 text-[#1f5f66]">
          <Mark className="h-5 w-5" />
          <span className="text-[15px] font-semibold tracking-tight">Labora</span>
          <span className="mx-1 h-4 w-px bg-[#e3e5e3]" aria-hidden />
          <span className="font-arabic text-[15px] font-semibold" dir="rtl">
            لابورا
          </span>
        </div>
        <div className="text-[13px] text-[#8a8f8c]" dir="auto">
          {t.footer.built} · {year}
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const [lang, setLang] = useState<Lang>('en');
  const t = COPY[lang];

  // The document itself carries language and direction, so the browser gets
  // text selection, hyphenation and form controls right — not just our layout.
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.documentElement.dir = t.dir;
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.meta.description);
  }, [t]);

  return (
    <div
      className={`min-h-screen bg-white text-[#1a1d1f] antialiased ${
        lang === 'ar' ? 'font-arabic' : 'font-sans'
      }`}
    >
      <Header lang={lang} onToggle={() => setLang((l) => (l === 'en' ? 'ar' : 'en'))} />
      {/* Keyed on the language so React remounts the tree and the fade replays.
          The remount also resets the scroll reveals, which is what you want:
          the new text arrives the same way the old text did. */}
      <main key={lang} className="lang-swap">
        <Hero lang={lang} />
        <WhatItDoes lang={lang} />
        <Queues lang={lang} />
        <Safety lang={lang} />
        <Running lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
