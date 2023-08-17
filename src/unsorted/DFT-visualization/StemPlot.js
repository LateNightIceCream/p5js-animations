class StemPlot {
    constructor (originX, originY, width, height) {
        this.originX = originX;
        this.originY = originY;
        this.width   = width;
        this.height  = height;

        this.xlim = 0;
        this.ylim = 0;

        this.titleText = "";
        this.titleSize = 12;

        this.colors = {
            axes:      "#000000",
            stems:     "#212121",
            highlight: "#ff0000",
        };

    }

    plot (values, highlights = []) {

        let N = values.length;

        let stemDistance = this.width / this.xlim;
        let strokeWidth = stemDistance * 0.5;

        push();

        strokeCap(SQUARE);
        strokeWeight(strokeWidth);

        this.drawTitle();

        for (let n = 0; n < N; n++) {

            if (highlights.includes(n)) {
                stroke(this.colors.highlight)
            } else {
                stroke(this.colors.stems);
            }

            // improve this :D
            if (values[n] == 0) {
                values[n] = 0.1;
            }

            let startX = this.originX + stemDistance * n;
            let startY = this.originY;
            let endX   = startX;
            let endY   = startY - (this.height * values[n]) / this.ylim;

            line(startX, startY, endX, endY);
        }

        pop();

    }

    drawTitle () {

        let offset = 10;
        let titleX = this.originX + offset;
        let titleY = this.originY - this.height - offset;

        textSize(this.titleSize);
        text(this.titleText, titleX, titleY);

    }

    title (title) {
        this.titleText = title;
    }

    titleSize (size) {
        this.titleSize = size;
    }

    setXLim (xlim) {
        this.xlim = xlim;
    }

    setYLim (ylim) {
        this.ylim = ylim;
    }
}
