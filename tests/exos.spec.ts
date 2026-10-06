import { test, expect, Locator } from "@playwright/test";
import constants from "constants";

// test.beforeEach(async ({page}) => {
//   await page.goto("https://demo.playwright.dev/todomvc");
// });

// test("Mon premier test.", async ({page}) => {
//   await page.goto("https://demo.playwright.dev/todomvc");

//   await expect(page).toHaveTitle(/TodoMVC/);
// });

// test("Remplir panier", async ({page}) => {
//   await page.goto("https://demo.playwright.dev/todomvc");
//   const textInput: Locator = await page.getByRole("textbox");
//   await textInput.fill("Banane");
//   await textInput.press("Enter");
//   await expect(page.getByTestId("todo-title")).toHaveText(["Banane"]);
//   await expect(page.getByTestId("todo-count")).toHaveText("1 item left");
// });

// test("Cocher une tâche comme terminée", async ({page}) => {
//   await page.goto("https://demo.playwright.dev/todomvc");
//   let elements: string[] = [
//     "Pomme",
//     "Banane",
//     "scooby doo",
//     "pomme-cerise",
//     "jean--fabrice",
//   ];
//   const input = await page.getByRole("textbox");
//   for (const elem of elements) {
//     await input.fill(elem);
//     await input.press("Enter");
//   }
//   await expect(page.getByTestId("todo-title")).toHaveText(elements);
//   await expect(page.getByTestId("todo-count")).toHaveText(
//     elements.length + " item" + (elements.length > 1 ? "s" : "") + " left",
//   );
//   const list = await page.getByRole("listitem");
//   const itemList = await list.filter({ hasText: elements[1] });
//   await itemList.getByRole("checkbox").click();

//   await expect(page.getByTestId("todo-title")).toHaveText(elements);
//   await expect(page.getByTestId("todo-count")).toHaveText(
//     elements.length -
//       1 +
//       " item" +
//       (elements.length - 1 > 1 ? "s" : "") +
//       " left",
//   );
// });

// test("Je veux cliquer sur un bouton", async ({page}) => {
//   await page.goto("https://saucedemo.com/");
//   await page.getByPlaceholder("Username").fill("standard_user");
//   await page.getByPlaceholder("Password").fill("secret_sauce");
//   await page.getByRole("button", { name: "Login" }).click();
//   const articles = await page.getByTestId("inventory-item")
//   const article = articles.filter({hasText : "Bike"})
//   await article.getByRole("button", {name : "Add to cart"}).click()
//   const buttons = await page.getByRole('button', {name: 'Add to cart'}).or(page.getByRole("button",{name: "Remove"}))
//   await expect(page.getByRole("button")).toBeVisible
//   await expect(articles).toHaveCount(6);
//   for (const article of await articles.all()) {
//     await article.getByRole("button").click()
//   }
// });

//.visible()  

//EXO 1 Login
// test.describe("Exo 1 Login", () => {
//   test.beforeEach("Acceder au site",async ({page})=>{
//     await page.goto("https://saucedemo.com/");
//   });

//   test("login réussi avec standard_user", async ({page})=>{
//     await page.getByTestId("Username").fill("standard_user");
//     await page.getByTestId("Password").fill("secret_sauce");
//     await page.getByRole("button", {name : 'Login'}).click()
//     await expect(page).toHaveURL(/inventory/); //ou 
//     await expect(page.getByText("Products")).toBeVisible()
//   });

//   test("login echoué avec locked_out_user", async ({page})=> {
//     await page.getByPlaceholder('Username').fill('locked_out_user');
//     await page.getByPlaceholder('Password').fill('secret_sauce');
//     await page.getByRole("button", {name : 'Login'}).click()
//     await expect(page.getByTestId('error')).toHaveText("Epic sadface: Sorry, this user has been locked out.")
//   })
// })
// EXO2 
test.describe("Exo 2", ()=> {
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
    await page.getByPlaceholder("First Name").fill("Augusto")
    await page.getByPlaceholder("Last Name").fill("Pinochet")
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


