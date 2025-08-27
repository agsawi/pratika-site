# Design Document

## Overview

This design outlines the systematic replacement of the existing template colors with Pratika's brand colors. The current template uses orange (#ff801f, #f76b15, etc.) as the primary accent color throughout the interface, along with neutral grays for backgrounds and text. The design will maintain the existing color architecture while substituting Pratika's brand colors in place of the current orange palette.

## Architecture

### Current Color System Analysis

The template currently uses a well-structured color system with three main layers:

1. **Tailwind CSS @theme tokens** in `src/assets/styles/global.css` - Defines color scales (50-900) for various palettes
2. **Starlight theme variables** in `src/assets/styles/starlight_main.css` and `starlight.css` - Controls documentation theme colors
3. **Component-level color classes** - Uses Tailwind utilities like `text-orange-400`, `bg-orange-400`, `hover:text-orange-500`

### Brand Color Integration Strategy

The design will create a new `brand` color scale in the Tailwind @theme configuration, following the existing pattern of 50-900 color steps. This approach ensures:

- No disruption to existing Tailwind default palettes
- Consistent color scale structure
- Easy maintenance and updates
- Proper dark/light mode support

## Components and Interfaces

### Color Replacement Mapping

The design identifies the following color replacement areas:

1. **Primary Accent Colors**: Currently orange-400/orange-500 → Pratika brand primary
2. **Interactive States**: Currently orange hover states → Pratika brand hover variations  
3. **Starlight Theme**: Currently orange accent colors → Pratika brand colors
4. **Focus States**: Currently orange focus rings → Pratika brand focus colors

### Implementation Layers

#### Layer 1: Tailwind @theme Configuration
- Add `--color-brand-50` through `--color-brand-900` tokens
- Use OKLCH color space for consistency with existing tokens
- Maintain proper contrast ratios for accessibility

#### Layer 2: Starlight Theme Variables
- Update `--sl-color-accent` variables for both dark and light modes
- Replace orange-based accent colors with Pratika brand equivalents
- Maintain visual hierarchy and readability

#### Layer 3: Component Color Classes
- Systematically replace `text-orange-*` with `text-brand-*`
- Replace `bg-orange-*` with `bg-brand-*`
- Replace `border-orange-*` with `border-brand-*`
- Update hover and focus states accordingly

## Data Models

### Pratika Brand Specifications

#### Brand Colors
- **Primary Brand Color**: #18204e (Dark Blue)
- **Secondary Color**: #064f94 (Medium Blue)
- **Complementary Colors**: #23bdc5 (Teal) and #397dc0 (Light Blue)

#### Typography
- **Title Font**: Merriweather
- **Body Font**: Open Sans

#### Logo Assets
- **Dark Background Logo**: `src/images/logo_pratika_facilities_fundo_azul.svg` (for use on #18204e background)
- **Light Background Logo**: `src/images/logo_pratika_facilities_fundo_branco.svg` (for use on white background)

### Brand Color Scale Structure

Based on Pratika's primary color (#18204e), the brand color scale will be implemented as:

```css
@theme {
  --color-brand-50:  oklch(0.97 0.02 240);   /* Very light blue-tinted white */
  --color-brand-100: oklch(0.93 0.04 240);   /* Light blue-gray */
  --color-brand-200: oklch(0.85 0.08 240);   /* Lighter blue */
  --color-brand-300: oklch(0.75 0.12 240);   /* Light-medium blue */
  --color-brand-400: oklch(0.65 0.16 240);   /* Medium blue */
  --color-brand-500: oklch(0.55 0.20 240);   /* Medium-dark blue */
  --color-brand-600: oklch(0.25 0.15 240);   /* Primary: #18204e */
  --color-brand-700: oklch(0.20 0.12 240);   /* Darker blue */
  --color-brand-800: oklch(0.15 0.10 240);   /* Very dark blue */
  --color-brand-900: oklch(0.10 0.08 240);   /* Darkest blue */
}
```

Additional brand colors for specific use cases:
```css
@theme {
  --color-brand-secondary: oklch(0.35 0.18 240);  /* #064f94 */
  --color-brand-teal: oklch(0.70 0.15 180);       /* #23bdc5 */
  --color-brand-light-blue: oklch(0.60 0.16 240); /* #397dc0 */
}
```

### Starlight Theme Mapping

```css
/* Dark mode */
:root {
  --sl-color-accent: [brand-primary];
  --sl-color-accent-high: [brand-light];
  --sl-color-accent-low: [brand-dark];
}

/* Light mode */
:root[data-theme='light'] {
  --sl-color-accent: [brand-primary-light-mode];
  --sl-color-accent-high: [brand-dark-light-mode];
  --sl-color-accent-low: [brand-light-light-mode];
}
```

## Error Handling

### Color Contrast Validation
- Ensure all brand colors meet WCAG AA contrast requirements
- Test readability in both light and dark modes
- Validate focus states for accessibility compliance

### Fallback Strategy
- Maintain existing color structure as fallback
- Ensure graceful degradation if brand colors fail to load
- Preserve semantic meaning of color usage

## Testing Strategy

### Visual Regression Testing
1. **Component Testing**: Verify all UI components display correct brand colors
2. **Theme Testing**: Confirm proper color application in both light and dark modes
3. **Interactive Testing**: Validate hover, focus, and active states use appropriate brand colors
4. **Documentation Testing**: Ensure Starlight theme properly applies brand colors

### Manual Testing Checklist
- [ ] Navigation elements show brand colors
- [ ] Buttons and interactive elements use brand colors
- [ ] Form elements apply brand colors for focus states
- [ ] Documentation theme reflects brand colors
- [ ] Dark/light mode toggle maintains brand consistency
- [ ] All hover and active states use appropriate brand variations