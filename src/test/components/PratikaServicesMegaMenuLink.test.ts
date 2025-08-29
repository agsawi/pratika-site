/**
 * Unit tests for PratikaServicesMegaMenuLink component
 * Tests mega menu functionality, grid layout, and service display
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';

describe('PratikaServicesMegaMenuLink Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  beforeEach(() => {
    // Create DOM structure that matches the mega menu component
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
              aria-label="Serviços menu"
              data-hs-dropdown-toggle
            >
              <span>Serviços</span>
              <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div
              class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:bg-neutral-800 md:p-4 md:shadow-2xl md:duration-[150ms]"
              role="menu"
              aria-orientation="vertical"
              aria-label="Serviços submenu"
            >
              <div class="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                <!-- First column -->
                <div class="mx-1 flex flex-col md:mx-0">
                  <a
                    href="/servicos/limpeza-e-conservacao"
                    data-astro-prefetch
                    class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10"
                    role="menuitem"
                    tabindex="-1"
                    aria-label="Limpeza e Conservação Ambiental. Serviços completos de limpeza e manutenção ambiental"
                  >
                    <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                    <div class="grow">
                      <p class="font-medium text-neutral-800 dark:text-neutral-200">
                        Limpeza e Conservação Ambiental
                      </p>
                      <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        Serviços completos de limpeza e manutenção ambiental
                      </p>
                    </div>
                  </a>
                  <a
                    href="/servicos/portaria-desarmada"
                    data-astro-prefetch
                    class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10"
                    role="menuitem"
                    tabindex="-1"
                    aria-label="Portaria Desarmada. Serviços de portaria e recepção"
                  >
                    <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                    <div class="grow">
                      <p class="font-medium text-neutral-800 dark:text-neutral-200">
                        Portaria Desarmada
                      </p>
                      <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        Serviços de portaria e recepção
                      </p>
                    </div>
                  </a>
                </div>
                <!-- Second column -->
                <div class="mx-1 flex flex-col md:mx-0">
                  <a
                    href="/servicos/gestao-de-areas-verdes"
                    data-astro-prefetch
                    class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10"
                    role="menuitem"
                    tabindex="-1"
                    aria-label="Gestão de Áreas Verdes. Manutenção e cuidado de espaços verdes"
                  >
                    <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                    <div class="grow">
                      <p class="font-medium text-neutral-800 dark:text-neutral-200">
                        Gestão de Áreas Verdes
                      </p>
                      <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                        Manutenção e cuidado de espaços verdes
                      </p>
                    </div>
                  </a>
                </div>
              </div>
              <!-- View all services link -->
              <div class="mt-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                <a
                  href="/servicos"
                  data-astro-prefetch
                  class="group flex items-center gap-x-3 rounded-lg p-3 text-sm font-medium text-brand-600 hover:bg-neutral-100 hover:text-brand-700 focus:bg-neutral-100 focus:text-brand-700 focus:outline-hidden dark:text-brand-400 dark:hover:bg-neutral-500/10 dark:hover:text-brand-300 dark:focus:bg-neutral-500/10 dark:focus:text-brand-300"
                  role="menuitem"
                  tabindex="-1"
                  aria-label="Ver todos os serviços"
                >
                  <svg class="size-4 shrink-0 transition duration-300 group-hover:translate-x-1" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Ver todos os serviços
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

  describe('Mega Menu Structure', () => {
    it('should render mega menu trigger with correct attributes', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-label', 'Serviços menu');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveTextContent('Serviços');
    });

    it('should render mega menu container with grid layout', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      const gridContainer = megaMenu?.querySelector('.gap-4.md\\:grid');
      
      expect(megaMenu).toBeInTheDocument();
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('md:grid-cols-2');
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should render service items with icons and descriptions', () => {
      const serviceItems = document.querySelectorAll('a[role="menuitem"]:not([href="/servicos"])');
      
      expect(serviceItems).toHaveLength(3);
      
      serviceItems.forEach(item => {
        const icon = item.querySelector('svg');
        const title = item.querySelector('p.font-medium');
        const description = item.querySelector('p.text-sm');
        
        expect(icon).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(icon).toHaveClass('text-brand-400');
      });
    });

    it('should render "View all services" link', () => {
      const viewAllLink = document.querySelector('a[href="/servicos"]');
      
      expect(viewAllLink).toBeInTheDocument();
      expect(viewAllLink).toHaveTextContent('Ver todos os serviços');
      expect(viewAllLink).toHaveClass('text-brand-600');
    });
  });

  describe('Grid Layout Responsiveness', () => {
    it('should have responsive grid classes', () => {
      const gridContainer = document.querySelector('.gap-4.md\\:grid');
      
      expect(gridContainer).toHaveClass('md:grid');
      expect(gridContainer).toHaveClass('md:grid-cols-2');
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should have responsive column classes', () => {
      const columns = document.querySelectorAll('.mx-1.flex.flex-col.md\\:mx-0');
      
      expect(columns).toHaveLength(2);
      columns.forEach(column => {
        expect(column).toHaveClass('mx-1');
        expect(column).toHaveClass('md:mx-0');
        expect(column).toHaveClass('flex');
        expect(column).toHaveClass('flex-col');
      });
    });
  });

  describe('Service Item Accessibility', () => {
    it('should have proper ARIA labels for service items', () => {
      const serviceItems = document.querySelectorAll('a[role="menuitem"]:not([href="/servicos"])');
      
      serviceItems.forEach(item => {
        expect(item).toHaveAttribute('aria-label');
        expect(item).toHaveAttribute('role', 'menuitem');
        expect(item).toHaveAttribute('tabindex', '-1');
        
        const ariaLabel = item.getAttribute('aria-label');
        expect(ariaLabel).toContain('.');
      });
    });

    it('should hide service icons from screen readers', () => {
      const serviceIcons = document.querySelectorAll('svg');
      
      serviceIcons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have proper focus and hover states', () => {
      const serviceItems = document.querySelectorAll('a[role="menuitem"]');
      
      serviceItems.forEach(item => {
        expect(item).toHaveClass('hover:bg-neutral-100');
        expect(item).toHaveClass('focus:bg-neutral-100');
        expect(item).toHaveClass('focus:outline-hidden');
      });
    });
  });

  describe('Service URLs and Navigation', () => {
    it('should have correct service URLs', () => {
      const expectedUrls = [
        '/servicos/limpeza-e-conservacao',
        '/servicos/portaria-desarmada',
        '/servicos/gestao-de-areas-verdes'
      ];
      
      const serviceItems = document.querySelectorAll('a[role="menuitem"]:not([href="/servicos"])');
      
      serviceItems.forEach((item, index) => {
        expect(item).toHaveAttribute('href', expectedUrls[index]);
        expect(item).toHaveAttribute('data-astro-prefetch');
      });
    });

    it('should have main services page link', () => {
      const mainLink = document.querySelector('a[href="/servicos"]');
      
      expect(mainLink).toBeInTheDocument();
      expect(mainLink).toHaveAttribute('data-astro-prefetch');
    });
  });

  describe('Visual Design Elements', () => {
    it('should have proper service item layout', () => {
      const serviceItems = document.querySelectorAll('a[role="menuitem"]:not([href="/servicos"])');
      
      serviceItems.forEach(item => {
        expect(item).toHaveClass('group');
        expect(item).toHaveClass('flex');
        expect(item).toHaveClass('gap-x-5');
        expect(item).toHaveClass('rounded-lg');
        expect(item).toHaveClass('p-4');
      });
    });

    it('should have proper icon styling', () => {
      const serviceIcons = document.querySelectorAll('svg.size-5');
      
      serviceIcons.forEach(icon => {
        expect(icon).toHaveClass('mt-1');
        expect(icon).toHaveClass('size-5');
        expect(icon).toHaveClass('shrink-0');
        expect(icon).toHaveClass('text-brand-400');
        expect(icon).toHaveClass('dark:text-brand-300');
      });
    });

    it('should have proper text styling', () => {
      const serviceTitles = document.querySelectorAll('p.font-medium');
      const serviceDescriptions = document.querySelectorAll('p.text-sm');
      
      serviceTitles.forEach(title => {
        expect(title).toHaveClass('font-medium');
        expect(title).toHaveClass('text-neutral-800');
        expect(title).toHaveClass('dark:text-neutral-200');
      });

      serviceDescriptions.forEach(desc => {
        expect(desc).toHaveClass('text-sm');
        expect(desc).toHaveClass('text-neutral-500');
        expect(desc).toHaveClass('group-hover:text-neutral-800');
      });
    });
  });

  describe('Dark Mode Support', () => {
    it('should have dark mode classes for mega menu', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(megaMenu).toHaveClass('dark:bg-neutral-800');
      expect(megaMenu).toHaveClass('dark:divide-neutral-700');
    });

    it('should have dark mode classes for service items', () => {
      const serviceItems = document.querySelectorAll('a[role="menuitem"]');
      
      serviceItems.forEach(item => {
        expect(item).toHaveClass('dark:hover:bg-neutral-500/10');
        expect(item).toHaveClass('dark:focus:bg-neutral-500/10');
      });
    });

    it('should have dark mode classes for view all link', () => {
      const viewAllLink = document.querySelector('a[href="/servicos"]');
      const separator = document.querySelector('.border-t');
      
      expect(viewAllLink).toHaveClass('dark:text-brand-400');
      expect(viewAllLink).toHaveClass('dark:hover:text-brand-300');
      expect(separator).toHaveClass('dark:border-neutral-700');
    });
  });

  describe('Animation and Transitions', () => {
    it('should have transition classes for mega menu', () => {
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(megaMenu).toHaveClass('transition-[opacity,margin]');
      expect(megaMenu).toHaveClass('hs-dropdown-open:opacity-100');
    });

    it('should have transition for view all arrow', () => {
      const arrow = document.querySelector('a[href="/servicos"] svg');
      
      expect(arrow).toHaveClass('transition');
      expect(arrow).toHaveClass('duration-300');
      expect(arrow).toHaveClass('group-hover:translate-x-1');
    });
  });

  describe('Preline UI Integration', () => {
    it('should have correct Preline mega menu classes', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      const megaMenu = document.querySelector('.hs-dropdown-menu');
      
      expect(dropdown).toHaveClass('hs-dropdown');
      expect(dropdown).toHaveAttribute('data-hs-dropdown-auto-close', 'outside');
      expect(megaMenu).toHaveClass('hs-dropdown-menu');
    });

    it('should have correct positioning and strategy', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      
      expect(dropdown).toHaveClass('[--strategy:static]');
      expect(dropdown).toHaveClass('md:[--strategy:absolute]');
      expect(dropdown).toHaveClass('md:[--trigger:hover]');
    });
  });
});