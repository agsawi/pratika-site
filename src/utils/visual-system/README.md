# Visual Customization System

A comprehensive visual customization system for the Astro template that provides centralized control over colors, typography, spacing, and other design tokens. The system integrates seamlessly with Tailwind CSS and Preline UI while maintaining accessibility standards and supporting both light and dark themes.

## Quick Start

### 5-Minute Setup

1. **Open the Configuration File**
   ```bash
   # Edit the visual configuration
   code src/config/visual-config.json
   ```

2. **Change Your Brand Colors**
   ```json
   {
     "colors": {
       "brand": {
         "primary": "#your-color-here",
         "secondary": "#your-secondary-color",
         "accent": "#your-accent-color"
       }
     }
   }
   ```

3. **Generate CSS**
   ```bash
   node scripts/generate-css-from-config.mjs
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **See Your Changes**
   Visit your site and see your new brand colors applied to buttons, links, and accent elements!

## What You Can Customize

- **Colors**: Brand colors, UI colors, semantic colors with automatic dark theme variants
- **Typography**: Font families, font sizes, typography scales
- **Spacing**: Margins, padding, gaps with consistent scale
- **Design Tokens**: Border radius, shadows, and other visual properties

## Features

### Core Functionality
- **JSON-based Configuration**: Single configuration file controls all visual aspects
- **Tailwind CSS Integration**: Seamless integration with existing Tailwind utilities
- **Preline UI Compatibility**: Works with all existing Preline UI components
- **Theme Switching**: Full support for light/dark mode with HSThemeAppearance
- **Build Integration**: Automatic CSS generation during development and production builds
- **Hot Reload Support**: Changes are reflected immediately during development

### Accessibility Features
- **WCAG Compliance Checking**: Validates contrast ratios against WCAG AA and AAA standards
- **Automatic Color Suggestions**: Provides accessible color alternatives when contrast is insufficient
- **Comprehensive Reporting**: Generates detailed accessibility reports with actionable recommendations
- **Build-time Validation**: Automatically validates colors during CSS generation
- **Command Line Tools**: Standalone accessibility checking and validation scripts

### WCAG Standards

The system validates against the following WCAG contrast ratio standards:

- **WCAG AA Normal Text**: 4.5:1 minimum contrast ratio
- **WCAG AA Large Text**: 3:1 minimum contrast ratio (18pt+ or 14pt+ bold)
- **WCAG AAA Normal Text**: 7:1 minimum contrast ratio
- **WCAG AAA Large Text**: 4.5:1 minimum contrast ratio

### Integration with Existing Theme

The visual system is fully integrated with the base theme:
- All components use CSS custom properties generated from your configuration
- Changes to visual-config.json are automatically reflected throughout the site
- Dark theme variants are automatically generated and applied
- Existing Preline UI components inherit your custom colors and design tokens

### Handling Hardcoded Classes

Some template components may contain hardcoded Tailwind color classes (like `text-yellow-500`, `bg-gray-800`) that don't automatically update with your visual configuration. For comprehensive solutions including automated migration scripts and best practices, see the [Hardcoded Classes Migration Guide](../../docs/hardcoded-classes-migration.md).

## Configuration Reference

### Complete Configuration Structure

```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",
      "secondary": "#f59e0b",
      "accent": "#10b981"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#1e293b",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#059669",
      "warning": "#d97706",
      "error": "#dc2626",
      "info": "#1e40af"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "serif": ["Georgia", "Times New Roman", "serif"],
      "mono": ["Monaco", "Consolas", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem"
  },
  "borderRadius": {
    "DEFAULT": "0.25rem",
    "sm": "0.125rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  }
}
```

## Configuration Examples

### Corporate/Business Theme
Professional and trustworthy design suitable for corporate websites:

```json
{
  "colors": {
    "brand": {
      "primary": "#1e40af",
      "secondary": "#059669",
      "accent": "#dc2626"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#1e293b",
      "textMuted": "#64748b"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "serif": ["Georgia", "Times New Roman", "serif"]
    }
  }
}
```

### E-commerce Theme
Optimized for online retail with colors that encourage action:

```json
{
  "colors": {
    "brand": {
      "primary": "#dc2626",
      "secondary": "#059669",
      "accent": "#f59e0b"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#fafafa",
      "text": "#111827",
      "textMuted": "#6b7280"
    }
  }
}
```

### Creative Agency Theme
Bold and modern design for creative professionals:

```json
{
  "colors": {
    "brand": {
      "primary": "#7c3aed",
      "secondary": "#ec4899",
      "accent": "#06b6d4"
    },
    "ui": {
      "background": "#fafafa",
      "surface": "#ffffff",
      "text": "#0f172a",
      "textMuted": "#475569"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Poppins", "system-ui", "sans-serif"],
      "serif": ["Playfair Display", "Georgia", "serif"],
      "display": ["Playfair Display", "serif"]
    }
  }
}
```

## Usage

### Automatic Validation

Accessibility validation is automatically performed when:

1. **CSS Generation**: Running `node scripts/generate-css-from-config.mjs` validates colors and shows warnings
2. **Development Mode**: Validation runs automatically when configuration changes are detected
3. **Build Process**: Production builds include accessibility validation

### Manual Accessibility Check

Run a comprehensive accessibility check on your current configuration:

```bash
# Run accessibility validation
node scripts/generate-css-from-config.mjs --check-accessibility
```

This will analyze all color combinations and provide a detailed report.

### Programmatic Usage

```typescript
import { 
  validateColorAccessibility, 
  generateAccessibilityReport,
  suggestAccessibleColor,
  validateContrast 
} from '@/utils/visual-system/accessibility';

