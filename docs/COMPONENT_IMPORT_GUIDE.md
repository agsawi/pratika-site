# Component Import Guide

## Importing from Tailwind UI

### Step 1: Copy the HTML
1. Go to Tailwind UI and find your desired component
2. Copy the HTML code
3. Note any JavaScript requirements

### Step 2: Create Astro Component
```bash
node scripts/import-component.js ComponentName category
```

### Step 3: Adapt the Code
1. **Replace static content with props:**
   ```html
   <!-- Before -->
   <h2>Static Title</h2>
   
   <!-- After -->
   <h2>{title}</h2>
   ```

2. **Add TypeScript interfaces:**
   ```typescript
   interface Props {
     title: string;
     items: Array<{
       name: string;
       description: string;
     }>;
   }
   ```

3. **Handle JavaScript:**
   ```astro
   <script>
     // Move any vanilla JS here
     // For Alpine.js, ensure it's loaded
   </script>
   ```

### Step 4: Brand Integration
Replace Tailwind's default colors with your brand colors:
```html
<!-- Before -->
<div class="text-indigo-600 bg-indigo-50">

<!-- After -->
<div class="text-brand-600 bg-brand-50">
```

## Importing from Preline UI

### Step 1: Ensure Preline is Loaded
Check that `MainLayout.astro` includes Preline:
```astro
<script is:inline src="/path/to/preline.js"></script>
```

### Step 2: Copy and Adapt
1. Copy HTML from Preline docs
2. Create component using the helper script
3. Ensure `data-hs-*` attributes are preserved
4. Test interactive functionality

### Step 3: Initialize Components
For dynamic content, you may need to reinitialize:
```astro
<script>
  import { HSStaticMethods } from 'preline';
  
  // Reinitialize after dynamic content loads
  HSStaticMethods.autoInit();
</script>
```

## Common Adaptations

### 1. Props Extraction
```astro
---
interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface Props {
  heading: string;
  subheading?: string;
  features: Feature[];
  variant?: 'default' | 'centered' | 'grid';
}

const { 
  heading,
  subheading,
  features,
  variant = 'default'
} = Astro.props;
---
```

### 2. Conditional Rendering
```astro
{subheading && (
  <p class="text-lg text-gray-600">{subheading}</p>
)}

{features.map((feature) => (
  <div class="feature-item">
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
  </div>
))}
```

### 3. Slot Usage
```astro
<div class="component-wrapper">
  <slot name="header" />
  <div class="content">
    <slot />
  </div>
  <slot name="footer" />
</div>
```

## Testing Checklist

- [ ] Component renders without errors
- [ ] Props work correctly
- [ ] Interactive elements function (for Preline)
- [ ] Responsive design works
- [ ] Brand colors applied
- [ ] Accessibility maintained
- [ ] TypeScript types are correct

## File Organization

```
src/components/sections/
├── features/
│   ├── FeatureGrid.astro
│   ├── FeatureList.astro
│   └── FeatureComparison.astro
├── testimonials/
│   ├── TestimonialCards.astro
│   └── TestimonialSlider.astro
├── pricing/
│   ├── PricingTable.astro
│   └── PricingCards.astro
└── misc/
    ├── CallToAction.astro
    └── Newsletter.astro
```

## Example: Complete Import

### Original Tailwind UI Code:
```html
<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to deploy your app</p>
    </div>
  </div>
</div>
```

### Converted Astro Component:
```astro
---
interface Props {
  eyebrow?: string;
  title: string;
  centered?: boolean;
}

const { 
  eyebrow,
  title,
  centered = true
} = Astro.props;
---

<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class:list={["mx-auto max-w-2xl", { "lg:text-center": centered }]}>
      {eyebrow && (
        <h2 class="text-base font-semibold leading-7 text-brand-600">{eyebrow}</h2>
      )}
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </p>
    </div>
  </div>
</div>
```