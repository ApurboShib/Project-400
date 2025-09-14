# Design System – UNC Portal (Dusk–Aurora Theme)

This document describes the core design tokens, usage patterns, motion guidelines, and accessibility considerations introduced in the new UI refactor.

## 1. Color Tokens

All colors are defined as HSL components in CSS variables (see `src/index.css`) and consumed in Tailwind via semantic names (`bg`, `surface`, `content`, `primary`, etc.). Tailwind color usage supports opacity with `/` syntax due to `<alpha-value>` placeholder.

Semantic variables:

```
--color-bg
--color-surface
--color-overlay
--color-border
--color-ring
--color-shadow
--color-content
--color-content-muted
--color-{primary|secondary|accent|danger|warn|success|info}
--color-{primary|secondary|accent|danger|warn|success|info}-fg
--color-aurora-{1..4}
```

Recommended usage:

- Page background: `bg-bg`
- Panels/cards: `bg-surface` or `glass-panel`
- Elevated overlays/menus: `bg-overlay`
- Standard text: `text-content`
- Muted/descriptive text: `text-content-muted`
- Primary CTA: gradient button `.btn-primary-gradient` or `bg-primary text-primary-fg`
- Status colors: `text-success`, `bg-danger/10`, etc.

### Gradients

Utility backgrounds:

- `bg-gradient-aurora` – multi-stop brand gradient
- `bg-gradient-radial-soft` – subtle radial accent

Gradient text: `.gradient-text`

## 2. Radius & Shadow

```
--radius-sm: 4px
--radius: 10px
--radius-lg: 18px
```

Glass & elevation are handled with `.glass-panel` (blur, subtle border, layered shadow) + optional hover effects (`hover-lift`).

Shadows (Tailwind):

- `shadow-soft`
- `shadow-elevated`
- `shadow-glow` (focus / emphasis)

## 3. Motion & Animation

Keyframe mappings (Tailwind):

```
animate-fade-in
animate-slide-up
animate-scale-in
animate-pulse-soft
animate-float-y
animate-shimmer
animate-reveal
animate-aurora-shift
```

Custom utilities:

- `.hover-lift` (translate Y + shadow)
- `.reveal` (entry animation wrapper)
- `.shimmer-bg` (skeleton / highlight)
- `.focus-ring` (accessible focus style)

Timing functions:

```
--ease-out: cubic-bezier(.2,.8,.2,1)
--ease-in:  cubic-bezier(.5,0,.7,.4)
```

Additional transitions available via Tailwind: `ease-out`, `ease-in`, `ease-snappy`, `ease-emphasized`.

### Reduced Motion

If user prefers reduced motion, CSS disables animations via media query. To manually opt-out for specific elements add an override or rely on `prefers-reduced-motion` media query.

## 4. Theming & System Mode

`ThemeProvider` supports `light`, `dark`, and `system`. Stored in `localStorage` under `theme`.

- Root element gets `data-theme="light|dark"`.
- Dark mode also applies `.dark` class for compatibility.
- System changes in real-time when `theme === 'system'`.

Toggle logic cycles light → dark → system (if enabled).

## 5. Component Patterns

### Buttons

Primary gradient CTA: `.btn-primary-gradient`
Secondary: existing `<Button variant="secondary" />` (inherits semantic colors)
Use `.focus-ring` for custom focus outlines on non-button interactive elements.

### Cards / Panels

Use `<Card className="glass-panel hover-lift">` for elevated interactive features. Add radial accent with `bg-gradient-radial-soft` overlay.

### Navigation Sidebar

Active link patterns:

- Active item: `text-primary bg-primary/10`
- Indicator bar: absolutely positioned 1px/4px bar with `bg-primary`.
- Hover state: `hover:bg-overlay/40 hover:text-content`

### Hero Section

Layered ambient gradients: absolutely positioned blurred circles + `bg-gradient-aurora`.
Entry motion sequencing uses `animate-reveal`, `animate-slide-up`, `animate-scale-in` for heading, paragraph, and CTAs respectively.

## 6. Accessibility

