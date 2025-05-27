const board = document.getElementById("game-board");

const emojis = [
  "assets/Harry.png",
  "assets/Hermione.png",
  "assets/Roni.png",
  "assets/Gina.png",
  "assets/Hagrid.png",
  "assets/Dobby.png",
  "assets/Dumbledore.png",
  "assets/Hipogrifo.png",
];
const cards = [...emojis, ...emojis];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

let hasGameStarted = false;
let timerInterval;
let timeLeft = 120;

const timerDiv = document.querySelector(".timer");
const timeSpan = document.querySelector(".time");
timerDiv.style.display = "none";

cards.sort(() => 0.5 - Math.random());

cards.forEach((emoji) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.innerText = "?";
  card.addEventListener("click", flipCard);
  board.appendChild(card);
});

function startTimer() {
  timerDiv.style.display = "block";

  timerInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeSpan.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Tempo esgotado! Que peninha você perdeu.");
      location.reload();
    }
  }, 1000);
}

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains("flipped")) return;

  if (!hasGameStarted) {
    hasGameStarted = true;
    startTimer();
  }

  this.innerHTML = `<img src="${this.dataset.emoji}" alt="card" style="width:100%; height:100%; object-fit: contain;">`;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  lockBoard = true;
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    matchedPairs++;
    if (matchedPairs === emojis.length) {
      clearInterval(timerInterval);
      setTimeout(() => {
        alert("🎉 Parabéns! Você venceu!");
        location.reload();
      }, 500);
    }
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.innerText = "?";
      secondCard.innerText = "?";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
