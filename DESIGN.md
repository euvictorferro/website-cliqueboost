---
name: Clique Boost — Brand Guidelines 2025
description: Official brand system (gradient, black, white, Montserrat/Roboto) — replaces the earlier invented "breaker panel" direction now that real brand guidelines exist.
colors:
  bg: "#0b0b0d"
  panel: "#151515"
  panel-raised: "#1c1c1f"
  foreground: "#ffffff"
  muted: "#9a9aa2"
  purple: "#8a2be2"
  blue: "#007bff"
  green: "#00c49a"
  border: "rgba(255, 255, 255, 0.1)"
  border-strong: "rgba(255, 255, 255, 0.2)"
typography:
  display:
    fontFamily: "Montserrat, Arial, sans-serif"
    h1Weight: 700
    h2Weight: 600
    letterSpacing: "-15 (brand spec) / -0.02em to -0.03em (web equivalent)"
  body:
    fontFamily: "Roboto, Arial, sans-serif"
    fontWeight: 400
rounded:
  panel: "20px"
  pill: "9999px"
spacing:
  section-y: "7rem"
components:
  gradient-bg:
    background: "linear-gradient(135deg, {colors.purple} 0%, {colors.blue} 100%)"
  panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
  glass:
    backgroundColor: "rgba(11, 11, 13, 0.6)"
---

## Overview

This is the **official** Clique Boost brand system, sourced from the client-provided "Brand Guidelines 2025" PDF and real logo/favicon assets. It **replaces** the previous DESIGN.md, which documented an invented "electrical breaker panel" world built before real brand materials existed. That world (graphite/amber, Big Shoulders condensed display, Space Mono labels, LED status dots, physical toggle switches) is now retired — treat it as historical only.

The gradient advisories the mechanical detector raises against `#8a2be2` / `#007bff` are expected: those are the client's own documented primary colors (Future Gradient), not an invented AI-cliché gradient. The `gradient-text` warning is likewise expected and accepted — it's used sparingly (a tagline line, a B2B eyebrow, a hover state) as the literal brand mark's device, not as decorative emphasis on arbitrary headings.

## Colors

Primary: Deep Black `#151515` (site background, slightly deepened to `#0b0b0d` for web contrast), Pure White `#ffffff` (foreground), Future Gradient `linear-gradient(135deg, #8a2be2, #007bff)` (primary accent — buttons, key phrases, active states, numbered badges). Secondary palette exists in the brand guidelines (Cyber Pink, Warning Yellow, Neon Cyan, Error Red, Teal Data, etc.) but is **not currently used** on the marketing site — reserved for future data-visualization or status contexts (e.g. inside the Clique Boost Dash product itself), not the institutional site.

## Typography

Montserrat (Bold for H1, SemiBold for H2) for all display type; Roboto Regular for body copy. This replaces both the original Bricolage Grotesque/Caveat pairing and the later Big Shoulders/Space Mono industrial pairing. Per the Apple Design skill's optical-sizing guidance, tracking is size-specific: large display headings use `-0.02em` to `-0.03em` (approximating the brand spec's `-15` tracking value), body text stays near `0`. **Headlines are normal/title case, never uppercase** — the brand's own materials (tagline, section titles) are never set in all-caps; the earlier industrial world's uppercase convention is retired.

## Layout

Section rhythm stays at 7rem vertical padding (carried over from the incumbent structure). No more corner wayfinding plates or bus-bar convergence lines — those were specific to the retired industrial metaphor. Section headings have no kicker/eyebrow line above them, consistent with the Impeccable skill's craft floor (the heading carries its own weight).

## Elevation & Depth

Per the Apple Design skill: translucent chrome, not opaque bars. `.cb-glass` (`backdrop-filter: blur(20px) saturate(160%)` over `rgba(11,11,13,0.6)`) is used for the navbar once scrolled, the services dropdown panel, and "in production" mockup placeholders — content is meant to feel like it scrolls under a floating layer, not behind a solid strip. `.cb-panel` (solid `#151515`, 20px radius, 1px border) is the base card/surface treatment elsewhere.

## Shapes

20px radius on panels/cards, full pill (`rounded-full`) on all primary/secondary buttons — this matches the button language already visible in the client's own mockups (mugs, bottles) and is a return to the pill-button convention from the very first version of this site, now correctly backed by the real brand gradient rather than an invented one.

## Components

- **Navbar**: translucent once scrolled (`cb-glass`), logo is the real asset (`public/brand/logo-light.png`), "Serviços" is a collapsible dropdown (desktop: hover/click panel anchored top-left to the trigger per Apple Design's spatial-consistency rule, spring transition via the `motion` library; mobile: accordion) listing all 7 items — the 6 client services plus "Aplicativo", which routes to the distinct B2B page.
- **ServiceCard** (`src/components/ServiceCard.tsx`): replaces the retired `Breaker` component. A `motion`-driven panel with spring lift on hover and press-scale feedback (per Apple Design skill: respond on press, not release).
- **ValuesSlider** (`src/components/ValuesSlider.tsx`, homepage only): a horizontally draggable carousel of the brand's official five values (Inovação na Prática, Transparência Radical, Parceria Genuína, Agilidade e Proatividade, Overdelivery como Padrão — sourced from the Brand Guidelines, not invented). Built with `motion`'s `drag="x"` + `dragElastic` + `dragTransition` (power/timeConstant) to get real momentum deceleration and rubber-band resistance at the edges, per the Apple Design skill's direct-manipulation and momentum-projection principles — this is the site's one genuinely gesture-driven surface, not just an entrance-reveal spring.
- **ServiceHero / ProblemSection / SolutionSection / ProcessSteps / DashProofSection / FinalCTA**: all rebuilt off industrial styling onto the official system — gradient dot bullets for pain points, gradient-filled numbered circles for solution items and process steps (echoing the brand guideline's own circle-based "Valores" graphic), pill CTA buttons.
- **`/aplicativo`**: a dedicated page, deliberately not built from `ServicePageTemplate` — different audience (agencies, not end clients), different proof point (production-real feature list sourced from the actual `dashboard_cliqueboost` codebase, not invented SaaS claims), different CTA (waitlist language, not "falar com consultor").

## Do's and Don'ts

- Do treat this DESIGN.md, not taste, as the source of truth for color/type from now on — it reflects an actual client brand asset, not a generated direction.
- Do keep gradient usage restrained: buttons, numbered badges, and at most one accent phrase per section — never a full paragraph or every heading.
- Do keep headlines in normal/title case.
- Don't reintroduce the industrial breaker-panel world (LEDs, mono labels, screws, bus-bar lines) — it's fully retired.
- Don't build the `/aplicativo` page or any future B2B surface on `ServicePageTemplate`.
- Don't claim the B2B multi-tenant program is available for self-signup today — PRODUCT.md records it as foundation-in-production, not yet opened.

## Provenance note

Rebuilt in a single session after the client supplied the official Brand Guidelines 2025 PDF and real logo/favicon assets, superseding the prior self-directed "breaker panel" world (see git history for that version). Motion patterns follow the client-requested Apple Design skill (spring-based dropdown, press feedback, translucent chrome, size-specific tracking). No comp-led image round was run (no image-generation tool available in this environment); inspection was a self-run desktop/mobile screenshot pass plus `impeccable detect --json`, not a fresh-context finish-reviewer verdict.
