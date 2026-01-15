const canvas = document.getElementById("photoCanvas");
const ctx = canvas.getContext("2d");
const uploadInput = document.getElementById("photoUpload");
const placeholder = document.querySelector(".canvas-placeholder");

let img = new Image();
let currentFilter = "original";

uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            applyFilter();
            placeholder.style.display = "none";
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter || btn.classList[1];
        applyFilter();
    });
});

document.querySelector(".reset-btn").addEventListener("click", () => {
    currentFilter = "original";
    applyFilter();
});

document.querySelector(".download-btn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "photostudio.png";
    link.href = canvas.toDataURL();
    link.click();
});

function drawGrillShadow(soft = true) {
    ctx.save();

    ctx.translate(canvas.width * 0.15, canvas.height * 0.1);
    ctx.rotate(-0.15);

    ctx.fillStyle = soft
        ? "rgba(0, 0, 0, 0.25)"
        : "rgba(0, 0, 0, 0.45)";

    ctx.filter = soft ? "blur(12px)" : "blur(2px)";

    const barWidth = 30;
    const gap = 55;

    for (let x = -canvas.width; x < canvas.width * 2; x += barWidth + gap) {
        ctx.fillRect(x, -canvas.height, barWidth, canvas.height * 3);
    }

    ctx.restore();
}

function drawFracturedShadow() {
    ctx.save();

    ctx.translate(canvas.width * 0.1, canvas.height * 0.15);
    ctx.rotate(-0.18);

    ctx.filter = "blur(10px)";
    ctx.fillStyle = "rgba(0, 0, 0, 0.28)";

    const bars = Math.floor(canvas.width / 80);

    for (let i = 0; i < bars; i++) {
        const x = i * (60 + Math.random() * 40);

        const height =
            canvas.height * (0.6 + Math.random() * 0.6);

        const yOffset =
            canvas.height * (Math.random() * 0.3);

        const width =
            18 + Math.random() * 25;

        // random broken sections
        if (Math.random() > 0.25) {
            ctx.fillRect(
                x,
                -canvas.height + yOffset,
                width,
                height
            );
        }
    }

    ctx.restore();
}


function applyFilter() {
    if (!img.src) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Base image tone
    switch (currentFilter) {
        case "window":
            ctx.filter = "contrast(1.1) brightness(0.95) saturate(0.9)";
            break;

        case "fade":
            ctx.filter = "contrast(0.9) brightness(1.05) saturate(0.85)";
            break;

        case "dust":
            ctx.filter = "brightness(1.08) contrast(0.95) saturate(0.8)";
            break;

        case "noir":
            ctx.filter = "grayscale(0.9) contrast(1.2) brightness(0.9)";
            break;

        case "glow":
            ctx.filter = "brightness(1.12) contrast(0.95) saturate(1.05)";
            break;
            
        case "grill-soft":
            ctx.filter = "brightness(1.05) contrast(0.95) saturate(0.9)";
            break;

        case "fractured":
            ctx.filter = "brightness(1.03) contrast(0.96) saturate(0.9)";
            break;

        default:
            ctx.filter = "none";
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

    // Apply grill shadows
    if (currentFilter === "grill-soft") {
        drawGrillShadow(true);
    }

    if (currentFilter === "fractured") {
        drawFracturedShadow();
    }

    // subtle vignette for realism
    if (currentFilter !== "original") {
        const gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 4,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 1.2
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.3)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}


