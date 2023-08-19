const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
fname = document.querySelector(".info .name"),
fvalue = document.querySelector(".info .value"),
fslider = document.querySelector(".slider input"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview img"),
resetFilterBtn = document.querySelector(".reset"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");



let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, fliph = 1, flipv = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disabled");
    });
}

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${fliph}, ${flipv})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        fname.innerText = option.id;

        if(option.id === "brightness") {
            fslider.max = "200";
            fslider.value = brightness;
            fvalue.innerText = `${brightness}`;
        } else if(option.id === "saturation") {
            fslider.max = "200";
            fslider.value = saturation;
            fvalue.innerText = `${saturation}`
        } else if(option.id === "inversion") {
            fslider.max = "100";
            fslider.value = inversion;
            fvalue.innerText = `${inversion}`;
        } else {
            fslider.max = "100";
            fslider.value = grayscale;
            fvalue.innerText = `${grayscale}`;
        }
    });
});

const updateFilter = () => {
    fvalue.innerText = `${fslider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = fslider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = fslider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = fslider.value;
    } else {
        grayscale = fslider.value;
    }
    applyFilter();
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            fliph = fliph === 1 ? -1 : 1;
        } else {
            flipv = flipv === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    brightness = "100"; 
    saturation = "100"; 
    inversion = "0"; 
    grayscale = "0";
    rotate = 0; 
    fliph = 1; 
    flipv = 1;
    filterOptions[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(fliph, flipv);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}


fslider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
//fslider.addEventListener("input", updateFilter);
//resetFilterBtn.addEventListener("click", resetFilter);
//saveImgBtn.addEventListener("click", saveImage);
//fileInput.addEventListener("change", loadImage);
//chooseImgBtn.addEventListener("click", () => fileInput.click());