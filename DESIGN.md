# Design System — Roami Web (Landing & Marketing)

Derived from the main Roami DESIGN.md. This covers the web landing page and marketing pages.

## Product Context
- **What this is:** Landing page and marketing site for Roami — a map-first travel meetup app
- **Who it's for:** Korean travelers abroad + English-speaking travelers exploring the app
- **Space/industry:** Travel social / meetup — peers: Nomadtable, Going Solo, Meetup, Couchsurfing
- **Project type:** Next.js marketing site with i18n (ko/en)

## Aesthetic Direction
- **Direction:** Organic/Natural — warm and approachable, not cold SaaS
- **Decoration level:** Intentional — subtle warmth through gradients, category color accents, soft shadows
- **Mood:** "해외에서 같이 밥 먹을 사람을 찾는 따뜻함" — warm enough to feel human, clean enough to feel trustworthy
- **Reference sites:** Meetup (redesigned 2025), Going Solo, Nomadtable, Triple

## Typography
- **Korean:** LINESeedKR — 한글 최적화, 둥근 느낌
- **Weights:** 400(Regular), 700(Bold)
- **Loading:** Bundled local fonts (`src/assets/fonts/LINESeedKR-Rg.otf`, `LINESeedKR-Bd.otf`)
- **Fallback:** system (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)

## Color

### Approach
Balanced — brand teal as primary, orange as secondary warm accent, category colors for meetup types, warm neutrals throughout.

### Brand
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| brandTeal | #2CB5AE | `text-teal`, `bg-teal` | Primary brand, nav links hover, section labels |
| brandTealDark | #21958F | `text-teal-dark`, `bg-teal-dark` | Pressed/hover states |
| brandTealLight | #E6F8F6 | `text-teal-light`, `bg-teal-light` | Light backgrounds, badges, step icon backgrounds |

### Secondary
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| secondary | #E07A45 | `text-secondary`, `bg-secondary` | CTA buttons, waitlist submit, section labels (alternating), warm accent |
| secondaryLight | #FFF1EA | `text-secondary-light`, `bg-secondary-light` | Solution/Use Cases section backgrounds, step icon backgrounds (alternating) |

### Category
| Category | Color | Light | Tailwind |
|----------|-------|-------|----------|
| Eat (밥) | #E07A45 | #FFF1EA | `bg-eat` |
| Cafe (카페) | #A78B6B | #F5EDE4 | `bg-cafe` |
| Drinks (술) | #D9A63A | #FFF7E2 | `bg-drinks` |
| Activity (액티비티) | #5C7CE6 | #EEF3FF | `bg-activity` |
| Sightseeing (관광) | #4CAF7A | #EAFAF0 | `bg-sightseeing` |

### Warm Neutrals
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| bgPrimary | #FFFFFF | `bg-bg-primary` | Main background |
| bgSecondary | #F8F6F4 | `bg-bg-secondary` | Alternating section backgrounds, footer |
| bgTertiary | #F0EDEA | `bg-bg-tertiary` | Icon backgrounds, tertiary accents |
| surfacePrimary | #FFFFFF | `bg-surface-primary` | Card surfaces |
| surfaceSecondary | #FAF8F6 | `bg-surface-secondary` | Subtle surface variation |
| borderSubtle | #E8E4E0 | `border-border-subtle` | Light dividers, card borders |
| borderDefault | #D9D4CF | `border-border-default` | Standard borders, input borders |
| textPrimary | #1A1614 | `text-text-primary` | Headings, primary text |
| textSecondary | #6B6460 | `text-text-secondary` | Body text, descriptions |
| textMuted | #9C9590 | `text-text-muted` | Placeholders, captions, timestamps |

### Semantic
| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| success | #22C55E | `text-success` | Verification, completion |
| warning | #F59E0B | `text-warning` | Pending states |
| danger | #EF4444 | `text-danger` | Errors, cancel |
| info | #3B82F6 | `text-info` | Information, tips |

## Color Strategy — Primary vs Secondary

Teal(#2CB5AE) = 여행자/탐험. Orange(#E07A45) = 로컬/환대/따뜻함.

### Where to use teal (primary)
- Navigation hover states
- Section labels (Problem, Features, Why Roami, Trust)
- Hero headline accent ("지도에서 바로 찾기")
- Check icons, step icons (steps 01, 03)
- Trust icon backgrounds (alternating)
- FAQ link hover

### Where to use orange (secondary)
- CTA buttons (Hero, Header 사전등록, Waitlist 제출)
- Section labels (Solution, How it works, Use cases)
- Solution section check icons
- Step icons (steps 02, 04)
- Trust icon backgrounds (alternating)
- Waitlist section badge
- Section backgrounds (Solution: secondary-light, Use cases: secondary-light)

### Pattern: alternating teal/orange
Section labels, step icons, trust icons — teal과 orange를 번갈아 사용하여 시각적 리듬감과 두 브랜드 컬러의 밸런스를 만든다.

## Branding

### Logo
- **File:** `public/logo.svg` (viewBox `0 0 420 150`)
- **Structure:** Overlapping teal+orange squircles icon + "roa"(teal) "mi"(orange) wordmark
- **Header:** 120x43
- **Hero:** 560x140 (centered)
- **Footer:** 130x46

### Favicon
- **File:** `src/app/favicon.ico`
- **Source:** Overlapping squircles icon (teal + orange)

## Spacing
- **Base unit:** 4px (Tailwind default)
- **Section padding:** `py-20 md:py-28`
- **Content max width:** `max-w-6xl` (1152px), `max-w-4xl` (896px) for narrower sections
- **Horizontal padding:** `px-6`
- **Card padding:** `p-5` to `p-6`
- **Section gap:** `gap-4` to `gap-8`

## Layout
- **Approach:** Grid-disciplined — clean, predictable sections
- **Grid:** Responsive: 1col mobile → 2col sm → 4-5col lg
- **Max content width:** 1152px
- **Border radius:** `rounded-xl` (12px) inputs/buttons, `rounded-2xl` (16px) cards/sections, `rounded-3xl` (24px) waitlist CTA, `rounded-full` pill buttons

## Motion
- **Approach:** Intentional — ScrollReveal fade-in-up on all sections
- **Easing:** ease-out
- **Duration:** 0.6s
- **Stagger:** 100ms delay between sequential elements
- **Scroll behavior:** smooth

## Shadow
- CTA button: `shadow-lg shadow-secondary/20` (warm orange glow)
- Cards: none (border-based elevation)

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-23 | Created DESIGN.md for roami-web | Formalized from main Roami DESIGN.md + current implementation |
| 2026-03-23 | Warm neutrals (#F8F6F4 base) | Match main app's warm tone, not cold SaaS gray |
| 2026-03-23 | Secondary orange for CTAs | Orange = action/warmth, teal = brand/trust. CTA buttons should feel warm and inviting |
| 2026-03-23 | Alternating teal/orange pattern | Visual rhythm across sections, balances both brand colors |
| 2026-03-23 | Sightseeing category added | 5th category (#4CAF7A green) for 관광/구경 meetups |
| 2026-03-23 | Logo viewBox trimmed to 420x150 | Removed empty space for proper centering |
| 2026-03-23 | LINESeedKR as primary font | Korean-optimized, matches mobile app typography |
