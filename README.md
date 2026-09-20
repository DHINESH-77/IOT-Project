# CRIVERA — Gram Seva Citizen Services & IoT Kiosk System

An integrated civic tech platform delivering verified Government of Tamil Nadu and Central Government welfare schemes to citizens across rural and semi-urban panchayats through interactive web kiosks and IoT hardware terminals.

---

## 🏛️ Architecture Overview

The system is composed of four modular subsystems:

```
gram-seva-system/
├── backend-server/     # Node.js + Express + MongoDB Atlas REST API
├── dashboard-ui/       # React + Vite + Tailwind CSS Citizen Kiosk & Admin Console
├── hardware-esp32/     # ESP32 + SSD1306 OLED Physical Scheme Kiosk Terminal
└── data-worker/        # Python data processing & scheme ingestion pipeline
```

### 1. Backend Server (`/backend-server`)
* **Framework**: Express.js (ES Modules)
* **Database**: MongoDB Atlas with Mongoose ORM
* **Features**:
  * Dual-language REST API endpoints (`/api/schemes`, `/api/auth`)
  * Full schema indexing across categories (`welfare`, `education`, `agriculture`, `health`, `housing`)
  * Automated official synchronization modules for 240 Tamil Nadu state schemes and 681 Central government schemes
  * In-memory cache with instant refresh capabilities (`GET /api/schemes/cache/refresh`)

### 2. Dashboard & Kiosk UI (`/dashboard-ui`)
* **Framework**: React 18 + Vite
* **Features**:
  * **Citizen Services Kiosk**: Dual-language interface (English & official Tamil) with state persistence via `localStorage`.
  * **Admin Command Center**: Real-time scheme analytics, telemetry digital twin, hot scheme leaderboards, and live event streaming.
  * **Strict Tamil Typography & Grammar**: Official nomenclature sourced directly from Tamil Nadu Citizen Charters and PIB Tamil.

### 3. Physical IoT Kiosk Terminal (`/hardware-esp32`)
* **Target**: ESP32 Microcontroller
* **Hardware**: I2C SSD1306 128x64 OLED display + dual tactile buttons for scheme navigation.
* **Firmware**: `firmware.ino` with tactile navigation and LED event feedback.

### 4. Data Processing Worker (`/data-worker`)
* **Scripts**: Scheme ingestion and sanitization pipelines (`export_clean_schemes.py`, `discover_api.py`, `filter_schemes.py`).
* **Data**: Master source CSV repository.

---

## 🚀 Quick Start Guide

### Prerequisites
* Node.js (v18+)
* MongoDB Atlas connection string
* Arduino IDE or PlatformIO (for ESP32 flashing)

### Running Backend Server
```bash
cd backend-server
npm install
# Ensure .env has MONGODB_URI and JWT_SECRET
npm run dev
```

### Running Frontend Dashboard
```bash
cd dashboard-ui
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Official Tamil Scheme Integrity
All 921 welfare schemes in the platform are verified against:
* **Government of Tamil Nadu (GoTN)** Citizen Charters & Government Orders (G.O.s)
* **Government of India / PIB Tamil** official release titles
* Standardized administrative terminology (குடும்ப அட்டை, வருமானச் சான்றிதழ், பட்டா / சிட்டா, நேரடி வங்கி வரவு)

---

## 📄 License
CRIVERA Core Civic Infrastructure — Open Civic Project.
