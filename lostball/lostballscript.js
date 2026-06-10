let x = 0;
let y = 0;

let isDragging = false;
let startX = 0;
let startY = 0;

const grid = document.getElementById("grid");
const wind = document.getElementById("wind");
const enterBtn = document.getElementById("enterBtn");
const startScreen = document.getElementById("startScreen");
const eye = document.getElementById("eye");

/* WORLD SIZE */
const worldWidth = window.innerWidth * 3;
const worldHeight = window.innerHeight * 3;

/* =========================
   ENTER (AUDIO FIX INCLUDED)
========================= */
enterBtn.addEventListener("click", () => {

  startScreen.style.display = "none";

  wind.volume = 0.2;

  wind.play().catch((err) => {
    console.log("Audio blocked:", err);
  });

  startEyeAnimation();
});

/* =========================
   EYE BREATHING ANIMATION
========================= */
function startEyeAnimation() {

  let scale = 1;

  function animate() {

    // smooth breathing (closer / further)
    const target = 1 + Math.sin(Date.now() * 0.0012) * 0.06;

    scale += (target - scale) * 0.05;

    eye.style.transform = `scale(${scale})`;

    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================
   KEYBOARD MOVEMENT
========================= */
document.addEventListener("keydown", (e) => {

  const speed = 50;

  if (e.key === "ArrowLeft") x += speed;
  if (e.key === "ArrowRight") x -= speed;
  if (e.key === "ArrowUp") y += speed;
  if (e.key === "ArrowDown") y -= speed;

  updatePosition();
});

/* =========================
   DRAG MOVEMENT
========================= */
document.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  startX = e.clientX;
  startY = e.clientY;

  x += dx;
  y += dy;

  updatePosition();
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

/* =========================
   WHEEL SCROLL MOVE
========================= */
document.addEventListener("wheel", (e) => {
  e.preventDefault();

  const scrollSpeed = 1.2;

  x -= e.deltaX * scrollSpeed;
  y -= e.deltaY * scrollSpeed;

  updatePosition();

}, { passive: false });

/* =========================
   WORLD LIMITS + MOVE
========================= */
function updatePosition() {

  const maxX = 0;
  const maxY = 0;
  const minX = -(worldWidth - window.innerWidth);
  const minY = -(worldHeight - window.innerHeight);

  if (x > maxX) x = maxX;
  if (y > maxY) y = maxY;
  if (x < minX) x = minX;
  if (y < minY) y = minY;

  grid.style.transform = `translate(${x}px, ${y}px)`;
}

/* =========================
   BALL INTERACTION
========================= */
document.querySelectorAll(".ball").forEach(ball => {
  ball.addEventListener("click", () => {

    if (ball.dataset.collected === "true") return;
    ball.dataset.collected = "true";

    ball.style.pointerEvents = "none";
    ball.style.transform = "scale(0.85)";
    ball.style.opacity = "0";

    setTimeout(() => {
      ball.remove();
    }, 1200);
  });
});