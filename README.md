# IranianBanks 🇮🇷

> **Modern directory of Iranian Banks and Neo-banks with authentic vector SVG and high-resolution PNG logos, card BIN prefixes, SHEBA ISO 7064 validation, and single-file client libraries for JavaScript, Python, and PHP.**

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-blue.svg)](https://mehrnet.github.io/IranianBanks/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Banks Covered](https://img.shields.io/badge/Institutions-37%20Banks%20%26%20Neo--banks-indigo.svg)](#covered-banks--neo-banks)

---

## 🌟 Features

- **Up-to-date Database**: Covers all 30+ official Central Bank of Iran (CBI) banks as well as latest modern neo-banks (**WePod**, **BluBank**, **Banket**, **Bankino**, **Tobank**, **Omidbank**, **Abank**).
- **Authentic Logos**: Clean standalone vector **SVG** (`logos/svg/`) and 512x512 transparent **PNG** (`logos/png/`) assets.
- **Client-Side Detection**: Automatic detection by 6-digit or 8-digit card BIN prefixes (e.g., differentiates BluBank `62198618` from Saman `621986`).
- **SHEBA (IBAN) Support**: Parses the 3-digit CBI bank code from Iranian IBANs (`IRxx...`).
- **Validation Algorithms**:
  - 💳 **Luhn Checksum** for 16-digit debit/credit cards.
  - 🏦 **ISO 7064 Mod 97-10** for 26-character Iranian IBANs (SHEBA).
- **Zero-Dependency Single-File Libraries**:
  - `lib/iranian-banks.js` (Vanilla JS, Node.js, TypeScript, Browser)
  - `lib/iranian-banks.py` (Python 3.7+)
  - `lib/iranian-banks.php` (PHP 7.4+)
- **Interactive Showcase**: Hostable directly via **GitHub Pages** from the root `/` directory.

---

## 📁 Repository Structure

```
IranianBanks/
├── index.html                 # Interactive showcase & validator (GitHub Pages root)
├── style.css                  # Responsive dark-theme styling
├── app.js                     # Live detector & search controller
├── data/
│   └── banks.json             # Canonical JSON directory of all institutions
├── logos/
│   ├── svg/                   # Standalone clean SVG vectors
│   └── png/                   # 512x512 transparent PNG assets
├── lib/
│   ├── iranian-banks.js       # Single-file JavaScript/TypeScript library
│   ├── iranian-banks.py       # Single-file Python library
│   └── iranian-banks.php      # Single-file PHP library
└── README.md
```

---

## 🚀 Quick Start

### 1. JavaScript / TypeScript

```javascript
const { detect, isValidCard, isValidSheba, detectCard } = require('./lib/iranian-banks.js');

// 1. Live autodetect (Card or SHEBA)
const result = detect('5022291234567890');
console.log(result.bank.name_fa); // "ویپاد (ترابانک پاسارگاد)"
console.log(result.bank.color);   // "#0E7490"
console.log(result.valid);        // true (Luhn check passed)

// 2. SHEBA detection
const shebaResult = detect('IR020120000000000000000001');
console.log(shebaResult.bank.name_fa); // "بانک ملت"
```

### 2. Python

```python
import iranian_banks as ib

# Autodetect by Card or SHEBA
res = ib.detect('6219861812345678')
print(res['bank']['name_fa']) # 'بلوبانک (نئوبانک سامان)'
print(res['valid'])           # True
```

### 3. PHP

```php
<?php
require_once __DIR__ . '/lib/iranian-banks.php';
use MehrNet\IranianBanks;

$res = IranianBanks::detect('5022291234567890');
echo $res['bank']['name_fa']; // ویپاد (ترابانک پاسارگاد)
echo $res['valid'] ? 'Valid' : 'Invalid';
```

---

## 🏛 Covered Banks & Neo-banks

| Institution | Type | BIN Prefix | SHEBA Code | SVG Logo |
| :--- | :---: | :---: | :---: | :---: |
| **ویپاد (WePod)** | Neo-bank | `502229` | `057` | [SVG](logos/svg/wepod.svg) |
| **بلوبانک (BluBank)** | Neo-bank | `62198618`, `62198619` | `056` | [SVG](logos/svg/blubank.svg) |
| **بانکینو (Bankino)** | Neo-bank | `505785` | `078` | [SVG](logos/svg/bankino.svg) |
| **بانکت (Banket)** | Neo-bank | — | `060` | [SVG](logos/svg/banket.svg) |
| **توبانک (Tobank)** | Neo-bank | — | `064` | [SVG](logos/svg/tobank.svg) |
| **امیدبانک (Omidbank)** | Neo-bank | — | `015` | [SVG](logos/svg/omidbank.svg) |
| **آبانک (Abank)** | Neo-bank | — | `062` | [SVG](logos/svg/abank.svg) |
| **بانک ملی ایران (Melli)** | Bank | `603799`, `170019` | `017` | [SVG](logos/svg/melli.svg) |
| **بانک ملت (Mellat)** | Bank | `610433`, `991975` | `012` | [SVG](logos/svg/mellat.svg) |
| **بانک صادرات ایران (Saderat)** | Bank | `603769`, `903769` | `019` | [SVG](logos/svg/saderat.svg) |
| **بانک سپه (Sepah)** | Bank | `589210`, `627381` | `015` | [SVG](logos/svg/sepah.svg) |
| **بانک تجارت (Tejarat)** | Bank | `585983`, `627353` | `018` | [SVG](logos/svg/tejarat.svg) |
| **بانک کشاورزی (Keshavarzi)** | Bank | `603770`, `639217` | `016` | [SVG](logos/svg/keshavarzi.svg) |
| **بانک مسکن (Maskan)** | Bank | `628023` | `014` | [SVG](logos/svg/maskan.svg) |
| **بانک سامان (Saman)** | Bank | `621986` | `056` | [SVG](logos/svg/saman.svg) |
| **بانک پاسارگاد (Pasargad)** | Bank | `639347`, `502229` | `057` | [SVG](logos/svg/pasargad.svg) |
| **بانک پارسیان (Parsian)** | Bank | `622106`, `639194` | `054` | [SVG](logos/svg/parsian.svg) |
| **بانک اقتصاد نوین (EN Bank)** | Bank | `627412` | `055` | [SVG](logos/svg/eghtesad-novin.svg) |
| **بانک کارآفرین (Karafarin)** | Bank | `627488` | `053` | [SVG](logos/svg/karafarin.svg) |
| **بانک سینا (Sina)** | Bank | `639346` | `059` | [SVG](logos/svg/sina.svg) |
| **بانک خاورمیانه (Khavarmianeh)** | Bank | `585947` | `078` | [SVG](logos/svg/khavarmianeh.svg) |
| **بانک قرض‌الحسنه مهر ایران** | Bank | `606373` | `060` | [SVG](logos/svg/mehr-iran.svg) |
| **بانک قرض‌الحسنه رسالت** | Bank | `504172` | `070` | [SVG](logos/svg/resalat.svg) |
| *...and 14 more institutions* | | | | |

---

## 📜 License

Released under the [MIT License](LICENSE). Maintained by [MehrNet](https://mehrnet.com).
