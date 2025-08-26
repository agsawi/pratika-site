#!/usr/bin/env node

/**
 * CLI script to regenerate CSS from the actual visual configuration
 * This script reads the TypeScript config and generates CSS
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { lighten, darken, getContrast, parseToHsla } from 'color2k';

/**
 * Read and parse the JSON configuration file with accessibility validation
 */
async function readVisualConfig() {
  try {
    const configPath = join(process.cwd(), 'src/config/visual-config.json');
    const configContent = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent);
    
    // Perform accessibility validation
    console.log('🔍 Validating color accessibility...');
    const accessibilityResult = validateColorAccessibility(config.colors);
    
    if (!accessibilityResult.isValid) {
      console.warn('⚠️  Accessibility issues detected:');
      accessibilityResult.errors.forEach(error => {
        console.warn(`   ❌ ${error}`);
      });
      accessibilityResult.warnings.forEach(warning => {
        console.warn(`   ⚠️  ${warning}`);
      });
      
      if (accessibilityResult.suggestions.length > 0) {
        console.log('💡 Suggestions for improvement:');
        accessibilityResult.suggestions.forEach(suggestion => {
          console.log(`   • ${suggestion}`);
        });
      }
    } else {
      console.log('✅ All color combinations meet WCAG AA accessibility standards');
    }
    
    return config;
  } catch (error) {
    console.error('Error reading visual config:', error);
    throw error;
  }
}

/**
 * Validate color accessibility for a complete visual configuration
 * @param colors - Color configuration object
 * @returns Comprehensive accessibility validation result
 */
function validateColorAccessibility(colors) {
  const result = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: [],
    contrastResults: {},
  };

  // Critical text/background combinations that must meet WCAG AA
  const criticalCombinations = [
    {
      name: 'text-on-background',
      foreground: colors.ui.text,
      background: colors.ui.background,
      description: 'Primary text on page background',
    },
    {
      name: 'text-on-surface',
      foreground: colors.ui.text,
      background: colors.ui.surface,
      description: 'Primary text on surface (cards, modals)',
    },
    {
      name: 'muted-text-on-background',
      foreground: colors.ui.textMuted,
      background: colors.ui.background,
      description: 'Secondary text on page background',
    },
    {
      name: 'muted-text-on-surface',
      foreground: colors.ui.textMuted,
      background: colors.ui.surface,
      description: 'Secondary text on surface',
    },
  ];

  // Validate critical combinations (must meet WCAG AA)
  criticalCombinations.forEach(({ name, foreground, background, description }) => {
    try {
      const ratio = getContrast(foreground, background);
      const meetsAA = ratio >= 4.5;
      const meetsAAA = ratio >= 7.0;
      
      result.contrastResults[name] = {
        ratio,
        meetsAA,
        meetsAAA,
      };

      if (!meetsAA) {
        result.isValid = false;
        result.errors.push(
          `${description}: Contrast ratio ${ratio.toFixed(2)}:1 does not meet WCAG AA standards (4.5:1 minimum)`
        );
        
        // Suggest an accessible color
        const suggestedColor = suggestAccessibleColor(foreground, background, 4.5);
        result.suggestions.push(
          `Consider changing ${name} from ${foreground} to ${suggestedColor} for better accessibility`
        );
      } else if (!meetsAAA) {
        result.warnings.push(
          `${description}: Contrast ratio ${ratio.toFixed(2)}:1 meets WCAG AA but not AAA standards (7:1)`
        );
      }
    } catch (error) {
      result.warnings.push(`Could not validate contrast for ${description}: ${error.message}`);
    }
  });

  return result;
}

/**
 * Suggest an accessible color variant
 * @param originalColor - The original color that needs adjustment
 * @param backgroundColor - The background color to contrast against
 * @param targetRatio - Target contrast ratio (default: WCAG AA)
 * @returns Suggested color that meets the target contrast ratio
 */
