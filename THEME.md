# Portfolio Design System & Color Tokens

This document defines the single source of truth for the warm editorial beige and orange design system. All styling relies exclusively on semantic CSS variables and Tailwind tokens.

---

## Token Reference

| Semantic Token | Tailwind Class | Light Theme | Dark Theme | Purpose & Contrast Notes |
|---|---|---|---|---|
| `--background` | `bg-background` | `#F6F0E6` (Warm Beige) | `#1C1612` (Espresso) | Canvas page background |
| `--surface` | `bg-surface` / `bg-card` | `#EFE5D6` (Deeper Beige) | `#261E18` (Warm Dark Surface) | Cards, chips, navigation pills, modals |
| `--border` | `border-border` | `#E0D3BF` (Soft Beige Border) | `#3A2F26` (Muted Brown Border) | Dividers, bounding outlines, inputs |
| `--foreground` | `text-foreground` | `#2B211A` (Deep Warm Brown) | `#F6EEE2` (Cream / Soft White) | High-contrast body & heading text (>11:1 ratio, exceeds WCAG AAA) |
| `--muted-foreground` | `text-muted-foreground` | `#7A6A5A` (Muted Warm Brown) | `#B5A594` (Muted Sand Brown) | Supporting captions, subtitles, hints (>4.5:1 ratio, WCAG AA compliant) |
| `--accent` | `bg-accent` / `text-accent` | `#F26B21` (Vivid Orange) | `#F58A4B` (Luminous Amber Orange) | Interactive buttons, highlights, active icons |
| `--accent-strong` | `text-accent-strong` | `#C2410C` (Burnt Orange) | `#FF9F66` (Bright Creamsicle) | Small text, links, accents requiring higher contrast (>4.6:1 ratio) |
| `--accent-soft` | `bg-accent-soft` | `#FDE6D3` (Light Peach Tint) | `#3A2416` (Deep Amber Tint) | Icon badges, chip backgrounds, soft glow containers |
| `--success` | `text-success` | `#15803D` (Muted Emerald) | `#22C55E` (Crisp Emerald) | Form submission confirmations, success alerts |
| `--error` | `text-error` | `#DC2626` (Muted Red) | `#EF4444` (Crisp Coral Red) | Form errors, retry banners, validation feedback |

---

## Typography Tokens

- **Headings & Title Serif**: `font-serif` -> `Fraunces, Georgia, serif` (Google Fonts optical variable serif)
- **Body & Interface**: `font-sans` -> `Inter, system-ui, sans-serif`
- **Labels, Dates & Numbers**: `font-mono` -> `JetBrains Mono, monospace`

---

## Where to Change Colors

1. **CSS Variables**: Defined in [`src/app/globals.css`](src/app/globals.css) under `:root` (light) and `.dark` (dark).
2. **Tailwind Theme**: Registered in [`src/app/globals.css`](src/app/globals.css) inside `@theme inline`.
3. **Usage Rule**: Always use token names (`bg-surface`, `border-border`, `text-accent`, etc.) instead of hardcoded hex codes or arbitrary utility shades.
