
#include <StepperMulti.h>>

const int stepsPerRevolution = 200;  // change this to fit the number of steps per revolution
// for your motor

// initialize the stepper library on pins 8 through 11:

StepperMulti stepper1(stepsPerRevolution, D1, D2, D3, D4);
StepperMulti stepper2(stepsPerRevolution, D5, D6, D7, D8);

void setup() {
  // set the speed at 60 rpm:
  stepper1.setSpeed(30);
  stepper2.setSpeed(30);
  // initialize the serial port:
  Serial.begin(9600);
}

void loop() {
  Serial.println("clockwise");
  stepper1.setStep(64);
  stepper2.setStep(128);
  
  stepper1.moveStep();
  stepper2.moveStep();
  delay(1000);
}
