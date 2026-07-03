---
title: Kerf compensation for laser cut frames
description: When to offset cut paths outward and how much to add for tight-fitting double-line borders.
keywords:
  - kerf compensation svg laser
  - laser cut frame offset
published: true
faq:
  - question: What is laser kerf?
    answer: Kerf is the width of material removed by the beam. The cut line centers on your path, so the finished part is slightly smaller than the drawing.
  - question: How much kerf offset should I add for wood plaques?
    answer: Start with 0.08–0.15 mm per side on CO₂ wood cuts, then measure a test square and adjust.
  - question: Do I kerf-offset engrave paths?
    answer: Usually no. Kerf compensation targets through-cuts. Engrave paths stay on visual center unless you are cutting outline text.
---

## Kerf and double-line borders

Double-line frames depend on **even spacing** between outer and inner paths. If the outer cut shifts inward because of kerf, the gap looks uneven after assembly or paint fill.

The Frame Builder applies kerf as an **outward inset reduction** on cut paths — you enter measured kerf, and outer borders expand slightly so the physical cut matches the intended mm dimension.

## How to measure kerf on your machine

1. Cut a 50 × 50 mm square from scrap at production speed/power
2. Measure the actual piece with calipers
3. Kerf ≈ (50 − measured) / 2 per side
4. Log kerf per material — 3 mm birch ≠ 6 mm acrylic

## When to compensate

| Scenario | Compensate? |
|----------|-------------|
| Outer frame cut on plaque blank | Yes |
| Inner decorative engrave | No |
| Press-fit inlay slot | Yes — often half kerf per side |
| Art deco stepped borders | Yes on cut steps only |

## Workflow with LightBurn

Some shops prefer compensating in CAD (Frame Builder) vs LightBurn's **Offset** tool. Pick one place — **don't offset twice**.

Our recommendation: compensate in the generator for parametric frames, use LightBurn offset for one-off imports.

## Related

- [SVG for LightBurn](/guides/svg-for-lightburn)
- [Frame Builder tool](/tool) — kerf slider built in
