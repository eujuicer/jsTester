import { test, expect, Locator } from "@playwright/test";

test.use({ testIdAttribute: "data-testid" });

test.describe("TodoMVC", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc");
  });

  test("Mon premier test", async ({ page }) => {
    await expect(page).toHaveTitle(/TodoMVC/);
  });

  test("Ajouter une tâche", async ({ page }) => {
    const textInput: Locator = page.getByRole("textbox");
    await textInput.fill("Banane");
    await textInput.press("Enter");
    await expect(page.getByTestId("todo-title")).toHaveText(["Banane"]);
    await expect(page.getByTestId("todo-count")).toHaveText("1 item left");
  });

  test("Cocher une tâche comme terminée", async ({ page }) => {
    const elements: string[] = [
      "Pomme",
      "Banane",
      "scooby doo",
      "pomme-cerise",
      "jean--fabrice",
    ];
    const input = page.getByRole("textbox");
    for (const elem of elements) {
      await input.fill(elem);
      await input.press("Enter");
    }
    await expect(page.getByTestId("todo-title")).toHaveText(elements);
    await expect(page.getByTestId("todo-count")).toHaveText(
      `${elements.length} item${elements.length > 1 ? "s" : ""} left`,
    );

    const itemList = page.getByRole("listitem").filter({ hasText: elements[1] });
    await itemList.getByRole("checkbox").click();

    await expect(page.getByTestId("todo-title")).toHaveText(elements);
    const remaining = elements.length - 1;
    await expect(page.getByTestId("todo-count")).toHaveText(
      `${remaining} item${remaining > 1 ? "s" : ""} left`,
    );
  });
});
