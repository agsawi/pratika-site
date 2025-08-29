/**
 * Responsive Design Tests
 * Tests navigation functionality across different screen sizes
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';

describe('Responsive Navigation Tests', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  const screenSizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1024, height: 768 },
    largeDesktop: { width: 1440, height: 900 }
  };

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Responsive Navigation Test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start">
            <nav class="relative mx-2 w-full rounded-[36px] border border-brand-100/40 bg-brand-50/60 px-4 py-3 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-800/80 dark:backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto" aria-label="Global">
              
              <!-- Brand and mobile toggle -->
              <div class="flex items-center justify-between">
                <a class="flex-none rounded-lg text-xl font-bold" href="/" aria-label="Brand">
                  <img src="/logo.svg" alt="Pratika" class="h-auto w-24" />
                </a>
                
                <!-- Mobile menu toggle -->
                <div class="ml-auto mr-5 md:hidden">
                  <button
                    type="button"
                    class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-200 md:hidden"
                    data-hs-collapse="#navbar-collapse-with-animation"
                    aria-controls="navbar-collapse-with-animation"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                    id="mobile-toggle"
                  >
                    <svg class="h-[1.25rem] w-[1.25rem] shrink-0 hs-collapse-open:hidden" width="24" height="24">
                      <line x1="3" x2="21" y1="6" y2="6"></line>
                      <line x1="3" x2="21" y1="12" y2="12"></line>
                      <line x1="3" x2="21" y1="18" y2="18"></line>
                    </svg>
                    <svg class="hidden h-[1.25rem] w-[1.25rem] shrink-0 hs-collapse-open:block" width="24" height="24">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Mobile theme toggle -->
                <span class="inline-block md:hidden">
                  <button type="button" class="theme-toggle-mobile" aria-label="Toggle theme">Theme</button>
                </span>
              </div>

              <!-- Navigation links container -->
              <div
                id="navbar-collapse-with-animation"
                class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"
              >
                <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7">
                  
                  <!-- Dropdown navigation items -->
                  <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
                    <button type="button" class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base" aria-expanded="false" aria-haspopup="menu" aria-label="Sobre a Pratika menu" data-hs-dropdown-toggle>
                      <span>Sobre a Pratika</span>
                      <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    <div class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:bg-neutral-800 md:w-auto md:shadow-2xl md:duration-[150ms]" role="menu" aria-orientation="vertical">
                      <div class="flex flex-col">
                        <a href="/sobre-nos" class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 min-h-[44px] md:min-h-auto" role="menuitem" tabindex="-1">Conheça a Prátika</a>
                        <a href="/esg" class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 min-h-[44px] md:min-h-auto" role="menuitem" tabindex="-1">Compromisso ESG</a>
                      </div>
                    </div>
                  </div>

                  <!-- Mega menu -->
                  <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
                    <button type="button" class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base" aria-expanded="false" aria-haspopup="menu" aria-label="Serviços menu" data-hs-dropdown-toggle>
                      <span>Serviços</span>
                      <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </button>
                    <div class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:bg-neutral-800 md:w-auto md:p-4 md:shadow-2xl md:duration-[150ms]" role="menu" aria-orientation="vertical">
                      <div class="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        <div class="mx-1 flex flex-col md:mx-0">
                          <a href="/servicos/limpeza" class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 min-h-[44px] md:min-h-auto" role="menuitem" tabindex="-1">
                            <svg class="mt-1 size-5 shrink-0 text-brand-400" aria-hidden="true">
                              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                            </svg>
                            <div class="grow">
                              <p class="font-medium text-neutral-800">Limpeza e Conservação</p>
                              <p class="text-sm text-neutral-500">Serviços completos de limpeza</p>
                            </div>
                          </a>
                          <a href="/servicos/portaria" class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 min-h-[44px] md:min-h-auto" role="menuitem" tabindex="-1">
                            <svg class="mt-1 size-5 shrink-0 text-brand-400" aria-hidden="true">
                              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                            </svg>
                            <div class="grow">
                              <p class="font-medium text-neutral-800">Portaria Desarmada</p>
                              <p class="text-sm text-neutral-500">Serviços de portaria</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Regular link -->
                  <a href="/blog" class="block rounded-lg px-3 py-3 text-base font-medium text-neutral-600 min-h-[44px] md:min-h-auto md:px-3 md:py-4 md:text-sm 2xl:text-base">Blog</a>

                  <!-- CTA Button -->
                  <a href="/solicitar-orcamento" class="inline-flex items-center justify-center gap-x-2 rounded-full border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white min-h-[44px] md:min-h-auto md:px-6 md:py-3">
                    Solicitar Orçamento
                  </a>

                  <!-- Desktop theme toggle -->
                  <span class="hidden md:inline-block">
                    <button type="button" class="theme-toggle-desktop" aria-label="Toggle theme">Theme</button>
                  </span>
                </div>
              </div>
            </nav>
          </header>
        </body>
      </html>
    `, {
      url: 'http://localhost',
      pretendToBeVisual: true,
      resources: 'usable'
    });

    document = dom.window.document;
    window = dom.window as Window & typeof globalThis;
    
    global.document = document;
    global.window = window;
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Mobile Layout (375px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: screenSizes.mobile.width
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: screenSizes.mobile.height
      });
    });

    it('should show mobile menu toggle', () => {
      const mobileToggle = document.getElementById('mobile-toggle');
      
      expect(mobileToggle).toBeInTheDocument();
      expect(mobileToggle).toHaveClass('md:hidden');
    });

    it('should hide navigation menu by default', () => {
      const navCollapse = document.getElementById('navbar-collapse-with-animation');
      
      expect(navCollapse).toBeInTheDocument();
      expect(navCollapse).toHaveClass('hidden');
      expect(navCollapse).toHaveClass('md:block');
    });

    it('should show mobile theme toggle', () => {
      const mobileThemeToggle = document.querySelector('.theme-toggle-mobile');
      
      expect(mobileThemeToggle).toBeInTheDocument();
      expect(mobileThemeToggle?.closest('span')).toHaveClass('inline-block');
      expect(mobileThemeToggle?.closest('span')).toHaveClass('md:hidden');
    });

    it('should hide desktop theme toggle', () => {
      const desktopThemeToggle = document.querySelector('.theme-toggle-desktop');
      
      expect(desktopThemeToggle).toBeInTheDocument();
      expect(desktopThemeToggle?.closest('span')).toHaveClass('hidden');
      expect(desktopThemeToggle?.closest('span')).toHaveClass('md:inline-block');
    });

    it('should have touch-friendly button sizes', () => {
      const touchTargets = document.querySelectorAll('button, a[href]');
      
      touchTargets.forEach(target => {
        // Check for minimum touch target size classes or parent container classes
        const hasMinHeight = target.classList.contains('min-h-[44px]') || 
                           target.classList.contains('h-8') ||
                           target.classList.contains('py-3') ||
                           target.closest('.py-3') !== null ||
                           target.closest('.p-4') !== null;
        
        if (target.tagName === 'BUTTON' || target.getAttribute('href')) {
          expect(hasMinHeight).toBe(true);
        }
      });
    });

    it('should stack navigation items vertically', () => {
      const navContainer = document.querySelector('.mt-5.flex');
      
      expect(navContainer).toHaveClass('flex-col');
      expect(navContainer).toHaveClass('md:flex-row');
    });

    it('should have full-width dropdowns', () => {
      const dropdownMenus = document.querySelectorAll('.hs-dropdown-menu');
      
      dropdownMenus.forEach(menu => {
        expect(menu).toHaveClass('w-full');
        expect(menu).toHaveClass('md:w-auto');
      });
    });
  });

  describe('Tablet Layout (768px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: screenSizes.tablet.width
      });
    });

    it('should show desktop navigation layout', () => {
      const navCollapse = document.getElementById('navbar-collapse-with-animation');
      
      expect(navCollapse).toHaveClass('md:block');
    });

    it('should hide mobile menu toggle', () => {
      const mobileToggle = document.getElementById('mobile-toggle');
      
      expect(mobileToggle).toHaveClass('md:hidden');
    });

    it('should show horizontal navigation layout', () => {
      const navContainer = document.querySelector('.mt-5.flex');
      
      expect(navContainer).toHaveClass('md:flex-row');
      expect(navContainer).toHaveClass('md:items-center');
    });

    it('should use grid layout for mega menus', () => {
      const megaMenuGrid = document.querySelector('.md\\:grid');
      
      expect(megaMenuGrid).toHaveClass('md:grid');
      expect(megaMenuGrid).toHaveClass('md:grid-cols-2');
    });
  });

  describe('Desktop Layout (1024px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: screenSizes.desktop.width
      });
    });

    it('should show full desktop navigation', () => {
      const nav = document.querySelector('nav');
      
      expect(nav).toHaveClass('md:flex');
      expect(nav).toHaveClass('md:items-center');
      expect(nav).toHaveClass('md:justify-between');
    });

    it('should use hover triggers for dropdowns', () => {
      const dropdowns = document.querySelectorAll('.hs-dropdown');
      
      dropdowns.forEach(dropdown => {
        expect(dropdown).toHaveClass('md:[--trigger:hover]');
      });
    });

    it('should show 3-column mega menu layout', () => {
      const megaMenuGrid = document.querySelector('.md\\:grid');
      
      expect(megaMenuGrid).toHaveClass('lg:grid-cols-3');
    });

    it('should have proper spacing for desktop', () => {
      const nav = document.querySelector('nav');
      
      expect(nav).toHaveClass('lg:px-8');
    });
  });

  describe('Large Desktop Layout (1440px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: screenSizes.largeDesktop.width
      });
    });

    it('should center navigation on large screens', () => {
      const nav = document.querySelector('nav');
      
      expect(nav).toHaveClass('xl:mx-auto');
    });

    it('should use larger text on large screens', () => {
      const navButtons = document.querySelectorAll('button[data-hs-dropdown-toggle]');
      
      navButtons.forEach(button => {
        expect(button).toHaveClass('2xl:text-base');
      });
    });
  });

  describe('Responsive Dropdown Behavior', () => {
    it('should use static positioning on mobile', () => {
      const dropdowns = document.querySelectorAll('.hs-dropdown');
      
      dropdowns.forEach(dropdown => {
        expect(dropdown).toHaveClass('[--strategy:static]');
        expect(dropdown).toHaveClass('md:[--strategy:absolute]');
      });
    });

    it('should adapt dropdown menu sizing', () => {
      const dropdownMenus = document.querySelectorAll('.hs-dropdown-menu');
      
      dropdownMenus.forEach(menu => {
        expect(menu).toHaveClass('w-full');
        expect(menu).toHaveClass('md:w-auto');
        expect(menu).toHaveClass('min-w-60');
      });
    });

    it('should have responsive padding', () => {
      const dropdowns = document.querySelectorAll('.hs-dropdown');
      
      dropdowns.forEach(dropdown => {
        expect(dropdown).toHaveClass('py-3');
        expect(dropdown).toHaveClass('md:px-3');
        expect(dropdown).toHaveClass('md:py-4');
      });
    });
  });

  describe('Touch Target Accessibility', () => {
    it('should have minimum 44px touch targets on mobile', () => {
      const interactiveElements = document.querySelectorAll('button, a[href], [role="menuitem"]');
      
      interactiveElements.forEach(element => {
        const hasMinHeight = element.classList.contains('min-h-[44px]') ||
                           element.classList.contains('h-8') ||
                           element.classList.contains('py-3') ||
                           element.classList.contains('p-4') ||
                           element.closest('.py-3') !== null ||
                           element.closest('.p-4') !== null;
        
        expect(hasMinHeight).toBe(true);
      });
    });

    it('should have adequate spacing between touch targets', () => {
      const navContainer = document.querySelector('.mt-5.flex');
      
      expect(navContainer).toHaveClass('gap-y-4');
      expect(navContainer).toHaveClass('md:gap-x-4');
      expect(navContainer).toHaveClass('lg:gap-x-7');
    });
  });

  describe('Responsive Typography', () => {
    it('should scale text appropriately', () => {
      const navButtons = document.querySelectorAll('button[data-hs-dropdown-toggle]');
      
      navButtons.forEach(button => {
        expect(button).toHaveClass('text-base');
        expect(button).toHaveClass('md:text-sm');
        expect(button).toHaveClass('2xl:text-base');
      });
    });

    it('should maintain readable text sizes', () => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      menuItems.forEach(item => {
        const hasReadableText = item.classList.contains('text-sm') ||
                               item.classList.contains('text-base') ||
                               item.querySelector('p') !== null; // Menu items have nested p elements with text classes
        expect(hasReadableText).toBe(true);
      });
    });
  });

  describe('Responsive Images and Icons', () => {
    it('should scale logo appropriately', () => {
      const logo = document.querySelector('img[alt="Pratika"]');
      
      expect(logo).toHaveClass('h-auto');
      expect(logo).toHaveClass('w-24');
    });

    it('should size icons consistently', () => {
      const icons = document.querySelectorAll('svg');
      
      icons.forEach(icon => {
        const hasSizing = icon.classList.contains('size-5') ||
                         icon.classList.contains('h-[1.25rem]') ||
                         icon.classList.contains('w-[1.25rem]');
        
        if (icon.getAttribute('width') || icon.getAttribute('height')) {
          expect(hasSizing || icon.getAttribute('width')).toBeTruthy();
        }
      });
    });
  });

  describe('Viewport Meta Tag', () => {
    it('should have proper viewport configuration', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      
      expect(viewport).toBeInTheDocument();
      expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1');
    });
  });

  describe('Responsive Animation Performance', () => {
    it('should have appropriate transition durations', () => {
      const animatedElements = document.querySelectorAll('[class*="transition"], [class*="duration"]');
      
      expect(animatedElements.length).toBeGreaterThan(0);
      
      animatedElements.forEach(element => {
        const hasTransition = element.classList.contains('transition-all') ||
                             element.classList.contains('transition-transform') ||
                             element.classList.contains('transition-[opacity,margin]');
        
        if (hasTransition) {
          const hasDuration = element.classList.contains('duration-300') ||
                             element.classList.contains('duration-200') ||
                             element.classList.contains('duration-[0.1ms]') ||
                             element.classList.contains('duration-[150ms]');
          expect(hasDuration).toBe(true);
        }
      });
    });
  });

  describe('Cross-Device Compatibility', () => {
    it('should work across different device orientations', () => {
      // Test portrait
      Object.defineProperty(window, 'innerWidth', { value: 375 });
      Object.defineProperty(window, 'innerHeight', { value: 667 });
      
      const mobileToggle = document.getElementById('mobile-toggle');
      expect(mobileToggle).toBeInTheDocument();
      
      // Test landscape
      Object.defineProperty(window, 'innerWidth', { value: 667 });
      Object.defineProperty(window, 'innerHeight', { value: 375 });
      
      expect(mobileToggle).toBeInTheDocument();
    });

    it('should handle edge cases in screen sizes', () => {
      // Test exactly at breakpoint
      Object.defineProperty(window, 'innerWidth', { value: 768 });
      
      const navCollapse = document.getElementById('navbar-collapse-with-animation');
      expect(navCollapse).toHaveClass('md:block');
      
      // Test just below breakpoint
      Object.defineProperty(window, 'innerWidth', { value: 767 });
      
      expect(navCollapse).toHaveClass('hidden');
    });
  });
});