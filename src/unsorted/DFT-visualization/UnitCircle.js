
class UnitCircle {

    constructor (centerX, centerY, dia) {
        this.center  = createVector(centerX, centerY);
        this.dia     = dia;
        this.radius  = dia / 2;
    }

    show () {

        push();

        strokeWeight(1);
        stroke("lightgrey");
        this.showAxes();

        stroke("black");
        noFill();
        circle(this.center.x, this.center.y, this.dia);

        pop();
    }

    showAxes () {
        let overshoot = 1.236;
        let halfLine  = this.radius * overshoot;

        stroke("lightgrey");
        line(this.center.x, this.center.y + halfLine, this.center.x, this.center.y - halfLine);
        line(this.center.x + halfLine, this.center.y, this.center.x - halfLine, this.center.y);
    }

}


class DFTCircle extends UnitCircle {

    constructor (centerX, centerY, dia, timeSequence) {
        super(centerX, centerY, dia);

        this.timeSequence = timeSequence;
        this.N = this.timeSequence.length; // num of points

        this.dftSequence = []

        for (let k = 0; k < N; k++) {
            this.dftSequence[k] = [];
            for (let n = 0; n < N; n++) {
                this.dftSequence[k].push(createVector(0, 0));
            }
        }

        this.dftMagnitude = [];

        this.angleStep = TWO_PI / this.N;

        this.arrow = new UnitCircleArrow(this.center.x, this.center.y, this.center.x + this.radius * cos(QUARTER_PI), this.center.y - this.radius * sin(QUARTER_PI), this)
    }

    show() {
        super.show();

        this.showStepCircles();
    }

    showStepCircles () {

        push();

        noFill();
        strokeWeight(1);
        for (let n = 0; n < this.N; n++) {

            let x = this.center.x + this.radius * cos(n * this.angleStep);
            let y = this.center.y + this.radius * sin(n * this.angleStep);

            let dia = 10;

            circle(x, y, dia);

        }

        pop();

        this.arrow.show();

    }
// favs: f = 3, k = 16, 49, 58. 57, 59?
//       f = 10, k = 16, k = 20, k = 26
    displayAllVectorsAdded (k) {

        let currentPoint = this.center.copy();
        let prevPoint = currentPoint;

        for (let n = 1; n < N; n++) {

            /*let r = random(255);
            let g = random(255);
            let b = random(255);*/

            //let c = color(r,g,b);
            //
            let c = "black";

            push();

            stroke(c);
            strokeWeight(2);

            let scaleFactor = this.radius / 10; // arbitrary, just for testing anyways, does the 10 come from the max value of the sin wave??? because it fits perfectly!!
            currentPoint = p5.Vector.add(this.center, createVector(this.dftSequence[k][n].x * scaleFactor, this.dftSequence[k][n].y * scaleFactor));

            this.connect(prevPoint, currentPoint);
            prevPoint = currentPoint;

            pop();
        }

    }

    connect (v1, v2) {
        line(v1.x, v1.y, v2.x, v2.y);
    }


    // magnitude only for now
    calculate_nth_contribution (k, n) {
        let real = this.timeSequence[n] * cos(k * n * this.angleStep);
        let imag = this.timeSequence[n] * sin(k * n * this.angleStep);

        this.dftSequence[k][n] = createVector(real, imag);

        //console.log(this.dftSequence[k][n]);
    }

    calculate_kth_bin (k) {

        let nth_vector = this.dftSequence[k][0];

        for (let n = 1; n < N; n++) {
            nth_vector.add(this.dftSequence[k][n]);
        }

        this.dftMagnitude[k] = nth_vector.mag() / this.N;
    }

    getReal () {
    }

    getImag () {
    }

}

class Arrow {

    constructor (startX, startY, endX, endY) {
        this.start = createVector(startX, startY);
        this.end   = createVector(endX, endY);

        this.originalStart = this.start;
        this.originalEnd   = this.end;
    }

    show () {
        push();

        line(this.start.x, this.start.y, this.end.x, this.end.y);

        pop();
    }

    magnitude () {
        return p5.Vector.sub(this.start, this.end).mag();
    }

    scale (s) { // this is weird :D

        let difVec = p5.Vector.sub(this.end, this.start);

        difVec.mult(s);

        this.end = createVector(this.start.x + difVec.x, this.start.y + difVec.y);
    }

    resetScale () {
        this.start = this.originalStart;
        this.end   = this.originalEnd;
    }
}

class UnitCircleArrow extends Arrow {

    constructor (startX, startY, endX, endY, unitCircle) {
        super(startX, startY, endX, endY);

        this.unitCircle = unitCircle;
    }

    goToPosition (n = 0) { // only works with arrow scale of 1

        if (n >= N) {
            n = n - N;
        }

        this.end.x = this.unitCircle.center.x + this.unitCircle.radius * cos(n * this.unitCircle.angleStep);
        this.end.y = this.unitCircle.center.y - this.unitCircle.radius * sin(n * this.unitCircle.angleStep);
    }

}
