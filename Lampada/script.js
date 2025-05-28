const lamp = document.getElementById("lamp");
let isLampOn = false;

lamp.addEventListener("click", () => {
  isLampOn = !isLampOn;

  if (isLampOn) {
    lamp.src = "assets/lamp_on.png";
    document.body.style.background =
      "radial-gradient(circle, yellow 10%, orange 80%)";
  } else {
    lamp.src = "assets/lamp_off.png";
    document.body.style.background =
      "radial-gradient(circle, white 8%, black 100%)";
  }
});
