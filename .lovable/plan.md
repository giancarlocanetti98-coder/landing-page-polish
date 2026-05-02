## Goal

Replace the heat map with a **funnel diagram** that instantly shows: *students drop off at specific stages → we identify exactly where → we apply a targeted fix that recovers the loss.*

The whole thing should read in under 5 seconds and feel premium / data-driven.

---

## The diagram

A horizontal funnel of 4 stages, each shown as a bar that visibly **shrinks** at every step. Lost students between stages are highlighted in muted red, with the size of the loss labelled. One stage is marked as the **"leak we fixed"** — gold callout — showing recovered students.

```text
                          THE OFFER FUNNEL — Medicine, top universities

   Applied         Interview         Offer            Place secured
   ████████████   ████████████      ██████            █████
   100             82               41                38
                  ↓ −18 lost        ↓ −41 LOST        ↓ −3 lost
                  (typical)         ⚠ BIGGEST DROP    (typical)

                                    ┌──────────────────────────────┐
                                    │  Targeted fix:               │
                                    │  Interview-to-offer coaching │
                                    │  +14 offers recovered        │
                                    └──────────────────────────────┘

                                    ████████████ ← After fix
                                    55  (+14)
```

### How the visual works

- **4 stacked horizontal bars**, each shorter than the last, with the same starting edge so the drop is immediate and visceral.
- **Numbers** sit at the right end of each bar (e.g. "100 applied", "82 interviewed").
- **Loss markers** between bars: small red wedge / arrow showing `−N lost` for each gap.
- **The biggest gap** (Interview → Offer) gets emphasis: thicker red wedge, "Biggest drop" label.
- **A gold "fix" callout** anchors next to that gap with a one-line explanation.
- **A ghosted "after fix" bar** appears beneath the Offer bar showing the recovered cohort, animated in last.

### Animation choreography (Framer Motion, on scroll-into-view)

1. Subject label fades in.
2. Bars draw left-to-right in sequence (Applied → Interview → Offer → Place), each ~400ms.
3. Loss wedges fade in after each bar lands.
4. Brief pause, then the "Biggest drop" red wedge pulses once.
5. Gold "fix" callout slides in from the right.
6. The recovered "after fix" bar grows in beneath Offer, with the `+14` count counting up.

Plays once. No looping, no auto-cycle — calm and confident, not busy.

### Subject toggle (light, optional)

Above the funnel, a small label: **"Example: Medicine · top universities"** with two pill toggles — **Medicine** and **Law** — that swap the data. Each subject has its own bottleneck story (Medicine = interview→offer; Law = applied→interview), so toggling makes the point that *every subject has a different leak*. No auto-cycle this time; user-driven.

---

## What gets removed

- The heat map grid (subjects × universities).
- Stage selector pills (Interview / Offer / Grades).
- Strong / Average / Under legend.
- "Different stages, different fixes." caption (replaced by the fix callout, which is more concrete).

## What stays

- The Step 1 card wrapper, the "01" badge, the section heading, and the intro paragraph above.
- Colour tokens: gold for the fix highlight, emerald for "secured", a muted red for "lost", muted for the "before" portions.
- Framer Motion patterns per project memory.

---

## Caption underneath the funnel

Single short line, replaces the current caption:

> **We find your school's biggest drop-off, and fix exactly that.**

---

## Technical notes

- All changes confined to `src/components/landing/StakesSection.tsx`.
- Replace `heatData` / `subjects` / `universities` / `stages` with a small dataset:
  ```ts
  type FunnelStage = { label: string; count: number };
  type Subject = {
    id: "medicine" | "law";
    label: string;
    stages: FunnelStage[];      // Applied, Interview, Offer, Place secured
    bottleneckIndex: number;    // index of the stage AFTER which the biggest drop occurs
    fix: { label: string; recovered: number };
  };
  ```
- Bar widths are computed as `count / maxCount * 100%` so the shrink is proportional and obvious.
- Use `motion.div` with `initial={{ width: 0 }}` / `animate={{ width: pct }}` for the bar draw.
- For the count-up on the recovered number: `useMotionValue` + `animate()` + `useTransform` to render the integer.
- Subject toggle state: `useState<"medicine" | "law">`. On change, re-key the funnel container so the animation replays.
- No new dependencies. No new files.

## Out of scope

- Multi-subject side-by-side comparison.
- Real per-school data (numbers stay illustrative).
- Tooltips on bars (numbers are inline, no need).
- More than 2 example subjects in the toggle.
