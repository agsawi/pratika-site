/**
 * Color Accessibility Utilities
 * Provides WCAG contrast ratio validation and color accessibility checking
 */

import { getContrast, parseToHsla, lighten, darken } from 'color2k';

/**
 * WCAG contrast ratio standards
 */
export const WCAG_STANDARDS = {
  AA_NORMAL: 4.5,      // WCAG AA for normal text (18pt+ or 14pt+ bold)
  AA_LARGE: 3.0,       // WCAG AA for large text (18pt+ or 14pt+ bold)
  AAA_NORMAL: 7.0,     // WCAG AAA for normal text
  AAA_LARGE: 4.5,      // WCAG AAA for large text
} as const;

/**
 * Color contrast validation result
 */
export interface ContrastValidationResult {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  meetsAALarge: boolean;
  meetsAAALarge: boolean;
  recommendation?: string;
}

/**
 * Accessibility validation result for a color configuration
 */
export interface AccessibilityValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
  contrastResults: Record<string, ContrastValidationResult>;
}

/**
 * Calculate contrast ratio between two colors
 * @param foreground - Foreground color (hex, rgb, hsl, etc.)
 * @param background - Background color (hex, rgb, hsl, etc.)
 * @returns Contrast validation result
 */
export function validateContrast(
  foreground: string,
  background: string
): ContrastValidationResult {
  try {
    const ratio = getContrast(foreground, background);
    
    const result: ContrastValidationResult = {
      ratio,
      meetsAA: ratio >= WCAG_STANDARDS.AA_NORMAL,
      meetsAAA: ratio >= WCAG_STANDARDS.AAA_NORMAL,
      meetsAALarge: ratio >= WCAG_STANDARDS.AA_LARGE,
      meetsAAALarge: ratio >= WCAG_STANDARDS.AAA_LARGE,
    };

    // Add recommendations if contrast is insufficient
    if (!result.meetsAA) {
      if (ratio < WCAG_STANDARDS.AA_LARGE) {
        result.recommendation = `Contrast ratio ${ratio.toFixed(2)}:1 is too low. Consider using a darker foreground or lighter background to meet WCAG AA standards (4.5:1 minimum).`;
      } else {
        result.recommendation = `Contrast ratio ${ratio.toFixed(2)}:1 meets WCAG AA for large text only. Consider improving contrast for better accessibility.`;
      }
    }

    return result;
  } catch (error) {
    console.warn(`Warning: Could not calculate contrast for ${foreground} on ${background}:`, error);
    return {
      ratio: 0,
      meetsAA: false,
      meetsAAA: false,
      meetsAALarge: false,
      meetsAAALarge: false,
      recommendation: `Unable to calculate contrast ratio. Please verify color formats are valid.`,
    };
  }
}

/**
 * Suggest an accessible color variant
 * @param originalColor - The original color that needs adjustment
 * @param backgroundColor - The background color to contrast against
 * @param targetRatio - Target contrast ratio (default: WCAG AA)
 * @returns Suggested color that meets the target contrast ratio
 */
