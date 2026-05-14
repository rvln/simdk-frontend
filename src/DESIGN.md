# Design System Strategy: The Human Sentinel

## 1. Overview & Creative North Star

**Creative North Star: "The Transparent Sanctuary"**

This design system moves away from the clinical, cold nature of traditional management software. Instead, it adopts a "High-End Editorial" approach that balances professional authority with a warm, human-centric soul. We achieve this by breaking the rigid "dashboard" grid in favor of intentional whitespace, asymmetrical content blocks, and sophisticated tonal layering.

The aesthetic is built on the concept of **Architectural Transparency**. We use light, overlapping surfaces and "glass" textures to symbolize the openness and honesty required in social and orphanage management. By prioritizing breathing room over information density, we signal to the user that this platform is a calm, focused environment for meaningful work.

---

## 2. Colors & Surface Philosophy

The palette utilizes a deep blue (`primary`) paired with a sophisticated "Parchment" series of neutrals.

### The "No-Line" Rule

To maintain a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through:

- **Background Shifts:** Placing a `surface-container-low` component against a `surface` background.
- **Tonal Transitions:** Using the subtle difference between `surface-bright` and `surface-dim` to guide the eye.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers—like fine paper stacked on a desk.

- **Root Layer:** `surface` (#fdf9f4).
- **Secondary Containers:** `surface-container-low` (#f7f3ef) for grouping related data.
- **Highlight Containers:** `surface-container-lowest` (#ffffff) for active input areas or primary content cards. This "lift" is achieved through value contrast, not lines.

### The Glass & Gradient Rule

To move beyond a flat "SaaS" look:

- **Glassmorphism:** For floating headers or navigation overlays, use `surface` at 80% opacity with a 12px backdrop-blur. This keeps the user grounded in the content behind the UI.
- **Signature Gradients:** For primary CTAs and Hero sections, apply a subtle linear gradient from `primary` (#4c92c9) to `primary-container` (dynamic, derived from `primary`). This provides a "jewel-toned" depth that feels expensive and intentional.

---

## 3. Typography: The Editorial Voice

We use **Inter** for headlines and body text, and **Public Sans** for labels, treating them with editorial weight. The hierarchy is designed to be authoritative yet approachable.

- **Display (lg/md/sm):** Used for high-impact landing areas or "Impact Stats." These should utilize tight letter-spacing (-0.02em) to feel cohesive.
- **Headlines (lg/md/sm):** Our primary storytelling tool. Large headlines help "anchor" the asymmetrical layouts.
- **Body (lg/md/sm):** Generous line-height (1.6) is required for `body-lg` to ensure long-form reports or child profiles are comfortable to read.
- **Labels (md/sm):** Reserved for metadata and system statuses. Always used in semi-bold to distinguish from body text.
  _Font Family: Public Sans_

**The Typographic Signature:** Use `headline-lg` for section headers with a significant `surface-container` background shift to create a sense of "chapters" within the platform.

---

## 4. Elevation & Depth

Depth is a functional tool in this design system, not a decoration.

### The Layering Principle

Rather than shadows, use **Tonal Layering**. Place a `surface-container-highest` card inside a `surface-container-low` parent to create a recessed or "cut-out" effect. This mimics high-end architectural detailing.

### Ambient Shadows

When a card must float (e.g., a child profile card or an urgent notification):

- **Shadow Token:** Use `on-surface` (#1c1b19) at 6% opacity.
- **Configuration:** Large blur (24px to 48px) and a subtle Y-offset (8px). This mimics natural, soft ambient light.

### The "Ghost Border" Fallback

If accessibility demands a container boundary, use a **Ghost Border**:

- **Token:** `outline-variant` (#bec9c5) at **15% opacity**.
- **Rule:** Never use 100% opaque borders for decorative containment.

---

## 5. Components

### Primary Buttons (The "Capacity" Action)

- **Resting:** Gradient from `primary` to `primary-container`. Moderate roundedness.
- **Hover:** Slight scale-up (1.02x) and transition to `on-primary-fixed-variant`.
- **Disabled (Capacity Limit):** Use `surface-dim` with `on-surface-variant` text. This communicates a "full" or "locked" state without the aggression of a standard grey-out.

### Input Fields

- **Container:** `surface-container-lowest` with a subtle `outline-variant` (20% opacity) "Ghost Border."
- **Validation:** When in error, use `error` (#ba1a1a) for the text and a 2px bottom-accent bar, rather than an entire red box. This maintains the clean aesthetic.

### Data Cards & Lists

- **The No-Divider Rule:** Forbid 1px horizontal lines between list items. Use vertical white space (normal spacing) or a `surface-variant` background hover state to separate items.
- **Interaction:** Cards should transition from `surface-container-low` to `surface-container-highest` on hover to signify interactability.

### Specialized Components

- **Trust Badges:** Small, `secondary-container` chips with `on-secondary-container` text to highlight "Verified" status or "Updated" records.
- **Progressive Disclosure Trays:** Use glassmorphism overlays for editing data, ensuring the "Sanctuary" background remains visible.

---

## 6. Do’s and Don’ts

### Do:

- **DO** use asymmetrical margins (e.g., 80px left, 40px right) for header sections to create an editorial feel.
- **DO** leverage `tertiary` (#2da843) for "Urgent" or "High-Needs" orphanage alerts—its warm, earthy tone alerts the user without causing panic.
- **DO** prioritize vertical rhythm; ensure all components align to a 4px baseline.

### Don't:

- **DON'T** use pure black (#000) or pure grey. Always use the `on-surface` and `outline` tokens to maintain the warm, "Parchment" color temperature.
- **DON'T** use sharp corners. The default (moderate) roundedness is mandatory to maintain the "Welcoming" vibe.
- **DON'T** crowd the screen. If a page feels full, move content to a "Nested Container" or use a secondary tab.
