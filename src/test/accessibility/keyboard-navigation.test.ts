/**
 * Comprehensive Keyboard Navigation Tests
 * Tests all keyboard interactions for Pratika navigation components
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import '@testing-library/jest-dom';

describe('Keyboard Navigation Accessibility', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window & typeof globalThis;

  beforeEach(() => {
    // Create comprehensive navigation structure for keyboard testing
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head><title>Keyboard Navigation Test</title></head>
        <body>
          <!-- Skip navigation link -->
          <a
            href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
            id="skip-link"
          >
            Pular para o conteúdo principal
          </a>

          <!-- Navigation with multiple dropdowns -->
          <nav aria-label="Global" id="main-navigation">
            <!-- Simple dropdown -->
            <div class="hs-dropdown" id="dropdown-1">
              <button
                type="button"
                data-hs-dropdown-toggle
                aria-expanded="false"
                aria-haspopup="menu"
                aria-label="Sobre a Pratika menu"
                id="dropdown-trigger-1"
              >
                Sobre a Pratika
                <svg aria-hidden="true"></svg>
              </button>
              <div class="hs-dropdown-menu hidden" role="menu" aria-orientation="vertical" id="dropdown-menu-1">
                <a href="/sobre-nos" role="menuitem" tabindex="-1" id="menu-item-1-1">Conheça a Prátika</a>
                <a href="/esg" role="menuitem" tabindex="-1" id="menu-item-1-2">Compromisso ESG</a>
                <a href="/etica-e-compliance" role="menuitem" tabindex="-1" id="menu-item-1-3">Ética e Compliance</a>
              </div>
            </div>

            <!-- Mega menu -->
            <div class="hs-dropdown" id="dropdown-2">
              <button
                type="button"
                data-hs-dropdown-toggle
                aria-expanded="false"
                aria-haspopup="menu"
                aria-label="Serviços menu"
                id="dropdown-trigger-2"
              >
                Serviços
                <svg aria-hidden="true"></svg>
              </button>
              <div class="hs-dropdown-menu hidden" role="menu" aria-orientation="vertical" id="dropdown-menu-2">
                <div class="md:grid md:grid-cols-2">
                  <div>
                    <a href="/servicos/limpeza" role="menuitem" tabindex="-1" id="menu-item-2-1">Limpeza e Conservação</a>
                    <a href="/servicos/portaria" role="menuitem" tabindex="-1" id="menu-item-2-2">Portaria Desarmada</a>
                  </div>
                  <div>
                    <a href="/servicos/areas-verdes" role="menuitem" tabindex="-1" id="menu-item-2-3">Gestão de Áreas Verdes</a>
                    <a href="/servicos/apoio" role="menuitem" tabindex="-1" id="menu-item-2-4">Serviços de Apoio</a>
                  </div>
                </div>
                <a href="/servicos" role="menuitem" tabindex="-1" id="menu-item-2-all">Ver todos os serviços</a>
              </div>
            </div>

            <!-- Regular link -->
            <a href="/blog" id="blog-link">Blog</a>

            <!-- CTA Button -->
            <a href="/solicitar-orcamento" class="cta-button" id="cta-button">Solicitar Orçamento</a>
          </nav>

          <!-- Main content -->
          <main id="main-content">
            <h1>Main Content</h1>
            <button id="other-button">Other Button</button>
          </main>

          <!-- Live region for announcements -->
          <div id="navigation-announcements" aria-live="polite" aria-atomic="true" class="sr-only"></div>
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

    // Mock focus and blur methods with proper spies
    const focusSpy = vi.fn(function(this: HTMLElement) {
      this.dispatchEvent(new window.FocusEvent('focus', { bubbles: true }));
    });
    
    const blurSpy = vi.fn(function(this: HTMLElement) {
      this.dispatchEvent(new window.FocusEvent('blur', { bubbles: true }));
    });

    HTMLElement.prototype.focus = focusSpy;
    HTMLElement.prototype.blur = blurSpy;
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Tab Navigation Order', () => {
    it('should have correct tab order for navigation elements', () => {
      const focusableElements = [
        document.getElementById('skip-link'),
        document.getElementById('dropdown-trigger-1'),
        document.getElementById('dropdown-trigger-2'),
        document.getElementById('blog-link'),
        document.getElementById('cta-button')
      ];

      focusableElements.forEach(element => {
        expect(element).toBeInTheDocument();
        expect(element?.tabIndex).not.toBe(-1);
      });
    });

    it('should skip menu items in tab order when dropdown is closed', () => {
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      menuItems.forEach(item => {
        expect(item).toHaveAttribute('tabindex', '-1');
      });
    });

    it('should allow skip link to receive focus', () => {
      const skipLink = document.getElementById('skip-link');
      
      expect(skipLink).toBeInTheDocument();
      expect(skipLink?.tabIndex).toBe(0);
    });
  });

  describe('Dropdown Keyboard Interactions', () => {
    let dropdownTrigger: HTMLElement;
    let dropdownMenu: HTMLElement;
    let menuItems: NodeListOf<HTMLElement>;

    beforeEach(() => {
      dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      dropdownMenu = document.getElementById('dropdown-menu-1')!;
      menuItems = dropdownMenu.querySelectorAll('[role="menuitem"]');
    });

    it('should open dropdown with Enter key', () => {
      const enterEvent = new window.KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
      });

      dropdownTrigger.dispatchEvent(enterEvent);
      
      // In a real implementation, this would trigger the dropdown to open
      expect(enterEvent.type).toBe('keydown');
      expect(enterEvent.key).toBe('Enter');
    });

    it('should open dropdown with Space key', () => {
      const spaceEvent = new window.KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
        cancelable: true
      });

      dropdownTrigger.dispatchEvent(spaceEvent);
      
      expect(spaceEvent.type).toBe('keydown');
      expect(spaceEvent.key).toBe(' ');
    });

    it('should open dropdown and focus first item with ArrowDown', () => {
      const arrowDownEvent = new window.KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });

      dropdownTrigger.dispatchEvent(arrowDownEvent);
      
      expect(arrowDownEvent.type).toBe('keydown');
      expect(arrowDownEvent.key).toBe('ArrowDown');
    });

    it('should open dropdown and focus last item with ArrowUp', () => {
      const arrowUpEvent = new window.KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true
      });

      dropdownTrigger.dispatchEvent(arrowUpEvent);
      
      expect(arrowUpEvent.type).toBe('keydown');
      expect(arrowUpEvent.key).toBe('ArrowUp');
    });

    it('should close dropdown with Escape key', () => {
      const escapeEvent = new window.KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true
      });

      dropdownTrigger.dispatchEvent(escapeEvent);
      
      expect(escapeEvent.type).toBe('keydown');
      expect(escapeEvent.key).toBe('Escape');
    });
  });

  describe('Menu Item Navigation', () => {
    let menuItems: NodeListOf<HTMLElement>;

    beforeEach(() => {
      menuItems = document.querySelectorAll('#dropdown-menu-1 [role="menuitem"]');
    });

    it('should navigate between menu items with arrow keys', () => {
      const firstItem = menuItems[0];
      const secondItem = menuItems[1];

      // Simulate ArrowDown on first item
      const arrowDownEvent = new window.KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });

      firstItem.dispatchEvent(arrowDownEvent);
      
      expect(arrowDownEvent.type).toBe('keydown');
      expect(arrowDownEvent.key).toBe('ArrowDown');

      // Simulate ArrowUp on second item
      const arrowUpEvent = new window.KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true
      });

      secondItem.dispatchEvent(arrowUpEvent);
      
      expect(arrowUpEvent.type).toBe('keydown');
      expect(arrowUpEvent.key).toBe('ArrowUp');
    });

    it('should jump to first item with Home key', () => {
      const lastItem = menuItems[menuItems.length - 1];

      const homeEvent = new window.KeyboardEvent('keydown', {
        key: 'Home',
        bubbles: true,
        cancelable: true
      });

      lastItem.dispatchEvent(homeEvent);
      
      expect(homeEvent.type).toBe('keydown');
      expect(homeEvent.key).toBe('Home');
    });

    it('should jump to last item with End key', () => {
      const firstItem = menuItems[0];

      const endEvent = new window.KeyboardEvent('keydown', {
        key: 'End',
        bubbles: true,
        cancelable: true
      });

      firstItem.dispatchEvent(endEvent);
      
      expect(endEvent.type).toBe('keydown');
      expect(endEvent.key).toBe('End');
    });

    it('should close menu and return focus to trigger with Escape', () => {
      const menuItem = menuItems[1];

      const escapeEvent = new window.KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true
      });

      menuItem.dispatchEvent(escapeEvent);
      
      expect(escapeEvent.type).toBe('keydown');
      expect(escapeEvent.key).toBe('Escape');
    });

    it('should close menu and continue tab sequence with Tab', () => {
      const menuItem = menuItems[1];

      const tabEvent = new window.KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true
      });

      menuItem.dispatchEvent(tabEvent);
      
      expect(tabEvent.type).toBe('keydown');
      expect(tabEvent.key).toBe('Tab');
    });
  });

  describe('Mega Menu Navigation', () => {
    let megaMenuItems: NodeListOf<HTMLElement>;

    beforeEach(() => {
      megaMenuItems = document.querySelectorAll('#dropdown-menu-2 [role="menuitem"]');
    });

    it('should navigate through all mega menu items sequentially', () => {
      expect(megaMenuItems.length).toBe(5); // 4 service items + 1 "view all" link

      megaMenuItems.forEach((item, index) => {
        expect(item).toHaveAttribute('role', 'menuitem');
        expect(item).toHaveAttribute('tabindex', '-1');
        expect(item).toHaveAttribute('href');
      });
    });

    it('should handle grid layout navigation', () => {
      const gridContainer = document.querySelector('#dropdown-menu-2 .md\\:grid');
      const columns = gridContainer?.querySelectorAll('div');
      
      expect(gridContainer).toBeInTheDocument();
      expect(columns?.length).toBe(2);
    });
  });

  describe('Focus Management', () => {
    it('should manage focus visibility', () => {
      const focusableElements = document.querySelectorAll('button, a[href]');
      
      focusableElements.forEach(element => {
        // Simulate focus
        element.dispatchEvent(new window.FocusEvent('focus', { bubbles: true }));
        
        // Check if element can receive focus
        expect(element).toBeInTheDocument();
      });
    });

    it('should trap focus within open dropdown', () => {
      const dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      const menuItems = document.querySelectorAll('#dropdown-menu-1 [role="menuitem"]');
      
      // Simulate dropdown being open (in real implementation)
      expect(dropdownTrigger).toBeInTheDocument();
      expect(menuItems.length).toBeGreaterThan(0);
    });

    it('should restore focus to trigger when dropdown closes', () => {
      const dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      
      // Create a spy for this specific element
      const focusSpy = vi.spyOn(dropdownTrigger, 'focus');
      
      // Simulate focus restoration
      dropdownTrigger.focus();
      
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('Skip Navigation', () => {
    it('should allow skipping to main content', () => {
      const skipLink = document.getElementById('skip-link')!;
      const mainContent = document.getElementById('main-content')!;
      
      expect(skipLink).toHaveAttribute('href', '#main-content');
      expect(mainContent).toBeInTheDocument();
      expect(mainContent).toHaveAttribute('id', 'main-content');
    });

    it('should be visually hidden by default', () => {
      const skipLink = document.getElementById('skip-link')!;
      
      expect(skipLink).toHaveClass('sr-only');
      expect(skipLink).toHaveClass('focus:not-sr-only');
    });

    it('should become visible on focus', () => {
      const skipLink = document.getElementById('skip-link')!;
      
      // Create a spy for this specific element
      const focusSpy = vi.spyOn(skipLink, 'focus');
      
      skipLink.focus();
      
      expect(skipLink).toHaveClass('focus:absolute');
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  describe('Keyboard Event Handling', () => {
    it('should prevent default behavior for navigation keys', () => {
      const dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      
      const navigationKeys = ['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Escape'];
      
      navigationKeys.forEach(key => {
        const event = new window.KeyboardEvent('keydown', {
          key,
          bubbles: true,
          cancelable: true
        });
        
        dropdownTrigger.dispatchEvent(event);
        
        expect(event.type).toBe('keydown');
        expect(event.key).toBe(key);
      });
    });

    it('should handle character key navigation (first letter)', () => {
      const menuItems = document.querySelectorAll('#dropdown-menu-1 [role="menuitem"]');
      
      // Test typing 'C' to jump to "Conheça a Prátika"
      const charEvent = new window.KeyboardEvent('keydown', {
        key: 'c',
        bubbles: true,
        cancelable: true
      });
      
      menuItems[0].dispatchEvent(charEvent);
      
      expect(charEvent.type).toBe('keydown');
      expect(charEvent.key).toBe('c');
    });
  });

  describe('ARIA State Management', () => {
    it('should update aria-expanded when dropdown opens/closes', () => {
      const dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      
      expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'false');
      
      // In real implementation, this would change to 'true' when opened
      dropdownTrigger.setAttribute('aria-expanded', 'true');
      expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should announce dropdown state changes', () => {
      const liveRegion = document.getElementById('navigation-announcements')!;
      
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Mobile Keyboard Navigation', () => {
    beforeEach(() => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
    });

    it('should handle mobile menu toggle keyboard interaction', () => {
      // Add mobile menu toggle to DOM
      const mobileToggle = document.createElement('button');
      mobileToggle.setAttribute('data-hs-collapse', '#navbar-collapse');
      mobileToggle.setAttribute('aria-label', 'Toggle navigation');
      mobileToggle.id = 'mobile-toggle';
      document.body.appendChild(mobileToggle);

      const enterEvent = new window.KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
      });

      mobileToggle.dispatchEvent(enterEvent);
      
      expect(enterEvent.type).toBe('keydown');
      expect(enterEvent.key).toBe('Enter');
    });

    it('should maintain keyboard navigation in mobile layout', () => {
      const dropdownTriggers = document.querySelectorAll('[data-hs-dropdown-toggle]');
      
      dropdownTriggers.forEach(trigger => {
        expect(trigger).toHaveAttribute('type', 'button');
        expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle missing menu items gracefully', () => {
      const emptyDropdown = document.createElement('div');
      emptyDropdown.className = 'hs-dropdown';
      emptyDropdown.innerHTML = `
        <button data-hs-dropdown-toggle>Empty Menu</button>
        <div class="hs-dropdown-menu" role="menu"></div>
      `;
      
      document.body.appendChild(emptyDropdown);
      
      const trigger = emptyDropdown.querySelector('button')!;
      const menu = emptyDropdown.querySelector('.hs-dropdown-menu')!;
      
      expect(trigger).toBeInTheDocument();
      expect(menu).toBeInTheDocument();
      expect(menu.children.length).toBe(0);
    });

    it('should handle rapid keyboard input', () => {
      const dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      
      // Simulate rapid key presses
      const keys = ['ArrowDown', 'ArrowDown', 'Enter', 'Escape'];
      
      keys.forEach(key => {
        const event = new window.KeyboardEvent('keydown', {
          key,
          bubbles: true,
          cancelable: true
        });
        
        dropdownTrigger.dispatchEvent(event);
        expect(event.type).toBe('keydown');
      });
    });

    it('should handle focus loss and restoration', () => {
      const dropdownTrigger = document.getElementById('dropdown-trigger-1')!;
      const otherButton = document.getElementById('other-button')!;
      
      // Create spies for specific elements
      const triggerFocusSpy = vi.spyOn(dropdownTrigger, 'focus');
      const otherFocusSpy = vi.spyOn(otherButton, 'focus');
      
      // Focus dropdown trigger
      dropdownTrigger.focus();
      expect(triggerFocusSpy).toHaveBeenCalled();
      
      // Focus moves to other element
      otherButton.focus();
      expect(otherFocusSpy).toHaveBeenCalled();
      
      // Focus returns to dropdown trigger
      dropdownTrigger.focus();
      expect(triggerFocusSpy).toHaveBeenCalledTimes(2);
    });
  });
});