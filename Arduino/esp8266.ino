#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

const char* ssid = "AndroidHotspot2133";
const char* password = "shms0729";
const char* host = "3.15.75.68";
const int httpPort = 8000;
ESP8266WebServer server(80);
MDNSResponder mdns;

String webPage = "";
     
int led_pin = 13;
     
void setup(void){
     
  // подготовка:
  pinMode(led_pin, OUTPUT);
  digitalWrite(led_pin, LOW);
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  
  // chip setting
  Serial.println("");
  Serial.println("ESP8266 board info:");
  Serial.print("\tChip ID: ");
  Serial.println(ESP.getFlashChipId());
  Serial.print("\tCore Version: ");
  Serial.println(ESP.getCoreVersion());
  Serial.print("\tChip Real Size: ");
  Serial.println(ESP.getFlashChipRealSize());
  Serial.print("\tChip Flash Size: ");
  Serial.println(ESP.getFlashChipSize());
  Serial.print("\tChip Flash Speed: ");
  Serial.println(ESP.getFlashChipSpeed());
  Serial.print("\tChip Speed: ");
  Serial.println(ESP.getCpuFreqMHz());
  Serial.print("\tChip Mode: ");
  Serial.println(ESP.getFlashChipMode());
  Serial.print("\tSketch Size: ");
  Serial.println(ESP.getSketchSize());
  Serial.print("\tSketch Free Space: ");
  Serial.println(ESP.getFreeSketchSpace());

  webPage += "<h1>ESP8266 Web Server</h1>";
  webPage += "<p>Chip ID: ";
  webPage += ESP.getFlashChipId();
  webPage += "</p>";
  webPage += "<p>Core Version: ";
  webPage += ESP.getCoreVersion();
  webPage += "</p>";
  webPage += "<p>Chip Real Size: ";
  webPage += ESP.getFlashChipRealSize()/1024;
  webPage += " Kbit</p>";
  webPage += "<p>Chip Size: ";
  webPage += ESP.getFlashChipSize()/1024;
  webPage += " Kbit</p>";
  webPage += "<p>Chip Flash Speed: ";
  webPage += ESP.getFlashChipSpeed()/1000000;
  webPage += " MHz</p>";
  webPage += "<p>Chip Work Speed: ";
  webPage += ESP.getCpuFreqMHz();
  webPage += " MHz</p>";
  webPage += "<p>Chip Mode: ";
  webPage += ESP.getFlashChipMode();
  webPage += "</p>";
  webPage += "<p>MOTOR state <a href=\"MOTOR_ON\"><button>ON</button></a>&nbsp;<a href=\"MOTOR_OFF\"><button>OFF</button></a></p>";

  // wifi connect
  WiFi.begin(ssid, password);
  Serial.println("");
     
  while (WiFi.status() != WL_CONNECTED) { // do while until success wifi connection
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");  
  Serial.println(ssid);
  Serial.print("IP address: ");  
  Serial.println(WiFi.localIP());


/*
  if (mdns.begin("esp8266", WiFi.localIP())) {
    Serial.println("MDNS responder started");
  }
     
  server.on("/", [](){
    server.send(200, "text/html", webPage);
  });
  
  server.on("/MOTOR_ON", [](){
    server.send(200, "text/html", webPage);
    Serial.println("[MOTOR ON]");
    delay(1000);
  });
  
  server.on("/MOTOR_OFF", [](){
    server.send(200, "text/html", webPage);
    Serial.println("[MOTOR OFF]");
    delay(1000);
  });
  
  server.begin();
  Serial.println("HTTP server started");
  */
}
     
void loop(void){
  //connect to server
  WiFiClient client;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  Serial.println("connect to server success!");
  // We now create a URI for the request
  String url = "/";
  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
  int timeout = millis() + 5000;
  while (client.available() == 0) {
    if (timeout - millis() < 0) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }
  //server.handleClient();
}
