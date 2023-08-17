let osc, playing, freq, amp;

let tones = [];

let dftPlot;
let timeSeries = [];
let N = 128;

// golden ratio: N=256, k = 10, f =3??
//
let ncolumns  = 6;
let nrows     = 6;
let col_index = 0;
let row_index = 0;

let dftArray = Array.from(Array(nrows), () => new Array(ncolumns));



function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  //osc.start();
  //playing = true;
}

function genTimeSeries(f) {
    let tSeries = [];
    for (let n = 0; n < N; n++) {
        tSeries[n] = 10*sin(TWO_PI / N * n * f); // expected peak at k = 5
    }
    return tSeries;
}

function setup () {

    let cnv = createCanvas(1400, 1400);

    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('sine');

    /*======================*/


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
            dftArray[row][col] = new DFTCircle(dftCircleDia/2 + dftCircleDia * (col+1), dftCircleDia/2 + dftCircleDia * row, dftCircleDia, genTimeSeries(col+1));
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
let k = 1;
let kk = 4;

let drawnCols = 1;
let currentCol = 1;
let currentRow = 0;
let dones = [];

let avg = 0;


function draw () {

    smooth();

    background("#f8f9fa");


    for (let col = 0; col < currentCol; col++) {

        k = kk;
        let dftCircle = dftArray[k][col];

        dftCircle.arrow.goToPosition(k * n);
        let currentArrowMag = map(dftCircle.timeSequence[n], 0, 10, 0, 1);
        dftCircle.arrow.scale(currentArrowMag);
        dftCircle.arrow.resetScale();

        if (!dones[currentCol]) {
            dftCircle.calculate_nth_contribution(k, n);
        }
        //dftCircle.calculate_kth_bin(k);

        dftCircle.displayAllVectorsAdded(k);

    }



    // dftArray.forEach((rows, rowindex) => {
    //     rows.forEach(dftCircle => {

    //         k = kk + rowindex;

    //         dftCircle.arrow.goToPosition(k * n);
    //         let currentArrowMag = map(dftCircle.timeSequence[n], 0, 10, 0, 1);
    //         dftCircle.arrow.scale(currentArrowMag);
    //         dftCircle.arrow.resetScale();

    //         dftCircle.calculate_nth_contribution(k, n);
    //         //dftCircle.calculate_kth_bin(k);

    //         dftCircle.displayAllVectorsAdded(k);
    //     });
    // });




    n+=increment;
    if(n == N) {
        n = 0;

        let sum = 0;
        let dft = dftArray[kk][currentCol-1];

        dft.angles.forEach(angle => {
            sum+=angle;
        });

        avg = sum/dft.angles.length;

        tones[currentCol-1] = ((avg) * 440);
        text("" + abs(avg), 100, 100);

        osc = new p5.Oscillator('sine');
        osc.freq(tones[currentCol-1]);
        osc.start();

        dones[currentCol] = 1;
        currentCol++;

        if (currentCol == ncolumns+1) {
            currentCol = 0;
            osc.stop();
        }
    }

}
