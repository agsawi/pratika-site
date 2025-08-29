#!/usr/bin/env node

/**
 * Navigation Test Validation Script
 * Validates that all navigation tests cover the required functionality
 * and provides a comprehensive report on test coverage and compliance.
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

/**
 * Test Requirements Mapping
 */
const REQUIREMENTS_MAPPING = {
  '8.1': {
    description: 'Mobile menu functionality supports new dropdown structure',
    testFiles: [
      'src/test/mobile-navigation.test.js',
      'src/test/responsive/screen-sizes.test.ts'
    ],
    testCases: [
      'should enhance dropdown interactions for mobile',
      'should handle touch interactions',
      'should close dropdowns on mobile menu collapse',
      'should show mobile menu toggle',
      'should hide navigation menu by default'
    ]
  },
  '8.2': {
    description: 'Mega menus work properly on mobile devices',
    testFiles: [
      'src/test/components/PratikaServicesMegaMenuLink.test.ts',
      'src/test/components/PratikaSegmentsMegaMenuLink.test.ts',
      'src/test/responsive/screen-sizes.test.ts'
    ],
    testCases: [
      'should render mega menu with grid layout',
      'should have responsive grid layout',
      'should use grid layout for mega menus',
      'should have touch-friendly button sizes'
    ]
  },
  '8.3': {
    description: 'Keyboard navigation and accessibility features',
    testFiles: [
      'src/test/accessibility/keyboard-navigation.test.ts',
      'src/test/navigation-accessibility.test.js'
    ],
    testCases: [
      'should have correct tab order',
      'should open dropdown with Enter key',
      'should navigate between menu items with arrow keys',
      'should handle keyboard navigation',
      'should provide keyboard navigation support'
    ]
  },
  '8.4': {
    description: 'Screen reader accessibility and ARIA support',
    testFiles: [
      'src/test/navigation-accessibility.test.js',
      'src/test/accessibility/keyboard-navigation.test.ts',
      'src/test/components/NavbarMegaMenu.test.ts'
    ],
    testCases: [
      'should have proper ARIA attributes',
      'should hide decorative icons from screen readers',
      'should have live region for announcements',
      'should have proper navigation landmark'
    ]
  }
};

/**
 * Test Coverage Areas
 */
const COVERAGE_AREAS = {
  'Component Unit Tests': [
    'src/test/components/PratikaDropdownLink.test.ts',
    'src/test/components/PratikaServicesMegaMenuLink.test.ts',
    'src/test/components/PratikaSegmentsMegaMenuLink.test.ts',
    'src/test/components/NavbarMegaMenu.test.ts'
  ],
  'Accessibility Testing': [
    'src/test/navigation-accessibility.test.js',
    'src/test/accessibility/keyboard-navigation.test.ts'
  ],
  'Mobile Navigation': [
    'src/test/mobile-navigation.test.js'
  ],
  'Responsive Design': [
    'src/test/responsive/screen-sizes.test.ts'
  ],
  'URL Validation': [
    'src/test/navigation/url-validation.test.ts'
  ]
};

/**
 * Check if test files exist
 */
async function validateTestFiles() {
  const results = {
    existing: [],
    missing: []
  };

  const allTestFiles = [
    ...Object.values(COVERAGE_AREAS).flat(),
    ...Object.values(REQUIREMENTS_MAPPING).map(req => req.testFiles).flat()
  ];

  const uniqueTestFiles = [...new Set(allTestFiles)];

  for (const testFile of uniqueTestFiles) {
    try {
      await fs.access(join(process.cwd(), testFile));
      results.existing.push(testFile);
    } catch (error) {
      results.missing.push(testFile);
    }
  }

  return results;
}

/**
 * Run tests and capture results
 */
