#!/usr/bin/env node

/**
 * Accessibility Checker Script
 * Validates color accessibility in the visual configuration
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { getContrast, parseToHsla, lighten, darken } from 'color2k';

/**
 * WCAG contrast ratio standards
 */
const WCAG_STANDARDS = {
  AA_NORMAL: 4.5,      // WCAG AA for normal text
  AA_LARGE: 3.0,       // WCAG AA for large text (18pt+ or 14pt+ bold)
  AAA_NORMAL: 7.0,     // WCAG AAA for normal text
  AAA_LARGE: 4.5,      // WCAG AAA for large text
};

/**
 * Read and parse the JSON configuration file
 */
async function readVisualConfig() {
  try {
    const configPath = join(process.cwd(), 'src/config/visual-config.json');
    const configContent = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(configContent);
  } catch (error) {
    console.error('❌ Error reading visual config:', error);
    throw error;
  }
}

/**
 * Calculate contrast ratio between two colors
 */
function validateContrast(foreground, background) {
  try {
    const ratio = getContrast(foreground, background);
    
    return {
      ratio,
      meetsAA: ratio >= WCAG_STANDARDS.AA_NORMAL,
      meetsAAA: ratio >= WCAG_STANDARDS.AAA_NORMAL,
      meetsAALarge: ratio >= WCAG_STANDARDS.AA_LARGE,
      meetsAAALarge: ratio >= WCAG_STANDARDS.AAA_LARGE,
    };
  } catch (error) {
    console.warn(`Warning: Could not calculate contrast for ${foreground} on ${background}:`, error);
    return {
      ratio: 0,
      meetsAA: false,
      meetsAAA: false,
      meetsAALarge: false,
      meetsAAALarge: false,
      error: error.message,
    };
  }
}

/**
 * Suggest an accessible color variant
 */
function suggestAccessibleColor(originalColor, backgroundColor, targetRatio = WCAG_STANDARDS.AA_NORMAL) {
  try {
    let adjustedColor = originalColor;
    let currentRatio = getContrast(adjustedColor, backgroundColor);
    
    // If already meets target, return original
    if (currentRatio >= targetRatio) {
      return originalColor;
    }

    // Determine if we should lighten or darken based on background luminance
    const bgHsla = parseToHsla(backgroundColor);
    const bgLuminance = bgHsla[2] / 100;
    
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
        break;
      }
    }
    
    return adjustedColor;
  } catch (error) {
    return originalColor;
  }
}

/**
 * Comprehensive accessibility validation
 */
function validateColorAccessibility(colors) {
  const result = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: [],
    contrastResults: {},
  };

  // Critical text/background combinations
  const criticalCombinations = [
    {
      name: 'text-on-background',
      foreground: colors.ui.text,
      background: colors.ui.background,
      description: 'Primary text on page background',
      required: true,
    },
    {
      name: 'text-on-surface',
      foreground: colors.ui.text,
      background: colors.ui.surface,
      description: 'Primary text on surface (cards, modals)',
      required: true,
    },
    {
      name: 'muted-text-on-background',
      foreground: colors.ui.textMuted,
      background: colors.ui.background,
      description: 'Secondary text on page background',
      required: true,
    },
    {
      name: 'muted-text-on-surface',
      foreground: colors.ui.textMuted,
      background: colors.ui.surface,
      description: 'Secondary text on surface',
      required: true,
    },
  ];

  // Semantic color combinations
  const semanticCombinations = [
    {
      name: 'success-on-background',
      foreground: colors.ui.success,
      background: colors.ui.background,
      description: 'Success color on background',
      required: false,
    },
    {
      name: 'warning-on-background',
      foreground: colors.ui.warning,
      background: colors.ui.background,
      description: 'Warning color on background',
      required: false,
    },
    {
      name: 'error-on-background',
      foreground: colors.ui.error,
      background: colors.ui.background,
      description: 'Error color on background',
      required: false,
    },
    {
      name: 'info-on-background',
      foreground: colors.ui.info,
      background: colors.ui.background,
      description: 'Info color on background',
      required: false,
    },
  ];

  // Brand color combinations
  const brandCombinations = [
    {
      name: 'primary-on-background',
      foreground: colors.brand.primary,
      background: colors.ui.background,
      description: 'Primary brand color on background',
      required: false,
    },
    {
      name: 'secondary-on-background',
      foreground: colors.brand.secondary,
      background: colors.ui.background,
      description: 'Secondary brand color on background',
      required: false,
    },
  ];

  if (colors.brand.accent) {
    brandCombinations.push({
      name: 'accent-on-background',
      foreground: colors.brand.accent,
      background: colors.ui.background,
      description: 'Accent brand color on background',
      required: false,
    });
  }

  // Validate all combinations
  [...criticalCombinations, ...semanticCombinations, ...brandCombinations].forEach(
    ({ name, foreground, background, description, required }) => {
      const contrastResult = validateContrast(foreground, background);
      result.contrastResults[name] = contrastResult;

      if (contrastResult.error) {
        result.warnings.push(`${description}: Could not validate contrast - ${contrastResult.error}`);
        return;
      }

      if (required && !contrastResult.meetsAA) {
        result.isValid = false;
        result.errors.push(
          `${description}: Contrast ratio ${contrastResult.ratio.toFixed(2)}:1 does not meet WCAG AA standards (4.5:1 minimum)`
        );
        
        const suggestedColor = suggestAccessibleColor(foreground, background);
        result.suggestions.push(
          `Consider changing ${name} from ${foreground} to ${suggestedColor} for better accessibility`
        );
      } else if (required && !contrastResult.meetsAAA) {
        result.warnings.push(
          `${description}: Contrast ratio ${contrastResult.ratio.toFixed(2)}:1 meets WCAG AA but not AAA standards (7:1)`
        );
      } else if (!required && !contrastResult.meetsAALarge) {
        result.warnings.push(
          `${description}: Contrast ratio ${contrastResult.ratio.toFixed(2)}:1 may not be sufficient for accessibility (3:1 minimum for large text)`
        );
      }
    }
  );

  return result;
}

