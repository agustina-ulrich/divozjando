let lista = [];
let cantidad = 50;
let backgroundColor;

function setup() {
  createCanvas(1200, 600);


  backgroundColor = color(random(255), random(255), random(255));

  for (let i = 0; i < cantidad; i++) {
    let unCirculo = new Circulo();
    lista.push(unCirculo);
  }
}

function draw() {
  background(backgroundColor);
  fill(0);

  let nuevo = new Circulo();
  let estaLibre = true;
  for (let i = 0; i < lista.length; i++) {
    let este = lista[i];
    if (este.seVaAChocarCon(nuevo)) {
      estaLibre = false;
    }
  }
  if (estaLibre) {
    lista.push(nuevo);
  }

  for (let i = 0; i < lista.length; i++) {
    let este = lista[i];
    let tieneLugar = true;

    for (let j = 0; j < lista.length; j++) {
      if (i != j) {
        let otro = lista[j];
        if (este.seVaAChocarCon(otro)) {
          tieneLugar = false;
        }
      }
    }

    if (tieneLugar) {
      este.crecer();
    }
    este.dibujar();
  }
}

function mousePressed() {
  for (let i = 0; i < lista.length; i++) {
    lista[i].intercambiarColores();
  }
}

let margen = 5;
let grosor = 30;

class Circulo {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = 0;
    this.c = random(0.1, 1);
    this.rColor = random(255);
    this.gColor = random(255);
    this.bColor = random(255);
    this.innerRColor = random(255);
    this.innerGColor = random(255);
    this.innerBColor = random(255);
  }

  crecer() {
    this.r += this.c;
  }

  dibujar() {
    noStroke();
    
    fill(this.rColor, this.gColor, this.bColor);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    
    fill(this.innerRColor, this.innerGColor, this.innerBColor);
    ellipse(this.x, this.y, this.r, this.r);
  }

  seVaAChocarCon(otro) {
    return dist(this.x, this.y, otro.x, otro.y) < this.r + this.c + otro.r + otro.c + margen;
  }

  intercambiarColores() {
    let tempRColor = this.rColor;
    let tempGColor = this.gColor;
    let tempBColor = this.bColor;

    this.rColor = this.innerRColor;
    this.gColor = this.innerGColor;
    this.bColor = this.innerBColor;

    this.innerRColor = tempRColor;
    this.innerGColor = tempGColor;
    this.innerBColor = tempBColor;

    if (this.rColor === this.innerRColor && this.gColor === this.innerGColor && this.bColor === this.innerBColor) {
      this.innerRColor = (this.innerRColor + 128) % 255;
      this.innerGColor = (this.innerGColor + 128) % 255;
      this.innerBColor = (this.innerBColor + 128) % 255;
    }
  }
}
