import { promises as fs } from 'fs';
import { join } from 'path';
import { getConfig } from './config-helpers';
import type { VisualConfig } from './types';

/**
 * Generate CSS custom properties from visual configuration
 */
export function generateCSSVariables(config: VisualConfig): string {
  const lines: string[] = [];
  
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
    const cssKey = key.replace(/(\d+)xl/, '$1xl'); // Handle 2xl, 3xl, etc.
    lines.push(`  --font-size-${cssKey}: ${value};`);
  });
  lines.push('');
  
  // Spacing
  lines.push('  /* Custom Spacing */');
  Object.entries(config.spacing).forEach(([key, value]) => {
    const cssKey = key.replace('.', '_'); // Convert 0.5 to 0_5 for CSS variable names
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
 * Generate dark theme CSS variables
 */
export function generateDarkThemeCSS(config: VisualConfig): string {
  const lines: string[] = [];
  
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
 * Convert hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
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
function brightenColor(rgb: { r: number; g: number; b: number }, factor: number): string {
  const brighten = (value: number) => Math.min(255, Math.round(value + (255 - value) * factor));
  
  const r = brighten(rgb.r);
  const g = brighten(rgb.g);
  const b = brighten(rgb.b);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Update the global.css file with generated CSS variables
 */
export async function updateGlobalCSS(): Promise<void> {
  try {
    const config = getConfig();
    const globalCSSPath = join(process.cwd(), 'src/assets/styles/global.css');
    
    // Read the current global.css file
    const currentCSS = await fs.readFile(globalCSSPath, 'utf-8');
    
    // Find the @theme block and replace the custom variables
    const themeStart = currentCSS.indexOf('@theme {');
    const themeEnd = currentCSS.indexOf('}', themeStart);
    
    if (themeStart === -1 || themeEnd === -1) {
      throw new Error('Could not find @theme block in global.css');
    }
    
    // Extract the part before @theme, the static theme content, and the part after
    const beforeTheme = currentCSS.substring(0, themeStart);
    const afterThemeBlock = currentCSS.substring(themeEnd + 1);
    
    // Find where our custom variables start and end within the theme block
    const themeContent = currentCSS.substring(themeStart + 8, themeEnd); // +8 for '@theme {'
    
    // Look for the start of custom brand colors comment
    const customStart = themeContent.indexOf('  /* Custom Brand Colors');
    
    let staticThemeContent = '';
    let afterCustomContent = '';
    
    if (customStart !== -1) {
      // Keep everything before our custom variables
      staticThemeContent = themeContent.substring(0, customStart);
      
      // Look for the end of our custom variables (before the dark theme section)
      const darkThemeStart = afterThemeBlock.indexOf('/* Dark theme overrides');
      if (darkThemeStart !== -1) {
        afterCustomContent = afterThemeBlock.substring(darkThemeStart);
      } else {
        // If no dark theme section exists, keep everything after the theme block
        afterCustomContent = afterThemeBlock;
      }
    } else {
      // If no custom variables exist yet, keep all theme content as static
      staticThemeContent = themeContent;
      afterCustomContent = afterThemeBlock;
    }
    
    // Generate new custom variables
    const customVariables = generateCSSVariables(config);
    
    // Generate dark theme CSS
    const darkThemeCSS = generateDarkThemeCSS(config);
    
    // Reconstruct the CSS file
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
      afterCustomContent.replace(/^\/\* Dark theme overrides[\s\S]*?\.hs-dark-mode-active\s*\{[\s\S]*?\}\s*/, '')
    ].join('\n');
    
    // Write the updated CSS back to the file
    await fs.writeFile(globalCSSPath, newCSS, 'utf-8');
    
    console.log('✅ Successfully updated global.css with custom variables');
  } catch (error) {
    console.error('❌ Error updating global.css:', error);
    throw error;
  }
}

/**
 * CLI function to regenerate CSS from configuration
 */
export async function regenerateCSS(): Promise<void> {
  console.log('🔄 Regenerating CSS from visual configuration...');
  
  try {
    await updateGlobalCSS();
    console.log('✅ CSS regeneration complete!');
  } catch (error) {
    console.error('❌ CSS regeneration failed:', error);
    process.exit(1);
  }
}