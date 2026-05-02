## Goal

Extend the Step 1 heat map with a **stage selector** (Application / Interview / Offer), a **smaller, curated subject list grouped by STEM and Humanities**, so the funnel drop-off story reads instantly without overwhelming the grid.

---

## Layout

```text
                       [ Application ]  [ Interview ]  [ Offer ]   ← stage pills

                       Oxford  Cambridge  Imperial  LSE  UCL  Durham  Warwick

  STEM
    Medicine            ▢       ▢         ▢        ▢   ▢    ▢       ▢
    Biosciences         ▢       ▢         ▢        ▢   ▢    ▢       ▢
    Engineering         ▢       ▢         ▢        ▢   ▢    ▢       ▢
    Maths & CS          ▢       ▢         ▢        ▢   ▢    ▢       ▢

  HUMANITIES
    Law                 ▢       ▢         ▢        ▢   ▢    ▢       ▢
    Economics           ▢       ▢         ▢        ▢   ▢    ▢       ▢
    English             ▢       ▢         ▢        ▢   ▢    ▢       ▢
    History             ▢       ▢         ▢        ▢   ▢    ▢       ▢

  Strong  ■   Average  ■   Under  ■

  Caption updates per stage (e.g. "Where interviews are converting to offers.")
  Different drop-off points need different fixes.
```

- **Subjects:** 8 total — 4 STEM, 4 Humanities. Each group has a small uppercase label sitting flush-left above its rows, with a thin divider between groups.
- **Universities:** trim from 8 to 7 (drop one to give cells more breathing room with fewer rows).
- Cells become slightly larger and easier to read.

---

## Stage selector behaviour

1. Three pills above the grid: **Application · Interview · Offer**. Active = gold background, inactive = bordered + muted.
2. On first scroll-into-view, auto-cycle every ~2.5s through the three stages, settling on **Offer**.
3. Auto-cycle stops permanently as soon as the user hovers or clicks any pill.
4. On stage change, cells fade (opacity 0.4 → 1, ~250ms, ~10ms stagger) and re-colour according to the new stage's data — feels like a "data refresh".

---

## Caption (updates with stage)

- Application — "Where students are getting their applications through."
- Interview — "Where students are converting to interviews."
- Offer — "Where interviews are converting to offers."

Fixed second line below: **"Different drop-off points need different fixes."**

---

## Data model

Replace flat `heatData[row][col]` with:

```ts
heatData[row][col] = { application, interview, offer }  // each: 'strong' | 'avg' | 'under' | 'none'
```

Subjects array carries a `group: "STEM" | "Humanities"` field so the render can insert the group label and divider between groups.

Sample patterns we'll bake into the illustrative data so the story shows up clearly:
- **Medicine · Cambridge:** strong at Application + Interview, **under** at Offer (interview-to-offer is the bottleneck).
- **Law · Oxford:** **under** at Application (few interviews offered), strong at Interview + Offer (those that get through convert well).
- A scattering of average / strong / no-data cells elsewhere so the heat map looks like real data, not a demo.

---

## Technical notes

- All changes confined to `src/components/landing/StakesSection.tsx`. No new files, no new dependencies.
- `useState` for `activeStage`; `useEffect` + `setInterval` for auto-cycle, cleared on user interaction or unmount.
- Group rendering: map over `[{ name: "STEM", subjects: [...] }, { name: "Humanities", subjects: [...] }]`, emitting a small label row + a divider before each group's data rows. Keep the same CSS grid columns across the whole table so cells stay aligned.
- Colour tokens unchanged: `bg-emerald-600/85` (strong), `bg-gold/70` (avg), `bg-red-600/80` (under), `bg-muted/60` (no data).
- Reuse existing Framer Motion patterns per project memory.

---

## Out of scope

- Real data wiring (cells stay illustrative).
- Tooltip overhaul (current `title` attribute is enough).
- 4th "Secured Place" stage.
