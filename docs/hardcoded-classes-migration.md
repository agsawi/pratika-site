# Hardcoded Classes Migration Guide - Revised Strategy

This document tracks the migration from hardcoded Tailwind color classes to custom CSS variables for the visual system integration.

## Revised Strategy: Focus on Brand Colors Only

After review, we should **keep neutral colors as-is** since they are Tailwind's semantic defaults and work well with the existing dark mode system. Instead, we should focus on replacing **brand-specific colors** that should be customizable through the visual system.

### Colors to Keep (Neutral/Semantic)
- `bg-neutral-*`, `text-neutral-*`, `border-neutral-*` - These are semantic and should remain
- `bg-gray-*`, `text-gray-*`, `border-gray-*` - Default Tailwind grays, keep as-is
- `bg-zinc-*`, `text-zinc-*`, `border-zinc-*` - Default Tailwind zinc, keep as-is

### Colors to Replace (Brand-Specific)
- `text-orange-400`, `text-orange-300` → `text-[var(--color-secondary)]`
- `hover:text-orange-400` → `hover:text-[var(--color-secondary)]`
- `bg-orange-*` (when used for brand colors) → `bg-[var(--color-secondary)]`
- `text-indigo-*` (when used for brand colors) → `text-[var(--color-primary)]`
- `bg-indigo-*` (when used for brand colors) → `bg-[var(--color-primary)]`
- `text-yellow-500` (for warnings) → `text-[var(--color-warning)]`
- `text-red-*` (for errors) → `text-[var(--color-error)]`
- `text-green-*` (for success) → `text-[var(--color-success)]`

### Focus Ring Colors
- `ring-zinc-500` → `ring-[var(--color-primary)]` (for focus states)
- `ring-orange-*` → `ring-[var(--color-secondary)]`
- `ring-indigo-*` → `ring-[var(--color-primary)]`

## Target Components for Brand Color Migration

### High Priority (Brand Colors)
1. **Navigation active states** - Orange highlights for active nav items
2. **Button hover/focus states** - Brand color interactions
3. **Link colors** - Secondary brand color for links
4. **Focus rings** - Primary brand color for focus indicators
5. **Star ratings** - Warning color for stars
6. **Error/Success states** - Semantic state colors

### Medium Priority (Accent Colors)
1. **Theme toggle hover states** - Secondary brand color
2. **Form focus states** - Primary brand color for input focus
3. **Modal accent elements** - Brand colors for CTAs

### Low Priority (Keep as Neutral)
1. **Background colors** - Keep neutral backgrounds
2. **Text colors** - Keep neutral text colors
3. **Border colors** - Keep neutral borders
4. **Surface colors** - Keep neutral surfaces

## Migration Progress

### Completed Components
- [x] Form inputs (TextInput, EmailInput, PasswordInput, TextAreaInput, PhoneInput)
- [x] Modal components (LoginModal, RegisterModal, RecoverModal)
- [x] Navigation components (NavLink, MegaMenuLink)
- [x] Button components (SecondaryCTA)
- [x] Theme toggle components (ThemeSelect, ThemeSelectMobile)
- [x] Language picker component
- [x] Star rating components (FullStar, HalfStar)
- [x] Footer social links
- [ ] Testimonial components
- [ ] Pricing section components
- [ ] Additional button components (ProductTabBtn, SocialShare)

### Components to Update
1. **Form Components** - High priority (user interaction)
2. **Navigation Components** - High priority (site navigation)
3. **Button Components** - High priority (user actions)
4. **Modal Components** - Medium priority (overlays)
5. **Section Components** - Medium priority (content display)
6. **Utility Components** - Low priority (supporting elements)

## Implementation Notes

- Use Tailwind's arbitrary value syntax: `bg-[var(--color-primary)]`
- Maintain existing hover and focus states with custom variables
- Ensure dark mode compatibility by using the existing dark mode custom variables
- Test all components after migration to ensure visual consistency
- Update any component-specific styling that relies on hardcoded colors

## Testing Checklist

- [ ] Light mode appearance matches original design
- [ ] Dark mode appearance works correctly
- [ ] Hover states function properly
- [ ] Focus states maintain accessibility
- [ ] Color changes in visual-config.json are reflected in components
- [ ] No visual regressions in existing functionality