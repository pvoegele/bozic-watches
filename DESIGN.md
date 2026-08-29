---
name: "BOZIC Watches — Konzept (Tresorraum bei Nacht)"
description: "A vault after closing hours: brass-lit display cases carry the reader through eight chapters of the Shopify launch strategy."
colors:
  vault: "#0C0B09"
  panel: "#16130E"
  panel-lit: "#1C1812"
  brass: "#C9A24B"
  brass-bright: "#E9CE80"
  brass-dim: "#8A7439"
  ivory: "#F2EDE2"
  ivory-dim: "#B3AA96"
  velvet: "#10241C"
  line-brass: "rgba(201, 162, 75, 0.28)"
  line-faint: "rgba(242, 237, 226, 0.10)"
typography:
  display:
    fontFamily: "'Bodoni Moda', 'Bodoni MT', Didot, 'Times New Roman', serif"
    fontSize: "clamp(2.9rem, 7.2vw, 5.9rem)"
    fontWeight: 480
    lineHeight: 1.04
    letterSpacing: "0.005em"
  headline:
    fontFamily: "'Bodoni Moda', 'Bodoni MT', Didot, 'Times New Roman', serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)"
    fontWeight: 480
    lineHeight: 1.08
  title:
    fontFamily: "'Bodoni Moda', 'Bodoni MT', Didot, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8438rem"
    fontWeight: 300
    lineHeight: 1.7
  label:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.6563rem"
    fontWeight: 500
    letterSpacing: "0.3em"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"
    fontFeature: "tabular-nums"
rounded:
  base: "0px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.brass-bright}"
    rounded: "{rounded.base}"
    padding: "1rem 2.6rem"
  button-primary-hover:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.vault}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ivory-dim}"
    rounded: "{rounded.base}"
    padding: "1rem 2.6rem"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.brass-bright}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.base}"
---

# Design System: BOZIC Watches — Konzept (Tresorraum bei Nacht)

> **Scope.** This document governs one surface only: the *Konzept* ("Tresorraum bei Nacht" / vault-after-hours) page world in `shopify-theme/` — visually mastered in `shopify-theme/preview/konzept-preview.html` and shipped as the generated Liquid section `shopify-theme/sections/konzept.liquid`. It does **not** apply to the pre-existing Next.js frontend in `app/`. That frontend's prior visual identity (cream/gold/system-sans) was explicitly discarded by the project owner for this surface only — the `app/` code itself is untouched and is out of scope for this file. A future DESIGN.md for `app/`, if one is written, is a separate document.

## Overview

**Creative North Star: "Tresorraum bei Nacht" (The Vault After Closing)**

The page stages itself as a vault visited after the shop has closed: the reader carries the only light source through eight lit display cases in a row, one chapter each. Light *is* the hierarchy — not a metaphor left in the copy, but the literal mechanism of the layout: every chapter casts its own low-opacity spotlight from a different corner of the section, every panel gets its glow from a brass line across its own top edge, and the one moment of motion in the whole build is an inventory of watches lighting up fixture by fixture as they move through the sales pipeline. The build's own direction comment records two explicit rejections: the white consulting deck, and the generic gold-on-black luxury landing page built from a card grid. This page is neither — it is one continuous dark room, not a stack of bright cards.

The material palette stays almost monastic: a warm black-brown ground, and exactly one accent hue (brass) that only ever dims or brightens, never hands off to a second color — except once, deliberately, for the tax-law callout. Bodoni Moda's auction-house italics carry the single emotional word inside a headline; Archivo runs the reading weight at a light 300; monospace is reserved entirely for anything that is a fact rather than a feeling — an index, a date, an amount. Every corner in the system is square.

The world also carries real shipping constraints that shaped it: it ships as one self-contained Shopify Liquid section generated straight from the preview file (`build-liquid.py`, no build pipeline), so its type stack leans on Google Fonts (Bodoni Moda + Archivo) plus a system monospace rather than a third webfont, and every class is `bz-`-prefixed so it cannot collide with whatever theme it's dropped into. The page is German-language and read on both desktop and phone.

