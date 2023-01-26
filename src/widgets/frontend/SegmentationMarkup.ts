const template = document.createElement("template");
template.innerHTML = `
<style>
canvas {
    width: 100%;
    height: 100%;
}
#secondary-canvas {
    display: none;
}
</style>
<canvas id="primary-canvas"></canvas>
<canvas id="secondary-canvas"></canvas>
<img style="display: none"/>
`;


class SegmentationMarkup extends HTMLElement{
    imgEl: HTMLImageElement;
    primaryCanvas: HTMLCanvasElement;
    secondaryCanvas: HTMLCanvasElement;
    built: boolean;
    imageLoaded: boolean;

    scale: number;
    xOffset: number;
    yOffset: number;
    ctx: CanvasRenderingContext2D;
    backCtx: CanvasRenderingContext2D;

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.built = false;
        this.scale = 1;
        this.xOffset = 0;
        this.yOffset = 0;
        this.imageLoaded = false;
    }

    connectedCallback(){
        if(this.built) return;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.primaryCanvas = <HTMLCanvasElement> this.shadowRoot.getElementById("primary-canvas");
        this.ctx = this.primaryCanvas.getContext("2d");

        this.secondaryCanvas = <HTMLCanvasElement> this.shadowRoot.getElementById("secondary-canvas");
        this.backCtx = this.secondaryCanvas.getContext("2d");

        this.imgEl = this.shadowRoot.querySelector("img");
        this.imgEl.src = this.getAttribute("image");
        const self = this;
        this.imgEl.addEventListener("load", function(){self._imageLoaded()});

        const resizeOb = new ResizeObserver(function(entries){
            self._canvasResized(entries[0].contentRect);
        })
        resizeOb.observe(this);

        this.built = true;
    }

    _canvasResized(rect: DOMRectReadOnly){
        console.log("Resized");
        this.primaryCanvas.width = rect.width;
        this.primaryCanvas.height = rect.height;
        this.scale = Math.min(
            this.primaryCanvas.width / this.imgEl.width,
            this.primaryCanvas.height / this.imgEl.height
            );
        this.draw();
    }

    draw(){
        this.ctx.drawImage(this.imgEl, 0, 0, this.imgEl.width * this.scale, this.imgEl.height * this.scale);
    }

    _imageLoaded(){
        this.imageLoaded = true;
        this.scale = Math.min(
            this.ctx.canvas.width / this.imgEl.width,
            this.ctx.canvas.height / this.imgEl.height
            );
        this.secondaryCanvas.width = this.imgEl.width;
        this.secondaryCanvas.height = this.imgEl.height;
        this.ctx.drawImage(this.imgEl, 0, 0, this.imgEl.width * this.scale, this.imgEl.height * this.scale);
    }
}

customElements.define("segmentation-markup", SegmentationMarkup);