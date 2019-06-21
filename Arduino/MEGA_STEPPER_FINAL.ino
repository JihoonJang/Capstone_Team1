#include <Stepper.h>
#define MOTOR_NUM 8
const int stepsPerRevolution = 32;  // change this to fit the number of steps per revolution
String inString = "";
bool flag = false;
int rot[MOTOR_NUM + 1];

const int degree[64] = {0, 2016, 256, 992, 1984, 128, 448, 896, 
                        512, 224, 768, 1248, 960, 1152, 1472, 1920, 
                        32, 160, 800, 1952, 64, 96, 1088, 1376, 
                        1056, 672, 1824, 416, 320, 864, 1344, 608, 
                        1024, 480, 1280, 1504, 192, 1408, 704, 640, 
                        1536, 736, 1792, 1760, 1216, 384, 1728, 1664, 
                        288, 928, 544, 1184, 832, 1120, 1856, 352, 
                        1312, 1440, 1568, 1696, 576, 1888, 1600, 1632};
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper stepper[MOTOR_NUM] = { Stepper(stepsPerRevolution,2,3,4,5),
               Stepper(stepsPerRevolution,6,7,8,9),
               Stepper(stepsPerRevolution,10,11,12,13),
               Stepper(stepsPerRevolution,22,23,24,25),9
               Stepper(stepsPerRevolution,30,31,32,33),
               Stepper(stepsPerRevolution,38,39,40,41),
               Stepper(stepsPerRevolution,26,27,28,29),
};

int curDegree[12] = { 0,0,0,0,0,0,0,0,0,0,0,0 };

void setup() {
  // set the speed at 60 rpm:
  for (int i = 0; i < MOTOR_NUM; i++) {
    stepper[i].setSpeed(300);
  }

  Serial.begin(115200);
  Serial3.begin(115200);
}

void loop() {
  // step one revolution  in one direction:
  flag = 1;
  if (flag) { // string end
      for (int i = 0; i < MOTOR_NUM; i++) {
        //Serial.println("rot : " + String(rot[i]));
        //Serial.println("curDegree : " + String(curDegree[i]));
        //rot[i] = 128;
      }
      int num = 0;
      int checked[MOTOR_NUM];
      for (int i = 0; i < MOTOR_NUM; i++)
        checked[i] = 0;
        
      int completed = 0;
      flag = false;
      while (completed < MOTOR_NUM) {
        for (int i = 0; i < MOTOR_NUM; i++) {
          if (rot[i] > 0) {
            stepper[i].step(1);
            rot[i]--;
          }
          else if (checked[i] == 0) {
            checked[i] = 1;
            completed++;
          }
      }
    }
  }
}

char prev = 0;
char inChar = 0;

void serialEvent3() {
  while (Serial3.available()) {
    int commaCount = 0;
    prev = inChar;
    inChar = Serial3.read();
    int num = 0;
    
    Serial.write(inChar);
    inString += inChar;
    
    // [5,3,2,1,6,4,1,10]
    if (prev == '[' && inChar == '"') {
      inString = ""; // string 초기화
      //flag = true;
      
    }

    if (prev == '"' && inChar == ']') {
      for (int i = 0; inString[i] != ']'; i++) {
        if (inString[i] == ',') {
          Serial.println(String(num));
          rot[commaCount] = degree[num] - curDegree[commaCount];
          if(rot[commaCount]<0) rot[commaCount] += 2048;
          curDegree[commaCount] = degree[num];
          num = 0;
          commaCount++;
        }
        else {
          num = num * 10 + (inString[i] - '0');
        }
      }
      flag = true; 
    }
  }
}
