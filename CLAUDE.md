# CLAUDE.md

This file is the living specification for the **Got2BluesHP** project. It is
the single source of truth for what this project is and does. Whenever a
decision is made about scope, content, design, or technical approach, record
it here so future work (by Claude or anyone else) starts from an accurate
picture of the project.

## Project overview

Got2BluesHP is the homepage for the blues band **Got2Blues** — a static,
multi-page site (no build step, no backend) covering tour dates, band info,
videos, photos and contact/booking.

## How to use this file

- Treat this document as the spec, not just a description of existing code.
  When requirements are discussed or decided, update the relevant section
  below before or alongside implementation.
- Keep entries concise and current. If a decision changes, edit the section
  in place rather than leaving outdated and new information side by side.
- Add new sections as the project grows (e.g. "Deployment", "Content
  workflow") rather than letting details accumulate in commit messages or
  chat history only.

## Purpose & audience

- **Goal:** give fans, venues and event bookers a place to see upcoming
  shows, learn about the band, watch live videos, browse photos, and get in
  touch for booking.
- **Audience:** fans, club/festival bookers, press.
- **Language:** German (`lang="de"`). All UI copy and content is in German.

## Site structure / pages

Six static HTML pages, all at the repo root, sharing one header/nav and
footer:

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero (logo + tagline), about teaser, next-show teaser, video teaser, CTAs |
| Termine | `termine.html` | Tour dates list; shows a friendly empty state until real dates are added |
| Band | `band.html` | Sound/style description, band story, member cards, booking CTA |
| Videos | `videos.html` | Video grid linking to the YouTube channel; ready to swap in real embeds |
| Fotos | `fotos.html` | Photo gallery with lightbox; placeholder tiles until real photos are added |
| Kontakt | `kontakt.html` | Contact details + booking form (no backend, opens a prefilled email) |

## Content & placeholder convention

No real tour dates, band member names/bios, or photos were supplied when the
site was built, so **anything factual that wasn't provided is marked with
`[Platzhalter]` / `[...]` brackets directly in the visible copy**, rather
than being invented and presented as real. This includes:

- Band story/founding year/location (`band.html`)
- Member names, instruments, bios, and photos (`band.html`)
- Contact email/phone/region (`kontakt.html` — currently
  `booking@got2blues.example`, a non-working placeholder)
- Press/review quotes (`index.html`, `band.html`)

Descriptive copy about the band's sound/style (blues, live energy, etc.) was
written in full since it's genre flavor text, not a factual claim.

**How to add real content:**

- **Tour dates** (`termine.html`): the file has an HTML comment with a
  ready-to-copy `<li class="show">` template (date, venue, ticket link).
  Remove/hide the `.empty-state` block once real dates are added.
- **Videos** (`videos.html`): video tiles currently link out to
  `https://www.youtube.com/@Got2Blues`. An HTML comment shows the
  `.video-embed` + `<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID">`
  markup to swap in once specific video IDs are chosen. (The channel handle
  alone can't be embedded live without a specific video/playlist ID.)
- **Photos** (`fotos.html`): each `.gallery__item` button currently renders a
  decorative inline SVG icon instead of a photo. Replace the `<svg>` with an
  `<img src="assets/img/fotos/....jpg" alt="...">` — the lightbox
  (`assets/js/main.js`) already works with both `<svg>` and `<img>` content.
- **Band members / bios**: replace the `[Name]`/`[Instrument]`/placeholder
  bio text in `band.html`, and swap the silhouette SVG per `.member__photo`
  for a real `<img>`.
- **Contact details**: update the email in `kontakt.html`'s
  `contact-list` and the form's `data-contact-email` attribute (both need to
  match), plus phone/region.

## Design & branding

- **Logo:** supplied as `d29ceb57-LogoHochBK.pdf` (hand-lettered brush
  script "Got2Blues", black on transparent). Rendered to PNG and cropped;
  both a black version and a cream-recolored version live in
  `assets/img/` (`logo-black-*.png`, `logo-cream-*.png`) for use on light vs.
  dark backgrounds. Favicon/apple-touch-icon were generated from the same
  crop.
- **Mood:** professional, blues, cool — a dark "juke joint stage" look,
  not a cutesy or corporate one.
- **Palette:** near-black background (`#0b0b0d`), warm cream text
  (`#f3ece0`), amber/stage-light accent (`#d99a2b`), deep indigo blue accent
  (`#2c4666`). Defined as CSS custom properties at the top of
  `assets/css/style.css`.
- **Type:** "Bebas Neue" for display headings/nav (condensed, poster-like),
  "Inter" for body copy, "Permanent Marker" as a sparing script accent
  (echoes the brush-lettered logo). Loaded via Google Fonts.

## Technical stack

- **Plain static HTML/CSS/JS** — no framework, no build step, no
  dependencies. Chosen for simplicity and easy hosting anywhere (GitHub
  Pages, Netlify, any static host) for a small six-page site.
- `assets/css/style.css` — single shared stylesheet.
- `assets/js/main.js` — mobile nav toggle, photo lightbox, and a
  no-backend contact form (builds a `mailto:` link on submit).
- `assets/img/` — logo exports, favicons.
- **Hosting/domain:** TBD.

## Non-functional requirements

- **Responsive:** yes — single stylesheet with breakpoints for nav, grids,
  and the tour-date list; tested at desktop (1440px) and mobile (390px)
  widths.
- **Accessibility:** semantic landmarks, skip link, `aria-current` on the
  active nav item, `aria-expanded` on the mobile nav toggle, alt text on the
  logo, focus handling in the lightbox (Escape to close, focus moves to the
  close button).
- **Performance:** no JS frameworks, no external runtime dependencies beyond
  Google Fonts; images are pre-sized PNG exports (400/800/1400px) of the
  logo.

## Open questions

- Real tour dates, band member names/instruments/bios and founding
  story?
- Real contact email/phone for booking, and confirmed public-facing region?
- Real live photos to replace the placeholder gallery icons?
- Specific YouTube video IDs to feature as embeds on the Videos page?
- Hosting target and custom domain?
- Other socials to add (Instagram/Facebook)? Only YouTube was confirmed.
