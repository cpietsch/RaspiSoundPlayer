
#define sensorIR A0

float sensorValue, inches, cm;  

#include <MedianFilter.h>
MedianFilter Filter;
int filtered;

unsigned long time;
boolean gone = true;
int timeout;
char inChar;
boolean debug = false;
int triggerDistance;

void setup() {
  //Serial.begin(9600);
  //Filter.begin();
  Keyboard.begin();
    
  time = millis();
  timeout = 100;
  triggerDistance = 200;
}

void loop() {
  sensorValue = analogRead(sensorIR);
  //sensorValue= Filter.run(analogRead(sensorIR));

  cm = 10650.08 * pow(sensorValue,-0.935) - 10;
  
  if(cm<triggerDistance){
    if(millis()-time>timeout && gone){
      time = millis();
      // we got a move!!
//      digitalWrite(13,HIGH);
//      delay(20);
//      digitalWrite(13,LOW);
//      Serial.println("play");
        Keyboard.press('n');
        Keyboard.releaseAll();

    }
    gone = false;
  } else {
    gone = true;
  }
  delay(100);
  
//  if (Serial.available() > 0) {
//     inChar = Serial.read();
//     if(inChar == 'd') debug = !debug;
//  }
  
  //if(debug) Serial.println(cm);
}
