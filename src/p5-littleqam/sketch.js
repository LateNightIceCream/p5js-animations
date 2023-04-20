let framerate = 30;

let amplitude;
let comfreq;

let t=0;

let signal1, signal2, signal3;
let ampSlider1;

function setup() {


  createCanvas(1000, 600);
  frameRate(framerate);

  comfreq   = 1.618/width;
  amplitude = 0.618*height/2;

  signal1 = new QuadSignal(amplitude, comfreq, 0);
  signal2 = new QuadSignal(amplitude, comfreq, HALF_PI);

  // the sum
  signal3 = new QuadSignal(amplitude, comfreq, HALF_PI);

  ampSlider1 = createSlider(-amplitude*1.382, amplitude*1.382, amplitude);
  ampSlider1.position(10, 10);
  ampSlider1.style('width', '200px');

  ampSlider2 = createSlider(-amplitude*1.382, amplitude*1.382, amplitude);
  ampSlider2.position(220, 10);
  ampSlider2.style('width', '200px');

}

function draw() {

//  background(360 * 0.145898, 50, 100);
  background("#FFEE80");

  strokeWeight(5);

  signal2.amplitude = ampSlider1.value();
  signal1.amplitude = ampSlider2.value();

  stroke("#A1C9FF");
  signal1.show();

  stroke("#BF92E8");
  signal2.show();

  stroke("#FFADB7");

  signal3.yvals = signal2.add(signal1);

  signal3.show();


  t += 0.1;


}

class QuadSignal {

  constructor(_amplitude, _frequency, _phase) {

    this.amplitude = _amplitude;
    this.frequency = _frequency;
    this.phase     = _phase;

    this.xvals = [];
    this.yvals = [];

    this.compute();

  }


  show() {

    for(var i=0; i<width; i++) {
      if(i!=0) {

        line(i-1, height/2+this.yvals[i-1], i, height/2+this.yvals[i]); // draw line from previous to current

      } else {}

    }

  }

  compute() {

    for(var i=0; i<width; i++) {

      this.yvals[i] = this.amplitude * sin(2*PI*this.frequency*i + this.phase);
      this.xvals[i] = i;

    }

  }

  add(quadsignal) {

    this.compute();
    quadsignal.compute();

    var tempy = [];

    for(var i = 0; i<width; i++) {

      tempy[i] = this.yvals[i] + quadsignal.yvals[i];

    }

    return tempy;


  }



}
