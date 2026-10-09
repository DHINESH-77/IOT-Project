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
