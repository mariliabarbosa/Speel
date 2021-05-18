//#include <WiFi.h>

int pirF;
int pirM;
int pirT;
int contato = 0;
int systemStt = 0;
const int pinos[] = {2,3,4};
int botao;

void setup() {
  pinMode(pinos[0],INPUT); //pirT
  pinMode(pinos[1],INPUT); //pirM
  pinMode(pinos[2],INPUT); //pirF
  //pinMode(pinos[3],INPUT); //botao
  Serial.begin(9600);
  
}

//função para conectar na rede
//função kill switch

void loop() {
 // Serial.println (systemStt);
 // if (systemStt == 1) {
    contagem();
 // }

 // botao = digitalRead(pinos[3]);
  
  //if (botao == 1) {
  //  systemStt = !systemStt;
 // }
}

void contagem() {
  pirT = digitalRead(pinos[0]);
  if (pirT == 1) {
    contato++;
    //passou por pir 1
    pirM = digitalRead(pinos[1]);
    pirF = digitalRead(pinos[2]);
      if (contato > 0 && digitalRead(pirM) == 1) {
        contato++;
        Serial.println("Contato 12");
      } else if (contato > 0 && digitalRead (pirF) == 1) {
        contato++;
        Serial.println("Contato 13");
      }
  }
  
  if (contato >= 2) {
    Serial.println("Contato Confirmado");
    contato = 0;
  }
}
