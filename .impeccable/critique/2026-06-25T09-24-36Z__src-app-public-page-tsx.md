---
target: src/app/(public)/page.tsx
total_score: 27
p0_count: 1
p1_count: 2
p2_count: 1
timestamp: 2026-06-25T09-24-36Z
slug: src-app-public-page-tsx
---
## FOCUSED CRITIQUE: Top 3 Remaining Problems

### Issue 1: RentalPurposes — hierarchy inversion and a heavy interaction anti-pattern

**What:** The section heading "Choose your **journey**" at `md:text-7xl` (clamp up to ~80px) is as large or larger than the page's hero H1 (`md:text-6xl lg:text-7xl`). A content section is shouting louder than the page's entrance. The interaction layer — dim + blur inactive items on hover — creates a disorienting strobe effect when a user's mouse passes across the list. Additionally, each `<Link>` routes to `/cars?category=wedding` — but users are sent to a filter URL after scrolling past a rich interactive section, rather than to a pre-filtered view.

**Why it hurts:** The heading size tells visitors "this section is the most important thing on the page" — it's not. The dim/blur dance actively discourages exploration; users learn to avoid hovering rather than engage. The "explore then filter" flow feels like dead-end window shopping.

**Direction:** Reduce heading to match other section h2s (`text-3xl md:text-5xl`). Replace the dim+blur with a simpler active state (brighter icon, subtle shift, no dimming of others). Consider whether the category links should go to dedicated category pages or directly to a pre-filtered `/cars?category=...` with visible results.

### Issue 2: Why Choose Us — the `i < 3` split is the last template artifact standing

**What:** The section renders 6 items with an identical-card-grid-shaped data set, splits them at index 3, and applies two entirely different visual languages. Items 0-2: full rounded cards with `shadow-sm`, `p-6`, filled `bg-amber-400` icons. Items 3-5: `border-bottom` list items with outlined `border-amber-200/60` icons. The same icon (`Shield`) appears twice (items 0 and 5) with different visual treatment. On tablet (`sm:grid-cols-2`), card 3 wraps alone on row 2 while the list items begin — a layout no one looked at.

**Why it hurts:** There is no semantic reason for the split. Users sense the inconsistency as "broken" rather than "designed." The duplicate icon signals the content wasn't curated. The section was already identified in the first critique as a P2 issue and remains the most visible template-scaffold pattern on the page.

**Direction:** Commit entirely to one pattern. The card format is stronger on a light background — the amber-filled icons, shadows, and generous padding signal premium. Convert all 6 items to the card pattern (first 3's template). Deduplicate the `Shield` icon on item 5 — use a lock or key icon. Remove the `i < 3` branching entirely.

### Issue 3: The ending sequence flatlines — Final CTA → Map → Contact → mismatched Footer

**What:** The page's emotional arc peaks at "Ready to hit the road?" (Final CTA), then delivers three consecutive punches of decreasing energy: a dark Map section (no glow, pure black — indistinguishable from the Final CTA behind it) → a white Contact section (abrupt light switch) → a Footer that doesn't visually belong to the brand (`bg-gray-900 text-gray-300` with light-mode `border-border`, zero amber, no connection to the dark-amber design system above).

**Why it hurts:** Peak-End rule violation. Users remember the end of an experience most vividly. The current ending is: map, then contact info, then a footer that looks like a different website. The "Ready to hit the road?" call-to-action is emotionally squandered — there's nothing energizing after it. The Footer is the biggest gap: it uses Tailwind gray tokens (`gray-900`, `gray-400`, `gray-300`, `gray-500`, `border-gray-800`) while the entire page above uses black/amber.

**Direction:** Three options, pick one:
- **Reorder**: Move Contact and Map before Final CTA, so the page closes on the inspirational CTA + footer.
- **Merge**: Collapse Contact into the Final CTA section (inline phone/email, no separate light section), remove Map entirely or move it inline before.
- **Resurface**: Keep order but redesign Map to maintain the dark energy, redesign Contact as a dark section, and redesign the Footer to use the brand's dark palette (bg-black, text-white/70, amber accents).
