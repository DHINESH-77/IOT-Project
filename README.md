# CRIVERA — Gram Seva Citizen Services & IoT Kiosk System

An integrated civic technology infrastructure designed to bridge the digital divide in rural and semi-urban panchayats. The platform delivers verified Government of Tamil Nadu (GoTN) and Central Government welfare schemes to citizens through **dual interfaces**:
1. **Interactive Web Kiosks & Admin Management Portal** (React 19 + Tailwind CSS + Node.js/Express + MongoDB)
2. **Dedicated Low-Power Offline Edge Hardware Terminal** (ESP32 Microcontroller + SSD1306 I2C OLED Auto-Carousel)

---

## 🏛️ System Architecture

The repository is organized into four modular subsystems:

```
gram-seva-system/
├── hardware-esp32/     # Physical IoT edge terminal firmware (ESP32 + 0.96" OLED only)
│   └── firmware.ino    # Arduino C++ production firmware with auto-cycling carousel
├── backend-server/     # Node.js + Express + MongoDB Atlas REST API & sync engine
│   ├── src/controllers/  # Auth & Scheme CRUD controllers
│   ├── src/models/       # Mongoose schemas (Scheme, Admin)
│   ├── src/middleware/   # JWT Bearer authentication middleware
│   └── src/routes/       # Express route handlers
├── dashboard-ui/       # Citizen Kiosk UI & Officer Administration Console
│   ├── src/pages/        # Public Landing, Scheme Catalog, Admin Dashboard
│   ├── src/context/      # SchemeContext (bilingual) & AuthContext (JWT)
│   └── public/           # Fast-start compressed hero video & vector branding
└── data-worker/        # Python data processing & scheme ingestion pipeline
    ├── export_clean_schemes.py # Normalization and JSON/CSV exporter
    ├── filter_schemes.py       # Central vs. Tamil Nadu state scheme separator
    └── data/Schemes.csv        # Master dataset
```

---

## ⚡ 1. Hardware Subsystem (`hardware-esp32`)

The hardware kiosk is an ultra-low-power, standalone edge terminal designed for continuous public display in village panchayat offices, common service centers (CSCs), and ration shops. It runs fully offline and hands-free, automatically broadcasting verified welfare initiatives on a high-contrast OLED screen without needing complex wiring, smartphones, or computers.

### 🔌 Bill of Materials (BOM) & Components

| Component | Specification | Quantity | Role |
| :--- | :--- | :--- | :--- |
| **Microcontroller** | ESP32 Dev Module (ESP-WROOM-32 / 30-pin or 38-pin DevKit) | 1 | Microcontroller running firmware, timing loop, and display buffer |
| **Display** | 0.96" Monochrome I2C OLED (SSD1306 driver, 128×64 px) | 1 | High-contrast visual broadcast of scheme index and titles |
| **Status Feedback** | Onboard Blue SMD LED (GPIO 2) | 1 | Transition heartbeat pulse on each scheme auto-cycle |
| **Connecting Wires** | Female-to-Female Jumper Wires | 4 | Direct 4-pin I2C hookup between ESP32 and OLED |
| **Power Supply** | Micro-USB Cable (5V / 1A) or 3.7V Li-ion battery | 1 | Continuous terminal power |

> **Note on Switches/Buttons**: No physical buttons or external switches are required. The terminal operates autonomously in hands-free continuous auto-carousel mode, cycling through key schemes every 4 seconds.

---

### 📌 Circuit Pinout & Wiring Table (4 Wires Only)

The hardware connection requires only **4 jumper wires** between the ESP32 and the 0.96" OLED display:

| OLED Pin | ESP32 GPIO Pin | Connection Type | Description |
| :--- | :--- | :--- | :--- |
| **VCC** | **3V3** | Power (3.3V) | Positive power rail |
| **GND** | **GND** | Ground | Common system ground |
| **SCL** | **GPIO 22** | Hardware I2C Clock | Serial Clock Line (`Wire.h` default on ESP32) |
| **SDA** | **GPIO 21** | Hardware I2C Data | Serial Data Line (`Wire.h` default on ESP32) |

---

### 💻 Firmware Code (`hardware-esp32/firmware.ino`)

The complete, verified production firmware source code:

