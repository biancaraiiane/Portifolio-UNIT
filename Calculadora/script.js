const display = document.getElementById("display");

function appendValue(value) {
  display.textContent += value;
}

function clearDisplay() {
  display.textContent = "";
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1);
}

function calculate() {
  try {
    display.textContent = eval(display.textContent.replace(/x/g, "*"));
  } catch {
    display.textContent = "Erro";
  }
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    switch (value) {
      case "C":
        clearDisplay();
        break;
      case "<":
        backspace();
        break;
      case "=":
        calculate();
        break;
      default:
        appendValue(value);
    }
  });
});
