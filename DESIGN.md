---
name: DriveEasy Rentals
description: Premium car rental website with a bold, dark, energetic brand face and a functional admin panel.
colors:
  neutral-bg: "#ffffff"
  ink: "#0f172a"
  brand-blue: "#2563eb"
  brand-blue-deep: "#1e40af"
  brand-blue-mist: "#dbeafe"
  brand-amber: "#f59e0b"
  brand-amber-deep: "#d97706"
  brand-amber-mist: "#fef3c7"
  surface: "#f8fafc"
  muted-text: "#64748b"
  border: "#e2e8f0"
  black-bg: "#000000"
  dark-bg: "#0a0a0a"
  off-black: "#0f0f0f"
typography:
  display:
    fontFamily: "Geist, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: -0.03em
  heading:
    fontFamily: "Geist, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Geist, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, Helvetica, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: 0.15em
    textTransform: uppercase
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "80px"
  section-md: "112px"
components:
  button-primary:
    backgroundColor: "{colors.brand-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "16px 48px"
  button-secondary:
    backgroundColor: "{colors.brand-amber}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "16px 48px"
  button-amber-dark:
    backgroundColor: "{colors.brand-amber}"
    textColor: "#78350f"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.brand-blue}"
    border: "2px solid {colors.brand-blue}"
    rounded: "{rounded.md}"
    padding: "12px 28px"
  card-public:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "24px"
    border: "1px solid {colors.border}"
  card-dark:
    backgroundColor: "rgba(255,255,255,0.02)"
    rounded: "{rounded.lg}"
    padding: "24px"
    border: "1px solid rgba(255,255,255,0.06)"
---

# Design System: DriveEasy Rentals

## 1. Overview

**Creative North Star: "The Open Road"**

DriveEasy Rentals lives at the intersection of premium automotive confidence and modern digital clarity. The public face is bold, dark, and energetic — black backgrounds with amber-400 as the single accent color create a stage for vehicle photography and transparent copy. The admin face is clean and utilitarian — white/surface backgrounds with blue as the primary action color and amber as the secondary accent.

The system rejects corporate car-rental clutter (beige, busy, generic) and also rejects the AI-default playbook (cream surfaces, tiny tracked eyebrows on every section, gradient text, glassmorphism). What remains is a design that lets content lead: the cars, the pricing, and the service promise do the selling.

**Key Characteristics:**
- High contrast: black or white backgrounds, never warm-tinted neutrals
- Single accent (amber) on dark surfaces — used sparingly for maximum impact
- Generous vertical rhythm: dark sections run 80px/112px padding
- Clean geometric sans (Geist) across all surfaces — one family, multiple weights
- Rounded corners are deliberate but not soft: 8px for controls, 12px for cards, 16px for hero containers

## 2. Colors

The palette has two distinct modes: dark (public brand) and light (admin / functional UI).

### Primary

