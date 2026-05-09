const dropArea =
    document.getElementById("dropArea");

dropArea.addEventListener(
    "dragover",
    (e) => {

        e.preventDefault();

        dropArea.classList.add("hover");
    }
);

dropArea.addEventListener(
    "dragleave",
    () => {

        dropArea.classList.remove(
            "hover"
        );
    }
);

dropArea.addEventListener(
    "drop",
    (e) => {

        e.preventDefault();

        dropArea.classList.remove(
            "hover"
        );

        const files = e.dataTransfer.files;

        document.getElementById(
            "imageInput"
        ).files = files;
    }
);
async function uploadImage() {
    try{

    const input =
        document.getElementById("imageInput");

    const file = input.files[0];

    if (!file) {
        alert("Select image");
        return;
    }

    // Original preview
    const originalPreview =
        document.getElementById(
            "originalPreview"
        );

    originalPreview.src =
        URL.createObjectURL(file);
        originalPreview.style.display = "block";

    // AI result preview
    const preview =
        document.getElementById("preview");

    const formData = new FormData();

    formData.append("image", file);

    document.getElementById("status")
        .innerText =
        "Processing AI...";
    document.getElementById("loader")
    .style.display = "block";

    document.getElementById("loader")
.style.display = "block";
    const response = await fetch(
        "/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const blob =
        await response.blob();

    const imageURL =
        URL.createObjectURL(blob);

    preview.src = imageURL;
    preview.style.display = "block";

    document.getElementById("status")
        .innerText =
        "Background Removed Successfully";
    document.getElementById("loader")
    .style.display = "none";

    // Download button
    const downloadBtn =
        document.getElementById(
            "downloadBtn"
        );

    downloadBtn.href = imageURL;

    downloadBtn.style.display =
        "inline-block";
}

catch (error) {

    console.log(error);

    document.getElementById("loader")
    .style.display = "none";

    document.getElementById("status")
    .innerText =
    "Something went wrong";
}
}
function changeBg(color) {

    const resultImage =
    document.getElementById("preview");

    if(color === "white") {

        resultImage.style.background =
        "white";
    }

    if(color === "blue") {

        resultImage.style.background =
        "lightblue";
    }

    if(color === "pink") {

        resultImage.style.background =
        "pink";
    }

    if(color === "black") {

        resultImage.style.background =
        "black";
    }
}
function toggleTheme() {

    document.documentElement.classList
    .toggle("dark-mode");
}
function cartoonEffect() {

    const image =
    document.getElementById("preview");

    image.style.filter =
    "contrast(120%) saturate(150%) brightness(105%)";

    image.style.border =
    "5px solid cyan";

    image.style.boxShadow =
    "0px 0px 25px cyan";
}
function beautyFilter() {

    const image =
    document.getElementById("preview");

    image.style.filter =
    `
    brightness(108%)
    contrast(105%)
    saturate(115%)
    blur(0.4px)
    `;

    image.style.boxShadow =
    "0px 0px 25px hotpink";

    image.style.border =
    "5px solid hotpink";
}