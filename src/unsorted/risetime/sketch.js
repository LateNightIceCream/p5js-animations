let dftPlot;
let timeSeries = [];
let N = 128;

// golden ratio: N=256, k = 10, f =3??
//
let ncolumns  = 5;
let nrows     = 5;
let col_index = 0;
let row_index = 0;

let dftArray = Array.from(Array(nrows), () => new Array(ncolumns));


function genTimeSeries(f) {
    let tSeries = [];
    for (let n = 0; n < N; n++) {
        tSeries[n] = 10*sin(TWO_PI / N * n * f); // expected peak at k = 5
    }
    return tSeries;
}

function setup () {

    createCanvas(1400, 1400);

    /*======================*/


    // for (let n = 0; n < N; n++) {
    //     timeSeries[n] = Math.floor(10 * Math.random());
    //     timeSeries[n] = 10*sin(TWO_PI / N * n * 3); // expected peak at k = 5
    // }

    // dftCircle = new DFTCircle(width/2, height/2 * 1.382, width/2, timeSeries);

    let dftCircleDia = width/ncolumns * 0.9;

    // init dft array
    for (let row = 0; row < nrows; row++) {
        for (let col = 0; col < ncolumns; col++) {
            dftArray[row][col] = new DFTCircle(dftCircleDia/2 + dftCircleDia * col, dftCircleDia/2 + dftCircleDia * row, dftCircleDia, genTimeSeries(col));
        }
    }

    /*======================*/


    frameRate(60);
}


// favs: f = 3, k = 16, 49, 58. 57, 59?
//       f = 10, k = 16, k = 20, k = 26
let stop = true;
let n = 0;
let increment = 1;
let k = 10;
let kk = 4;
function draw () {

    smooth();

    background("#f8f9fa");

    // dftCircle.arrow.goToPosition(k * n);

    // let currentArrowMag = map(timeSeries[n], 0, 10, 0, 1);

    // dftCircle.arrow.scale(currentArrowMag);
    // dftCircle.show();
    // dftCircle.arrow.resetScale();

    // dftCircle.calculate_nth_contribution(k, n);
    // dftCircle.calculate_kth_bin(k);

    // dftCircle.displayAllVectorsAdded(k);

    dftArray.forEach((rows, rowindex) => {
        rows.forEach(dftCircle => {

            k = kk + rowindex;

            dftCircle.arrow.goToPosition(k * n);
            let currentArrowMag = map(dftCircle.timeSequence[n], 0, 10, 0, 1);
            dftCircle.arrow.scale(currentArrowMag);
            dftCircle.arrow.resetScale();

            dftCircle.calculate_nth_contribution(k, n);
            //dftCircle.calculate_kth_bin(k);

            dftCircle.displayAllVectorsAdded(k);
        });
    });

    if(n==0) {
        increment=1;
    } else if (n == N) {
        circle(100,100,100);
        increment=-1;
    }

    n+=increment;


}
