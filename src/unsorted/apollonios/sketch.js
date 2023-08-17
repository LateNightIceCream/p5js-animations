let circleCenter;
let circlePoint;

let circleDia = 500;

let q, qc;

let A, B;


function setup () {

    createCanvas(1400, 1400);

    circleCenter = createVector(width/2, height/2);
    circlePoint = createVector(circleCenter.x + circleDia/2, circleCenter.y);

    let qdistanceFromCenter = circleDia/2 + 250;
    q = createVector(circleCenter.x + qdistanceFromCenter, circleCenter.y);

    let qcOffset = circleDia/3;
    qc = createVector(circleCenter.x + qcOffset, circleCenter.y);

    A = createVector(circleCenter.x + circleDia / 2, circleCenter.y );
    B = createVector(circleCenter.x - circleDia / 2, circleCenter.y );

    frameRate(60);
}


let angle = 1.3;
function draw () {

    background("#f8f8f8");
    smooth();
    noFill();

    circle(circleCenter.x, circleCenter.y, circleDia);

    updateCirclePoint();

    drawPoints();
    drawLines();
    drawText();

}

function updateCirclePoint () {

    circlePoint.x = circleCenter.x + circleDia / 2 * cos(angle);
    circlePoint.y = circleCenter.y - circleDia / 2 * sin(angle);

    angle+=0.005;
}

let q_col  = "#00ff00";
let qc_col = "#ff0000";

function drawPoints () {

    let pointDia = 10;

    fill(q_col);
    circle(q.x, q.y, pointDia);

    fill(qc_col);
    circle(qc.x, qc.y, pointDia);

    noFill();
    circle(A.x, A.y, pointDia);
    circle(B.x, B.y, pointDia);

    fill ("#212121");
    circle(circlePoint.x, circlePoint.y, pointDia);

}


function drawLines () {

    drawLineBetweenPoints(q, circlePoint);
    drawLineBetweenPoints(qc, circlePoint);

    push();
    stroke(qc_col);
    drawLineBetweenPoints(qc, A, 0, -10);
    drawLineBetweenPoints(qc, B);

    stroke(q_col);
    drawLineBetweenPoints(q, A, 0, 30);
    drawLineBetweenPoints(q, B, 0, 40);
    pop();

}

function drawLineBetweenPoints (p1, p2, offsX = 0, offsY = 0) {
    line(p1.x + offsX, p1.y + offsY, p2.x + offsX, p2.y + offsY);
}

function drawTextBetweenPoints (txt, p1, p2) {

    let text_x = circlePoint.x + (p1.x - p2.x) / 2;
    let text_y = circlePoint.y + (p1.y - p2.y) / 2;

    textSize(32);
    text(txt, text_x, text_y);

}

function drawText () {
    drawTextBetweenPoints("r2", q, circlePoint);
    drawTextBetweenPoints("r1", qc, circlePoint);

    drawPointText("q", q);
    drawPointText("q'", qc);
    drawPointText("A", A);
    drawPointText("B", B);
    drawPointText("P", circlePoint);

    drawCalcText();

}

function drawPointText (txt, p) {
    let offsetX = 10;
    let offsetY = 0;
    text (txt, p.x + offsetX, p.y + offsetY);
}

function drawCalcText () {

    let spacingY = 30;
    let spacingX = 600;
    let textX = 20;
    let textY = 40;

    let r2 = q.dist(circlePoint);
    let r1 = qc.dist(circlePoint);

    let qA = q.dist(A);
    let qB = q.dist(B);
    let qcA = qc.dist(A);
    let qcB = qc.dist(B);

    text("r2 = " + r2, textX, textY);
    text("r1 = " + r1, textX, textY + spacingY);
    text("r2 / r1 = " + r2/r1, textX, textY + spacingY * 2);

    let textX2 = textX + spacingX;
    text("qA = " + qA, textX2, textY);
    text("q'A = " + qcA, textX2, spacingY + textY);
    text("qA / q'A = " + qA / qcA, textX2, 2 * spacingY + textY);

    text("qB = " + qB, textX, 4 * spacingY + textY);
    text("q'B = " + qcB, textX, 5 * spacingY + textY);
    text("qB / q'B = " + qB / qcB, textX, 6 * spacingY + textY);


}
