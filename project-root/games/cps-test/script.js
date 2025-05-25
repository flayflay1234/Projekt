let clickCount = 0;
let isRunning = false;
let timer;
const duration = 5;

const clickButton = document.getElementById("click-button");
const timerDisplay = document.getElementById("timer");
const countDisplay = document.getElementById("click-count");
const resultDisplay = document.getElementById("cps-result");

clickButton.addEventListener("click", () => {
  if (!isRunning) {
    startTest();
  } else {
    clickCount++;
    countDisplay.textContent = `Kliknięcia: ${clickCount}`;
  }
});

function startTest() {
  isRunning = true;
  clickCount = 0;
  let timeLeft = duration;
  clickButton.textContent = "Klikaj!";
  clickButton.disabled = false;
  countDisplay.textContent = "Kliknięcia: 0";
  resultDisplay.textContent = "";
  timerDisplay.textContent = `Pozostało: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Pozostało: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function endTest() {
  isRunning = false;
  clickButton.disabled = true;
  clickButton.textContent = "Start";
  const cps = (clickCount / duration).toFixed(2);
  resultDisplay.textContent = `Twój wynik: ${clickCount} kliknięć (${cps} CPS)`;
  document.getElementById("save-score").style.display = "block";
  resultDisplay.dataset.score = cps;
}

function saveScore() {
  const name = document.getElementById("player-name").value.trim();
  const score = parseFloat(resultDisplay.dataset.score);

  if (name && !isNaN(score)) {
    fetch("../../php/save-cps-score.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${encodeURIComponent(name)}&score=${score}`
    }).then(() => {
      document.getElementById("save-score").style.display = "none";
      loadHighscores();
    });
  }
}

function loadHighscores() {
  fetch("../../php/fetch-cps-scores.php")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("highscore-list");
      list.innerHTML = "";
      data.forEach(row => {
        const li = document.createElement("li");
        li.textContent = `${row.name}: ${row.score} CPS`;
        list.appendChild(li);
      });
    });
}

window.onload = () => {
  clickButton.disabled = false;
  loadHighscores();
};
