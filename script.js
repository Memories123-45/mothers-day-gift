// Photos used in the memory slider
// Make sure these names exactly match your image file names.
const photos = [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg",
    "photo4.jpg",
    "photo5.jpg",
    "photo6.jpg",
    "photo7.jpg",
    "photo8.jpg",
    "photo9.jpg",
    "photo10.jpg"
];

// Selecting HTML elements
const giftSection = document.getElementById("giftSection");
const wishSection = document.getElementById("wishSection");
const memorySection = document.getElementById("memorySection");

const giftBox = document.getElementById("giftBox");
const openGiftBtn = document.getElementById("openGiftBtn");
const startMemoryBtn = document.getElementById("startMemoryBtn");

const memoryImage = document.getElementById("memoryImage");
const photoCard = document.getElementById("photoCard");
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

// Keyboard arrow support for laptop
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

// Mobile swipe support
let touchStartX = 0;
let touchEndX = 0;

// Attach swipe to the full photo card, not just the image
photoCard.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
});

photoCard.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -40) {
        nextPhoto();
    }

    if (swipeDistance > 40) {
        previousPhoto();
    }
}

// Mouse drag support for laptop
let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;

photoCard.addEventListener("mousedown", (event) => {
    isDragging = true;
    mouseStartX = event.clientX;
});

photoCard.addEventListener("mouseup", (event) => {
    if (!isDragging) return;

    mouseEndX = event.clientX;
    isDragging = false;

    handleMouseDrag();
});

photoCard.addEventListener("mouseleave", () => {
    isDragging = false;
});

function handleMouseDrag() {
    const dragDistance = mouseEndX - mouseStartX;

    if (dragDistance < -40) {
        nextPhoto();
    }

    if (dragDistance > 40) {
        previousPhoto();
    }
}

// Prevent image dragging issue on laptop
memoryImage.addEventListener("dragstart", (event) => {
    event.preventDefault();
});