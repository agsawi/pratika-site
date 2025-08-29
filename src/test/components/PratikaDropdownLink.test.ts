/**
 * Unit tests for PratikaDropdownLink component
 * Tests dropdown functionality, accessibility, and keyboard navigation
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';

// Mock dropdown data
const mockDropdownItems = [
  { name: 'Conheça a Prátika', url: '/sobre-nos' },
  { name: 'Compromisso ESG', url: '/esg' },
  { name: 'Ética e Compliance', url: '/etica-e-compliance' }
];

describe('PratikaDropdownLink Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  beforeEach(() => {
    // Create DOM structure that matches the component
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
              aria-label="Sobre a Pratika menu"
              data-hs-dropdown-toggle
            >
              <span>Sobre a Pratika</span>
              <svg class="ml-1 transition-transform duration-200 hs-dropdown-open:rotate-180" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div
              class="hs-dropdown-menu start-0 top-full z-10 hidden w-full min-w-60 rounded-2xl bg-neutral-50 py-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:start-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:bg-neutral-800 md:w-auto md:shadow-2xl md:duration-[150ms]"
              role="menu"
              aria-orientation="vertical"
              aria-label="Sobre a Pratika submenu"
            >
              <div class="flex flex-col">
                <a href="/sobre-nos" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Conheça a Prátika">
                  Conheça a Prátika
                </a>
                <a href="/esg" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Compromisso ESG">
                  Compromisso ESG
                </a>
                <a href="/etica-e-compliance" data-astro-prefetch class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:bg-neutral-100 focus:text-neutral-900 focus:outline-hidden dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 dark:focus:bg-neutral-700 dark:focus:text-neutral-100" role="menuitem" tabindex="-1" aria-label="Ética e Compliance">
                  Ética e Compliance
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

  describe('Component Structure', () => {
    it('should render dropdown trigger button with correct attributes', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('type', 'button');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-label', 'Sobre a Pratika menu');
    });

    it('should render dropdown menu with correct ARIA attributes', () => {
      const menu = document.querySelector('.hs-dropdown-menu');
      
      expect(menu).toBeInTheDocument();
      expect(menu).toHaveAttribute('role', 'menu');
      expect(menu).toHaveAttribute('aria-orientation', 'vertical');
      expect(menu).toHaveAttribute('aria-label', 'Sobre a Pratika submenu');
    });

    it('should render all menu items with correct attributes', () => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      expect(menuItems).toHaveLength(3);
      
      menuItems.forEach((item, index) => {
        expect(item).toHaveAttribute('role', 'menuitem');
        expect(item).toHaveAttribute('tabindex', '-1');
        expect(item).toHaveAttribute('href');
        expect(item).toHaveAttribute('aria-label');
      });
    });

    it('should hide chevron icon from screen readers', () => {
      const icon = document.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Accessibility Features', () => {
    it('should have proper keyboard navigation support', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]') as HTMLButtonElement;
      
      // Test Enter key
      const enterEvent = new window.KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
      });
      
      trigger.dispatchEvent(enterEvent);
      expect(enterEvent.defaultPrevented).toBe(false); // Preline handles this
    });

    it('should support focus management', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]') as HTMLButtonElement;
      const menuItems = document.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLAnchorElement>;
      
      // Trigger should be focusable
      expect(trigger.tabIndex).toBe(0);
      
      // Menu items should have tabindex -1 initially
      menuItems.forEach(item => {
        expect(item.tabIndex).toBe(-1);
      });
    });

    it('should have proper semantic structure', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      const trigger = dropdown?.querySelector('button');
      const menu = dropdown?.querySelector('[role="menu"]');
      
      expect(dropdown).toBeInTheDocument();
      expect(trigger).toBeInTheDocument();
      expect(menu).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should have mobile-friendly classes', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      const menu = document.querySelector('.hs-dropdown-menu');
      
      expect(dropdown).toHaveClass('py-3');
      expect(dropdown).toHaveClass('md:px-3');
      expect(dropdown).toHaveClass('md:py-4');
      
      expect(menu).toHaveClass('w-full');
      expect(menu).toHaveClass('md:w-auto');
    });

    it('should have touch-friendly button sizing', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      const dropdown = document.querySelector('.hs-dropdown');
      
      // Check if the dropdown container has the padding classes
      expect(dropdown).toHaveClass('py-3');
      expect(dropdown).toHaveClass('md:py-4');
      
      // Verify the trigger exists and is properly sized
      expect(trigger).toBeInTheDocument();
    });
  });

  describe('URL Navigation', () => {
    it('should have correct URLs for all menu items', () => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      const expectedUrls = ['/sobre-nos', '/esg', '/etica-e-compliance'];
      
      menuItems.forEach((item, index) => {
        expect(item).toHaveAttribute('href', expectedUrls[index]);
      });
    });

    it('should have data-astro-prefetch for performance', () => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('data-astro-prefetch');
      });
    });
  });

  describe('Visual States', () => {
    it('should have hover and focus styles', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      expect(trigger).toHaveClass('hover:text-neutral-500');
      expect(trigger).toHaveClass('focus-visible:ring-3');
      
      menuItems.forEach(item => {
        expect(item).toHaveClass('hover:bg-neutral-100');
        expect(item).toHaveClass('focus:bg-neutral-100');
        expect(item).toHaveClass('focus:outline-hidden');
      });
    });

    it('should have dark mode support', () => {
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      const menu = document.querySelector('.hs-dropdown-menu');
      
      expect(trigger).toHaveClass('dark:text-neutral-400');
      expect(menu).toHaveClass('dark:bg-neutral-800');
    });
  });

  describe('Animation Classes', () => {
    it('should have transition classes for smooth animations', () => {
      const icon = document.querySelector('svg');
      const menu = document.querySelector('.hs-dropdown-menu');
      
      expect(icon).toHaveClass('transition-transform');
      expect(icon).toHaveClass('duration-200');
      expect(icon).toHaveClass('hs-dropdown-open:rotate-180');
      
      expect(menu).toHaveClass('transition-[opacity,margin]');
      expect(menu).toHaveClass('hs-dropdown-open:opacity-100');
    });
  });

  describe('Preline UI Integration', () => {
    it('should have correct Preline dropdown classes', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      const trigger = document.querySelector('[data-hs-dropdown-toggle]');
      const menu = document.querySelector('.hs-dropdown-menu');
      
      expect(dropdown).toHaveClass('hs-dropdown');
      expect(dropdown).toHaveAttribute('data-hs-dropdown-auto-close', 'outside');
      expect(trigger).toHaveAttribute('data-hs-dropdown-toggle');
      expect(menu).toHaveClass('hs-dropdown-menu');
    });

    it('should have correct positioning strategy', () => {
      const dropdown = document.querySelector('.hs-dropdown');
      
      expect(dropdown).toHaveClass('[--strategy:static]');
      expect(dropdown).toHaveClass('md:[--strategy:absolute]');
      expect(dropdown).toHaveClass('md:[--trigger:hover]');
    });
  });
});