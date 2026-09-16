# D.01 — Actions & Controls

**Target planning envelope:** ~250 canonical icons  
**Primary category:** `actions-controls`  
**Design character:** filled / pixel-native / compact / high-recognition / UI-first  
**Canonical grid:** `24 × 24`  

Actions & Controls is one of PXUI's foundational collections. These icons appear repeatedly in toolbars, menus, forms, editors, dashboards, command palettes, inspectors, mobile navigation, contextual actions, and system controls.

Because they are used at very small sizes, they must prioritize:

```text
recognition
→ silhouette
→ optical balance
→ negative space
→ family consistency
→ detail
```

—not decoration.

---

## D.01.1 Visual Design Standard

Every Actions & Controls icon should feel like a **precision pixel glyph**, not a conventional smooth vector icon converted into blocks.

The visual system should use:

```text
24 × 24 canonical geometry
4 px macro rhythm
1–2 px micro corrections where permitted
filled primary silhouettes
intentional negative-space cuts
stepped pixel corners
square or near-square terminals
compact optical bounds
```

Avoid excessive curves.

When a circular object is required, build it from intentional stepped geometry rather than pretending the pixel system is a smooth Bézier icon library.

---

## D.01.2 Shape Language

PXUI Actions icons should generally use four geometric ingredients:

### Filled mass

Primary silhouettes should have enough visual weight to remain legible at:

```text
16
20
24
32
48
```

### Negative space

Interior details should often be cut out of the filled form instead of adding multiple thin strokes.

### Pixel steps

Curves, diagonals, handles, and corners should resolve through controlled stepped transitions.

### Optical correction

Mathematically centered geometry may be moved slightly when required for better visual balance.

The result should feel carefully drawn, not algorithmically snapped.

---

# D.01.3 Canonical Modifier Grammar

Use predictable modifiers across the entire collection.

Preferred modifiers:

```text
add
remove
check
x
alert
info
search
edit
lock
unlock
open
closed
left
right
up
down
horizontal
vertical
circle
square
filled
```

Avoid uncontrolled variants such as:

```text
-alt
-alt-2
-modern
-new
-small
-large
-active
-special
```

unless they represent a legitimate public semantic concept.

---

# D.01.4 Corrected Initial Action Family

|        # | Canonical name    | Public React export  | Geometry / Shape Specification                                                                                                                                     | Semantic purpose                                      | Search tags                               | Motion                  | Brand |
| -------: | ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------- | ----------------------- | ----- |
| **0001** | **add**           | `PXIconAdd`          | Symmetrical filled plus built around the canonical center. Equal horizontal/vertical mass, compact arms, square pixel terminals, optically centered at 12/12.      | Generic creation or addition action.                  | add, plus, create, new, insert, action    | optional `resolve`      | No    |
| **0002** | **add-circle**    | `PXIconAddCircle`    | Stepped circular outer silhouette with a centered plus represented through strong negative space or a clearly separated internal form. Maintain equal radial mass. | Add/create action inside a circular control metaphor. | add, plus, circle, create, new            | optional `resolve`      | No    |
| **0003** | **add-square**    | `PXIconAddSquare`    | Compact filled square/container with subtly stepped corners and an optically centered plus cutout. Avoid generic rounded-app-icon appearance.                      | Add/create within a bounded square/module context.    | add, plus, square, module, create         | optional `resolve`      | No    |
| **0004** | **insert-left**   | `PXIconInsertLeft`   | Existing-content block plus a clearly separated left-side insertion marker. Direction conveyed by spatial construction rather than simply moving a plus symbol.    | Insert an item before / to the left of another item.  | insert, add, left, before, column, layout | optional `insert-left`  | No    |
| **0005** | **insert-right**  | `PXIconInsertRight`  | Mirrored counterpart to `insert-left`; identical mass, gap, and modifier geometry.                                                                                 | Insert an item after / to the right.                  | insert, add, right, after, column, layout | optional `insert-right` | No    |
| **0006** | **insert-above**  | `PXIconInsertAbove`  | Base block with top insertion region and centered addition marker. Maintain vertical rhythm of horizontal counterpart.                                             | Insert an element above another element.              | insert, add, above, row, layout           | optional `insert-up`    | No    |
| **0007** | **insert-below**  | `PXIconInsertBelow`  | Vertically mirrored counterpart to `insert-above`.                                                                                                                 | Insert an element below another element.              | insert, add, below, row, layout           | optional `insert-down`  | No    |
| **0008** | **remove**        | `PXIconRemove`       | Centered horizontal filled bar with the same terminal construction and overall optical width as the `add` family.                                                  | Generic subtraction/removal action.                   | remove, minus, subtract, delete, action   | optional `resolve`      | No    |
| **0009** | **remove-circle** | `PXIconRemoveCircle` | Same stepped circular container geometry as `add-circle`, but with horizontal negative-space/minus form.                                                           | Remove/subtract within a circular action metaphor.    | remove, minus, circle, subtract           | optional `resolve`      | No    |
| **0010** | **close**         | `PXIconClose`        | Diagonal filled cross built from pixel-stepped bands rather than thin intersecting vector strokes. Corners and center overlap must remain balanced at 16px.        | Close, dismiss or cancel a surface.                   | close, dismiss, cancel, x, remove         | optional `dismiss`      | No    |

