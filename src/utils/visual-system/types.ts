// Re-export types from the configuration for easier imports
export type {
  BrandColors,
  UIColors,
  FontFamilies,
  TypographyScale,
  SpacingScale,
  BorderRadiusScale,
  ShadowScale,
  VisualConfig
} from '../../config/visual-config';

// Additional utility types for the visual system
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ThemeVariant {
  colors: {
    brand: BrandColors;
    ui: UIColors;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

// CSS custom property names for easier reference
export const CSS_VARIABLES = {
  // Brand colors
  PRIMARY: '--color-primary',
  SECONDARY: '--color-secondary',
  ACCENT: '--color-accent',
  
  // UI colors
  BACKGROUND: '--color-background',
  SURFACE: '--color-surface',
  TEXT: '--color-text',
  TEXT_MUTED: '--color-text-muted',
  BORDER: '--color-border',
  SUCCESS: '--color-success',
  WARNING: '--color-warning',
  ERROR: '--color-error',
  INFO: '--color-info',
  
  // Typography
  FONT_SANS: '--font-family-sans',
  FONT_SERIF: '--font-family-serif',
  FONT_MONO: '--font-family-mono',
  
  // Spacing
  SPACING_PREFIX: '--spacing-',
  
  // Border radius
  RADIUS_PREFIX: '--radius-',
  
  // Shadows
  SHADOW_PREFIX: '--shadow-'
} as const;

import type { BrandColors, UIColors } from '../../config/visual-config';