let l_slider;
let lambda_slider;
let zl_slider;
let zc_slider;

let labelZin;
let labelPhase;
let labelRe;
let labelIm;

// hi this is a comment, hopefully not hard to read

function setup () {


    createCanvas(700, 700);
    frameRate(60);

    let startX = 10;
    let startY = 10;
    let padY = 20;
    l_slider      = new LabeledSlider("length", startX, startY, 1, 10, 1, 1);
    lambda_slider = new LabeledSlider("wavelength", startX, startY*2+padY, 1, 10, 1, 1);
    zl_slider     = new LabeledSlider("load impedance", startX, startY*3+2*padY, 0, 300, 50, 10);
    zc_slider     = new LabeledSlider("char. impedance", startX, startY*4+3*padY, 0, 300, 50, 10);

    startY = height - 200;

    labelZin = new ValueDisplay("Zin", startX, startY);

    labelZin._formatValue = //////////7function () {
        return this.label + " " + this.value.re + " + " this.value.im + "i";
    };

}

function draw () {
    background("#f8f8f8");
    smooth();
    noFill();
    drawSliders();

    let l = l_slider.value();
    let lambda = lambda_slider.value();
    let zl = zl_slider.value();
    let zc = zc_slider.value();

    let Zin = Z_in(l,lambda, zl, zc);


    labelZin.value = Zin;
    labelZin.draw();
}


for (let i = 0; i <= 4; i++) {
    console.log(i);
}

function drawSliders () {
    l_slider.draw();
    lambda_slider.draw();
    zl_slider.draw();
    zc_slider.draw();
}

function Z_in (l, lambda, ZL, ZC) {
    let i = math.i;
    let beta = (2*Math.PI) / lambda;

    let num = math.add(ZL, math.multiply(i, ZC * Math.tan(beta*l)))
    let den = math.add(ZC, math.multiply(i, ZL * Math.tan(beta*l)))
    let frac = math.divide(num, den)

    return math.multiply(ZC, frac)
}


function drawZin (Zin) {
    let centerX = width/2;
    let centerY = height/2;
    let Zvec = Zin.toVector()
}

class ValueDisplay {
    constructor(label, x, y, valInit) {
        this.label = label;
        this.x = x;
        this.y = y;
        this.value = valInit;
    }

    draw () {
        text(this._formatValue(), this.x, this.y);
    }

    _formatValue () {
        return this.label + " = " + this.value;
    }
}

class LabeledSlider {
    constructor(label, x, y, valMin, valMax, valInit, step) {

        this.label = label;
        this.x = x;
        this.y = y;
        this.valMin  = valMin;
        this.valMax  = valMax;
        this.valInit = valInit ?? valMin;
        this.step    = step ?? (valMax-valMin) / (valMax + valMin);

        this.width = 200;

        this.slider = createSlider(this.valMin, this.valMax, this.valInit, this.step);
        this.slider.position(this.x, this.y);
        this.slider.style('width', this.width + 'px');

        this.textSpacing = 16;
    }

    draw () {
        let textX = this.x + this.width + this.textSpacing;
        textSize(16)
        fill(0);
        text(this.label + " = " + this.value(), textX, this.y + 16);
    }

    value () {
        return this.slider.value();
    }

}
