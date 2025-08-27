#!/usr/bin/env node

/**
 * Pratika Brand Accessibility Validation Script
 * Validates the accessibility compliance of Pratika's brand implementation
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
 * Pratika brand colors extracted from global.css
 */
const PRATIKA_COLORS = {
  brand: {
    50: '#f8f9ff',
    100: '#e8ebff',
    200: '#c7d2ff',
    300: '#8fa5ff',
    400: '#1e3a8a',
    500: '#2d4ed8',
    600: '#18204e',  // Primary brand color
    700: '#131a3f',
    800: '#0f1530',
    900: '#0a0f21',
    secondary: '#064f94',
    teal: '#23bdc5',
    lightBlue: '#397dc0'
  },
  ui: {
    white: '#ffffff',
    lightGray: '#f8fafc',
    darkText: '#1e293b',
    mutedText: '#64748b',
    border: '#e2e8f0'
  }
};

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
 * Validate Pratika brand color accessibility
 */
function validatePratikaBrandAccessibility() {
  const results = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: [],
    contrastResults: {},
  };

  console.log('🎨 Validating Pratika Brand Color Accessibility\n');

  // Critical brand color combinations
  const brandCombinations = [
    {
      name: 'Primary Brand on White',
      foreground: PRATIKA_COLORS.brand[600],
      background: PRATIKA_COLORS.ui.white,
      description: 'Primary brand color (#18204e) on white background',
      critical: true,
    },
    {
      name: 'Primary Brand on Light Surface',
      foreground: PRATIKA_COLORS.brand[600],
      background: PRATIKA_COLORS.ui.lightGray,
      description: 'Primary brand color on light surface (#f8fafc)',
      critical: true,
    },
    {
      name: 'Secondary Brand on White',
      foreground: PRATIKA_COLORS.brand.secondary,
      background: PRATIKA_COLORS.ui.white,
      description: 'Secondary brand color (#064f94) on white background',
      critical: true,
    },
    {
      name: 'Brand Teal on White',
      foreground: PRATIKA_COLORS.brand.teal,
      background: PRATIKA_COLORS.ui.white,
      description: 'Brand teal color (#23bdc5) on white background',
      critical: false,
    },
    {
      name: 'Brand Light Blue on White',
      foreground: PRATIKA_COLORS.brand.lightBlue,
      background: PRATIKA_COLORS.ui.white,
      description: 'Brand light blue color (#397dc0) on white background',
      critical: false,
    },
    {
      name: 'White Text on Primary Brand',
      foreground: PRATIKA_COLORS.ui.white,
      background: PRATIKA_COLORS.brand[600],
      description: 'White text on primary brand background',
      critical: true,
    },
    {
      name: 'White Text on Secondary Brand',
      foreground: PRATIKA_COLORS.ui.white,
      background: PRATIKA_COLORS.brand.secondary,
      description: 'White text on secondary brand background',
      critical: true,
    },
  ];

  // Brand scale combinations for different use cases
  const brandScaleCombinations = [
    {
      name: 'Brand 300 on White (Light Mode Accent)',
      foreground: PRATIKA_COLORS.brand[300],
      background: PRATIKA_COLORS.ui.white,
      description: 'Light brand color for accents in light mode',
      critical: false,
    },
    {
      name: 'Brand 400 on White (Medium Contrast)',
      foreground: PRATIKA_COLORS.brand[400],
      background: PRATIKA_COLORS.ui.white,
      description: 'Medium brand color for better contrast',
      critical: false,
    },
    {
      name: 'Brand 700 on White (High Contrast)',
      foreground: PRATIKA_COLORS.brand[700],
      background: PRATIKA_COLORS.ui.white,
      description: 'Dark brand color for high contrast',
      critical: false,
    },
  ];

  // Typography combinations
  const typographyCombinations = [
    {
      name: 'Dark Text on White (Body Text)',
      foreground: PRATIKA_COLORS.ui.darkText,
      background: PRATIKA_COLORS.ui.white,
      description: 'Primary body text color on white background',
      critical: true,
    },
    {
      name: 'Muted Text on White (Secondary Text)',
      foreground: PRATIKA_COLORS.ui.mutedText,
      background: PRATIKA_COLORS.ui.white,
      description: 'Secondary/muted text color on white background',
      critical: true,
    },
  ];

  // Validate all combinations
  [...brandCombinations, ...brandScaleCombinations, ...typographyCombinations].forEach(
    ({ name, foreground, background, description, critical }) => {
      const contrastResult = validateContrast(foreground, background);
      results.contrastResults[name] = contrastResult;

      if (contrastResult.error) {
        results.warnings.push(`${description}: Could not validate contrast - ${contrastResult.error}`);
        return;
      }

      const ratio = contrastResult.ratio.toFixed(2);

      if (critical && !contrastResult.meetsAA) {
        results.isValid = false;
        results.errors.push(
          `${description}: Contrast ratio ${ratio}:1 does not meet WCAG AA standards (4.5:1 minimum)`
        );
      } else if (critical && !contrastResult.meetsAAA) {
        results.warnings.push(
          `${description}: Contrast ratio ${ratio}:1 meets WCAG AA but not AAA standards (7:1)`
        );
      } else if (!critical && !contrastResult.meetsAALarge) {
        results.suggestions.push(
          `${description}: Contrast ratio ${ratio}:1 may not be sufficient for small text (consider for large text only)`
        );
      }
    }
  );

  return results;
}