function suggestAccessibleColor(originalColor, backgroundColor, targetRatio = 4.5) {
  try {
    let adjustedColor = originalColor;
    let currentRatio = getContrast(adjustedColor, backgroundColor);
    
    // If already meets target, return original
    if (currentRatio >= targetRatio) {
      return originalColor;
    }

    // Determine if we should lighten or darken based on background luminance
    const bgHsla = parseToHsla(backgroundColor);
    const bgLuminance = bgHsla[2] / 100; // Convert lightness to 0-1 range
    
    // If background is light, darken the color; if dark, lighten it
    const shouldDarken = bgLuminance > 0.5;
    
    // Iteratively adjust color until we meet the target ratio
    let adjustment = 0.1;
    let attempts = 0;
    const maxAttempts = 20;
    
    while (currentRatio < targetRatio && attempts < maxAttempts) {
      try {
        adjustedColor = shouldDarken 
          ? darken(adjustedColor, adjustment)
          : lighten(adjustedColor, adjustment);
        
        currentRatio = getContrast(adjustedColor, backgroundColor);
        adjustment += 0.05;
        attempts++;
      } catch (error) {
        // If we can't adjust further, break
        break;
      }
    }
    
    return adjustedColor;
  } catch (error) {
    console.warn(`Warning: Could not suggest accessible color for ${originalColor}:`, error);
    return originalColor;
  }
}

/**
 * Generate CSS custom properties from visual configuration
 */
function generateCSSVariables(config) {
  const lines = [];
  
  // Brand colors
  lines.push('  /* Custom Brand Colors - Available as bg-primary, text-secondary, etc. */');
  lines.push(`  --color-primary: ${config.colors.brand.primary};`);
  lines.push(`  --color-secondary: ${config.colors.brand.secondary};`);
  if (config.colors.brand.accent) {
    lines.push(`  --color-accent: ${config.colors.brand.accent};`);
  }
  lines.push('');
  
  // UI colors
  lines.push('  /* Custom UI Colors - Available as bg-background, text-foreground, etc. */');
  lines.push(`  --color-background: ${config.colors.ui.background};`);
  lines.push(`  --color-surface: ${config.colors.ui.surface};`);
  lines.push(`  --color-text: ${config.colors.ui.text};`);
  lines.push(`  --color-text-muted: ${config.colors.ui.textMuted};`);
  lines.push(`  --color-border: ${config.colors.ui.border};`);
  lines.push(`  --color-success: ${config.colors.ui.success};`);
  lines.push(`  --color-warning: ${config.colors.ui.warning};`);
  lines.push(`  --color-error: ${config.colors.ui.error};`);
  lines.push(`  --color-info: ${config.colors.ui.info};`);
  lines.push('');
  
  // Typography
  lines.push('  /* Custom Typography */');
  lines.push(`  --font-family-sans: ${config.typography.fontFamilies.sans.join(', ')};`);
  lines.push(`  --font-family-serif: ${config.typography.fontFamilies.serif.join(', ')};`);
  lines.push(`  --font-family-mono: ${config.typography.fontFamilies.mono.join(', ')};`);
  if (config.typography.fontFamilies.display) {
    lines.push(`  --font-family-display: ${config.typography.fontFamilies.display.join(', ')};`);
  }
  lines.push('');
  
  // Font sizes
  lines.push('  /* Custom Font Sizes */');
  Object.entries(config.typography.scales).forEach(([key, value]) => {
    const cssKey = key.replace(/(\d+)xl/, '$1xl');
    lines.push(`  --font-size-${cssKey}: ${value};`);
  });
  lines.push('');
  
  // Spacing
  lines.push('  /* Custom Spacing */');
  Object.entries(config.spacing).forEach(([key, value]) => {
    const cssKey = key.toString().replace('.', '_');
    lines.push(`  --spacing-${cssKey}: ${value};`);
  });
  lines.push('');
  
  // Border radius
  lines.push('  /* Custom Border Radius */');
  Object.entries(config.borderRadius).forEach(([key, value]) => {
    const cssKey = key === 'DEFAULT' ? 'default' : key.replace(/(\d+)xl/, '$1xl');
    lines.push(`  --radius-${cssKey}: ${value};`);
  });
  lines.push('');
  
  // Shadows
  lines.push('  /* Custom Shadows */');
  Object.entries(config.shadows).forEach(([key, value]) => {
    const cssKey = key === 'DEFAULT' ? 'default' : key.replace(/(\d+)xl/, '$1xl');
    lines.push(`  --shadow-${cssKey}: ${value};`);
  });
  
  return lines.join('\n');
}

