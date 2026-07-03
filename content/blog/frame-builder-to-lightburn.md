---
title: Exporting from the Frame Builder to LightBurn in 60 seconds
description: Import checklist, layer mapping, and a quick test cut workflow.
published: true
---

## 60-second export path

1. Open the [Frame Builder](/tool) and pick a preset (e.g. oval plaque 8×10)
2. Set stroke and kerf for your material
3. Click **Download SVG**
4. LightBurn → File → Import
5. Verify mm dimensions in the status bar
6. Assign the `cut` group to your border cut layer

## Layer mapping

- **cut** (cyan in preview) → Line mode, power/speed for through-cut
- **engrave** (orange in preview) → Fill or line engrave for decorative paths

Toggle path layers in the builder before export if you want inner flourishes on engrave only.

## Test before full plaque

Cut a **30 mm corner sample** from scrap at your border power/speed. Check:

- Gap between double lines matches design
- Kerf offset didn't over-expand outer ring
- Corners are crisp (not double-fired)

## Kerf reminder

If the gap looks tight after cut, bump kerf 0.02 mm and re-export. Details: [kerf compensation guide](/guides/kerf-compensation).

## Need it cut for you?

[Request a shop quote](/contact) — send the same SVG file.
