const rocket = document.getElementById("rocket");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let targetX = x;
let targetY = y;

const speed = 0.1; // سرعة السلاسة

// تحديث الموقع كل لحظة
function animate() {
  x += (targetX - x) * speed;
  y += (targetY - y) * speed;

  rocket.style.left = x + "px";
  rocket.style.top = y + "px";

  requestAnimationFrame(animate);
}
animate();


// فحص الأسهم
document.addEventListener("keydown", function(e) {
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
});



// تحريك بالماوس
document.addEventListener("click", function(e) {
  targetX = e.clientX;
  targetY = e.clientY;
});
