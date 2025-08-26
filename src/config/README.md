# Visual Customization System

This directory contains the visual customization system for the Astro template. The system provides a centralized way to customize colors, typography, spacing, and other design tokens throughout the entire site.

## Configuration File

The main configuration is in `visual-config.ts`. This file uses Zod for TypeScript validation and type safety.

### Structure

```typescript
export const visualConfig: VisualConfig = {
  colors: {
    brand: {
      primary: '#3b82f6',    // Your main brand color
      secondary: '#f59e0b',  // Your secondary brand color
      accent: '#10b981'      // Optional accent color
    },
    ui: {
      background: '#ffffff', // Page background
      surface: '#f8fafc',    // Card/component backgrounds
      text: '#1e293b',       // Primary text color
      textMuted: '#64748b',  // Secondary text color
      border: '#e2e8f0',     // Border color
      success: '#10b981',    // Success state color
      warning: '#f59e0b',    // Warning state color
      error: '#ef4444',      // Error state color
      info: '#3b82f6'        // Info state color
    }
  },
  typography: {
    fontFamilies: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace']
    },
    scales: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      // ... more sizes
    }
  },
  spacing: {
    // Custom spacing scale
  },
  borderRadius: {
    // Custom border radius scale
  },
  shadows: {
    // Custom shadow definitions
  }
};
```

## How It Works

1. **Configuration**: Define your visual preferences in `visual-config.ts`
2. **CSS Variables**: The configuration is converted to CSS custom properties in `global.css`
3. **Tailwind Integration**: CSS variables are integrated with Tailwind's `@theme` directive
4. **Utility Classes**: Custom colors become available as Tailwind utilities (e.g., `bg-primary`, `text-secondary`)

## Available Utility Classes

### Brand Colors
- `bg-primary`, `text-primary`, `border-primary`
- `bg-secondary`, `text-secondary`, `border-secondary`
- `bg-accent`, `text-accent`, `border-accent`

### UI Colors
- `bg-background`, `text-background`
- `bg-surface`, `text-surface`
- `text-text` (primary text)
- `text-text-muted` (secondary text)
- `border-border`
- `bg-success`, `text-success`
- `bg-warning`, `text-warning`
- `bg-error`, `text-error`
- `bg-info`, `text-info`

### Typography
- `font-sans`, `font-serif`, `font-mono`
- `text-xs`, `text-sm`, `text-base`, `text-lg`, etc.

### Design Tokens
- All standard Tailwind spacing, border radius, and shadow utilities work with your custom values

## Dark Theme Support

The system automatically provides dark theme variants for all colors. Dark mode is handled by the existing HSThemeAppearance system from Preline UI.

- Light theme colors are defined in the configuration
- Dark theme colors are automatically generated or can be customized in `global.css`
- Theme switching works seamlessly with existing Preline components

## Customization Examples

### Changing Brand Colors

```typescript
// In visual-config.ts
colors: {
  brand: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    accent: '#your-accent-color'
  }
}
```

### Adding Custom Fonts

```typescript
// In visual-config.ts
typography: {
  fontFamilies: {
    sans: ['Your Font', 'system-ui', 'sans-serif'],
    // Make sure to load the font in your HTML head
  }
}
```

### Custom Spacing

```typescript
// In visual-config.ts
spacing: {
  'custom': '2.5rem',
  'large': '5rem'
}
```

Then use as: `p-custom`, `m-large`, etc.

## Validation

The system uses Zod for runtime validation. If you provide invalid values (like malformed hex colors), you'll get clear error messages during development.

## Helper Functions

Use the helper functions in `src/utils/visual-system/config-helpers.ts`:

```typescript
import { getBrandColors, getUIColors, getConfig } from '../utils/visual-system/config-helpers';

const brandColors = getBrandColors();
const config = getConfig();
```

## Testing

Visit `/visual-test` in your development server to see all custom colors and design tokens in action.

## Integration with Existing Components

All existing Preline UI components will work with your custom colors. The system is designed to extend, not replace, the existing functionality.