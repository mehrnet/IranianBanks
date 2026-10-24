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

| Logo | Institution | Type | BIN Prefix | SHEBA Code |
| :---: | :--- | :---: | :---: | :---: |
| [![WePod](logos/svg/wepod.svg)](logos/svg/wepod.svg) | **ویپاد (ترابانک پاسارگاد) (WePod)** | Neo-bank | `502229` | `057` |
| [![BluBank](logos/svg/blubank.svg)](logos/svg/blubank.svg) | **بلوبانک (نئوبانک سامان) (BluBank)** | Neo-bank | `62198618`, `62198619` | `056` |
| [![Bankino](logos/svg/bankino.svg)](logos/svg/bankino.svg) | **بانکینو (نئوبانک خاورمیانه) (Bankino)** | Neo-bank | `505785` | `078` |
| [![Banket](logos/svg/banket.svg)](logos/svg/banket.svg) | **بانکت (نئوبانک مهر ایران) (Banket)** | Neo-bank | — | `060` |
| [![Tobank](logos/svg/tobank.svg)](logos/svg/tobank.svg) | **توبانک (نئوبانک گردشگری) (Tobank)** | Neo-bank | — | `064` |
| [![Omid Bank](logos/svg/omidbank.svg)](logos/svg/omidbank.svg) | **امیدبانک (بانک دیجیتال سپه) (Omid Bank)** | Neo-bank | — | `015` |
| [![Abank](logos/svg/abank.svg)](logos/svg/abank.svg) | **آبانک (بانک دیجیتال آینده) (Abank)** | Neo-bank | — | `062` |
| [![Central Bank of Iran (CBI)](logos/svg/cbi.svg)](logos/svg/cbi.svg) | **بانک مرکزی جمهوری اسلامی ایران (Central Bank of Iran (CBI))** | Central Bank | — | `010` |
| [![Bank Melli Iran](logos/svg/melli.svg)](logos/svg/melli.svg) | **بانک ملی ایران (Bank Melli Iran)** | Bank | `603799`, `170019` | `017` |
| [![Bank Sepah](logos/svg/sepah.svg)](logos/svg/sepah.svg) | **بانک سپه (Bank Sepah)** | Bank | `589210`, `627381`, `639599`, `504172`, `627760` | `015` |
| [![Bank Mellat](logos/svg/mellat.svg)](logos/svg/mellat.svg) | **بانک ملت (Bank Mellat)** | Bank | `610433`, `991975` | `012` |
| [![Bank Saderat Iran](logos/svg/saderat.svg)](logos/svg/saderat.svg) | **بانک صادرات ایران (Bank Saderat Iran)** | Bank | `603769`, `903769` | `019` |
| [![Tejarat Bank](logos/svg/tejarat.svg)](logos/svg/tejarat.svg) | **بانک تجارت (Tejarat Bank)** | Bank | `585983`, `627353` | `018` |
| [![Agri Bank (Keshavarzi)](logos/svg/keshavarzi.svg)](logos/svg/keshavarzi.svg) | **بانک کشاورزی (Agri Bank (Keshavarzi))** | Bank | `603770`, `639217` | `016` |
| [![Bank Maskan](logos/svg/maskan.svg)](logos/svg/maskan.svg) | **بانک مسکن (Bank Maskan)** | Bank | `628023` | `014` |
| [![Refah Bank](logos/svg/refah.svg)](logos/svg/refah.svg) | **بانک رفاه کارگران (Refah Bank)** | Bank | `589463` | `013` |
| [![Bank Pasargad](logos/svg/pasargad.svg)](logos/svg/pasargad.svg) | **بانک پاسارگاد (Bank Pasargad)** | Bank | `639347`, `502229` | `057` |
| [![Saman Bank](logos/svg/saman.svg)](logos/svg/saman.svg) | **بانک سامان (Saman Bank)** | Bank | `621986` | `056` |
| [![Parsian Bank](logos/svg/parsian.svg)](logos/svg/parsian.svg) | **بانک پارسیان (Parsian Bank)** | Bank | `622106`, `639194`, `627884` | `054` |
| [![Eghtesad Novin Bank](logos/svg/eghtesad-novin.svg)](logos/svg/eghtesad-novin.svg) | **بانک اقتصاد نوین (Eghtesad Novin Bank)** | Bank | `627412` | `055` |
| [![Karafarin Bank](logos/svg/karafarin.svg)](logos/svg/karafarin.svg) | **بانک کارآفرین (Karafarin Bank)** | Bank | `627488`, `502910` | `053` |
| [![Sina Bank](logos/svg/sina.svg)](logos/svg/sina.svg) | **بانک سینا (Sina Bank)** | Bank | `639346` | `059` |
| [![Sarmayeh Bank](logos/svg/sarmayeh.svg)](logos/svg/sarmayeh.svg) | **بانک سرمایه (Sarmayeh Bank)** | Bank | `639607` | `058` |
| [![Shahr Bank](logos/svg/shahr.svg)](logos/svg/shahr.svg) | **بانک شهر (Shahr Bank)** | Bank | `502806`, `504706` | `061` |
| [![Day Bank](logos/svg/dey.svg)](logos/svg/dey.svg) | **بانک دی (Day Bank)** | Bank | `502938` | `066` |
| [![Ayandeh Bank](logos/svg/ayandeh.svg)](logos/svg/ayandeh.svg) | **بانک آینده (Ayandeh Bank)** | Bank | `636214` | `062` |
| [![Tourism Bank (Gardeshgari)](logos/svg/gardeshgari.svg)](logos/svg/gardeshgari.svg) | **بانک گردشگری (Tourism Bank (Gardeshgari))** | Bank | `505416`, `505426` | `064` |
| [![Iran Zamin Bank](logos/svg/iran-zamin.svg)](logos/svg/iran-zamin.svg) | **بانک ایران زمین (Iran Zamin Bank)** | Bank | `505785` | `069` |
| [![Middle East Bank](logos/svg/khavarmianeh.svg)](logos/svg/khavarmianeh.svg) | **بانک خاورمیانه (Middle East Bank)** | Bank | `585947` | `078` |
| [![Qarz Al-Hasaneh Mehr Iran Bank](logos/svg/mehr-iran.svg)](logos/svg/mehr-iran.svg) | **بانک قرض‌الحسنه مهر ایران (Qarz Al-Hasaneh Mehr Iran Bank)** | Bank | `606373` | `060` |
| [![Resalat Qarz Al-Hasaneh Bank](logos/svg/resalat.svg)](logos/svg/resalat.svg) | **بانک قرض‌الحسنه رسالت (Resalat Qarz Al-Hasaneh Bank)** | Bank | `504172` | `070` |
| [![Post Bank Iran](logos/svg/post.svg)](logos/svg/post.svg) | **پست بانک ایران (Post Bank Iran)** | Bank | `627760` | `021` |
| [![Tosee Taavon Bank](logos/svg/tosee-taavon.svg)](logos/svg/tosee-taavon.svg) | **بانک توسعه تعاون (Tosee Taavon Bank)** | Bank | `502908` | `051` |
| [![Export Development Bank of Iran (EDBI)](logos/svg/tosee-saderat.svg)](logos/svg/tosee-saderat.svg) | **بانک توسعه صادرات ایران (Export Development Bank of Iran (EDBI))** | Bank | `627648`, `207177` | `020` |
| [![Bank of Industry and Mine](logos/svg/sanat-madan.svg)](logos/svg/sanat-madan.svg) | **بانک صنعت و معدن (Bank of Industry and Mine)** | Bank | `627961` | `022` |
| [![Melal Credit Institution](logos/svg/melal.svg)](logos/svg/melal.svg) | **موسسه اعتباری ملل (Melal Credit Institution)** | Credit Institution | `606256` | `075` |
| [![Noor Credit Institution](logos/svg/noor.svg)](logos/svg/noor.svg) | **موسسه اعتباری نور (Noor Credit Institution)** | Credit Institution | `507677` | `080` |

---

## 📜 License

Released under the [MIT License](LICENSE). Maintained by [MehrNet](https://mehrnet.com).
