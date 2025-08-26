import { visualConfig, validateVisualConfig, type VisualConfig } from '../../config/visual-config';
import type { ValidationResult } from './types';

/**
 * Get the current visual configuration with validation
 */
export function getConfig(): VisualConfig {
  return validateVisualConfig(visualConfig);
}

/**
 * Validate a visual configuration object
 */
export function validateConfig(config: unknown): ValidationResult {
  try {
    validateVisualConfig(config);
    return { isValid: true };
  } catch (error) {
    const errors = error instanceof Error ? [error.message] : ['Invalid configuration'];
    return { isValid: false, errors };
  }
}

/**
 * Get a specific color from the configuration
 */
export function getColor(path: string): string | undefined {
  const config = getConfig();
  const pathParts = path.split('.');
  
  let current: any = config.colors;
  for (const part of pathParts) {
    current = current?.[part];
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * Get brand colors
 */
export function getBrandColors() {
  return getConfig().colors.brand;
}

/**
 * Get UI colors
 */
export function getUIColors() {
  return getConfig().colors.ui;
}

/**
 * Get typography configuration
 */
export function getTypography() {
  return getConfig().typography;
}

/**
 * Get spacing configuration
 */
export function getSpacing() {
  return getConfig().spacing;
}

/**
 * Get border radius configuration
 */
export function getBorderRadius() {
  return getConfig().borderRadius;
}

/**
 * Get shadow configuration
 */
export function getShadows() {
  return getConfig().shadows;
}

/**
 * Convert hex color to RGB values (for use in CSS custom properties)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert hex color to CSS rgb() function
 */
export function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  return rgb ? `rgb(${rgb.r} ${rgb.g} ${rgb.b})` : hex;
}

/**
 * Check if a color is light or dark (for automatic contrast)
 */
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  
  // Calculate relative luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}

/**
 * Generate a contrasting text color for a given background color
 */
export function getContrastingTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#ffffff';
}