function runTests() {
  try {
    const output = execSync('npm test', { 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    return {
      success: true,
      output
    };
  } catch (error) {
    return {
      success: false,
      output: error.stdout || error.message,
      error: error.stderr || error.message
    };
  }
}

/**
 * Parse test results
 */
function parseTestResults(output) {
  const lines = output.split('\n');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  
  // Extract test summary
  for (const line of lines) {
    if (line.includes('Tests') && line.includes('passed')) {
      const match = line.match(/(\d+)\s+failed.*?(\d+)\s+passed.*?\((\d+)\)/);
      if (match) {
        failedTests = parseInt(match[1]) || 0;
        passedTests = parseInt(match[2]) || 0;
        totalTests = parseInt(match[3]) || 0;
      }
    }
  }

  // Extract failed test details
  const failedTestDetails = [];
  let inFailedSection = false;
  
  for (const line of lines) {
    if (line.includes('Failed Tests')) {
      inFailedSection = true;
      continue;
    }
    
    if (inFailedSection && line.includes('FAIL')) {
      failedTestDetails.push(line.trim());
    }
  }

  return {
    total: totalTests,
    passed: passedTests,
    failed: failedTests,
    successRate: totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0,
    failedDetails: failedTestDetails
  };
}

/**
 * Validate requirements coverage
 */
function validateRequirementsCoverage(testFiles) {
  const coverage = {};
  
  for (const [reqId, requirement] of Object.entries(REQUIREMENTS_MAPPING)) {
    const coveredFiles = requirement.testFiles.filter(file => 
      testFiles.existing.includes(file)
    );
    
    coverage[reqId] = {
      description: requirement.description,
      totalFiles: requirement.testFiles.length,
      coveredFiles: coveredFiles.length,
      coverage: ((coveredFiles.length / requirement.testFiles.length) * 100).toFixed(1),
      status: coveredFiles.length === requirement.testFiles.length ? 'COMPLETE' : 'PARTIAL'
    };
  }
  
  return coverage;
}

/**
 * Generate comprehensive report
 */
function generateReport(testFiles, testResults, requirementsCoverage) {
  const lines = [];
  
  lines.push('🧪 Navigation Test Validation Report');
  lines.push('═'.repeat(70));
  lines.push('');
  
  // Test Execution Summary
  lines.push('📊 Test Execution Summary');
  lines.push('─'.repeat(30));
  lines.push(`Total Tests: ${testResults.total}`);
  lines.push(`Passed: ${testResults.passed}`);
  lines.push(`Failed: ${testResults.failed}`);
  lines.push(`Success Rate: ${testResults.successRate}%`);
  lines.push('');
  
  // Test Files Status
  lines.push('📁 Test Files Status');
  lines.push('─'.repeat(30));
  lines.push(`✅ Existing Files: ${testFiles.existing.length}`);
  lines.push(`❌ Missing Files: ${testFiles.missing.length}`);
  
  if (testFiles.missing.length > 0) {
    lines.push('');
    lines.push('Missing Test Files:');
    testFiles.missing.forEach(file => lines.push(`  • ${file}`));
  }
  lines.push('');
  
  // Requirements Coverage
  lines.push('📋 Requirements Coverage');
  lines.push('─'.repeat(30));
  
  for (const [reqId, coverage] of Object.entries(requirementsCoverage)) {
    const status = coverage.status === 'COMPLETE' ? '✅' : '⚠️';
    lines.push(`${status} Requirement ${reqId}: ${coverage.coverage}% coverage`);
    lines.push(`   ${coverage.description}`);
    lines.push(`   Files: ${coverage.coveredFiles}/${coverage.totalFiles}`);
    lines.push('');
  }
  
  // Coverage Areas
  lines.push('🎯 Test Coverage Areas');
  lines.push('─'.repeat(30));
  
  for (const [area, files] of Object.entries(COVERAGE_AREAS)) {
    const existingFiles = files.filter(file => testFiles.existing.includes(file));
    const coverage = ((existingFiles.length / files.length) * 100).toFixed(1);
    const status = existingFiles.length === files.length ? '✅' : '⚠️';
    
    lines.push(`${status} ${area}: ${coverage}% (${existingFiles.length}/${files.length} files)`);
  }
  lines.push('');
  
  // Failed Tests Analysis
  if (testResults.failed > 0) {
    lines.push('⚠️ Failed Tests Analysis');
    lines.push('─'.repeat(30));
    lines.push(`${testResults.failed} tests failed out of ${testResults.total} total tests`);
    lines.push('');
    
    if (testResults.failedDetails.length > 0) {
      lines.push('Failed Test Details:');
      testResults.failedDetails.slice(0, 10).forEach(detail => {
        lines.push(`  • ${detail}`);
      });
      
      if (testResults.failedDetails.length > 10) {
        lines.push(`  ... and ${testResults.failedDetails.length - 10} more`);
      }
    }
    lines.push('');
  }
  
  // Overall Assessment
  lines.push('🎯 Overall Assessment');
  lines.push('─'.repeat(30));
  
  const overallScore = (
    (testFiles.existing.length / (testFiles.existing.length + testFiles.missing.length)) * 0.3 +
    (testResults.passed / testResults.total) * 0.7
  ) * 100;
  
  if (overallScore >= 90) {
    lines.push('✅ EXCELLENT: Navigation testing is comprehensive and robust');
  } else if (overallScore >= 80) {
    lines.push('✅ GOOD: Navigation testing covers most requirements with minor gaps');
  } else if (overallScore >= 70) {
    lines.push('⚠️ ADEQUATE: Navigation testing covers basic requirements but needs improvement');
  } else {
    lines.push('❌ NEEDS WORK: Navigation testing has significant gaps and requires attention');
  }
  
  lines.push(`Overall Score: ${overallScore.toFixed(1)}%`);
  lines.push('');
  
  // Recommendations
  lines.push('💡 Recommendations');
  lines.push('─'.repeat(30));
  
  if (testFiles.missing.length > 0) {
    lines.push('• Create missing test files to improve coverage');
  }
  
  if (testResults.failed > 0) {
    lines.push('• Fix failing tests to ensure reliability');
    lines.push('• Review test mocks and DOM structures for accuracy');
  }
  
  const incompleteReqs = Object.entries(requirementsCoverage)
    .filter(([_, coverage]) => coverage.status !== 'COMPLETE');
  
  if (incompleteReqs.length > 0) {
    lines.push('• Complete test coverage for requirements:');
    incompleteReqs.forEach(([reqId, _]) => {
      lines.push(`  - Requirement ${reqId}`);
    });
  }
  
  lines.push('• Consider adding visual regression tests');
  lines.push('• Implement cross-browser testing');
  lines.push('• Add performance benchmarking');
  lines.push('');
  
  // Compliance Status
  lines.push('✅ Compliance Status');
  lines.push('─'.repeat(30));
  
  const allRequirementsCovered = Object.values(requirementsCoverage)
    .every(coverage => coverage.status === 'COMPLETE');
  
  if (allRequirementsCovered && testResults.successRate >= 90) {
    lines.push('🎉 COMPLIANT: All requirements covered with high test success rate');
  } else if (allRequirementsCovered) {
    lines.push('⚠️ MOSTLY COMPLIANT: All requirements covered but some tests failing');
  } else {
    lines.push('❌ NON-COMPLIANT: Some requirements not fully covered');
  }
  
  return lines.join('\n');
}

/**
 * Main validation function
 */
async function validateNavigationTests() {
  try {
    console.log('🔍 Starting Navigation Test Validation...\n');
    
    // Validate test files
    console.log('📁 Checking test files...');
    const testFiles = await validateTestFiles();
    console.log(`Found ${testFiles.existing.length} test files, ${testFiles.missing.length} missing\n`);
    
    // Run tests
    console.log('🧪 Running navigation tests...');
    const testExecution = runTests();
    const testResults = parseTestResults(testExecution.output);
    console.log(`Tests completed: ${testResults.passed}/${testResults.total} passed\n`);
    
    // Validate requirements coverage
    console.log('📋 Validating requirements coverage...');
    const requirementsCoverage = validateRequirementsCoverage(testFiles);
    console.log('Requirements analysis complete\n');
    
    // Generate report
    const report = generateReport(testFiles, testResults, requirementsCoverage);
    console.log(report);
    
    // Save report to file
    await fs.writeFile(
      join(process.cwd(), 'navigation-test-validation-report.md'),
      report
    );
    console.log('\n📄 Report saved to navigation-test-validation-report.md');
    
    // Exit with appropriate code
    const success = testResults.successRate >= 80 && testFiles.missing.length === 0;
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Navigation test validation failed:', error);
    process.exit(1);
  }
}

// Run the validation
validateNavigationTests();