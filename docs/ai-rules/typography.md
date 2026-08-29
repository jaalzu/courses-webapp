---
name: typography
description: Audit and improve web typography when implementing, reviewing, or fixing text styles, type hierarchy, font sizing, line-height, wrapping, responsive text, font loading, readability, or typographic accessibility. Use when a task involves typography-specific decisions or problems. Do not activate for general layout, color, or visual design work unless typography is directly involved.
---

---

# Typography

Use this skill to **identify and fix typography problems with the smallest appropriate change**.

Do not redesign an existing typography system unless the task explicitly requires it.

When there is no clear typography problem, preserve the existing implementation.

## 1. Hierarchy

Use these properties to establish hierarchy:

- `font-size`
- `font-weight`
- `line-height`
- `letter-spacing`
- spacing between text elements

Keep the system simple: avoid unnecessary fonts, sizes, and weights.

As a general rule, rarely use more than three font families in one interface. Pair fonts for intentional contrast rather than minor visual differences.

When text is below `18px`, prefer weight `400` or heavier. Treat weights below `300` as display-oriented and generally use them at `28px` or larger.

A type scale can help maintain consistent relationships between text sizes. Use one when the project benefits from it, but do not rebuild an existing scale without a clear reason.

Color can contribute to hierarchy, but this skill should not redesign the project's color system. When secondary text is intentionally muted, maintain at least a **4.5:1 contrast ratio** against its background for normal-sized text.

## 2. Font size and units

Use `font-size` according to the text's role, font family, hierarchy, and readability.

Prefer `rem` for scalable typography because it respects the user's root font-size preference.

Use `px` when a fixed size is specifically required by the component or browser behavior.

Do not replace existing `px` values with `rem` automatically. Make the change when accessibility, scalability, or consistency provides a clear benefit.

For mobile text inputs, `16px` can help prevent unwanted browser zoom in some browsers. Apply this specifically to controls where needed, not globally.

## 3. Fluid sizing

Use `clamp()` when a text size should scale between a minimum and maximum value.

```css
font-size: clamp(2rem, 1.2rem + 2vw, 4rem);
```

Use an explicit minimum and maximum.

Do not introduce `clamp()` when a fixed value already works well.

## 4. Line height

Adjust `line-height` when text is too compressed or too loose.

Prefer unitless values for scalable text:

```css
line-height: 1.5;
```

Use tighter values for large headings when appropriate.

For compact UI controls such as **icon buttons**, badges, or tightly controlled labels, `line-height: 1` can simplify vertical alignment.

Do not apply the same line-height to every text role.

## 5. Letter spacing

Use letter spacing according to text size and role:

- Large headings: slightly negative tracking can improve appearance.
- Small uppercase labels: slight positive tracking can improve readability.
- Body text: normally needs little or no adjustment.

Do not use negative tracking simply to make text fit.

## 6. Text wrapping

### Headings

Prefer:

```css
text-wrap: balance;
```

for headings when the line distribution is uneven.

Avoid manual `<br>` elements when the goal is only to control natural wrapping.

### Body text

Consider:

```css
text-wrap: pretty;
```

for paragraphs and longer prose when it improves line distribution.

Do not apply these properties indiscriminately.

## 7. Text measure

For long-form content, consider:

```css
max-width: 70ch;
```

when lines are too long to read comfortably.

Do not constrain short UI text, buttons, labels, or navigation unnecessarily.

## 8. Overflow

When text overflows:

1. Check wrapping.
2. Check the container width.
3. Do not reduce `font-size` as the first fix.
4. For long unbroken strings, prefer:

```css
overflow-wrap: break-word;
```

5. Use `overflow-wrap: anywhere` only when `break-word` is insufficient.

Preserve normal word wrapping for regular text.

## 9. Numeric text

Use:

```css
font-variant-numeric: tabular-nums;
```

when changing numbers need to align consistently.

Useful for:

- prices
- statistics
- dashboards
- tables
- timers
- counters

Do not use tabular figures for ordinary prose unless alignment is important.

## 10. Web fonts

Prefer `.woff2` for web fonts because of its compression and broad browser support.

`.woff` can be used when compatibility with older browsers is required.

`.ttf` and `.otf` are primarily desktop font formats and are generally less appropriate as the main web format.

The project's font loading strategy is outside the scope of this skill unless font loading itself is causing a problem.

When modifying font loading, avoid unnecessarily blocking text rendering. Use an appropriate `font-display` strategy, commonly `font-display: swap`, when it fits the project's loading requirements.

Do not change font loading solely for the sake of changing it.

## 11. Language

Set the document language correctly:

```html
<html lang="es"></html>
```

Use the appropriate language value for the actual document content.

## 12. Validation

After changing typography, verify the affected component with:

- short content
- long content
- realistic content
- different text wrapping
- the existing responsive states

Check that the change does not introduce:

- overflow
- unexpected wrapping
- hierarchy problems
- layout shifts
- unreadable text

Do not introduce new breakpoints just to solve a localized typography issue.

## 13. Frameworks and utilities

When the project uses a CSS utility framework such as Tailwind CSS, prefer existing utility classes when they express the required behavior.

For example:

```text
text-balance
tabular-nums
max-w-prose
tracking-tight
```

Do not create custom CSS when an existing project utility already provides the required behavior.

Follow the conventions of the existing codebase.

## Decision process

For every typography change:

1. Identify the visible or functional problem.
2. Determine whether typography is actually the cause.
3. Prefer the smallest change that solves it.
4. Check the change with realistic content.
5. Preserve the existing system when it already works.

### Example

Problem:

```css
.hero-title {
  font-size: 48px;
  max-width: 500px;
}
```

The heading leaves a single short word on the final line.

Diagnosis:

- The font size may already be appropriate.
- The container may already have the intended width.
- The problem is line distribution rather than hierarchy.

Minimal fix:

```css
.hero-title {
  font-size: 48px;
  max-width: 500px;
  text-wrap: balance;
}
```

Do not immediately:

- reduce the font size
- add a breakpoint
- add a manual `<br>`
- change the type scale
- introduce a new heading size

Only make broader changes if the minimal solution does not solve the actual problem.

## Core rule

**Do not change typography because you can improve it. Change it because there is a clear problem, requirement, or measurable benefit.**

Prefer:

- targeted fixes over global refactors
- existing project conventions over new abstractions
- `rem` for scalable typography
- `clamp()` when fluid sizing provides real value
- `text-wrap: balance` for problematic headings
- `text-wrap: pretty` for prose when useful
- simple typography systems over excessive variation
- real content over idealized examples
