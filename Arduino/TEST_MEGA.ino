#include <MemoryFree.h>
#include <EEPROM.h>

#define FIRST_PIN 0   // первый вывод
#define LAST_PIN 53   // последний вывод
#define PIN_LED  13   // вывод светодиода

void PinTest1(byte pin)
{
  if(pin < 10) Serial.print("PIN:  ");
  else Serial.print("PIN: ");
  Serial.print(pin);
  pinMode(pin, OUTPUT);
  digitalWrite(pin, 0);
  Serial.print("    LOW: ");
  if(!digitalRead(pin)) Serial.print("OK  ");
  else Serial.print("FAIL");
  digitalWrite(pin, 1);
  Serial.print("  HIGH: ");
  if(digitalRead(pin)) Serial.print("OK  "); 
  else Serial.print("FAIL");
  pinMode(pin, INPUT);
  Serial.print("  PULL UP: ");
  if(digitalRead(pin)) Serial.print("OK  ");
  else Serial.print("FAIL");
  digitalWrite(pin, 0);
}

void PinTest2(byte pin)
{
  Serial.print("     ");
  pinMode(pin, OUTPUT);
  digitalWrite(pin, 1);
  delay(5);
  if(!digitalRead(pin))Serial.println("SHORT");
  else Serial.println("OK");
  pinMode(pin, INPUT); 
  digitalWrite(pin, 0);

}

void EEPROMTest() {

        }

void displayHelp() {
  Serial.println(F("\nArduino hardware test"));
  Serial.println(F("\ta = Blink test"));
  Serial.println(F("\tb = EEPROM test"));
  Serial.println(F("\tc = Pins test"));
  Serial.println(F("\t? = Help page"));
  Serial.println();
}
 
void setup() {
  Serial.begin(115200); 
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  displayHelp();
}

void loop() {
  if (Serial.available() > 0) {
    switch (Serial.read()) {
      case 'a': // Тест светодиодом
        Serial.print(F("\nBlink test:"));
        Serial.print(F("\n\tStart blinking - please check the board led\n\t"));
        for(byte i = 1; i <= 10; i++) {
          digitalWrite(PIN_LED, HIGH);
          delay(1000);
          Serial.print(".");
          digitalWrite(PIN_LED, LOW);
          delay(1000);
          Serial.print(F("."));
        }
        Serial.print("\n\tStop blinking\n");
        Serial.println();
        displayHelp();
      break;
      case 'b':
        Serial.print(F("\nEEPROM test:\n"));
        Serial.print("\tSRAM free size: ");
        Serial.print(freeMemory());
        Serial.print(F(" bytes\n"));
        Serial.print("\tEEPROM size: ");
        Serial.print(EEPROM.length());
        Serial.print(F(" bytes\n"));
        Serial.println();
        displayHelp();
      break;
      case 'c': // Тест на короткое замыкание выводов
        Serial.print(F("\nTest of short circuit on GND or VCC and between pins:\n"));
        for(byte i = FIRST_PIN; i <= LAST_PIN; i++) {
          for(byte j = FIRST_PIN; j <= LAST_PIN; j++) {
            pinMode(j, INPUT);
            digitalWrite(j, 0);
          }
          Serial.print(F("\t"));
          PinTest1(i);
          for(byte j = FIRST_PIN; j <= LAST_PIN; j++) {
            pinMode(j, OUTPUT);
            digitalWrite(j, 0);
          }
          PinTest2(i);
        }
        for(byte j = FIRST_PIN; j <= LAST_PIN; j++) {
          pinMode(j, INPUT);
          digitalWrite(j, 0);
        }
        displayHelp();
      break;
      case '?':
        displayHelp();
      break;
      default:
        Serial.println();
      break;
    }
  }
}

