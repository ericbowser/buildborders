---
title: How to prepare SVG borders for LightBurn
description: Hairline strokes, layer groups, and export settings that survive import without fill bleed.
keywords:
  - lightburn svg border
  - laser engraving frame svg
published: true
faq:
  - question: Should laser border SVGs use fill or stroke?
    answer: Use stroke only with no fill. Filled regions cause double cuts or fill bleed when LightBurn traces outlines.
  - question: What units should I use for plaque borders?
    answer: Millimeters. LightBurn respects mm in the SVG width/height attributes when the document is set to mm.
  - question: How do I separate cut and engrave paths?
    answer: Group paths into named layers (cut vs engrave). LightBurn maps layer colors or groups to cut and engrave operations.
---

## Why SVG prep matters for bordered plaques

A sign border looks simple until import: fills become accidental closed shapes, hairlines scale wrong, and inner text zones collide with the frame. LightBurn is forgiving, but **clean SVG structure** saves test material.

## Export checklist from the Frame Builder

1. **Stroke only** — `fill="none"` on every path
2. **mm units** — document sized in millimeters (e.g. 203.2 × 254 mm for 8×10)
3. **Grouped layers** — outer border paths in a `cut` group; optional detail in `engrave`
4. **Non-scaling stroke** — keeps line weight stable when scaling in LightBurn
5. **Kerf offset applied** on cut paths before export if you already know your machine kerf

## LightBurn import workflow

1. Open LightBurn → Import → select your `.svg`
2. Confirm **units** match your bed setup (mm)
3. Assign layer colors: cut layer → Line mode, engrave layer → Fill or Line as needed
4. Run a **small corner test** at low power before full plaque size

## Common mistakes

- **Filled double-line borders** — looks bold in Illustrator, cuts twice in laser
- **Merged paths** — corner flourishes joined to outer rect; hard to assign different speeds
- **Pixel/raster embeds** — useless for vector cutting; remove embedded images

## Next steps

- Tune offsets in [Kerf compensation for laser cut frames](/guides/kerf-compensation)
- Export a preset from the [Frame Builder](/tool)
- Compare machines in our [entry-level lasers guide](/guides/entry-level-lasers)
