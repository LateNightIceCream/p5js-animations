let hits = 0;
let N = 10000;
let i = 0;
let radius = 200;

let circleCenter;

let pointArray = [];
let piValues   = [];

function setup () {

    createCanvas(1000, 1000);

    circleCenter = createVector(width/2, height/2);

    frameRate(30);

}


function draw () {

    smooth();
    noFill();

    background("#f8f9fa");

    stroke("#212121");
    drawUnitSquare(radius);
    drawUnitCircle(radius*2);

    let px = random(0, radius) + width/2;
    let py = -random(0, radius) + height/2;


    pointArray[i] = createVector(px, py);

    drawPoints();


    if (circleCenter.dist(pointArray[i]) <= radius) {
        hits++;
    }

    piValues[i] = 4 * hits / (i + 1);

    stroke("#212121");
    text(piValues[i], 100, 100);

    plotPiValues(piValues);

    i++;

    if (i == N) {
        i = 0;
        hits = 0;
        pointArray.length = 0;
        piValues.length = 0;
    }

}

function drawUnitSquare(a) {
    rect(width/2, height/2 - a, a);
}

function drawUnitCircle (d) {
    circle(width/2, height/2, d);
}

function drawPoints () {
    pointArray.forEach (p => {
        let centerDistance = circleCenter.dist(p);

        if (centerDistance <= radius) {
            stroke("#00ff00");
        } else {
            stroke("#ff0000");
        }

        drawCross(p);
    });
}

function plotPiValues (values) {

    let plotWidth = 300;
    let plotHeight = 150;
    let plotX = width/2;
    let plotY = height/6;

    let numOfPoints = 100;

    if (values.length < numOfPoints) {
        numOfPoints = values.length;
    }

    let maxValue = max(values);
    let minValue = min(values);

    // draw axes
    line(plotX, plotY, plotX + plotWidth, plotY);
    line(plotX, plotY, plotX, plotY - plotHeight);

    // PI-Line
    let piY = map(PI, 0, PI, plotY, plotHeight);
    line(plotX, piY, plotX + plotWidth, piY);

    for (let i = 0; i < numOfPoints; i++) {
        let value = values[values.length - i];

        let pointX = map(i, numOfPoints, 0, plotX, plotX+plotWidth);
        let pointY = map(value, minValue, maxValue, plotY, plotY-plotHeight);

        let p = createVector(pointX, pointY);
        drawPoint(p);
    }

}

function drawPoint (p) {
    circle(p.x, p.y, 5);
}

function drawCross (p) {
    let a = 10;
    line(p.x + a/2, p.y, p.x - a/2, p.y);
    line(p.x, p.y + a/2, p.x, p.y - a/2);
}
