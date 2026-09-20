# Login Page Illustration — Animation Spec

Source: `login_page_animation.mp4` — 1600×1200px canvas, 30fps, 560 frames, 18.667s total, then loops.
All timestamps given as `seconds (frame @30fps)`. All positions given as `% of the 1600×1200 canvas` so they scale to any real layout — the split-screen login card sits at roughly **x: 10.7%–89.3%, y: 12.75%–87.2%** of canvas, split ~59.5/40.5 into a light-gray illustration panel (left) and white form panel (right).

---

## 1. Colors (exact hex)

| Element | Hex |
|---|---|
| Illustration panel background | `#E8E8E8` |
| Form panel background | `#FFFFFF` |
| Page backdrop (behind card) | `#1B1C21` |
| Purple character | `#6312F6` |
| Black/near-black character | `#1B1C21` (identical to page backdrop) |
| Orange character | `#F17B34` |
| Yellow character | `#E1D312` |
| Loading-screen background | `#6312F6` (same purple, full-bleed) |
| Loading sparkle / spinner | `#FFFFFF` |
| Log In button (idle) | `#1B1C21` fill, white text |
| Dashboard sidebar | `#1B1C21` |
| Dashboard purple card | `#540ADE` |
| Dashboard light-blue card | `#D1E3FD` |
| Dashboard yellow card | `#F1E22F` |
| Dashboard dark card | `#1B1C21` |
| Dashboard flame icon orange | `#F27B37` |

---

## 2. Character designs (illustration panel, resting state)

Four flat, faceted "blob" characters overlap left-to-right, all anchored to the same baseline near the bottom of the panel (~87% canvas height), largest/frontmost in front:

1. **Orange dome** — flat-bottomed half-ellipse (like a rising sun), widest and lowest character, drawn in front of everything else. Face: two small black dot eyes + a curved downward "U" smile.
2. **Purple tower** — tall rounded-top rectangle, tallest character, positioned back-center. Face: two ring/outline eyes (white circle, black outline) + a small vertical black rectangle "surprised" mouth between them.
3. **Black/near-black tower** — a shorter rounded-top rectangle, same style, sits just in front of the purple tower and slightly right, partially overlapped by the orange dome and yellow blob. Face: two ring/outline eyes only, no visible mouth.
4. **Yellow blob** — rounded-top, flat-bottom shape (tallest at top-left corner, tapering), positioned rightmost/frontmost among the back shapes. Face: one single black dot eye + a flat horizontal line extending to the right (like a raised arm/antenna or a flat mouth).

