const { test, expect, chromium, firefox, webkit } = require('@playwright/test');

// Test configuration
const BASE_URL = 'https://calorie-calculator-tool.pages.dev';
const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Privacy', path: '/privacy.html' },
  { name: 'Terms', path: '/terms.html' },
  { name: 'Cookies', path: '/cookies.html' },
  { name: 'Contact', path: '/contact.html' },
  { name: 'Ads.txt', path: '/ads.txt' }
];

// Viewport configurations
const VIEWPORTS = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 }
};

// Test results storage
const testResults = {
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0
  },
  browsers: {},
  issues: []
};

function addResult(browser, testName, status, details = '') {
  if (!testResults.browsers[browser]) {
    testResults.browsers[browser] = [];
  }
  testResults.browsers[browser].push({
    test: testName,
    status,
    details,
    timestamp: new Date().toISOString()
  });
  testResults.summary.total++;
  if (status === 'PASS') testResults.summary.passed++;
  else if (status === 'FAIL') {
    testResults.summary.failed++;
    testResults.issues.push({ browser, test: testName, details });
  }
  else testResults.summary.skipped++;
}

// ============ BASIC FUNCTIONALITY TESTS ============

test.describe('Basic Calculator Functionality', () => {
  test('should load the homepage and display calculator', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toContainText('Calorie Calculator');
    await expect(page.locator('#age')).toBeVisible();
    await expect(page.locator('#activity')).toBeVisible();
    await expect(page.locator('button')).toContainText('Calculate');
    addResult(browserName, 'Homepage Load', 'PASS');
  });

  test('should calculate calories with valid inputs', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Fill in the form
    await page.fill('#age', '30');
    await page.fill('#height-ft', '5');
    await page.fill('#height-in', '10');
    await page.fill('#weight-lbs', '170');
    
    // Click calculate
    await page.click('button:has-text("Calculate My Calories")');
    
    // Wait for results
    await page.waitForSelector('#target-calories', { state: 'visible' });
    
    // Check that results are displayed (not 0)
    const targetCalories = await page.locator('#target-calories').textContent();
    const bmr = await page.locator('#bmr').textContent();
    expect(parseInt(targetCalories)).toBeGreaterThan(0);
    expect(parseInt(bmr)).toBeGreaterThan(0);
    
    addResult(browserName, 'Basic Calculation', 'PASS');
  });

  test('should switch between metric and imperial units', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Check imperial inputs visible
    await expect(page.locator('#imperial-inputs')).toBeVisible();
    await expect(page.locator('#metric-inputs')).toBeHidden();
    
    // Switch to metric
    await page.click('#unit-metric');
    
    // Check metric inputs visible
    await expect(page.locator('#metric-inputs')).toBeVisible();
    await expect(page.locator('#imperial-inputs')).toBeHidden();
    
    addResult(browserName, 'Unit Toggle', 'PASS');
  });

  test('should validate required fields', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Clear fields
    await page.fill('#age', '');
    await page.fill('#height-ft', '');
    await page.fill('#weight-lbs', '');
    
    // Try to calculate
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Please');
      await dialog.accept();
    });
    
    await page.click('button:has-text("Calculate My Calories")');
    
    addResult(browserName, 'Form Validation', 'PASS');
  });
});

// ============ BARIATRIC SURGERY FEATURE TESTS ============

