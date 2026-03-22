import { test, expect } from '@playwright/test';

test('shows a dismissable welcome note', async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", {name: "Welcome to see-Q!"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Show welcome message again"})).not.toBeVisible();
  await expect(page.getByText("Ok, this message will not be shown again.")).not.toBeVisible();

  await page.getByRole("button", {name: "Don't show this message again"}).click()

  await expect(page.getByRole("heading", {name: "Welcome to see-Q!"})).not.toBeVisible();
  await expect(page.getByRole("button", {name: "Show welcome message again"})).toBeVisible();
  await expect(page.getByText("Ok, this message will not be shown again.")).toBeVisible();

  await page.getByRole("button", {name: "Show welcome message again"}).click()

  await expect(page.getByRole("heading", {name: "Welcome to see-Q!"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Show welcome message again"})).not.toBeVisible();
  await expect(page.getByText("Ok, this message will not be shown again.")).not.toBeVisible();

  await page.reload();

  await expect(page.getByRole("heading", {name: "Welcome to see-Q!"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Show welcome message again"})).not.toBeVisible();
  await expect(page.getByText("Ok, this message will not be shown again.")).not.toBeVisible();

  await page.getByRole("button", {name: "Don't show this message again"}).click()

  await expect(page.getByRole("heading", {name: "Welcome to see-Q!"})).not.toBeVisible();
  await expect(page.getByRole("button", {name: "Show welcome message again"})).toBeVisible();
  await expect(page.getByText("Ok, this message will not be shown again.")).toBeVisible();

  await page.reload();

  await expect(page.getByRole("heading", {name: "Welcome to see-Q!"})).not.toBeVisible();
  await expect(page.getByRole("button", {name: "Show welcome message again"})).toBeVisible();
  await expect(page.getByText("Ok, this message will not be shown again.")).not.toBeVisible();
});
