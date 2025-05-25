let timerInterval;
let timeLeft = 120;
let score = 0;
let factor1, factor2;

const startScreen = document.getElementById("start-screen");
const gameArea = document.getElementById("game-area");
const gameOver = document.getElementById("game-over");
const highscores = document.getElementById("highscores");

const timerEl = document.getElementById("timer");
const factor1El = document.getElementById("factor1");
const factor2El = document.getElementById("factor2");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const nicknameInput = document.getElementById("nickname");
const highscoreList = document.getElementById("highscore-list");

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("submit-answer").addEventListener("click", checkAnswer);
answerInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") checkAnswer();
});
document.getElementById("save-score").addEventListener("click", saveScore);

function startGame() {
  timeLeft = 120;
  score = 0;
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  feedback.textContent = "";
  nicknameInput.value = "";

  startScreen.style.display = "none";
  gameArea.style.display = "block";
  gameOver.style.display = "none";
  highscores.style.display = "none";

  generateQuestion();
  answerInput.focus();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function generateQuestion() {
  factor1 = Math.floor(Math.random() * 10) + 1;
  factor2 = Math.floor(Math.random() * 10) + 1;
  factor1El.textContent = factor1;
  factor2El.textContent = factor2;
  answerInput.value = "";
  feedback.textContent = "";
  answerInput.focus();
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  if (isNaN(userAnswer)) {
    feedback.textContent = "Wpisz liczbę!";
    return;
  }

  if (userAnswer === factor1 * factor2) {
    score++;
    scoreEl.textContent = score;
  } else {
    if (score > 0) {
        score--;
    }
    scoreEl.textContent = score;
  }
  generateQuestion();
}   

function endGame() {
  gameArea.style.display = "none";
  gameOver.style.display = "block";
  finalScore.textContent = score;
}

function saveScore() {
  const nickname = nicknameInput.value.trim();
  if (nickname === "") {
    alert("Podaj nick!");
    return;
  }

  fetch("../../php/save-mult-score.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(nickname)}&score=${score}`
  })
  .then(response => response.text())
  .then(() => {
    loadHighscores();
    gameOver.style.display = "none";
    highscores.style.display = "block";
  });
}

function loadHighscores() {
  fetch("../../php/fetch-mult-scores.php")
    .then(response => response.json())
    .then(data => {
      highscoreList.innerHTML = "";
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name} – ${entry.score} pkt`;
        highscoreList.appendChild(li);
      });
    });
}
