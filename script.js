window.sr = ScrollReveal({reset: true});

sr.reveal('.reveal1',{
    rotate:{x: 100, y: 0, z: 0},
    duration: 2000
});
sr.reveal('.card-container',{
    rotate:{x: 100, y: 0, z: 0},
    duration: 1000
});
sr.reveal('.text',{
    rotate:{x: 100, y: 0, z: 0},
    duration: 2000
});

var currentImageIndex = 0; // Mantém o controle da imagem atual

function showImages(projectName) {
    var imagePopup = document.getElementById("image-popup");
    var popupImages = document.getElementById("popup-images");

    var images = {
        projeto1: [
            "img/prj1_img1.png",
            "img/prj1_img2.png"
        ],
        // Adicione mais projetos e suas imagens aqui
    };

    currentImageIndex = 0; // Inicializa o índice da imagem

    popupImages.innerHTML = "";
    updateImage(); // Mostra a primeira imagem

    imagePopup.style.display = "block";

    imagePopup.addEventListener("click", function (event) {
        if (event.target === imagePopup) {
            closePopup();
        }
    });
}

function closePopup() {
    var imagePopup = document.getElementById("image-popup");
    imagePopup.style.display = "none";
}

function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = 0; // Não permita ir antes da primeira imagem
    }
    updateImage();
}

function nextImage() {
    var images = {
        projeto1: [
            "img/prj1_img1.png",
            "img/prj1_img2.png"
        ],
        // Adicione mais projetos e suas imagens aqui
    };

    currentImageIndex++;
    if (currentImageIndex >= images.projeto1.length) {
        currentImageIndex = images.projeto1.length - 1; // Não permita ir além da última imagem
    }
    updateImage();
}

function updateImage() {
    var popupImages = document.getElementById("popup-images");
    var images = {
        projeto1: [
            "img/prj1_img1.png",
            "img/prj1_img2.png"
        ],
        // Adicione mais projetos e suas imagens aqui
    };

    popupImages.innerHTML = "";
    var img = document.createElement("img");
    img.src = images.projeto1[currentImageIndex];
    popupImages.appendChild(img);
}


