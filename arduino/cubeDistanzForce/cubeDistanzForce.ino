
#define sensorIR A0

float sensorValue, inches, cm;  

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
  time = millis();
  timeout = 100;
  triggerDistance = 200;
  
  Keyboard.begin();

}

void loop() {
  sensorValue = analogRead(sensorIR);
  //sensorValue= Filter.run(analogRead(sensorIR));

  cm = 10650.08 * pow(sensorValue,-0.935) - 10;
  
  if(cm<triggerDistance){
    Keyboard.press('n');
    Keyboard.releaseAll();
  }
  delay(50);
  
//  if (Serial.available() > 0) {
//     inChar = Serial.read();
//     if(inChar == 'd') debug = !debug;
//  }
  
 // if(debug) Serial.println(cm);
}
