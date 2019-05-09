#include "PinChangeInt.h" // PinChange Interrupt library
#include "FastLED.h" // FastLED library
#include <Adafruit_NeoPixel.h>

# define PinCLK 2
# define PinDT 4
# define PIN 5
#define NUM_LEDS 12

CRGB leds[NUM_LEDS];
int counter = 0;
int pos = 0;
int CLKState;
int CLKLastState;
int brightness = 3;
int fade = 5;
Adafruit_NeoPixel ring = Adafruit_NeoPixel(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup(){
  ring.begin();
  ring.setBrightness(3); //adjust brightness here
  ring.show(); // Initialize all pixels to 'off'
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
    ring.clear();

  }
  CLKLastState = CLKState;
  for (int i=0;i<pos;i++){
    ring.setPixelColor(i,ring.Color(0,255,255)); }
    ring.setBrightness(brightness);
    ring.show();
}
