---
name: Savoria Modern Food Marketplace
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#4a4455'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#005b3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#007650'
  on-tertiary-container: '#76ffc2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a refined, appetite-inducing modern aesthetic built for high-end local culinary discovery and seamless digital ordering. Balancing visceral food appeal with product utility, the visual direction merges high-clarity minimalism with warm, tactile micro-surfaces. 

### Brand Character & Emotional Response
- **Curated & Discerning:** Positions independent neighborhood restaurants as culinary destinations through editorial framing and generous whitespace.
- **Vibrant & Energizing:** Uses targeted, high-chroma visual triggers (deep violet grounding balanced against warm citrus heat) to build anticipation and hunger.
- **Effortless & Trustworthy:** Replaces interface clutter with crisp hierarchy, predictable interactions, and tactile UI elements that ensure smooth, reliable ordering.

### Design Movement: Modern Tactile Minimalism
Rejecting skeuomorphic gloss and heavy drop shadows, the aesthetic relies on structural lightness, strict geometric discipline, and flat surfaces with subtle low-contrast delineation. Depth is achieved through precise tonal stepping and layered surface containers, allowing high-resolution culinary photography to drive the visual experience.

## Colors

The palette establishes an intentional split between structural interaction authority and culinary warmth. 

### Color Roles & Ratios
- **Primary Violet (`#7C3AED`):** The primary interaction anchor. Reserved strictly for system mechanics, primary CTA buttons, active navigation states, order progression bars, and core platform actions.
- **Secondary Orange (`#F97316`):** The appetite and promotional accent. Applied to culinary highlights, dietary tags, promotional badges, discount tokens, ratings, and urgent delivery status callouts. Never used for destructive states.
- **Tertiary Emerald (`#10B981`):** Functional confirmation color. Used for open/closed venue statuses, confirmed payments, and positive dietary tags (e.g., "Vegan", "Farm Fresh").
- **Neutral Dark (`#18181B`):** Deep charcoal ink used for high-contrast headlines and structural typography to avoid the harshness of pure black.
- **Secondary Text (`#71717A`):** Cool neutral used for metadata, operational hours, ingredient notes, and disabled elements.
- **Border / Divider (`#E4E4E7`):** Hairline boundary token providing structure between cards, rows, and input surfaces without visual bulk.
- **Backgrounds:** Canvas defaults to `#FAFAFA`, with elevated cards and contextual sheets utilizing `#FFFFFF` for pristine isolation.

## Typography

The typography is set in **Plus Jakarta Sans** across all roles to achieve a contemporary, geometric rhythm with humanist qualities that soften technical density.

### Hierarchy & Usage
- **Display & Headlines:** Tightly tracked headings (`-0.02em` to `-0.03em`) establish editorial confidence for restaurant names, dish showcases, and promotional narratives.
- **Body:** Open line heights (`1.5` to `1.55`) maintain high legibility across recipe descriptions, allergy disclaimers, and reviews.
- **Labels & Numbers:** Semi-bold to bold weights with slight positive tracking guarantee instant scanning for prices, timestamps, preparation metrics, and dietary badges. Tabular figures must be enabled for all price tags and cart tallies.

## Layout & Spacing

The layout operates on a flexible 8pt spatial cadence within an adaptive column framework.

### Grid Architecture
- **Desktop (1280px+):** 12-column layout with a 1280px max-width container, 24px (`1.5rem`) gutters, and dynamic margins centered on the canvas.
- **Tablet (768px – 1279px):** 8-column layout with 20px gutters and 24px outer margins.
- **Mobile (320px – 767px):** 4-column layout with 16px (`1rem`) gutters and 16px (`1rem`) outer canvas margins. Sticky navigation and checkout trays pin cleanly to the physical screen edges.

### Reflow Rules
- Storefront grids collapse from 3 columns on desktop to 2 columns on tablet, shifting to a single-column stacked card feed or horizontal snap-carousel on mobile.
- Modifier sidebars and checkout summaries anchor as fixed-width right rails (380px) on desktop, transitioning into modal bottom sheets on mobile viewports.

## Elevation & Depth

This design system avoids dark drop shadows and heavy gradient fills. Visual layering relies instead on crisp boundaries, surface separation, and ultra-diffused atmospheric tints.

