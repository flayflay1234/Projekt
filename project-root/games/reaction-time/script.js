let startTime, timeoutID;
let times = [];
let attempts = 0;
const maxAttempts = 5;

const box = document.getElementById("box");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const resultDisplay = document.getElementById("result");

function resetBox() {
  box.className = "waiting";
  box.textContent = "Kliknij, aby rozpocząć";
}

function startRound() {
  message.textContent = "";
  box.textContent = "Czekaj...";
  box.className = "waiting";

  const delay = Math.random() * 2000 + 3000;
  timeoutID = setTimeout(() => {
    box.className = "ready";
    box.textContent = "Kliknij teraz!";
    startTime = Date.now();
  }, delay);
}

box.addEventListener("click", () => {
  if (attempts >= maxAttempts) return;

  if (box.classList.contains("waiting")) {
    clearTimeout(timeoutID);

    if (attempts > 0) {
      message.textContent = "Za wcześnie! Spróbuj ponownie.";
    }

    setTimeout(() => {
      startRound();
    }, 1000);

  } else if (box.classList.contains("ready")) {
    const reactionTime = Date.now() - startTime;
    times.push(reactionTime);
    attempts++;
    attemptsDisplay.textContent = `Próba ${attempts} z ${maxAttempts}: ${reactionTime} ms`;

    if (attempts < maxAttempts) {
      setTimeout(() => {
        startRound();
      }, 1000);
    } else {
      finishTest();
    }
  } else if (attempts === 0) {
    startRound();
  }
});


function finishTest() {
  const avg = Math.round(times.reduce((a, b) => a + b) / times.length);
  resultDisplay.textContent = `Średni czas reakcji: ${avg} ms`;
  document.getElementById("save-score").style.display = "block";
  resultDisplay.dataset.score = avg;
}

function saveScore() {
  const name = document.getElementById("player-name").value.trim();
  const score = parseInt(resultDisplay.dataset.score);

  if (name && !isNaN(score)) {
    fetch("../../php/save-reaction-score.php", {
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
  fetch("../../php/fetch-reaction-scores.php")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("highscore-list");
      list.innerHTML = "";
      data.forEach(row => {
        const li = document.createElement("li");
        li.textContent = `${row.name}: ${row.score} ms`;
        list.appendChild(li);
      });
    });
}

window.onload = () => {
  resetBox();
  loadHighscores();
};
