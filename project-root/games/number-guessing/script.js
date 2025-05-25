let secretNumber = 0;
let maxNumber = 100;
let attempts = 0;

function startGame(max) {
  maxNumber = max;
  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;

  let difficulty = "easy";
  if (max === 1000) difficulty = "medium";
  else if (max === 10000) difficulty = "hard";

  document.getElementById("difficulty").value = difficulty;
  document.getElementById("range-end").textContent = maxNumber;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("feedback").textContent = "";

  document.getElementById("difficulty-selection").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  document.getElementById("guess-input").focus();
}


function checkGuess() {
  const input = document.getElementById("guess-input");
  const guess = Number(input.value);
  attempts++;
  document.getElementById("attempts").textContent = attempts;

  if (guess === secretNumber) {
    document.getElementById("feedback").textContent = `Brawo! Zgadłeś liczbę ${secretNumber} w ${attempts} próbach.`;
    document.getElementById("save-score").style.display = "block";
  } else if (guess < secretNumber) {
    document.getElementById("feedback").textContent = "Za mało!";
  } else {
    document.getElementById("feedback").textContent = "Za dużo!";
  }
  
  document.getElementById("previous-guess").textContent = "Poprzednia liczba: " + guess;
  

  input.value = "";
  input.focus();
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("guess-input");
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkGuess();
    }
  });
});

function submitScore() {
  const nickname = document.getElementById("nickname").value.trim();
  const difficulty = document.getElementById("difficulty").value;

  if (nickname === "") {
    alert("Podaj nick!");
    return;
  }

  fetch("../../php/save-score.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(nickname)}&score=${attempts}&difficulty=${difficulty}`
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("save-score").style.display = "none";
    loadHighscores(difficulty);
  });
}

function loadHighscores(difficulty) {
  fetch(`../../php/fetch-scores.php?difficulty=${difficulty}`)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById("highscore-list");
      list.innerHTML = "";
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name} – ${entry.score} prób`;
        list.appendChild(li);
      });
      document.getElementById("highscores").style.display = "block";
    });
}


