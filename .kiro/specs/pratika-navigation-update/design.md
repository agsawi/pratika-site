# Design Document

## Overview

This design outlines the implementation of Pratika's new navigation structure, replacing the current generic navigation with a comprehensive menu system that includes both simple dropdowns and mega menus. The design leverages the existing Astro project architecture and Preline UI components while introducing new navigation data structures and components specific to Pratika's business organization.

## Architecture

### Navigation Data Structure

The navigation will be restructured to support hierarchical menu items with different dropdown types:

- **Simple Dropdowns**: For "Sobre a Pratika", "Diferenciais", and "Contato" sections
- **Mega Menus**: For "Serviços" and "Segmentos Atendidos" sections with rich content display
- **Standard Links**: For "Blog" 
- **CTA Button**: For "Solicitar Orçamento" with distinct styling

### Component Hierarchy

```
NavbarMegaMenu.astro (main navigation component)
├── BrandLogo.astro
├── PratikaDropdownLink.astro (new - for simple dropdowns)
├── PratikaMegaMenuLink.astro (new - for services mega menu)
├── PratikaSegmentsMegaMenuLink.astro (new - for segments mega menu)
├── NavLink.astro (existing - for simple links)
├── PratikaCTAButton.astro (new - for quote request)
└── ThemeIcon.astro
```

**Removed Components:**
- `Authentication.astro` - Login functionality removed from navigation
- `LanguagePicker.astro` - Language selector removed from navigation

## Components and Interfaces

### 1. Navigation Data Structure (`src/utils/navigation.ts`)

```typescript
interface DropdownItem {
  name: string;
  url: string;
}

interface MegaMenuItem {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

interface NavBarItem {
  name: string;
  url: string;
  type: 'link' | 'dropdown' | 'megamenu' | 'cta';
  items?: DropdownItem[] | MegaMenuItem[];
}

const navBarLinks: NavBarItem[] = [
  {
    name: "Sobre a Pratika",
    url: "/sobre-nos",
    type: "dropdown",
    items: [
      { name: "Conheça a Prátika", url: "/sobre-nos" },
      { name: "Compromisso ESG", url: "/esg" },
      { name: "Ética e Compliance", url: "/etica-e-compliance" }
    ]
  },
  // ... other items
];
```

### 2. PratikaDropdownLink Component

A new component for simple dropdown menus that will handle:
- Hover/click interactions using Preline UI dropdown functionality
- Accessibility features (ARIA labels, keyboard navigation)
- Responsive behavior for mobile devices
- Consistent styling with the existing design system

**Key Features:**
- Uses `hs-dropdown` classes from Preline UI
- Supports both hover (desktop) and click (mobile) interactions
- Includes proper ARIA attributes for accessibility
- Maintains visual consistency with existing navigation

### 3. PratikaMegaMenuLink Components

Two specialized mega menu components:

#### PratikaServicesMegaMenuLink
- Grid layout displaying services in organized columns
- Icon support for each service category
- Hover effects and visual feedback
- Responsive grid that adapts to screen size

#### PratikaSegmentsMegaMenuLink  
- Similar structure to services but optimized for market segments
- Industry-specific iconography
- Organized presentation of target markets

### 4. PratikaCTAButton Component

A prominent call-to-action button with:
- Distinct visual styling (brand colors, elevated appearance)
- Hover and focus states
- Responsive sizing
- Accessibility compliance

### 5. Responsive Navigation Container

**NavbarMegaMenu Component Updates:**
- Implement CSS Grid layout for better control over item positioning
- Add responsive breakpoint classes using Tailwind CSS
- Implement overflow handling for smaller screens
- Add mobile menu toggle functionality

**Key Layout Improvements:**
```astro
<!-- Keep existing responsive structure, just optimize spacing -->
<nav class="existing-nav-classes">
  <div class="flex-shrink-0 logo-container">
    <!-- Logo - ensure it doesn't shrink -->
  </div>
  
  <div class="nav-items-container">
    <!-- Apply spacing fixes to existing navigation items -->
    <!-- Use CSS clamp() for fluid spacing -->
    <!-- Add text truncation for long menu items -->
  </div>
</nav>
```

### 6. Dropdown Positioning System

**Enhanced Dropdown Components:**
- Use Preline UI's positioning system with custom adjustments
- Implement proper z-index management
- Add viewport boundary detection to prevent off-screen dropdowns
- Use CSS transforms for smooth animations

**Positioning Strategy:**
```css
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  min-width: max-content;
  z-index: 50;
}

.mega-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  z-index: 50;
}
```

## Data Models

### Navigation Configuration

```typescript
// src/data_files/pratika_navigation.ts
export const pratikaServicesData = [
  {
    name: "Limpeza e Conservação Ambiental",
    url: "/servicos/limpeza-e-conservacao",
    description: "Serviços completos de limpeza e manutenção ambiental",
    icon: "cleaning"
  },
  // ... other services
];

export const pratikaSegmentsData = [
  {
    name: "Indústria", 
    url: "/segmentos/industria",
    description: "Soluções especializadas para o setor industrial",
    icon: "industry"
  },
  // ... other segments
];
```

### Icon Requirements

New icons needed for Pratika navigation:
- Service category icons (cleaning, security, maintenance, etc.)
- Industry segment icons (healthcare, education, retail, etc.)
- Dropdown chevron icons
- CTA button icon (optional)

## Error Handling

### Navigation Fallbacks

1. **Missing Data**: If navigation data is unavailable, fall back to basic link structure
2. **Broken Links**: Implement proper 404 handling for navigation URLs
3. **JavaScript Disabled**: Ensure basic navigation functionality without JavaScript
4. **Mobile Compatibility**: Graceful degradation for touch devices

