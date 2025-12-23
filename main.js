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

    // نصف قطر الحجر (تقريباً)
    const asteroidRadius = aRect.width / 2;

    // لو مركز الصاروخ صار جوّا "دائرة" الحجر → اصطدام
    if (distance < asteroidRadius) {
      handleCrash();
      break;
    }
  }
}

function handleCrash() {
  if (crashed) return;

  crashed = true;

  // شغّل صوت الانفجار
  explosionSound.currentTime = 0;
  explosionSound.play();

  // أظهر صورة الانفجار فوق الصاروخ
  const exploimg = document.getElementById("explosionImg");
  exploimg.classList.remove("hidden");

  // إظهار شاشة "Try Again"
  const GameOver=document.getElementById("gameOver");
  GameOver.classList.remove("hidden");
}




// حلقة الأنيميشن (الحركة السلسة)
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


// تحريك بالأسهم
document.addEventListener("keydown", function (e) {
  if (crashed) return; // لو صار اصطدام، لا نستجيب للأزرار

  const step = 60;

  switch (e.key) {
    case "ArrowUp":
      targetY -= step;
      break;
    case "ArrowDown":
      targetY += step;
      break;
    case "ArrowLeft":
      targetX -= step;
      break;
    case "ArrowRight":
      targetX += step;
      break;
  }

  keepInsideBounds();
});


// تحريك بالماوس
document.addEventListener("click", function (e) {
  if (crashed) return; // لو صار اصطدام، لا تستجيب للنقر

  targetX = e.clientX;
  targetY = e.clientY;

  keepInsideBounds();
});



const restartBtn = document.getElementById("restartBtn");
const gameOverScreen = document.getElementById("gameOver");

restartBtn.addEventListener("click", () => {
  crashed = false;

  // رجعي الصاروخ للنص
  x = window.innerWidth / 2;
  y = window.innerHeight / 2;
  targetX = x;
  targetY = y;

  rocket.style.left = x + "px";
  rocket.style.top = y + "px";

  // إخفاء رسالة Game Over
  gameOverScreen.classList.add("hidden");

  // إخفاء صورة الانفجار
  document.getElementById("explosionImg").classList.add("hidden");
});

