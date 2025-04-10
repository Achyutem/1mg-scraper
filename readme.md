# 🧪 1mg Drug Info Scraper (Node.js - Educational Use Only)

This is a **headless, respectful web scraper** built using **Node.js** and **Selenium WebDriver**.

It fetches public drug pricing information from [1mg.com](https://www.1mg.com) by searching drugs listed in a local `input.json` file, and stores results into `output.json`.

---

## ⚠️ Disclaimer

> 🛑 This project is created strictly for **educational and non-commercial** use only.

- We **respect the site's `robots.txt`**, and avoid scraping paths explicitly disallowed (like `/search`).
- This project simulates user interaction in a **controlled, low-impact, respectful** manner.
- Results are saved locally and not redistributed.
- If requested by 1mg, we will cease scraping activities immediately.

---

## 🛠 How to Use

### 1. Install Google Chrome

Make sure Google Chrome is installed on your PC.  
Download it from: [https://www.google.com/chrome/](https://www.google.com/chrome/)

---

### 2. Install ChromeDriver

ChromeDriver must match your installed version of Chrome.

#### Steps:

1. **Check your Chrome version:**

   - Open Chrome and go to: `chrome://settings/help`

2. **Download the matching ChromeDriver:**

   - Go to: [https://chromedriver.chromium.org/downloads](https://chromedriver.chromium.org/downloads)
   - Download the version that matches your Chrome version.
   - Extract the ZIP file.

3. **Set up ChromeDriver:**

   - **Windows:** Place `chromedriver.exe` in your project root OR add its location to the System `PATH`.
   - **macOS/Linux:** Move `chromedriver` to `/usr/local/bin/` using:

     ```bash
     sudo mv chromedriver /usr/local/bin/
     ```

4. **Verify installation:**

   ```bash
   chromedriver --version
   ```

### 3. Install Dependencies

```bash
npm Install
```

### 4. Give input

add a input.json file in the root directory

```
[
  { "GenericName": "Paracetamol 500mg Tablet" },
  { "GenericName": "Aspirin 150mg Tablet" }
]

```

### 5. Run the program

```
node runscrapper.js
```

## ⏳ Respectful Scraping Practices

### Includes:

- Headless browser automation
- Only scraping publicly visible suggestion boxes
- No crawling disallowed paths (per robots.txt)
- We encourage users to not exceed 10–20 queries/session, to stay within ethical bounds.

## 📬 Contact

If you are the owner or representative of 1mg.com and want this project removed or adjusted, please reachout or open an issue. We respect your rights and data.

## 📚 License

This project is shared under the MIT License, but scraping real-world sites should always be done responsibly and ethically.
