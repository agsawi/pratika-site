/**
 * Mobile Navigation Enhancement Script
 * Enhances Pratika navigation components for better mobile experience
 * Handles touch interactions, accessibility, and mobile-specific behaviors
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile navigation enhancements
  initMobileNavigation();
  
  // Re-initialize when navigation is dynamically updated
  document.addEventListener('astro:page-load', initMobileNavigation);
});

function initMobileNavigation() {
  // Enhance dropdown interactions for mobile
  enhanceDropdownInteractions();
  
  // Improve touch interactions
  improveTouchInteractions();
  
  // Handle mobile menu collapse behavior
  handleMobileMenuCollapse();
  
  // Enhance keyboard navigation
  enhanceKeyboardNavigation();
}

function enhanceDropdownInteractions() {
  const dropdowns = document.querySelectorAll('.hs-dropdown');
  
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button[data-hs-dropdown-toggle]');
    const menu = dropdown.querySelector('.hs-dropdown-menu');
    
    if (!button || !menu) return;
    
    // Add mobile-specific event listeners
    button.addEventListener('click', function(e) {
      // On mobile, ensure click behavior works properly
      if (window.innerWidth < 768) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = dropdown.classList.contains('hs-dropdown-open');
        
        // Close all other dropdowns first
        closeAllDropdowns();
        
        if (!isOpen) {
          openDropdown(dropdown);
        }
      }
    });
    
    // Handle touch events for better mobile experience
    button.addEventListener('touchstart', function(e) {
      if (window.innerWidth < 768) {
        // Add visual feedback for touch
        button.classList.add('touch-active');
        setTimeout(() => button.classList.remove('touch-active'), 150);
      }
    });
  });
}

function improveTouchInteractions() {
  // Add touch-friendly styles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      .hs-dropdown button {
        min-height: 44px;
        touch-action: manipulation;
      }
      
      .hs-dropdown-menu a {
        min-height: 44px;
        display: flex;
        align-items: center;
        touch-action: manipulation;
      }
      
      .touch-active {
        background-color: rgba(0, 0, 0, 0.05) !important;
      }
      
      .dark .touch-active {
        background-color: rgba(255, 255, 255, 0.05) !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function handleMobileMenuCollapse() {
  const collapseToggle = document.querySelector('.hs-collapse-toggle');
  const collapseMenu = document.querySelector('#navbar-collapse-with-animation');
  
  if (!collapseToggle || !collapseMenu) return;
  
  // Close dropdowns when mobile menu is closed
  collapseToggle.addEventListener('click', function() {
    setTimeout(() => {
      if (!collapseMenu.classList.contains('hs-collapse-open')) {
        closeAllDropdowns();
      }
    }, 100);
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 768) {
      const isClickInsideNav = e.target.closest('nav');
      const isCollapseOpen = collapseMenu.classList.contains('hs-collapse-open');
      
      if (!isClickInsideNav && isCollapseOpen) {
        collapseToggle.click();
      }
    }
  });
}

function enhanceKeyboardNavigation() {
  const dropdowns = document.querySelectorAll('.hs-dropdown');
  
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button[data-hs-dropdown-toggle]');
    const menu = dropdown.querySelector('.hs-dropdown-menu');
    const menuItems = menu ? menu.querySelectorAll('a[role="menuitem"]') : [];
    
    if (!button || !menu) return;
    
    // Handle keyboard navigation
    button.addEventListener('keydown', function(e) {
      switch(e.key) {
        case 'ArrowDown':
        case 'Enter':
        case ' ':
          e.preventDefault();
          openDropdown(dropdown);
          if (menuItems.length > 0) {
            menuItems[0].focus();
          }
          break;
        case 'Escape':
          closeDropdown(dropdown);
          button.focus();
          break;
      }
    });
    
    // Handle menu item navigation
    menuItems.forEach((item, index) => {
      item.addEventListener('keydown', function(e) {
        switch(e.key) {
          case 'ArrowDown':
            e.preventDefault();
            const nextIndex = (index + 1) % menuItems.length;
            menuItems[nextIndex].focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
            menuItems[prevIndex].focus();
            break;
          case 'Escape':
            e.preventDefault();
            closeDropdown(dropdown);
            button.focus();
            break;
          case 'Tab':
            // Allow natural tab behavior but close dropdown
            closeDropdown(dropdown);
            break;
        }
      });
    });
  });
}

function openDropdown(dropdown) {
  const button = dropdown.querySelector('button[data-hs-dropdown-toggle]');
  const menu = dropdown.querySelector('.hs-dropdown-menu');
  
  if (!button || !menu) return;
  
  dropdown.classList.add('hs-dropdown-open');
  menu.classList.remove('hidden');
  menu.classList.add('opacity-100');
  button.setAttribute('aria-expanded', 'true');
  
  // Set focus trap for accessibility
  const menuItems = menu.querySelectorAll('a[role="menuitem"]');
  menuItems.forEach(item => item.setAttribute('tabindex', '0'));
}

function closeDropdown(dropdown) {
  const button = dropdown.querySelector('button[data-hs-dropdown-toggle]');
  const menu = dropdown.querySelector('.hs-dropdown-menu');
  
  if (!button || !menu) return;
  
  dropdown.classList.remove('hs-dropdown-open');
  menu.classList.add('hidden');
  menu.classList.remove('opacity-100');
  button.setAttribute('aria-expanded', 'false');
  
  // Remove focus trap
  const menuItems = menu.querySelectorAll('a[role="menuitem"]');
  menuItems.forEach(item => item.setAttribute('tabindex', '-1'));
}

function closeAllDropdowns() {
  const openDropdowns = document.querySelectorAll('.hs-dropdown.hs-dropdown-open');
  openDropdowns.forEach(closeDropdown);
}

// Handle window resize to ensure proper behavior
window.addEventListener('resize', function() {
  // Close all dropdowns on resize to prevent layout issues
  closeAllDropdowns();
});

// Export functions for potential external use
window.PratikaMobileNav = {
  openDropdown,
  closeDropdown,
  closeAllDropdowns
};