**Key Characteristics:**
- Warm black-brown vault ground (`#0C0B09`) lit almost entirely by one metal — brass dims and brightens to carry every signal; a second hue (velvet green) appears exactly once, by design, and stays spent.
- Vitrine panels: a top-lit vertical gradient plus a brass line across the top edge — the room's one signature surface, reused everywhere a block needs a container.
- Bodoni Moda serif for anything felt (headlines, the italic accent word, the rare "headline numeral"); Archivo (300) for anything read; monospace with tabular figures for anything counted.
- Every corner is square; the only "round" mark anywhere is a 45°-rotated diamond on the roadmap timeline.
- Each chapter casts its own spotlight from a different position — the page never lights two chapters from the same angle in a row.
- Exactly two things move: the pipeline lights up step by step on scroll, and each chapter head fades up on scroll. Everything else is static by default and fully legible with JavaScript or motion disabled.

## Colors

A near-black room lit almost entirely by one warm metal; the only other hue is a single, deliberately rationed dark green surface for the tax-law callout.

### Primary
- **Brass** (`#C9A24B`): the one recurring accent. Carries emphasis everywhere it appears — borders that are meant to have caught light, index numerals, active/"live" states, hover fills.
- **Brass Bright** (`#E9CE80`): brass at full light. The italic accent word inside a headline, hover text on a filled button, the price/total figures that should draw the eye first (sum rows, price-tier numerals, the § 25a symbol), the SLA badge.
- **Brass Dim** (`#8A7439`): brass receded. Used only where brass needs to read as present but quiet — the low end of the price-scale gradient, and internal scrollbar thumbs.

### Secondary
- **Velvet** (`#10241C`): a dark, desaturated green spent exactly once, as the fill of the § 25a differenzbesteuerung callout box. It is a bounded exception to the single-accent palette, not a second general-purpose color — see **The One Exception Rule** below.

### Neutral
- **Vault** (`#0C0B09`): the base ground color of the entire page and the hero background.
- **Panel** (`#16130E`): the base/lower stop of every vitrine panel's gradient.
- **Panel Lit** (`#1C1812`): the lit/upper stop of that same gradient — panels are always built `panel-lit → panel`, never a flat fill.
- **Ivory** (`#F2EDE2`): primary text color, and the color selection/focus-outline is drawn against.
- **Ivory Dim** (`#B3AA96`): secondary/supporting text — leads, body copy, informational labels.
- **Line Faint** (`rgba(242, 237, 226, 0.10)`): the default 1px hairline — divider between chapters, ordinary borders, ordinary table rows.
- **Line Brass** (`rgba(201, 162, 75, 0.28)`): a translucent brass hairline reserved for edges meant to read as lit — most consistently the top edge of a panel.

*Note: a tenth variable, `--vault-deep` (`#100E0B`), is declared alongside Vault in the source but is never actually drawn upon anywhere in the build — recorded here for completeness, not as part of the working palette.*

### Named Rules
**The Single Accent Rule.** Brass — dimming to `#8A7439`, brightening to `#E9CE80` — is the only color allowed to mean "important" anywhere on the page: sum rows, hover states, the active pipeline step, the italic word inside a headline, badges, any border that carries light. Nothing else competes for that job.

**The One Exception Rule.** Velvet (`#10241C`) is spent exactly once, on the § 25a legal callout, and stays spent. It does not recur as a general second accent, a background tint, or a status color anywhere else in the build.

## Typography

**Display Font:** Bodoni Moda (with Bodoni MT, Didot, Times New Roman, serif)
**Body Font:** Archivo (with Helvetica Neue, Arial, sans-serif)
**Label/Mono Font:** ui-monospace (with SF Mono, SFMono-Regular, Menlo, Consolas, monospace)

**Character:** An auction-house Didone (Bodoni Moda, loaded as a variable font and used at non-standard weights like 460/480 that only a variable axis produces) paired with a light, quiet grotesque (Archivo at 300) for reading weight, plus a system monospace kept strictly for anything that is data rather than voice.

