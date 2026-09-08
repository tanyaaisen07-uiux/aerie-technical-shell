# Vanta Ridge — production note

This is a fictional demonstration identity created for this project. The brand name, wordmark, claims and contact address are placeholders and should be replaced before commercial use.

## Chosen direction

Vanta Ridge is a precision technical-outdoor brand: carbon-black field notes, mineral greys and a chartreuse route marker. The AERIE rain shell sits at the center of a 3-beat native-scroll story.

## Scroll pacing

| Beat | Scroll allocation | Motion |
| --- | ---: | --- |
| Product / rain | 1.3 viewport heights | Slow sustained zoom, copy holds |
| Fabric, zipper and pebbles | 2.4 viewport heights | Accelerating dive, then blur and pebble fall |
| Summit reveal | 1.4 viewport heights | Slow pullback / final still hold |

The pinned story is 6.1 viewport heights. `src/main.js` maps its scroll position piecewise; it works in both directions and the Skip Story button exits the animation. Reduced-motion visitors see the resolved summit scene immediately.

## Asset provenance

Generated with Higgsfield Nano Banana 2 on 2026-09-08. Job IDs: `ac76d878-ca1f-4ded-b8ec-c803ce3a5270` (shell), `1d5d789c-cd8e-4a22-850d-1812b860d1a0` (macro), `7f45ca9c-e50b-4a4e-b78c-4e1903eea4e2` (summit). The hosted previews are deliberately centralized in `src/content.js` for easy replacement.

Two Seedance 2.5 video assets are wired into `src/main.js`: `4a33ab93-57e6-48f4-a8de-a964b7dc0cc7` (slow jacket push-in) and `98880a0d-40ce-457c-bd9a-2f134ead15ba` (macro seam, rain and pebble action). The final summit shot uses scroll-controlled scale over the generated summit still; no additional credits were used.

## Editing

Edit image URLs in `src/content.js`, narrative copy in `index.html`, and design tokens at the head of `src/style.css`. `style-tile.html` is a standalone editable design board.