This is much cleaner than shipping:

```text
add-small
add-large
add-active
```

as public icons.

Those should instead be represented as:

```tsx
<PXIconAdd size={16} />
<PXIconAdd size={24} />
<PXIconAdd size={32} />
```

and application state:

```tsx
<Button data-state="active">
  <PXIconAdd />
</Button>
```

The icon itself should not encode UI state unless the visual state has independent semantic meaning.

---

# D.01.5 `PXIconAdd` Detailed Construction

`PXIconAdd` should be one of the reference icons used to establish PXUI's entire geometry system.

### Canonical composition

Use a perfectly recognizable cross silhouette.

Conceptually:

```text
        ████
        ████
        ████
████████████████
████████████████
        ████
        ████
        ████
```

Do not literally copy this bitmap; use it as the structural idea.

The final shape should have:

```text
equal arm weight
equal perceived extension
square terminals
no unnecessary curvature
clean central intersection
```

At 16px it should still read immediately.

---

# D.01.6 `PXIconAddCircle`

This should not look like a generic thin circle containing a plus.

Prefer a stronger filled form.

Concept:

```text
      ████████
    ████████████
  ████████████████
 ███████    ███████
██████       ██████
████    ████    ████
████    ████    ████
████████████████████
████████████████████
████    ████    ████
████    ████    ████
██████       ██████
 ███████    ███████
  ████████████████
    ████████████
      ████████
```

The actual production icon should be far more refined, but the important principle is:

> container and symbol must feel like one designed object.

Do not simply place `PXIconAdd` inside an unrelated circle primitive.

---

# D.01.7 `PXIconAddSquare`

Avoid the generic:

```text
rounded square
+
thin plus
```

construction used by hundreds of libraries.

Instead create a pixel-native container whose corners follow PXUI's grid logic.

Possible corner construction:

```text
  ██████████████
 ████████████████
████          ████
████    ██    ████
████  ██████  ████
████    ██    ████
████          ████
 ████████████████
  ██████████████
```

The final icon should balance:

```text
outer mass
interior negative space
plus recognition
```

without becoming visually heavy.

---

# D.01.8 Directional Addition Should Mean Insertion

Do not create:

```text
add-left
add-right
add-up
add-down
```

simply by moving a plus around.

That produces weak semantics.

Instead use:

```text
insert-left
insert-right
insert-above
insert-below
```

and design them as spatial operations.

Example concept:

```text
INSERT LEFT

 +   │ ███
     │ ███
```

The plus/insertion marker describes where new content appears relative to an existing object.

That is much more useful in:

* layout editors
* tables
* lists
* node editors
* page builders
* design tools

---

# D.01.9 Size Is a Rendering Property

Never create:

```text
PXIconAddSmall
PXIconAddLarge
```

solely for size.

Use the same canonical geometry:

