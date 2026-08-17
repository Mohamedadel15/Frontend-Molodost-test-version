# Animation Inventory

Durations/easings marked *(est.)* are visual estimates — Framer does not expose timeline values in published CSS. Calibrate against the live site during **Phase 10 (Animations)**, with final convergence in Phase 16 (visual regression), by side-by-side comparison.

## Motion tokens (proposed, derived from observation — single source for all durations below)

| Token | Value *(est.)* | Use |
|---|---|---|
| `motion-fast` | 250ms | hovers, icon slides, dot travel |
| `motion-normal` | 600ms | reveals, fades, accordion |
| `motion-slow` | 1200ms | hero image entrance, image scale-ins |
| `ease-out-soft` | cubic-bezier(0.25, 0.1, 0.25, 1) | default reveal |
| `ease-inout` | cubic-bezier(0.44, 0, 0.56, 1) | crossfades, scroll scenes |

Reveal defaults: fade + translateY 40px → 0, once per page load, viewport threshold ~20%, child stagger 80–120ms.

Technology plan: **CSS keyframes for the hero entrance** (it is the LCP region — it must be server-rendered and visible without JS; the timeline is pure opacity/translate/scale). **Motion (Framer Motion)** for below-the-fold reveals, hovers with state, accordion. **GSAP + ScrollTrigger** ONLY for the pinned scroll scenes (Toggle, How It Works, Big Quote reveal) and the odometer. GSAP logic is dynamically imported into already-server-rendered section markup with reserved heights — never `ssr:false` on the section component itself (CLS).

Touch policy (all hover-driven effects): hover states are enhancement-only — touch devices get the default state; active/focus-visible mirror the hover colors without the slide. No functionality may hide behind hover.

---

## 1. Hero entrance (page load)
- Implementation: CSS keyframes on server-rendered markup (see above).
- Background image: opacity 0→1, scale 1.05→1, `motion-slow`.
- Headline: opacity 0→1, y 40→0, `motion-normal`, delay ~200ms.
- Right paragraph: same, delay ~350ms. CTA pill: same, delay ~500ms. Header: fade, delay ~100ms.
- Mobile: identical (durations unchanged). RTL: unchanged (vertical motion). Reduced-motion: fade only, 150ms.

## 2. Toggle scroll scene (pinned, the signature animation)
Measured at the audit viewport (639px tall): section = 1195px total; inner container 100vh sticky; scrubbed scroll distance = section height − 100vh ≈ 556px (≈ 0.87 viewport-heights of scrub). Express in code as `height: 187vh` *(est. — height scales with viewport height; verify)*. Scroll progress drives:
- Stage A (0→30%): hero image lightens/washes out to near-white; navy/teal photographic scene fades in with light-streak imagery and circle line-art; white headline "If only unlocking peak vitality…" + sub-paragraph fade/rise in.
- Stage B (30→55%): "VITALITY" label + switch track fade in above the headline; the white knob animates into the track (drops in from above *(est.)*); switch shows OFF (knob left, track light).
- Stage C (55→100%): background crossfades to white; switch flips ON (knob slides right, track fills `#244C5F`); headline crossfades to "There is no single switch. But there is Longevity by Design." in `#2E3231`; sub-paragraph swaps to the 5D Framework line.
- Deep-link anchor lands on the ON state.
- Mobile: same scene, shorter pin distance *(est.)*; scrub stays scroll-linked (no autoplay). RTL: OFF/ON knob travel mirrors (ON = knob at inline-end). Reduced-motion: static ON state, no pin.

## 3. Section reveals (all sections)
- Trigger: viewport enter (~20%), once. Fade + y 40→0, `motion-normal`, ease-out-soft; staggered children (heading → body → CTA → cards, 80–120ms apart).
- Cards stagger in reading order — **RTL: right-to-left** via DOM order, not a transform flip.
- Mobile: identical, threshold ~15% *(est.)*. Reduced-motion: opacity-only 150ms.

## 4. How It Works (pinned steps)
- Heading + intro: standard reveal.
- Steps block pins for ~1736px of scroll (measured "Steps" height at audit viewport). For each of the 3 steps: serif title + paragraph fade/rise in on the left, previous step fades out; the giant navy number (right, ~560px tall) transitions 01→02→03 — crossfade with slight vertical roll *(est.)*, ease-inout.
- Background squiggle line-art: static (subtle parallax drift *(est., verify)*).
- Mobile: unpinned; steps stack and reveal normally with smaller numbers *(assumption — verify at Phase 9)*. RTL: number column mirrors to inline-start, text inline-end. Reduced-motion: unpinned stacked list, no number animation.

