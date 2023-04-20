let numOfCircles = 38;
let circlePadding = 2;

let amplitude;
let wavelength;

let framerate = 60; //has to be 60 for the wavelength to work out

var t = 0;

var wave1, wave2, wave3;


function setup() {

  createCanvas(1000, 600);
  frameRate(framerate);

  //amplitude = 0.618034 + 5; // funny water animation :D
  amplitude = 0.381966 * height/2;

  wavelength = width/2; //in px

  wave1 = new Wave(amplitude, wavelength, numOfCircles, 360 * 1.618, 1);
  wave2 = new Wave(0.382*amplitude, wavelength, numOfCircles, 360 * 0.618, -1);
  wave3 = new Wave(amplitude, wavelength, numOfCircles, 360 * 0.382, 1);
  //wave2 = new Wave(-amplitude/2, wavelength/1.618, numOfCircles, 360 * 0.3819);

  colorMode(HSB, 360, 100, 100);

}

function draw() {

  background(360 * 0.145898, 50, 100);

  wave3.show();
  wave2.show();
  wave1.show();


  wave1.add(wave2);

  t += 1/framerate; // wave speed

}

class Wave {

  constructor( _amplitude, _wavelength, _circlenum, _hue, _direction) {

    this.amplitude  = _amplitude;
    this.wavelength = _wavelength;
    this.circlenum  = _circlenum;
    this.hue        = _hue;

    this.direction  = _direction; // -1 (r-l) or 1 (l-r)

    this.circleXs = []; // for saving the values and doing calcs with other waves
    this.circleYs = [];

    this.circleDia = width / this.circlenum;




  }

  show() {

    noStroke();

    fill(this.hue, 50, 100);

    for (var i = 0; i < this.circlenum; i++) {

      circle(this.circleXs[i], height/2+this.circleYs[i], this.circleDia-circlePadding);

    }

    this.compute(); //down here to allow for add() to work

   }

  compute() {

    for (var i = 0; i < this.circlenum; i++) {

      this.circleXs[i] = (i + 0.5) * this.circleDia;

      this.angle = map(this.circleXs[i], 0, width, 0, 2*PI) - t * this.direction;

      this.circleYs[i] = this.amplitude * sin(2*PI*framerate/(this.wavelength/8*3)*this.angle); //some magic with the wavelength

    }
  }

  add(secondWave) {

    this.compute();
    secondWave.compute();

    for(var i = 0; i < this.circlenum; i++) {
      this.circleXs[i] += secondWave.circleXs[i];
      this.circleYs[i] += secondWave.circleYs[i];
    }
  }
}
