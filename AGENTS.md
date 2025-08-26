# AI Agent Instructions for Astro Project

This document provides essential context, SOPs, and guidelines for AI agents working on this codebase. Adhering to these instructions is mandatory to ensure all contributions are idiomatic, performant, and consistent with the project's architecture.

---

## 1. Project Overview & Core Philosophy

### 1.1. Agent Persona
You are an expert Astro developer. Your primary goal is to produce clean, performant, and maintainable code that strictly adheres to Astro's core principles and the specific patterns established in this project.

### 1.2. Core Architectural Principles
This project is built on Astro's unique architecture. Your work must reflect a deep understanding of these concepts.

- **Server-First, Zero-JS by Default:** Ship static, server-rendered HTML by default. Client-side JavaScript is a deliberate exception.
- **Islands Architecture:** Default to static `.astro` components. Only use a UI framework component (e.g., React, Svelte) with a `client:*` directive when client-side state and interactivity are essential.
- **Content-Driven:** Use Astro Content Collections. `src/content/` is the single source of truth for structured content (blog, docs, products).

---

## 2. Environment, Tooling, & Dependencies

### 2.1. Initial Setup
Use **pnpm** as the package manager.

```bash
pnpm install
```

### 2.2. Development and Build Commands

| Script | Command                                              | Purpose                               |
| :----- | :--------------------------------------------------- | :------------------------------------ |
| dev    | astro dev                                            | Start dev server (HMR)                 |
| start  | astro dev                                            | Alias of dev                           |
| build  | astro check && astro build && node process-html.mjs  | Type-check & build + post-process      |
| preview| astro preview                                        | Preview production build               |
| astro  | astro                                                | Astro CLI                              |

*Keep table entries short; avoid prose in tables.*

---

## 3. Prescriptive Development Workflows

### 3.1. Workflow: Creating a New Static Page
1. Create a new `.astro` file in `src/pages/`. The file path determines the URL (e.g., `src/pages/about.astro` → `/about`).
2. Import a layout from `src/layouts/` (e.g., `import MainLayout from "../layouts/MainLayout.astro";`).
3. Wrap page content within the imported layout.

### 3.2. Workflow: Adding a New Content Entry (e.g., Blog Post)
1. **Inspect the Schema:** Open `src/content/config.ts` and review the Zod schema for the collection.
2. **Create the File:** Add a Markdown file in the appropriate `src/content/<collection>/` directory (e.g., `src/content/blog/new-post.md`).
3. **Adhere to Schema:** Ensure frontmatter validates against the collection schema.

### 3.3. Workflow: Building a Reusable Static `.astro` Component
1. Create a new `.astro` file in `src/components/`.
2. Define logic and props in the frontmatter fence:
   ```astro
   ---
   const { propName } = Astro.props;
   ---
   ```
3. Write the HTML structure below the fence; use `<slot />` for children.

### 3.4. Workflow: Introducing an Interactive Client-Side Island
1. **Confirm Necessity:** Only add client-side JS when essential.
2. **Create Component:** Add the framework component (e.g., `MyInteractiveComponent.jsx`) under `src/components/`.
3. **Import and Hydrate:** Use a `client:*` directive:
   - `client:load` for immediate interactivity
   - `client:visible` for deferred hydration (preferred)

---

## 4. Testing Protocols & Quality Assurance
- **Testing Strategy:** No automated testing framework detected.
- **Requirement:** Manually test all new features and fixes for correctness, cross-browser compatibility, and responsiveness before completion.

---

## 5. Contribution & Deployment Guidelines

### 5.1. Commit Messages
Follow **Conventional Commits**.
- `feat: add user authentication modal`
- `fix: correct layout shift on mobile`

### 5.2. Deployment
Static Site Generation (SSG) is enabled.
1. Run `pnpm build`.
2. Deploy `dist/` to your static hosting provider.

---

## 6. Guardrails & Anti-Patterns
- **Do not** access `window`, `document`, or other browser APIs in the `---` fence of `.astro` files (server-only). Place browser code in `<script>` in the template or a hydrated component.
- **Do not** add `client:*` unless needed (hydration affects performance).
- **Do not** place processable assets (images, CSS, TS) in `public/`. Use `src/`. `public/` is for untouched assets (e.g., `robots.txt`, `favicon.svg`).

---

## 7. Visual & CSS Guidelines (Final)

### 7.1. Styling Philosophy
This project uses **Tailwind CSS (v4)** with a **utility-first** approach and `@theme` tokens for the color system.

- **Semantic & brand-aware:** Use project-defined `brand` tokens. Do **not** repurpose Tailwind defaults (e.g., don’t use `text-indigo-600` to mean “brand blue”).
- **Global, not inline:** Add/adjust tokens in `src/assets/styles/global.css`. Use them via Tailwind utilities (`text-brand-600`, `bg-brand-50`, etc.).
- **Minimal custom CSS:** Prefer utilities. Add global variables/utilities only when utilities can’t express a rule.

**Primary frameworks:** Tailwind CSS + Preline UI  
**Global styles entrypoint:** `src/assets/styles/global.css`  
**Docs theme styles:** `src/assets/styles/starlight_main.css`, `src/assets/styles/starlight.css`

---

### 7.2. Brand Colors: Do **not** overwrite Tailwind defaults
Do **not** change what built-in palettes like `indigo` or `gray` mean. Define a dedicated **brand** palette and use semantic classes.

