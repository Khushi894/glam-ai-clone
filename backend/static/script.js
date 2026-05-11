const imageInput = document.getElementById("imageInput");

const preview = document.getElementById("preview");

const resultImage = document.getElementById("resultImage");

const statusText = document.getElementById("status");

let selectedFile = null;

/* IMAGE PREVIEW */

imageInput.addEventListener("change", function () {

    selectedFile = imageInput.files[0];

    if(selectedFile){

        const reader = new FileReader();

        reader.onload = function(e){

            preview.src = e.target.result;
        }

        reader.readAsDataURL(selectedFile);
    }
});

/* REMOVE BACKGROUND */

async function removeBackground(){

    if(!selectedFile){

        alert("Please upload image first");
        return;
    }

    statusText.innerText = "Removing background...";

    const formData = new FormData();

    formData.append("image", selectedFile);

    const response = await fetch("/upload", {

        method:"POST",
        body:formData
    });

    const data = await response.blob();

    const imageURL = URL.createObjectURL(data);

    resultImage.src = imageURL;

    statusText.innerText = "Background Removed Successfully";
}

/* BEAUTY FILTER */

function applyBeautyFilter(){

    if(!preview.src){

        alert("Upload image first");
        return;
    }

    resultImage.src = preview.src;

    resultImage.style.filter =
    "brightness(1.1) contrast(1.1) saturate(1.2)";

    statusText.innerText = "Beauty Filter Applied";
}

/* CARTOON FILTER */

async function applyCartoonFilter(){

    if(!selectedFile){

        alert("Upload image first");
        return;
    }

    statusText.innerText = "Applying Real Cartoon Filter...";

    const formData = new FormData();

    formData.append("image", selectedFile);

    const response = await fetch("/cartoon", {

        method:"POST",
        body:formData
    });

    const data = await response.blob();

    const imageURL = URL.createObjectURL(data);

    resultImage.src = imageURL;

    statusText.innerText =
    "Real Cartoon Filter Applied";
}
/* DOWNLOAD */

document.getElementById("downloadBtn")
.addEventListener("click", function(){

    if(!resultImage.src){

        alert("No image to download");
        return;
    }

    const a = document.createElement("a");

    a.href = resultImage.src;

    a.download = "glam-ai-result.png";

    a.click();
});
const themeToggle = document.getElementById("themeToggle");

let darkMode = true;

themeToggle.addEventListener("click", () => {

    const cards = document.querySelectorAll(
        ".image-card, #dropArea, .tool-section button"
    );

    if(darkMode){

        document.body.style.background = "#f3f3f3";
        document.body.style.color = "#111";

        document.querySelector(".sidebar").style.background = "#ffffff";

        cards.forEach(card => {

            card.style.background = "#ffffff";
            card.style.color = "#111";
            card.style.border = "1px solid #ddd";
        });

    }else{

        document.body.style.background = "#0b0b0f";
        document.body.style.color = "white";

        document.querySelector(".sidebar").style.background = "#111114";

        cards.forEach(card => {

            card.style.background = "#111114";
            card.style.color = "white";
            card.style.border =
            "1px solid rgba(255,255,255,0.06)";
        });
    }

    darkMode = !darkMode;
});
function applySketchFilter(){

    if(!preview.src){

        alert("Upload image first");
        return;
    }

    resultImage.src = preview.src;

    resultImage.style.filter =
    "grayscale(1) contrast(2) brightness(1.2)";

    statusText.innerText = "Sketch Filter Applied";
}
function applyAnimeFilter(){

    resultImage.src = preview.src;

    resultImage.style.filter =
    "contrast(1.7) saturate(2.2) brightness(1.15) hue-rotate(-10deg)";

    statusText.innerText = "Anime Filter Applied";
}

function applyPopArtFilter(){

    resultImage.src = preview.src;

    resultImage.style.filter =
    "contrast(2.5) saturate(3) brightness(1.2) hue-rotate(20deg)";

    statusText.innerText = "Pop Art Filter Applied";
}

function applyOilPaintFilter(){

    resultImage.src = preview.src;

    resultImage.style.filter =
    "blur(0.5px) saturate(1.6) contrast(1.2)";

    statusText.innerText = "Oil Painting Effect Applied";
}