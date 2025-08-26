/**
 * Theme Management Utilities
 * Integrates with existing HSThemeAppearance system from Preline UI
 */

export interface ThemeManager {
  initializeCustomThemes(): void;
  updateCustomColors(theme: 'light' | 'dark' | 'auto'): void;
  onThemeChange(callback: (theme: string) => void): void;
  getCurrentTheme(): string;
  validateThemeCompatibility(): boolean;
}

/**
 * Visual Theme Manager that extends HSThemeAppearance functionality
 */
export class VisualThemeManager implements ThemeManager {
  private callbacks: ((theme: string) => void)[] = [];
  private initialized = false;

  /**
   * Initialize custom theme system and integrate with existing HSThemeAppearance
   */
  initializeCustomThemes(): void {
    if (this.initialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupThemeIntegration());
    } else {
      this.setupThemeIntegration();
    }

    this.initialized = true;
  }

  /**
   * Set up integration with existing Preline HSThemeAppearance system
   */
  private setupThemeIntegration(): void {
    // Listen for theme changes from HSThemeAppearance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          if (target === document.documentElement) {
            const currentTheme = this.getCurrentTheme();
            this.notifyCallbacks(currentTheme);
          }
        }
      });
    });

    // Observe changes to the html element's class attribute
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Listen for HSThemeAppearance events if available
    document.addEventListener('hs-appearance-updated', (event: any) => {
      const theme = event.detail?.theme || this.getCurrentTheme();
      this.notifyCallbacks(theme);
    });

    // Initial theme detection
    const initialTheme = this.getCurrentTheme();
    this.notifyCallbacks(initialTheme);
  }

  /**
   * Update custom colors based on theme
   * This method can be used to apply additional customizations beyond CSS variables
   */
  updateCustomColors(theme: 'light' | 'dark' | 'auto'): void {
    const resolvedTheme = theme === 'auto' ? this.getSystemTheme() : theme;
    
    // Apply theme-specific customizations if needed
    document.documentElement.setAttribute('data-custom-theme', resolvedTheme);
    
    // Notify callbacks
    this.notifyCallbacks(resolvedTheme);
  }

  /**
   * Register callback for theme changes
   */
  onThemeChange(callback: (theme: string) => void): void {
    this.callbacks.push(callback);
  }

  /**
   * Get current theme from DOM
   */
  getCurrentTheme(): string {
    const htmlElement = document.documentElement;
    
    // Check for dark class (used by HSThemeAppearance)
    if (htmlElement.classList.contains('dark')) {
      return 'dark';
    }
    
    // Check for hs-dark-mode-active class
    if (htmlElement.classList.contains('hs-dark-mode-active')) {
      return 'dark';
    }
    
    // Check data attributes
    const themeAttr = htmlElement.getAttribute('data-hs-theme-click-value');
    if (themeAttr === 'dark') {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  }

  /**
   * Get system theme preference
   */
  private getSystemTheme(): string {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Notify all registered callbacks
   */
  private notifyCallbacks(theme: string): void {
    this.callbacks.forEach(callback => {
      try {
        callback(theme);
      } catch (error) {
        console.error('Error in theme change callback:', error);
      }
    });
  }

  /**
   * Validate that the theme system is compatible with existing Preline setup
   */
  validateThemeCompatibility(): boolean {
    // Check if HSThemeAppearance is available
    const hasHSTheme = typeof (window as any).HSThemeAppearance !== 'undefined';
    
    // Check if required DOM elements exist
    const hasThemeToggle = document.querySelector('[data-hs-theme-click-value]') !== null;
    
    // Check if CSS variables are properly defined
    const computedStyle = getComputedStyle(document.documentElement);
    const hasPrimaryColor = computedStyle.getPropertyValue('--color-primary').trim() !== '';
    
    const isCompatible = hasHSTheme || hasThemeToggle || hasPrimaryColor;
    
    if (!isCompatible) {
      console.warn('Theme compatibility check failed. Ensure HSThemeAppearance is properly initialized.');
    }
    
    return isCompatible;
  }
}

/**
 * Global theme manager instance
 */
export const themeManager = new VisualThemeManager();

/**
 * Initialize theme system (call this in your main layout)
 */
export function initializeThemeSystem(): void {
  themeManager.initializeCustomThemes();
}

/**
 * Utility function to sync with Preline theme system
 */
export function syncWithPrelineTheme(): void {
  // This function ensures our custom theme system stays in sync with Preline's HSThemeAppearance
  const currentTheme = themeManager.getCurrentTheme();
  themeManager.updateCustomColors(currentTheme as 'light' | 'dark');
}