### Hierarchy
- **Display** (480, `clamp(2.9rem, 7.2vw, 5.9rem)`, line-height 1.04): the hero H1 only — the page's single moment of full-size type. Its emphasized word runs in italic at weight 460 and switches to Brass Bright.
- **Headline** (480, `clamp(2.1rem, 4.6vw, 3.4rem)`, line-height 1.08): one per chapter (eight total). Always prefixed inline, inside the same `<h2>`, with its two-digit chapter index in mono brass — never as a caption line sitting above the headline.
- **Title** (500, 1.1875–1.5625rem, serif): the heading of a block inside a chapter — a business pillar, an architecture node, an admin column, a channel head, a roadmap phase. Downshifts to sans/600 at ~0.94rem in exactly two places, both where the heading supports a more prominent adjacent numeral rather than leading its own block: the price-tier label sitting beneath each large serif price figure, and each decision's heading sitting beside its mono index.
- **Body** (300, 0.8125–0.9375rem, line-height 1.7 inherited): lead paragraphs, block copy, list items. Chapter lead paragraphs cap at a 44rem measure for readability.
- **Label** (500, 0.6563rem, uppercase, 0.3em tracking, per the reusable `.bz-cap` class): captions, tags, datelines. Runs Brass when the label is itself doing emphasis (a table caption, a tag, a callout) and Ivory Dim when it is purely informational (the hero dateline, the footer). Narrower siblings in the same recipe run 0.16–0.26em tracking for tighter contexts (nav chips, footer, table headers, badges).
- **Mono / Figures** (ui-monospace stack, tabular-nums, size inherited from context): reserved for anything counted rather than felt — chapter indices, dates, budgets, table amounts, metafield keys, timeframes.

### Named Rules
**The Serif-Feeling, Mono-Fact Rule.** Bodoni Moda carries anything meant to land emotionally: headlines, the italic accent word, and the rare "headline numeral" — a price-tier figure, the § 25a paragraph symbol — both of which are large, singular, and set in serif specifically *because* they're meant to be felt rather than scanned. Everything that is a datum instead — chapter index, date, budget line, table amount, metafield key — sits in the mono stack with tabular figures.

**The Tracking-Is-For-Labels Rule.** Letter-spacing beyond the display's near-invisible 0.005em appears only on uppercase micro-labels and mono figures (0.05em–0.3em). Headlines, titles, and body copy always run at normal tracking.

## Layout

The container (`.bz-wrap`) caps at 76rem (1216px), with horizontal padding of 1.5rem below 1024px widening to 2.5rem at 1024px and up.

Each chapter is one `<section class="bz-sec">` with 6.5rem of vertical padding (4.25rem below 720px). Consecutive chapters are separated by nothing heavier than a 1px `line-faint` hairline — no card boundary, no background shift. The page is one continuous room, not a stack of pages.

**The Shifting Spotlight Rule.** Every section carries its own low-opacity radial highlight, and the highlight's position rotates chapter to chapter: the default (`.bz-sec`) lights from the upper-left (18% 0%), `.bz-sec--right` sections — Architecture, Abrechnung, Roadmap — light from the upper-right (85% 0%), and the closing `.bz-sec--center` chapter (Entscheidungen) lights from top-center (50% 0%). This is the THESIS ("Licht ist Hierarchie") made literal in the grid, not just asserted in copy.

Every chapter is indexed 01–08 inline in its own headline, echoed in the hero's chapter-chip navigation and echoed again in two counted lists inside the body (the pipeline's eight steps, the eight decisions) — the page reads throughout like a run of consecutive placards in a catalog, not a series of unrelated sections.

Every multi-column composition collapses to a single column somewhere between 720px and 1024px, at whatever breakpoint its own density calls for: hero (7fr/5fr → 1 col at 900px), business pillars (1fr/1.15fr/1fr → 1 col at 900px), architecture rows (2-/3-col → 1 col at 760px), admin columns (1.1fr/1fr/1fr → 1 col at 960px), billing (5fr/7fr → 1 col at 960px), marketing channels (1fr/1fr → 1 col at 900px), roadmap checklists (1fr/1fr → 1 col at 820px), decisions (1fr/1fr → 1 col at 860px). Tables are the one exception to "collapse to one column" — they scroll horizontally instead, but only inside their own container; the page itself never scrolls sideways.

## Elevation & Depth

Flat by default — there is no drop-shadow vocabulary for hover-lift or card elevation anywhere in this build. Depth instead comes from two things working together: each section's own faint radial spotlight sitting behind the content, and the `panel-lit → panel` vertical gradient inside every vitrine panel, which makes a panel look lit from above rather than raised off the page.

