let timePlot;
let dftPlot;
let timeSeries = [];
let N = 64;

let dftCircle;

function setup () {

    createCanvas(1400, 1600);

    /*======================*/


    let plotMargin = 20;

    timePlot = new StemPlot(plotMargin, 150, width/2.5, 100);
    timePlot.setXLim(N);
    timePlot.setYLim(10);
    timePlot.title("Time Series");

    dftPlot  = new StemPlot(width - plotMargin - timePlot.width, timePlot.originY, timePlot.width, timePlot.height);
    dftPlot.setXLim(N);
    dftPlot.setYLim(10);
    dftPlot.title("Resulting DFT Series");

    for (let n = 0; n < N; n++) {
        timeSeries[n] = Math.floor(10 * Math.random());
        timeSeries[n] = 10 * sin(TWO_PI / N * n * 3); // expected peak at k = 5
    }

    /*======================*/

    dftCircle = new DFTCircle(width/2, height/2 * 1.382, width/2, timeSeries);

    frameRate(60);

}


// favs: f = 3, k = 16, 49, 58. 57, 59?
//       f = 10, k = 16, k = 20, k = 26
let stop = true;
let n = 0;
let k = 49;
function draw () {


    smooth();

    background("#f8f9fa");

    timePlot.plot(timeSeries, [n]);

    dftPlot.plot(dftCircle.dftMagnitude, [k]);

    dftPlot.setYLim(Math.max.apply(this, dftCircle.dftMagnitude));

    dftCircle.arrow.goToPosition(k * n);

    let currentArrowMag = map(timeSeries[n], 0, 10, 0, 1);

    dftCircle.arrow.scale(currentArrowMag);
    //dftCircle.show();
    dftCircle.arrow.resetScale();

    dftCircle.calculate_nth_contribution(k, n);
    dftCircle.calculate_kth_bin(k);

    dftCircle.displayAllVectorsAdded(k);

    n++;
    if (!stop) {
        if(n == N) {
            n = 0;
            k++;
            if (k == N) {k = 0}
        }
    }

    //text("k = " + k, dftCircle.center.x - dftCircle.radius - 50, dftCircle.center.y);
    text("n = " + n, timePlot.originX, timePlot.originY + timePlot.height + 16);

}
