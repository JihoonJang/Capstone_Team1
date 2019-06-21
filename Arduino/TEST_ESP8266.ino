#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

const char* ssid = "AndroidHotspot1651";
const char* password = "qw159357";
const char* host = "3.15.75.68";
const int httpPort = 8000;
ESP8266WebServer server(80);
MDNSResponder mdns;

String webPage = "";

void setup(void){
     
  Serial.begin(115200);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  

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
      String line = client.readString();
      Serial.println(line);
      client.stop();
      return;
  }
  delay(500);
}
