/**
 * Visual Customization System - Main Export File
 * 
 * This file provides a clean, unified API for the visual customization system.
 * It exports all the core functionality needed to work with themes, colors,
 * and visual configurations.
 */

// Core theme management
export { 
  VisualThemeManager, 
  themeManager, 
  initializeThemeSystem 
} from './theme-manager';

// CSS generation utilities
export { 
  generateCSSVariables, 
  generateDarkThemeCSS, 
  updateGlobalCSS 
} from './generator';

// Configuration management
export { 
  getConfig, 
  validateConfig, 
  setConfig 
} from './config-helpers';

// Accessibility validation
export { 
  validateColorAccessibility, 
  suggestAccessibleColor,
  validateContrast,
  generateAccessibilityReport
} from './accessibility';

// Type definitions
export type { 
  VisualConfig, 
  BrandColors, 
  UIColors, 
  ThemeVariant,
  TypographyScale,
  FontFamilies,
  SpacingScale,
  BorderRadiusScale,
  ShadowScale
} from './types';

/**
 * Convenience function for full system initialization
 * 
 * This function initializes the entire visual system with default settings.
 * It's useful for getting started quickly or for testing purposes.
 * 
 * @returns Promise that resolves when the system is fully initialized
 */
export async function initializeVisualSystem(): Promise<void> {
  try {
    // Initialize the theme system
    await initializeThemeSystem();
    
    // Validate the current configuration
    const config = getConfig();
    const validationResult = validateConfig(config);
    
    if (!validationResult.isValid) {
      console.warn('Visual system initialized with configuration warnings:', validationResult.errors);
    }
    
    console.log('Visual customization system initialized successfully');
  } catch (error) {
    console.error('Failed to initialize visual system:', error);
    throw error;
  }
}

/**
 * Quick setup function for common use cases
 * 
 * This function provides a simplified way to apply a complete visual configuration
 * and regenerate all necessary CSS.
 * 
 * @param config - The visual configuration to apply
 * @param options - Additional options for setup
 */
export async function quickSetup(
  config: Partial<VisualConfig>, 
  options: {
    validateAccessibility?: boolean;
    generateCSS?: boolean;
    initializeTheme?: boolean;
  } = {}
): Promise<void> {
  const {
    validateAccessibility = true,
    generateCSS = true,
    initializeTheme = true
  } = options;

  try {
    // Set the new configuration
    setConfig(config);
    
    // Validate accessibility if requested
    if (validateAccessibility) {
      const accessibilityResult = validateColorAccessibility(config.colors || {});
      if (accessibilityResult.hasErrors) {
        console.warn('Accessibility issues detected:', generateAccessibilityReport(accessibilityResult));
      }
    }
    
    // Generate CSS if requested
    if (generateCSS) {
      await updateGlobalCSS();
    }
    
    // Initialize theme system if requested
    if (initializeTheme) {
      await initializeThemeSystem();
    }
    
    console.log('Visual system setup completed successfully');
  } catch (error) {
    console.error('Failed to complete visual system setup:', error);
    throw error;
  }
}