/**
 * Generate a detailed accessibility report
 */
function generateReport(validationResult) {
  const lines = [];
  
  lines.push('🔍 Color Accessibility Report');
  lines.push('═'.repeat(60));
  lines.push('');
  
  if (validationResult.isValid) {
    lines.push('✅ Overall Status: PASSED');
    lines.push('   All critical color combinations meet WCAG AA standards');
  } else {
    lines.push('❌ Overall Status: FAILED');
    lines.push('   Some color combinations do not meet accessibility standards');
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
    lines.push('💡 Suggestions for Improvement:');
    validationResult.suggestions.forEach(suggestion => {
      lines.push(`   • ${suggestion}`);
    });
    lines.push('');
  }
  
  // Detailed contrast ratios table
  lines.push('📊 Detailed Contrast Ratios:');
  lines.push('─'.repeat(60));
  
  Object.entries(validationResult.contrastResults).forEach(([name, result]) => {
    if (result.error) {
      lines.push(`❓ ${name.padEnd(25)} Error: ${result.error}`);
      return;
    }
    
    const status = result.meetsAA ? '✅' : result.meetsAALarge ? '⚠️' : '❌';
    const ratio = result.ratio.toFixed(2);
    const standards = [];
    
    if (result.meetsAAA) standards.push('AAA');
    else if (result.meetsAA) standards.push('AA');
    else if (result.meetsAAALarge) standards.push('AAA Large');
    else if (result.meetsAALarge) standards.push('AA Large');
    else standards.push('None');
    
    lines.push(`${status} ${name.padEnd(25)} ${ratio}:1 (${standards.join(', ')})`);
  });
  
  lines.push('');
  lines.push('Legend:');
  lines.push('  ✅ Meets WCAG AA standards (4.5:1)');
  lines.push('  ⚠️  Meets large text standards (3:1) but not normal text');
  lines.push('  ❌ Does not meet accessibility standards');
  lines.push('');
  lines.push('Standards:');
  lines.push('  • WCAG AA Normal: 4.5:1 contrast ratio');
  lines.push('  • WCAG AA Large: 3:1 contrast ratio (18pt+ or 14pt+ bold)');
  lines.push('  • WCAG AAA Normal: 7:1 contrast ratio');
  lines.push('  • WCAG AAA Large: 4.5:1 contrast ratio');
  
  return lines.join('\n');
}

/**
 * Main function
 */
async function checkAccessibility() {
  try {
    console.log('🔍 Checking color accessibility in visual configuration...\n');
    
    const config = await readVisualConfig();
    const validationResult = validateColorAccessibility(config.colors);
    const report = generateReport(validationResult);
    
    console.log(report);
    
    // Exit with appropriate code
    if (validationResult.isValid) {
      console.log('\n🎉 Accessibility check completed successfully!');
      process.exit(0);
    } else {
      console.log('\n💡 Please address the critical issues above to improve accessibility.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Accessibility check failed:', error);
    process.exit(1);
  }
}

// Run the accessibility check
checkAccessibility();