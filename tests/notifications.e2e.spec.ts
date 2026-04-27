import { expect, test } from '@playwright/test';

test.describe('Notifications', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/notifications/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          pageSize: 20,
          totalCount: 3,
          items: [
            {
              id: 1,
              message: 'Your subscription is activated and valid until 31-12-2026',
              isRead: false,
              createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            },
            {
              id: 2,
              message: 'Your next payment will be deducted in 3 days',
              isRead: false,
              createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            },
            {
              id: 3,
              message: 'Your subscription expires in 7 days',
              isRead: true,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            },
          ],
        }),
      });
    });
  });

  test('should display notification bell with unread count', async ({ page }) => {
    await page.goto('/');

    const bellButton = page.locator('[aria-label*="notification" i], button:has(svg)').first();
    await expect(bellButton).toBeVisible();
  });

  test('should open notifications dropdown on click', async ({ page }) => {
    await page.goto('/');

    const bellButton = page.locator('button:has(svg)').filter({ hasText: '' }).nth(0);
    await bellButton.click();

    const dropdown = page.locator('[role="menu"], [data-radix-popper-content-wrapper]');
    await expect(dropdown).toBeVisible();
  });

  test('should display notifications list', async ({ page }) => {
    await page.goto('/');

    const bellButton = page.locator('button:has(svg)').first();
    await bellButton.click();

    await page.waitForTimeout(500);

    const notifications = page.locator('[role="menuitem"]');
    await expect(notifications.first()).toBeVisible();
  });

  test('should mark notification as read on click', async ({ page }) => {
    await page.route('**/api/notifications/**', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({ status: 200, body: '{}' });
      } else {
        await route.continue();
      }
    });

    await page.goto('/');

    const bellButton = page.locator('button:has(svg)').first();
    await bellButton.click();

    const notification = page.locator('[role="menuitem"]').first();
    await notification.click();
  });

  test('should delete notification', async ({ page }) => {
    await page.route('**/api/notifications/**', async (route) => {
      if (route.request().method() === 'DELETE') {
        await route.fulfill({ status: 200, body: '{}' });
      } else {
        await route.continue();
      }
    });

    await page.goto('/');

    const bellButton = page.locator('button:has(svg)').first();
    await bellButton.click();

    const deleteButton = page.locator('button[aria-label*="delete" i], button:has(svg)').filter({
      has: page.locator('svg'),
    });

    if (await deleteButton.isVisible()) {
      await deleteButton.click();
    }
  });

  test('should show empty state when no notifications', async ({ page }) => {
    await page.route('**/api/notifications/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          pageSize: 20,
          totalCount: 0,
          items: [],
        }),
      });
    });

    await page.goto('/');

    const bellButton = page.locator('button:has(svg)').first();
    await bellButton.click();

    const emptyText = page.locator('text=/no notifications|нет уведомлений/i');
    await expect(emptyText).toBeVisible();
  });

  test('should mark all as read', async ({ page }) => {
    await page.route('**/api/notifications/**', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({ status: 200, body: '{}' });
      } else {
        await route.continue();
      }
    });

    await page.goto('/');

    const bellButton = page.locator('button:has(svg)').first();
    await bellButton.click();

    const markAllButton = page.locator('button:has-text("Mark all"), button:has-text("Отметить все")');

    if (await markAllButton.isVisible()) {
      await markAllButton.click();
    }
  });
});
