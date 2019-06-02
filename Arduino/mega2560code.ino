#include <MemoryFree.h>
#include <EEPROM.h>
#include <StepperMulti.h>

#define PIN_LED 13    // вывод светодиода
String inString;
int flag = 0;
const int stepsPerRevolution = 200;
StepperMulti stepper1(stepsPerRevolution, 2, 3, 4, 5);

// Настройка
void setup() {
  // Инициализация портов и выходов
  Serial.begin(115200);
  Serial3.begin(115200);
  stepper1.setSpeed(60);
  pinMode(PIN_LED, OUTPUT);
  digitalWrite(PIN_LED, LOW);
}

// Выполнение
void loop() {
  if(flag ==0 )
    return;
  stepper1.setStep(512);
  stepper1.moveStep();
  
}

// Проверка события на порту Serial3
void serialEvent3() {
  while (Serial3.available()) {
    // Чтение данных из порта Serial3
    char inChar = Serial3.read();
    // Вывод прочитанных данных в порт Serial
    Serial.write(inChar);
    // Поиск команды в полученных данных (команда должна быть в квадратных скобках)
    inString += inChar;
    if (inChar == ']') {
      if (inString.indexOf("[MOTOR ON]")>0) {
        flag = 1;
      }
      else if (inString.indexOf("[MOTOR OFF]")>0) {
        flag = 0;
      }
      else
      {
        Serial.println("Wrong command");
      }
      inString = "";
    }
  }
}