#### 7.2.1. Define brand tokens (Tailwind v4 `@theme`)
Edit `src/assets/styles/global.css` and add a `brand` scale inside the `@theme` block. You may use `oklch`, `rgb`, or hex; keep a 50→900 scale for utility coverage.

```css
/* src/assets/styles/global.css */
@import 'tailwindcss';

@theme {
  /* Existing tokens … */
  --color-brand-50:  oklch(0.98  0.01 240);
  --color-brand-100: oklch(0.96  0.02 240);
  --color-brand-200: oklch(0.92  0.04 240);
  --color-brand-300: oklch(0.86  0.07 240);
  --color-brand-400: oklch(0.78  0.10 240);
  --color-brand-500: oklch(0.72  0.12 240); 
  --color-brand-600: oklch(0.64  0.11 240); /* primary brand */
  --color-brand-700: oklch(0.55  0.09 240);
  --color-brand-800: oklch(0.46  0.07 240);
  --color-brand-900: oklch(0.38  0.06 240);
}

/* Optional semantic aliases */
:root {
  --brand-primary: var(--color-brand-600);
  --brand-accent:  var(--color-brand-400);
}
```

#### 7.2.2. Use brand utilities in components
Use Tailwind utilities that map to your tokens:
- Text: `text-brand-600`, `hover:text-brand-700`
- Background: `bg-brand-500`, `bg-brand-50`
- Border: `border-brand-200`
- Gradients: `from-brand-500 to-brand-700`

**Never** use `text-indigo-600` as a stand-in for a brand color.

---

### 7.3. Documentation (Starlight) theme variables
Starlight uses CSS variables for UI accents. Set both **dark** and **light** themes.

**Files:** `src/assets/styles/starlight_main.css` and/or `src/assets/styles/starlight.css`

```css
/* Dark mode */
:root {
  --sl-color-accent:       #146ef5;     /* brand accent */
  --sl-color-accent-high:  #5aa0ff;     /* lighter */
  --sl-color-accent-low:   #0f2b66;     /* deeper */
  --primary-button-hover:  #1a7bff;     /* button hover */
  --backdrop-color:        #272727cc;   /* header glass bg */
  --border:                hsla(var(--border-neutral), 0.4);
}

/* Light mode */
:root[data-theme='light'] {
  --sl-color-accent:       #0b5be1;
  --sl-color-accent-high:  #0f2b66;
  --sl-color-accent-low:   #5aa0ff;
  --primary-button-hover:  #1668ff;
  --backdrop-color:        #f6f6f699;
  --border:                hsla(var(--border-yellow), 0.4);
}
```

Also consider:
- `--list-marker-color` for docs list markers
- `--border-*` variables for subtle borders

Keep dark/light values in sync.

---

### 7.4. Global grayscale & utility tokens
If a custom grayscale is needed, define `--color-neutral-50…950` alongside existing scales in `global.css` and use `text-neutral-*`, `bg-neutral-*` utilities. Prefer the **brand** scale for brand accents; keep neutrals for backgrounds/typography.

---

### 7.5. Semantic helpers (optional)
For very common patterns, add thin utilities (use sparingly):

```css
/* src/assets/styles/global.css */
@layer utilities {
  .btn-brand   { @apply bg-brand-600 text-white hover:bg-brand-700; }
  .link-brand  { @apply text-brand-600 hover:text-brand-700 underline-offset-4; }
  .badge-brand { @apply bg-brand-50 text-brand-700 ring-1 ring-brand-200; }
}
```

---

### 7.6. Logo & icon theming
- Replace SVGs under `src/images/starlight/` (e.g., `screwfast_logo_dark.svg`, `docs_logo.svg`) with client assets.
- Preserve CSS hooks/selectors so fills adapt in dark/light:

```css
[data-theme="dark"]  .main-logo-svg { fill: #e5e7eb; }
[data-theme="light"] .main-logo-svg { fill: #1f2937; }
```

---

### 7.7. Per-Client Theming Workflow (MANDATORY)
1. **Define brand palette** in `global.css` `@theme` (50→900). Choose a primary (usually `brand-600`).
2. **Wire Starlight accents** in `starlight_main.css` (and/or `starlight.css`) for dark & light.
3. **Update logos/icons** and confirm dark/light visibility.
4. **Use semantic utilities** (`text/bg/border-brand-*`). Replace any ad-hoc default palette usage.
5. **Smoke-test**: toggle dark/light; verify states (hover/focus), Preline components, docs header/sidebar, and contrast (WCAG AA).
6. **Commit** with Conventional Commit, e.g. `feat(theme): add <client> brand palette`.

---

### 7.8. Do / Don’t
**Do**
- Use `text-brand-*`, `bg-brand-*`, `border-brand-*` for brand color.
- Keep Starlight dark/light variables in sync.
- Prefer utilities; add minimal custom utilities only when repeating patterns.

**Don’t**
- Don’t overwrite built-in palettes (e.g., `indigo`).
- Don’t hardcode hex colors in components when a token exists.
- Don’t add client CSS in component `<style>` blocks; keep styles global.

---

### 7.9. Quick PR checklist
- [ ] Brand scale present in `@theme` and used
- [ ] No misuse of default palettes for brand color
- [ ] Starlight `--sl-color-*` set for dark & light
- [ ] Logos render correctly in both themes
- [ ] Contrast meets WCAG AA
- [ ] No stray hardcoded colors in components