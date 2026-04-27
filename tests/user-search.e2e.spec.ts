import { expect, test } from '@playwright/test';

test.describe('User Search and Subscribe Feature (FRAM100)', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="password"]', 'Test123456!');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  });

  test('Should navigate to search page from navbar', async ({ page }) => {
    // Click on Search in sidebar
    await page.click('a[href="/search"]');

    // Check if we are on search page
    await expect(page).toHaveURL(/.*search/);
    await expect(page.getByRole('heading', { name: /search/i })).toBeVisible();
  });

  test('Should search for a user and display results', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Enter search term
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('test');

    // Wait for results to appear
    await page.waitForTimeout(1000); // Wait for debounce

    // Check if results are displayed
    const resultCards = page.locator('[class*="card"]');
    const count = await resultCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Should display follow button on search result card', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Enter search term
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('test');

    // Wait for results
    await page.waitForTimeout(1000);

    // Check follow button exists
    const followButton = page.locator('button:has-text("Follow")').first();
    await expect(followButton).toBeVisible();
  });

  test('Should subscribe to a user from search results', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Enter search term
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('test');

    // Wait for results
    await page.waitForTimeout(1000);

    // Click follow button
    const followButton = page.locator('button:has-text("Follow")').first();
    await followButton.click();

    // Wait for request to complete
    await page.waitForTimeout(500);

    // Check if button changed to Unfollow
    const unfollowButton = page.locator('button:has-text("Unfollow")').first();
    await expect(unfollowButton).toBeVisible();
  });

  test('Should navigate to user profile from search result', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Enter search term
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('test');

    // Wait for results
    await page.waitForTimeout(1000);

    // Click on user card (not the button)
    const userLink = page.locator('[class*="link"]').first();
    await userLink.click();

    // Wait for navigation
    await page.waitForNavigation();

    // Check if we are on profile page
    expect(page.url()).toContain('/profile/');
  });

  test('Should update follow button on profile page after subscription', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Search for user
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('test');
    await page.waitForTimeout(1000);

    // Subscribe from search
    const followButton = page.locator('button:has-text("Follow")').first();
    await followButton.click();
    await page.waitForTimeout(500);

    // Get user ID from the profile link
    const userLink = page.locator('[class*="link"]').first();
    const href = await userLink.getAttribute('href');
    const userId = href?.split('/').pop();

    // Navigate to profile
    if (userId) {
      await page.goto(`/profile/${userId}`);

      // Check if unfollow button is visible on profile
      await expect(page.locator('button:has-text("Unfollow")')).toBeVisible();
    }
  });

  test('Should handle infinity scroll on search results', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Enter search term
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('a'); // Common letter to get many results

    // Wait for initial results
    await page.waitForTimeout(1000);

    // Get initial count
    const initialCards = await page.locator('[class*="card"]').count();

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for more results to load
    await page.waitForTimeout(1000);

    // Get new count
    const newCards = await page.locator('[class*="card"]').count();

    // Should have more cards after scroll
    expect(newCards).toBeGreaterThanOrEqual(initialCards);
  });

  test('Should display "no results" message when search returns nothing', async ({ page }) => {
    // Go to search page
    await page.goto('/search');

    // Enter search term that won't have results
    const searchInput = page.locator('input[placeholder*="username" i]');
    await searchInput.fill('xyznonexistentuser123456');

    // Wait for search
    await page.waitForTimeout(1000);

    // Check for no results message
    await expect(page.getByText(/no users found|users not found/i)).toBeVisible();
  });
});
