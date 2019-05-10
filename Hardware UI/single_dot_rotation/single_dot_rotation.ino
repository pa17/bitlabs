#include "PinChangeInt.h" // PinChange Interrupt library
#include "FastLED.h" // FastLED library
#include <Adafruit_NeoPixel.h>

# define PinCLK 2
# define PinDT 4
# define PIN 5

int counter = 0;
int pos = 0;
int CLKState;
int CLKLastState;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(13, PIN, NEO_GRB + NEO_KHZ800);

void setup(){
  strip.begin();
  strip.setBrightness(3); //adjust brightness here
  strip.show(); // Initialize all pixels to 'off'
  pinMode (PinCLK, INPUT);
  pinMode (PinDT, INPUT);

  Serial.begin (9600);

  CLKLastState = digitalRead(PinCLK);
}

void loop(){
  strip.clear();
  CLKState = digitalRead(PinCLK);
  if (CLKState != CLKLastState){
    if (digitalRead(PinDT) != CLKState){
      counter --;
    } else {
      counter ++;
    }
    if (counter > 24){
      counter = abs(counter) -24;
    }
    if (counter <=0){
      counter = 24- abs(counter);
    }
    pos = counter/2;
    Serial.print ("Position:");
    Serial.println(pos);
    Serial.println(counter);
  }
  CLKLastState = CLKState;
  
  strip.setPixelColor(pos, 255, 0, 255);  
  //strip.setPixelColor(6, 255, 0, 255);  
  strip.show();

}