### Surface Tiers
- **Tier 0 (Base Canvas):** Background `#FAFAFA`. Recessed areas, category tab rails, and inactive track backgrounds use `#F4F4F5`.
- **Tier 1 (Surface Cards & Panels):** Pure White `#FFFFFF` with a 1px border of `#E4E4E7`. No shadow in rest state.
- **Tier 2 (Floating Trays & Modals):** Pure White `#FFFFFF` with a 1px border of `#E4E4E7` and a soft ambient shadow: `0 12px 32px -4px rgba(24, 24, 27, 0.05)`.
- **Tier 3 (Hover States & Active Drawers):** Pure White `#FFFFFF` with an ambient shadow lightly tinted by the primary hue: `0 16px 40px -8px rgba(124, 58, 237, 0.08)`.

### Border Discipline
All cards, input frames, and segmented controls feature a 1px hairline border (`#E4E4E7`). On interactive hover, the border transitions smoothly to `#D4D4D8` or `#7C3AED` (for active/focused targets) rather than relying on shadow blooms.

## Shapes

The shape system prioritizes soft, human-friendly geometry with structured radii that reinforce tactile approachability without falling into childish curves.

### Corner Radii Guidelines
- **Base Components (`rounded` / 8px):** Checkboxes, segmented control buttons, tooltip badges, and inline status tags.
- **Interactive Triggers (`rounded-lg` / 16px):** Primary/secondary buttons, search bars, text inputs, and cart action counters.
- **Containers & Surfaces (`rounded-xl` / 20px - 24px):** Restaurant showcase cards, item modifier modal sheets, dish image frames, and checkout modules.
- **Pills (`rounded-full`):** Category filters, promotional chips, and floating quantity counters.

## Components

### Buttons
- **Primary Action:** Solid `#7C3AED` background, `#FFFFFF` text, `rounded-lg` (16px), 0px border. Height: 48px (Desktop), 52px (Mobile touch target). Hover: `#6D28D9`. Active: `#5B21B6`. Focus ring: 2px `#7C3AED` offset by 2px white space.
- **Secondary Action:** Transparent background, 1px border `#E4E4E7`, `#18181B` text. Hover: `#F4F4F5` background with `#D4D4D8` border.
- **Accent Promo (Add to Order / Deals):** Solid `#F97316` background, `#FFFFFF` text. Hover: `#EA580C`.

### Chips & Filter Pills
- **Resting:** Background `#FFFFFF`, 1px border `#E4E4E7`, text `#71717A`, `rounded-full`, height 36px, horizontal padding 16px.
- **Active / Selected:** Background `#7C3AED` (or `#F97316` when filtering promotional deals), text `#FFFFFF`, border disappears.
- **Badge Counters:** Integrated into chips using a muted background overlay (`rgba(255, 255, 255, 0.2)` when active; `#F4F4F5` when resting).

### Form Inputs & Search Fields
- **Container:** Height 48px, background `#FFFFFF`, border 1px `#E4E4E7`, `rounded-lg` (16px), typography `body-sm`.
- **Placeholder:** Text `#A1A1AA`. Left-aligned with contextual 18px vector icon in `#71717A`.
- **Focus State:** 1.5px border `#7C3AED`, outline none, subtle light glow (`rgba(124, 58, 237, 0.08)`).

### Restaurant & Menu Item Cards
- **Architecture:** Tier 1 White `#FFFFFF` card, 1px border `#E4E4E7`, `rounded-xl` (20px), overflow hidden.
- **Visual Asset:** Aspect ratio 16:9 (Storefront) or 4:3 (Dish). High-saturation image asset with an embedded top-right favorite heart button (circular frosted glass backing).
- **Badge Positioning:** Float top-left on images with a 10px inset. Orange `#F97316` for promotional offers ("Free Delivery", "20% Off") and Dark `#18181B` for preparation times.

### Checkboxes & Radios
- **Control Frame:** 20px square (rounded 6px for checkboxes) or circular (for radios). 1.5px border `#D4D4D8`.
- **Selected State:** Fill `#7C3AED`, white checkmark or center pip. No drop shadows.

### Item Stepper / Quantity Modifier
- **Pill Container:** Height 36px, background `#F4F4F5`, `rounded-full`, flex-aligned with negative/positive touch targets enclosing a bold tabular text display (`label-md`).
- **Interactive Nodes:** Borderless 28px circular icons that trigger violet interaction states upon reaching active thresholds.