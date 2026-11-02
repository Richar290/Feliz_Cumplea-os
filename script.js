
// ==========================================
// ELEMENTOS PRINCIPALES
// ==========================================



// ==========================================
// DECORACIONES FLOTANTES DE CUMPLEAÑOS
// ==========================================

const decorationLayer = document.createElement("div");
decorationLayer.className = "birthday-decorations";
decorationLayer.setAttribute("aria-hidden", "true");

const decorationSymbols = [
    "♡", "🎈", "✧", "🎁", "♡", "🎂",
    "✦", "🤎", "🎈", "♡", "🎀", "✧",
    "🎁", "♡", "🎂", "✦", "🎈", "🤎",
    "♡", "✧", "🎀", "🎁", "♡", "🎈",
    "✦", "🎂", "♡", "🎈", "✧", "🤎",
    "🎁", "♡", "🎀", "✦", "🎈", "♡"
];

const positions = [
    [3, 10], [13, 22], [5, 38], [94, 14],
    [88, 30], [96, 48], [4, 57], [91, 68],
    [12, 78], [97, 87], [6, 91], [85, 9],
    [2, 27], [92, 40], [7, 68], [96, 76],
    [15, 48], [89, 91], [4, 83], [94, 23],
    [10, 5], [86, 55], [2, 45], [98, 59],
    [14, 92], [90, 4], [6, 18], [95, 34],
    [11, 60], [88, 78], [3, 72], [97, 95],
    [16, 32], [84, 43], [8, 97], [93, 12]
];

decorationSymbols.forEach((symbol, index) => {
    const decoration = document.createElement("span");

    decoration.className = "floating-decoration";
    decoration.textContent = symbol;

    decoration.style.left = `${positions[index][0]}%`;
    decoration.style.top = `${positions[index][1]}%`;

    decoration.style.animationDelay = `${index * -1.3}s`;
    decoration.style.animationDuration = `${10 + (index % 5) * 2}s`;

    decorationLayer.appendChild(decoration);
});

document.body.appendChild(decorationLayer);



const welcomeScreen = document.getElementById("welcomeScreen");
const surpriseScreen = document.getElementById("surpriseScreen");
const surpriseButton = document.getElementById("surpriseButton");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

const galleryImage = document.getElementById("galleryImage");
const photoCounter = document.getElementById("photoCounter");
const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");

// ==========================================
// GALERÍA DE 24 FOTOGRAFÍAS
// ==========================================

const totalPhotos = 24;
let currentPhoto = 1;

function showPhoto(number) {
    currentPhoto = number;

    if (currentPhoto > totalPhotos) {
        currentPhoto = 1;
    }

    if (currentPhoto < 1) {
        currentPhoto = totalPhotos;
    }

    const photoNumber = String(currentPhoto).padStart(2, "0");

    galleryImage.src = `imagenes/${photoNumber}.jpeg`;
    galleryImage.alt = `Fotografía ${photoNumber} de Keila`;

    photoCounter.textContent = `${photoNumber} / 24`;
}

// Fotografía anterior
previousPhoto.addEventListener("click", () => {
    showPhoto(currentPhoto - 1);
});

// Fotografía siguiente
nextPhoto.addEventListener("click", () => {
    showPhoto(currentPhoto + 1);
});

// ==========================================
// DESLIZAR LAS FOTOGRAFÍAS EN EL CELULAR
// ==========================================

let touchStartX = 0;
let touchEndX = 0;

galleryImage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

galleryImage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {
        if (difference > 0) {
            showPhoto(currentPhoto + 1);
        } else {
            showPhoto(currentPhoto - 1);
        }
    }
}, { passive: true });

// ==========================================
// MÚSICA DE FONDO
// ==========================================

backgroundMusic.loop = true;

musicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                musicButton.textContent = "♫";
                musicButton.setAttribute("aria-label", "Pausar música");
            })
            .catch((error) => {
                console.error("No se pudo reproducir la música:", error);
            });
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "Ⅱ";
        musicButton.setAttribute("aria-label", "Reanudar música");
    }
});

// ==========================================
// ABRIR LA SORPRESA
// ==========================================

surpriseButton.addEventListener("click", async () => {

    // Ocultar la portada
    welcomeScreen.hidden = true;

    // Mostrar todas las secciones
    surpriseScreen.hidden = false;

    // Mostrar el control de música
    musicButton.hidden = false;

    // Iniciar desde la primera fotografía
    showPhoto(1);

    // Reproducir música
    try {
        await backgroundMusic.play();

        musicButton.textContent = "♫";
        musicButton.setAttribute("aria-label", "Pausar música");

    } catch (error) {
        console.warn(
            "La música no pudo comenzar automáticamente. Puedes iniciarla con el botón musical.",
            error
        );

        musicButton.textContent = "♫";
    }

    // Llevar al inicio de la experiencia
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==========================================
// INICIALIZAR GALERÍA
// ==========================================

showPhoto(1);
