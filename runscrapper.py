import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def run_scraper():
    # Setup headless Chrome
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    # Uncomment the below lines if running in a Linux server environment
    # options.add_argument("--no-sandbox")
    # options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(options=options)

    with open("input.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    try:
        driver.get("https://www.1mg.com/")
        time.sleep(2)

        # Close login popup
        try:
            close_popup = driver.find_element(By.CLASS_NAME, "style__close-icon___3FflV")
            close_popup.click()
            time.sleep(1)
        except:
            pass

        # Close location popup
        try:
            close_location = driver.find_element(By.CLASS_NAME, "UpdateCityModal__cancel-btn___2jWwS")
            close_location.click()
            time.sleep(1)
        except:
            pass

        # Locate search bar once
        search_bar = driver.find_element(By.ID, "srchBarShwInfo")

        for item in data[:10]:  # Only first 10 items
            query = item["GenericName"]
            print(f"Searching: {query}")

            try:
                search_bar.clear()
                search_bar.send_keys(query)
                time.sleep(2)  # Wait for dropdown

                try:
                    price_elem = driver.find_element(By.CSS_SELECTOR, ".styles__price___1sUEJ")
                    quant_elem = driver.find_element(By.CSS_SELECTOR, ".styles__pack-size-label___3rdzm")

                    item["comparePrice"] = price_elem.text.strip()
                    item["compareQuant"] = quant_elem.text.strip()

                    print(f"→ {query} : {item['comparePrice']}")
                except:
                    item["comparePrice"] = "Not Found"
                    print(f"→ {query} : Not Found")
            except Exception as e:
                item["comparePrice"] = f"Error: {str(e)}"
                print(f"→ {query} : {item['comparePrice']}")

        # Save results
        with open("output.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print("saved to output.json")

    finally:
        driver.quit()

if __name__ == "__main__":
    run_scraper()