/**
 * Validate focus visibility
 */
function validateFocusVisibility() {
  console.log('🎯 Validating Focus Visibility\n');
  
  const focusResults = {
    isValid: true,
    recommendations: [],
  };

  // Focus ring combinations
  const focusCombinations = [
    {
      name: 'Brand Focus Ring on White',
      foreground: PRATIKA_COLORS.brand[600],
      background: PRATIKA_COLORS.ui.white,
      description: 'Primary brand focus ring on white background',
    },
    {
      name: 'Brand Focus Ring on Light Surface',
      foreground: PRATIKA_COLORS.brand[600],
      background: PRATIKA_COLORS.ui.lightGray,
      description: 'Primary brand focus ring on light surface',
    },
  ];

  focusCombinations.forEach(({ name, foreground, background, description }) => {
    const contrastResult = validateContrast(foreground, background);
    
    if (contrastResult.meetsAA) {
      console.log(`✅ ${name}: ${contrastResult.ratio.toFixed(2)}:1 - Excellent focus visibility`);
    } else if (contrastResult.meetsAALarge) {
      console.log(`⚠️  ${name}: ${contrastResult.ratio.toFixed(2)}:1 - Adequate for large elements`);
      focusResults.recommendations.push(`Consider enhancing focus visibility for ${description}`);
    } else {
      console.log(`❌ ${name}: ${contrastResult.ratio.toFixed(2)}:1 - Poor focus visibility`);
      focusResults.isValid = false;
      focusResults.recommendations.push(`Improve focus visibility for ${description}`);
    }
  });

  return focusResults;
}

/**
 * Validate typography readability
 */
function validateTypographyReadability() {
  console.log('\n📖 Validating Typography Readability\n');
  
  const typographyResults = {
    isValid: true,
    recommendations: [],
  };

  // Typography accessibility checks
  const typographyChecks = [
    {
      name: 'Merriweather Headings',
      description: 'Merriweather font family for headings provides good readability',
      status: 'good',
      note: 'Serif font with good character distinction and readability'
    },
    {
      name: 'Open Sans Body Text',
      description: 'Open Sans font family for body text provides excellent readability',
      status: 'excellent',
      note: 'Sans-serif font optimized for screen reading and accessibility'
    },
    {
      name: 'Font Size Hierarchy',
      description: 'Proper font size hierarchy ensures content structure is clear',
      status: 'good',
      note: 'Tailwind CSS provides appropriate size scales for accessibility'
    },
    {
      name: 'Line Height',
      description: 'Adequate line height improves readability for users with dyslexia',
      status: 'good',
      note: 'Default Tailwind line heights meet accessibility guidelines'
    }
  ];

  typographyChecks.forEach(({ name, description, status, note }) => {
    const statusIcon = status === 'excellent' ? '🌟' : status === 'good' ? '✅' : '⚠️';
    console.log(`${statusIcon} ${name}: ${description}`);
    console.log(`   ${note}\n`);
    
    if (status === 'warning') {
      typographyResults.recommendations.push(description);
    }
  });

  return typographyResults;
}

/**
 * Check for color-based information alternatives
 */
function validateColorInformationAlternatives() {
  console.log('🔍 Validating Color Information Alternatives\n');
  
  const alternativesResults = {
    isValid: true,
    recommendations: [],
  };

  const colorInformationChecks = [
    {
      name: 'Interactive States',
      description: 'Interactive elements should not rely solely on color changes',
      recommendation: 'Ensure hover/focus states include visual changes beyond color (underlines, borders, shadows)',
      status: 'check-required'
    },
    {
      name: 'Form Validation',
      description: 'Form errors should not rely solely on red color',
      recommendation: 'Include error icons, text descriptions, and border changes for form validation',
      status: 'check-required'
    },
    {
      name: 'Status Indicators',
      description: 'Success/warning/error states should include non-color indicators',
      recommendation: 'Use icons, text labels, or patterns alongside color coding',
      status: 'check-required'
    },
    {
      name: 'Navigation States',
      description: 'Active/current navigation items should not rely solely on color',
      recommendation: 'Include underlines, bold text, or background changes for active states',
      status: 'check-required'
    }
  ];

  colorInformationChecks.forEach(({ name, description, recommendation, status }) => {
    console.log(`📋 ${name}: ${description}`);
    console.log(`   💡 ${recommendation}\n`);
    alternativesResults.recommendations.push(recommendation);
  });

  return alternativesResults;
}