## 5. Big Quote scroll reveal
- Full-bleed dark section. Quote starts at ~25% white opacity and reveals to full white **progressively with scroll** (word/line-level scrub). Attribution fades in at the end.
- Mobile: identical, shorter scrub *(est.)*. RTL: reveal follows Arabic reading order automatically (DOM order). Reduced-motion: static full-opacity text.

## 6. Statistics odometer
- Trigger: viewport enter, once. Each digit column rolls (vertical 0–9 strip) to target over ~1.2s (`motion-slow`) ease-out; "+" static. DOM evidence: per-digit strips in the published page.
- Digits are Western (latn) in BOTH locales — pin `numberingSystem: 'latn'` in the shared formatter.
- Mobile: identical. RTL: number value itself stays LTR (digit order unchanged); label alignment mirrors. Reduced-motion: static numbers.

## 7. Buttons (hover/press)
- Hover: background/text colors invert (navy ↔ white) and the dot slides to the opposite end, label shifts — `motion-fast`, ease-inout. Pure CSS (`:hover` + transforms with logical positioning) — no JS.
- Touch: no hover simulation; `:active` shows the inverted colors instantly. Focus-visible: same as hover + outline.
- RTL: dot sides come from logical inset properties; slide direction mirrors automatically.

## 8. Header variant swap
- Fixed header switches White ↔ Dark text variant when leaving/entering the hero (threshold ≈ hero height − header height). Crossfade ~250ms (`motion-fast`) *(est.)*.
- Applies to links and CTA pill variant together. Active-page link underlined.
- Mobile: same logic on the compact header. Reduced-motion: instant swap.

## 9. FAQ accordion
- Expand/collapse: height auto-animate `motion-normal` ease-inout; plus-circle icon rotates 45° *(est.)*.
- One-open-at-a-time *(unverified — check live during build)*.
- Mobile: identical. RTL: icon at inline-end, text inline-start. Reduced-motion: instant toggle.

## 10. Story feature images
- Two stacked images reveal with scale 1.06→1 + fade, `motion-slow`, ease-out-soft; subtle parallax offset between the two layers on scroll *(est.)*.
- Mobile: reveal identical; parallax reduced or disabled *(est.)*. RTL: image column mirrors; parallax (decorative vertical/depth) NOT mirrored. Reduced-motion: static, no parallax.

## 11. Pricing toggle (services/prices)
- "ONE ↔ UP TO +3 (20% OFF)": switch swaps the visible card set (crossfade ~300ms *(est.)*). Same switch component as §2 stage C in miniature, here user-interactive.
- Mobile: identical. RTL: knob travel mirrors. Reduced-motion: instant swap.

## 12. Mobile menu *(design unverified — see design-inventory Open Questions)*
- Assumed: hamburger → full-screen overlay/drawer, links stagger in (reading order), `motion-normal`; focus trap; body scroll lock.
- RTL: drawer origin at inline-end; stagger follows DOM. Reduced-motion: instant open/close.

## 13. Footer
- Newsletter/link columns: standard reveal (§3). Decorative long-line squiggles cross the seam; static *(verify — possible slow drift)*.
- Mobile: standard reveal. Reduced-motion: §3 policy.

## RTL animation policy (summary)
- Vertical motion (fades/rises): unchanged.
- Reading-order staggers: follow DOM order → automatically right-to-left in Arabic.
- Semantic horizontal motion (toggle ON direction, button dot travel, drawer origin): mirrored via logical positioning.
- Decorative motion (parallax, image scale, squiggle drift): NOT mirrored.
- Direction is provided to animation primitives from the `[locale]` layout via context/props (server-known) — never read from `document.dir` at render time (hydration safety).

## Reduced motion policy
`prefers-reduced-motion: reduce` ⇒ no pinned scenes (content stacks statically), no parallax, no odometer, opacity-only reveals ≤150ms, accordion/menu near-instant. Implemented centrally (`useMotionPreferences` returns an SSR-safe default and applies the real media-query value in an effect; CSS animations use the media query directly). All content fully accessible without motion.
