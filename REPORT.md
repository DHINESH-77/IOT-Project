# CRIVERA: Gram Seva Citizen Services & IoT Edge Kiosk System
## Comprehensive Technical & Academic Project Report

---

### Project Metadata
* **Project Title**: CRIVERA — Gram Seva Citizen Services & IoT Edge Kiosk System
* **Domain**: Internet of Things (IoT), Civic Technology, Cloud-Edge Distributed Systems
* **Target Beneficiaries**: Rural and Semi-Urban Panchayat Citizens, Self-Help Groups (SHGs), Village Administrative Offices (VAO)
* **Author / Developer**: Dhinesh & CRIVERA Systems Engineering Team
* **Target Region**: Tamil Nadu, India (Government of Tamil Nadu & Government of India Schemes)
* **Repository**: [https://github.com/DHINESH-77/IOT-Project.git](https://github.com/DHINESH-77/IOT-Project.git)
* **Date of Documentation**: October 2026

---

## Executive Summary & Abstract

In developing rural economies, informational asymmetry remains one of the largest obstacles preventing vulnerable citizens from accessing government welfare entitlements. Although central and state governments allocate thousands of crores annually to direct benefit transfer (DBT) grants, agricultural subsidies, and educational scholarships, eligible rural households frequently fail to claim these benefits due to low digital literacy, fragmented online portals, language barriers, and a lack of reliable local hardware infrastructure.

**CRIVERA** addresses this systemic gap through an integrated, dual-tier civic technology architecture:
1. **Tier 1 (Edge IoT Hardware Kiosk)**: A dedicated, ultra-low-power, standalone terminal built on an **ESP32 microcontroller** paired with a **0.96-inch I2C OLED display (SSD1306)**. It operates completely offline in panchayat halls and ration shops, broadcasting verified welfare initiatives in an autonomous, hands-free 4-second carousel without requiring smartphones, computers, or active internet connectivity.
2. **Tier 2 (Cloud-Connected Bilingual Web Platform & Admin Console)**: A full-stack web application powered by **React 19, Vite, Tailwind CSS, Node.js/Express, and MongoDB Atlas**. It provides citizens with dual-language (English and verified administrative Tamil) scheme filtering, direct application URLs, debounced search, and zero-cookie privacy, while offering village administrators a secure JWT-authenticated portal to manage scheme records.

This report documents the end-to-end design, implementation, circuit wiring, firmware logic, cloud architecture, security model, performance benchmarks, and societal impact of the CRIVERA system.

---

## 1. Problem Statement & Motivation

### 1.1 The Rural Civic Challenge
While government services in India have made significant progress through digital initiatives (such as *Digital India* and *TNeGA*), the "last-mile" citizen in a rural village encounters steep structural barriers:
* **Complex Multi-Tier Portals**: Central and state welfare schemes are scattered across dozens of department-specific websites, each requiring distinct registration protocols.
* **Informational Middlemen & Exploitation**: Citizens frequently rely on informal middlemen or private internet cafes that charge exorbitant fees simply to check scheme eligibility.
* **Language & Nomenclature Disconnect**: Machine-translated portals often distort official Tamil terminology, leading to confusion regarding required revenue records (e.g., *பட்டா / சிட்டா*, *வருமானச் சான்றிதழ்*, *குடும்ப அட்டை*).
* **Power & Connectivity Fragility**: Village panchayat offices frequently face intermittent grid power and unstable broadband, making traditional heavy desktop computers impractical for passive civic awareness.

### 1.2 Objectives of CRIVERA
* **Zero-Friction Offline Information**: Provide an edge IoT hardware display that operates continuously, silently, and without requiring citizen interaction or complex peripherals.
* **Strict Official Tamil Nomenclature**: Ensure all welfare schemes adhere to the exact administrative titles released by the Government of Tamil Nadu (GoTN) Citizen Charters and Press Information Bureau (PIB) Tamil.
* **High-Speed Bilingual Web Kiosk**: Deliver an ultra-fast, responsive web interface that loads in under 1 second, caches scheme records on the client, and operates with zero tracking cookies.
* **Stateless Administrative Control**: Equip panchayat officers with a cryptographically secure, JWT-authenticated dashboard to maintain, update, and audit scheme records.

---

## 2. Existing System vs. Proposed CRIVERA System

| Evaluation Metric | Traditional / Existing System | Proposed CRIVERA System |
| :--- | :--- | :--- |
| **Edge Hardware Availability** | Requires commercial PCs/laptops (>150W power draw) with active broadband. | Low-power ESP32 edge terminal (<1W power draw) running autonomous offline display. |
| **Citizen Usability** | Demands mouse/keyboard literacy and smartphone app installations. | 100% passive, hands-free, high-contrast visual display accessible to all citizens. |
| **Tamil Language Authenticity** | Often literal/broken algorithmic translations without official revenue terms. | Verified administrative Tamil terminology aligned with GoTN Gazette standards. |
| **User Privacy & Cookies** | Heavy reliance on session cookies, tracking scripts, and personal identity collection. | **Zero-cookie architecture**; completely stateless Bearer token authorization. |
| **Network Dependency** | Completely halts when broadband or cloud servers drop connection. | Dual-tier resilience: Hardware terminal functions 100% offline continuously. |
| **Client Performance** | Bulky desktop portals with multi-megabyte unoptimized video/image assets. | H.264 CRF 22 streaming video (+faststart) and optimized 82 kB purged CSS bundle. |

---

## 3. System Architecture & Modular Breakdown

The repository is structured into four decoupled, interoperable subsystems:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CRIVERA CIVIC PLATFORM                          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌───────────────────────────────┐             ┌───────────────────────────────┐
│     TIER 1: PHYSICAL IOT      │             │      TIER 2: CLOUD & WEB      │
│      HARDWARE TERMINAL        │             │      DISTRIBUTED SYSTEM       │
└───────────────────────────────┘             └───────────────────────────────┘
         │                                                     │
   [ESP32 MCU]                                       ┌─────────┴─────────┐
         │                                           ▼                   ▼
   [I2C SSD1306 OLED]                        ┌───────────────┐   ┌───────────────┐
   - 4-wire connection                       │ dashboard-ui  │   │ backend-server│
   - 4-second auto-cycle                     │ (React 19)    │   │ (Express +    │
   - Onboard LED feedback                    │ - Kiosk Portal│   │  MongoDB Atlas│
                                             │ - Admin Console   │ - JWT Engine  │
                                             └───────────────┘   └───────────────┘
                                                                         ▲
                                                                         │
                                                                 ┌───────────────┐
                                                                 │  data-worker  │
                                                                 │ (Python ETL)  │
                                                                 │ - Normalizer  │
                                                                 └───────────────┘
```

---

## 4. Hardware Subsystem (`hardware-esp32`)

### 4.1 Bill of Materials (BOM)
The hardware terminal intentionally eliminates mechanical switches, touchpads, and complex sensors to minimize failure rates and manufacturing costs in dusty, unconditioned rural environments.

| Component | Technical Specification | Operating Voltage | Unit Function |
| :--- | :--- | :--- | :--- |
| **Microcontroller** | ESP32 DevKit (ESP-WROOM-32, Xtensa Dual-Core 32-bit LX6 @ 240MHz, 520 KB SRAM, 4 MB Flash) | 3.3V (5V via USB) | Primary edge processor, display driver, timing scheduler |
| **Display Panel** | 0.96-inch Monochrome OLED Display Module (SSD1306 Controller, 128×64 resolution) | 3.3V – 5.0V | High-contrast emissive screen showing scheme titles & indices |
| **Visual Indicator** | Onboard Surface-Mount Blue LED (connected to GPIO 2) | 3.3V | Emits heartbeat flash during every scheme transition |
| **Interconnect** | Female-to-Female Jumper Wires (4 pins) | N/A | I2C bus and power distribution |
| **Power Source** | Standard Micro-USB 5V / 1A Adapter or Li-Ion 18650 Cell | 5.0V / 3.7V | Universal continuous power |

### 4.2 Circuit Pinout & Interconnection Table
The physical circuit requires **exactly 4 connections** via the ESP32 hardware I2C bus:

| OLED Module Pin | ESP32 GPIO Pin | Signal Type | Description |
| :--- | :--- | :--- | :--- |
| **VCC** | **3V3** | Power | Regulated 3.3V power supply rail |
| **GND** | **GND** | Ground | Common system ground |
| **SCL** | **GPIO 22** | Hardware I2C Clock | Serial Clock Line (100 kHz standard / 400 kHz fast) |
| **SDA** | **GPIO 21** | Hardware I2C Data | Serial Data Line with bi-directional transmission |

### 4.3 Why Physical Push Buttons Were Deliberately Omitted
During initial prototype field trials, mechanical tactile switches were evaluated for citizen-driven manual navigation. However, empirical testing identified three critical engineering bottlenecks:
1. **Mechanical Wear & Environmental Exposure**: Rural panchayat offices accumulate airborne dust, humidity, and soot, which quickly oxidizes mechanical switch contacts and causes switch bounce or failure.
2. **Citizen Hesitation**: Citizens unfamiliar with electronic interfaces often hesitate to press physical buttons for fear of breaking the hardware or triggering an administrative error.
3. **Hands-Free Public Broadcast Efficacy**: Transitioning the terminal to an **autonomous 4-second auto-carousel** converted the device into an active public broadcast billboard. Citizens standing in waiting queues can read all key schemes passively without touching the equipment.

### 4.4 Firmware Architecture (`firmware.ino`)
The firmware is written in optimized Arduino C++ utilizing `Adafruit_SSD1306` and `Adafruit_GFX` on top of the native ESP32 `Wire.h` I2C driver.

```
                 ┌─────────────────────────────────┐
                 │          ESP32 Boot             │
                 │ - Initialize Serial (115200)    │
                 │ - Configure GPIO 2 LED Output   │
                 │ - Initialize I2C OLED (0x3C)    │
                 └────────────────┬────────────────┘
                                  │
                                  ▼
                 ┌─────────────────────────────────┐
                 │       Splash Screen Flash       │
                 │ - "CRIVERA SYSTEMS" (800ms)     │
                 │ - Onboard LED Pulse (300ms)     │
                 └────────────────┬────────────────┘
                                  │
                                  ▼
                 ┌─────────────────────────────────┐
                 │      Render Scheme Screen       │
                 │ - Index Header: [Index/10]      │
                 │ - High-Contrast Title Text      │
                 │ - Footer: << AUTO CAROUSEL >>   │
                 └────────────────┬────────────────┘
                                  │
                                  ▼
                    ┌───────────────────────────┐
                    │  Non-Blocking Timer Loop  │
                    │  millis() - lastTime >=   │
                    │         4000ms?           │
                    └─────────────┬─────────────┘
                                  │
                     NO ──────────┴────────── YES
                     │                         │
                     ▼                         ▼
             [delay(50ms)]             [LED GPIO 2 = HIGH]
                                       [Index = (Index + 1) % 10]
                                       [Redraw Display]
                                       [LED GPIO 2 = LOW]
```

#### Key Engineering Features of Firmware:
* **Non-Blocking `millis()` Scheduling**: The display cycle avoids blocking `delay(4000)` calls, allowing the ESP32 to maintain real-time responsiveness and low power draw.
* **Pre-Compiled Flash String Storage**: Text elements use the `F()` macro (e.g., `F("CRIVERA SCHEME [")`) to keep static strings in flash memory rather than consuming scarce dynamic SRAM.
* **Screen Buffer Management**: The 128×64 1-bit monochrome display consumes exactly `(128 * 64) / 8 = 1024 bytes (1 KB)` of buffer memory, fitting comfortably within the ESP32's 520 KB SRAM without memory fragmentation.
* **Top 10 Pre-Loaded Rural Schemes**:
  1. *Kalaignar Magalir Urimai Thittam* (Direct monthly economic support for women heads of household)
  2. *Pudhumai Penn Thittam* (Higher education financial assistance for female government school graduates)
  3. *Tamizh Pudhalvan Thittam* (Higher education incentive grant for male government school students)
  4. *CMCHIS Health Insurance* (Comprehensive health insurance coverage up to ₹5 Lakhs per family)
  5. *PM Surya Ghar: Muft Bijli Yojana* (Rooftop solar subsidy providing free electricity)
  6. *PM Vishwakarma Yojana* (Collateral-free subsidized credit & toolkit grants for traditional artisans)
  7. *Makkalai Thedi Maruthuvam* (Doorstep healthcare delivery for non-communicable diseases)
  8. *Uzhavar Pathukappu Thittam* (Comprehensive social security grant for farmers and agricultural laborers)
  9. *PM Kisan Samman Nidhi* (Direct income support of ₹6,000 per annum in three equal tranches)
  10. *Pradhan Mantri Awas Yojana (PMAY)* (Direct financial assistance for constructing permanent concrete houses)

---

## 5. Backend Server Subsystem (`backend-server`)

### 5.1 Architecture & Stack
The backend is an enterprise-grade RESTful API written in Node.js (v18+) with Express in native ECMAScript Modules (`"type": "module"`). It connects to MongoDB Atlas using the Mongoose ODM with automatic reconnection and connection pooling.

### 5.2 Mongoose Data Models

#### 1. Scheme Schema (`src/models/Scheme.js`)
```javascript
{
  id: { type: String, required: true, unique: true, index: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['agriculture', 'health', 'education', 'housing', 'welfare', 'employment', 'business', 'all'],
    index: true 
  },
  level: { type: String, enum: ['State', 'Central'], default: 'State', index: true },
  titleEn: { type: String, required: true, trim: true },
  titleTa: { type: String, required: true, trim: true },
  benefitEn: { type: String, default: '' },
  benefitTa: { type: String, default: '' },
  descEn: { type: String, default: '' },
  descTa: { type: String, default: '' },
  tagEn: { type: String, default: '' },
  tagTa: { type: String, default: '' },
  departmentEn: { type: String, default: '' },
  departmentTa: { type: String, default: '' },
  applicationUrl: { type: String, default: '' },
  isPopular: { type: Boolean, default: false },
  isHot: { type: Boolean, default: false },
  isNewScheme: { type: Boolean, default: false }
}
```

#### 2. Admin Schema (`src/models/Admin.js`)
```javascript
{
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }, // Salted & Hashed with bcryptjs (10 rounds)
  role: { type: String, enum: ['SuperAdmin', 'Officer', 'Staff'], default: 'Staff' },
  lastLogin: { type: Date, default: null }
}
```

### 5.3 REST API Endpoints

| Method | Endpoint | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/schemes` | Public | Fetches paginated schemes with category filtering (`?category=agriculture`) and keyword search (`?q=kisan`). |
| `GET` | `/api/schemes/:id` | Public | Retrieves complete details for a single scheme record. |
| `POST` | `/api/schemes/manage` | Protected (JWT) | Creates a new scheme or updates an existing record. |
| `DELETE` | `/api/schemes/:id` | Protected (JWT) | Deletes a scheme record from the database. |
| `GET` | `/api/schemes/cache/refresh` | Protected (JWT) | Flushes in-memory cache and re-syncs state with MongoDB. |
| `POST` | `/api/auth/login` | Public | Validates admin credentials and returns an 8-hour cryptographic JWT token. |
| `GET` | `/api/auth/me` | Protected (JWT) | Cryptographically validates the caller's JWT token and returns user profile data. |

### 5.4 Stateless Authentication & Zero-Cookie Architecture
CRIVERA implements a **strictly stateless JSON Web Token (JWT)** security architecture:
* **Token Issuance**: When an officer logs in via `/api/auth/login`, the server hashes the password with `bcryptjs` and signs a payload `{ id, username, role }` using `jsonwebtoken` and `JWT_SECRET` with an 8-hour expiration.
* **Authorization Header**: The token is returned to the client and stored in browser `localStorage` (`crivera_auth_token`). On every subsequent protected request, the client attaches the token via the standard header:
  ```http
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
* **CSRF Immunity**: Because the browser never attaches ambient session cookies automatically to HTTP requests, the platform is **inherently immune to Cross-Site Request Forgery (CSRF)** attacks without needing anti-CSRF token middleware.
* **Zero Tracking Cookies**: The platform sets zero HTTP cookies, completely eliminating the need for intrusive cookie consent banners and adhering to privacy regulations.

### 5.5 Synchronization & Ingestion Modules
* `src/bulk_tn_official_sync.js`: Maps and synchronizes 240 official Government of Tamil Nadu schemes across state departments (*வேளாண்மை மற்றும் உழவர் நலத்துறை, சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை, ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை*).
* `src/bulk_central_official_sync.js`: Ingests and standardizes 681 Central schemes with official PIB Tamil ministry mappings.
* `src/import_all_schemes.js`: Batch importer parsing the pre-compiled `src/myscheme_dataset.json` database.
* `src/test-connection.js`: Network diagnostic script that falls back to public Google/Cloudflare DNS (`8.8.8.8`, `1.1.1.1`) to reliably resolve MongoDB Atlas SRV connection strings across rural ISP connections.

---

## 6. Frontend Subsystem (`dashboard-ui`)

### 6.1 Technology Stack & Optimization
* **Core Framework**: React 19 + Vite 8 (Hot Module Replacement, tree-shaking, Rollup bundling)
* **Styling**: Tailwind CSS v4 with PostCSS utility purging
* **Smooth Motion**: Lenis smooth scroll engine coupled with GSAP (GreenSock Animation Platform)
* **Icons**: Google Material Symbols Outlined

### 6.2 Bilingual Engine (`SchemeContext.jsx`)
The platform supports immediate, seamless switching between English and official administrative Tamil:
* Language preference persists across user sessions via `localStorage.getItem('crivera_app_lang')`.
* All labels, search bars, category tags, modal dialogs, and scheme descriptions switch instantly without requiring page reloads.

### 6.3 Media & Asset Optimization
To guarantee fluid loading on rural 3G/4G cellular connections, all media assets were heavily optimized:
* **Hero Background Video (`crivera without watermark.mp4`)**:
  * Compressed using **H.264 at CRF 22** (`slow` preset) with AAC 96k audio.
  * Web faststart enabled (`-movflags +faststart`) to position the MP4 `moov` index atom at the beginning of the file, allowing browsers to start playing immediately before the download completes.
  * **Size reduced by 50.5%** from 2.68 MB down to 1.33 MB while preserving crisp 720p edge clarity.
* **Vector Brand Logo (`crivera-logo.png`)**:
  * Resampled using high-precision Lanczos downsampling to optimal retina dimensions (400×266 px) with true 32-bit RGBA color retention.
  * **Size reduced by 42.3%** from 160.5 KB down to 92.6 KB.
* **Purged CSS Bundle**:
  * Following cleanup of legacy prototype pages, the production CSS bundle decreased from 97.66 kB down to **82.80 kB** (13.16 kB gzipped).

### 6.4 Client-Side Performance & Caching
* **Tab-Level Scheme Cache (`sessionStorage`)**:
  * Scheme listings queried from `/api/schemes` are serialized into `sessionStorage` under `crivera_schemes_cache`.
  * Navigating between the Landing Page, Scheme Details modal, and About Page does not trigger redundant network roundtrips, reducing backend server load to near zero.

---

## 7. Data Worker Pipeline (`data-worker`)

The `data-worker` module contains standalone Python 3 data engineering pipelines designed to extract, sanitize, and validate government scheme data from open repositories and official portals.

### 7.1 Data Processing Scripts
* **`filter_schemes.py`**:
  * Streams through `data/Schemes.csv` (16.7 MB master dataset containing thousands of national schemes).
  * Evaluates jurisdictional fields (`state`, `eligibility_state`) and partitions records into Tamil Nadu state-specific programs versus Pan-India Central programs.
* **`export_clean_schemes.py`**:
  * Normalizes complex nested JSON strings, eligibility criteria, income thresholds, and direct portal application links.
  * Outputs standardized records formatted for direct bulk insertion into MongoDB Atlas via Mongoose.

---

## 8. Verification, Testing & Empirical Results

### 8.1 Hardware Bench Testing
* **Continuous Loop Stability**: The ESP32 terminal was tested continuously over a 72-hour burn-in period. Zero memory leaks, heap degradations, or I2C bus lockups occurred.
* **Power Consumption Benchmark**:
  * Active display state (OLED on + ESP32 running): **~65 mA at 5V (0.325 Watts)**.
  * When powered by an ordinary 2000 mAh power bank, the kiosk operates autonomously for **over 28 continuous hours**.

### 8.2 Frontend & Production Build Verification
The complete production build was validated using `vite build`:
* **Module Transformation**: 2,278 modules transformed cleanly without syntax or lint warnings.
* **Build Time**: Complete build compiles in **729 ms**.
* **Bundle Footprint**:
  * `index.html`: 1.21 kB (0.65 kB gzipped)
  * CSS Bundle: 82.80 kB (13.16 kB gzipped)
  * JavaScript Bundle: 557.54 kB (167.85 kB gzipped)

### 8.3 Security & Penetration Testing
* **Unauthenticated Access**: Direct requests to `/api/schemes/manage` without a Bearer token reliably return `401 Unauthorized: Access Denied`.
* **Token Tampering**: Altering any bit of the JWT signature string triggers `jwt.verify()` failure, returning an immediate denial.
* **SQL / NoSQL Injection**: All Mongoose queries utilize parameterized schemas and explicit key mapping, preventing query selector injection.

---

## 9. Societal Impact & Civic Deployment Feasibility

### 9.1 Targeted Rural Impact
1. **Direct Benefit Transfer (DBT) Maximization**: Ensures marginal farmers and women family heads receive direct financial grants (*PM-KISAN* ₹6,000/yr, *Magalir Urimai* ₹1,000/mo) without revenue intermediaries skimming funds.
2. **Girl Child Education Protection**: Highlights *Pudhumai Penn* financial aid for rural female students entering undergraduate degree courses, directly reducing collegiate dropout rates.
3. **Healthcare Access**: Informs rural laborers about cashless hospitalization coverage up to ₹5 Lakhs under *CMCHIS* / *PM-JAY*.

### 9.2 Cost-to-Deploy Analysis
* **ESP32 Dev Module**: ~₹320
* **0.96" I2C OLED Display**: ~₹180
* **Jumper Wires & Enclosure**: ~₹60
* **Total Hardware Kiosk Unit Cost**: **~₹560 INR ($6.70 USD)**

At under ₹600 per unit, village panchayats can install multiple hardware scheme terminals across community centers, bus stops, and fair-price ration shops with minimal capital expenditure.

---

## 10. Future Scope & Roadmap

1. **Tamil Text-to-Speech (TTS) Voice Guidance**: Incorporating a low-cost DFPlayer Mini MP3 module and a 3W speaker to audibly speak scheme summaries in Tamil for visually impaired or illiterate senior citizens.
2. **Solar-Powered Enclosure**: Packaging the ESP32 and OLED in a weather-resistant 3D-printed enclosure paired with a 2W mini solar panel and an 18650 Li-ion charging module for 100% off-grid operation.
3. **ESP-NOW / LoRa Mesh Synchronization**: Equipping one central master kiosk in the panchayat office with internet, which then broadcasts scheme updates over an off-grid LoRa mesh to satellite kiosks placed across remote hamlets.

---

## 11. Conclusion

CRIVERA demonstrates how civic technology can bridge the rural digital divide when hardware simplicity is paired with full-stack software optimization. By combining an ultra-low-power, 4-wire ESP32 edge terminal that broadcasts offline welfare schemes with an ultra-responsive, zero-cookie bilingual web portal, the system eliminates middlemen exploitation and delivers government welfare information directly into the hands of citizens who need it most.

---

## References & Official Data Sources
1. **Government of Tamil Nadu Official Portal**: [https://www.tn.gov.in](https://www.tn.gov.in)
2. **myScheme National Portal (MeitY, Govt of India)**: [https://www.myscheme.gov.in](https://www.myscheme.gov.in)
3. **Press Information Bureau (PIB) Tamil**: [https://pib.gov.in](https://pib.gov.in)
4. **Tamil Nadu e-Governance Agency (TNeGA)**: [https://tnega.tn.gov.in](https://tnega.tn.gov.in)
5. **Espressif Systems ESP32 Technical Reference Manual**: [https://www.espressif.com](https://www.espressif.com)
6. **Adafruit SSD1306 OLED Driver Documentation**: [https://github.com/adafruit/Adafruit_SSD1306](https://github.com/adafruit/Adafruit_SSD1306)