```tsx
<PXIconAdd size={16} />
<PXIconAdd size={20} />
<PXIconAdd size={24} />
<PXIconAdd size={32} />
<PXIconAdd size={48} />
```

If PXUI later introduces **true optical-size masters**, those should be internal geometry variants selected by the renderer rather than exposed as meaningless semantic component names.

For example:

```text
16px master
20px master
24px master
32px master
48px master
```

could still all be represented publicly as:

```tsx
<PXIconAdd size={16} />
```

---

# D.01.10 Active Is an Application State

Do not create:

```text
PXIconAddActive
```

just because a button can become active.

Instead:

```tsx
<button data-state="active">
  <PXIconAdd />
</button>
```

PXUI remains semantically clean.

An icon state should become canonical only when the state itself changes meaning.

Examples that can legitimately exist:

```text
bell
bell-off

eye
eye-off

lock
unlock

bookmark
bookmark-filled
```

because these forms represent different recognizable states.

---

# D.01.11 Detail Without Visual Noise

“Detailed” must not mean adding many tiny shapes.

PXUI premium detail should come from:

```text
silhouette refinement
negative-space control
corner stepping
modifier placement
optical corrections
family consistency
```

not from micro-decoration.

At 24px there is very little room.

Every occupied pixel must justify itself.

---

# D.01.12 Recommended Action Families

The ~250 Actions & Controls collection should expand through legitimate families such as:

```text
Add / Insert
Remove
Close / Dismiss
Check / Confirm
Edit
Copy
Cut
Paste
Clipboard
Save
Download
Upload
Share
Link
Refresh
Sync
Undo
Redo
Search
Filter
Sort
Settings
Sliders
Menu
Overflow
Expand
Collapse
Maximize
Minimize
Move
Drag
Pin
Print
Scan
Crop
Erase
Archive
Restore
Delete
Zoom
Select
Align
Distribute
Resize
Transform
Rotate
Flip
Lock
Visibility
History
```

Each family should then receive only meaningful state/modifier variants.

---

# D.01.13 Example — Edit Family

A professional family might be:

| Canonical       | Export               | Purpose                                           |
| --------------- | -------------------- | ------------------------------------------------- |
| `edit`          | `PXIconEdit`         | General modification                              |
| `edit-line`     | `PXIconEditLine`     | Edit specific line/field if semantically distinct |
| `edit-document` | `PXIconEditDocument` | Modify document                                   |
| `edit-image`    | `PXIconEditImage`    | Modify image                                      |
| `edit-code`     | `PXIconEditCode`     | Modify code                                       |
| `edit-off`      | `PXIconEditOff`      | Editing unavailable/disabled semantic             |

Do not create:

```text
edit-small
edit-big
edit-alt
edit-2
edit-modern
```

---

# D.01.14 Example — Copy Family

Use:

```text
copy
copy-check
copy-code
copy-link
copy-image
copy-text
```

only where each icon has real UI meaning.

`PXIconCopy` itself should use two overlapping filled/negative-space pixel sheets with enough separation to remain recognizable at 16px.

Avoid the thin rounded overlapping rectangles common in generic icon libraries.

---

# D.01.15 Example — Save Family

Possible canonical forms:

```text
save
save-check
save-alert
save-off
save-as
```

The base `PXIconSave` can reference the familiar disk metaphor while being heavily simplified into a pixel-native filled silhouette.

Do not overload the shape with nostalgic floppy-disk micro-details.

The goal is recognizability, not retro imitation.

---

# D.01.16 Example — Search Family

Possible:

```text
search
search-add
search-remove
search-check
search-x
search-code
search-file
search-user
```

The base magnifier should use a stepped circular bowl and a short strong diagonal handle.

At 16px, the handle should not become a thin anti-aliased diagonal.

---

# D.01.17 Example — Settings Family

`PXIconSettings` should not simply copy the ubiquitous smooth eight-tooth gear.

Create a more distinctive PXUI construction.

Possible direction:

```text
pixel-stepped outer lobes
+
strong filled center mass
+
clean central negative-space aperture
```

