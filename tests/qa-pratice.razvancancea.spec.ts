import { expect, test } from "@playwright/test";

const url = 'https://qa-practice.razvanvancea.ro'

test('check', async ({page})=> {
    await page.goto(`${url}/checkboxes.html`)
    const cases = await page.getByRole("checkbox");

    await cases.first().check()
    await cases.last().uncheck();
    await expect(cases.first()).toBeChecked()
    await expect(cases.last()).not.toBeChecked()
})

test('text', async ({page})=>{
    await page.goto(`${url}/auth_ecommerce.html`)
    const champ = await page.getByRole("textbox").first()
    await champ.pressSequentially("admin@admin.com", {delay: 100}) 
    const password = await page.getByRole("textbox").last()
    await password.pressSequentially("admin123", {delay: 100})
    const button = await page.getByRole("button", {name: "Submit"})
    await button.click()
    await expect(page.getByRole("heading", {level : 2})).toHaveText("SHOPPING CART")
})

test('dropdown', async ({page})=>{
    await page.goto(`${url}/dropdowns.html`)
    const dropdown = await page.getByRole("combobox")
    await dropdown.selectOption("Belgium")
    await expect(dropdown).toHaveValue("Belgium")
    const actionbutton = await page.getByRole("button", {name: "Dropdown"})
    await actionbutton.click()
    const action = await page.getByRole('link', {name : 'Some action'})
    await action.click()
    await expect(page).toHaveURL(/#some-action/)

})
