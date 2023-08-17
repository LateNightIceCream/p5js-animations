let circleColor = "#20c997";
let bgColor     = "#f8f9fa";
let axisColor   = "#495057";
let wave1Color  = "#ff6b6b";
let lineColor   = "#e9ecef";

let wave1;
let waveXZ, waveYZ;
let axisLength;

let t = 0;
let ellipseArray = [];
let maxEllipsePoints = 1000;

let ampSliderXZ, ampSliderYZ;
let phaseSliderXZ, phaseSliderYZ;
let wlSliderXZ, wlSliderYZ;

function setup () {

    createCanvas(700, 500, WEBGL);

    frameRate(60);

    setupSliders();

    axisLength = 200;
    //    wave1  = new Wave(axisLength/2, -axisLength/2,0, 100);
    //   waveXZ = new Wave(axisLength/2, 0,0, 100);
    //   waveYZ = new Wave(0, -axisLength/2,0, 100);

    wave1  = new Wave(axisLength/2, -axisLength/2, 0, 100);
    waveXZ = new Wave(axisLength/2, 0, 0, 100);
    waveYZ = new Wave(0, -axisLength/2, 0, 100);

    waveXZ.functionY = (time, pos) => 0;
    waveYZ.functionX = (time, pos) => 0;

    wave1.functionX = (time, pos) => 0;
    wave1.functionY = (time, pos) => 0;

    wave1.color  = wave1Color;

    ellipseArray = [];
}



function draw () {

    background(bgColor);
    smooth();
    orbitControl();
    drawAxes(200);

    waveXZ.amplitude = ampSliderXZ.value();
    waveYZ.amplitude = ampSliderYZ.value();
    waveXZ.phase     = phaseSliderXZ.value();
    waveYZ.phase     = phaseSliderYZ.value();

    wave1.calcPoints(t);
    waveXZ.calcPoints(t);
    waveYZ.calcPoints(t);

    wave1.add([waveXZ, waveYZ]);

    wave1.show();
    waveXZ.show();
    waveYZ.show();

    polarizationTrace(wave1);
    drawConnectionLines();

    t+=0.015625;

}


function drawAxes (size) {
    stroke(axisColor);
    line(0,0,0, size, 0,0);
    line(0,0,0, 0, -size,0);
    line(0,0,0, 0, 0,size);
}

function drawConnectionLines () {
    let startXZ = createVector(waveXZ.pointArray[0].x, waveXZ.pointArray[0].y, waveXZ.pointArray[0].z).add(createVector(waveXZ.x, waveXZ.y, waveXZ.z));
    let startYZ = createVector(waveYZ.pointArray[0].x, waveYZ.pointArray[0].y, waveYZ.pointArray[0].z).add(createVector(waveYZ.x, waveYZ.y, waveYZ.z));
    let end     = createVector(wave1.pointArray[0].x, wave1.pointArray[0].y, wave1.pointArray[0].z).add(createVector(wave1.x, wave1.y, wave1.z));

    stroke(lineColor);
    line(startXZ.x, startXZ.y, startXZ.z, end.x, end.y, end.z);
    line(startYZ.x, startYZ.y, startYZ.z, end.x, end.y, end.z);
}

function resetEllipseArray () {
    ellipseArray.length = 0;
}

function polarizationTrace (wave) {

    if (ellipseArray.length == maxEllipsePoints) {
        resetEllipseArray();
    }

    let px = wave.pointArray[0].x + wave.x;
    let py = wave.pointArray[0].y + wave.y;
    let pz = wave.pointArray[0].z + wave.z;

    ellipseArray.push(createVector(px,py,pz));

    stroke(circleColor);
    ellipseArray.forEach(p => {
        point(p.x, p.y, p.z);
    });
}


class Wave {

    constructor (x, y, z, wavelength) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.wavelength = wavelength;

        this.propSpeed     = 10;
        this.frequency     = this.propSpeed / this.wavelength;
        this.length        = 3 * this.wavelength;
        this.numOfPoints   = this.length;
        this.pointDistance = this.length/this.numOfPoints;
        this.phase         = 0;
        this.amplitude     = 50;

        this.color = "#868e96";

        this.pointArray = [];
        this.initPoints();
    }

    show (t = 0) {
        stroke(this.color);
        this.showPoints();
    }

    calcPoints (t) {
        this.pointArray.forEach((p, index) => {
            p.x = this.functionX(t, index);
            p.y = this.functionY(t, index);
            p.z = this.functionZ(t, index);
        });
    }

    functionX (time, position) {
        return this.amplitude * sin( -2*PI*this.frequency * time + 2*PI/this.wavelength * position * this.pointDistance + this.phase);
    }

    functionY (time, position) {
        return -this.amplitude * sin( -2*PI*this.frequency * time + 2*PI/this.wavelength * position * this.pointDistance + this.phase);
    }

    functionZ (time, position) {
        return position * this.pointDistance;
        return this.amplitude * sin( 2*PI*this.frequency * time + 2*PI/this.wavelength * position * this.pointDistance + this.phase);
    }

    showPoints () {
        this.pointArray.forEach(p => {
            point(this.x + p.x, this.y + p.y, this.z + p.z);
        });
    }

    initPoints () {
        for (let i = 0; i < this.numOfPoints; i++) {
            this.pointArray.push(createVector(this.x, this.y, this.z));
        }
    }

    add (waves) {
        waves.forEach (wave => {
            this.pointArray.forEach ((p, index) => {
                p.x += wave.pointArray[index].x;
                p.y += wave.pointArray[index].y;
            });
        });
    }

}

function setupSliders () {

    let vertSpace = 26;

    let minAmp = 0;
    let maxAmp = axisLength*3;
    let step   = 2;
    ampSliderXZ = createSlider(minAmp, maxAmp, minAmp, step);
    ampSliderXZ.position(10, 10);
    ampSliderXZ.style('width', '80px');

    ampSliderYZ = createSlider(minAmp, maxAmp);
    ampSliderYZ.position(100, 10);
    ampSliderYZ.style('width', '80px');

    let minPhase = 0;
    let maxPhase = 2*PI;
    step = 0.0625;
    phaseSliderXZ = createSlider(minPhase, maxPhase, minPhase, step);
    phaseSliderXZ.position(10, 10+vertSpace);
    phaseSliderXZ.style('width', '80px');

    phaseSliderYZ = createSlider(minPhase, maxPhase, minPhase, step);
    phaseSliderYZ.position(100, 10+vertSpace);
    phaseSliderYZ.style('width', '80px');

    let minWL = axisLength / 10;
    let maxWL = axisLength * 10;
    step = 2;
    /*wlSliderXZ = createSlider(minWL, maxWL, minWL, step);
    wlSliderXZ.position(10, 10+vertSpace*2);
    wlSliderXZ.style('width', '80px');
    */
    /*wlSliderYZ = createSlider(minWL, maxWL, minWL, step);
    wlSliderYZ.position(100, 10+vertSpace*2);
    wlSliderYZ.style('width', '80px');
    */
    ampSliderXZ.input(resetEllipseArray);
    ampSliderYZ.input(resetEllipseArray);
    phaseSliderXZ.input(resetEllipseArray);
    phaseSliderYZ.input(resetEllipseArray);
    //wlSliderXZ.input(resetEllipseArray);
    //wlSliderYZ.input(resetEllipseArray);
}
