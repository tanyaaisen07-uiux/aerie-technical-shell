# AERIE — Technical Outdoor Shell

AERIE is a conceptual, responsive digital experience for a technical outdoor apparel brand, built as a cinematic scroll-driven story around weather, protection, material performance, and movement.

## Overview

The concept centers on a single product — a 3-layer waterproof shell — and asks how a product page can make material performance *feel* tangible rather than just describing it in a spec sheet. The design challenge was to translate technical apparel claims (waterproofing, breathability, durability) into an immersive visual narrative, without leaning on generic e-commerce conventions.

## Design Direction

- Cinematic, outdoor-inspired art direction
- Dark, weather-driven visual language
- Restrained acid-lime accents as a technical signal color
- Strong, editorial typography as a structural element
- Immersive, scroll-driven storytelling
- Product-focused visual hierarchy throughout

## UX / UI

The experience is structured around a simple narrative arc: **Discover → Understand → Trust → Act**.

It opens on the product itself, then moves through material construction and weatherproofing detail, into real-world context, before surfacing technical specifications and closing on a clear final call to action. Each stage is paced to build from visual desire toward technical credibility and, finally, intent to act.

## Responsive Experience

The site is designed and implemented for both desktop and mobile, with a dedicated mobile navigation pattern, a recomposed mobile-scale layout, independently tuned animation pacing per breakpoint, and accessibility considerations including reduced-motion support and keyboard-accessible navigation.

## Technology

- HTML5
- CSS3 (custom properties, `clamp()`-based fluid typography, media queries)
- Vanilla JavaScript (ES modules, no framework)
- [Vite](https://vitejs.dev/) — build tool and dev server
- Google Fonts (Space Grotesk, Manrope, DM Mono)

## Key Features

- Scroll-driven storytelling, with a pinned visual stage that responds to scroll position
- Responsive navigation, including a dedicated mobile menu
- Animated product and material sections tied to scroll progress
- `prefers-reduced-motion` support across animation and video
- Responsive desktop/mobile layouts with independently tuned breakpoint behavior
- Accessible navigation behavior (keyboard focus handling, ARIA state, Escape-to-close)

## Live

https://aerie-technical-shell.vercel.app/

## Repository

https://github.com/tanyaaisen07-uiux/aerie-technical-shell

## Status

Concept project / portfolio piece.
