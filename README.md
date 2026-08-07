# Labora — landing page

The public marketing page for Labora. **Standalone by design**: it shares no
code, no API and no database with the laboratory system in `../labora`. That
system runs on a machine inside a laboratory with no public DNS; this page is
published on the open internet, so the two are deployed and versioned
separately.

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # static output in dist/
npm run preview    # serve the built output
```

`dist/` is plain static files — upload it to Netlify, Vercel, GitHub Pages,
Cloudflare Pages or any web host. There is no server side.

## Contact details

Real details live in `CONTACT` at the top of `src/Landing.tsx`. If they change:
the display strings carry spaces for legibility, `phoneHref` is E.164 with no
spaces, and `whatsappHref` drops the `+` as well.

The location line is composed at runtime — the city from `copy.ts` joined with
Cairo's current UTC offset, read from `Intl` with the `Africa/Cairo` zone. Egypt
observes daylight saving, so it is GMT+3 in summer and GMT+2 in winter; writing
either into the page makes it wrong for half the year.

There is no contact form, deliberately — a form with no endpoint behind it is
worse than none. The page offers direct channels instead.

## Content

`src/copy.ts` holds every string in English and Arabic. The page defaults to
English with a toggle in the header; switching sets `lang` and `dir` on the
document itself, so the browser handles selection and typography rather than
just the layout.

Two claims are load-bearing and must not be softened:

- **"Not yet fit for clinical use"** in the contact section, and its
  explanation. The seeded reference ranges are conventional starting values, not
  values validated for a particular laboratory. A director who discovers that
  later stops trusting everything else on the page.
- **"An instrument can fill a value. It can never validate one."** in section 03.

Everything else is drawn from what the system actually implements. If a feature
changes, the sentence changes with it.

The voice rules are written out at the top of `copy.ts` and are worth reading
before editing a string. The short version: the page speaks to a lab owner, not
an engineer, so it carries no stack detail; it uses first person singular, and
only where a person has to speak; and it states what the software does instead
of arguing for it. An earlier draft was written in this README's own register —
long sentences and closing aphorisms — which reads as a manifesto to someone who
has not yet agreed to the argument.

The hero table is a **static illustration** — a fixed fixture in `copy.ts`,
never live data and never a real patient.

## Motion

Two transitions, both deliberately quiet — an 8px rise and a fade, nothing that
slides or overshoots. The page is selling careful clinical software and bouncy
marketing motion argues against it.

- **Scroll reveal.** `useReveal.ts` wraps an `IntersectionObserver`; section
  headers and grid cards fade up as they arrive, staggered a few tens of
  milliseconds across a row. It unobserves after the first reveal, so nothing
  re-animates while someone scrolls back through it.
- **Section navigation.** `scroll-behavior: smooth` lives on `<html>`, the
  element that actually scrolls — Tailwind's `scroll-smooth` was on an inner
  div, where it does nothing, so nav clicks used to jump instantly.
  `scroll-margin-top` stops a section landing underneath the sticky header.
- **Active section.** `useActiveSection.ts` marks the nav link for whatever the
  reader is on, with a hairline that grows from the centre. It picks the section
  crossing a reading line rather than the first one intersecting, or the marker
  flickers between two sections at every boundary.
- **Language crossfade.** `<main>` is keyed on the language, so switching
  remounts the tree and replays a 320ms fade rather than hard-cutting every
  string and the text direction at once.

`prefers-reduced-motion: reduce` removes all of it, including smooth scrolling.
So does a missing `IntersectionObserver`: the hook starts elements **visible**
and only hides them once it knows it can reveal them again. Content that hides
itself and then fails to come back is worse than no animation, so if you add
reveals elsewhere, keep that property.

## Design

`design/` is the landing-page handoff; `design-favicon/` is the mark. Both are
kept for provenance. Open `design/Landing page design/landing-handoff/reference/`
in a browser to compare a build against the original.

Rules from the handoff worth keeping: one accent colour, borders are always 1px
hairlines, the only radius is `3px` on buttons, and section 03 is the single
dark band and carries the one pull-quote.

Fonts are IBM Plex, loaded from Google Fonts. Self-host with `@fontsource` if
that ever matters.
