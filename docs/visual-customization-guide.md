# Visual Customization System Guide

This comprehensive guide will help you customize the visual appearance of your Astro template using the centralized visual customization system. The system allows you to modify colors, fonts, spacing, and other design tokens from a single configuration file.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration Structure](#configuration-structure)
3. [Customizing Colors](#customizing-colors)
4. [Typography Customization](#typography-customization)
5. [Spacing and Layout](#spacing-and-layout)
6. [Border Radius and Shadows](#border-radius-and-shadows)
7. [Theme Switching](#theme-switching)
8. [Accessibility Guidelines](#accessibility-guidelines)
9. [Migration Examples](#migration-examples)
10. [Troubleshooting](#troubleshooting)

## Quick Start

The visual customization system is controlled by a single configuration file located at `src/config/visual-config.json`. This file defines all the visual aspects of your site, from colors to typography to spacing.

### Basic Customization

1. Open `src/config/visual-config.json`
2. Modify the values you want to change
3. Run `node scripts/generate-css-from-config.mjs` to apply changes
4. Start the development server with `npm run dev`

### Example: Changing Brand Colors

```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",    // Your main brand color
      "secondary": "#f59e0b",  // Your secondary brand color
      "accent": "#10b981"      // Optional accent color
    }
  }
}
```

## Configuration Structure

The configuration file is organized into several main sections:

### Colors
- **Brand Colors**: Primary, secondary, and accent colors for your brand
- **UI Colors**: Background, text, borders, and semantic colors (success, warning, error, info)

### Typography
- **Font Families**: Sans-serif, serif, monospace, and optional display fonts
- **Typography Scale**: Font sizes from xs to 6xl

### Design Tokens
- **Spacing**: Margin and padding values
- **Border Radius**: Corner rounding values
- **Shadows**: Drop shadow definitions

## Customizing Colors

### Brand Colors

Brand colors represent your visual identity and are used for buttons, links, and accent elements:

```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",    // Main brand color (buttons, links)
      "secondary": "#f59e0b",  // Secondary actions, highlights
      "accent": "#10b981"      // Optional accent for special elements
    }
  }
}
```

**Available as Tailwind classes:**
- `bg-primary`, `text-primary`, `border-primary`
- `bg-secondary`, `text-secondary`, `border-secondary`
- `bg-accent`, `text-accent`, `border-accent`

### UI Colors

UI colors define the overall appearance of your interface:

```json
{
  "colors": {
    "ui": {
      "background": "#ffffff",   // Page background
      "surface": "#f8fafc",      // Cards, modals, panels
      "text": "#1e293b",         // Primary text color
      "textMuted": "#64748b",    // Secondary text, captions
      "border": "#e2e8f0",       // Borders, dividers
      "success": "#10b981",      // Success messages, positive actions
      "warning": "#f59e0b",      // Warnings, caution states
      "error": "#ef4444",        // Errors, destructive actions
      "info": "#3b82f6"          // Information, neutral messages
    }
  }
}
```

**Available as Tailwind classes:**
- `bg-background`, `bg-surface`
- `text-foreground`, `text-muted`
- `border-border`
- `bg-success`, `bg-warning`, `bg-error`, `bg-info`

### Color Format Requirements

- All colors must be in 6-digit hex format (e.g., `#3b82f6`)
- Colors are automatically validated for accessibility
- Dark theme variants are generated automatically

## Typography Customization

### Font Families

Define font stacks for different text types:

```json
{
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "serif": ["Georgia", "Times New Roman", "serif"],
      "mono": ["JetBrains Mono", "Fira Code", "monospace"],
      "display": ["Playfair Display", "serif"]  // Optional
    }
  }
}
```

**Available as Tailwind classes:**
- `font-sans`, `font-serif`, `font-mono`, `font-display`

### Typography Scale

Control text sizes across your site:

```json
{
  "typography": {
    "scales": {
      "xs": "0.75rem",     // 12px - Small captions
      "sm": "0.875rem",    // 14px - Small text
      "base": "1rem",      // 16px - Body text
      "lg": "1.125rem",    // 18px - Large body text
      "xl": "1.25rem",     // 20px - Small headings
      "2xl": "1.5rem",     // 24px - Medium headings
      "3xl": "1.875rem",   // 30px - Large headings
      "4xl": "2.25rem",    // 36px - Extra large headings
      "5xl": "3rem",       // 48px - Display text
      "6xl": "3.75rem"     // 60px - Hero text
    }
  }
}
```

**Available as Tailwind classes:**
- `text-xs`, `text-sm`, `text-base`, `text-lg`
- `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl`

## Spacing and Layout

### Spacing Scale

Control margins, padding, and gaps throughout your design:

```json
{
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",   // 2px
    "1": "0.25rem",      // 4px
    "2": "0.5rem",       // 8px
    "3": "0.75rem",      // 12px
    "4": "1rem",         // 16px
    "5": "1.25rem",      // 20px
    "6": "1.5rem",       // 24px
    "8": "2rem",         // 32px
    "10": "2.5rem",      // 40px
    "12": "3rem",        // 48px
    "16": "4rem",        // 64px
    "20": "5rem",        // 80px
    "24": "6rem",        // 96px
    "32": "8rem",        // 128px
    "40": "10rem",       // 160px
    "48": "12rem",       // 192px
    "56": "14rem",       // 224px
    "64": "16rem",       // 256px
    "72": "18rem",       // 288px
    "80": "20rem",       // 320px
    "96": "24rem"        // 384px
  }
}
```

**Available as Tailwind classes:**
- `m-4`, `p-6`, `gap-8` (margins, padding, gaps)
- `w-32`, `h-48` (widths, heights)
- `space-x-4`, `space-y-6` (spacing between elements)

## Border Radius and Shadows

### Border Radius

Control the roundness of corners:

```json
{
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",    // 2px - Subtle rounding
    "DEFAULT": "0.25rem", // 4px - Standard rounding
    "md": "0.375rem",    // 6px - Medium rounding
    "lg": "0.5rem",      // 8px - Large rounding
    "xl": "0.75rem",     // 12px - Extra large rounding
    "2xl": "1rem",       // 16px - Very large rounding
    "3xl": "1.5rem",     // 24px - Extreme rounding
    "full": "9999px"     // Fully rounded (pills, circles)
  }
}
```

**Available as Tailwind classes:**
- `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`
- `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`

### Shadows

Define drop shadow effects:

```json
{
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

**Available as Tailwind classes:**
- `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`
- `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none`

## Theme Switching

The system automatically supports light and dark themes through the existing Preline UI theme switching system.

### How It Works

1. **Light Theme**: Uses colors as defined in your configuration
2. **Dark Theme**: Automatically generates appropriate dark variants
3. **Theme Toggle**: Works with existing HSThemeAppearance system

### Customizing Dark Theme

Dark theme colors are automatically generated, but you can customize them by adding CSS overrides:

```css
/* In your global.css or custom CSS file */
.dark {
  --color-primary: #60a5fa;      /* Brighter blue for dark mode */
  --color-background: #0f172a;   /* Dark background */
  --color-text: #f1f5f9;         /* Light text */
}
```

## Accessibility Guidelines

The system automatically validates colors for WCAG compliance and provides suggestions for improvement.

### Automatic Validation

When you run `node scripts/generate-css-from-config.mjs`, the system:
1. Checks contrast ratios for all color combinations
2. Warns about accessibility issues
3. Suggests better color alternatives
4. Generates an accessibility report

### Manual Accessibility Check

Run a comprehensive accessibility analysis:

```bash
node scripts/generate-css-from-config.mjs --check-accessibility
```

### WCAG Standards

The system validates against:
- **WCAG AA Normal Text**: 4.5:1 contrast ratio minimum
- **WCAG AA Large Text**: 3:1 contrast ratio minimum
- **WCAG AAA**: Higher standards for enhanced accessibility

### Best Practices

1. **High Contrast**: Aim for contrast ratios above 4.5:1
2. **Test Both Themes**: Ensure both light and dark themes are accessible
3. **Don't Rely on Color Alone**: Use icons, text, or patterns alongside color
4. **Test with Real Users**: Consider users with visual impairments

## Migration Guide

### Migrating from Previous Visual System

If you're upgrading from an earlier version of the visual customization system:

1. **Backup Your Configuration**: Save your current `src/config/visual-config.json`
2. **Update Build Process**: The CSS generation script is now located at `scripts/generate-css-from-config.mjs`
3. **Run New Script**: Execute `node scripts/generate-css-from-config.mjs` instead of the old npm scripts
4. **Verify Integration**: Check that your custom colors are applied throughout the site
5. **Test Accessibility**: Run `node scripts/generate-css-from-config.mjs --check-accessibility`

### Key Changes in New Structure

- **Streamlined File Organization**: Core functionality is now consolidated in `src/utils/visual-system/`
- **Improved Build Integration**: CSS generation is fully integrated with the base theme
- **Enhanced Documentation**: All documentation is now centralized and comprehensive
- **Better Error Handling**: More detailed error messages and troubleshooting guidance
- **Simplified Commands**: Single script handles CSS generation and accessibility checking

### For Developers Familiar with Old Structure

If you were using a previous version of the visual system:

**Old Command Structure:**
```bash
npm run generate-css
npm run check-accessibility
npm run validate-config
```

**New Command Structure:**
```bash
# Generate CSS (replaces npm run generate-css)
node scripts/generate-css-from-config.mjs

# Check accessibility (replaces npm run check-accessibility)
node scripts/generate-css-from-config.mjs --check-accessibility

# Validation is now built into the generation process
```

**File Structure Changes:**
- Documentation is now consolidated in `src/utils/visual-system/README.md`
- Test files have been moved to appropriate test directories
- Core functionality remains in the same location but is better organized

### Handling Hardcoded Classes

If your template contains hardcoded Tailwind color classes (like `text-yellow-500`, `bg-gray-800`, etc.) that don't automatically update with your visual configuration, see the [Hardcoded Classes Migration Guide](./hardcoded-classes-migration.md) for comprehensive solutions including:

- Mapping hardcoded classes to custom properties
- Automated migration scripts
- Component-specific migration strategies
- Best practices for maintaining consistency

## Migration Examples

### From Default Theme

If you're starting with the default template colors and want to customize:

**Before (Default):**
```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",
      "secondary": "#f59e0b"
    }
  }
}
```

**After (Custom Brand):**
```json
{
  "colors": {
    "brand": {
      "primary": "#7c3aed",    // Purple brand
      "secondary": "#06b6d4",  // Cyan secondary
      "accent": "#f59e0b"      // Orange accent
    }
  }
}
```

### Corporate Rebrand Example

**Before (Tech Startup):**
```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",    // Blue
      "secondary": "#10b981"   // Green
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc"
    }
  }
}
```

**After (Financial Services):**
```json
{
  "colors": {
    "brand": {
      "primary": "#1e40af",    // Deep blue
      "secondary": "#059669",  // Professional green
      "accent": "#dc2626"      // Red for alerts
    },
    "ui": {
      "background": "#fafafa",
      "surface": "#ffffff"
    }
  }
}
```

### E-commerce Theme

**Optimized for online retail:**
```json
{
  "colors": {
    "brand": {
      "primary": "#dc2626",    // Red for urgency/sales
      "secondary": "#059669",  // Green for success/savings
      "accent": "#f59e0b"      // Orange for highlights
    },
    "ui": {
      "success": "#059669",    // Green for "Add to Cart"
      "warning": "#f59e0b",    // Orange for "Low Stock"
      "error": "#dc2626",      // Red for errors
      "info": "#3b82f6"        // Blue for information
    }
  }
}
```

### Creative Agency Theme

**Bold and modern:**
```json
{
  "colors": {
    "brand": {
      "primary": "#7c3aed",    // Purple
      "secondary": "#ec4899",  // Pink
      "accent": "#06b6d4"      // Cyan
    }
  },
  "borderRadius": {
    "DEFAULT": "0.75rem",     // More rounded by default
    "lg": "1rem",
    "xl": "1.5rem"
  }
}
```

## Troubleshooting

### Common Issues and Solutions

#### Colors Not Updating

**Problem**: Changed colors in config but they don't appear on the site.

**Solutions:**
1. Run `node scripts/generate-css-from-config.mjs` to regenerate CSS
2. Clear browser cache and hard refresh
3. Check that you're using the correct Tailwind classes
4. Verify the configuration file syntax is valid JSON
5. Ensure the generated CSS is properly imported in your global CSS file

#### Accessibility Warnings

**Problem**: Getting contrast ratio warnings during CSS generation.

**Solutions:**
1. Use darker text colors or lighter backgrounds
2. Check the accessibility report: `node scripts/generate-css-from-config.mjs --check-accessibility`
3. Use the suggested colors provided in error messages
4. Test with actual users when possible

#### Theme Switching Not Working

**Problem**: Dark theme toggle doesn't work with custom colors.

**Solutions:**
1. Ensure you're using CSS custom properties correctly
2. Check that dark theme variants are generated
3. Verify HSThemeAppearance is properly initialized
4. Test with browser developer tools

#### Font Loading Issues

**Problem**: Custom fonts not loading or displaying incorrectly.

**Solutions:**
1. Verify font names are spelled correctly
2. Ensure fonts are available (Google Fonts, local files)
3. Check font fallbacks are appropriate
4. Test font loading in different browsers

#### Build Errors

**Problem**: Build fails with configuration errors.

**Solutions:**
1. Validate JSON syntax in configuration file
2. Check that all required fields are present
3. Ensure color values are in correct hex format
4. Test the script: `node scripts/generate-css-from-config.mjs`

### Performance Issues

#### Slow CSS Generation

**Problem**: CSS generation takes too long.

**Solutions:**
1. Reduce the number of custom spacing values
2. Limit font family options
3. Use caching during development
4. Consider splitting large configurations

#### Large Bundle Size

**Problem**: CSS bundle is too large.

**Solutions:**
1. Remove unused design tokens
2. Use Tailwind's purge functionality
3. Avoid duplicate values in configuration
4. Consider using CSS custom properties more efficiently

### Integration Issues

#### Preline UI Conflicts

**Problem**: Custom colors conflict with Preline components.

**Solutions:**
1. Use the provided color naming conventions
2. Test with existing Preline components
3. Check for CSS specificity issues
4. Ensure dark theme compatibility

#### Tailwind CSS Issues

**Problem**: Custom values not generating Tailwind classes.

**Solutions:**
1. Verify Tailwind configuration includes custom values
2. Check that CSS generation script runs before Tailwind
3. Ensure proper @theme directive usage
4. Test with Tailwind's JIT mode

### Getting Help

If you encounter issues not covered here:

1. **Check the Console**: Look for error messages in browser/build console
2. **Run Diagnostics**: Use `npm run check-accessibility` and `npm run validate-config`
3. **Test Incrementally**: Make small changes and test each one
4. **Review Examples**: Compare your configuration with working examples
5. **Check Documentation**: Refer to Tailwind CSS and Preline UI documentation

### Debug Commands

```bash
# Generate CSS from configuration
node scripts/generate-css-from-config.mjs

# Check accessibility
node scripts/generate-css-from-config.mjs --check-accessibility

# Find hardcoded color classes that need migration
node scripts/find-hardcoded-classes.mjs

# Regenerate CSS with verbose output
node scripts/generate-css-from-config.mjs --verbose

# Test in production mode
npm run build && npm run preview
```

---

## Integration with Existing Theme

The visual customization system is fully integrated with the base Astro template:

### How Components Use Custom Colors

- **Buttons**: Use `bg-primary`, `bg-secondary` classes that map to your custom colors
- **Links**: Inherit `text-primary` color from your configuration
- **Cards and Surfaces**: Use `bg-surface` and `border-border` from your UI colors
- **Text Elements**: Use `text-foreground` and `text-muted` for consistent typography
- **Status Elements**: Use semantic colors like `bg-success`, `bg-warning`, `bg-error`

### CSS Custom Properties

Your configuration generates CSS custom properties that are available throughout the application:

```css
:root {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  --color-background: #your-background-color;
  /* ... and many more */
}
```

### Theme Switching

The system works seamlessly with Preline UI's theme switching:

- Light theme uses your configured colors directly
- Dark theme automatically generates appropriate variants
- Theme toggle works without additional configuration
- All custom colors respect the current theme mode

## Next Steps

Once you've customized your visual configuration:

1. **Test Thoroughly**: Check all pages and components
2. **Validate Accessibility**: Run `node scripts/generate-css-from-config.mjs --check-accessibility`
3. **Document Changes**: Keep track of customizations for your team
4. **Performance Test**: Ensure changes don't impact site performance
5. **User Test**: Get feedback from actual users

For advanced customization and development, refer to the [Visual System README](../src/utils/visual-system/README.md).