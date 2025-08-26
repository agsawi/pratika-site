#!/usr/bin/env node

/**
 * Script to find hardcoded Tailwind color classes in components
 * This helps identify which components need migration to use custom properties
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { glob } from 'glob';

// Common hardcoded color patterns to look for
const colorPatterns = [
  // Yellow colors (often used for accents)
  /\b(bg-yellow-\d+|text-yellow-\d+|border-yellow-\d+|hover:bg-yellow-\d+|hover:text-yellow-\d+)\b/g,
  
  // Red colors (errors)
  /\b(bg-red-\d+|text-red-\d+|border-red-\d+|hover:bg-red-\d+|hover:text-red-\d+)\b/g,
  
  // Blue colors (primary/info)
  /\b(bg-blue-\d+|text-blue-\d+|border-blue-\d+|hover:bg-blue-\d+|hover:text-blue-\d+)\b/g,
  
  // Indigo colors
  /\b(bg-indigo-\d+|text-indigo-\d+|border-indigo-\d+|hover:bg-indigo-\d+|hover:text-indigo-\d+)\b/g,
  
  // Gray colors (neutral)
  /\b(bg-gray-\d+|text-gray-\d+|border-gray-\d+|hover:bg-gray-\d+|hover:text-gray-\d+)\b/g,
  
  // Green colors (success)
  /\b(bg-green-\d+|text-green-\d+|border-green-\d+|hover:bg-green-\d+|hover:text-green-\d+)\b/g,
  
  // Purple colors
  /\b(bg-purple-\d+|text-purple-\d+|border-purple-\d+|hover:bg-purple-\d+|hover:text-purple-\d+)\b/g,
  
  // Orange colors
  /\b(bg-orange-\d+|text-orange-\d+|border-orange-\d+|hover:bg-orange-\d+|hover:text-orange-\d+)\b/g,
];

// Suggested replacements for common patterns
const replacementSuggestions = {
  'text-yellow-500': 'text-accent',
  'text-yellow-400': 'text-accent',
  'bg-yellow-400': 'bg-accent',
  'bg-yellow-500': 'bg-accent',
  'hover:bg-yellow-500': 'hover:bg-accent/90',
  'border-yellow-500': 'border-accent',
  
  'text-red-500': 'text-error',
  'text-red-600': 'text-error',
  'bg-red-500': 'bg-error',
  
  'bg-gray-800': 'bg-surface',
  'bg-gray-100': 'bg-surface',
  'text-gray-800': 'text-foreground',
  'text-gray-600': 'text-muted',
  
  'text-blue-500': 'text-primary',
  'bg-blue-500': 'bg-primary',
  'text-indigo-300': 'text-primary/70',
  
  'text-green-500': 'text-success',
  'bg-green-500': 'bg-success',
};

async function analyzeFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const findings = [];
    
    colorPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const lines = content.split('\n');
          const lineNumber = lines.findIndex(line => line.includes(match)) + 1;
          
          findings.push({
            class: match,
            line: lineNumber,
            suggestion: replacementSuggestions[match] || 'Consider using a semantic class from your visual config'
          });
        });
      }
    });
    
    return findings;
  } catch (error) {
    console.warn(`Warning: Could not analyze ${filePath}:`, error.message);
    return [];
  }
}

async function findHardcodedClasses() {
  console.log('🔍 Scanning for hardcoded Tailwind color classes...\n');
  
  try {
    // Find all .astro files in components
    const astroFiles = await glob('src/components/**/*.astro');
    
    let totalFindings = 0;
    const fileResults = [];
    
    for (const file of astroFiles) {
      const findings = await analyzeFile(file);
      if (findings.length > 0) {
        fileResults.push({ file, findings });
        totalFindings += findings.length;
      }
    }
    
    if (totalFindings === 0) {
      console.log('✅ No hardcoded color classes found! Your components are already using semantic classes.');
      return;
    }
    
    console.log(`Found ${totalFindings} hardcoded color classes in ${fileResults.length} files:\n`);
    
    fileResults.forEach(({ file, findings }) => {
      console.log(`📄 ${file}`);
      findings.forEach(({ class: className, line, suggestion }) => {
        console.log(`   Line ${line}: ${className}`);
        console.log(`   💡 Suggestion: ${suggestion}`);
      });
      console.log('');
    });
    
    console.log('📚 For detailed migration guidance, see: docs/hardcoded-classes-migration.md');
    console.log('🔧 To automatically migrate common patterns, create a migration script based on the guide.');
    
  } catch (error) {
    console.error('❌ Error scanning files:', error);
    process.exit(1);
  }
}

// Run the analysis
findHardcodedClasses().catch((error) => {
  console.error('Failed to analyze files:', error);
  process.exit(1);
});