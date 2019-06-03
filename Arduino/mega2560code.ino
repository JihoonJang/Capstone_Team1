#include <MemoryFree.h>
#include <EEPROM.h>
#include <StepperMulti.h>

String inString;
int flag = 0;
const int stepsPerRevolution = 200;
const int degree[64] = {0, 224, 64, 192, 32, 96, 128, 160, 
                        1792, 1760, 1856, 1728, 1824, 1632, 1664, 1696,
                        768, 1504, 1600, 960, 1312, 864, 384, 672, 1280, 
                        736, 832, 1472, 1568, 1120, 640, 928, 256, 480, 
                        576, 1216, 1056, 352, 1408, 1952, 1536, 992, 1344, 
                        704, 800, 1888, 896, 416, 512, 1248, 1088, 1984, 
                        288, 608, 1152, 1440, 1024, 2016, 320, 448, 544, 
                        1376, 1920, 1184};
int curDegree[12] = {0, };
/*
StepperMulti stepper1(stepsPerRevolution, 2, 3, 4, 5);
StepperMulti stepper2(stepsPerRevolution, 6, 7, 8, 9);
StepperMulti stepper3(stepsPerRevolution, 10, 11, 12, 13);
StepperMulti stepper4(stepsPerRevolution, 14, 15, 16, 17);
StepperMulti stepper5(stepsPerRevolution, 18, 19, 20, 21);
StepperMulti stepper6(stepsPerRevolution, 22, 23, 24, 25);
StepperMulti stepper7(stepsPerRevolution, 26, 27, 28, 29);
StepperMulti stepper8(stepsPerRevolution, 30, 31, 32, 33);
StepperMulti stepper9(stepsPerRevolution, 34, 35, 36, 37);
StepperMulti stepper10(stepsPerRevolution, 38, 39, 40, 41);
StepperMulti stepper11(stepsPerRevolution, 42, 43, 44, 45);
StepperMulti stepper12(stepsPerRevolution, 46, 47, 48, 49);
*/
StepperMulti stepper[12];
void setup() {
  for(int i = 0 ; i < 12 ; i++)
    stepper[i] = StepperMulti(stepPerRevolution,4*i+2,4*i+3,4*i+4,4*i+5);
  Serial.begin(115200);
  Serial3.begin(115200);
  stepper1.setSpeed(60);
  
}


void loop() {
  //if(flag ==0 )
  //  return;
  //stepper1.setStep(512);
  //stepper1.moveStep();
  
}


void serialEvent3() {
  while (Serial3.available()) {
    char inChar = Serial3.read();
    Serial.write(inChar);
    inString += inChar;
    if(inChar == '[')
      inString = "";
    else if(inChar == ']'){
      int commaCount = 0;
      int num = 0;
      for (int i = 0; inString[i] != ']'; i++) {
        if (inString[i] == ',') {
          stepper[commaCount].setStep(degree[num] - curDegree[commaCount]);
          curDegree[commaCount] = degree[num];
          stepper[commaCount].moveStep();
          
          num = 0;
          commaCount++;
        }
        else {
          num += num * 10 + (inString[i] - '0');
        }
      }
    }
  }
}
