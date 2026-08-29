---
name: BOZIC Swiss
description: Schweizer Typografie / International Typographic Style system — one rule-built world spanning the Konzept strategy page and the Shopify shop theme.
colors:
  paper: "#FCFCFA"
  ink: "#111110"
  ink-soft: "#57544D"
  red: "#E30613"
  red-text: "#D40010"
  hairline: "#DBD8D0"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.7rem, 7.5vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  numeral:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  body:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "Hanken Grotesk, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.6563rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  none: "0px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 2rem"
  button-primary-hover:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
  button-red:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 2rem"
  button-red-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.95rem 2rem"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1.1rem 1.1rem 1.3rem"
  media-well:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.none}"
  form-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0.8rem"
  ink-board:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "2.4rem 2.2rem 2.5rem"
---

# Design System: BOZIC Swiss

> **Scope.** This system — "BOZIC Swiss," a Schweizer Typografie / International Typographic Style build — governs everything under `shopify-theme/`: the Konzept strategy page (`shopify-theme/preview/konzept-preview.html`, `shopify-theme/theme/sections/konzept.liquid`, class prefix `bz-`) **and** the full Shopify shop theme it was extended into (`shopify-theme/theme/assets/base.css` and the sections/snippets that consume it, class prefix `sw-`). It deliberately does **not** govern the legacy Next.js frontend in `app/` — that cream/gold/system-sans world was explicitly discarded by the user ("kannst das bestehende Frontend komplett über Bord werfen," per `PRODUCT.md`) and its code is left untouched, out of scope for this document.

## Overview

**Creative North Star: "The Instrument Face"**

The built system reads like the dial of the watches it sells: a red disc with two white hands fixed at 10:08, tabular numerals lined up like a chronometer's date wheel, a horizontal "price scale" with tick marks at its two breakpoints, a pipeline rail that ticks through eight numbered steps. Nothing here is decorative — every mark either measures something (a rule, a tick, a numeral) or signals a state (a flag, a chip, a focus ring). The build's own embedded provenance comment states the thesis directly: *"Das Konzept als Schweizer Typografie-Strecke — die Präzision, für die die Uhren stehen, wird selbst die Gestaltung. Verweigert: dunkler Luxus-Schimmer, Gold, Karten-Dekor, Zierde jeder Art."* (The concept as a Swiss-typography stretch — the precision the watches stand for becomes the design itself. Refused: dark-luxury shimmer, gold, card decor, ornament of any kind.)

Density is high and confident: long-form reading sections separated by structural rules rather than whitespace-heavy cards, a strict four-weight type ramp doing all the hierarchy work, and a palette so small (seven values, one accent) that every red mark reads as a genuine signal rather than decoration. `PRODUCT.md` records the durable brand constraint behind this: the prior frontend's cream/gold/system-sans "luxury" materiality was **explicitly rejected** — confirmed by reading `app/globals.css` and `tailwind.config.ts`, which still carry that discarded palette (`#FAF9F6` cream, `#D4AF37` gold, system-font stack) untouched. BOZIC Swiss is a deliberate, total departure from it: paper instead of cream, ink instead of gold, one German-engineered grotesque instead of a system stack.

**Key characteristics:**
- One accent (Signal Red) run at two contrast steps against two neutrals (paper ground, ink text/rule) — no third hue anywhere in either source file.
- One typeface, Hanken Grotesk, four weights (400/600/700/800), tabular numerals set once, globally, on `body`.
- Zero border-radius, zero cast shadow. Structure comes from 1px/2px rule-weight alone.
- Exactly two flat color surfaces exist in the whole built system (one ink, one red) and exactly two motion moments (the hero disc's 0.7s set-in, the pipeline rail's stepped 110ms-stagger tick) — both singular, deliberate exceptions, never a pattern to multiply.
- A red numeral — not an eyebrow label — is the chapter head's reference mark, echoing a dial's numerals rather than a marketing kicker.
- `prefers-reduced-motion` disables both motion moments and pauses the hero video; the shop theme itself ships no scroll animation at all — the Konzept page is the only place motion exists.

## Colors

A four-neutral, one-accent palette. Every value below is used, by name, in both `base.css` and `konzept-preview.html` — the two files define the same seven custom properties byte-for-byte (`--paper`, `--ink`, `--ink-soft`, `--red`, `--red-text`, `--hairline`, plus literal `#FFFFFF`).

