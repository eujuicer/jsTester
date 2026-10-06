import { test, expect } from "@playwright/test";

test.describe("Checkout", ()=> {
  test.beforeEach ("Acceder au site",async ({page})=>{
    await page.goto("https://saucedemo.com/")
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", {name : 'Login'}).click()
    await expect(page).toHaveURL(/inventory/);
 });

 test("Checkout complet avec backpack", async ({page})=> {
    const articles = page.getByTestId("inventory-item")
    const backpack = articles.filter({ hasText: "Backpack"})
    await backpack.getByRole("button", {name : "Add to cart"}).click()
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1")

    // Panier
    await page.getByTestId("shopping-cart-link").click()
    await expect(page).toHaveURL(/cart/)

    // Checkout
    await page.getByRole("button", {name : "Checkout"}).click()
    await expect(page).toHaveURL(/checkout-step-one/)
    await page.getByPlaceholder("First Name").fill("Jean")
    await page.getByPlaceholder("Last Name").fill("Dupont")
    await page.getByPlaceholder("Zip/Postal Code").fill("1050")
    await page.getByRole("button", {name : "Continue"}).click()

    // Récapitulatif
    await expect(page).toHaveURL(/checkout-step-two/)
    await expect(page.getByTestId("subtotal-label")).toHaveText("Item total: $29.99")
    await expect(page.getByTestId("tax-label")).toHaveText("Tax: $2.40")
    await expect(page.getByTestId("total-label")).toHaveText("Total: $32.39")

    // Finish
    await page.getByRole("button", {name : "Finish"}).click()
    await expect(page.getByTestId("complete-header")).toHaveText("Thank you for your order!")
 })
});