The icon must remain immediately recognizable as settings.

Originality cannot compromise semantics.

---

# D.01.18 Example — Sliders Family

Create purposeful variants:

```text
sliders-horizontal
sliders-vertical
adjustments-horizontal
adjustments-vertical
```

only if the geometries communicate different control concepts.

Ensure knobs align to the same pixel modules across the family.

---

# D.01.19 Filled Style Philosophy

For Actions & Controls, default toward **filled or hybrid-filled construction**.

Examples:

```text
close
→ solid diagonal bands

trash
→ filled bin silhouette with negative-space details

copy
→ solid overlapping sheets

settings
→ filled stepped gear

filter
→ solid funnel

pin
→ filled pin form

search
→ strong filled ring/handle geometry
```

Do not mechanically use the same fill strategy for every semantic form.

---

# D.01.20 Pixel Curves

Circular shapes should follow deliberate stepped recipes.

For example, a canonical circle may use a progression conceptually similar to:

```text
    ████████
  ████████████
 ████      ████
████        ████
████        ████
 ████      ████
  ████████████
    ████████
```

The exact stepping rules should be frozen in the PXUI design specification.

All circular families should share those rules.

---

# D.01.21 Diagonals

Do not use arbitrary anti-aliased diagonals.

Define canonical diagonal patterns.

Possible ratios:

```text
1:1
2:1
1:2
```

where appropriate.

Diagonal-heavy icons such as:

```text
close
edit
expand
resize
external-link
```

should share common diagonal rhythm.

---

# D.01.22 Negative-Space Minimum

Define a minimum negative-space opening that survives at the smallest supported size.

For example, internal gaps should not become visually closed at 16px.

Validate automatically where possible.

This is particularly important for:

```text
copy
settings
filter
link
trash
archive
```

---

# D.01.23 Modifier Placement

Modifiers such as:

```text
add
check
alert
x
lock
```

should use standardized anchor zones.

For example:

```text
top-right
bottom-right
bottom-left
```

depending on family semantics.

Do not arbitrarily reposition modifiers between related icons.

A `file-add`, `folder-add`, and `user-add` badge should feel like members of the same system.

---

# D.01.24 Modifier Scale

The modifier should remain subordinate to the base concept.

Conceptually:

```text
base symbol
≈ 70–80% visual dominance

modifier
≈ 20–30%
```

Do not allow the `+` to overpower the object it modifies.

---

# D.01.25 Premium Animation Language

Most Actions & Controls icons should remain static by default.

Animation is allowed only when motion improves semantic feedback.

Examples:

### `PXIconAdd`

Possible `resolve` animation:

```text
vertical bar appears
→
horizontal bar resolves
→
plus completes
```

### `PXIconRefresh`

```text
segments step around canonical rotation states
```

### `PXIconDownload`

```text
arrow moves one or two pixel units downward
→
tray responds
→
settles
```

### `PXIconCopy`

```text
rear sheet shifts
→
front sheet resolves
```

### `PXIconCheck`

```text
segments resolve in discrete directional sequence
```

Do not use generic spin, bounce, elastic scale, or spring motion.

---

# D.01.26 Animation Metadata

For icons with animation:

```ts
animations: [
  {
    name: "resolve",
    duration: 320,
    trigger: "manual",
    loop: false,
    reducedMotion: "final-state"
  }
]
```

The actual schema should follow PXUI's canonical animation contract.

Do not write animation descriptions only in prose.

---

# D.01.27 Enhanced Catalog Metadata

For this collection, I would use a richer table internally:

| Field          | Example                       |
| -------------- | ----------------------------- |
| ID             | `0001`                        |
| Canonical      | `add`                         |
| Component      | `PXIconAdd`                   |
| Slug           | `px-add`                      |
| Category       | `actions-controls`            |
| Family         | `add`                         |
| Geometry class | `cross`                       |
| Construction   | `filled`                      |
| Grid           | `24`                          |
| Description    | `Adds or creates a new item.` |
| Aliases        | `plus`, `create`, `new`       |
| Tags           | `action`, `insert`, `create`  |
| Animation      | `resolve`                     |
| Platforms      | React, Native, SVG, Registry  |
| Status         | Stable                        |
| Brand          | No                            |

