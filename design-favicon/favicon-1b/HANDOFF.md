# Labora favicon + mark — handoff (option 1b)

The mark is a single bilingual monogram: one stem, the arm to the right reads as
Latin **L**, the hook curling left below the baseline reads as Arabic **ل**.
No container, one colour, so it works on light and dark browser chrome.

Geometry (viewBox `0 0 64 64`, `stroke-linecap`/`linejoin: round`):

```
M31 14 V46
M31 46 H49
M31 46 C31 57.5 21.5 59.5 14 52
```

Stroke weight `9` for display sizes, `9.5` in the favicon file so it holds at 16px.

Colour: `#1f5f66` on light, `#4fb3bd` on dark (same hue, so one SVG with a
`prefers-color-scheme` rule covers both).

## Files in this folder

| File | Goes to | Use |
|---|---|---|
| `favicon.svg` | `apps/web/public/favicon.svg` | browser tab, auto light/dark |
| `favicon-32.png` | `apps/web/public/favicon-32.png` | fallback for browsers without SVG favicons |
| `apple-touch-icon.png` (180) | `apps/web/public/apple-touch-icon.png` | iOS home screen |
| `icon-192.png`, `icon-512.png` | `apps/web/public/` | PWA manifest |
| `icon-512-maskable.png` | `apps/web/public/` | Android maskable (extra safe-zone padding) |
| `logo-mark.svg` | `apps/web/src/assets/logo-mark.svg` | header + sign-in screen |

## 1. `apps/web/index.html`

Add inside `<head>` (Vite serves `public/` from `/`):

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#1f5f66" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#16191c" media="(prefers-color-scheme: dark)" />
```

## 2. `apps/web/public/manifest.webmanifest`

```json
{
  "name": "Labora",
  "short_name": "Labora",
  "description": "Laboratory information system",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1f5f66",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" },
    { "src": "/favicon.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
```

## 3. In-app mark component

`apps/web/src/components/LogoMark.tsx` — inline rather than an `<img>` so it
inherits `currentColor` from Tailwind text utilities:

```tsx
export function LogoMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor"
         strokeWidth={9} strokeLinecap="round" strokeLinejoin="round"
         role="img" aria-label="Labora">
      <path d="M31 14 V46" />
      <path d="M31 46 H49" />
      <path d="M31 46 C31 57.5 21.5 59.5 14 52" />
    </svg>
  );
}
```

Header lockup: `<LogoMark className="h-6 w-6 text-[#1f5f66] dark:text-[#4fb3bd]" />`
next to `Labora` at `font-semibold tracking-tight`; the Arabic wordmark is
`لابورا` (`dir="rtl"`), separated by a 1px divider when both are shown.

Sign-in screen: mark at `h-14 w-14` above the heading.

## 4. PDF reports (optional)

The report renderer is server-side HTML → Chromium, so the same SVG can be
inlined in the report header template. Use a single flat colour (`#1f5f66`) —
drop the `prefers-color-scheme` block, since print has no dark mode.

## Notes for whoever integrates this

- Don't add a rounded-square background plate in code; the mark is designed to
  sit on the page background. iOS gets its own white plate via
  `apple-touch-icon.png`.
- Minimum size 16px. Below that the hook and arm merge — use `favicon-32.png`
  scaled down rather than re-drawing.
- Keep the stem vertical and the hook's left terminal above the arm's baseline;
  flattening the hook loses the ل reading.
