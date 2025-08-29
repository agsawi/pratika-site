# Implementation Plan

- [x] 1. Create Pratika navigation data structure





  - Create new data file `src/data_files/pratika_navigation.ts` with complete navigation structure
  - Define TypeScript interfaces for navigation items, dropdown items, and mega menu items
  - Include all Pratika menu items with correct URLs and hierarchical structure
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1_
-

- [x] 2. Update main navigation configuration




  - Modify `src/utils/navigation.ts` to use Pratika navigation structure
  - Replace existing navBarLinks with Pratika-specific menu items
  - Remove language picker and authentication references from navigation exports
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 3. Create PratikaDropdownLink component for simple dropdowns





  - Create `src/components/ui/links/PratikaDropdownLink.astro` component
  - Implement dropdown functionality using Preline UI hs-dropdown classes
  - Add proper ARIA attributes and keyboard navigation support
  - Style component to match existing navigation design
  - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3_


- [x] 4. Create services mega menu component
  - Create `src/components/ui/links/PratikaServicesMegaMenuLink.astro` component
  - Implement grid layout for services display using existing mega menu pattern
  - Add service icons and descriptions
  - Ensure responsive behavior for different screen sizes
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 5. Create segments mega menu component

  - Create `src/components/ui/links/PratikaSegmentsMegaMenuLink.astro` component
  - Implement grid layout for market segments display
  - Add segment icons and descriptions
  - Ensure responsive behavior for different screen sizes
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 6. Create CTA button component
  - Create `src/components/ui/buttons/PratikaCTAButton.astro` component
  - Implement distinct styling for "Solicitar Orçamento" button
  - Add hover and focus states with proper accessibility
  - Ensure responsive sizing and positioning
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 7. Update NavbarMegaMenu component





  - Modify `src/components/sections/navbar&footer/NavbarMegaMenu.astro` to use new Pratika components
  - Remove Authentication and LanguagePicker components from navigation
  - Integrate new dropdown and mega menu components
  - Update navigation logic to handle different menu types
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 8. Add required icons for navigation
  - Add service category icons to `src/components/ui/icons/icons.ts`
  - Add market segment icons to icon collection
  - Add dropdown chevron icons if not already present
  - Ensure all icons follow existing icon system patterns
  - _Requirements: 2.1, 3.1, 4.1, 5.1, 6.1_

- [x] 9. Fix dropdown alignment issues
  - Update dropdown positioning CSS to align dropdowns properly with trigger buttons
  - Implement proper z-index stacking for dropdown menus
  - Use CSS transforms and positioning for consistent alignment across components
  - Test dropdown positioning across different screen sizes
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 10. Fix responsive layout overflow issues





  - Adjust navigation container spacing to prevent menu items from overlapping logo at < 1215px
  - Optimize navigation item spacing for screens between 768px-1215px
  - Implement text truncation (max 2 lines) for menu items at ~1280px screen width
  - Use CSS clamp() for fluid spacing without changing existing breakpoints
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 11. Implement mobile navigation support





  - Update mobile menu functionality to support new dropdown structure
  - Ensure mega menus work properly on mobile devices
  - Test touch interactions for all navigation elements
  - Verify mobile menu accessibility
  - _Requirements: 8.1, 8.2_

- [x] 10. Add keyboard and screen reader accessibility





  - Implement proper keyboard navigation for all dropdown menus
  - Add comprehensive ARIA labels and structure
  - Ensure proper focus management and tab order
  - Test with screen readers for navigation accessibility
  - _Requirements: 8.3, 8.4_

- [x] 11. Update MainLayout to use new navigation





  - Modify layout files to use updated NavbarMegaMenu component
  - Ensure navigation works correctly across all page templates
  - Remove any references to removed authentication/language picker components
  - _Requirements: 1.1, 1.2, 1.3_
-

- [ ] 12. Create comprehensive navigation tests




  - Write unit tests for new dropdown and mega menu components
  - Test navigation functionality across different screen sizes
  - Verify all navigation URLs are accessible and functional
  - Test keyboard navigation and accessibility features
  - Test dropdown alignment and responsive layout fixes
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 9.1, 9.2, 9.3, 10.1, 10.2, 10.3, 10.4_