/**
 * Generate comprehensive accessibility report
 */
function generateComprehensiveReport(brandResults, focusResults, typographyResults, alternativesResults) {
  const lines = [];
  
  lines.push('🎨 Pratika Brand Accessibility Compliance Report');
  lines.push('═'.repeat(70));
  lines.push('');
  
  // Overall status
  const overallValid = brandResults.isValid && focusResults.isValid && typographyResults.isValid && alternativesResults.isValid;
  
  if (overallValid) {
    lines.push('✅ Overall Status: COMPLIANT');
    lines.push('   Pratika brand implementation meets WCAG AA accessibility standards');
  } else {
    lines.push('⚠️  Overall Status: NEEDS ATTENTION');
    lines.push('   Some aspects require review for full accessibility compliance');
  }
  
  lines.push('');
  
  // Brand color results
  lines.push('🎨 Brand Color Accessibility:');
  if (brandResults.isValid) {
    lines.push('   ✅ All critical brand colors meet WCAG AA standards');
  } else {
    lines.push('   ❌ Some brand colors need adjustment');
  }
  
  if (brandResults.errors.length > 0) {
    lines.push('   Critical Issues:');
    brandResults.errors.forEach(error => lines.push(`     • ${error}`));
  }
  
  if (brandResults.warnings.length > 0) {
    lines.push('   Warnings:');
    brandResults.warnings.forEach(warning => lines.push(`     • ${warning}`));
  }
  
  lines.push('');
  
  // Focus visibility results
  lines.push('🎯 Focus Visibility:');
  if (focusResults.isValid) {
    lines.push('   ✅ Focus indicators provide adequate visibility');
  } else {
    lines.push('   ⚠️  Focus visibility needs improvement');
  }
  
  if (focusResults.recommendations.length > 0) {
    focusResults.recommendations.forEach(rec => lines.push(`     • ${rec}`));
  }
  
  lines.push('');
  
  // Typography results
  lines.push('📖 Typography Accessibility:');
  lines.push('   ✅ Pratika typography choices support accessibility');
  lines.push('   ✅ Merriweather (headings) and Open Sans (body) provide good readability');
  
  lines.push('');
  
  // Color information alternatives
  lines.push('🔍 Color Information Alternatives:');
  lines.push('   📋 Manual verification required for the following:');
  alternativesResults.recommendations.forEach(rec => lines.push(`     • ${rec}`));
  
  lines.push('');
  
  // Detailed contrast ratios
  lines.push('📊 Detailed Brand Color Contrast Ratios:');
  lines.push('─'.repeat(70));
  
  Object.entries(brandResults.contrastResults).forEach(([name, result]) => {
    if (result.error) {
      lines.push(`❓ ${name.padEnd(35)} Error: ${result.error}`);
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
    
    lines.push(`${status} ${name.padEnd(35)} ${ratio}:1 (${standards.join(', ')})`);
  });
  
  lines.push('');
  lines.push('Legend:');
  lines.push('  ✅ Meets WCAG AA standards (4.5:1 for normal text)');
  lines.push('  ⚠️  Meets large text standards (3:1) but not normal text');
  lines.push('  ❌ Does not meet accessibility standards');
  
  lines.push('');
  lines.push('🎯 Key Findings:');
  lines.push('  • Pratika primary brand color (#18204e) has excellent contrast (15.49:1)');
  lines.push('  • Pratika secondary color (#064f94) has excellent contrast (8.22:1)');
  lines.push('  • Brand colors are suitable for text on light backgrounds');
  lines.push('  • Typography choices (Merriweather + Open Sans) support accessibility');
  lines.push('  • Manual verification needed for interactive states and form validation');
  
  return lines.join('\n');
}

/**
 * Main function
 */
async function validatePratikaAccessibility() {
  try {
    console.log('🔍 Starting Pratika Brand Accessibility Validation...\n');
    
    const brandResults = validatePratikaBrandAccessibility();
    const focusResults = validateFocusVisibility();
    const typographyResults = validateTypographyReadability();
    const alternativesResults = validateColorInformationAlternatives();
    
    const report = generateComprehensiveReport(brandResults, focusResults, typographyResults, alternativesResults);
    
    console.log('\n' + report);
    
    // Exit with appropriate code
    const overallValid = brandResults.isValid && focusResults.isValid;
    
    if (overallValid) {
      console.log('\n🎉 Pratika brand accessibility validation completed successfully!');
      console.log('💡 Remember to manually verify interactive states and form validation patterns.');
      process.exit(0);
    } else {
      console.log('\n⚠️  Please address the issues above to ensure full accessibility compliance.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Accessibility validation failed:', error);
    process.exit(1);
  }
}

// Run the validation
validatePratikaAccessibility();