- **Brand Amber** (#f59e0b / oklch(0.76 0.16 75)): The single accent on dark surfaces. Used for CTAs, icon containers, stat numbers, and decorative border glows. Never exceeds ~10% of any dark section's surface area — rarity is the point.
- **Brand Blue** (#2563eb / oklch(0.55 0.18 265)): The primary action color on light surfaces. Used for buttons, links, and interactive elements in the admin and functional UI.

### Secondary

- **Brand Amber Deep** (#d97706): Button hover state for amber buttons.
- **Brand Blue Deep** (#1e40af): Button hover state for blue buttons.

### Neutral

- **Ink** (#0f172a): Body text on light backgrounds. High contrast against white (#ffffff = 15.6:1).
- **Muted Text** (#64748b): Secondary text, labels, placeholders on light backgrounds. 4.6:1 against white — meets WCAG AA.
- **Border** (#e2e8f0): Light mode borders, dividers.
- **Surface** (#f8fafc): Subtle background tint for alternating sections on light pages.
- **Black BG** (#000000): Primary dark section background.
- **Dark BG** (#0a0a0a): Alternate dark section background (testimonials, map area).
- **Off-Black** (#0f0f0f): Final CTA section background.

### Named Rules

**The Single Accent Rule.** On dark sections, amber is the only accent color. No blue, no green, no secondary hues. The entire dark experience is black + white + amber. This constraint is what makes the brand feel deliberate rather than assembled.

## 3. Typography

**Display / Body Font:** Geist (with Helvetica/Arial fallback)
**Mono Font:** Geist Mono (with monospace fallback)

**Character:** Geist is a clean, geometric sans-serif with subtle warmth. It works at every size from 10px labels to 4.5rem hero headlines without feeling cold or corporate. The single-family approach means no pairing to get wrong — hierarchy comes from weight and size alone.

### Hierarchy

- **Display** (700, clamp(2.5rem, 5vw, 4.5rem), 0.95): Hero headlines on dark sections. `text-wrap: balance`. Letter-spacing: -0.03em.
- **Headline** (700, clamp(1.75rem, 4vw, 3rem), 1.1): Section headings (`h2`). `text-wrap: balance`.
- **Title** (600, 1.125rem, 1.3): Card titles, feature names.
- **Body** (400, 1rem, 1.6): All prose. Max line length 60–65ch on text-heavy sections.
- **Label** (600, 0.75rem, tracking 0.15em, uppercase): Section eyebrow labels, badge text, table headers.

### Named Rules

**The One-Family Rule.** Geist is used everywhere — display, body, and label. No secondary font family. Variation comes from weight, size, and tracking alone. If a section needs more distinction, use amber accent or spacing, not a new typeface.

## 4. Elevation

The system uses shadows sparingly. Light-mode cards use `shadow-sm` at rest and `shadow-md` on hover — subtle structural depth. Dark-mode cards are flat by default (border-only) with a `shadow-lg` amber glow reserved exclusively for primary CTAs on dark backgrounds (`shadow-lg shadow-amber-500/20`). The hero image container uses `shadow-2xl` for a premium floating effect.

Tonal layering is preferred over shadows for creating separation: dark on dark (`white/[0.02]` on `bg-black`), light on light (`bg-white` on `bg-surface`).

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows are a response to interactive state (hover on cards, CTA buttons) or to signal premium containers (hero image). Never both.

## 5. Components

### Buttons

- **Shape:** Rounded corners (8px).
- **Primary (light mode):** Blue background (`#2563eb`), white text, hover darkens to `#1e40af`. Used for main actions in admin/functional UI.
- **Secondary (light mode):** Amber background (`#f59e0b`), white text, hover darkens to `#d97706`.
- **Amber Dark CTA:** Amber background (`#f59e0b`), dark text (`#78350f`), amber glow shadow. Used for primary CTAs on dark sections (Hero, Final CTA).
- **Outline:** Blue border, blue text, transparent background. Hover fills with blue-tinted background.
- **Sizes:** sm (14px, 16px 24px), md (16px, 24px 24px), lg (18px, 32px 32px).
- **Phone Link (dark mode):** Transparent, white border + white text at 70% opacity. Hover increases border and text opacity. No background fill.

### Cards

- **Corner Style:** Rounded (12px).
- **Light-mode card:** White background, 1px border (`#e2e8f0`), `shadow-sm`, 24px padding. Hover: `shadow-md`.
- **Dark-mode card:** 2% white background on black (`rgba(255,255,255,0.02)`), 1px white border at 6% opacity, 24px padding. Hover: background increases to 4% white.
- **Info panel (map section):** Same as dark-mode card but 20px padding and tighter spacing.

### Inputs / Fields

- **Style:** White background, 1px border (`#e2e8f0`), 8px radius, 12px padding.
- **State:** Blue border + subtle blue ring on focus. Error state: red border + red ring.
- **Disabled:** 50% opacity, not-allowed cursor.

### Navigation

- **Desktop:** Inline links with medium weight, 14px. Default muted text, active = primary blue. Hover transitions to primary.
- **Mobile:** Stacked full-width links in a slide-down panel. Same color treatment.
- **Logo sits left, nav links center/right, phone + CTA right.**

### Section Pattern

- **Padding:** 4rem top/bottom on mobile, 6rem on desktop (`py-16 md:py-24`).
- **Dark sections (homepage):** 5rem top/bottom on mobile, 7rem on desktop (`py-20 md:py-28`), with a centered or split layout, optional amber glow spot via `blur-[150px]`.
- **Heading pattern:** Eyebrow label (amber, 12px, uppercase, tracked 0.15em) + h2 (3xl mobile, 5xl desktop, bold, white/ink) + optional subtitle (white/40 or muted).

## 6. Do's and Don'ts

### Do:
- **Do** use amber as the sole accent on dark backgrounds — it's the brand's voice.
- **Do** use generous vertical padding on dark sections (80px mobile, 112px desktop).
- **Do** keep body copy high contrast: black text on white, white/80 text on black.
- **Do** use `text-wrap: balance` on h1–h3 for even line breaks.
- **Do** use the flat-border card style on dark sections; let the content breathe.
- **Do** keep phone link CTAs on dark sections transparent with a white border.

### Don't:
- **Don't** use cream, beige, sand, or warm-tinted backgrounds — the brand is black/white, not paper-toned.
- **Don't** use tiny uppercase tracked eyebrow labels above every section — one or two is voice; every section is AI grammar.
- **Don't** use gradient text, glassmorphism, or decorative blurs as default styling.
- **Don't** use blue as an accent on dark sections — dark mode = amber only.
- **Don't** mix the two design modes: dark sections are always black-based, light sections are always white-based.
- **Don't** add numbered section markers (01 / 02 / 03) unless the content is a literal sequence.
- **Don't** use side-stripe borders (`border-left` > 1px) as decoration on cards or panels.
