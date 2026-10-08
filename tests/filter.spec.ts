import { test, expect, Page } from "@playwright/test";

const filtres = [
  { label: "Name (A to Z)", value: "az" },
  { label: "Name (Z to A)", value: "za" },
  { label: "Price (low to high)", value: "lohi" },
  { label: "Price (high to low)", value: "hilo" },
];

test.beforeEach(async ({ page }) => {
  await page.goto("https://saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
});

const noms = (page: Page) => page.getByTestId("inventory-item-name").allTextContents();

const prix = async (page: Page) =>
  (await page.getByTestId("inventory-item-price").allTextContents()).map((p) =>
    parseFloat(p.replace("$", ""))
  );

test("Le filtre propose les 4 options attendues", async ({ page }) => {
  const options = page.getByTestId("product-sort-container").locator("option");
  await expect(options).toHaveText(filtres.map((f) => f.label));
});

test("Par défaut, le tri est Name (A to Z)", async ({ page }) => {
  await expect(page.getByTestId("product-sort-container")).toHaveValue("az");
  const liste = await noms(page);
  expect(liste).toEqual([...liste].sort());
});

for (const { label, value } of filtres) {
  test(`Sélectionner "${label}" trie correctement les articles`, async ({ page }) => {
    await page.getByTestId("product-sort-container").selectOption(value);
    await expect(page.getByTestId("product-sort-container")).toHaveValue(value);

    if (value === "az" || value === "za") {
      const liste = await noms(page);
      const attendu = [...liste].sort();
      if (value === "za") attendu.reverse();
      expect(liste).toEqual(attendu);
    } else {
      const liste = await prix(page);
      const attendu = [...liste].sort((a, b) => a - b);
      if (value === "hilo") attendu.reverse();
      expect(liste).toEqual(attendu);
    }
  });
}

test("Le tri garde les 6 articles affichés", async ({ page }) => {
  await page.getByTestId("product-sort-container").selectOption("hilo");
  await expect(page.getByTestId("inventory-item")).toHaveCount(6);
});
