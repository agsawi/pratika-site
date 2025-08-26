/**
 * Integration tests for visual customization system with existing components
 * Tests Requirements: 2.1, 2.2, 5.2
 */

import { getVisualConfig } from '../../config/visual-config';

export interface IntegrationTestResult {
  testName: string;
  passed: boolean;
  message: string;
  details?: any;
}

/**
 * Test that custom colors are properly applied to Tailwind utilities
 */
export function testTailwindUtilityGeneration(): IntegrationTestResult {
  try {
    const config = getVisualConfig();
    
    // Check if CSS custom properties are defined
    const rootStyles = getComputedStyle(document.documentElement);
    
    const primaryColor = rootStyles.getPropertyValue('--color-primary').trim();
    const secondaryColor = rootStyles.getPropertyValue('--color-secondary').trim();
    const backgroundColorVar = rootStyles.getPropertyValue('--color-background').trim();
    
    const passed = primaryColor === config.colors.brand.primary &&
                  secondaryColor === config.colors.brand.secondary &&
                  backgroundColorVar === config.colors.ui.background;
    
    return {
      testName: 'Tailwind Utility Generation',
      passed,
      message: passed 
        ? 'Custom colors are correctly applied to CSS custom properties'
        : 'Custom colors are not properly applied to CSS custom properties',
      details: {
        expected: {
          primary: config.colors.brand.primary,
          secondary: config.colors.brand.secondary,
          background: config.colors.ui.background
        },
        actual: {
          primary: primaryColor,
          secondary: secondaryColor,
          background: backgroundColorVar
        }
      }
    };
  } catch (error) {
    return {
      testName: 'Tailwind Utility Generation',
      passed: false,
      message: `Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: { error }
    };
  }
}

/**
 * Test that Preline UI components work with custom colors
 */
export function testPrelineUIIntegration(): IntegrationTestResult {
  try {
    // Test if we can find elements with custom color classes
    const primaryButton = document.querySelector('.bg-primary');
    const surfaceElement = document.querySelector('.bg-surface');
    const borderElement = document.querySelector('.border-border');
    
    const passed = primaryButton !== null && surfaceElement !== null && borderElement !== null;
    
    return {
      testName: 'Preline UI Integration',
      passed,
      message: passed 
        ? 'Preline UI components are using custom color classes'
        : 'Preline UI components are not properly using custom color classes',
      details: {
        foundElements: {
          primaryButton: !!primaryButton,
          surfaceElement: !!surfaceElement,
          borderElement: !!borderElement
        }
      }
    };
  } catch (error) {
    return {
      testName: 'Preline UI Integration',
      passed: false,
      message: `Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: { error }
    };
  }
}

/**
 * Test that theme switching works with HSThemeAppearance
 */