```cpp
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ==========================================
// OLED Display Config (128x64 I2C)
// ==========================================
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Onboard Blue LED for scheme transition feedback
#define LED_PIN 2

// ==========================================
// Scheme Titles (Top Verified Welfare Schemes)
// ==========================================
const char* schemeTitles[] = {
  "1. Kalaignar Magalir\n   Urimai Thittam",
  "2. Pudhumai Penn\n   Thittam",
  "3. Tamizh Pudhalvan\n   Thittam",
  "4. CMCHIS Health\n   Insurance",
  "5. PM Surya Ghar:\n   Muft Bijli Yojana",
  "6. PM Vishwakarma\n   Yojana",
  "7. Makkalai Thedi\n   Maruthuvam",
  "8. Uzhavar Pathukappu\n   Thittam",
  "9. PM Kisan Samman\n   Nidhi",
  "10. Pradhan Mantri\n    Awas Yojana (PMAY)"
};

const int totalSchemes = sizeof(schemeTitles) / sizeof(schemeTitles[0]);
int currentIndex = 0;

// Auto-carousel timing (cycles every 4 seconds)
unsigned long lastDisplayTime = 0;
const unsigned long displayDurationMs = 4000;

void renderScreen() {
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);

  // Top Index Header
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print(F("CRIVERA SCHEME ["));
  display.print(currentIndex + 1);
  display.print(F("/"));
  display.print(totalSchemes);
  display.println(F("]"));

  display.drawLine(0, 10, 128, 10, SSD1306_WHITE);

  // Scheme Title (Clean and high-contrast)
  display.setTextSize(1);
  display.setCursor(0, 18);
  display.println(schemeTitles[currentIndex]);

  // Bottom Status Bar
  display.drawLine(0, 52, 128, 52, SSD1306_WHITE);
  display.setCursor(10, 55);
  display.println(F("<< AUTO CAROUSEL >>"));

  display.display();
}

void setup() {
  Serial.begin(115200);

  // Configure Status LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  // Initialize OLED (I2C default on ESP32: SDA = GPIO 21, SCL = GPIO 22)
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed - check I2C wiring (SDA=21, SCL=22)"));
    while (true);
  }

  // Welcome Flash
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.setTextSize(1);
  display.setCursor(16, 18);
  display.println(F("CRIVERA SYSTEMS"));
  display.setCursor(18, 36);
  display.println(F("Loading Schemes..."));
  display.display();

  // Quick LED pulse
  digitalWrite(LED_PIN, HIGH);
  delay(300);
  digitalWrite(LED_PIN, LOW);
  delay(800);

  // Initial render
  renderScreen();
  lastDisplayTime = millis();
}

void loop() {
  // Automatically rotate to next scheme every 4 seconds
  if (millis() - lastDisplayTime >= displayDurationMs) {
    lastDisplayTime = millis();

    // Pulse onboard LED on transition
    digitalWrite(LED_PIN, HIGH);

    currentIndex = (currentIndex + 1) % totalSchemes;
    renderScreen();

    delay(60);
    digitalWrite(LED_PIN, LOW);
  }

  delay(50);
}
```

---

### 🛠️ Hardware Setup & Flashing Instructions

1. **Connect the 4 Wires**:
   - OLED `VCC` → ESP32 `3V3`
   - OLED `GND` → ESP32 `GND`
   - OLED `SCL` → ESP32 `GPIO 22`
   - OLED `SDA` → ESP32 `GPIO 21`
2. **Open Arduino IDE** (v2.x or later).
3. **Install ESP32 Board Package**:
   - Go to **File** → **Preferences** → **Additional Boards Manager URLs**:
     ```
     https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
     ```
   - Go to **Boards Manager**, search for `esp32` by Espressif Systems, and click **Install**.
4. **Install Required Libraries**:
   - Go to **Tools** → **Manage Libraries...**
   - Search & install **Adafruit SSD1306**
   - Search & install **Adafruit GFX Library**
5. **Flash the Code**:
   - Select Board: `DOIT ESP32 DEVKIT V1` (or `ESP32 Dev Module`).
   - Select Port: Your active ESP32 COM port (e.g., `COM3`).
   - Click **Upload**.
6. **Result**: The OLED immediately displays `CRIVERA SYSTEMS Loading Schemes...` and begins cycling through each scheme every 4 seconds with a gentle onboard LED transition pulse.

---

## 🖥️ 2. Backend Server (`backend-server`)

The backend is built with Node.js and Express in native ES Modules (`"type": "module"`), communicating with MongoDB Atlas via Mongoose.