export function suggestAccessibleColor(
  originalColor: string,
  backgroundColor: string,
  targetRatio: number = WCAG_STANDARDS.AA_NORMAL
): string {
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
 * Validate color accessibility for a complete visual configuration
 * @param colors - Color configuration object
 * @returns Comprehensive accessibility validation result
 */
export function validateColorAccessibility(colors: {
  brand: { primary: string; secondary: string; accent?: string };
  ui: {
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}): AccessibilityValidationResult {
  const result: AccessibilityValidationResult = {
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

  // Important semantic color combinations
  const semanticCombinations = [
    {
      name: 'success-on-background',
      foreground: colors.ui.success,
      background: colors.ui.background,
      description: 'Success color on background',
    },
    {
      name: 'warning-on-background',
      foreground: colors.ui.warning,
      background: colors.ui.background,
      description: 'Warning color on background',
    },
    {
      name: 'error-on-background',
      foreground: colors.ui.error,
      background: colors.ui.background,
      description: 'Error color on background',
    },
    {
      name: 'info-on-background',
      foreground: colors.ui.info,
      background: colors.ui.background,
      description: 'Info color on background',
    },
  ];

  // Brand color combinations (less critical but still important)
  const brandCombinations = [
    {
      name: 'primary-on-background',
      foreground: colors.brand.primary,
      background: colors.ui.background,
      description: 'Primary brand color on background',
    },
    {
      name: 'secondary-on-background',
      foreground: colors.brand.secondary,
      background: colors.ui.background,
      description: 'Secondary brand color on background',
    },
  ];

  if (colors.brand.accent) {
    brandCombinations.push({
      name: 'accent-on-background',
      foreground: colors.brand.accent,
      background: colors.ui.background,
      description: 'Accent brand color on background',
    });
  }

  // Validate critical combinations (must meet WCAG AA)
  criticalCombinations.forEach(({ name, foreground, background, description }) => {
    const contrastResult = validateContrast(foreground, background);
    result.contrastResults[name] = contrastResult;

    if (!contrastResult.meetsAA) {
      result.isValid = false;
      result.errors.push(
        `${description}: Contrast ratio ${contrastResult.ratio.toFixed(2)}:1 does not meet WCAG AA standards (4.5:1 minimum)`
      );
      
      const suggestedColor = suggestAccessibleColor(foreground, background);
      result.suggestions.push(
        `Consider changing ${name} from ${foreground} to ${suggestedColor} for better accessibility`
      );
    } else if (!contrastResult.meetsAAA) {
      result.warnings.push(
        `${description}: Contrast ratio ${contrastResult.ratio.toFixed(2)}:1 meets WCAG AA but not AAA standards (7:1)`
      );
    }
  });

  // Validate semantic combinations (should meet at least WCAG AA Large)
  semanticCombinations.forEach(({ name, foreground, background, description }) => {
    const contrastResult = validateContrast(foreground, background);
    result.contrastResults[name] = contrastResult;

    if (!contrastResult.meetsAALarge) {
      result.warnings.push(
        `${description}: Contrast ratio ${contrastResult.ratio.toFixed(2)}:1 may not be sufficient for accessibility (3:1 minimum for large text)`
      );
      
      const suggestedColor = suggestAccessibleColor(foreground, background, WCAG_STANDARDS.AA_LARGE);
      result.suggestions.push(
        `Consider changing ${name} from ${foreground} to ${suggestedColor} for better visibility`
      );
    }
  });

  // Validate brand combinations (informational)
  brandCombinations.forEach(({ name, foreground, background, description }) => {
    const contrastResult = validateContrast(foreground, background);
    result.contrastResults[name] = contrastResult;

    if (!contrastResult.meetsAALarge) {
      result.suggestions.push(
        `${description}: Consider ensuring sufficient contrast when using this color for text (current ratio: ${contrastResult.ratio.toFixed(2)}:1)`
      );
    }
  });

  return result;
}

/**
 * Generate an accessibility report as a formatted string
 * @param validationResult - Result from validateColorAccessibility
 * @returns Formatted accessibility report
 */
export function generateAccessibilityReport(validationResult: AccessibilityValidationResult): string {
  const lines: string[] = [];
  
  lines.push('🔍 Color Accessibility Report');
  lines.push('═'.repeat(50));
  
  if (validationResult.isValid) {
    lines.push('✅ Overall Status: PASSED - All critical color combinations meet WCAG AA standards');
  } else {
    lines.push('❌ Overall Status: FAILED - Some color combinations do not meet accessibility standards');
  }
  
  lines.push('');
  
  if (validationResult.errors.length > 0) {
    lines.push('🚨 Critical Issues (Must Fix):');
    validationResult.errors.forEach(error => {
      lines.push(`   • ${error}`);
    });
    lines.push('');
  }
  
  if (validationResult.warnings.length > 0) {
    lines.push('⚠️  Warnings (Recommended to Fix):');
    validationResult.warnings.forEach(warning => {
      lines.push(`   • ${warning}`);
    });
    lines.push('');
  }
  
  if (validationResult.suggestions.length > 0) {
    lines.push('💡 Suggestions:');
    validationResult.suggestions.forEach(suggestion => {
      lines.push(`   • ${suggestion}`);
    });
    lines.push('');
  }
  
  // Detailed contrast ratios
  lines.push('📊 Detailed Contrast Ratios:');
  Object.entries(validationResult.contrastResults).forEach(([name, result]) => {
    const status = result.meetsAA ? '✅' : result.meetsAALarge ? '⚠️' : '❌';
    lines.push(`   ${status} ${name}: ${result.ratio.toFixed(2)}:1`);
  });
  
  return lines.join('\n');
}

/**
 * Validate individual color format
 * @param color - Color string to validate
 * @returns Whether the color is in a valid format
 */
export function isValidColor(color: string): boolean {
  try {
    parseToHsla(color);
    return true;
  } catch {
    return false;
  }
}

/**
 * Batch validate multiple colors
 * @param colors - Array of color strings
 * @returns Array of validation results
 */
export function validateColorFormats(colors: string[]): { color: string; isValid: boolean }[] {
  return colors.map(color => ({
    color,
    isValid: isValidColor(color),
  }));
}