/**
 * Generate appropriate dark mode color variant using color2k
 * @param {string} lightColor - The light mode color (hex)
 * @param {string} type - The type of color ('brand', 'ui', 'semantic')
 * @returns {string} - The dark mode color variant
 */
function generateDarkColor(lightColor, type = 'brand') {
  try {
    // Parse the color to ensure it's valid
    const hsla = parseToHsla(lightColor);
    
    // Calculate luminance from lightness value (approximation)
    const luminance = hsla[2] / 100;
    
    switch (type) {
      case 'brand':
        // For brand colors, we want them to be more vibrant in dark mode
        // If the color is already bright, lighten it slightly
        // If it's dark, lighten it more significantly
        return luminance > 0.5 ? lighten(lightColor, 0.1) : lighten(lightColor, 0.3);
        
      case 'ui-background':
        // Background colors should be dark in dark mode
        return '#0f172a'; // slate-900
        
      case 'ui-surface':
        // Surface colors should be slightly lighter than background
        return '#1e293b'; // slate-800
        
      case 'ui-text':
        // Text colors should be light in dark mode
        return '#f1f5f9'; // slate-100
        
      case 'ui-text-muted':
        // Muted text should be medium light
        return '#94a3b8'; // slate-400
        
      case 'ui-border':
        // Borders should be visible but not too prominent
        return '#334155'; // slate-700
        
      case 'semantic':
        // For semantic colors (success, warning, error, info), make them brighter
        return lighten(lightColor, 0.2);
        
      default:
        // Default behavior: lighten if dark, darken if light
        return luminance > 0.5 ? darken(lightColor, 0.2) : lighten(lightColor, 0.2);
    }
  } catch (error) {
    console.warn(`Warning: Could not process color ${lightColor}, using fallback`);
    return lightColor;
  }
}

/**
 * Validate color contrast ratio for accessibility
 * @param {string} foreground - Foreground color
 * @param {string} background - Background color
 * @returns {boolean} - Whether the contrast meets WCAG AA standards (4.5:1)
 */
function validateContrast(foreground, background) {
  try {
    const contrast = getContrast(foreground, background);
    return contrast >= 4.5; // WCAG AA standard
  } catch (error) {
    console.warn(`Warning: Could not calculate contrast for ${foreground} on ${background}`);
    return true; // Assume it's okay if we can't calculate
  }
}

/**
 * Generate dark theme CSS variables with automatic color generation
 */