### Primary
- **Signal Red** (`#E30613`): the one accent hue, reserved for surfaces and large marks — the hero poster disc, the section-08 finale's full-bleed background, the lead-SLA chip, the small square bullet before each sales-mode heading, the `arch-why` list's top rule.
- **Text Red** (`#D40010`): the same accent stepped one notch for small-scale typography — labels, links, table/spec captions, chips, brand tags, the "Reserviert" flag and price-row label, sum-row totals. Always set at 600–800 weight; never used for running body copy.

### Neutral
- **Paper** (`#FCFCFA`): the ground. The only page-background value in the system — pixel-verified exact, deliberately a hair off pure white rather than `#FFFFFF`.
- **Ink** (`#111110`): primary text color and the rule color (`--rule` is a literal alias of `--ink`); also the system's one static dark surface, the §25a Merktafel board.
- **Ink Soft** (`#57544D`): secondary/supporting text — leads, captions, table sub-copy, `em` asides — and the scrollbar thumb color against a paper track.
- **Hairline** (`#DBD8D0`): the lightest neutral, used exclusively for 1px internal dividers and borders; never used for text.
- **White** (`#FFFFFF`): two jobs only. (1) The mandatory foreground on the ink or red surfaces — button-hover text, the board's headline, the finale's body copy, the disc's hands and center pin. (2) The fill of small "wells" sitting on the paper ground itself — card/gallery media frames, cart thumbnails, form fields, the toolbar select — where it reads as a slightly brighter plane than paper, not as a second background.

### Named Rules
**The One Accent Rule.** Red is the only hue in the system besides the ink/paper neutrals. No secondary or tertiary color exists in either source file, and none should be introduced.
**The Two Surfaces Rule.** Exactly one ink surface (the §25a board) and one red surface (the section-08 finale) exist across the entire built system. A new full-bleed ink or red block is a violation of the system, not a variation within it.
**The No-White-On-Paper Rule.** White text never sits directly on the paper ground in the built system — it appears only atop ink or red, or as a well-fill behind other content.
**The Themed Chrome Rule.** Browser chrome is set explicitly, never left to defaults: `::selection` fills red with white text, the scrollbar thumb/track use ink-soft/paper (mirrored in `-webkit-scrollbar` rules), and every `:focus-visible` ring is 2px solid red at 3px offset — the same red used everywhere else, never a separate "UI blue."

## Typography

**Display / Body / Label Font:** Hanken Grotesk (Google Fonts), with `"Helvetica Neue", Helvetica, Arial, sans-serif` as fallback. It is the only typeface in the system — no serif companion, no monospace, no italic anywhere in either file.

**Character:** a German grotesque run hard toward its extremes — 800-weight display type with tight negative tracking next to 400-weight body copy at a relaxed 1.6 line-height, with almost nothing in between except the uppercase, wide-tracked Label. The pairing reads as instrumentation, not editorial: numerals always tabular, headings always heavy, everything else quiet.