export function testHSThemeAppearanceIntegration(): IntegrationTestResult {
  try {
    // Check if HSThemeAppearance is available
    const hsThemeAppearance = (window as any).HSThemeAppearance;
    
    if (!hsThemeAppearance) {
      return {
        testName: 'HSThemeAppearance Integration',
        passed: false,
        message: 'HSThemeAppearance is not available on window object',
        details: { hsThemeAppearance: null }
      };
    }
    
    // Check if theme switching functions exist
    const hasSetAppearance = typeof hsThemeAppearance.setAppearance === 'function';
    const hasGetAppearance = typeof hsThemeAppearance.getAppearance === 'function';
    
    // Check if dark mode CSS variables are defined
    const rootStyles = getComputedStyle(document.documentElement);
    const hasDarkModeVars = rootStyles.getPropertyValue('--color-primary') !== '';
    
    const passed = hasSetAppearance && hasGetAppearance && hasDarkModeVars;
    
    return {
      testName: 'HSThemeAppearance Integration',
      passed,
      message: passed 
        ? 'HSThemeAppearance is properly integrated with custom colors'
        : 'HSThemeAppearance integration has issues',
      details: {
        hsThemeAppearance: !!hsThemeAppearance,
        hasSetAppearance,
        hasGetAppearance,
        hasDarkModeVars
      }
    };
  } catch (error) {
    return {
      testName: 'HSThemeAppearance Integration',
      passed: false,
      message: `Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: { error }
    };
  }
}

/**
 * Test that existing components (navbar, modals, forms) work with custom colors
 */
export function testExistingComponentsIntegration(): IntegrationTestResult {
  try {
    // Check for navbar elements
    const navbarElements = document.querySelectorAll('nav, .navbar, [role="navigation"]');
    
    // Check for modal elements
    const modalElements = document.querySelectorAll('[data-hs-overlay], .hs-overlay');
    
    // Check for form elements
    const formElements = document.querySelectorAll('input, select, textarea, button');
    
    // Check if these elements have custom color classes or styles
    let hasCustomColors = false;
    
    // Check if any elements use our custom color classes
    const customColorClasses = [
      'bg-primary', 'bg-secondary', 'bg-accent',
      'bg-background', 'bg-surface', 'border-border',
      'text-text', 'text-text-muted'
    ];
    
    for (const className of customColorClasses) {
      if (document.querySelector(`.${className}`)) {
        hasCustomColors = true;
        break;
      }
    }
    
    const passed = navbarElements.length > 0 && 
                  modalElements.length > 0 && 
                  formElements.length > 0 && 
                  hasCustomColors;
    
    return {
      testName: 'Existing Components Integration',
      passed,
      message: passed 
        ? 'Existing components are properly integrated with custom colors'
        : 'Existing components integration needs attention',
      details: {
        navbarElements: navbarElements.length,
        modalElements: modalElements.length,
        formElements: formElements.length,
        hasCustomColors
      }
    };
  } catch (error) {
    return {
      testName: 'Existing Components Integration',
      passed: false,
      message: `Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: { error }
    };
  }
}

/**
 * Run all integration tests
 */
export function runAllIntegrationTests(): IntegrationTestResult[] {
  const tests = [
    testTailwindUtilityGeneration,
    testPrelineUIIntegration,
    testHSThemeAppearanceIntegration,
    testExistingComponentsIntegration
  ];
  
  return tests.map(test => test());
}

/**
 * Generate integration test report
 */
export function generateIntegrationTestReport(results: IntegrationTestResult[]): string {
  const passedTests = results.filter(r => r.passed);
  const failedTests = results.filter(r => !r.passed);
  
  let report = `# Visual Customization System Integration Test Report\n\n`;
  report += `**Total Tests:** ${results.length}\n`;
  report += `**Passed:** ${passedTests.length}\n`;
  report += `**Failed:** ${failedTests.length}\n\n`;
  
  if (passedTests.length > 0) {
    report += `## ✅ Passed Tests\n\n`;
    passedTests.forEach(test => {
      report += `- **${test.testName}**: ${test.message}\n`;
    });
    report += `\n`;
  }
  
  if (failedTests.length > 0) {
    report += `## ❌ Failed Tests\n\n`;
    failedTests.forEach(test => {
      report += `- **${test.testName}**: ${test.message}\n`;
      if (test.details) {
        report += `  - Details: ${JSON.stringify(test.details, null, 2)}\n`;
      }
    });
    report += `\n`;
  }
  
  report += `## Requirements Coverage\n\n`;
  report += `- **Requirement 2.1** (Custom colors work with existing Preline UI components): ${passedTests.some(t => t.testName === 'Preline UI Integration') ? '✅ PASSED' : '❌ FAILED'}\n`;
  report += `- **Requirement 2.2** (Tailwind utilities are generated correctly): ${passedTests.some(t => t.testName === 'Tailwind Utility Generation') ? '✅ PASSED' : '❌ FAILED'}\n`;
  report += `- **Requirement 5.2** (Theme switching works with HSThemeAppearance): ${passedTests.some(t => t.testName === 'HSThemeAppearance Integration') ? '✅ PASSED' : '❌ FAILED'}\n`;
  
  return report;
}