### Accessibility Considerations

1. **Keyboard Navigation**: Full keyboard accessibility for all dropdown menus
2. **Screen Readers**: Proper ARIA labels and structure
3. **Focus Management**: Clear focus indicators and logical tab order
4. **Color Contrast**: Ensure WCAG AA compliance for all navigation elements

## Testing Strategy

### Component Testing

1. **Unit Tests**: Test individual navigation components
   - Dropdown functionality
   - Mega menu interactions
   - CTA button behavior
   - Responsive behavior

2. **Integration Tests**: Test navigation within full page context
   - Navigation state management
   - Route transitions
   - Mobile menu functionality

### Accessibility Testing

1. **Automated Testing**: Use accessibility testing tools
2. **Manual Testing**: Keyboard navigation and screen reader testing
3. **Cross-browser Testing**: Ensure compatibility across major browsers

### Responsive Testing

1. **Mobile Devices**: Test on various mobile screen sizes
2. **Tablet Devices**: Ensure proper touch interactions
3. **Desktop**: Verify hover states and mega menu layouts

## Implementation Phases

### Phase 1: Data Structure and Basic Components
- Update navigation data structure
- Create basic dropdown component
- Implement simple navigation items

### Phase 2: Mega Menu Implementation  
- Create services mega menu component
- Create segments mega menu component
- Implement responsive grid layouts

### Phase 3: Styling and Polish
- Implement CTA button component
- Add icons and visual enhancements
- Responsive optimization

### Phase 4: Testing and Accessibility
- Comprehensive testing across devices
- Accessibility compliance verification
- Performance optimization

## Responsive Layout Solutions

### Dropdown Alignment Issues

**Problem**: Simple dropdowns are not properly aligned with their trigger buttons.

**Solution**: 
- Use CSS positioning with `left: 0` or `right: 0` relative to the parent button
- Implement proper z-index stacking to ensure dropdowns appear above other content
- Use Preline UI's positioning utilities: `hs-dropdown-menu` with `absolute` positioning
- Add `transform-origin` for smooth animations that maintain alignment

```css
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  z-index: 1000;
}
```

### Screen Size Responsive Issues

**Problem 1**: At < 1215px, "Sobre a Pratika" goes under the logo
**Solution**: 
- Adjust navigation container spacing and flex properties within existing layout
- Reduce horizontal padding/margins on navigation items at this breakpoint
- Ensure proper `flex-shrink` values to prevent overflow
- Use `min-width: 0` on flex items to allow text truncation

**Problem 2**: Between 768px-1215px, menu items overlap with logo
**Solution**:
- Fine-tune existing navigation spacing without changing breakpoint system
- Adjust font-size slightly within the current responsive classes
- Optimize padding and margins on navigation items
- Ensure logo container has proper `flex-shrink: 0`

**Problem 3**: At ~1280px, menu items use more than 2 lines
**Solution**:
- Add `line-clamp: 2` CSS property to navigation text
- Implement `white-space: nowrap` where appropriate
- Adjust existing padding/margins to provide more horizontal space
- Use CSS `text-overflow: ellipsis` for graceful text truncation

### Navigation Layout Fixes

```css
/* Fix navigation spacing without changing breakpoints */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 2rem); /* Fluid spacing */
}

.nav-items {
  display: flex;
  align-items: center;
  gap: clamp(0.25rem, 1.5vw, 1.5rem); /* Responsive gap */
  flex-wrap: nowrap;
  overflow: hidden;
}

.nav-item {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 12rem; /* Prevent excessive width */
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.logo-container {
  flex-shrink: 0; /* Prevent logo from shrinking */
  min-width: fit-content;
}
```

## Technical Considerations

### Performance
- Lazy loading for mega menu content
- Optimized icon loading
- Minimal JavaScript for interactions
- CSS-only solutions for responsive behavior where possible

### SEO Impact
- Maintain proper link structure for crawlers
- Ensure all navigation URLs are discoverable
- Implement proper internal linking structure

### Maintenance
- Centralized navigation configuration
- Easy content updates through data files
- Clear component documentation
- Responsive utilities using Tailwind CSS classes

### Cross-browser Compatibility
- Fallbacks for CSS Grid and Flexbox
- Vendor prefixes for line-clamp functionality
- Progressive enhancement for advanced CSS features

## Scope and Theme Impact

### What This Spec Changes
This specification **only** modifies the navigation structure and content:

1. **Navigation Content**: Replaces generic menu items with Pratika-specific business navigation
2. **Navigation Components**: Adds new Pratika dropdown and mega menu components
3. **Layout Fixes**: Addresses specific spacing and alignment issues in the navigation bar
4. **Removed Features**: Language picker and authentication components from navigation

### What This Spec Does NOT Change
This specification **preserves** the existing theme and design system:

1. **Theme Colors**: All existing brand colors and design tokens remain unchanged
2. **Responsive System**: Existing breakpoints and responsive behavior are maintained
3. **UI Framework**: Continues using Preline UI components and patterns
4. **Other Components**: No changes to layouts, pages, or other theme components
5. **Design System**: All existing typography, spacing, and component patterns remain intact

### Navigation Layout Fixes Only
The responsive fixes target **only** navigation-specific issues:
- Dropdown alignment problems
- Menu item overflow at specific screen sizes  
- Text wrapping in navigation items
- Logo and menu item spacing conflicts

These fixes use CSS adjustments within the existing design system without modifying the theme's core responsive strategy.