### Shadow Vocabulary
- **Hub bezel** (`box-shadow: inset 0 0 0 4px var(--vault), inset 0 0 0 5px var(--line-brass)`): an inset double-ring frame used on the architecture diagram's single hub node (Shopify Admin), to fake an engraved bezel around the one element every other node in the diagram points to.
- **Vault bezel** (`box-shadow: inset 0 0 0 5px var(--velvet), inset 0 0 0 6px rgba(201, 162, 75, 0.35)`): the same inset-ring technique in Velvet, used once, on the § 25a legal callout.
- **Exhibit shadow** (`filter: drop-shadow(0 18px 42px rgba(0, 0, 0, 0.55))`): a soft ambient object-shadow under the hero's SVG watch exhibit only — grounding an object in its spotlight, not lifting a UI surface.

### Named Rules
**The No-Lift Rule.** Nothing elevates on hover or by default. The inset double-ring bezel is reserved for exactly the two elements that already carry it — the architecture hub and the § 25a box — and is not a general "important card" treatment.

## Shapes

Every corner in the build is square. The only `border-radius` present anywhere in the stylesheet is an explicit `0` (reasserted defensively on the scrollbar thumb) — nothing rounds. The one departure from rectilinear geometry in the entire system is the roadmap timeline's marker: a 0.65rem square rotated 45° into a diamond, used nowhere else.

Borders are 1px hairlines throughout, in exactly two colors: `line-faint` for ordinary dividers, and `line-brass` for any edge meant to read as having caught the light — most consistently the top edge of a panel. Every `.bz-case` panel pairs that brass top border with a second, separate glint: a 1px gradient line inset 8% from each side, layered directly on top of the border (`linear-gradient(90deg, transparent, rgba(233, 206, 128, 0.55), transparent)`). The border and the glint always travel together — a panel is either lit (both) or not (neither); there is no half-lit state.

## Components

### Buttons
- **Character:** a brass-bordered rectangle that fills solid on contact — no lift, no shadow, only a color inversion.
- **Shape:** square corners (`{rounded.base}` = 0), 1px border, padding `1rem 2.6rem`.
- **Primary** (`.bz-btn`): transparent fill, 1px Brass border, Brass Bright uppercase label (0.6875rem, weight 600, 0.26em tracking). Hover inverts to solid Brass fill with Vault-colored text, over 0.45s ease.
- **Ghost** (`.bz-btn--ghost`): border and label start at the faint/dim neutrals (`line-faint` / Ivory Dim); hover never fills — only the border and label brighten to Brass / Brass Bright. Used for the lower-commitment action beside a Primary button.
- The same fill-on-hover logic drives the hero's chapter-chip navigation (`.bz-hero-nav a`): Brass border at rest, inverts fully to Brass fill with Vault text (including the mono index number) on hover, over 0.4s ease.

### Navigation
The hero carries eight small chips — a mono two-digit index plus a label, wrapped in a row beneath the hero copy — each a miniature of the Primary Button. It serves as both wayfinding and the hero's primary call to action. There is no persistent/sticky site header; the page has exactly one navigation moment, at the top.