// Validate entire color configuration
const result = validateColorAccessibility(colors);
console.log(generateAccessibilityReport(result));

// Check specific color combination
const contrastResult = validateContrast('#333333', '#ffffff');
console.log(`Contrast ratio: ${contrastResult.ratio}:1`);
console.log(`Meets WCAG AA: ${contrastResult.meetsAA}`);

// Get accessible color suggestion
const accessibleColor = suggestAccessibleColor('#cccccc', '#ffffff');
console.log(`Suggested color: ${accessibleColor}`);
```

## Migration Guide

### From Previous Visual System Implementation

If you're migrating from an older version of the visual system:

1. **Backup Current Configuration**: Save your existing `visual-config.json`
2. **Update Build Scripts**: The CSS generation script is now at `scripts/generate-css-from-config.mjs`
3. **Run Migration**: Execute `node scripts/generate-css-from-config.mjs` to apply your configuration
4. **Test Integration**: Verify that your custom colors appear throughout the site

### Basic Brand Color Update

**Scenario:** Change just the primary brand color while keeping everything else the same.

**Steps:**
1. **Update Configuration:**
   ```json
   {
     "colors": {
       "brand": {
         "primary": "#7c3aed"  // Changed from default
       }
     }
   }
   ```

2. **Regenerate CSS:**
   ```bash
   node scripts/generate-css-from-config.mjs
   ```

3. **Test Accessibility:**
   ```bash
   node scripts/generate-css-from-config.mjs --check-accessibility
   ```

### Complete Corporate Rebrand

**Scenario:** Rebranding from a tech startup look to a professional corporate appearance.

**Steps:**
1. **Plan the Rebrand:**
   - Define new brand colors (deep blue, professional green, alert red)
   - Choose more conservative typography
   - Reduce border radius for sharper, more professional look

2. **Update Colors Gradually:**
   ```json
   // Step 1: Update primary color
   "primary": "#1e40af"
   
   // Step 2: Update secondary color  
   "secondary": "#059669"
   
   // Step 3: Update accent color
   "accent": "#dc2626"
   ```

3. **Test Each Change:**
   ```bash
   node scripts/generate-css-from-config.mjs
   npm run dev
   # Test the site after each color change
   ```

4. **Update Typography:**
   ```json
   "fontFamilies": {
     "sans": ["IBM Plex Sans", "system-ui", "sans-serif"],
     "serif": ["IBM Plex Serif", "Georgia", "serif"]
   }
   ```

5. **Final Validation:**
   ```bash
   node scripts/generate-css-from-config.mjs --check-accessibility
   npm run build
   npm run preview
   ```

## Troubleshooting

### Configuration Issues

**Problem: Invalid JSON Syntax**
- **Solution**: Validate JSON syntax using an online JSON validator
- **Common mistakes**: Missing commas, trailing commas, unquoted property names

**Problem: Invalid Color Format**
- **Solution**: Use 6-digit hex format with hash symbol: `#3b82f6`
- **Avoid**: Short hex (`#3bf`), named colors (`blue`), RGB format

### CSS Generation Problems

**Problem: CSS Not Updating After Configuration Changes**
- **Solutions**:
  1. Regenerate CSS manually: `node scripts/generate-css-from-config.mjs`
  2. Clear browser cache: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
  3. Restart development server: `npm run dev`
  4. Check that the generated CSS is being imported in your main CSS file

**Problem: CSS Generation Script Fails**
- **Solutions**:
  1. Check Node.js version: `node --version` (should be 16+)
  2. Reinstall dependencies: `npm install`
  3. Validate configuration syntax: Check JSON formatting in `src/config/visual-config.json`
  4. Ensure the script path is correct: `scripts/generate-css-from-config.mjs`

### Tailwind Integration Issues

**Problem: Custom Colors Not Available as Tailwind Classes**
- **Solutions**:
  1. Ensure CSS generation runs before Tailwind
  2. Check Tailwind configuration includes content paths
  3. Verify CSS import order in main CSS file

**Problem: Tailwind Purging Custom Classes**
- **Solutions**:
  1. Update Tailwind content configuration to include config file
  2. Use safelist for dynamic classes in `tailwind.config.js`

### Preline UI Compatibility

**Problem: Preline Components Not Using Custom Colors**
- **Solutions**:
  1. Check CSS variable names match Preline's expected names
  2. Re-initialize Preline after theme changes: `window.HSStaticMethods.autoInit()`
  3. Check CSS specificity and loading order

### Theme Switching Problems

