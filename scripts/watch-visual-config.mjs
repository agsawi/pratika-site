#!/usr/bin/env node

/**
 * Development script to watch for changes to visual-config.json
 * and automatically regenerate CSS during development
 */

import { watch } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const configPath = join(process.cwd(), 'src/config/visual-config.json');

console.log('👀 Watching for changes to visual-config.json...');
console.log('   Changes will automatically regenerate CSS variables');

// Watch for changes to the visual config file
watch(configPath, (eventType, filename) => {
  if (eventType === 'change') {
    console.log('\n🔄 Visual config changed, regenerating CSS...');
    try {
      execSync('node scripts/generate-css-from-config.mjs', { stdio: 'inherit' });
      console.log('✅ CSS regenerated successfully!\n');
    } catch (error) {
      console.error('❌ Error regenerating CSS:', error.message);
    }
  }
});

console.log('Press Ctrl+C to stop watching\n');