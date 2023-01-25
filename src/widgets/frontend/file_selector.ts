class FileSelector {
    private containerDiv: HTMLElement;
    private filesInput: HTMLInputElement;
    private previewContainer: HTMLDivElement;
    private currentSlide: number;
    constructor(containerDiv: HTMLElement) {
        this.containerDiv = containerDiv;
        this.filesInput = this.containerDiv.getElementsByTagName("input")[0];
        this.previewContainer = this.containerDiv.getElementsByTagName("div")[0];
        this.currentSlide = 0;

        let arrowButtons = this.previewContainer.getElementsByTagName("a");
        arrowButtons[0].onclick = this.prevSlide.bind(this);
        arrowButtons[1].onclick = this.nextSlide.bind(this);
        this.filesInput.onchange = this.onInputChange.bind(this);
    }

    onInputChange() {
        let files = this.filesInput.files;
        this.clearSlides();
        for (let i = 0; i < files.length; ++i) {
            const file = files[i];
            if (file) {
                this.createSlide(file);
            }
            this.currentSlide = 1;
            this.showSlides();
        }

    }

    clearSlides(){
        const slides = this.previewContainer.querySelectorAll(".slide");
        for (let slide of slides) {
            slide.remove();
        }
    }

    createSlide(file: Blob | MediaSource){
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("slide");

        // const counterDiv = document.createElement("div");
        // counterDiv.classList.add("numbertext");
        // counterDiv.innerText = (index+1) + " / " + count;
        // counterDiv.style.padding = "8px 12px";
        // counterDiv.style.position = "absolute";
        // counterDiv.style.top = "0";
        // slideDiv.appendChild(counterDiv);

        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.onload = _ => {
            URL.revokeObjectURL(image.src); // Free memory
        }
        image.style.maxWidth = "75vw";
        image.style.maxHeight = "75vh";
        slideDiv.appendChild(image);

        slideDiv.style.display = "none";
        this.previewContainer.appendChild(slideDiv);
    }

    showSlides(){
        let i;
        let slides = this.previewContainer.getElementsByClassName("slide");
        if(this.currentSlide > slides.length){ this.currentSlide =1}
        if(this.currentSlide < 1){this.currentSlide = slides.length}
        for(i=0; i< slides.length; ++i){
            const slide = slides[i] as HTMLElement
            slide.style.display = "none";
        }
        (<HTMLElement> slides[this.currentSlide-1]).style.display = "block";
    }

    nextSlide(){
        ++this.currentSlide;
        this.showSlides();
    }

    prevSlide(){
        --this.currentSlide;
        this.showSlides();
    }
}