### Key Features
* **Stateless JWT Authentication**: Issues signed tokens on login; verified cryptographically via `authMiddleware.js` on protected routes without database session lookups.
* **REST API**:
  * `GET /api/schemes`: Paginated, categorized, and searchable scheme queries.
  * `POST /api/schemes/manage`: Administrative scheme creation/updates (requires Bearer token).
  * `POST /api/auth/login`: Admin credentials authentication.
  * `GET /api/auth/me`: Cryptographic token verification.
* **Official Data Synchronizers**:
  * `src/bulk_tn_official_sync.js`: Ingests and normalizes 240 Tamil Nadu state schemes.
  * `src/bulk_central_official_sync.js`: Ingests and normalizes 681 Central government schemes.
  * `src/seed.js`: Seeds default admin accounts and initial welfare schemes.

### Environment Setup (`backend-server/.env`)
Create a `.env` file inside `backend-server/`:
```env
PORT=5000
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="crivera_super_secret_jwt_key_2026"
NODE_ENV=development
```

### Running the Backend
```bash
cd backend-server
npm install

# Start in development mode with live watch:
npm run dev

# Or run official dataset seed / sync scripts:
npm run seed
npm run import-all
```

---

## 📱 3. Citizen Kiosk & Admin UI (`dashboard-ui`)

The frontend application is built using React 19, Vite 8, and Tailwind CSS.

### Key Features
* **Bilingual English & Tamil Support**:
  * Complete Tamil terminology sourced directly from official Government of Tamil Nadu Citizen Charters (e.g., *கலைஞர் மகளிர் உரிமைத் திட்டம்*, *புதுமைப் பெண் திட்டம்*, *பட்டா / சிட்டா*, *நேரடி வங்கி வரவு*).
  * Instant, persistent language switching across all pages.
* **Optimized High-Performance Media**:
  * Hero background video compressed with H.264 CRF 22 with fast-start web streaming enabled (reduced by 50.5% from 2.68 MB to 1.33 MB).
  * Vector brand identity compressed with lossless 32-bit RGBA Lanczos resampling (reduced by 42.3%).
* **Smooth Navigation**:
  * Lenis smooth scrolling with custom deceleration curve.
  * GSAP ScrollTrigger integrations for focus states.
* **Admin Command Console**:
  * JWT Bearer token authentication stored in browser `localStorage`.
  * Scheme CRUD operations, analytics digital twin, and hot scheme leaderboards.
  * Session-level scheme cache in `sessionStorage` for low-latency queries.

### Running the Dashboard
```bash
cd dashboard-ui
npm install

# Start local development server (http://localhost:5173):
npm run dev

# Build optimized production bundle:
npm run build
```

---

## 📊 4. Data Processing Worker (`data-worker`)

The `data-worker` module provides standalone Python utilities to ingest, clean, categorize, and cross-reference government scheme datasets.

### Scripts
* `filter_schemes.py`: Inspects `data/Schemes.csv` and partitions records into Tamil Nadu state schemes and Central government initiatives.
* `export_clean_schemes.py`: Normalizes fields (eligibility criteria, income limits, application links, scheme benefits) into clean JSON records for MongoDB ingestion.

### Running Data Worker Scripts
```bash
cd data-worker
python filter_schemes.py
python export_clean_schemes.py
```

---

## 🔒 Security & Privacy Notice
* **Zero Cookie Architecture**: The platform does **not** set or use HTTP tracking cookies.
* **CSRF Immune**: Authentication relies on client-managed JWT tokens in `Authorization: Bearer <token>` headers rather than ambient cookies, preventing Cross-Site Request Forgery (CSRF).
* **Open Citizen Access**: Public scheme discovery is available freely without login requirements or personal identifying information (PII) tracking.

---

## 📜 Verified Scheme Integrity
All welfare schemes within CRIVERA are cross-referenced with:
1. **Government of Tamil Nadu (GoTN)** Citizen Charters & Government Orders.
2. **Press Information Bureau (PIB) Tamil** & **myScheme Portal** (Ministry of Electronics and Information Technology, Govt. of India).
3. Official Tamil administrative terminology (*குடும்ப அட்டை, வருமானச் சான்றிதழ், கிராம நிர்வாக அலுவலர்*).

---

## 📄 License
CRIVERA Systems & Infrastructure — Open Civic Technology Initiative.
