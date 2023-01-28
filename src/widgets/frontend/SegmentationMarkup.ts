const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    width: 100%;
    height: 100%;
    display: inline;
}
canvas {
    width: 100%;
    height: 100%;
    position: relative;
}
#secondary-canvas {
    display: none;
}
img {
    width:100%;
    height: 100%;
}
#modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgb(0, 0, 0); /* Fallback colour */
    background-color: rgba(0, 0, 0, 0.4);
}
#modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 2px solid #888;
    width: 80%;
    height: 80%;
}
</style>
<img/>
<div id="modal">
    <div id="modal-content">
        <canvas id="primary-canvas"></canvas>
        <canvas id="secondary-canvas"></canvas>
    </div>
</div>
`;


function stopPropagation(e: Event){
    e.stopPropagation();
}


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
    private modalEl: HTMLElement;

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
        this.imgEl.addEventListener("click", function (){self.open()});

        this.modalEl = this.shadowRoot.getElementById("modal");
        this.modalEl.addEventListener("click", function (){
            self.close();
        });

        const resizeOb = new ResizeObserver(function(entries){
            self._resized(entries[0].contentRect);
        })
        resizeOb.observe(this);

        this.built = true;
    }

    open(){
        this.shadowRoot.getElementById("modal").style.display = "block";
        this.modalEl.addEventListener("scroll", stopPropagation);
    }

    close(){
        this.shadowRoot.getElementById("modal").style.display = "none";
        this.modalEl.removeEventListener("scroll", stopPropagation);
    }

    _resized(rect: DOMRectReadOnly){
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