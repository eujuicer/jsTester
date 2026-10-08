import { expect, Locator, test } from "@playwright/test";

const url = "https://www.letec.be/";

test("les heures d'arrivée Lustin → Bruxelles-Midi sont dans l'ordre (TEC)", async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'Accepter tout' }).click();

    const choisirArret = async (champ: Locator, recherche: string, nom: RegExp) => {
        await expect(async () => {
            await champ.clear();
            await champ.pressSequentially(recherche);
            await page.getByRole('option', { name: nom }).first().click({ timeout: 3000 });
        }).toPass();
    };

    await choisirArret(page.getByRole('textbox', { name: 'Partir de' }), 'Lustin gare', /LUSTIN.*Gare/i);
    await choisirArret(page.getByRole('textbox', { name: 'Arrivée à' }), 'Bruxelles midi', /BRUXELLES Midi/);

    await page.getByRole('button', { name: 'Partir maintenant' }).click();
    await page.getByRole('tab', { name: 'Arrivée' }).click();
    await page.getByRole('textbox', { name: "Heure d'arrivée" }).fill('21:00');
    await page.getByRole('button', { name: 'Valider' }).click();

    await page.getByRole('button', { name: 'Calculer mon itinéraire' }).click();
    await page.getByRole('button', { name: 'Planifier mon voyage' }).click();

    const resultat = page.locator('h4:has-text("Résultats de recherche") + ul app-card-itinerary-result').locator('visible=true').first();
    await expect(resultat).toBeVisible();

    const enMinutes = (heure: string) => {
        const [h, m] = heure.split(':').map(Number);
        return h * 60 + m;
    };

    const arrivees: number[] = [];
    let jour = 0;
    let departPrecedent = -1;

    for (let i = 0; i < 3; i++) {
        const [depart, arrivee] = (await resultat.innerText()).match(/\d{2}:\d{2}/g)!.map(enMinutes);

        if (depart < departPrecedent) jour++;
        departPrecedent = depart;
        arrivees.push(jour * 1440 + arrivee + (arrivee < depart ? 1440 : 0));

        const avant = await resultat.innerText();
        await page.getByRole('button', { name: 'Plus tard' }).click();
        await expect.poll(() => resultat.innerText(), { timeout: 15000 }).not.toBe(avant);
    }

    expect(arrivees.length).toBeGreaterThan(1);
    expect(arrivees).toEqual([...arrivees].sort((a, b) => a - b));
});