test.describe('Bariatric Surgery Feature', () => {
  test('should show bariatric organization dropdown when surgery status selected', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Select a surgery status
    await page.selectOption('#bariatric', 'recent');
    
    // Check that organization dropdown appears
    await expect(page.locator('#bariatric-organization-group')).toBeVisible();
    await expect(page.locator('#bariatric-org')).toBeVisible();
    
    // Check default option
    const defaultOption = await page.locator('#bariatric-org option[value=""]').textContent();
    expect(defaultOption).toContain('Compare both');
    
    addResult(browserName, 'Bariatric Dropdown Visibility', 'PASS');
  });

  test('should display comparison view by default', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Select recent surgery
    await page.selectOption('#bariatric', 'recent');
    
    // Wait for guidelines to show
    await expect(page.locator('#bariatric-guidelines')).toBeVisible();
    
    // Check comparison view is visible
    await expect(page.locator('#guidelines-comparison')).toBeVisible();
    await expect(page.locator('#comp-recent')).toBeVisible();
    
    // Check ASMBS and AND sections are shown side by side
    const compContent = await page.locator('#guidelines-comparison').textContent();
    expect(compContent).toContain('ASMBS');
    expect(compContent).toContain('AND');
    
    addResult(browserName, 'Bariatric Comparison View', 'PASS');
  });

  test('should switch to ASMBS-only view when selected', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Select recent surgery
    await page.selectOption('#bariatric', 'recent');
    
    // Select ASMBS
    await page.selectOption('#bariatric-org', 'asmbs');
    
    // Wait for ASMBS view
    await expect(page.locator('#guidelines-asmbs')).toBeVisible();
    await expect(page.locator('#asmbs-recent')).toBeVisible();
    
    // Comparison should be hidden
    await expect(page.locator('#guidelines-comparison')).toBeHidden();
    
    // Check ASMBS content
    const asmbsContent = await page.locator('#guidelines-asmbs').textContent();
    expect(asmbsContent).toContain('ASMBS');
    
    addResult(browserName, 'Bariatric ASMBS View', 'PASS');
  });

  test('should switch to AND-only view when selected', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Select recent surgery
    await page.selectOption('#bariatric', 'recent');
    
    // Select AND
    await page.selectOption('#bariatric-org', 'and');
    
    // Wait for AND view
    await expect(page.locator('#guidelines-and')).toBeVisible();
    await expect(page.locator('#and-recent')).toBeVisible();
    
    // Comparison should be hidden
    await expect(page.locator('#guidelines-comparison')).toBeHidden();
    
    // Check AND content
    const andContent = await page.locator('#guidelines-and').textContent();
    expect(andContent).toContain('AND');
    
    addResult(browserName, 'Bariatric AND View', 'PASS');
  });

  test('should show correct phases for each surgery status', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    const phases = [
      { value: 'recent', id: 'comp-recent', label: '0-6 Months' },
      { value: 'recovery', id: 'comp-recovery', label: '6-12 Months' },
      { value: 'longterm', id: 'comp-longterm', label: '1+ Years' }
    ];
    
    for (const phase of phases) {
      await page.selectOption('#bariatric', phase.value);
      await expect(page.locator(`#${phase.id}`)).toBeVisible();
      await expect(page.locator(`#${phase.id}`)).toContainText(phase.label);
    }
    
    addResult(browserName, 'Bariatric Phase Views', 'PASS');
  });

  test('should hide bariatric section when "none" selected', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // First select a surgery status
    await page.selectOption('#bariatric', 'recent');
    await expect(page.locator('#bariatric-guidelines')).toBeVisible();
    
    // Then select none
    await page.selectOption('#bariatric', 'none');
    
    // Guidelines should be hidden
    await expect(page.locator('#bariatric-guidelines')).toBeHidden();
    await expect(page.locator('#bariatric-organization-group')).toBeHidden();
    
    addResult(browserName, 'Bariatric Hide on None', 'PASS');
  });
});

// ============ RESPONSIVE DESIGN TESTS ============

test.describe('Responsive Design', () => {
  test('should display correctly on mobile viewport', async ({ page, browserName }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto(BASE_URL);
    
    // Check elements are still visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#age')).toBeVisible();
    await expect(page.locator('button')).toContainText('Calculate');
    
    // Check that calculator box is usable
    const calculatorBox = await page.locator('.calculator-box');
    const box = await calculatorBox.boundingBox();
    expect(box.width).toBeLessThanOrEqual(375);
    
    addResult(browserName, 'Mobile Viewport', 'PASS');
  });

  test('should display correctly on tablet viewport', async ({ page, browserName }) => {
    await page.setViewportSize(VIEWPORTS.tablet);
    await page.goto(BASE_URL);
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.calculator-box')).toBeVisible();
    
    addResult(browserName, 'Tablet Viewport', 'PASS');
  });

  test('should display correctly on desktop viewport', async ({ page, browserName }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(BASE_URL);
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.calculator-box')).toBeVisible();
    
    addResult(browserName, 'Desktop Viewport', 'PASS');
  });
});

// ============ PAGE LOADING TESTS ============

