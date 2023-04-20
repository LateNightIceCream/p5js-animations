var arrow1, arrow2, cosArrow;
var trace1;

var circleRadius;
var circleX, circleY;

var traceStartX;
var maxVertices;

var speedFactor1 = 1;
var speedFactor2 = 1;

var angle = 0;

function setup() {

  createCanvas(1000, 600);

  colorMode(HSB, 360, 100, 100);

  circleX = width * 0.381966;
  circleY = height/2;

  circleRadius = height * 0.23606798;


  arrow1   = new Arrow( circleX, circleY, circleRadius, 0 , 360 * 0.23606798, 10);
  arrow2   = new Arrow( circleX, circleY, circleRadius, 0 , 360 * 0.23606798, 10);
  cosArrow = new Arrow( circleX, circleY, circleRadius, 0 , 360, 50);

  traceStartX = circleX + circleRadius + circleRadius * 0.618034;

  maxVertices = 400;

  trace1   = new Trace(traceStartX, 0, maxVertices, 360);

  frameRate(60);

}

function draw() {

  background(360 * 0.145898, 50, 100);

  arrow1.endy = circleRadius * cos(speedFactor1 * angle);
  arrow1.endx = circleRadius * sin(speedFactor1 * angle);

  arrow2.endy = circleRadius * cos(speedFactor2 * angle);
  arrow2.endx = circleRadius * sin(-speedFactor2 * angle);

  addArrows(arrow1, arrow2, cosArrow);

  cosArrow.endx /= 2;
  cosArrow.endy /= 2;

  trace1.y = cosArrow.starty+cosArrow.endy;

  //stroke(360, 20, 100);
  //line(cosArrow.startx + width * 0.055728, trace1.y, trace1.x - width * 0.055728, trace1.y);

  arrow1.show();
  arrow2.show();
  cosArrow.show();

  trace1.update();
  trace1.show();

  angle += 0.01;

}

class Arrow {

  constructor(_startx, _starty, _endx, _endy, _hue, _sat) {

    this.startx = _startx;
    this.starty = _starty;
    this.endx   = _startx + _endx; // relative coordinates
    this.endy   = _starty + _endy;
    this.hue    = _hue;
    this.sat = _sat;

  }

  show() {

    strokeWeight(4);
    stroke(this.hue, this.sat, 100 );

    line(this.startx, this.starty, this.startx + this.endx, this.starty + this.endy);

  }

}

class Trace {

  constructor(_startx, _starty, _maxOnScreen, _hue) {

    this.startx = _startx;

    this.x = _startx;
    this.y = _starty;
    this.maxOnScreen = _maxOnScreen;
    this.hue = _hue;

    this.historyX = []; // multidim arrays or vectors didnt work for some reason :(
    this.historyY = [];

    this.xBoundary =  width - width * 0.055728;

  }

  update() {

    this.historyX.push(this.x);
    this.historyY.push(this.y);

    if(this.historyY.length > this.maxOnScreen) {

      this.historyY.splice(0,1); //remove oldest entry
      this.historyX.splice(0,1);

    }

    if(this.x > this.xBoundary) { // reset position

      this.x = this.startx;
      this.historyY = [];
      this.historyX = [];
    }


    this.x += 0.5;

  }

  show() {

    stroke(this.hue, 50, 100);
    noFill();

    beginShape();
    for(var i = 0; i < this.maxOnScreen; i++) {

      vertex(this.historyX[i], this.historyY[i]);

    }
    endShape();

    //circle(this.x, this.y, 20);

  }

}

function addArrows(addArrow1, addArrow2, destArrow) {

  destArrow.endx = addArrow1.endx + addArrow2.endx;
  destArrow.endy = addArrow1.endy + addArrow2.endy;

}
