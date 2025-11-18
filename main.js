const rocket = document.getElementById("rocket");

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let targetX = x;
let targetY = y;

const speed = 0.1; //Smooth speed

//// hindrer raketten å forlate nettleserskjermens grenser.
function keepInsideBounds() {
  const rocketWidth = rocket.offsetWidth;
  const rocketHeight = rocket.offsetHeight;

  const halfW = rocketWidth / 2;
  const halfH = rocketHeight / 2;

  // left
  if (targetX < halfW) targetX = halfW;

  // right
  if (targetX > window.innerWidth - halfW)
    targetX = window.innerWidth - halfW;

  // above
  if (targetY < halfH) targetY = halfH;

  // below
  if (targetY > window.innerHeight - halfH)
    targetY = window.innerHeight - halfH;
}

//Nettstedet oppdateres hvert minutt
function animate() {
  x += (targetX - x) * speed;
  y += (targetY - y) * speed;

  rocket.style.left = x + "px";
  rocket.style.top = y + "px";

  requestAnimationFrame(animate);
}
animate();


//checking keyboard arrows
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

  keepInsideBounds(); 
});



// Mouse click
document.addEventListener("click", function(e) {
  targetX = e.clientX;
  targetY = e.clientY;
  
  keepInsideBounds();
});