function generateDarkThemeCSS(config) {
  const lines = [];
  
  lines.push('/* Dark theme overrides - works with existing HSThemeAppearance system */');
  lines.push('.dark {');
  lines.push('  /* Brand colors - automatically adjusted for dark mode visibility */');
  
  // Generate dark mode variants for brand colors
  const darkPrimary = generateDarkColor(config.colors.brand.primary, 'brand');
  const darkSecondary = generateDarkColor(config.colors.brand.secondary, 'brand');
  
  lines.push(`  --color-primary: ${darkPrimary};      /* Auto-generated dark mode variant */`);
  lines.push(`  --color-secondary: ${darkSecondary};    /* Auto-generated dark mode variant */`);
  
  if (config.colors.brand.accent) {
    const darkAccent = generateDarkColor(config.colors.brand.accent, 'brand');
    lines.push(`  --color-accent: ${darkAccent};       /* Auto-generated dark mode variant */`);
  }
  
  lines.push('  ');
  lines.push('  /* UI colors - optimized for dark theme readability */');
  
  // Use specialized dark color generation for UI elements
  const darkBackground = generateDarkColor(config.colors.ui.background, 'ui-background');
  const darkSurface = generateDarkColor(config.colors.ui.surface, 'ui-surface');
  const darkText = generateDarkColor(config.colors.ui.text, 'ui-text');
  const darkTextMuted = generateDarkColor(config.colors.ui.textMuted, 'ui-text-muted');
  const darkBorder = generateDarkColor(config.colors.ui.border, 'ui-border');
  
  lines.push(`  --color-background: ${darkBackground};   /* Dark background */`);
  lines.push(`  --color-surface: ${darkSurface};      /* Dark surface */`);
  lines.push(`  --color-text: ${darkText};         /* Light text */`);
  lines.push(`  --color-text-muted: ${darkTextMuted};   /* Muted light text */`);
  lines.push(`  --color-border: ${darkBorder};       /* Dark border */`);
  
  // Generate dark variants for semantic colors
  const darkSuccess = generateDarkColor(config.colors.ui.success, 'semantic');
  const darkWarning = generateDarkColor(config.colors.ui.warning, 'semantic');
  const darkError = generateDarkColor(config.colors.ui.error, 'semantic');
  const darkInfo = generateDarkColor(config.colors.ui.info, 'semantic');
  
  lines.push(`  --color-success: ${darkSuccess};      /* Auto-generated success color */`);
  lines.push(`  --color-warning: ${darkWarning};      /* Auto-generated warning color */`);
  lines.push(`  --color-error: ${darkError};        /* Auto-generated error color */`);
  lines.push(`  --color-info: ${darkInfo};         /* Auto-generated info color */`);
  
  lines.push('}');
  
  // Validate contrast ratios and log warnings
  console.log('\n🔍 Checking color contrast ratios for accessibility...');
  
  const textOnBackground = validateContrast(darkText, darkBackground);
  const textOnSurface = validateContrast(darkText, darkSurface);
  const mutedTextOnBackground = validateContrast(darkTextMuted, darkBackground);
  
  if (!textOnBackground) {
    console.warn(`⚠️  Warning: Text color ${darkText} may not have sufficient contrast on background ${darkBackground}`);
  }
  if (!textOnSurface) {
    console.warn(`⚠️  Warning: Text color ${darkText} may not have sufficient contrast on surface ${darkSurface}`);
  }
  if (!mutedTextOnBackground) {
    console.warn(`⚠️  Warning: Muted text color ${darkTextMuted} may not have sufficient contrast on background ${darkBackground}`);
  }
  
  if (textOnBackground && textOnSurface && mutedTextOnBackground) {
    console.log('✅ All color combinations meet WCAG AA contrast requirements');
  }
  
  return lines.join('\n');
}

/**
 * Update the global.css file with generated CSS variables
 */