### Cards / Containers — the Vitrine Panel
- **Character:** a display case, not a card — it has a light source, not a shadow.
- **Background:** two-stop vertical gradient, Panel Lit (`#1C1812`) into Panel (`#16130E`) at 38%.
- **Border:** 1px `line-faint`, with the top edge swapped to `line-brass` plus the glint-line described under Shapes.
- **Corner style:** square, always.
- **Internal padding:** component-dependent, roughly 1.5rem–2.25rem; there is no fixed padding scale.
- **Featured variant** (`.bz-node--hub`, the architecture diagram's Shopify Admin node): adds a solid 1px Brass border, the inset double-ring bezel, and a brighter gradient start (`#221C12`) — reserved for the single hub of a diagram. The lead business pillar (`.bz-pillar--lead`, Ankauf) borrows the same brighter-gradient-start idea (`#211B12`) without the border or bezel — a lighter version of the same "this one matters most" signal.

### Tables
- **Character:** a ledger, not a UI grid — hairline rows, no zebra striping, no cell backgrounds.
- **Caption / header:** uppercase Label register (caption 0.6563rem/0.3em/Brass; `<th>` 0.5938rem/0.2em/Ivory Dim), the header row bracketed by a `line-brass` top rule and a `line-faint` bottom rule.
- **Body rows:** `line-faint` bottom hairlines only; amount columns (`.bz-right`) switch to mono with tabular figures.
- **Sum row** (`.bz-sum`, the cost table's total): its own `line-brass` top rule, text turns Brass Bright — the one place a table row is allowed to carry the accent color.
- **Fields list** (`.bz-fields`, the metafield inventory): the same hairline-row ledger logic at mono 0.7188rem, with an inline uppercase tag distinguishing public fields (Brass) from internal-only fields (Ivory Dim, `.bz-tag--int`) — color, not an icon, carries the public/internal distinction.

### Signature Components
- **The Pipeline Rail** (`.bz-rail`, chapter 03 — Verwaltung): the one deliberate motion moment in the system. Eight case-styled chips in a wrapped row, each auto-numbered by a CSS counter (mono, decimal-leading-zero, Brass) rather than hand-typed digits. The step marked `data-live` — "Online," the moment a watch becomes publicly visible — gets a solid Brass border, Brass Bright text, and an appended caption ("im Shop sichtbar"). On scroll into view the chips light up in sequence — opacity + `translateY(6px) → 0` over 0.55s (`cubic-bezier(0.16, 1, 0.3, 1)`), each delayed 95ms after the last via JS — and render fully visible and static without JavaScript or with `prefers-reduced-motion` set.
- **The Price Scale** (`.bz-scale-bar`, chapter 01 — Geschäftsmodell): a 1px horizontal bar gradienting Brass Dim → Brass → Brass Bright left to right, with two tick marks at 33%/66%. Color intensity itself stands in for price magnitude across the three sales-mode tiers. Collapses to a left-rail-divided list below 860px.
- **Process Chips** (`.bz-flow` / `.bz-leadflow`, chapters 04/05): small case-colored steps connected by minimal Brass chevron-arrow SVGs (a single stroked path, not an icon set) — the system's only wayfinding motif for "this happens, then this."
- **The Exhibit** (hero): an engraved-watch SVG (Brass / Brass Bright strokes on transparent, hands fixed at 10:08) standing in for the hero video until one is uploaded. The video layer itself sits at 0.55 opacity over a CSS-only spotlight-cone-and-dust placeholder plus a vignette darkening toward the text side, so the hero composition reads correctly with the video slot empty — which is the deployed default today.
- **Chapter Heads** (every `.bz-head`): the index-plus-title-plus-lead block that opens each chapter. On scroll it fades and rises in as one unit — `opacity 0 → 1`, `translateY(14px) → 0`, 0.75s, the same easing as the Pipeline Rail. This and the Pipeline Rail are the only two places motion happens in the entire build.

## Do's and Don'ts

### Do:
- **Do** keep Brass (`#C9A24B`, dimming to `#8A7439`, brightening to `#E9CE80`) as the only recurring accent hue on the page.
- **Do** give every vitrine-like panel its light from the top — the `panel-lit → panel` gradient, the `line-brass` border-top, and the separate inset glint-line — together, never separately.
- **Do** set every corner to 0. No `border-radius` anywhere in this world except the deliberate 45°-rotated diamond on the roadmap timeline.
- **Do** put anything that is a datum — an index, a date, a budget line, a table amount, a metafield key — in the mono stack with tabular figures; reserve the serif display voice for the rare "headline numeral" and the italic accent word inside a headline.
- **Do** design any hero or media slot to read correctly empty. The current hero has no uploaded video yet, and the CSS spotlight-and-vignette placeholder is what actually ships today.
- **Do** respect `prefers-reduced-motion`: freeze the Pipeline Rail stagger and the Chapter Head fade to their resting (fully visible) state, and pause/detach the hero video — exactly as the build already does.

### Don't:
- **Don't** introduce a second bright accent hue. Velvet (`#10241C`) is spent once, on the § 25a box, and stays spent — don't reuse it as a general background tint or a status color.
- **Don't** round any corner, or add a shadow to fake elevation on a button or a card. This world has no lift, only light — the inset double-ring bezel is reserved for exactly the two elements that already carry it.
- **Don't** stack the uppercase Label style as a standalone eyebrow or kicker line floating above a headline. Every uppercase micro-label in this build is integrated — inline in a headline, a trailing qualifier on a title, a dateline row beneath copy, or a table caption/header — never a freestanding caption above a title.
- **Don't** assume every element carrying the `.bz-r` reveal marker animates. Only two selectors actually transition — `.bz-head.bz-r` (the Chapter Head fade) and `.bz-rail[data-animate] li` (the Pipeline Rail stagger). Everything else marked `.bz-r` renders statically unless new CSS is written for it.
- **Don't** carry this palette or type system into `app/`. That surface's visual identity is a separate, unresolved question and is out of scope for this document.
