# define PinCLK 2
# define PinDT 4

int counter = 0;
int pos = 0;
int CLKState;
int CLKLastState;

void setup(){
  pinMode (PinCLK, INPUT);
  pinMode (PinDT, INPUT);

  Serial.begin (9600);

  CLKLastState = digitalRead(PinCLK);
}

void loop(){
  CLKState = digitalRead(PinCLK);
  if (CLKState != CLKLastState){
    if (digitalRead(PinDT) != CLKState){
      counter --;
    } else {
      counter ++;
    }
    if (counter > 12){
      counter = abs(counter) -12;
    }
    if (counter <=0){
      counter = 12- abs(counter);
    }
    Serial.print ("Position:");
    Serial.println(counter);
  }
  CLKLastState = CLKState;
}
