# Navigation Accessibility Implementation

This document describes the comprehensive accessibility implementation for Pratika's navigation components, ensuring WCAG 2.1 AA compliance and excellent user experience for all users, including those using assistive technologies.

## Overview

The navigation accessibility implementation includes:

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Comprehensive ARIA attributes and live regions
- **Focus Management**: Proper focus order and visual indicators
- **Mobile Accessibility**: Touch-friendly interactions and responsive design
- **Semantic Structure**: Proper HTML landmarks and roles

## Components Enhanced

### 1. PratikaDropdownLink.astro
Simple dropdown menus for navigation items like "Sobre a Pratika", "Diferenciais", and "Contato".

**Accessibility Features:**
- `aria-expanded` state management
- `aria-haspopup="menu"` for screen readers
- `aria-label` for descriptive button labels
- `role="menu"` and `role="menuitem"` for semantic structure
- Proper `tabindex` management for keyboard navigation

### 2. PratikaServicesMegaMenuLink.astro
Mega menu for services with rich content display.

**Accessibility Features:**
- Complex menu structure with proper ARIA relationships
- Descriptive `aria-label` combining service name and description
- Grid layout accessible to screen readers
- Icon elements hidden with `aria-hidden="true"`

### 3. PratikaSegmentsMegaMenuLink.astro
Mega menu for market segments with industry-specific content.

**Accessibility Features:**
- Similar structure to services mega menu
- Industry-specific descriptive labels
- Responsive grid layout with accessibility considerations

### 4. NavbarMegaMenu.astro
Main navigation container with global accessibility features.

**Accessibility Features:**
- Skip navigation link for keyboard users
- Navigation landmark with `aria-label="Global"`
- Mobile menu toggle with proper ARIA attributes
- Live region for screen reader announcements

## Keyboard Navigation

### Supported Key Interactions

| Key | Action |
|-----|--------|
| `Tab` | Navigate between dropdown triggers |
| `Enter` / `Space` | Open dropdown menu |
| `Arrow Down` | Open menu and focus first item, or move to next item |
| `Arrow Up` | Open menu and focus last item, or move to previous item |
| `Home` | Focus first menu item |
| `End` | Focus last menu item |
| `Escape` | Close menu and return focus to trigger |
| `Tab` (in menu) | Close menu and move to next focusable element |

### Focus Management

- **Initial State**: First menu item has `tabindex="0"`, others have `tabindex="-1"`
- **Active State**: Currently focused item has `tabindex="0"`, others have `tabindex="-1"`
- **Visual Focus**: Clear focus indicators with 2px outline and offset
- **Focus Trap**: Focus remains within dropdown when open

## ARIA Implementation

### Dropdown Triggers
```html
<button
  type="button"
  aria-expanded="false"
  aria-haspopup="menu"
  aria-label="Menu name menu"
  data-hs-dropdown-toggle
>
```

### Dropdown Menus
```html
<div
  class="hs-dropdown-menu"
  role="menu"
  aria-orientation="vertical"
  aria-label="Menu name submenu"
>
```

### Menu Items
```html
<a
  href="/url"
  role="menuitem"
  tabindex="-1"
  aria-label="Item name. Item description"
>
```

## Screen Reader Support

### Live Regions
A live region announces dropdown state changes:
```html
<div 
  id="navigation-announcements" 
  aria-live="polite" 
  aria-atomic="true" 
  class="sr-only"
></div>
```

### Announcements
- Menu opened: "Menu name menu opened. Use arrow keys to navigate, Enter to select, Escape to close."
- State changes are announced automatically

### Semantic Structure
- Navigation landmark: `<nav aria-label="Global">`
- Skip link: `<a href="#main-content">Pular para o conteúdo principal</a>`
- Proper heading hierarchy maintained

## Mobile Accessibility

### Touch Targets
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Enhanced focus styles for touch devices

