// Photos used in the memory slider
// Rename your images exactly like this OR change these names here.
const photos = [
    "photo1.jpeg",
    "photo2.jpeg",
    "photo3.jpeg",
    "photo4.jpeg",
    "photo5.jpeg",
    "photo6.jpeg",
    "photo7.jpeg",
    "photo8.jpeg",
    "photo9.jpeg",
    "photo10.jpeg"
];

// Selecting HTML elements
const giftSection = document.getElementById("giftSection");
const wishSection = document.getElementById("wishSection");
const memorySection = document.getElementById("memorySection");

const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const startMemoryBtn = document.getElementById("startMemoryBtn");

const memoryImage = document.getElementById("memoryImage");
const photoCounter = document.getElementById("photoCounter");
const dotsContainer = document.getElementById("dotsContainer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const finalMessage = document.getElementById("finalMessage");
const replayBtn = document.getElementById("replayBtn");

let currentIndex = 0;

// Create dots based on number of photos
function createDots() {
    dotsContainer.innerHTML = "";

    photos.forEach((photo, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        if (index === currentIndex) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            currentIndex = index;
            updatePhoto();
        });

        dotsContainer.appendChild(dot);
    });
}

// Update photo, counter, dots, and final message
function updatePhoto() {
    memoryImage.src = photos[currentIndex];

    photoCounter.textContent = `${currentIndex + 1} / ${photos.length}`;

    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });

    // Show final message only on the last photo
    if (currentIndex === photos.length - 1) {
        finalMessage.classList.remove("hidden");
    } else {
        finalMessage.classList.add("hidden");
    }
}

// Go to next photo
function nextPhoto() {
    if (currentIndex < photos.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    updatePhoto();
}

// Go to previous photo
function previousPhoto() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = photos.length - 1;
    }

    updatePhoto();
}

// Open gift box
openGiftBtn.addEventListener("click", () => {
    giftBox.classList.add("open");

    setTimeout(() => {
        giftSection.classList.add("hidden");
        wishSection.classList.remove("hidden");
    }, 900);
});

// Also open gift if user clicks directly on gift box
giftBox.addEventListener("click", () => {
    openGiftBtn.click();
});

// Start memory lane
startMemoryBtn.addEventListener("click", () => {
    wishSection.classList.add("hidden");
    memorySection.classList.remove("hidden");

    createDots();
    updatePhoto();
});

// Arrow buttons
nextBtn.addEventListener("click", nextPhoto);
prevBtn.addEventListener("click", previousPhoto);

// Replay button
replayBtn.addEventListener("click", () => {
    currentIndex = 0;
    updatePhoto();
});

// Keyboard support for laptop
document.addEventListener("keydown", (event) => {
    if (!memorySection.classList.contains("hidden")) {
        if (event.key === "ArrowRight") {
            nextPhoto();
        }

        if (event.key === "ArrowLeft") {
            previousPhoto();
        }
    }
});

// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

memoryImage.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

memoryImage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -50) {
        nextPhoto();
    }

    if (swipeDistance > 50) {
        previousPhoto();
    }
}