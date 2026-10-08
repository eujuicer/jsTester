import { test, expect } from "@playwright/test";

const articles = [
  { nom: "Sauce Labs Backpack", id: 4 },
  { nom: "Sauce Labs Bike Light", id: 0 },
  { nom: "Sauce Labs Bolt T-Shirt", id: 1 },
  { nom: "Sauce Labs Fleece Jacket", id: 5 },
  { nom: "Sauce Labs Onesie", id: 2 },
  { nom: "Test.allTheThings() T-Shirt (Red)", id: 3 },
];

test.beforeEach(async ({ page }) => {
  await page.goto("https://saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
});

for (const { nom, id } of articles) {
  test(`Clic sur l'image de "${nom}" ouvre le bon article`, async ({ page }) => {
    await page.getByRole("img", { name: nom }).click();

    await expect(page).toHaveURL(new RegExp(`id=${id}`));
    // Sous WebKit l'URL change avant que la liste soit remplacée par la page détail
    await expect(page.getByTestId("back-to-products")).toBeVisible();
    await expect(page.getByTestId("inventory-item-name")).toHaveText(nom);
  });
  
}
