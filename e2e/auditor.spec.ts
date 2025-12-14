import { test, expect } from '@playwright/test';

test.describe('Fairness Auditor', () => {
    test('renders dashboard', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('h1')).toContainText('Agent Fairness Auditor');
        await expect(page.getByRole('button', { name: /Analyze/i })).toBeVisible();
    });

    test('can input text for analysis', async ({ page }) => {
        await page.goto('/');
        const input = page.locator('textarea');
        await input.fill('Test content for audit');
        await expect(input).toHaveValue('Test content for audit');
    });
});
