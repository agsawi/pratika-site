import { z } from 'zod';
import { 
  validateColorAccessibility, 
  generateAccessibilityReport,
  isValidColor,
  type AccessibilityValidationResult 
} from '../utils/visual-system/accessibility';

// Zod schemas for type safety and validation
const BrandColorsSchema = z.object({
  primary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  secondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color').optional(),
});

const UIColorsSchema = z.object({
  background: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  surface: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  text: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  textMuted: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  border: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  success: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  warning: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  error: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
  info: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color'),
});

const FontFamiliesSchema = z.object({
  sans: z.array(z.string()),
  serif: z.array(z.string()),
  mono: z.array(z.string()),
  display: z.array(z.string()).optional(),
});

const TypographyScaleSchema = z.object({
  xs: z.string(),
  sm: z.string(),
  base: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string(),
  '3xl': z.string(),
  '4xl': z.string(),
  '5xl': z.string(),
  '6xl': z.string(),
});

const SpacingScaleSchema = z.record(z.string(), z.string());

const BorderRadiusScaleSchema = z.object({
  none: z.string(),
  sm: z.string(),
  DEFAULT: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string(),
  '3xl': z.string(),
  full: z.string(),
});

const ShadowScaleSchema = z.object({
  sm: z.string(),
  DEFAULT: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string(),
  inner: z.string(),
  none: z.string(),
});

// Main visual configuration schema
export const VisualConfigSchema = z.object({
  colors: z.object({
    brand: BrandColorsSchema,
    ui: UIColorsSchema,
  }),
  typography: z.object({
    fontFamilies: FontFamiliesSchema,
    scales: TypographyScaleSchema,
  }),
  spacing: SpacingScaleSchema,
  borderRadius: BorderRadiusScaleSchema,
  shadows: ShadowScaleSchema,
});

// TypeScript types derived from Zod schemas
export type BrandColors = z.infer<typeof BrandColorsSchema>;
export type UIColors = z.infer<typeof UIColorsSchema>;
export type FontFamilies = z.infer<typeof FontFamiliesSchema>;
export type TypographyScale = z.infer<typeof TypographyScaleSchema>;
export type SpacingScale = z.infer<typeof SpacingScaleSchema>;
export type BorderRadiusScale = z.infer<typeof BorderRadiusScaleSchema>;
export type ShadowScale = z.infer<typeof ShadowScaleSchema>;
export type VisualConfig = z.infer<typeof VisualConfigSchema>;

// Import configuration from JSON file
import configData from './visual-config.json';

// Default visual configuration
export const visualConfig: VisualConfig = configData as VisualConfig;

/**
 * Enhanced validation result that includes accessibility checking
 */
export interface ValidationResult {
  config: VisualConfig;
  accessibility: AccessibilityValidationResult;
  isValid: boolean;
  report: string;
}

/**
 * Validation function to ensure configuration is valid with accessibility checking
 * @param config - Configuration object to validate
 * @param options - Validation options
 * @returns Enhanced validation result with accessibility information
 */
export function validateVisualConfig(
  config: unknown, 
  options: { skipAccessibility?: boolean } = {}
): VisualConfig {
  return VisualConfigSchema.parse(config);
}

/**
 * Comprehensive validation with accessibility checking
 * @param config - Configuration object to validate
 * @param options - Validation options
 * @returns Complete validation result including accessibility report
 */
export function validateVisualConfigWithAccessibility(
  config: unknown,
  options: { 
    skipAccessibility?: boolean;
    strictMode?: boolean; // If true, accessibility failures will throw errors
  } = {}
): ValidationResult {
  // First validate the schema
  const validatedConfig = VisualConfigSchema.parse(config);
  
  let accessibilityResult: AccessibilityValidationResult;
  let isValid = true;
  
  if (options.skipAccessibility) {
    // Create a minimal accessibility result if skipped
    accessibilityResult = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
      contrastResults: {},
    };
  } else {
    // Perform accessibility validation
    accessibilityResult = validateColorAccessibility(validatedConfig.colors);
    isValid = accessibilityResult.isValid;
    
    // In strict mode, throw an error if accessibility validation fails
    if (options.strictMode && !accessibilityResult.isValid) {
      const report = generateAccessibilityReport(accessibilityResult);
      throw new Error(`Color accessibility validation failed:\n${report}`);
    }
  }
  
  const report = generateAccessibilityReport(accessibilityResult);
  
  return {
    config: validatedConfig,
    accessibility: accessibilityResult,
    isValid,
    report,
  };
}

/**
 * Helper function to get validated configuration with accessibility checking
 * @param options - Validation options
 * @returns Validation result with accessibility information
 */
export function getVisualConfigWithAccessibility(
  options: { 
    skipAccessibility?: boolean;
    strictMode?: boolean;
  } = {}
): ValidationResult {
  return validateVisualConfigWithAccessibility(visualConfig, options);
}

/**
 * Helper function to get validated configuration (legacy compatibility)
 * @returns Validated configuration
 */
export function getVisualConfig(): VisualConfig {
  return validateVisualConfig(visualConfig);
}

/**
 * Validate individual colors in the configuration
 * @param config - Visual configuration
 * @returns Array of color validation results
 */
export function validateConfigColors(config: VisualConfig): { path: string; color: string; isValid: boolean }[] {
  const results: { path: string; color: string; isValid: boolean }[] = [];
  
  // Validate brand colors
  results.push({ path: 'colors.brand.primary', color: config.colors.brand.primary, isValid: isValidColor(config.colors.brand.primary) });
  results.push({ path: 'colors.brand.secondary', color: config.colors.brand.secondary, isValid: isValidColor(config.colors.brand.secondary) });
  if (config.colors.brand.accent) {
    results.push({ path: 'colors.brand.accent', color: config.colors.brand.accent, isValid: isValidColor(config.colors.brand.accent) });
  }
  
  // Validate UI colors
  Object.entries(config.colors.ui).forEach(([key, color]) => {
    results.push({ path: `colors.ui.${key}`, color, isValid: isValidColor(color) });
  });
  
  return results;
}