### Responsive Behavior
- Dropdowns adapt to mobile screen sizes
- Touch-friendly interactions
- Proper mobile menu toggle with ARIA support

### CSS Enhancements
```css
@media (max-width: 767px) {
  .hs-dropdown button,
  .hs-dropdown-menu a {
    min-height: 44px;
    padding: 12px 16px;
  }
}
```

## JavaScript Enhancement

### NavigationAccessibility Class
The `navigation-accessibility.js` script provides:

- **Automatic Enhancement**: Scans and enhances existing dropdowns
- **Event Handling**: Keyboard and mouse event management
- **State Management**: ARIA attribute updates
- **Focus Control**: Programmatic focus management
- **Announcements**: Screen reader notifications

### Key Methods
- `setupDropdowns()`: Initialize dropdown accessibility
- `handleTriggerKeydown()`: Process trigger keyboard events
- `handleMenuKeydown()`: Process menu keyboard events
- `updateDropdownState()`: Manage ARIA states
- `announceToScreenReader()`: Send announcements to live region

## Testing and Validation

### Automated Testing
Run the accessibility validation script:
```bash
node scripts/validate-navigation-accessibility.mjs
```

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab through all navigation elements
- [ ] Open dropdowns with Enter/Space/Arrow keys
- [ ] Navigate menu items with arrow keys
- [ ] Close menus with Escape
- [ ] Verify focus is visible and logical

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS)
- [ ] Verify announcements are clear
- [ ] Check menu structure is understandable

#### Mobile Testing
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify touch targets are adequate
- [ ] Check mobile menu functionality

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## WCAG 2.1 AA Compliance

### Principle 1: Perceivable
- ✅ **1.3.1 Info and Relationships**: Proper semantic structure with ARIA
- ✅ **1.4.1 Use of Color**: Focus indicators don't rely solely on color
- ✅ **1.4.3 Contrast**: Focus indicators meet contrast requirements

### Principle 2: Operable
- ✅ **2.1.1 Keyboard**: All functionality available via keyboard
- ✅ **2.1.2 No Keyboard Trap**: Users can navigate away from dropdowns
- ✅ **2.4.3 Focus Order**: Logical focus sequence
- ✅ **2.4.7 Focus Visible**: Clear focus indicators

### Principle 3: Understandable
- ✅ **3.2.1 On Focus**: No unexpected context changes on focus
- ✅ **3.2.2 On Input**: No unexpected context changes on input

### Principle 4: Robust
- ✅ **4.1.2 Name, Role, Value**: Proper ARIA implementation
- ✅ **4.1.3 Status Messages**: Live region announcements

## Performance Considerations

### Lazy Loading
- Accessibility script loads after DOM ready
- Minimal impact on initial page load
- Efficient event delegation

### Memory Management
- Event listeners properly cleaned up
- No memory leaks in dropdown management
- Efficient DOM queries

## Maintenance

### Adding New Dropdowns
1. Follow existing ARIA patterns
2. Include proper `role` and `aria-*` attributes
3. Test keyboard navigation
4. Verify screen reader announcements

### Updating Existing Components
1. Maintain ARIA attribute consistency
2. Test accessibility after changes
3. Run validation script
4. Update documentation if needed

## Troubleshooting

### Common Issues

**Focus not visible:**
- Check CSS focus styles are not overridden
- Verify `focus-visible` classes are applied

**Screen reader not announcing:**
- Check live region is present in DOM
- Verify `aria-live` and `aria-atomic` attributes
- Test announcement timing

**Keyboard navigation not working:**
- Verify event listeners are attached
- Check `tabindex` values are correct
- Test in different browsers

### Debug Mode
Enable debug logging:
```javascript
window.navigationAccessibility.testAccessibility();
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Keyboard Accessibility](https://webaim.org/techniques/keyboard/)

## Support

For accessibility questions or issues:
1. Check this documentation
2. Run the validation script
3. Test with assistive technologies
4. Consult WCAG guidelines
5. Consider user testing with disabled users