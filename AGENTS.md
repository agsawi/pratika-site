# AI Agent Instructions for Astro Project

This document provides essential context, standard operating procedures, and guidelines for AI agents working on this codebase. Adhering to these instructions is mandatory to ensure all contributions are idiomatic, performant, and consistent with the project's architecture.

## 1. Project Overview & Core Philosophy

### 1.1. Agent Persona

You are an expert Astro developer. Your primary goal is to produce clean, performant, and maintainable code that strictly adheres to Astro's core principles and the specific patterns established in this project.

### 1.2. Core Architectural Principles

This project is built on Astro's unique architecture. Your work must reflect a deep understanding of these concepts.

*   **Server-First, Zero-JS by Default:** Your default approach must be to ship static, server-rendered HTML. Client-side JavaScript is a deliberate exception, not the rule. Strive to build components and pages that are fully functional without client-side scripts.
*   **Islands Architecture:** Clearly differentiate between static `.astro` components and interactive UI framework components. The rule is: **Default to static `.astro` components. Only use a UI framework component (e.g., React, Svelte) with a `client:*` directive when client-side state and interactivity are absolutely essential.**
*   **Content-Driven:** This project uses Astro's Content Collections feature. The `src/content/` directory is the single source of truth for structured content like blog posts, documentation, and products. All content-related tasks must use this system.

## 2. Environment, Tooling, & Dependencies

### 2.1. Initial Setup

This project uses **pnpm** as its package manager. To install dependencies, run the following command:

```bash
pnpm install
```

### 2.2. Development and Build Commands

The following scripts are available in `package.json`:

| Script    | Command                                                | Purpose                                                              |
| :-------- | :----------------------------------------------------- | :------------------------------------------------------------------- |
| `dev`     | `astro dev`                                            | Starts the local development server with hot-reloading.              |
| `start`   | `astro dev`                                            | An alias for the `dev` command.                                      |
| `build`   | `astro check && astro build && node process-html.mjs`  | Type-checks, builds the project for production, and runs a post-build script. |
| `preview` | `astro preview`                                        | Serves the production build locally to preview before deployment.    |
| `astro`   | `astro`                                                | Accesses the Astro CLI for various commands.                         |

## 3. Prescriptive Development Workflows

Follow these step-by-step workflows for common tasks to ensure consistency.

### 3.1. Workflow: Creating a New Static Page

1.  Create a new `.astro` file in the `src/pages/` directory. The path to the file will determine the final URL (e.g., `src/pages/about.astro` becomes `/about`).
2.  Import a layout component from `src/layouts/` to provide the basic page structure (e.g., `import MainLayout from '../layouts/MainLayout.astro';`).
3.  Wrap your page content within the imported layout component.

### 3.2. Workflow: Adding a New Content Entry (e.g., Blog Post)

1.  **Inspect the Schema:** Before adding content, you **must** first inspect the relevant schema defined in `src/content/config.ts`. This file defines the structure and required frontmatter fields for each collection.
2.  **Create the File:** Create a new Markdown (`.md` or `.mdx`) file in the appropriate collection directory within `src/content/` (e.g., `src/content/blog/new-post.md`).
3.  **Adhere to Schema:** The frontmatter (the YAML block at the top of the file) **must** validate against the Zod schema defined for that collection in `src/content/config.ts`.

### 3.3. Workflow: Building a Reusable Static `.astro` Component

1.  Create a new `.astro` file in the `src/components/` directory.
2.  Define the component's logic and props in the `---` script fence at the top. Use `const { propName } = Astro.props;` to define and access props.
3.  Write the component's HTML structure in the template section below the script fence.
4.  Use the `<slot />` element to render child content passed to the component.

### 3.4. Workflow: Introducing an Interactive Client-Side Island

1.  **Confirm Necessity:** First, confirm that client-side JavaScript is absolutely necessary for the component's functionality. If the task can be accomplished with server-side rendering, use a static `.astro` component instead.
2.  **Create Component:** Create the framework component file (e.g., `MyInteractiveComponent.jsx`) in the `src/components/` directory.
3.  **Import and Hydrate:** Import the component into a `.astro` file and use it with a `client:*` directive.
    *   Use `client:load` if the component must be interactive immediately on page load.
    *   Use `client:visible` if the component is lower down the page and can be hydrated when it becomes visible in the viewport. This is the preferred option for performance.

## 4. Testing Protocols & Quality Assurance

*   **Testing Strategy:** No automated testing framework has been detected in this project.
*   **Requirement:** All new features and bug fixes must be manually tested for correctness, cross-browser compatibility, and responsiveness before being considered complete.

## 5. Contribution & Deployment Guidelines

### 5.1. Commit Messages

All commit messages **must** follow the **Conventional Commits** standard. This is critical for generating automated changelogs and maintaining a clear project history.
*   Example: `feat: add user authentication modal`
*   Example: `fix: correct layout shift on mobile`

### 5.2. Deployment

No specific deployment adapter was found in `astro.config.mjs`. The project is configured for static site generation (SSG). Deployment involves:
1.  Running the `pnpm build` command.
2.  Deploying the contents of the generated `dist/` directory to any static hosting provider.

## 6. Guardrails & Anti-Patterns

These are strict rules. Violating them will result in broken builds or poor performance.

*   **DO NOT** access `window`, `document`, or any other browser-specific APIs in the `---` script fence of any `.astro` component. This code runs only on the server. Place browser-specific code in a `<script>` tag within the component template or in a client-hydrated component's lifecycle hook.
*   **DO NOT** apply a `client:*` directive to a component unless it requires client-side interactivity. Unnecessary hydration is the primary cause of poor performance in Astro.
*   **DO NOT** place assets that need processing or optimization (like images, CSS, or TypeScript files) in the `public/` directory. The `public/` directory is for assets that must remain untouched by the build process (e.g., `robots.txt`, `favicon.svg`). Place processable assets in `src/`.

## 7. Visual & CSS Guidelines

### 7.1. Styling Philosophy

This project uses **Tailwind CSS** in a **utility-first** approach. Visual styling is applied directly to HTML elements via utility classes within the `.astro` components.

*   **Primary Frameworks:** The project relies on `tailwindcss` and `preline` for its UI components and styling.
*   **Global Styles:** The central stylesheet is [`src/assets/styles/global.css`](src/assets/styles/global.css:1). This file imports Tailwind's base styles and contains project-wide custom variables and base layer customizations.
*   **Scoped Styles:** The project **does not** use component-scoped `<style>` tags. All styling is handled by global utility classes.

### 7.2. Workflow: Making Visual Edits

1.  **Locate the Component:** Identify the `.astro` component file in `src/components/` or `src/layouts/` that contains the element you need to modify.
2.  **Apply Utility Classes:** Make visual changes by adding, removing, or modifying the Tailwind CSS utility classes in the `class` attribute of the target HTML element.
3.  **Consult Documentation:** For a full list of available utility classes, refer to the official Tailwind CSS documentation.
4.  **Global Changes:** If you need to add a new color to the theme or a new global style, you **must** add it to the [`src/assets/styles/global.css`](src/assets/styles/global.css:1) file to maintain consistency.