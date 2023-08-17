
let grid;

function setup () {

    createCanvas(1400, 1400);

    grid = new PointGrid(width/2, height/2);

    frameRate(30);
}


let angle = 1.3;
function draw () {

    background("#f8f8f8");
    smooth();
    noFill();

    grid.show();

}

function drawPointGrid () {

    let dist      = 30;
    let gridWidth = width*0.618;
    let n_points  = floor(gridWidth/dist);

    let startX = width/2 - gridWidth/2;
    let startY = height/2 - gridWidth/2;

    for (let x = 0; x < n_points; x++) {
        for (let y = 0; y < n_points; y++) {
            drawPoint(startX + x * dist, startY + y * dist)
        }
    }
}


function drawPoint (x, y) {
    let pointDia = 10;
    circle(x, y, pointDia);
}

class PointGrid {

    constructor (x, y, gWidth = width*0.618, pointDist = 30) {

        this.x         = x;
        this.y         = y;
        this.width     = gWidth;
        this.pointDist = pointDist;

        this.nPoints = floor(this.width / this.pointDist);

        this.pointArray = [];

        this.initPoints();

    }

    initPoints () {
        for (let i = 0; i < this.nPoints; i++) {
            this.pointArray[i] = [];
        }

        for (let i = 0; i < this.nPoints; i++) {

            let px = this.x + i * this.pointDist - this.width / 2;

            for (let n = 0; n < this.nPoints; n++) {

                let py = this.x + n * this.pointDist - this.width/2;
                let color = "#212121";

                if (n == i) {
                    color = "#ff0000";
                }

                this.pointArray[i][n] = {point: createVector(px, py), color:color};
            }
        }

    }

    show () {

        this.evalFunction();

        this.pointArray.forEach(arr => {
            arr.forEach(point => {
                push();
                stroke(point.color);
                fill(point.color);
                drawPoint(point.point.x, point.point.y);
                pop();
            });
        });

    }

    evalFunction () {

        for (let i = 0; i < this.nPoints; i++) {
            for (let n = 0; n < this.nPoints; n++) {

                let z = this.fun(i, n);
                let maxZ = this.fun(this.nPoints, this.nPoints);

                let color = map(z, 0, maxZ,  255, 0);

                this.pointArray[i][n].color = color;

            }
        }

    }

    fun (x, y) {
        return x^2 + y^2;
    }

}
