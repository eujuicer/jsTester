import { test, expect } from "@playwright/test";

test("Ajouter des articles au panier", async ({ page }) => {
  await page.goto("https://saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  const articles = page.getByTestId("inventory-item");
  await expect(articles).toHaveCount(6);

  const bike = articles.filter({ hasText: "Bike" });
  await bike.getByRole("button", { name: "Add to cart" }).click();
  await expect(bike.getByRole("button", { name: "Remove" })).toBeVisible();
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

  // On ajoute les articles restants
  for (const article of await articles.all()) {
    const addButton = article.getByRole("button", { name: "Add to cart" });
    if (await addButton.isVisible()) {
      await addButton.click();
    }
  }
  await expect(page.getByTestId("shopping-cart-badge")).toHaveText("6");
});