### Hierarchy
- **Display** (800, `clamp(2.7rem, 7.5vw, 5.5rem)` in the reusable theme hero; `clamp(2.7rem, 9.5vw, 7.25rem)` on the Konzept page's one-time cover splash, `-0.035em`, line-height ~0.98–0.99): the single big headline per page. The Konzept splash is allowed to run larger because it is a one-shot cover page; the reusable `swiss-hero` section caps lower because it repeats.
- **Headline** (800, `clamp(1.75rem, 3.6vw, 2.75rem)` theme / `clamp(2rem, 4.4vw, 3.4rem)` Konzept, `-0.03em`, line-height ~1.02–1.04): chapter and section headers. On the Konzept page it is always paired with the red chapter numeral in the head grid (see Components); the theme's plainer `.sw-head` drops the numeral and keeps only the 2px rule.
- **Title** (800 weight typically, `1–1.5rem`, `-0.01em` to `-0.02em`): component-level headings — pillar names, architecture cells, phase names, channel heads, admin sub-heads, RTE `h2`/`h3`, decision items. One notable exception: the product-card title (`sw-card-title`) is 700 weight, not 800, at `0.9688rem` — the one Title-tier heading that steps down a weight because it sits inside a dense grid of many cards at once.
- **Numeral** (800, `1.75rem`, `-0.02em` to `-0.025em`, tabular): headline price figures — the sales-mode prices, the product price row, the cart total. Inline numeral *emphasis* (a cost-table sum row, a spec total) does not get its own larger size; it keeps the surrounding text size and only switches to 800 weight + red-text color.
- **Body** (400, `1rem` implicit — never explicitly declared, inherited from the 16px UA default — line-height 1.6): running copy. Supporting/secondary copy (leads, descriptions, table sub-text) is consistently set smaller, in ink-soft, in the `0.84–0.97rem` band, capped at 42rem (leads) or 60–65ch (descriptions/RTE).
- **Label** (700, `0.6563rem`, uppercase, `0.14em` tracking): the system's one small-caps device — status tags, brand/meta attribution, table captions, chips, the masthead bar. Two color modifiers only: `--red` (red-text) and `--dim` (ink-soft); smaller in-context echoes of the same treatment run down to `~0.5938rem` (flags, tags) without changing weight or tracking.

**Tabular numerals** (`font-variant-numeric: tabular-nums`) are set exactly once, globally, on `body`/`.bz` — every number in the system (prices, dates, chapter figures, phase weeks) inherits it; no component re-declares it.

### Named Rules
**The One Face Rule.** Hanken Grotesk is the only typeface in the system, in four weights, with no italic and no serif companion anywhere.
**The Tabular Numerals Rule.** Number formatting is never a per-component decision — it is inherited from one global declaration on `body`.
**The Label-Not-Eyebrow Rule.** The uppercase Label component is reserved for meta/status/tag/attribution use — never manufactured as a decorative kicker floating above a Display or Headline for rhythm. The chapter head grid uses a red *numeral*, not a label, as its reference device (see Components). Where a Label does sit directly above an `h1` — the brand name above the product-page title — it is real product data (brand attribution, reused from the same component as the card grid's brand tag), not an invented decorative kicker; that distinction is the rule, not an exception to it.

**Build vs. intention.** The page's own embedded direction contract (`OWN-WORLD`, in `konzept-preview.html`) specifies "Hanken Grotesk in drei Gewichten" — three weights. The shipped CSS in both files actually declares four (400/600/700/800), confirmed by grep across every `font-weight` declaration. The build wins: document four. One trace of the drift survives in delivery: `shopify-theme/theme/layout/theme.liquid` correctly requests all four weights from Google Fonts (`wght@400;600;700;800`), but the standalone `konzept-preview.html`'s own `<link>` still requests only the original three (`wght@400;600;800`) even though its embedded CSS uses `font-weight: 700` more than a dozen times — those elements render on whatever weight the browser matches instead of the shipped cut. This is a build defect in the preview's font loading, not a system rule; do not copy the three-weight `<link>` into new work.

## Layout

**Container:** `.wrap` — max-width `80rem` (1280px), centered, `padding-inline: 1.25rem` below 1024px and `3rem` at ≥1024px. Identical in both files.

**Section rhythm:** vertical padding is tuned per context rather than drawn from a shared scale. The Konzept page's `.bz-sec` runs roomier (`5.5rem` top / `6.5rem` bottom desktop, `3.5rem`/`4.5rem` under 720px) because it is a single long-form read; the theme's reusable `.sw-sec` runs tighter (`4.5rem`/`5.5rem` desktop, `3rem`/`3.75rem` under 720px) because it repeats across many pages. No named spacing-scale tokens exist in either file — values across both stylesheets range roughly `0.3rem` (micro gaps) to `6.5rem` (largest section padding), each considered per component rather than snapped to a grid; match the nearest existing value in new work rather than inventing a token step.

**Chapter head grid** (`.bz-chap`, Konzept only): a 2px ink top rule above a two-column grid — a `5.5rem` numeral column beside the heading/lead column — collapsing to one column under 860px. The theme's plainer `.sw-head` keeps only the 2px top rule and a flex row; it has no numeral column.

**Grid mesh technique:** repeating grids (the product grid, the architecture diagram, the pipeline rail) share borders economically — the grid container owns the top and left edge, each cell then owns its own right and bottom edge — so interior lines stay a true 1px even where cells meet, rather than doubling up. The product grid (`.sw-grid`) runs 4→3→2→1 columns at 1100/820/480px, and drops its left border entirely at the 1-column breakpoint.

**Two-pane splits:** the product page and its gallery run a 7:5 fraction (`minmax(0,7fr) minmax(0,5fr)`) above ~960px, stacking below it; the billing section inverts the ratio to 5:7.

**Multi-item grids:** 3-column pillars / architecture-why / marketing channels; an 8-column pipeline rail (4 under 980px, 2 under 560px); 2-column decisions and admin-detail lists — each collapses to a single column somewhere in the 760–980px band depending on its own content density, not a shared breakpoint.

**Breakpoints observed** (px, chosen per component, not drawn from a fixed set): 480, 540, 560, 720, 760, 820, 860, 900, 960, 980, 1024, 1100.

## Elevation & Depth

The system is flat by invariant — no shadow is ever used to imply elevation, hover lift, or card depth in either file. Structure is communicated entirely by line-weight: a 1px hairline (`#DBD8D0`) for internal/repeating dividers versus a 2px ink rule for structural breaks (chapter tops, price-row tops, header/footer bars, table captions). The system's two flat color fields (the ink board, the red finale) are the closest thing to a depth device, and they read as a change of territory — a different chapter has a different ground — not as a raised or lowered layer.

### Shadow Vocabulary
- **Ghost-button outline** (`box-shadow: inset 0 0 0 1px var(--rule)` / `inset 0 0 0 1px #FFFFFF` on the red finale): the single `box-shadow` value in the entire system. It stands in for a `border` specifically so the hover state can swap to a solid fill without any layout-shifting change in border-width. It is never used as an ambient or elevation shadow.

### Named Rules
**The No-Cast-Shadow Rule.** No element in this system casts a shadow. The one legitimate `box-shadow` is the ghost button's inset outline; anything softer, larger, or offset reads as a foreign system and should not be added.

## Shapes

Zero `border-radius` — confirmed across every button, card, input, table, chip, flag, and image frame in both `base.css` and `konzept-preview.html`; a repo-wide search for `radius` inside `shopify-theme/` returns no matches at all. Even the smallest decorative marks stay square: the red bullet before each sales-mode heading is a `0.55em` square, not a rounded dot.

The sole circular forms in the entire system are the poster disc (an SVG circle, `r=118` in a 240 viewBox) and its video replacement (`clip-path: circle(49.2%)`) — one deliberate exception marking the system's single signature "watch face" image, not a general shape available elsewhere.

Form language is line-built, not box-built: 1px/2px rules and hairline borders stand in for the surfaces a softer system would render as shadowed cards. The handful of solid-border frames that do exist (the architecture diagram, the empty-state box, the form-error/-ok banners) are 1px or 2px ink/red rectangles — square-cornered, like everything else.

## Components

### Header
`.sw-header` / masthead: paper background, a 1px bottom rule on the outer header, plus a second, 2px top rule directly above the inner bar (`.sw-header-bar`) — the same "1px outer / 2px inner" doubling used at chapter heads. Logo at 800 weight with a red-text trailing mark (`<b>.</b>`); nav links at 600 weight, switching to red-text on hover/`aria-current`; cart link at 700 weight with a red-text count. No dropdown or mega-menu chrome — a flat single row.

### Footer
2px top rule, a nav row echoing the header at a smaller size (`0.8125rem`), then a secondary note row set off by a 1px hairline (not the 2px rule) carrying copyright/meta — a deliberate step-down in rule weight from "structural" (2px, top) to "incidental" (1px, closing note).

### Buttons
Three variants share one shape: block-level, zero radius, `0.95rem 2rem` padding, uppercase 800-weight label-scale text at `0.1em` tracking, a 0.25s background/color transition. Hover only ever swaps fill — never a size, shape, or shadow change.
- **Ink** (`sw-btn`, default): ink fill / paper text → red fill / white text on hover. Used sparingly, for neutral secondary actions (search reset, "view all").
- **Red** (`sw-btn--red`): the commitment action — red fill / white text, swapping to ink on hover. Reserved in practice for the single most consequential action per context: add-to-cart, form submit, the 404 return-home link, the search submit.
- **Ghost** (`sw-btn--ghost`): transparent fill, the 1px inset-outline border substitute (see Elevation), inverting to a solid ink fill with the outline removed on hover. Used for every secondary/tertiary action beside a red button: consultation inquiry, WhatsApp, waitlist, "keep shopping."
- **Disabled** (`sw-btn[disabled]`): hairline fill, ink-soft text, `cursor: not-allowed` — the one place hairline is used as a fill rather than a line.
- **On the red finale** the whole system is re-themed through a scoped `.bz .bz-btn` selector (white fill / red-text text stands in for "primary" there; ghost uses a white 1px outline) — same shape and states, remapped so ink/red keep functioning as roles against a red ground instead of paper.

### Product Card
`sw-card`, sitting in the hairline grid mesh (see Layout). A square white media well (1px hairline frame, `object-fit: contain`) keeps product photography on a consistent field regardless of source crop, falling back to the poster-disc snippet when a product has no image. A red-text label carries the brand name above the title; the title turns red-text on card hover. Price renders as an 800-weight tabular figure, or a `sw-dim` "Preis auf Anfrage" fallback when pricing is hidden. A status flag overlays the top-left corner — ink-fill "Verkauft" (sold) or red-fill "Reserviert" — and available watches carry no flag at all, so the flag's mere presence *is* the status signal.

### Product Page
7:5 gallery/info split, stacking under 960px. The gallery is a static 1px hairline mesh of white cells (main image plus up to four thumbnails) — no carousel chrome. Info column, top to bottom: a red-text brand label directly above the `h1` (real brand data, not a decorative kicker — see Typography), a reference-number line in ink-soft, a 2px-ruled price row (tabular 800-weight price, or a smaller `--request` size for "Preis auf Anfrage"/sold states), the buy-button row (chosen by `sales_mode`/status — red primary plus ghost secondaries), a spec table, a description column capped at 60ch, and a trust bar (2px rule top and bottom, uppercase, red-text emphasis on key words).

### Spec / Data Table
`sw-specs` / `bz-table`: a red-text uppercase caption sitting directly under a 2px ink rule — the table's own miniature chapter head — with `th` cells in ink-soft/600-weight, rows separated by 1px hairlines (last row's rule removed), and an optional total row (`.bz-sum`) that switches to 800-weight red-text under a 2px rule. The same totalling treatment serves spec tables, cost tables, and cart totals alike.

### Forms
Single-column stack; an uppercase label (`0.6875–0.75rem`/700/`0.12em`) sits above each field. Fields are 1px ink-bordered with the "well" white fill (never paper), and swap to a 2px red `:focus-visible` outline at `0` offset with the border color also switching to red — a deliberate override of the page-wide 3px-offset ring, tightened so it hugs the field exactly. Success is a 2px ink-bordered banner; error is a 2px red-bordered banner — border weight and color are the only two levers used to distinguish every form state.

### Cart
A plain table (`sw-cart-table`): 1px-hairline-bordered white thumbnail wells matching the product-card media well, a 2px rule under the header row, right-aligned tabular totals, and a footer (`sw-cart-footer`) pairing an 800-weight total with a ghost "keep shopping" action.

### Pagination
Numbered, hairline-bordered boxes (`sw-pagination`); the current page swaps its border and text to red — the same "red marks the current/selected state" logic used for reserved flags, current-nav links, and focus rings.

### RTE (rich text / prose)
A 65ch measure; `h2`/`h3` step back down into the Title-scale weights; links run in red-text; any embedded table falls back to plain 1px hairline cell borders rather than the branded caption/rule treatment of the Spec Table. The RTE is the one place body content is allowed to look like "plain" formatted text rather than a designed module.

### Signature Components (Konzept-specific)
- **Poster Disc** (`swiss-disc.liquid` snippet, reused as `{% render 'swiss-disc' %}`; inline SVG in the standalone preview): a red circle (`r=118`/240) with two white hands fixed at the 10:08 position and a white center pin — the system's one recurring non-photographic mark. It fills empty product-card and gallery media wells anywhere a watch has no photography yet. On the Konzept hero specifically, a video can replace it: circle-clipped, desaturated (`grayscale(1) contrast(1.06)`), cross-fading in over the static SVG once playback starts (`opacity 0.5s`). `prefers-reduced-motion` and a video `error` event both fall back to the static disc.
- **Price Scale** (`.bz-scale`, Konzept only): a 2px horizontal rule with two 1rem tick marks at the 1/3 and 2/3 points, standing in for the two price breakpoints (3.000 €, 15.000 €) that split the three sales modes listed beneath it — a literal measuring-instrument device built in CSS. Hidden below 860px in favor of the plain 3-column mode list.
- **Pipeline Rail** (`.bz-rail`, Konzept only): an 8-column (4/2 responsive) counter-numbered list tracking the watch-inventory pipeline; the step marked `data-live` gets red-text and an auto-generated "im Shop sichtbar" caption. This is one of the system's exactly two motion moments: on first scroll into view, items fade in with a 110ms stagger via `transition: opacity 0.3s steps(1, end)` — a discrete, ticking reveal rather than an eased fade, matching the instrument character rather than a soft UI entrance. `prefers-reduced-motion` disables it outright (opacity 1, no transition).
- **Masthead** (`.bz-masthead`): a label row sandwiched between a 2px top rule and a 1px bottom rule, carrying page-level metadata (brand, doc type, date, status) — the page title itself lives in the `h1` below it, not in the masthead.
- **§25a Ink Board** (`.bz-board`): the system's one static ink surface (see Colors' Two Surfaces Rule) — full ink fill, paper body text, an 800-weight white "law" headline whose small sub-label runs in `#FF6B74`, a one-off tint that exists nowhere else in the system and should not be treated as a fourth accent. Ground truth: this is a single-use legal/tax highlight module, not a reusable "dark card" component.
- **Red Finale** (`.bz-final`, section 08): the system's one full-bleed red surface (see Colors' Two Surfaces Rule), re-theming the chapter head, buttons, and body text to their on-red variants, closing the page with a counter-numbered decisions list and the two primary CTAs.