Contrast targets (approximate on light theme):

- `text-content` on `bg-bg`: ~14:1
- `text-content-muted` on `bg-bg`: ~5:1 (use only for secondary metadata)
- `primary` on `bg-bg`: > 4.5:1
- Buttons (gradient) with `primary-fg`: >= 4.5:1 across mid-tones

Dark theme variants maintain >= 4.5:1 for primary interactive text.

Focus styles:

- Use `.focus-ring` on elements that need a custom accessible outline.

Avoid relying solely on color to communicate state; pair with icons or text labels.

## 7. Adding New Feature Cards

1. Append an object to the `features` array in `homepage.jsx`.
2. Provide `icon`, `title`, `badge`, and `desc`.
3. Optional: add conditional badge variant for status (e.g., secondary, destructive).

## 8. Extending The System

- Add new semantic color: define `--color-new` + Tailwind alias in `tailwind.config.js`.
- Create new animation: add keyframe under `keyframes` + name under `animation`.
- Provide global utility: extend via plugin in `tailwind.config.js` or `@layer utilities` in `index.css`.

## 9. Migration Notes

Legacy CSS variables (`--background`, `--foreground`, etc. in `style.css`) are superseded by new tokens in `index.css`. Gradually refactor components to use new Tailwind semantic color classes (`bg-bg`, `text-content`, etc.). Remove `style.css` variables once all components are migrated.

## 10. Examples

Button example:

```jsx
<button className="btn-primary-gradient focus-ring">Get Started</button>
```

Card example:

```jsx
<Card className="glass-panel hover-lift">
  <CardHeader>
    <CardTitle className="gradient-text">Metrics</CardTitle>
  </CardHeader>
  <CardContent className="text-content-muted text-sm">
    Real-time overview
  </CardContent>
</Card>
```

## 11. Checklist for New Screens

- [ ] Use `min-h-screen bg-bg` or rely on global body background
- [ ] Primary heading uses `.gradient-text` sparingly
- [ ] Interactive clusters have minimum touch target 44px
- [ ] Motion respects reduced-motion preference
- [ ] All focusable elements have visible focus state
- [ ] Color contrast verified (>= 4.5:1 for body text)

---

For further enhancements (charts, dark mode transitions, dynamic theme editor) see roadmap suggestions.

## 12. Detailed Accessibility Notes

- Interactive contrast: Ensure any text inside gradient or colored buttons uses `*-fg` tokens for guaranteed contrast.
- Gradient text fallback: If printing or high-contrast mode triggers, consider adding a utility that reverts `.gradient-text` to solid `text-primary`.
- Motion safety: All custom animations are relatively low amplitude; floating and shimmer are subtle and automatically disabled if `prefers-reduced-motion: reduce`.
- Focus order: Match DOM order (avoid tabindex > 0). Custom components must forward `ref` and support keyboard activation (Enter/Space).
- Icon-only buttons: Provide `aria-label` attributes.
- Status color pairing: Use both color + text (e.g., "Success" badge) for users with color blindness.

### Approximate Contrast (Light Theme)

| Pair                                    | Ratio  | Pass                                      |
| --------------------------------------- | ------ | ----------------------------------------- |
| content on bg                           | ~14:1  | AAA                                       |
| content-muted on bg                     | ~5:1   | AA (normal text borderline, use for meta) |
| primary-fg on primary gradient mid-tone | >4.5:1 | AA                                        |
| danger-fg on danger                     | >4.5:1 | AA                                        |

### Approximate Contrast (Dark Theme)

| Pair                  | Ratio | Pass |
| --------------------- | ----- | ---- |
| content on bg         | >12:1 | AAA  |
| content-muted on bg   | ~5:1  | AA   |
| primary-fg on primary | >5:1  | AA   |

These ratios are based on representative HSL conversions; verify final adjustments with a tool (e.g., Stark, axe, or WebAIM) after any palette tweaks.

## 13. Reduced Motion Hooks (Optional Future)

You can add a small React hook:

```js
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
```

Then conditionally skip heavy animations if `reduced` is true.
