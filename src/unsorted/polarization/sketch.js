let circleCenter;
let time = 0;
let axesSize = 200;
let circleDia = axesSize/2;

let slider, ampsliderXZ, ampsliderYZ, phasesliderXZ, phasesliderYZ;

let xzWavePoints     = [];
let yzWavePoints     = [];
let resultWavePoints = [];

let propSpeed;
let numOfPoints;
let length;
let pointDistance;
let wavelength;
let frequency;

function setup () {

    createCanvas(700, 500, WEBGL);

    circleCenter = createVector(axesSize/2, -axesSize/2, 0);

    slider = createSlider(axesSize/10, axesSize*3);
    slider.position(10, 10);
    slider.style('width', '80px');

    ampsliderXZ = createSlider(circleDia/4, circleDia*4);
    ampsliderXZ.position(10, 40);
    ampsliderXZ.style('width', '100px');
    ampsliderYZ = createSlider(circleDia/4, circleDia*4);
    ampsliderYZ.position(10, 80);
    ampsliderYZ.style('width', '100px');

    phasesliderXZ = createSlider(0, 2*PI, 0, 0.1);
    phasesliderXZ.position(150, 40);
    phasesliderXZ.style('width', '100px');

    phasesliderYZ = createSlider(0, 2*PI, 0, 0.1);
    phasesliderYZ.position(150, 80);
    phasesliderYZ.style('width', '100px');

    //let wavelength = axesSize/4;
    propSpeed = 20;
    wavelength = axesSize/2;
    frequency=propSpeed/wavelength;

    numOfPoints = 168;
    length = axesSize;
    pointDistance = length/numOfPoints;

    for (let i = 0; i < numOfPoints; i++) {
        xzWavePoints[i] = createVector(0, 0, i*pointDistance);
        yzWavePoints[i] = createVector(0, 0, i*pointDistance);
    }

    for (let i = 0; i < numOfPoints; i++) {
        resultWavePoints[i] = createVector(0, 0, i*pointDistance);
    }

    frameRate(60);

}


function draw () {

    orbitControl();

    background("#f0f0f0");
    smooth();

    wavelength = slider.value();
    let ampXZ = ampsliderXZ.value();
    let ampYZ = ampsliderYZ.value();

    let phaseXZ = phasesliderXZ.value();
    let phaseYZ = phasesliderYZ.value();

    //let ampXZ = circleDia/2;
    //let ampYZ = circleDia/2;
    frequency=propSpeed/wavelength;

    noFill();
    stroke("#000000");
    drawAxes(axesSize);
    circle(circleCenter.x, circleCenter.y, circleDia);
    stroke("#ff00ff");
    circlePoint = createVector(circleCenter.x + ampXZ*cos(2*PI*frequency*time+phaseXZ), circleCenter.y-ampYZ*sin(2*PI*frequency*time+phaseYZ),0);
    point(circlePoint.x,
          circlePoint.y,
          circlePoint.z);

    line(-2,0,axesSize/2,2,0,axesSize/2);


    for (let i = 0; i < xzWavePoints.length; i++) {

        let waveX = ampXZ * cos(-2*PI*frequency*time + 2*PI/wavelength * i * pointDistance + phaseXZ);
        let waveY = ampYZ * sin(-2*PI*frequency*time + 2*PI/wavelength * i * pointDistance + phaseYZ);

        xzWavePoints[i].x = waveX;
        yzWavePoints[i].y = waveY;

        point(circleCenter.x + xzWavePoints[i].x, xzWavePoints[i].y, xzWavePoints[i].z);
        point(yzWavePoints[i].x, circleCenter.y + yzWavePoints[i].y, yzWavePoints[i].z);

    }

    stroke("#0000ff");
    for (let i = 0; i < resultWavePoints.length; i++) {
        let waveX = xzWavePoints[i].x;
        let waveY = yzWavePoints[i].y;

        point(circleCenter.x + waveX, circleCenter.y + waveY, resultWavePoints[i].z)

    }

    line(circleCenter.x + xzWavePoints[0].x, 0, 0, circlePoint.x, circlePoint.y, 0);
    line(0, circleCenter.y + yzWavePoints[0].y, 0, circlePoint.x, circlePoint.y, 0);

  time+=0.01;

}


function drawAxes (size) {
    line(0,0,0, size, 0,0);
    line(0,0,0, 0, -size,0);
    line(0,0,0, 0, 0,size);
}

function drawCircle (dia) {
    circle()
}