async function updateGlobalCSS(config) {
  try {
    const globalCSSPath = join(process.cwd(), 'src/assets/styles/global.css');
    
    // Read the current global.css file
    const currentCSS = await fs.readFile(globalCSSPath, 'utf-8');
    
    // Find the @theme block
    const themeStart = currentCSS.indexOf('@theme {');
    const themeEnd = currentCSS.indexOf('}', themeStart);
    
    if (themeStart === -1 || themeEnd === -1) {
      throw new Error('Could not find @theme block in global.css');
    }
    
    // Extract parts of the CSS
    const beforeTheme = currentCSS.substring(0, themeStart);
    const afterThemeBlock = currentCSS.substring(themeEnd + 1);
    const themeContent = currentCSS.substring(themeStart + 8, themeEnd);
    
    // Look for existing custom variables
    const customStart = themeContent.indexOf('  /* Custom Brand Colors');
    
    let staticThemeContent = '';
    if (customStart !== -1) {
      staticThemeContent = themeContent.substring(0, customStart);
    } else {
      staticThemeContent = themeContent;
    }
    
    // Ensure we have the essential Tailwind colors
    const essentialColors = `  /* https://tailwindcss.com/docs/colors#customizing-your-colors */
  --color-*: initial;
  --color-transparent: transparent;
  --color-current: currentColor;
  --color-black: #000;
  --color-white: #fff;

  --color-gray-50: oklch(0.985 0.002 247.839);
  --color-gray-100: oklch(0.967 0.003 264.542);
  --color-gray-200: oklch(0.928 0.006 264.531);
  --color-gray-300: oklch(0.872 0.01 258.338);
  --color-gray-400: oklch(0.707 0.022 261.325);
  --color-gray-500: oklch(0.551 0.027 264.364);
  --color-gray-600: oklch(0.446 0.03 256.802);
  --color-gray-700: oklch(0.373 0.034 259.733);
  --color-gray-800: oklch(0.278 0.033 256.848);
  --color-gray-900: oklch(0.21 0.034 264.665);
  --color-gray-950: oklch(0.13 0.028 261.692);

  --color-indigo-50: oklch(0.962 0.018 272.314);
  --color-indigo-100: oklch(0.93 0.034 272.788);
  --color-indigo-200: oklch(0.87 0.065 274.039);
  --color-indigo-300: oklch(0.785 0.115 274.713);
  --color-indigo-400: oklch(0.673 0.182 276.935);
  --color-indigo-500: oklch(0.585 0.233 277.117);
  --color-indigo-600: oklch(0.511 0.262 276.966);
  --color-indigo-700: oklch(0.457 0.24 277.023);
  --color-indigo-800: oklch(0.398 0.195 277.366);
  --color-indigo-900: oklch(0.359 0.144 278.697);
  --color-indigo-950: oklch(0.257 0.09 281.288);

  --color-neutral-50: oklch(0.985 0 0);
  --color-neutral-100: oklch(0.97 0 0);
  --color-neutral-200: oklch(0.922 0 0);
  --color-neutral-300: oklch(0.87 0 0);
  --color-neutral-400: oklch(0.708 0 0);
  --color-neutral-500: oklch(0.556 0 0);
  --color-neutral-600: oklch(0.439 0 0);
  --color-neutral-700: oklch(0.371 0 0);
  --color-neutral-800: oklch(0.269 0 0);
  --color-neutral-900: oklch(0.205 0 0);
  --color-neutral-950: oklch(0.145 0 0);

  --color-yellow-50: oklch(0.987 0.026 102.212);
  --color-yellow-100: oklch(0.973 0.071 103.193);
  --color-yellow-200: oklch(0.945 0.129 101.54);
  --color-yellow-300: oklch(0.905 0.182 98.111);
  --color-yellow-400: oklch(0.852 0.199 91.936);
  --color-yellow-500: oklch(0.795 0.184 86.047);
  --color-yellow-600: oklch(0.681 0.162 75.834);
  --color-yellow-700: oklch(0.554 0.135 66.442);
  --color-yellow-800: oklch(0.476 0.114 61.907);
  --color-yellow-900: oklch(0.421 0.095 57.708);
  --color-yellow-950: oklch(0.286 0.066 53.813);

  --color-orange-50: oklch(0.98 0.016 73.684);
  --color-orange-100: oklch(0.954 0.038 75.164);
  --color-orange-200: oklch(0.901 0.076 70.697);
  --color-orange-300: oklch(70.72% 0.182 40.56);
  --color-orange-400: oklch(67.4% 0.2072 39.23);
  --color-orange-500: oklch(61.86% 0.1946 38.88);
  --color-orange-600: oklch(0.646 0.222 41.116);
  --color-orange-700: oklch(0.553 0.195 38.402);
  --color-orange-800: oklch(0.47 0.157 37.304);
  --color-orange-900: oklch(0.408 0.123 38.172);
  --color-orange-950: oklch(0.266 0.079 36.259);

  --color-red-50: oklch(0.971 0.013 17.38);
  --color-red-100: oklch(0.936 0.032 17.717);
  --color-red-200: oklch(0.885 0.062 18.334);
  --color-red-300: oklch(0.808 0.114 19.571);
  --color-red-400: oklch(0.704 0.191 22.216);
  --color-red-500: oklch(0.637 0.237 25.331);
  --color-red-600: oklch(0.577 0.245 27.325);
  --color-red-700: oklch(0.505 0.213 27.518);
  --color-red-800: oklch(0.444 0.177 26.899);
  --color-red-900: oklch(0.396 0.141 25.723);
  --color-red-950: oklch(0.258 0.092 26.042);

  --color-zinc-50: oklch(0.985 0 0);
  --color-zinc-100: oklch(0.967 0.001 286.375);
  --color-zinc-200: oklch(0.92 0.004 286.32);
  --color-zinc-300: oklch(0.871 0.006 286.286);
  --color-zinc-400: oklch(0.705 0.015 286.067);
  --color-zinc-500: oklch(0.552 0.016 285.938);
  --color-zinc-600: oklch(0.442 0.017 285.786);
  --color-zinc-700: oklch(0.37 0.013 285.805);
  --color-zinc-800: oklch(0.274 0.006 286.033);
  --color-zinc-900: oklch(0.21 0.006 285.885);
  --color-zinc-950: oklch(0.141 0.005 285.823);

`;
    
    // Use essential colors if we don't have the core colors
    if (!staticThemeContent.includes('--color-orange-400')) {
      staticThemeContent = essentialColors;
    }
    
    // Generate custom variables from the actual config
    const customVariables = generateCSSVariables(config);
    
    // Generate dark theme CSS from the actual config
    const darkThemeCSS = generateDarkThemeCSS(config);
    
    // Remove existing dark theme section from afterThemeBlock
    let cleanAfterTheme = afterThemeBlock;
    const darkStart = afterThemeBlock.indexOf('/* Dark theme overrides');
    if (darkStart !== -1) {
      const hsEnd = afterThemeBlock.indexOf('.hs-dark-mode-active {');
      if (hsEnd !== -1) {
        const hsEndBrace = afterThemeBlock.indexOf('}', hsEnd);
        if (hsEndBrace !== -1) {
          cleanAfterTheme = afterThemeBlock.substring(hsEndBrace + 1);
        }
      }
    }
    
    // Reconstruct the CSS
    const newCSS = [
      beforeTheme.trim(),
      '@theme {',
      staticThemeContent.trim(),
      customVariables,
      '}',
      '',
      darkThemeCSS,
      '',
      '/* Ensure compatibility with existing Preline dark mode classes */',
      '.hs-dark-mode-active {',
      '  /* Additional dark mode customizations if needed */',
      '}',
      '',
      cleanAfterTheme.trim()
    ].filter(line => line !== '').join('\n') + '\n';
    
    // Write the file
    await fs.writeFile(globalCSSPath, newCSS, 'utf-8');
    
    console.log('✅ Successfully updated global.css with custom variables from config');
    console.log(`   Primary color: ${config.colors.brand.primary}`);
    console.log(`   Secondary color: ${config.colors.brand.secondary}`);
    console.log(`   Accent color: ${config.colors.brand.accent}`);
  } catch (error) {
    console.error('❌ Error updating global.css:', error);
    throw error;
  }
}

/**
 * Main function to regenerate CSS
 */
async function regenerateCSS() {
  console.log('🔄 Regenerating CSS from visual configuration...');
  
  try {
    const config = await readVisualConfig();
    console.log('📖 Read configuration from visual-config.json');
    
    await updateGlobalCSS(config);
    console.log('✅ CSS regeneration complete!');
  } catch (error) {
    console.error('❌ CSS regeneration failed:', error);
    process.exit(1);
  }
}

// Run the CSS regeneration
regenerateCSS().catch((error) => {
  console.error('Failed to regenerate CSS:', error);
  process.exit(1);
});