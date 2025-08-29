/**
 * Navigation Accessibility Enhancement Script
 * Implements comprehensive keyboard navigation, ARIA support, and screen reader accessibility
 * for Pratika navigation components including dropdowns and mega menus.
 */

class NavigationAccessibility {
  constructor() {
    this.dropdowns = [];
    this.currentFocusIndex = -1;
    this.isKeyboardNavigation = false;
    this.escapeKeyPressed = false;
    
    this.init();
  }

  /**
   * Initialize accessibility enhancements
   */
  init() {
    this.setupDropdowns();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupMobileAccessibility();
    
    // Listen for DOM changes to reinitialize if needed
    this.observeNavigationChanges();
  }

  /**
   * Setup dropdown accessibility
   */
  setupDropdowns() {
    const dropdownElements = document.querySelectorAll('.hs-dropdown');
    
    dropdownElements.forEach((dropdown, index) => {
      const trigger = dropdown.querySelector('[data-hs-dropdown-toggle]');
      const menu = dropdown.querySelector('.hs-dropdown-menu');
      const menuItems = menu ? menu.querySelectorAll('a[role="menuitem"], button[role="menuitem"]') : [];
      
      if (!trigger || !menu) return;

      const dropdownData = {
        element: dropdown,
        trigger,
        menu,
        menuItems: Array.from(menuItems),
        isOpen: false,
        index
      };

      this.dropdowns.push(dropdownData);
      this.enhanceDropdown(dropdownData);
    });
  }

  /**
   * Enhance individual dropdown with accessibility features
   */
  enhanceDropdown(dropdown) {
    const { trigger, menu, menuItems } = dropdown;

    // Enhance trigger button
    this.enhanceTrigger(dropdown);
    
    // Enhance menu
    this.enhanceMenu(dropdown);
    
    // Enhance menu items
    menuItems.forEach((item, index) => {
      this.enhanceMenuItem(item, index, dropdown);
    });

    // Setup dropdown event listeners
    this.setupDropdownEvents(dropdown);
  }

  /**
   * Enhance trigger button accessibility
   */
  enhanceTrigger(dropdown) {
    const { trigger, menu } = dropdown;
    
    // Ensure proper ARIA attributes
    if (!trigger.hasAttribute('aria-expanded')) {
      trigger.setAttribute('aria-expanded', 'false');
    }
    
    if (!trigger.hasAttribute('aria-haspopup')) {
      trigger.setAttribute('aria-haspopup', 'true');
    }

    // Add unique IDs for ARIA relationships
    const menuId = menu.id || `dropdown-menu-${dropdown.index}`;
    menu.id = menuId;
    trigger.setAttribute('aria-controls', menuId);

    // Add descriptive label if missing
    if (!trigger.hasAttribute('aria-label') && !trigger.hasAttribute('aria-labelledby')) {
      const triggerText = trigger.textContent.trim();
      trigger.setAttribute('aria-label', `${triggerText} menu`);
    }
  }

