#include <NTPClient.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <WiFiUdp.h>

WiFiClient client;

char ssid[] = "";//  Nome de rede Wifi
char pass[] = ""; // Senha Wi-Fi

char apiKeyValue[] = "tPmAT5Ab3j7F9";

const long utcOffsetInSeconds = -10800;// TIMEZONE DO BRASIL (-3 VEZES 60 VEZES 60);

//DEFINE O CLIENT DA NTP PARA PEGAR O TEMPO
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

const int sensor_id = 1;
int year;
int month;
int day;
int hour;

const int pino_PIR1 = D1;
const int pino_PIR2 = D2;

int leituraPIR1;
int leituraPIR2;

int verificadorContato = 0;

char httpRequestData[255];

void setup(){
  pinMode(pino_PIR1,INPUT);
  pinMode(pino_PIR2,INPUT);
  
  Serial.begin(115200);

  WiFi.begin(ssid, pass);

  while ( WiFi.status() != WL_CONNECTED ) {
    delay ( 500 );
    Serial.print ( "." );
  }

  timeClient.begin();
}

void loop() {
  leituraPIR1 = digitalRead(pino_PIR1);
  if (leituraPIR1 == 1) {
    verificadorContato = 1;
    delay(1000);
    Serial.println ("Passou por 1");
    leituraPIR2 = digitalRead(pino_PIR2);
    if (verificadorContato == 1 && leituraPIR2 == 1) {
      verificadorContato = 2;
      delay(1000);
      Serial.println("Passou por 2");
    }
  }
  
  if (verificadorContato >= 2) {
    getTime();
    Serial.println("Enviar dados");
    EnviaDados();
    verificadorContato = 0;
  }
}

void EnviaDados() {
  if(WiFi.status()== WL_CONNECTED){
    HTTPClient http;
    
    // Your Domain name with URL path or IP address with path
    http.begin(client, "SPEEL/post-esp-data.php");
    
    // Specify content-type header
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // Prepare your HTTP POST request data
    sprintf(httpRequestData, "api_key=%s&sensor_id=%d&year=%d&month=%d&day=%d&hour=%d", apiKeyValue, sensor_id, year, month, day, hour);
    Serial.print("httpRequestData: ");
    Serial.println(httpRequestData);
    
    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);
    String payload = http.getString();
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}

void getTime(){
  timeClient.update();

  unsigned long epochTime = timeClient.getEpochTime();
  
  struct tm *ptm = gmtime ((time_t *)&epochTime); 

  year = ptm->tm_year-134202;
  month = ptm->tm_mon;
  day = ptm->tm_mday-6;
  hour = timeClient.getHours();
}