**Problem: Theme Toggle Not Working**
- **Solutions**:
  1. Check HSThemeAppearance setup in HTML
  2. Verify JavaScript initialization
  3. Check localStorage for theme-related entries

**Problem: Custom Colors Not Switching in Dark Mode**
- **Solutions**:
  1. Define dark variants for all custom colors in CSS
  2. Use CSS custom properties consistently instead of fixed colors

### Accessibility Warnings

**Problem: Low Contrast Ratio Warnings**
- **Solutions**:
  1. Use darker text colors for better contrast
  2. Use lighter background colors
  3. Check contrast ratios manually: `node scripts/generate-css-from-config.mjs --check-accessibility`
  4. Use the suggested accessible colors provided in the warnings

### Performance Issues

**Problem: Slow CSS Generation**
- **Solutions**:
  1. Reduce configuration complexity
  2. Use caching in CSS generation script
  3. Optimize for development vs production builds

**Problem: Large CSS Bundle Size**
- **Solutions**:
  1. Enable Tailwind purging in production
  2. Remove unused design tokens
  3. Use CSS custom properties efficiently

### Build and Development Issues

**Problem: Build Fails in Production**
- **Solutions**:
  1. Test production build locally: `npm run build && npm run preview`
  2. Verify file paths are correct for production
  3. Check build scripts include CSS generation

**Problem: Hot Reload Not Working with Config Changes**
- **Solutions**:
  1. Add config file to Vite watch list
  2. Use file watcher for automatic CSS regeneration

## Build Integration

### How It Works

The visual system integrates with your Astro project through:

1. **Configuration File**: `src/config/visual-config.json` contains all your visual settings
2. **CSS Generation Script**: `scripts/generate-css-from-config.mjs` processes the configuration
3. **CSS Custom Properties**: Generated variables are injected into your global CSS
4. **Component Integration**: Base theme components use these custom properties
5. **Theme Switching**: Works seamlessly with Preline UI's HSThemeAppearance system

### Development Workflow

```bash
# 1. Edit your visual configuration
code src/config/visual-config.json

# 2. Generate CSS from configuration
node scripts/generate-css-from-config.mjs

# 3. Start development server
npm run dev

# 4. Your changes are now live!
```

### Production Build

The visual system is automatically integrated into your production build:

```bash
# Build includes CSS generation
npm run build

# Preview the production build
npm run preview
```

## API Reference

### Core Functions

```typescript
// Theme Management
import { VisualThemeManager, themeManager, initializeThemeSystem } from '@/utils/visual-system/theme-manager';

// CSS Generation
import { generateCSSVariables, generateDarkThemeCSS, updateGlobalCSS } from '@/utils/visual-system/generator';

// Configuration
import { getConfig, validateConfig, setConfig } from '@/utils/visual-system/config-helpers';

// Accessibility
import { validateColorAccessibility, suggestAccessibleColor } from '@/utils/visual-system/accessibility';

// Types
import type { VisualConfig, BrandColors, UIColors, ThemeVariant } from '@/utils/visual-system/types';
```

### Validation Categories

**Critical Combinations (Must Meet WCAG AA)**
- Primary text on page background
- Primary text on surface elements (cards, modals)
- Secondary text on page background
- Secondary text on surface elements

**Semantic Combinations (Should Meet WCAG AA Large)**
- Success, warning, error, and info colors on backgrounds
- Used for status indicators and alerts

**Brand Combinations (Informational)**
- Primary, secondary, and accent colors on backgrounds
- Provides suggestions for better visibility when used as text

## Best Practices

### For Developers

1. **Run Accessibility Checks Early**: Use `npm run check-accessibility` during development
2. **Address Critical Issues**: Fix any errors that prevent WCAG AA compliance
3. **Consider Warnings**: Review warnings for better user experience
4. **Test with Real Content**: Validate colors in actual usage contexts
5. **Use Version Control**: Commit changes incrementally
6. **Document Changes**: Keep track of what was changed and why

### For Designers

1. **Use High Contrast**: Aim for contrast ratios above 4.5:1 for normal text
2. **Test Both Themes**: Ensure both light and dark themes meet standards
3. **Consider Color Blindness**: Use tools beyond just contrast ratios
4. **Provide Alternatives**: Don't rely solely on color to convey information

## Technical Details

### Dependencies

- **color2k**: Used for color manipulation and contrast calculations
- **zod**: Provides schema validation for configuration
- Built on existing Tailwind CSS and Preline UI systems

### Performance

- Validation runs at build time, not runtime
- Minimal impact on bundle size
- Caching prevents redundant calculations

### Browser Support

- Works with all modern browsers
- Graceful degradation for older browsers
- Server-side validation ensures consistency

## Getting Help

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

### When to Seek Help

If you've tried the solutions above and still have issues:

1. **Create a minimal reproduction** of the problem
2. **Document the exact steps** that lead to the issue
3. **Include error messages** and console output
4. **Note your environment** (OS, Node version, browser)
5. **Check existing issues** in the project repository

### Useful Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Preline UI Documentation](https://preline.co/docs)
- [Astro Documentation](https://docs.astro.build/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)