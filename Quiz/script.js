const quizData = [
  {
    question: "Quem é o melhor amigo do Harry Potter?",
    options: ["Hermione", "Rony", "Dumbledore", "Snape"],
    correctIndex: 1,
  },
  {
    question: "Qual é a cor da varinha de Harry?",
    options: ["Marrom", "Preta", "Castanha com pena de fênix", "Dourada"],
    correctIndex: 2,
  },
  {
    question: "Quem é o diretor de Hogwarts?",
    options: ["Dumbledore", "Snape", "McGonagall", "Voldemort"],
    correctIndex: 0,
  },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  optionsEl.innerHTML = "";

  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(index));
    optionsEl.appendChild(button);
  });
}

function selectOption(selectedIndex) {
  const current = quizData[currentQuestion];
  const buttons = optionsEl.querySelectorAll("button");


  buttons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === current.correctIndex) {
      btn.style.backgroundColor = "#c8e6c9"; 
    }

    if (index === selectedIndex && selectedIndex !== current.correctIndex) {
      btn.style.backgroundColor = "#ffcdd2"; 
    }
  });

  if (selectedIndex === current.correctIndex) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  questionEl.textContent = "Quiz finalizado!";
  optionsEl.innerHTML = "";
  scoreEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas.`;
}

// Iniciar quiz
loadQuestion();
