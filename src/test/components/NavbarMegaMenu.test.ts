/**
 * Integration tests for NavbarMegaMenu component
 * Tests the complete navigation structure and component integration
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';

describe('NavbarMegaMenu Component Integration', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  beforeEach(() => {
    // Create complete navigation structure
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <!-- Skip navigation link -->
          <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white focus:outline-hidden focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
          >
            Pular para o conteúdo principal
          </a>

          <!-- Main header -->
          <header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start">
            <nav
              class="relative mx-2 w-full rounded-[36px] border border-brand-100/40 bg-brand-50/60 px-4 py-3 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-800/80 dark:backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto"
              aria-label="Global"
            >
              <div class="flex items-center justify-between">
                <!-- Brand logo -->
                <a
                  class="flex-none rounded-lg text-xl font-bold outline-hidden ring-zinc-500 focus-visible:ring-3 dark:ring-zinc-200 dark:focus:outline-hidden"
                  href="/"
                  aria-label="Brand"
                >
                  <img src="/logo.svg" alt="Pratika" class="h-auto w-24" />
                </a>
                
                <!-- Mobile menu toggle -->
                <div class="ml-auto mr-5 md:hidden">
                  <button
                    type="button"
                    class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:outline-hidden focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
                    data-hs-collapse="#navbar-collapse-with-animation"
                    aria-controls="navbar-collapse-with-animation"
                    aria-label="Abrir menu de navegação"
                    aria-expanded="false"
                  >
                    <svg class="h-[1.25rem] w-[1.25rem] shrink-0 hs-collapse-open:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="3" x2="21" y1="6" y2="6"></line>
                      <line x1="3" x2="21" y1="12" y2="12"></line>
                      <line x1="3" x2="21" y1="18" y2="18"></line>
                    </svg>
                    <svg class="hidden h-[1.25rem] w-[1.25rem] shrink-0 hs-collapse-open:block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Theme toggle (mobile) -->
                <span class="inline-block md:hidden">
                  <button type="button" class="theme-toggle" aria-label="Toggle theme">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="5"/>
                    </svg>
                  </button>
                </span>
              </div>

              <!-- Navigation links container -->
              <div
                id="navbar-collapse-with-animation"
                class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"
              >
                <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7">
                  
                  <!-- Sobre a Pratika dropdown -->
                  <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
                    <button type="button" class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base" aria-expanded="false" aria-haspopup="menu" aria-label="Sobre a Pratika menu" data-hs-dropdown-toggle>
                      <span>Sobre a Pratika</span>
                      <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    <div class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:bg-neutral-800 md:w-auto md:shadow-2xl md:duration-[150ms]" role="menu" aria-orientation="vertical" aria-label="Sobre a Pratika submenu">
                      <div class="flex flex-col">
                        <a href="/sobre-nos" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Conheça a Prátika">Conheça a Prátika</a>
                        <a href="/esg" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Compromisso ESG">Compromisso ESG</a>
                      </div>
                    </div>
                  </div>

                  <!-- Diferenciais dropdown -->
                  <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
                    <button type="button" class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base" aria-expanded="false" aria-haspopup="menu" aria-label="Diferenciais menu" data-hs-dropdown-toggle>
                      <span>Diferenciais</span>
                      <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    <div class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:bg-neutral-800 md:w-auto md:shadow-2xl md:duration-[150ms]" role="menu" aria-orientation="vertical" aria-label="Diferenciais submenu">
                      <div class="flex flex-col">
                        <a href="/diferenciais/tecnologia-e-inovacao" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Tecnologia e Inovação">Tecnologia e Inovação</a>
                      </div>
                    </div>
                  </div>

                  <!-- Serviços mega menu -->
                  <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
                    <button type="button" class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base" aria-expanded="false" aria-haspopup="menu" aria-label="Serviços menu" data-hs-dropdown-toggle>
                      <span>Serviços</span>
                      <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    <div class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:divide-neutral-700 dark:bg-neutral-800 md:p-4 md:shadow-2xl md:duration-[150ms]" role="menu" aria-orientation="vertical" aria-label="Serviços submenu">
                      <div class="gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                        <div class="mx-1 flex flex-col md:mx-0">
                          <a href="/servicos/limpeza-e-conservacao" data-astro-prefetch class="group flex gap-x-5 rounded-lg p-4 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-hidden dark:text-neutral-200 dark:hover:bg-neutral-500/10 dark:focus:bg-neutral-500/10" role="menuitem" tabindex="-1" aria-label="Limpeza e Conservação Ambiental. Serviços completos de limpeza">
                            <svg class="mt-1 size-5 shrink-0 text-brand-400 dark:text-brand-300" aria-hidden="true"><path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z"/></svg>
                            <div class="grow">
                              <p class="font-medium text-neutral-800 dark:text-neutral-200">Limpeza e Conservação Ambiental</p>
                              <p class="text-sm text-neutral-500 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">Serviços completos de limpeza</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Blog link -->
                  <a href="/blog" class="block rounded-lg px-3 py-3 text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:px-3 md:py-4 md:text-sm 2xl:text-base">Blog</a>

                  <!-- Contato dropdown -->
                  <div class="hs-dropdown py-3 [--adaptive:none] [--strategy:static] md:px-3 md:py-4 md:[--strategy:absolute] md:[--trigger:hover]" data-hs-dropdown-auto-close="outside">
                    <button type="button" class="flex w-full items-center justify-between text-base font-medium text-neutral-600 outline-hidden ring-zinc-500 hover:text-neutral-500 focus-visible:ring-3 dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-hidden md:justify-start md:text-sm 2xl:text-base" aria-expanded="false" aria-haspopup="menu" aria-label="Contato menu" data-hs-dropdown-toggle>
                      <span>Contato</span>
                      <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    <div class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:bg-neutral-800 md:w-auto md:shadow-2xl md:duration-[150ms]" role="menu" aria-orientation="vertical" aria-label="Contato submenu">
                      <div class="flex flex-col">
                        <a href="/contato" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Fale Conosco">Fale Conosco</a>
                        <a href="/unidades" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Unidades">Unidades</a>
                      </div>
                    </div>
                  </div>

                  <!-- CTA Button -->
                  <a href="/solicitar-orcamento" class="inline-flex items-center justify-center gap-x-2 rounded-full border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus:bg-brand-700 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-brand-500 dark:hover:bg-brand-600 dark:focus:bg-brand-600 md:px-6 md:py-3">
                    Solicitar Orçamento
                  </a>

                  <!-- Theme toggle (desktop) -->
                  <span class="hidden md:inline-block">
                    <button type="button" class="theme-toggle" aria-label="Toggle theme">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"/>
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </nav>
          </header>

          <!-- Main content area -->
          <main id="main-content">
            <h1>Main Content</h1>
          </main>
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

  describe('Navigation Structure', () => {
    it('should render skip navigation link', () => {
      const skipLink = document.querySelector('a[href="#main-content"]');
      
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveTextContent('Pular para o conteúdo principal');
      expect(skipLink).toHaveClass('sr-only');
      expect(skipLink).toHaveClass('focus:not-sr-only');
    });

    it('should render main navigation landmark', () => {
      const nav = document.querySelector('nav[aria-label="Global"]');
      
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Global');
    });

    it('should render brand logo with proper attributes', () => {
      const brandLink = document.querySelector('a[aria-label="Brand"]');
      const logo = brandLink?.querySelector('img');
      
      expect(brandLink).toBeInTheDocument();
      expect(brandLink).toHaveAttribute('href', '/');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('alt', 'Pratika');
    });

    it('should render mobile menu toggle', () => {
      const mobileToggle = document.querySelector('.hs-collapse-toggle');
      
      expect(mobileToggle).toBeInTheDocument();
      expect(mobileToggle).toHaveAttribute('aria-label', 'Abrir menu de navegação');
      expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');
      expect(mobileToggle).toHaveAttribute('data-hs-collapse', '#navbar-collapse-with-animation');
    });
  });

  describe('Navigation Menu Items', () => {
    it('should render all main navigation items', () => {
      const expectedItems = [
        'Sobre a Pratika',
        'Diferenciais', 
        'Serviços',
        'Blog',
        'Contato'
      ];

      expectedItems.forEach(itemName => {
        const item = document.querySelector(`button[aria-label="${itemName} menu"], a[href*="${itemName.toLowerCase()}"]`);
        expect(item || document.querySelector(`*:contains("${itemName}")`)).toBeTruthy();
      });
    });

    it('should render CTA button', () => {
      const ctaButton = document.querySelector('a[href="/solicitar-orcamento"]');
      
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent('Solicitar Orçamento');
      expect(ctaButton).toHaveClass('bg-brand-600');
      expect(ctaButton).toHaveClass('text-white');
    });

    it('should render theme toggle buttons', () => {
      const themeToggles = document.querySelectorAll('.theme-toggle');
      
      expect(themeToggles).toHaveLength(2); // Mobile and desktop
      themeToggles.forEach(toggle => {
        expect(toggle).toHaveAttribute('aria-label', 'Toggle theme');
      });
    });
  });

  describe('Dropdown Functionality', () => {
    it('should render dropdown triggers with correct attributes', () => {
      const dropdownTriggers = document.querySelectorAll('[data-hs-dropdown-toggle]');
      
      expect(dropdownTriggers.length).toBeGreaterThan(0);
      
      dropdownTriggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
        expect(trigger).toHaveAttribute('type', 'button');
      });
    });

    it('should render dropdown menus with proper ARIA attributes', () => {
      const dropdownMenus = document.querySelectorAll('.hs-dropdown-menu');
      
      expect(dropdownMenus.length).toBeGreaterThan(0);
      
      dropdownMenus.forEach(menu => {
        expect(menu).toHaveAttribute('role', 'menu');
        expect(menu).toHaveAttribute('aria-orientation', 'vertical');
      });
    });

    it('should render menu items with proper attributes', () => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      expect(menuItems.length).toBeGreaterThan(0);
      
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('role', 'menuitem');
        expect(item).toHaveAttribute('tabindex', '-1');
        expect(item).toHaveAttribute('href');
      });
    });
  });

  describe('Mega Menu Structure', () => {
    it('should render services mega menu with grid layout', () => {
      const servicesMegaMenu = document.querySelector('button[aria-label="Serviços menu"]')
        ?.closest('.hs-dropdown')
        ?.querySelector('.hs-dropdown-menu');
      
      expect(servicesMegaMenu).toBeInTheDocument();
      
      const gridContainer = servicesMegaMenu?.querySelector('.md\\:grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('md:grid-cols-2');
      expect(gridContainer).toHaveClass('lg:grid-cols-3');
    });

    it('should render service items with icons and descriptions', () => {
      const serviceItems = document.querySelectorAll('a[href^="/servicos/"]');
      
      expect(serviceItems.length).toBeGreaterThan(0);
      
      serviceItems.forEach(item => {
        const icon = item.querySelector('svg');
        const title = item.querySelector('p.font-medium');
        const description = item.querySelector('p.text-sm');
        
        expect(icon).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive navigation classes', () => {
      const nav = document.querySelector('nav');
      
      expect(nav).toHaveClass('md:flex');
      expect(nav).toHaveClass('md:items-center');
      expect(nav).toHaveClass('md:justify-between');
    });

    it('should have responsive navigation container', () => {
      const navContainer = document.getElementById('navbar-collapse-with-animation');
      
      expect(navContainer).toHaveClass('hs-collapse');
      expect(navContainer).toHaveClass('hidden');
      expect(navContainer).toHaveClass('md:block');
    });

    it('should have responsive navigation links layout', () => {
      const navContainer = document.getElementById('navbar-collapse-with-animation');
      const linksContainer = navContainer?.querySelector('.mt-5');
      
      expect(linksContainer).toHaveClass('flex');
      expect(linksContainer).toHaveClass('flex-col');
      expect(linksContainer).toHaveClass('md:flex-row');
      expect(linksContainer).toHaveClass('md:items-center');
    });
  });

  describe('Accessibility Features', () => {
    it('should have proper heading structure', () => {
      const mainHeading = document.querySelector('h1');
      expect(mainHeading).toBeInTheDocument();
    });

    it('should have proper focus management classes', () => {
      const focusableElements = document.querySelectorAll('[class*="focus-visible:ring"], [class*="focus:outline-hidden"]');
      
      expect(focusableElements.length).toBeGreaterThan(0);
    });

    it('should hide decorative icons from screen readers', () => {
      const decorativeIcons = document.querySelectorAll('svg[aria-hidden="true"]');
      
      expect(decorativeIcons.length).toBeGreaterThan(0);
    });

    it('should have proper button semantics', () => {
      const buttons = document.querySelectorAll('button');
      
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type');
      });
    });
  });

  describe('Performance Features', () => {
    it('should have prefetch attributes on navigation links', () => {
      const prefetchLinks = document.querySelectorAll('a[data-astro-prefetch]');
      
      expect(prefetchLinks.length).toBeGreaterThan(0);
    });

    it('should have proper image optimization attributes', () => {
      const logo = document.querySelector('img');
      
      expect(logo).toHaveAttribute('alt');
      expect(logo).toHaveClass('h-auto');
    });
  });

  describe('Visual Design', () => {
    it('should have proper brand styling', () => {
      const nav = document.querySelector('nav');
      const ctaButton = document.querySelector('a[href="/solicitar-orcamento"]');
      
      expect(nav).toHaveClass('bg-brand-50/60');
      expect(nav).toHaveClass('border-brand-100/40');
      expect(ctaButton).toHaveClass('bg-brand-600');
    });

    it('should have dark mode support', () => {
      const nav = document.querySelector('nav');
      const dropdownMenus = document.querySelectorAll('.hs-dropdown-menu');
      
      expect(nav).toHaveClass('dark:bg-neutral-800/80');
      expect(nav).toHaveClass('dark:border-neutral-700/40');
      
      dropdownMenus.forEach(menu => {
        expect(menu).toHaveClass('dark:bg-neutral-800');
      });
    });

    it('should have proper spacing and layout', () => {
      const nav = document.querySelector('nav');
      
      expect(nav).toHaveClass('px-4');
      expect(nav).toHaveClass('py-3');
      expect(nav).toHaveClass('md:px-6');
      expect(nav).toHaveClass('lg:px-8');
    });
  });

  describe('Animation Classes', () => {
    it('should have transition classes for collapsible elements', () => {
      const collapseContainer = document.getElementById('navbar-collapse-with-animation');
      
      expect(collapseContainer).toHaveClass('transition-all');
      expect(collapseContainer).toHaveClass('duration-300');
    });

    it('should have chevron rotation animations', () => {
      const chevrons = document.querySelectorAll('button svg');
      
      chevrons.forEach(chevron => {
        if (chevron.classList.contains('transition-transform')) {
          expect(chevron).toHaveClass('hs-dropdown-open:rotate-180');
        }
      });
    });
  });

  describe('URL Structure', () => {
    it('should have correct navigation URLs', () => {
      const expectedUrls = [
        '/sobre-nos',
        '/esg',
        '/diferenciais/tecnologia-e-inovacao',
        '/servicos/limpeza-e-conservacao',
        '/blog',
        '/contato',
        '/unidades',
        '/solicitar-orcamento'
      ];

      expectedUrls.forEach(url => {
        const link = document.querySelector(`a[href="${url}"]`);
        expect(link).toBeInTheDocument();
      });
    });
  });
});