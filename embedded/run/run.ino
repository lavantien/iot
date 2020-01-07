#include "DHT.h"
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

#define DHTPIN 4 // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11
#define WFID "t3"
#define WFPW "1234qwer"
#define API "http://localhost:8080"

WiFiMulti wifiMulti;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  Serial.println(F("DHTxx test!"));

  for(uint8_t t = 4; t > 0; t--) {
      Serial.printf("[SETUP] WAIT %d...\n", t);
      Serial.flush();
      delay(1000);
  }

  dht.begin();
  wifiMulti.addAP(WFID, WFPW);
}

void loop() {
  // Reading temperature or humidity takes about 250 milliseconds to 2 seconds
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%, Temperature: "));
  Serial.print(t);
  Serial.print(F("°C, Heat index: "));
  Serial.print(hic);
  Serial.println(F("°C."));

  // wait for WiFi connection
  if((wifiMulti.run() == WL_CONNECTED)) {
      HTTPClient http;
      Serial.print("[HTTP] begin...\n");
      // configure traged server and url
      http.begin("http://example.com/index.html"); //HTTP
      Serial.print("[HTTP] GET...\n");
      // start connection and send HTTP header
      int httpCode = http.GET();
      // httpCode will be negative on error
      if(httpCode > 0) {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("[HTTP] GET... code: %d\n", httpCode);
          // file found at server
          if(httpCode == HTTP_CODE_OK) {
              String payload = http.getString();
              Serial.println(payload);
          }
      } else {
          Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
      http.end();
  } 

  delay(60000);
}
