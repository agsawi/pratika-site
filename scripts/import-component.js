#!/usr/bin/env node

/**
 * Helper script to create new component files from external blocks
 * Usage: node scripts/import-component.js <component-name> <category>
 */

import fs from 'fs';
import path from 'path';

const [,, componentName, category = 'misc'] = process.argv;

if (!componentName) {
  console.error('Usage: node scripts/import-component.js <component-name> <category>');
  console.error('Example: node scripts/import-component.js FeatureGrid features');
  process.exit(1);
}

const componentPath = `src/components/sections/${category}/${componentName}.astro`;

const template = `---
// ${componentName} Component
// Imported from: [SOURCE_URL]
// Date: ${new Date().toISOString().split('T')[0]}

interface Props {
  // Define your props here
  title?: string;
  subtitle?: string;
}

const { 
  title = "Default Title",
  subtitle = "Default Subtitle"
} = Astro.props;
---

<!-- 
  TODO: Paste your HTML from Tailwind UI or Preline here
  Remember to:
  1. Replace static text with {props}
  2. Convert class names if needed
  3. Move any <script> tags to the bottom
-->

<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900">
      {title}
    </h2>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      {subtitle}
    </p>
  </div>
</div>

<script>
  // Add any JavaScript here
  // For Preline components, ensure HSStaticMethods is available
</script>

<style>
  /* Add any custom styles here if needed */
</style>
`;

// Ensure directory exists
const dir = path.dirname(componentPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create the component file
fs.writeFileSync(componentPath, template);

console.log(`✅ Created component: ${componentPath}`);
console.log(`📝 Next steps:`);
console.log(`   1. Open the file and paste your HTML`);
console.log(`   2. Replace static content with props`);
console.log(`   3. Test the component in a page`);
console.log(`   4. Update the source URL comment`);