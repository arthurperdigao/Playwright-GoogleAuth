import { test as setup, expect } from "@playwright/test";
import { generateOTP } from "../lib/helpers/otp";
import { saveToJSON, fetchDataFromIndexedDB } from "../lib/helpers/indexedDB";
import { AccountPage } from "../lib/pages/accountPage";
import { LoginPage } from "../lib/pages/loginPage";
import { GooglePopUpPage } from "../lib/pages/googlePopUpPage";

setup("Create Auth", async ({ page, baseURL }) => {
  const email = process.env.GOOGLE_EMAIL;
  const password = process.env.GOOGLE_PASSWORD;

  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Google Popup
  const pagePromise = page.waitForEvent("popup");
  await loginPage.googleButton.click();

  // Isso permite que eu acesse a página de popup.

  const popUp = await pagePromise;

  // Fazendo login através do popup do Google

  const googlePopupPage = new GooglePopUpPage(popUp);

  await googlePopupPage.login(email, password);

  const twoFACode = generateOTP(process.env.GOOGLE_OTP_SECRET);
  await googlePopupPage.enterCode(twoFACode);

  const accountPage = new AccountPage(page);

  await expect(accountPage.publicLinkBox).toBeVisible();
  await expect(accountPage.playwrightSolutionsPhoto).toBeVisible();

  // Obtém os dados do IndexedDB e os salva em um arquivo JSON
  const data = await fetchDataFromIndexedDB(page);
  saveToJSON(data);
});
