const rocket = document.getElementById("rocket");
const asteroids = document.querySelectorAll(".asteroid");
const explosionSound = document.getElementById("explosionSound");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let targetX = x;
let targetY = y;

const speed = 0.1; // Smooth speed
let crashed = false; // collision?


// hindrer raketten å forlate nettleserskjermens grenser.
function keepInsideBounds() {
  const rocketWidth = rocket.offsetWidth;
  const rocketHeight = rocket.offsetHeight;

  const halfW = rocketWidth / 2;
  const halfH = rocketHeight / 2;

  if (targetX < halfW) targetX = halfW;
  if (targetX > window.innerWidth - halfW)
    targetX = window.innerWidth - halfW;

  if (targetY < halfH) targetY = halfH;
  if (targetY > window.innerHeight - halfH)
    targetY = window.innerHeight - halfH;
}


// sentrum av ethvert element
function getCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}


// Collision: When the center of the missile gets very close to the center of the rock
function checkCollision() {
  if (asteroids.length === 0) return;

  const rocketRect = rocket.getBoundingClientRect();
  const rocketCenter = getCenter(rocketRect);

  for (let asteroid of asteroids) {
    const aRect = asteroid.getBoundingClientRect();
    const asteroidCenter = getCenter(aRect);

    const dx = rocketCenter.x - asteroidCenter.x;
    const dy = rocketCenter.y - asteroidCenter.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

// Omtrentlig radius på steinen
    const asteroidRadius = aRect.width / 2;

// Hvis sentrum av raketten havner inni «sirkelen» til steinen → kollisjon
    if (distance < asteroidRadius) {
      handleCrash();
      break;
    }
  }
}

function handleCrash() {
  if (crashed) return;

  crashed = true;

// Spill av eksplosjonslyden
  explosionSound.currentTime = 0;
  explosionSound.play();

// Vis eksplosjonsbildet over raketten
  const exploimg = document.getElementById("explosionImg");
  exploimg.classList.remove("hidden");

  // Vis "Try Again"-skjermen
  const GameOver=document.getElementById("gameOver");
  GameOver.classList.remove("hidden");
}



// Animasjonsløkke (jevn bevegelse)
function animate() {
  if (!crashed) {
    x += (targetX - x) * speed;
    y += (targetY - y) * speed;

    rocket.style.left = x + "px";
    rocket.style.top = y + "px";

    keepInsideBounds();
    checkCollision();
  }

  requestAnimationFrame(animate);
}
animate();


// Bevegelse med piltasteknappene
document.addEventListener("keydown", function (e) {
  if (crashed) return; // hvis det har skjedd en kollisjon, ignorer tastetrykk

  const step = 60;

  switch (e.key) {
    case "ArrowUp":
      targetY -= step;
      targetY -= step;
      break;
    case "ArrowDown":
      targetY += step;
      targetY += step;
      break;
    case "ArrowLeft":
      targetX -= step;
      targetX -= step;
      break;
    case "ArrowRight":
      targetX += step;
      targetX += step;
      break;
  }

  keepInsideBounds();
});


// Bevegelse med musen
document.addEventListener("click", function (e) {
  if (crashed) return; // hvis det har skjedd en kollisjon, ignorer klikk

  targetX = e.clientX;
  targetY = e.clientY;

  keepInsideBounds();
});



const restartBtn = document.getElementById("restartBtn");
const gameOverScreen = document.getElementById("gameOver");

restartBtn.addEventListener("click", () => {
  crashed = false;

  // Sett raketten tilbake til midten av skjermen
  x = window.innerWidth / 2;
  y = window.innerHeight / 2;
  targetX = x;
  targetY = y;

  rocket.style.left = x + "px";
  rocket.style.top = y + "px";

  // Skjul "Game Over"-skjermen
  gameOverScreen.classList.add("hidden");

  // Skjul eksplosjonsbildet
  document.getElementById("explosionImg").classList.add("hidden");
});

