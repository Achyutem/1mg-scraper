const fs = require("fs");
const cliProgress = require("cli-progress");
const { Builder, By } = require("selenium-webdriver");
/*for headless mode*/
const chrome = require("selenium-webdriver/chrome");

async function runScraper() {
  const url = "https://www.1mg.com/";
  console.log("script has started \n");

  /* UI mode*/
  // const driver = await new Builder().forBrowser("chrome").build();

  /* headless mode */
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
  let output = [];
  const outputPath = "output.json";
  const logPath = "scraper.log";

  if (fs.existsSync(outputPath)) {
    output = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
  }

  const doneMap = new Map(output.map((item) => [item.GenericName, item]));

  // Initialize log file
  fs.writeFileSync(logPath, "Scraper log started\n");

  let processed = 0;
  const total = input.length;

  try {
    await driver.get(url);
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

    const progressBar = new cliProgress.SingleBar({
      format: "Progress |{bar}| {percentage}% || {value}/{total} Queries",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });

    progressBar.start(total, 0);

    for (const item of input) {
      const query = item.GenericName;

      if (doneMap.has(query) && doneMap.get(query).comparePrice) {
        console.log(`Skipping (already done): ${query}`);
        processed++;
        progressBar.increment();
        continue;
      }

      console.log(`Searching (${processed + 1}/${total}): ${query}`);

      try {
        await driver.get(url);
        await driver.sleep(500);

        const searchBar = await driver.findElement(By.id("srchBarShwInfo"));
        await searchBar.sendKeys(query);
        await driver.sleep(1000);

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
          fs.appendFileSync(logPath, `SUCCESS: ${query} → ${priceText}\n`);
        } catch {
          item.comparePrice = "Not Found";
          console.log(`→ ${query} : Not Found`);
          fs.appendFileSync(logPath, `NOT FOUND: ${query}\n`);
        }
      } catch (err) {
        item.comparePrice = `Error: ${err.message}`;
        console.log(`→ ${query} : ${item.comparePrice}`);
        fs.appendFileSync(logPath, `ERROR: ${query} → ${err.message}\n`);
      }

      // Save progress
      const index = output.findIndex(
        (obj) => obj.GenericName === item.GenericName
      );
      if (index !== -1) {
        output[index] = item;
      } else {
        output.push(item);
      }

      fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
      processed++;
    }

    progressBar.stop();

    console.log("Scraping completed.");
  } finally {
    await driver.quit();
  }
}

runScraper();