  /**
   * Enhance menu accessibility
   */
  enhanceMenu(dropdown) {
    const { menu, menuItems } = dropdown;
    
    // Ensure proper role
    if (!menu.hasAttribute('role')) {
      menu.setAttribute('role', 'menu');
    }

    // Add aria-orientation for screen readers
    if (!menu.hasAttribute('aria-orientation')) {
      menu.setAttribute('aria-orientation', 'vertical');
    }

    // Set initial tabindex for menu items
    menuItems.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      // Ensure proper role
      if (!item.hasAttribute('role')) {
        item.setAttribute('role', 'menuitem');
      }
    });
  }

  /**
   * Enhance individual menu item accessibility
   */
  enhanceMenuItem(item, index, dropdown) {
    // Add descriptive labels for complex menu items (mega menus)
    const itemText = item.querySelector('p, .font-medium');
    const itemDescription = item.querySelector('.text-sm, .text-neutral-500');
    
    if (itemText && itemDescription && !item.hasAttribute('aria-label')) {
      const label = `${itemText.textContent.trim()}. ${itemDescription.textContent.trim()}`;
      item.setAttribute('aria-label', label);
    }

    // Add position information for screen readers
    item.setAttribute('aria-posinset', index + 1);
    item.setAttribute('aria-setsize', dropdown.menuItems.length);
  }

  /**
   * Setup dropdown event listeners
   */
  setupDropdownEvents(dropdown) {
    const { trigger, menu, element } = dropdown;

    // Track dropdown state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isOpen = element.classList.contains('hs-dropdown-open');
          this.updateDropdownState(dropdown, isOpen);
        }
      });
    });

    observer.observe(element, { attributes: true, attributeFilter: ['class'] });

    // Handle trigger click
    trigger.addEventListener('click', (e) => {
      this.handleTriggerClick(dropdown, e);
    });

    // Handle trigger keyboard events
    trigger.addEventListener('keydown', (e) => {
      this.handleTriggerKeydown(dropdown, e);
    });

    // Handle menu keyboard events
    menu.addEventListener('keydown', (e) => {
      this.handleMenuKeydown(dropdown, e);
    });

    // Handle menu item focus
    dropdown.menuItems.forEach((item, index) => {
      item.addEventListener('focus', () => {
        this.updateMenuItemFocus(dropdown, index);
      });
    });
  }

  /**
   * Update dropdown state and ARIA attributes
   */
  updateDropdownState(dropdown, isOpen) {
    const { trigger, menu, menuItems } = dropdown;
    
    dropdown.isOpen = isOpen;
    trigger.setAttribute('aria-expanded', isOpen.toString());

    if (isOpen) {
      // Focus first menu item when opened with keyboard
      if (this.isKeyboardNavigation) {
        setTimeout(() => {
          if (menuItems.length > 0) {
            menuItems[0].focus();
            this.updateMenuItemFocus(dropdown, 0);
          }
        }, 100);
      }
    } else {
      // Reset focus when closed
      this.resetMenuItemFocus(dropdown);
      
      // Return focus to trigger if closed with escape
      if (this.escapeKeyPressed) {
        trigger.focus();
        this.escapeKeyPressed = false;
      }
    }
  }

  /**
   * Handle trigger button click
   */
  handleTriggerClick(dropdown, event) {
    this.isKeyboardNavigation = false;
  }

  /**
   * Handle trigger button keyboard events
   */
  handleTriggerKeydown(dropdown, event) {
    const { key } = event;
    
    this.isKeyboardNavigation = true;

    switch (key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        if (!dropdown.isOpen) {
          // Trigger dropdown open
          dropdown.trigger.click();
        } else if (dropdown.menuItems.length > 0) {
          dropdown.menuItems[0].focus();
          this.updateMenuItemFocus(dropdown, 0);
        }
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        if (!dropdown.isOpen) {
          dropdown.trigger.click();
        }
        if (dropdown.menuItems.length > 0) {
          const lastIndex = dropdown.menuItems.length - 1;
          dropdown.menuItems[lastIndex].focus();
          this.updateMenuItemFocus(dropdown, lastIndex);
        }
        break;
        
      case 'Escape':
        if (dropdown.isOpen) {
          event.preventDefault();
          this.escapeKeyPressed = true;
          dropdown.trigger.click(); // Close dropdown
        }
        break;
    }
  }

  /**
   * Handle menu keyboard navigation
   */
  handleMenuKeydown(dropdown, event) {
    const { key } = event;
    const { menuItems } = dropdown;
    const currentIndex = this.getCurrentMenuItemIndex(dropdown);

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % menuItems.length;
        menuItems[nextIndex].focus();
        this.updateMenuItemFocus(dropdown, nextIndex);
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
        menuItems[prevIndex].focus();
        this.updateMenuItemFocus(dropdown, prevIndex);
        break;
        
      case 'Home':
        event.preventDefault();
        menuItems[0].focus();
        this.updateMenuItemFocus(dropdown, 0);
        break;
        
      case 'End':
        event.preventDefault();
        const lastIndex = menuItems.length - 1;
        menuItems[lastIndex].focus();
        this.updateMenuItemFocus(dropdown, lastIndex);
        break;
        
      case 'Escape':
        event.preventDefault();
        this.escapeKeyPressed = true;
        dropdown.trigger.click(); // Close dropdown
        break;
        
      case 'Tab':
        // Allow tab to close dropdown and move to next focusable element
        dropdown.trigger.click();
        break;
        
      case 'Enter':
      case ' ':
        // Let the default action happen (navigate to link)
        break;
    }
  }

  /**
   * Get current focused menu item index
   */
  getCurrentMenuItemIndex(dropdown) {
    const activeElement = document.activeElement;
    return dropdown.menuItems.findIndex(item => item === activeElement);
  }

  /**
   * Update menu item focus states
   */
  updateMenuItemFocus(dropdown, focusedIndex) {
    dropdown.menuItems.forEach((item, index) => {
      item.setAttribute('tabindex', index === focusedIndex ? '0' : '-1');
    });
  }

  /**
   * Reset menu item focus states
   */
  resetMenuItemFocus(dropdown) {
    dropdown.menuItems.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  }

  /**
   * Setup global keyboard navigation
   */
  setupKeyboardNavigation() {
    // Track keyboard usage for focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.isKeyboardNavigation = true;
      }
    });

    // Track mouse usage
    document.addEventListener('mousedown', () => {
      this.isKeyboardNavigation = false;
    });

    // Handle global escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
      }
    });
  }

  /**
   * Setup focus management
   */
  setupFocusManagement() {
    // Enhance focus visibility
    const style = document.createElement('style');
    style.textContent = `
      /* Enhanced focus styles for navigation */
      .hs-dropdown button:focus-visible,
      .hs-dropdown-menu a:focus-visible {
        outline: 2px solid rgb(30, 58, 138);
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      /* Ensure focus is visible in high contrast mode */
      @media (prefers-contrast: high) {
        .hs-dropdown button:focus-visible,
        .hs-dropdown-menu a:focus-visible {
          outline: 3px solid;
          outline-offset: 2px;
        }
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .hs-dropdown-menu {
          transition: none !important;
        }
        
        .hs-dropdown button svg {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup screen reader support
   */
  setupScreenReaderSupport() {
    // Add live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'navigation-announcements';
    document.body.appendChild(liveRegion);

    // Announce dropdown state changes
    this.dropdowns.forEach(dropdown => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isOpen = dropdown.element.classList.contains('hs-dropdown-open');
            if (isOpen && this.isKeyboardNavigation) {
              this.announceToScreenReader(
                `${dropdown.trigger.textContent.trim()} menu opened. Use arrow keys to navigate, Enter to select, Escape to close.`
              );
            }
          }
        });
      });

      observer.observe(dropdown.element, { attributes: true, attributeFilter: ['class'] });
    });
  }

  /**
   * Setup mobile accessibility enhancements
   */
  setupMobileAccessibility() {
    // Enhance touch targets for mobile
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
      @media (max-width: 767px) {
        /* Ensure minimum touch target size */
        .hs-dropdown button,
        .hs-dropdown-menu a {
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
        }
        
        /* Improve spacing for touch */
        .hs-dropdown-menu a {
          padding: 12px 16px;
          margin: 2px 0;
        }
        
        /* Enhance focus for touch devices */
        .hs-dropdown button:focus,
        .hs-dropdown-menu a:focus {
          background-color: rgba(30, 58, 138, 0.1);
          outline: 2px solid rgb(30, 58, 138);
        }
      }
    `;
    document.head.appendChild(mobileStyle);
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('navigation-announcements');
    if (liveRegion) {
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Close all open dropdowns
   */
  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      if (dropdown.isOpen) {
        dropdown.trigger.click();
      }
    });
  }

  /**
   * Observe navigation changes and reinitialize if needed
   */
  observeNavigationChanges() {
    const navigationContainer = document.querySelector('nav[aria-label="Global"]');
    if (!navigationContainer) return;

    const observer = new MutationObserver((mutations) => {
      let shouldReinit = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if dropdown elements were added or removed
          const addedDropdowns = Array.from(mutation.addedNodes)
            .filter(node => node.nodeType === 1)
            .some(node => node.classList?.contains('hs-dropdown') || node.querySelector?.('.hs-dropdown'));
          
          const removedDropdowns = Array.from(mutation.removedNodes)
            .filter(node => node.nodeType === 1)
            .some(node => node.classList?.contains('hs-dropdown') || node.querySelector?.('.hs-dropdown'));
          
          if (addedDropdowns || removedDropdowns) {
            shouldReinit = true;
          }
        }
      });
      
      if (shouldReinit) {
        // Debounce reinitializations
        clearTimeout(this.reinitTimeout);
        this.reinitTimeout = setTimeout(() => {
          this.reinitialize();
        }, 100);
      }
    });

    observer.observe(navigationContainer, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Reinitialize accessibility enhancements
   */
  reinitialize() {
    // Clear existing dropdowns
    this.dropdowns = [];
    
    // Reinitialize
    this.setupDropdowns();
  }

  /**
   * Test accessibility features (for development)
   */
  testAccessibility() {
    console.log('🔍 Testing Navigation Accessibility...');
    
    const results = {
      dropdowns: this.dropdowns.length,
      issues: []
    };

    this.dropdowns.forEach((dropdown, index) => {
      const { trigger, menu, menuItems } = dropdown;
      
      // Test trigger accessibility
      if (!trigger.hasAttribute('aria-expanded')) {
        results.issues.push(`Dropdown ${index}: Missing aria-expanded on trigger`);
      }
      
      if (!trigger.hasAttribute('aria-controls')) {
        results.issues.push(`Dropdown ${index}: Missing aria-controls on trigger`);
      }
      
      // Test menu accessibility
      if (!menu.hasAttribute('role')) {
        results.issues.push(`Dropdown ${index}: Missing role on menu`);
      }
      
      // Test menu items
      menuItems.forEach((item, itemIndex) => {
        if (!item.hasAttribute('role')) {
          results.issues.push(`Dropdown ${index}, Item ${itemIndex}: Missing role`);
        }
        
        if (!item.hasAttribute('tabindex')) {
          results.issues.push(`Dropdown ${index}, Item ${itemIndex}: Missing tabindex`);
        }
      });
    });

    console.log('📊 Accessibility Test Results:', results);
    
    if (results.issues.length === 0) {
      console.log('✅ All accessibility tests passed!');
    } else {
      console.warn('⚠️ Accessibility issues found:', results.issues);
    }
    
    return results;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.navigationAccessibility = new NavigationAccessibility();
  });
} else {
  window.navigationAccessibility = new NavigationAccessibility();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationAccessibility;
}