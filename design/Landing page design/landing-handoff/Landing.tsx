import { Fragment } from 'react';

/* Labora marketing landing page.
   Design tokens are inlined as Tailwind arbitrary values so this file drops in
   without touching the app theme; see HANDOFF.md if you'd rather promote them
   to tailwind.config.js. */

const CONTACT = {
  email: 'you@example.com',
  phone: '+20 100 000 0000',
  phoneHref: '+201000000000',
  whatsapp: '+20 100 000 0000',
  whatsappHref: '201000000000',
  github: 'github.com/your-handle',
  githubHref: 'https://github.com/your-handle',
  location: 'Cairo, Egypt · GMT+2',
};

const ink = '#1f5f66';

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

function Eyebrow({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'teal' | 'cyan' }) {
  const color = tone === 'teal' ? 'text-[#1f5f66]' : tone === 'cyan' ? 'text-[#4fb3bd]' : 'text-[#8a8f8c]';
  return <div className={`font-mono text-xs uppercase tracking-[0.14em] ${color}`}>{children}</div>;
}

/* ---------------------------------------------------------------- header */

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-[#e8eae9] bg-white/[0.92] backdrop-blur">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-10 py-4">
        <a href="#hero" className="flex items-center gap-2.5 text-[#1a1d1f]">
          <Mark className="h-6 w-6 text-[#1f5f66]" />
          <span className="text-[17px] font-semibold tracking-[-0.02em]">Labora</span>
        </a>
        <div className="flex items-center gap-7">
          <nav className="flex gap-[26px] text-sm text-[#55595a]">
            <a href="#what" className="hover:text-[#1a1d1f]">What it does</a>
            <a href="#queues" className="hover:text-[#1a1d1f]">Workflow</a>
            <a href="#reports" className="hover:text-[#1a1d1f]">Reports</a>
          </nav>
          <a
            href="#contact"
            className="rounded-[3px] bg-[#1f5f66] px-[18px] py-[9px] text-sm font-medium text-white hover:bg-[#16474d]"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

type Row = { test: string; value: string; range: string; flag?: 'L' | 'H'; dagger?: boolean };

const HERO_ROWS: Row[] = [
  { test: 'Haemoglobin', value: '11.9', range: '12–15', flag: 'L' },
  { test: 'Platelets', value: '248', range: '150–410' },
  { test: 'LDL cholesterol', value: '142', range: '<130', flag: 'H', dagger: true },
  { test: 'Creatinine', value: '0.9', range: '0.7–1.3' },
];

const FLAG_STYLES = {
  L: 'bg-[#fdf3e3] text-[#8a5b12]',
  H: 'bg-[#fbeceb] text-[#8f2c22]',
} as const;

function WorklistMock() {
  return (
    <div className="border border-[#e3e5e3] bg-[#fafbfa]">
      <div className="flex items-center gap-2 border-b border-[#e8eae9] bg-white px-3.5 py-[11px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#dfe1df]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#dfe1df]" />
        <span className="ml-2 font-mono text-[11px] text-[#8a8f8c]">Worklist — Haematology</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_auto_auto] items-baseline gap-x-5 border-b border-[#eceeec] px-3.5 py-[9px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#8a8f8c]">
        <span>Test</span>
        <span className="text-right">Value</span>
        <span className="text-right">Range</span>
        <span className="text-right">Flag</span>
      </div>

      {HERO_ROWS.map((r, i) => (
        <div
          key={r.test}
          className={`grid grid-cols-[1fr_auto_auto_auto] items-baseline gap-x-5 px-3.5 py-3 text-[13px] ${
            i < HERO_ROWS.length - 1 ? 'border-b border-[#f0f2f0]' : ''
          }`}
        >
          <span>
            {r.test}
            {r.dagger && <span className="text-[#1f5f66]"> †</span>}
          </span>
          <span className="text-right font-mono">{r.value}</span>
          <span className="text-right font-mono text-[#8a8f8c]">{r.range}</span>
          <span className="text-right">
            {r.flag ? (
              <span className={`px-1.5 py-0.5 font-mono text-[11px] ${FLAG_STYLES[r.flag]}`}>{r.flag}</span>
            ) : (
              <span className="font-mono text-[11px] text-[#b8bcba]">—</span>
            )}
          </span>
        </div>
      ))}

      <div className="flex items-center justify-between border-t border-[#e8eae9] bg-white px-3.5 py-[11px] font-mono text-[10.5px] text-[#8a8f8c]">
        <span>† typed over a calculated value</span>
        <span className="text-[#8a5b12]">1 LATE</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="border-b border-[#e8eae9]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-[72px] px-10 pb-[88px] pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-start gap-[26px]">
          <Eyebrow tone="teal">Laboratory information system</Eyebrow>
          <h1 className="text-[54px] font-semibold leading-[1.06] tracking-[-0.035em] [text-wrap:balance]">
            Every result signed by a person, every report ready in two languages.
          </h1>
          <p className="max-w-[30em] text-lg leading-[1.65] text-[#4c5153] [text-wrap:pretty]">
            Labora runs a single medical lab end to end — registration, ordering, result entry and
            validation, billing, and results captured straight off your analyzers. Bilingual Arabic
            and English reports, built for the bench rather than around it.
          </p>
          <div className="mt-1.5 flex items-center gap-[18px]">
            <a
              href="#contact"
              className="rounded-[3px] bg-[#1f5f66] px-7 py-3.5 text-base font-medium text-white hover:bg-[#16474d]"
            >
              Use Labora in your lab
            </a>
            <a href="#what" className="border-b border-[#c9cfcd] pb-0.5 text-[15px] text-[#55595a] hover:text-[#1a1d1f]">
              See what's inside
            </a>
          </div>
          <div className="mt-3 flex gap-7 font-mono text-xs text-[#8a8f8c]">
            <span>PostgreSQL 17</span>
            <span>TypeScript end to end</span>
            <span>ASTM / LIS2-A2</span>
          </div>
        </div>
        <WorklistMock />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- 01 what */

const CAPABILITIES: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Patients',
    body: 'Bilingual names, Egyptian phone and national-ID validation, birth date or approximate age, duplicate detection. Search in either script.',
  },
  {
    title: 'History as a trend',
    body: (
      <>
        Every visit pivoted into one table, a column per visit. A repeat patient reads as{' '}
        <span className="font-mono text-[13px]">Hb 8.9 → 10.4 → 11.9</span>, not three unrelated
        reports.
      </>
    ),
  },
  {
    title: 'Ordering',
    body: 'Catalogue by department, panels expanding into member tests, a price snapshot per item and a sample barcode per order.',
  },
  {
    title: 'Results',
    body: 'Numeric, text, pick-list, formula and panel. Ranges chosen by sex and age in days; flags computed server-side; every change kept append-only.',
  },
  {
    title: 'Billing',
    body: 'One invoice per order, payments by method, admin-only discounts, collection views by day, month or year, and daily cash reconciliation.',
  },
  {
    title: 'Administration',
    body: 'Users and roles, lab identity and report layout, analyzer registration, a filterable audit log with field-level diffs, and a catalogue editor.',
  },
];

function WhatItDoes() {
  return (
    <section id="what" className="border-b border-[#e8eae9] bg-[#fafbfa]">
      <div className="mx-auto max-w-[1120px] px-10 py-[84px]">
        <div className="mb-[52px] flex max-w-[620px] flex-col gap-3.5">
          <Eyebrow>01 — What it does</Eyebrow>
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.03em]">
            The whole lab, from the front desk to the signature.
          </h2>
        </div>
        <div className="grid gap-px border border-[#e3e5e3] bg-[#e3e5e3] md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="flex flex-col gap-2.5 bg-white px-[26px] py-7">
              <div className="text-base font-semibold">{c.title}</div>
              <p className="text-sm leading-[1.65] text-[#55595a]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ 02 queues */

function Queues() {
  return (
    <section id="queues" className="border-b border-[#e8eae9]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-[72px] px-10 py-[84px] lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col gap-3.5 lg:sticky lg:top-24">
          <Eyebrow>02 — Workflow</Eyebrow>
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.03em]">
            Two work queues, deliberately not the same screen.
          </h2>
          <p className="mt-2 text-base leading-[1.7] text-[#4c5153] [text-wrap:pretty]">
            Reception and the bench are asking different questions of the same data. Merging them
            into one grid is how lab software ends up serving neither.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 border border-[#e3e5e3] px-7 py-[30px]">
            <div className="flex items-center gap-3">
              <span className="bg-[#1f5f66] px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                Orders
              </span>
              <span className="text-[13px] text-[#8a8f8c]">reception's view</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#4c5153]">
              One row per order. Where has this patient got to, and what do they owe. Filters for
              sex, test, referring doctor and seen-on with Today and Yesterday shortcuts.
            </p>
          </div>

          <div className="flex flex-col gap-3 border border-[#e3e5e3] px-7 py-[30px]">
            <div className="flex items-center gap-3">
              <span className="bg-[#1a1d1f] px-2 py-[3px] font-mono text-[11px] uppercase tracking-[0.1em] text-white">
                Worklist
              </span>
              <span className="text-[13px] text-[#8a8f8c]">the bench's view</span>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#4c5153]">
              One row per individual test, grouped by department, with the turnaround clock running
              from collection and anything past due flagged{' '}
              <span className="font-mono text-[13px] text-[#8a5b12]">LATE</span>.
            </p>
          </div>

          <div className="border border-l-[3px] border-[#e3e5e3] border-l-[#1f5f66] bg-[#fafbfa] px-7 py-[26px]">
            <p className="text-[15px] leading-[1.7] text-[#4c5153]">
              Validated results are locked. A single row can be reopened with a reason without
              un-signing the rest — a correction never costs you the whole report.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- 03 reports */

const REPORT_POINTS = [
  'Arabic and English layouts from one template',
  'Reference ranges resolved per patient, not per test',
  'Overrides footnoted, never silent',
];

function Reports() {
  return (
    <section id="reports" className="border-b border-[#e8eae9] bg-[#16191c] text-[#f2f4f3]">
      <div className="mx-auto max-w-[1120px] px-10 py-[84px]">
        <div className="mb-[52px] flex max-w-[640px] flex-col gap-3.5">
          <Eyebrow tone="cyan">03 — Reports &amp; analyzers</Eyebrow>
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.03em] text-white">
            A reprint is byte-identical to what the patient was given.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-11 lg:grid-cols-2">
          <div className="flex flex-col gap-[22px]">
            <p className="text-base leading-[1.75] text-[#b6bfbd] [text-wrap:pretty]">
              A4 PDF in English or Arabic with full RTL, Code128 barcode, per-panel grouping,
              critical highlighting, a signature block and repeating table headers. Rendered bytes
              are archived, so reprints can't drift.
            </p>
            <div className="flex flex-col gap-3 text-[14.5px] text-[#d5dcda]">
              {REPORT_POINTS.map((p, i) => (
                <div key={p} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[#4fb3bd]">{String(i + 1).padStart(2, '0')}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[22px]">
            <p className="text-base leading-[1.75] text-[#b6bfbd] [text-wrap:pretty]">
              An agent runs on the PC wired to the instrument: ASTM / LIS2-A2 driver, per-analyzer
              code mapping with unit conversion, disk spooling when the API is unreachable, and
              unmatched barcodes kept for reconciliation.
            </p>
            <div className="border border-[#2b3033] bg-[#1b1f22] px-6 py-[22px]">
              <div className="text-[17px] font-medium leading-[1.5] text-white">
                An instrument can fill a value. It can never validate one.
              </div>
              <div className="mt-2.5 font-mono text-xs text-[#7c8280]">a person signs every report</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- 04 contact */

const CONTACT_ROWS: { label: string; value: string; href?: string; mono?: boolean }[] = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phoneHref}`, mono: true },
  { label: 'WhatsApp', value: CONTACT.whatsapp, href: `https://wa.me/${CONTACT.whatsappHref}` },
  { label: 'GitHub', value: CONTACT.github, href: CONTACT.githubHref },
  { label: 'Based in', value: CONTACT.location },
];

function Contact() {
  return (
    <section id="contact" className="bg-[#fafbfa]">
      <div className="mx-auto max-w-[1120px] px-10 pb-24 pt-[84px]">
        <div className="grid grid-cols-1 items-start gap-[72px] lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>04 — Contact</Eyebrow>
            <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.03em]">
              Want Labora running in your lab?
            </h2>
            <p className="max-w-[32em] text-base leading-[1.7] text-[#4c5153] [text-wrap:pretty]">
              Tell me how many benches you run, which analyzers you have and whether you need Arabic
              reports — that's usually enough to say what setup would look like. Installation
              includes reviewing every reference range against your own analyzers and population
              with your medical director.
            </p>
            <div className="mt-1.5 flex items-center gap-2.5 font-mono text-xs text-[#8a8f8c]">
              <Mark className="h-4 w-4 text-[#1f5f66]" />
              <span>replies within a working day</span>
            </div>
          </div>

          <div className="border border-[#e3e5e3] bg-white">
            <div className="border-b border-[#eceeec] px-[26px] py-[22px] font-mono text-[11px] uppercase tracking-[0.12em] text-[#8a8f8c]">
              Get in touch
            </div>
            {CONTACT_ROWS.map((r, i) => {
              const inner = (
                <Fragment>
                  <span className="min-w-[82px] text-[13px] text-[#8a8f8c]">{r.label}</span>
                  <span
                    className={`text-[15.5px] ${r.href ? 'font-medium text-[#1f5f66]' : ''} ${
                      r.mono ? 'font-mono' : ''
                    }`}
                  >
                    {r.value}
                  </span>
                </Fragment>
              );
              const cls = `flex items-baseline justify-between gap-5 px-[26px] py-5 ${
                i < CONTACT_ROWS.length - 1 ? 'border-b border-[#f0f2f0]' : ''
              }`;
              return r.href ? (
                <a key={r.label} href={r.href} className={`${cls} text-[#1a1d1f] hover:bg-[#fafbfa]`}>
                  {inner}
                </a>
              ) : (
                <div key={r.label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 border border-[#f0dfc4] bg-[#fdf9f1] px-[26px] py-[22px]">
          <p className="text-sm leading-[1.7] text-[#6b5528]">
            <strong className="font-semibold">Not yet fit for clinical use.</strong> The seeded
            reference ranges are conventional textbook values and must be reviewed by the lab's
            medical director against its own analyzers, methods and population before any patient
            result is issued.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#e8eae9]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-10 py-7">
        <div className="flex items-center gap-2.5">
          <Mark className="h-[18px] w-[18px] text-[#1f5f66]" />
          <span className="text-sm font-medium">Labora</span>
          <span className="font-arabic text-sm text-[#8a8f8c]" dir="rtl">
            لابورا
          </span>
        </div>
        <span className="font-mono text-[11.5px] text-[#8a8f8c]">Laboratory information system</span>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="scroll-smooth bg-white font-sans text-[#1a1d1f] antialiased">
      <Header />
      <Hero />
      <WhatItDoes />
      <Queues />
      <Reports />
      <Contact />
      <Footer />
    </div>
  );
}

export { Mark as LandingMark, ink as LandingInk };
