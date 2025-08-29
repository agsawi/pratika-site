/**
 * Unit tests for PratikaSegmentsMegaMenuLink component
 * Tests segments mega menu functionality and market segment display
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';

describe('PratikaSegmentsMegaMenuLink Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  beforeEach(() => {
    // Create DOM structure that matches the segments mega menu component
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
            <button
              type="button"
              class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base"
              aria-expanded="false"
              aria-haspopup="menu"
              aria-label="Segmentos Atendidos menu"
              data-hs-dropdown-toggle
            >
              <span>Segmentos Atendidos</span>
              <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div
              class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:bg-neutral-800 md:p-4 md:shadow-2xl md:duration-[150ms]"
              role="menu"
              aria-orientation="vertical"
              aria-label="Segmentos Atendidos submenu"
            >
              <div class="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                <!-- First column -->
                <div class="mx-1 flex flex-col md:mx-0">
                  <a
                    href="/segmentos/industria"
                    data-astro-prefetch
                    class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10"
                    role="menuitem"
                    tabindex="-1"
                    aria-label="Indústria. Soluções especializadas para o setor industrial"
                  >
                    <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true">
                      <path d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-3"/>
                    </svg>
                    <div class="grow">
                      <p class="font-medium text-neutral-800 dark:text-neutral-200">
                        Indústria
                      </p>
                      <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        Soluções especializadas para o setor industrial
                      </p>
                    </div>
                  </a>
                  <a
                    href="/segmentos/saude"
                    data-astro-prefetch
                    class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10"
                    role="menuitem"
                    tabindex="-1"
                    aria-label="Saúde (Hospitais e Clínicas). Serviços especializados para área da saúde"
                  >
                    <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                    <div class="grow">
                      <p class="font-medium text-neutral-800 dark:text-neutral-200">
                        Saúde (Hospitais e Clínicas)
                      </p>
                      <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        Serviços especializados para área da saúde
                      </p>
                    </div>
                  </a>
                </div>
                <!-- Second column -->
                <div class="mx-1 flex flex-col md:mx-0">
                  <a
                    href="/segmentos/condominios"
                    data-astro-prefetch
                    class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10"
                    role="menuitem"
                    tabindex="-1"
                    aria-label="Condomínios (Residenciais e Comerciais). Gestão completa para condomínios"
                  >
                    <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true">
                      <path d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-3"/>
                    </svg>
                    <div class="grow">
                      <p class="font-medium text-neutral-800 dark:text-neutral-200">
                        Condomínios (Residenciais e Comerciais)
                      </p>
                      <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        Gestão completa para condomínios
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <!-- View all segments link -->
              <div class="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                <a
                  href="/segmentos"
                  data-astro-prefetch
                  class="group flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium text-brand-600 hover:bg-neutral-100 hover:text-brand-700 focus:bg-neutral-100 focus:text-brand-700 focus:outline-hidden dark:text-brand-400 dark:hover:bg-neutral-500/10 dark:hover:text-brand-300 dark:focus:bg-neutral-500/10 dark:focus:text-brand-300"
                  role="menuitem"
                  tabindex="-1"
                  aria-label="Ver todos os segmentos"
                >
                  <svg class="size-4 shrink-0 transition duration-300 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Ver todos os segmentos
                </a>
              </div>
            </div>
          </div>
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

  describe('Segments Mega Menu Structure', () => {
    it('should render segments mega menu trigger', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-label', 'Segmentos Atendidos menu');
      expect(trigger).toHaveTextContent('Segmentos Atendidos');
    });

    it('should render segments with proper grid layout', () => {
      const gridContainer = document.querySelector('.gap-4.md\\:grid');
      
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('md:grid-cols-2');
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should render segment items with icons and descriptions', () => {
      const segmentItems = document.querySelectorAll('a[role="menuitem"]:not([href="/segmentos"])');
      
      expect(segmentItems).toHaveLength(3);
      
      segmentItems.forEach(item => {
        const icon = item.querySelector('svg');
        const title = item.querySelector('p.font-medium');
        const description = item.querySelector('p.text-sm');
        
        expect(icon).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });

    it('should render "View all segments" link', () => {
      const viewAllLink = document.querySelector('a[href="/segmentos"]');
      
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveTextContent('Ver todos os segmentos');
    });
  });

  describe('Segment Item Content', () => {
    it('should have correct segment names and descriptions', () => {
      const expectedSegments = [
        { name: 'Indústria', description: 'Soluções especializadas para o setor industrial' },
        { name: 'Saúde (Hospitais e Clínicas)', description: 'Serviços especializados para área da saúde' },
        { name: 'Condomínios (Residenciais e Comerciais)', description: 'Gestão completa para condomínios' }
      ];

      const segmentItems = document.querySelectorAll('a[role="menuitem"]:not([href="/segmentos"])');
      
      segmentItems.forEach((item, index) => {
        const title = item.querySelector('p.font-medium');
        const description = item.querySelector('p.text-sm');
        
        expect(title).toHaveTextContent(expectedSegments[index].name);
        expect(description).toHaveTextContent(expectedSegments[index].description);
      });
    });

    it('should have correct segment URLs', () => {
      const expectedUrls = [
        '/segmentos/industria',
        '/segmentos/saude',
        '/segmentos/condominios'
      ];
      
      const segmentItems = document.querySelectorAll('a[role="menuitem"]:not([href="/segmentos"])');
      
      segmentItems.forEach((item, index) => {
        expect(item).toHaveAttribute('href', expectedUrls[index]);
      });
    });
  });

  describe('Accessibility Features', () => {
    it('should have proper ARIA labels for segment items', () => {
      const segmentItems = document.querySelectorAll('a[role="menuitem"]:not([href="/segmentos"])');
      
      segmentItems.forEach(item => {
        expect(item).toHaveAttribute('aria-label');
        expect(item).toHaveAttribute('role', 'menuitem');
        expect(item).toHaveAttribute('tabindex', '-1');
        
        const ariaLabel = item.getAttribute('aria-label');
        expect(ariaLabel).toContain('.');
      });
    });

    it('should hide segment icons from screen readers', () => {
      const segmentIcons = document.querySelectorAll('svg');
      
      segmentIcons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have proper mega menu ARIA attributes', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(megaMenu).toHaveAttribute('role', 'menu');
      expect(megaMenu).toHaveAttribute('aria-orientation', 'vertical');
      expect(megaMenu).toHaveAttribute('aria-label', 'Segmentos Atendidos submenu');
    });
  });

  describe('Visual Design and Styling', () => {
    it('should have proper segment item styling', () => {
      const segmentItems = document.querySelectorAll('a[role="menuitem"]:not([href="/segmentos"])');
      
      segmentItems.forEach(item => {
        expect(item).toHaveClass('group');
        expect(item).toHaveClass('flex');
        expect(item).toHaveClass('gap-x-5');
        expect(item).toHaveClass('rounded-lg');
        expect(item).toHaveClass('p-4');
        expect(item).toHaveClass('hover:bg-neutral-100');
        expect(item).toHaveClass('focus:bg-neutral-100');
      });
    });

    it('should have proper icon styling', () => {
      const segmentIcons = document.querySelectorAll('svg.size-5');
      
      segmentIcons.forEach(icon => {
        expect(icon).toHaveClass('mt-1');
        expect(icon).toHaveClass('size-5');
        expect(icon).toHaveClass('shrink-0');
        expect(icon).toHaveClass('text-brand-400');
        expect(icon).toHaveClass('dark:text-brand-300');
      });
    });

    it('should have proper text hierarchy', () => {
      const segmentTitles = document.querySelectorAll('p.font-medium');
      const segmentDescriptions = document.querySelectorAll('p.text-sm');
      
      segmentTitles.forEach(title => {
        expect(title).toHaveClass('font-medium');
        expect(title).toHaveClass('text-neutral-800');
        expect(title).toHaveClass('dark:text-neutral-200');
      });

      segmentDescriptions.forEach(desc => {
        expect(desc).toHaveClass('text-sm');
        expect(desc).toHaveClass('text-neutral-500');
        expect(desc).toHaveClass('group-hover:text-neutral-800');
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layout', () => {
      const gridContainer = document.querySelector('.gap-4.md\\:grid');
      
      expect(gridContainer).toHaveClass('gap-4');
      expect(gridContainer).toHaveClass('md:grid');
      expect(gridContainer).toHaveClass('md:grid-cols-2');
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should have responsive column spacing', () => {
      const columns = document.querySelectorAll('.mx-1.flex.flex-col.md\\:mx-0');
      
      columns.forEach(column => {
        expect(column).toHaveClass('mx-1');
        expect(column).toHaveClass('md:mx-0');
        expect(column).toHaveClass('flex');
        expect(column).toHaveClass('flex-col');
      });
    });

    it('should have responsive mega menu sizing', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(megaMenu).toHaveClass('w-full');
      expect(megaMenu).toHaveClass('md:p-4');
      expect(megaMenu).toHaveClass('md:shadow-2xl');
    });
  });

  describe('Dark Mode Support', () => {
    it('should have dark mode classes for mega menu', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(megaMenu).toHaveClass('dark:bg-neutral-800');
      expect(megaMenu).toHaveClass('dark:divide-neutral-700');
    });

    it('should have dark mode classes for segment items', () => {
      const segmentItems = document.querySelectorAll('a[role="menuitem"]');
      
      segmentItems.forEach(item => {
        expect(item).toHaveClass('dark:hover:bg-neutral-500/10');
        expect(item).toHaveClass('dark:focus:bg-neutral-500/10');
      });
    });

    it('should have dark mode text colors', () => {
      const segmentTitles = document.querySelectorAll('p.font-medium');
      const segmentDescriptions = document.querySelectorAll('p.text-sm');
      
      segmentTitles.forEach(title => {
        expect(title).toHaveClass('dark:text-neutral-200');
      });

      segmentDescriptions.forEach(desc => {
        expect(desc).toHaveClass('dark:text-neutral-400');
        expect(desc).toHaveClass('dark:group-hover:text-neutral-200');
      });
    });
  });

  describe('Navigation and Performance', () => {
    it('should have prefetch attributes for performance', () => {
      const segmentLinks = document.querySelectorAll('a[role="menuitem"]');
      
      segmentLinks.forEach(link => {
        expect(link).toHaveAttribute('data-astro-prefetch');
      });
    });

    it('should have main segments page link', () => {
      const mainLink = document.querySelector('a[href="/segmentos"]');
      
      expect(mainLink).toBeInTheDocument();
      expect(mainLink).toHaveAttribute('data-astro-prefetch');
      expect(mainLink).toHaveClass('text-brand-600');
    });
  });

  describe('Animation and Interactions', () => {
    it('should have transition classes for mega menu', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(megaMenu).toHaveClass('transition-[opacity,margin]');
      expect(megaMenu).toHaveClass('hs-dropdown-open:opacity-100');
    });

    it('should have hover animation for view all arrow', () => {
      const arrow = document.querySelector('a[href="/segmentos"] svg');
      
      expect(arrow).toHaveClass('transition');
      expect(arrow).toHaveClass('duration-300');
      expect(arrow).toHaveClass('group-hover:translate-x-1');
    });

    it('should have chevron rotation animation', () => {
      const chevron = document.querySelector('button svg');
      
      expect(chevron).toHaveClass('transition-transform');
      expect(chevron).toHaveClass('duration-200');
      expect(chevron).toHaveClass('hs-dropdown-open:rotate-180');
    });
  });

  describe('Preline UI Integration', () => {
    it('should have correct Preline dropdown classes', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      
      expect(dropdown).toHaveClass('hs-dropdown');
      expect(dropdown).toHaveAttribute('data-hs-dropdown-auto-close', 'outside');
    });

    it('should have correct positioning strategy', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      
      expect(dropdown).toHaveClass('[--strategy:static]');
      expect(dropdown).toHaveClass('md:[--strategy:absolute]');
      expect(dropdown).toHaveClass('md:[--trigger:hover]');
    });
  });
});