Relative final positions (canvas %, bounding box):
- Purple: x ≈ 25.9–38.4%, y ≈ 22.8–54.7% (tallest, back-left)
- Black: x ≈ 34.2–41.7%, y ≈ 36.2–54.7% (shorter, in front of purple's right edge)
- Orange: x ≈ 16.4–41.8%, y ≈ 42.8–64.3% (widest, frontmost, lowest)
- Yellow: x ≈ 39.6–47.9%, y ≈ 43.8–63.3% (rightmost, in front)

---

## 3. Full timeline (one loop cycle, 18.667s)

| # | Phase | Time range | Frames |
|---|---|---|---|
| 1 | Loop-tail snap | 0.00s | 1 |
| 2 | Purple loading screen w/ twinkling logo | 0.03s – 2.33s | 2–70 |
| 3 | Card fades in from purple → white | 2.33s – 3.17s | 70–95 |
| 4 | Characters fall/assemble into place | 2.37s – 4.30s | 71–129 |
| 5 | Idle settle (card fully static) | 4.30s – 6.33s | 129–190 |
| 6 | Cursor enters, travels to Email field | 6.33s – 7.53s | 190–226 |
| 7 | Email address typed | 7.53s – 8.23s | 226–247 |
| 8 | Cursor moves to Password field, clicks | 8.23s – 8.53s | 247–256 |
| 9 | Password typed (masked dots) | 8.53s – 10.03s | 256–301 |
| 10 | Cursor moves to "show password" eye icon, clicks | 10.03s – 11.47s | 301–344 |
| 11 | Password shown as plain text, cursor drifts away | 11.47s – 14.00s | 344–420 |
| 12 | Password re-masked, cursor moves to Log In button | 14.00s – 16.53s | 420–496 |
| 13 | Button hover + click (pressed state) | 16.53s – 17.00s | 496–510 |
| 14 | Hard-cut transition to Dashboard screen | 17.00s – 17.33s | 510–520 |
| 15 | Dashboard idle, cursor drifts near cards | 17.33s – 18.667s | 520–560 |
| — | **Loop point:** frame 560 → frame 1 (jump cut back to shrunk thumbnail state) | | |

---

## 4. Phase 2 — Loading screen (0.03s–2.33s, frames 2–70)

Full-bleed solid `#6312F6` background (fills entire 1600×1200 canvas, no card visible).

A single white sparkle/plus icon (the same 4-point "plus" logo seen later at the top of the login card) sits centered and plays a **twinkle loop roughly every 10 frames (~0.33s)**, repeating about 5 times total:
1. Starts as a tiny dot (~4px)
2. Grows into two small stacked/diagonal dots (a "splitting" morph)
3. Rotates and expands into a 4-pointed star/sparkle shape at full size (~40–50px)
4. Shrinks back down to a dot and the cycle restarts

Treat this as a simple **scale 0→1→0 + 360° rotation loop on a 4-point star/sparkle SVG**, repeating ~5×, positioned at canvas center (~50%, ~30% — slightly above vertical center). Do not worry about replicating literal per-frame coordinates here; it reads as a generic branded loading spinner.

## 5. Phase 3 — Card fade-in (2.33s–3.17s, frames 70–95)

The full-bleed purple cross-dissolves into the two-panel login card (gray illustration panel + white form panel) over ~25 frames (~0.83s). Simple opacity/color cross-fade, no movement. The header logo (small black "+" sparkle) and "Welcome back!" heading fade in with it. This overlaps with Phase 4 — by the time the card is ~60% faded in, the first character shape is already falling.

## 6. Phase 4 — Characters fall & assemble (2.37s–4.30s, frames 71–129)

This is **not** simple gravity — each of the four shapes has its own distinct entrance, and two of them are staged in **two visible stages** (a fast drop, a brief hold, then a second move into final position). All originate from outside/above the illustration panel and settle into the resting layout described in §2. Faces (eyes/mouths) are already present on each shape from the moment it appears — they are not animated in separately.

**Order of first appearance:** Black → Yellow → Purple → Orange (all within ~0.4s of each other, frames 71–83).

### Black tower (first to appear)
- **Frame 71** (2.37s): appears as a thin diagonal sliver at the very top edge of the panel, rotated (like a falling plank/shard), full width blur suggesting fast motion.
- **Frames 71→81** (2.37s→2.70s): falls and rotates upright rapidly, top edge moving from y≈13% down to y≈21%.
- **Frames 81→95** (2.70s→3.17s): **holds/hovers** roughly in place (y≈21–22%), settling its rotation to upright — reads as a brief "landing flip" pause.
- **Frames 95→105** (3.17s→3.50s): drops a second time, fast, from y≈22% down to y≈55% (its final vertical position).
- **Frames 105→129** (3.50s→4.30s): small bounce/settle (~±1% y oscillation), comes to rest at final box **x:34.2–41.7%, y:36.2–54.7%**.
- Motion character: ease-in on both drops (accelerating fall), a distinct hold/pause between the two drops, tiny bounce-settle at the end.

### Yellow blob (second to appear)
- **Frame 76** (2.53s): appears already low in the panel (bottom-cut-off), growing upward — reads as a **reveal/grow-from-bottom**, not a top-down fall.
- **Frames 76→89** (2.53s→2.97s): top edge rises from y≈80% to y≈62% while the shape's visible height increases (it is "growing" into frame, ease-out — fast start, slowing as it nears final size).
- **Frames 89→129**: fully settled and static at **x:39.6–47.9%, y:43.8–63.3%**, no further movement.

### Purple tower (third to appear)
- **Frame 79** (2.63s): appears small, low, and far left (x≈16%, y≈63%).
- **Frames 79→102** (2.63s→3.40s): slides rightward and scales up simultaneously — x-center moves from ≈16% to ≈32%, area grows ~7×, y stays roughly constant (ease-out slide).
- **Frames 102→111** (3.40s→3.70s): a **second motion stage** — the rectangle stretches/grows upward fast, top edge rising from y≈45% to y≈22% (height nearly doubles), while x-center stays ≈31–32%. Ease-out (fast then settling).
- **Frames 111→129**: small settle wobble, comes to rest at **x:25.9–38.4%, y:22.8–54.7%**.

### Orange dome (last to appear, most complex path)
- **Frame 83** (2.77s): appears small, low-left (x≈12%, y≈63%).
- **Frames 83→92** (2.77s→3.07s): arcs — grows while its vertical position first dips down (y≈69%) then rises back up (y≈52%), tracing a small upward arc/bounce as it grows, x drifting right slowly.
- **Frames 92→99** (3.07s→3.30s): brief hover around y≈52–57%, still small.
- **Frames 99→106** (3.30s→3.53s): rapid growth — area increases roughly 10× in this window as the dome expands to near-final size, y moving down to ≈64% (settling toward its low, wide final footprint).
- **Frames 106→129**: settles fully at **x:16.4–41.8%, y:42.8–64.3%** (the widest, frontmost, lowest character).

**Practical implementation note:** if recreating in CSS/Lottie, model each shape as its own timeline: (1) an entrance transform (translate + scale, ease-out cubic), (2) for black & purple, a secondary transform after a short hold, (3) a tiny bounce (2–3 keyframe overshoot, ±2–3% of size) at the very end of each shape's settle. Stagger start times per the frame numbers above rather than starting all four at once.

## 7. Phase 5 — Idle hold (4.30s–6.33s, frames 129–190)

Card is fully static: all four characters in resting position, no cursor visible yet, ~2 seconds of pause before the interaction demo begins.

## 8. Phases 6–13 — Cursor-driven "login demo" (6.33s–17.00s)

A small solid dark-triangle cursor/pointer icon (color `#1B1C21`, ~15×20px) animates through a scripted login flow inside the **form panel** (right side, x≈62–95% of canvas). Movements are smooth straight-line glides between waypoints (ease-in-out), each pause lasting a few frames before the next glide.

| Step | Time | What happens |
|---|---|---|
| Cursor appears | 6.33s (f190) | Fades/slides in near the "Please enter your details" subheading, top of form panel |
| Glide to Email field | 6.33s–7.20s (f190–216) | Cursor travels down-left in a smooth diagonal to the Email input line |
| Click + type | 7.20s–8.23s (f216–247) | Cursor settles on the field; an email address types in character-by-character (left-to-right reveal, roughly 2–3 characters per frame-group, i.e. fast constant-rate typing) |
| Glide to Password field | 8.23s–8.53s (f247–256) | Short downward glide to the Password input line, click |
| Type password (masked) | 8.53s–10.03s (f256–301) | Masked dot characters (`•`) appear at the same fast constant rate as the email |
| Glide to eye icon | 10.03s–11.13s (f301–334) | Cursor moves right, to the "show password" eye icon at the end of the Password field |
| Click eye icon | ~11.13s–11.47s (f334–344) | Password dots swap to plain-text characters |
| Glide away from field | 11.47s–14.00s (f344–420) | Password stays visible briefly, then re-masks to dots; cursor drifts down and left across the form, passing near "Remember for 30 days" / "Forgot password?" area |
| Glide to Log In button | 14.00s–16.53s (f420–496) | Cursor travels to hover over the black "Log In" button |
| Click / press | 16.53s–17.00s (f496–510) | Button shows a pressed/darker state; cursor icon changes briefly to a "busy/loading" look |

## 9. Phase 14 — Transition to Dashboard (17.00s–17.33s, frames 510–520)

This is an abrupt **hard cut / fast zoom-cross-dissolve** — not a slow morph. Within ~10 frames (⅓ second) the entire two-panel login card is replaced by a full dashboard UI (dark left icon-sidebar + white content area with a search bar, three stat cards, and a course list). Treat this as a quick scale+fade transition (e.g. scale 0.96→1 with opacity cross-fade over 150–200ms) rather than anything with intermediate readable states.

## 10. Phase 15 — Dashboard screen (17.33s–18.667s, frames 520–560)

Static dashboard layout (this is the "after login" screen the loop ends on):
- **Left sidebar** (`#1B1C21`, full height, ~9% canvas width): white "+" logo at top, a few icon buttons stacked vertically, dark-mode toggle at the bottom.
- **Search bar** top of content area, light gray pill.
- **Row of 3 stat cards:**
  - Purple card (`#540ADE`) — "Read more" / "Curriculum is going to be very hot." headline + an orange/yellow flame-on-brain illustration icon.
  - Light-blue card (`#D1E3FD`) — "Statistics" / big "32h" + a small ascending bar-chart glyph.
  - Yellow card (`#F1E22F`) — "Homework" / big "+80%".
- **Dark card** (`#1B1C21`) to the right of the yellow card — "Until August [6] choose a discount curriculum..." text + stacked user avatars + "Course start 06/08/2023".
- **Below:** a 3-row "Upcoming courses" list (Graphic Design / Product Management / UI/UX Design), each with a colored tag pill, start date, duration, and a "View details" button.
- Cursor drifts slowly near the dark card / avatar area during this phase — minor idle movement only, no clicks.

## 11. Loop behavior

At frame 560 the video jumps straight back to frame 1, which is a **snapshot mid-shrink** of the finished login-card illustration (small, top-left, on the dark `#1B1C21` backdrop) — i.e. the dashboard-to-login loop transition happens instantly at the cut point and isn't part of the visible 560-frame range. When rebuilding this as a real product, the practical choice is: end the loop on the Dashboard (Phase 15) and jump straight back to Phase 2 (purple loading screen) to restart — that reproduces the visible behavior without needing to fabricate the missing shrink transition.
