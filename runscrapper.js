/* if you want to have a UI to look at while it is being scrapped */

/* const fs = require("fs");
  const { Builder, By } = require("selenium-webdriver");
  async function runScraper() {
   const driver = await new Builder().forBrowser("chrome").build(); */

/* headless mode */
const fs = require("fs");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function runScraper() {
  const options = new chrome.Options();
  options.addArguments(
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1080"
  );

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  const input = JSON.parse(fs.readFileSync("input.json", "utf-8"));

  try {
    await driver.get("https://www.1mg.com/");
    await driver.sleep(2000);

    // Close login popup
    try {
      const closePopup = await driver.findElement(
        By.className("style__close-icon___3FflV")
      );
      await closePopup.click();
      await driver.sleep(1000);
    } catch {}

    // Close location popup
    try {
      const closeLocation = await driver.findElement(
        By.className("UpdateCityModal__cancel-btn___2jWwS")
      );
      await closeLocation.click();
      await driver.sleep(1000);
    } catch {}

    // Locate search bar once
    const searchBar = await driver.findElement(By.id("srchBarShwInfo"));

    // for (const item of input) {
    for (const item of input.slice(0, 10)) {
      const query = item.GenericName;
      console.log(`Searching: ${query}`);

      try {
        // Clear and type new query
        await searchBar.clear();
        await searchBar.sendKeys(query);
        await driver.sleep(2000);

        try {
          const priceElem = await driver.findElement(
            By.css(".styles__price___1sUEJ")
          );
          const quantElem = await driver.findElement(
            By.css(".styles__pack-size-label___3rdzm")
          );
          const quantText = await quantElem.getText();
          const priceText = await priceElem.getText();
          item.comparePrice = priceText;
          item.compareQuant = quantText;
          console.log(`→ ${query} : ${priceText}`);
        } catch {
          item.comparePrice = "Not Found";
          console.log(`→ ${query} : Not Found`);
        }
      } catch (err) {
        item.comparePrice = `Error: ${err.message}`;
        console.log(`→ ${query} : ${item.comparePrice}`);
      }
    }

    fs.writeFileSync("output.json", JSON.stringify(input, null, 2));
    console.log("saved to output.json");
  } finally {
    await driver.quit();
  }
}

runScraper();
