## Goal

Radically simplify the Step 1 heat map so the funnel-drop-off idea reads in **under 3 seconds**, while preserving the "data-driven, stage-aware" message.

---

## What changes

**Cut the grid down hard:**
- From 8 subjects × 7 universities → **4 subjects × 4 universities** (16 cells, not 56).
- Drop the STEM / Humanities group split — we don't need it with only 4 subjects.
- Pick 2 STEM + 2 Humanities so the variety is still implicit:
  - **Medicine, Engineering, Law, Economics**
  - **Oxford, Cambridge, Imperial, LSE**

**Make cells bigger and calmer:**
- Larger square cells (~56–72px) with more whitespace.
- Remove the hover-zoom — it adds noise.
- Keep the soft Strong / Average / Under colour palette.

**Simplify the stage selector:**
- Keep the 3 pills (Application · Interview · Offer) — this is the core idea, can't lose it.
- Keep the auto-cycle on scroll-in, settling on Offer.
- Move the legend (Strong / Average / Under) to sit **inline next to the pills** so the header is one tidy line instead of two.

**Trim the captions:**
- Drop the per-stage caption sentence (Application/Interview/Offer descriptions).
- Keep just **one** line under the grid: *"Different stages, different fixes."*
- Remove the "Sample visualisation · 5–10 years…" italic footnote.

**Bake one clear story into the data:**
- **Medicine · Cambridge** — strong at Application + Interview, **under** at Offer. (interview→offer bottleneck)
- **Law · Oxford** — **under** at Application, strong at Interview + Offer. (application bottleneck)
- Other 14 cells: a calm mix of strong / average so these two "red" cells visibly *move* as the user toggles stages — that motion **is** the insight.

---

## Layout

```text
   Performance · Subject × University       App · Interview · Offer       ■ Strong  ■ Avg  ■ Under

                Oxford     Cambridge    Imperial      LSE
   Medicine       ▢          ▢            ▢           ▢
   Engineering    ▢          ▢            ▢           ▢
   Law            ▢          ▢            ▢           ▢
   Economics      ▢          ▢            ▢           ▢

   Different stages, different fixes.
```

On mobile, pills + legend stack below the title; otherwise unchanged.

---

## What stays the same

- The `Step 1 — Analysis` card structure and its intro paragraph.
- The colour tokens (emerald / gold / red).
- Framer Motion stagger and fade-in pattern (just on fewer cells now).
- Auto-cycle behaviour (scroll-in → cycle → settle, stops on user interaction).

---

## Technical notes

- All changes confined to `src/components/landing/StakesSection.tsx`.
- Trim `universities` to 4, replace `subjectGroups` with a flat `subjects` array of 4.
- Trim `heatData` to the 4 subjects × 4 universities, retaining the `{application, interview, offer}` shape.
- Remove the group-rendering loop; render rows in a single map.
- Remove the per-stage caption variant from the `stages` array (keep `id` + `label`).
- Remove the mobile-only legend block (legend is now always visible inline).
- Bump cell sizing via grid `minmax` (e.g. `minmax(56px, 1fr)`) and remove `hover:scale-110`.

---

## Out of scope

- Changing the surrounding copy or section heading.
- New colours, fonts, or icons.
- Real data wiring.
