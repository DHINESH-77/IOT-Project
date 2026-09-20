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

// ==========================================
// Button & LED Pins
// ==========================================
// 2 Tactile Switches (Internal Pull-Up: Switch to GND)
#define BTN_BACK    18    // Switch 1: Previous Scheme Title (Back)
#define BTN_FRONT   19    // Switch 2: Next Scheme Title (Front)
#define LED_PIN     2     // Onboard Blue LED for press feedback

// ==========================================
// Scheme Titles (English - 2026 to 2024)
// ==========================================
const char* schemeTitles[] = {
  "1. Kalaignar Magalir\n   Urimai Thittam",
  "2. Pudhumai Penn\n   Thittam",
  "3. Tamizh Pudhalvan\n   Thittam",
  "4. CMCHIS Health\n   Insurance (2026)",
  "5. PM Surya Ghar:\n   Muft Bijli Yojana",
  "6. PM Vishwakarma\n   Yojana",
  "7. Makkalai Thedi\n   Maruthuvam",
  "8. Uzhavar Pathukappu\n   Thittam",
  "9. PM Kisan Samman\n   Nidhi",
  "10. Pradhan Mantri\n    Awas Yojana (PMAY)"
};

const int totalSchemes = sizeof(schemeTitles) / sizeof(schemeTitles[0]);
int currentIndex = 0;

// Debounce timing
unsigned long lastPressTime = 0;
const unsigned long debounceMs = 200;

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

  // Scheme Title (Clean and focused)
  display.setTextSize(1);
  display.setCursor(0, 18);
  display.println(schemeTitles[currentIndex]);

  // Bottom Navigation Bar
  display.drawLine(0, 52, 128, 52, SSD1306_WHITE);
  display.setCursor(8, 55);
  display.println(F("<< BACK     FRONT >>"));

  display.display();
}

void setup() {
  Serial.begin(115200);

  // Configure Status LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  // Configure 2 Tactile Buttons with Internal Pull-Ups
  pinMode(BTN_BACK, INPUT_PULLUP);
  pinMode(BTN_FRONT, INPUT_PULLUP);

  // Initialize OLED with your verified address 0x3C
  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed - check wiring/address"));
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

  // Show first scheme title
  renderScreen();
}

void loop() {
  // Read Buttons (LOW when pressed with INPUT_PULLUP)
  bool backPressed  = (digitalRead(BTN_BACK) == LOW);
  bool frontPressed = (digitalRead(BTN_FRONT) == LOW);

  if ((backPressed || frontPressed) && (millis() - lastPressTime > debounceMs)) {
    lastPressTime = millis();

    // Turn on LED for tactile click feedback
    digitalWrite(LED_PIN, HIGH);

    if (frontPressed) {
      // Move to NEXT scheme title
      currentIndex = (currentIndex + 1) % totalSchemes;
    }
    else if (backPressed) {
      // Move to PREVIOUS scheme title
      currentIndex = (currentIndex - 1 + totalSchemes) % totalSchemes;
    }

    // Refresh the OLED
    renderScreen();

    delay(50);
    digitalWrite(LED_PIN, LOW);
  }

  delay(20);
}
