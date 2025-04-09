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

### 1. Install Dependencies

```bash
npm Install
```
### 2. Give input

add a input.json file in the root directory

```
[
  { "GenericName": "Paracetamol 500mg Tablet" },
  { "GenericName": "Aspirin 150mg Tablet" }
]

```

### 3. Run the program

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