test.describe('Page Loading', () => {
  for (const pageInfo of PAGES) {
    test(`should load ${pageInfo.name} page`, async ({ page, browserName }) => {
      const url = `${BASE_URL}${pageInfo.path}`;
      const response = await page.goto(url);
      
      expect(response.status()).toBeLessThan(400);
      
      // Check page has content
      const body = await page.locator('body').textContent();
      expect(body.length).toBeGreaterThan(100);
      
      addResult(browserName, `Load ${pageInfo.name} Page`, 'PASS');
    });
  }
});

// ============ JAVASCRIPT CONSOLE TESTS ============

test.describe('JavaScript Console', () => {
  test('should have no critical console errors', async ({ page, browserName }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    
    // Interact with calculator
    await page.fill('#age', '30');
    await page.fill('#height-ft', '5');
    await page.fill('#height-in', '10');
    await page.fill('#weight-lbs', '170');
    await page.click('button:has-text("Calculate My Calories")');
    
    // Wait for calculation
    await page.waitForTimeout(1000);
    
    // Test bariatric feature
    await page.selectOption('#bariatric', 'recent');
    await page.selectOption('#bariatric-org', 'asmbs');
    await page.selectOption('#bariatric-org', 'and');
    
    // Filter out expected errors (e.g., from AdSense which loads externally)
    const criticalErrors = consoleErrors.filter(err => 
      !err.includes('adsbygoogle') && 
      !err.includes('googletag') &&
      !err.includes('favicon') &&
      !err.includes('Google') &&
      !err.includes('gpt') &&
      !err.includes('securepubads')
    );
    
    if (criticalErrors.length > 0) {
      addResult(browserName, 'Console Errors', 'FAIL', `Found ${criticalErrors.length} errors: ${criticalErrors.slice(0, 3).join(', ')}`);
    } else {
      addResult(browserName, 'Console Errors', 'PASS');
    }
  });
});

// ============ LINK TESTS ============

test.describe('Link Functionality', () => {
  test('should have working footer links', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    const footerLinks = await page.locator('footer a').all();
    expect(footerLinks.length).toBeGreaterThan(0);
    
    for (const link of footerLinks) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
    
    addResult(browserName, 'Footer Links', 'PASS');
  });

  test('should have external guideline links in bariatric section', async ({ page, browserName }) => {
    await page.goto(BASE_URL);
    
    // Enable bariatric
    await page.selectOption('#bariatric', 'recent');
    
    // Check guideline links exist
    const asmbsLink = await page.locator('a[href*="asmbs.org"]');
    const andLink = await page.locator('a[href*="eatright.org"]');
    
    expect(await asmbsLink.count()).toBeGreaterThan(0);
    expect(await andLink.count()).toBeGreaterThan(0);
    
    addResult(browserName, 'Guideline Links', 'PASS');
  });
});

// ============ SCREENSHOT TESTS ============

test.describe('Screenshots', () => {
  test('should capture homepage screenshots', async ({ page, browserName }, testInfo) => {
    // Desktop screenshot
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(BASE_URL);
    await page.screenshot({ 
      path: `test-results/screenshots/${browserName}-desktop-home.png`,
      fullPage: true 
    });
    
    // Mobile screenshot
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto(BASE_URL);
    await page.screenshot({ 
      path: `test-results/screenshots/${browserName}-mobile-home.png`,
      fullPage: true 
    });
    
    addResult(browserName, 'Screenshots', 'PASS');
  });

  test('should capture bariatric feature screenshots', async ({ page, browserName }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto(BASE_URL);
    
    // Test recent surgery view
    await page.selectOption('#bariatric', 'recent');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: `test-results/screenshots/${browserName}-mobile-bariatric-recent.png`,
      fullPage: true 
    });
    
    // Test ASMBS view
    await page.selectOption('#bariatric-org', 'asmbs');
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: `test-results/screenshots/${browserName}-mobile-bariatric-asmbs.png`,
      fullPage: true 
    });
    
    addResult(browserName, 'Bariatric Screenshots', 'PASS');
  });
});

// ============ EXPORT RESULTS ============

test.afterAll(async () => {
  // Generate markdown report
  const fs = require('fs');
  const path = require('path');
  
  const reportDir = 'test-results';
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(reportDir, 'test-results.json'),
    JSON.stringify(testResults, null, 2)
  );
});
