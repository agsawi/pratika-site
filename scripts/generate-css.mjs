#!/usr/bin/env node

/**
 * CLI script to regenerate CSS from visual configuration
 * This script can be run via npm script or directly
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Default visual configuration (matching the TypeScript config)
const visualConfig = {
  colors: {
    brand: {
      primary: '#3b82f6',
      secondary: '#f59e0b',
      accent: '#10b981'
    },
    ui: {
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
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
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    }
  },
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none'
  }
};

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
 * Convert hex color to RGB object
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Brighten a color by a given factor (0-1)
 */
function brightenColor(rgb, factor) {
  const brighten = (value) => Math.min(255, Math.round(value + (255 - value) * factor));
  
  const r = brighten(rgb.r);
  const g = brighten(rgb.g);
  const b = brighten(rgb.b);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Generate dark theme CSS variables
 */
function generateDarkThemeCSS(config) {
  const lines = [];
  
  lines.push('/* Dark theme overrides - works with existing HSThemeAppearance system */');
  lines.push('.dark {');
  lines.push('  /* Brand colors stay the same or get slightly adjusted for dark mode */');
  
  // For dark mode, we'll brighten the brand colors slightly
  const primaryRgb = hexToRgb(config.colors.brand.primary);
  const secondaryRgb = hexToRgb(config.colors.brand.secondary);
  const accentRgb = config.colors.brand.accent ? hexToRgb(config.colors.brand.accent) : null;
  
  if (primaryRgb) {
    const brighterPrimary = brightenColor(primaryRgb, 0.2);
    lines.push(`  --color-primary: ${brighterPrimary};      /* Slightly brighter for dark mode */`);
  }
  
  if (secondaryRgb) {
    const brighterSecondary = brightenColor(secondaryRgb, 0.2);
    lines.push(`  --color-secondary: ${brighterSecondary};    /* Slightly brighter for dark mode */`);
  }
  
  if (accentRgb) {
    const brighterAccent = brightenColor(accentRgb, 0.2);
    lines.push(`  --color-accent: ${brighterAccent};       /* Slightly brighter for dark mode */`);
  }
  
  lines.push('  ');
  lines.push('  /* UI colors completely change for dark theme */');
  lines.push('  --color-background: #0f172a;   /* Dark background (slate-900) */');
  lines.push('  --color-surface: #1e293b;      /* Dark surface (slate-800) */');
  lines.push('  --color-text: #f1f5f9;         /* Light text (slate-100) */');
  lines.push('  --color-text-muted: #94a3b8;   /* Muted light text (slate-400) */');
  lines.push('  --color-border: #334155;       /* Dark border (slate-700) */');
  lines.push('  --color-success: #22c55e;      /* Brighter success (green-500) */');
  lines.push('  --color-warning: #fbbf24;      /* Brighter warning (amber-400) */');
  lines.push('  --color-error: #f87171;        /* Brighter error (red-400) */');
  lines.push('  --color-info: #60a5fa;         /* Brighter info (blue-400) */');
  lines.push('}');
  
  return lines.join('\n');
}

/**
 * Update the global.css file with generated CSS variables
 */
async function updateGlobalCSS() {
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
    
    // Generate custom variables
    const customVariables = generateCSSVariables(visualConfig);
    
    // Generate dark theme CSS
    const darkThemeCSS = generateDarkThemeCSS(visualConfig);
    
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
    
    console.log('✅ Successfully updated global.css with custom variables');
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
    await updateGlobalCSS();
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