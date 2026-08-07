# Labora landing page — handoff

A public marketing page for Labora: hero, three content sections, and a contact
section that both CTAs point at. Same visual language as the app (IBM Plex,
`#1f5f66` teal, hairline borders, no rounded cards, no gradients).

## Files

| File | Goes to |
|---|---|
| `Landing.tsx` | `apps/web/src/pages/Landing.tsx` |
| `reference/` | keep out of the repo — open `Labora Landing.dc.html` in a browser to compare the build against the original design |

The favicon/logo assets are handed off separately in `favicon-1b/`. `Landing.tsx`
inlines the same mark as a local `Mark` component; if `components/LogoMark.tsx`
already exists from that handoff, delete `Mark` here and import it instead.

## 1. Route it

The page is public — it must render **before** the session check, otherwise
visitors get bounced to the sign-in screen.

```tsx
// apps/web/src/App.tsx
import Landing from './pages/Landing';

<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/app/*" element={<RequireAuth><AppShell /></RequireAuth>} />
</Routes>
```

If `/` is currently the authenticated dashboard, move it to `/app` and update the
post-login redirect plus any hard-coded `navigate('/')` calls. `RequireAuth` should
send unauthenticated users to `/login`, not to `/`.

## 2. Fonts

Three families are used: IBM Plex Sans (UI), IBM Plex Mono (labels, numbers, and
anything tabular), IBM Plex Sans Arabic (the `لابورا` wordmark).

```html
<!-- apps/web/index.html, in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

Self-hosting instead (`@fontsource/ibm-plex-sans` etc.) is fine and preferable if
the lab runs on a closed network.

```js
// tailwind.config.js — theme.extend
fontFamily: {
  sans:   ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
  mono:   ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
  arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', 'sans-serif'],
},
```

`font-arabic` is required — without it the footer wordmark falls back to a system
Arabic face and the lockup looks wrong.

## 3. Colours

`Landing.tsx` uses Tailwind arbitrary values (`bg-[#1f5f66]`) so it drops in
without theme changes. If you'd rather have named tokens, add these and
find-and-replace:

```js
// tailwind.config.js — theme.extend.colors
teal:  { DEFAULT: '#1f5f66', hover: '#16474d', light: '#4fb3bd' },
ink:   { DEFAULT: '#1a1d1f', body: '#4c5153', soft: '#55595a', muted: '#8a8f8c', faint: '#b8bcba' },
line:  { DEFAULT: '#e3e5e3', soft: '#e8eae9', softer: '#eceeec', faint: '#f0f2f0' },
paper: { DEFAULT: '#ffffff', tint: '#fafbfa' },
night: { DEFAULT: '#16191c', card: '#1b1f22', line: '#2b3033', text: '#b6bfbd' },
flag:  { lowBg: '#fdf3e3', lowFg: '#8a5b12', highBg: '#fbeceb', highFg: '#8f2c22' },
note:  { bg: '#fdf9f1', line: '#f0dfc4', fg: '#6b5528' },
```

Rules worth keeping: one accent only; borders are always 1px hairlines; the only
radius in the design is `3px` on buttons; section 03 is the single dark band and
carries the one pull-quote.

## 4. Contact details — REQUIRED EDIT

`CONTACT` at the top of `Landing.tsx` holds placeholders. Replace all of them
before deploying:

```ts
const CONTACT = {
  email: 'you@example.com',
  phone: '+20 100 000 0000',      // display
  phoneHref: '+201000000000',     // tel: — E.164, no spaces
  whatsapp: '+20 100 000 0000',   // display
  whatsappHref: '201000000000',   // wa.me/ — no + and no spaces
  github: 'github.com/your-handle',
  githubHref: 'https://github.com/your-handle',
  location: 'Cairo, Egypt · GMT+2',
};
```

Add or drop rows by editing `CONTACT_ROWS`; a row with no `href` renders as plain
text (that's what `Based in` does). Both CTAs are `href="#contact"` and rely on
`scroll-behavior: smooth`, which the root `div` sets via `scroll-smooth` — if you
route the CTA to a separate `/contact` page instead, change both links and the
header button.

Do not add a contact form unless there's an endpoint behind it; the design is
deliberately a list of direct channels.

## 5. Responsive

The layout is desktop-first at `max-w-[1120px]`. Breakpoint behaviour already in
the file: the hero and the two-column sections collapse to one column below `lg`,
the capability grid goes 3 → 2 → 1, and the section-02 left column un-sticks.

Two things are **not** handled and need a pass if mobile matters:

- The hero `h1` is a fixed `text-[54px]`. Add something like
  `text-[34px] sm:text-[42px] lg:text-[54px]`.
- `px-10` is tight on small phones — `px-5 md:px-10`.
- The header nav has no mobile treatment. Simplest acceptable answer: hide the
  three nav links below `md` (`hidden md:flex`) and keep only the mark and the
  "Get in touch" button.

## 6. Content notes

Copy is final, not placeholder — it is drawn from the project's own README, so
the claims match what's actually implemented. Two things must not be softened or
removed:

- The "Not yet fit for clinical use" notice at the end of the contact section.
- "An instrument can fill a value. It can never validate one." in section 03.

The em-dash and `→` characters are intentional; keep the `†` footnote marker in
the hero mock paired with its explanation in the mock's footer row.

The hero table is a **static mock**, not live data — do not wire it to the API.
If you'd rather it showed real numbers, use a fixed demo fixture, never a real
patient.

## 7. Accessibility / SEO

- `Mark` already carries `role="img"` and `aria-label="Labora"`.
- Heading order is h1 → h2 ×4, one h1 on the page. Keep it.
- Add page metadata in `index.html` or via your head manager:
  `<title>Labora — laboratory information system</title>`, a matching
  description, and `og:title` / `og:description` / `og:image` (the 512 PNG from
  `favicon-1b/` works as a stopgap).
- Body text is `#4c5153` on white (≈8:1) and `#8a8f8c` is used only for
  non-essential labels at ≥11px — don't demote real content to that grey.