## Do's and Don'ts

### Do:
- **Do** keep the palette to exactly the seven documented values (paper, ink, ink-soft, red, red-text, hairline, white) — a new hue, tint, or shade needs a name and a role before it ships.
- **Do** let every number — prices, dates, chapter figures, quantities — inherit tabular numerals from `body`; never re-declare `font-variant-numeric` locally.
- **Do** build every divider, frame, and grid mesh from 1px hairline or 2px ink rules; reach for a rule before reaching for a bordered/shadowed "card" surface.
- **Do** reserve red for the smallest footprint that still reads as a signal — one flag, one chip, one CTA, one accent word — never a body paragraph or a block of running text.
- **Do** use the chapter's red numeral (Konzept) or the plain 2px top rule (theme) as a section's reference device, in place of a kicker/eyebrow label.
- **Do** keep the Label component (uppercase, 700, `0.12–0.14em`) to meta/status/tag/attribution use, reusing its two existing color modifiers (`--red`, `--dim`) rather than inventing new ones.
- **Do** build a bordered control as the ghost button does — an inset `box-shadow` standing in for a `border` — so a hover state can swap fill without any layout shift.

### Don't:
- **Don't** add a second full-bleed ink or red surface. The system carries exactly one of each (the §25a board, the section-08 finale) by design, not by oversight.
- **Don't** round a corner. No component in this system — down to a 0.55em bullet mark — carries a `border-radius`.
- **Don't** add a cast or ambient shadow anywhere. The one legitimate `box-shadow` in the system is the ghost button's inset outline; anything softer or larger reads as a foreign system.
- **Don't** set red on running body copy, or below label weight/size. The built system only ever uses red-text at 600–800 weight — on labels, captions, links, chips, and price/total emphasis.
- **Don't** manufacture a decorative kicker line above a Display or Headline for rhythm. That is the one shape of "eyebrow" this system never uses — even though the Label component itself correctly appears elsewhere, including directly above the product `h1`, where it carries real brand data rather than decoration.
- **Don't** reach for gold, cream, warm off-white, or any dark-luxury materiality. `PRODUCT.md` records that world as explicitly discarded, and no trace of it exists in either source file (it survives only, untouched, in the out-of-scope `app/` frontend).
- **Don't** add a second typeface, an italic, or a serif companion. Hanken Grotesk in four weights, with a Helvetica/Arial/system-sans fallback, is the whole type system.
- **Don't** invent a fixed spacing or breakpoint scale for new work. This system tunes both per component rather than drawing from named steps — match the nearest existing rhythm instead of rounding to an invented token.