This is much more useful than repeating:

> Pixel icon for add; base form.

---

# D.01.28 Better Descriptions

Avoid descriptions like:

```text
Pixel icon for add; base form.
```

That is metadata noise.

Prefer semantic descriptions.

### `add`

> Adds or creates a new item, record, element, or object.

### `add-circle`

> Add action presented inside a circular container for compact controls and status-oriented UI.

### `insert-left`

> Inserts a new element immediately before or to the left of an existing element.

### `close`

> Dismisses, closes, or exits the current surface or temporary context.

Descriptions should explain **usage**, not merely repeat the icon name.

---

# D.01.29 Better Search Metadata

For:

```text
add
```

prefer:

```text
aliases:
plus
create
new
insert

tags:
action
creation
control
toolbar
```

Do not mechanically repeat:

```text
add, action, control, ui
```

for hundreds of icons.

Search metadata must add discovery vocabulary.

---

# D.01.30 Premium Showcase Rendering

In the PXUI catalog, Actions & Controls tiles should show:

```text
PXIconAdd

px-add

Actions & Controls
```

but the component name remains the strongest identifier.

On selection, Inspector can reveal:

```text
FAMILY
Add

GEOMETRY
Cross / Filled

GRID
24×24

ALIASES
plus, create, new, insert
```

---

# D.01.31 Family Proof Requirement

Before any Actions family becomes stable, generate a family proof.

Example:

```text
ADD / INSERT

PXIconAdd
PXIconAddCircle
PXIconAddSquare

PXIconInsertLeft
PXIconInsertRight
PXIconInsertAbove
PXIconInsertBelow
```

Compare at:

```text
16
20
24
32
48
```

Check:

* shared weight
* plus geometry
* negative-space consistency
* alignment
* modifier scale
* optical centering

---

# D.01.32 Reference-Icon Status

I recommend making these Actions & Controls icons part of the initial PXUI visual constitution:

```text
PXIconAdd
PXIconClose
PXIconCheck
PXIconSearch
PXIconSettings
PXIconCopy
PXIconTrash
PXIconFilter
PXIconRefresh
PXIconDownload
PXIconEdit
PXIconDrag
```

Together they exercise:

```text
verticals
horizontals
diagonals
curves
filled containers
negative space
overlap
modifiers
asymmetry
```

They are excellent icons for freezing the PXUI geometry language before scaling to hundreds of action icons.

---

# D.01.33 Quality Gate for Every Action Icon

Before stable release, every icon must pass:

```text
□ canonical name valid
□ PXIcon export valid
□ px- slug valid
□ no synonym duplication
□ family assigned
□ semantic description written
□ aliases meaningful
□ tags meaningful
□ 24×24 geometry valid
□ bounds valid
□ pixel-grid rules valid
□ negative space survives 16px
□ silhouette recognizable
□ family proof reviewed
□ React output generated
□ React Native output generated when supported
□ SVG output generated
□ Registry artifact generated
□ search metadata generated
□ accessibility behavior valid
□ animation validated if present
□ reduced motion defined if animated
□ light visual QA passed
□ dark visual QA passed
```

---

# D.01.34 Final Design Rule

The Actions & Controls collection should not become:

```text
250 random plus/minus/button variations
```

It should become:

> **250 carefully differentiated interaction concepts sharing one precise pixel-native visual grammar.**

For every icon ask:

```text
Does it have a distinct semantic purpose?

Does its silhouette remain recognizable at 16px?

Does it belong to a coherent family?

Does its geometry look unmistakably PXUI?

Would we still want this export in five years?
```

If not, it should not become a canonical icon.

And throughout the appendix, replace the old export pattern:

```text
PixelAdd
PixelAddCircle
PixelAddSquare
```

with the final PXUI API:

```text
PXIconAdd
PXIconAddCircle
PXIconAddSquare
```

That change should be applied consistently across **all 5,000+ planned icons**.
